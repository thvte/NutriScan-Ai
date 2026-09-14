export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
export type HealthGoal = 'lose_weight_fast' | 'lose_weight_mild' | 'maintain' | 'gain_muscle';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: HealthGoal;
  bmr: number;
  tdee: number;
  targetCalories: number;
  waterTargetMl: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
}

export interface MacroNutrients {
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface VitaminMineralInfo {
  name: string;
  amount: string;
  source: string;
  benefit?: string;
}

export interface FoodItemAnalysis {
  foodName: string;
  portionDescription: string;
  totalCalories: number;
  portionPeople: number;
  caloriesPerPerson: number;
  macros: MacroNutrients;
  sodiumMg?: number;
  vitaminsAndMinerals: VitaminMineralInfo[];
  healthRating: 'healthy' | 'moderate' | 'high_calorie';
  nutritionAdvice: string;
  confidenceScore: number;
}

export interface FoodLogEntry {
  id: string;
  timestamp: string; // ISO date
  date: string; // YYYY-MM-DD
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  portionDescription: string;
  totalCalories: number;
  portionPeople: number;
  caloriesPerPerson: number;
  macros: MacroNutrients;
  sodiumMg?: number;
  vitaminsAndMinerals: VitaminMineralInfo[];
  healthRating: 'healthy' | 'moderate' | 'high_calorie';
  nutritionAdvice: string;
  imageUri?: string;
  isAiAnalyzed?: boolean;
}

export interface ExerciseLogEntry {
  id: string;
  timestamp: string;
  date: string; // YYYY-MM-DD
  activityName: string;
  durationMinutes: number;
  intensity: 'light' | 'moderate' | 'vigorous';
  caloriesBurned: number;
  notes?: string;
}

export interface WaterLogEntry {
  id: string;
  timestamp: string;
  date?: string;
  amountMl: number;
}

export interface MealRecommendation {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  description: string;
  estimatedCalories: number;
  macros: MacroNutrients;
  keyNutrients: string[];
  weightLossTip: string;
}

export interface NutrientSupplementGuide {
  category: 'macronutrient' | 'vitamin' | 'mineral' | 'supplement';
  name: string;
  recommendedDaily: string;
  bestFoodSources: string[];
  supplementRecommendation: string;
  timing: string;
  deficiencyWarning: string;
}

export interface WearableData {
  connected: boolean;
  deviceType: 'apple_health' | 'garmin' | 'fitbit' | 'google_fit';
  deviceName: string;
  lastSyncTime: string;
  stepsToday: number;
  activeEnergyBurnedKcal: number;
  restingHeartRateBpm?: number;
  currentHeartRateBpm: number;
}

export interface DailySummary {
  date: string;
  caloriesIn: number;
  caloriesBurned: number;
  netCalories: number;
  targetCalories: number;
  deficit: number; // target - net
  waterMl: number;
  targetWaterMl: number;
}
