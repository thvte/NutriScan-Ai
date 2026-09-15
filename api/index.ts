import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import {
  analyzeFoodTextClinically,
  generateClinical3MealPlan,
} from '../server/nutritionEngine';

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

let genAI: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    genAI = new GoogleGenAI({ apiKey });
  }

  return genAI;
}

// Temporary in-memory store for Vercel
let userData: any = null;

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'NutriScan AI API',
  });
});

app.get('/api/user-data', (_req, res) => {
  res.json({
    ok: true,
    data: userData,
  });
});

app.post('/api/user-data', (req, res) => {
  userData = req.body;

  res.json({
    ok: true,
    data: userData,
  });
});

app.post('/api/analyze-food', async (req, res) => {
  const {
    imageBase64,
    mimeType,
    fileName,
    foodText,
    portionPeople = 1,
    notes = '',
    cookingStyle = '',
  } = req.body;

  // Clinical fallback is always available
  const clinicalResult = analyzeFoodTextClinically(
    foodText || fileName || '',
    Number(portionPeople) || 1,
    notes
  );

  try {
    const ai = getGenAI();

    const contents: any[] = [];

    if (foodText) {
      contents.push({
        text: `Analyze this food description: ${foodText}
Portion people: ${portionPeople}
Notes: ${notes}
Cooking style: ${cookingStyle}`,
      });
    }

    if (imageBase64 && mimeType) {
      contents.push({
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      });
    }

    contents.push({
      text: `Return accurate nutrition analysis for the food shown/described.
Use Thai language for nutritionAdvice and portionDescription.
Return only JSON.`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING },
            portionDescription: { type: Type.STRING },
            totalCalories: { type: Type.NUMBER },
            portionPeople: { type: Type.NUMBER },
            caloriesPerPerson: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER },
                fiber: { type: Type.NUMBER },
              },
              required: ['protein', 'carbs', 'fat'],
            },
            sodiumMg: { type: Type.NUMBER },
            vitaminsAndMinerals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  source: { type: Type.STRING },
                  benefit: { type: Type.STRING },
                },
                required: ['name', 'amount', 'source'],
              },
            },
            healthRating: {
              type: Type.STRING,
              enum: ['healthy', 'moderate', 'high_calorie'],
            },
            nutritionAdvice: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
          },
          required: [
            'foodName',
            'portionDescription',
            'totalCalories',
            'portionPeople',
            'caloriesPerPerson',
            'macros',
            'vitaminsAndMinerals',
            'healthRating',
            'nutritionAdvice',
            'confidenceScore',
          ],
        },
      },
    });

    const text = response.text || '';
    const result = JSON.parse(text);

    return res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.error('Gemini analyze error:', error);

    return res.json({
      ok: true,
      data: clinicalResult,
      fallback: true,
    });
  }
});

app.post('/api/recommend-plan', async (req, res) => {
  const { userProfile } = req.body;

  if (!userProfile) {
    return res.status(400).json({
      ok: false,
      error: 'userProfile is required',
    });
  }

  try {
    const ai = getGenAI();

    const prompt = `
Create a 3-meal nutrition plan plus snack for this user.

User profile:
${JSON.stringify(userProfile, null, 2)}

Return JSON only.
Use Thai language.
Include meals, estimated calories, macros, key nutrients and practical weight-management tips.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    const result = JSON.parse(text);

    return res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.error('Gemini meal plan error:', error);

    const plan = generateClinical3MealPlan(
      Number(userProfile.targetCalories) || 2000,
      userProfile.goal,
      Number(userProfile.weightKg) || 65
    );

    return res.json({
      ok: true,
      data: plan,
      fallback: true,
    });
  }
});

app.post('/api/wearable-sync', (_req, res) => {
  const deviceType =
    _req.body?.deviceType || 'apple_health';

  const names: Record<string, string> = {
    apple_health: 'Apple Watch Ultra',
    garmin: 'Garmin',
    fitbit: 'Fitbit',
    google_fit: 'Google Fit',
  };

  const data = {
    connected: true,
    deviceType,
    deviceName: names[deviceType] || 'Smartwatch',
    lastSyncTime: 'เมื่อสักครู่',
    stepsToday: 6840,
    activeEnergyBurnedKcal: 260,
    restingHeartRateBpm: 64,
    currentHeartRateBpm: 72,
  };

  return res.json({
    ok: true,
    data,
  });
});

export default app;
