import React, { useState } from 'react';
import { ChefHat, Sparkles, AlertCircle, ShieldCheck, Pill, Salad, Flame, Info, Check, RefreshCw } from 'lucide-react';
import { UserProfile, MealRecommendation } from '../types';
import { PRESET_WEIGHT_LOSS_MEALS, NUTRIENT_GUIDES } from '../data/nutritionConstants';

interface MealPlanAdvisorProps {
  userProfile: UserProfile;
}

export const MealPlanAdvisor: React.FC<MealPlanAdvisorProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'meals' | 'nutrients' | 'supplements'>('meals');
  const [meals, setMeals] = useState<MealRecommendation[]>(PRESET_WEIGHT_LOSS_MEALS);
  const [customTips, setCustomTips] = useState<string[]>([
    'ดื่มน้ำเปล่า 1 แก้วใหญ่ (300-500 ml) ก่อนมื้ออาหาร 20 นาที ช่วยลดปริมาณอาหารที่ทานได้ 13%',
    'ทานผักและโปรตีนเป็นอันดับแรก ข้าวแป้งเป็นอันดับสุดท้าย เพื่อคุมระดับน้ำตาลในเลือด (Glucose Curve)',
    'เว้นช่วงการทานอาหารอย่างน้อย 12-14 ชั่วโมงข้ามคืน (Time-Restricted Eating) เพื่อกระตุ้นกระบวนการ Autophagy และเร่งการดึงไขมันสะสมมาใช้',
  ]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Request AI Custom Meal Plan
  const handleGenerateAiPlan = async () => {
    setIsGeneratingAi(true);
    setAiError(null);

    try {
      const res = await fetch('/api/recommend-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userProfile }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to generate plan');

      if (json.data && json.data.meals) {
        setMeals(json.data.meals);
      }
      if (json.data && json.data.weightLossTips) {
        setCustomTips(json.data.weightLossTips);
      }
    } catch (err: any) {
      console.error('Plan generation error:', err);
      setAiError(err.message || 'ไม่สามารถสร้างแผนอาหารด้วย AI ได้ในขณะนี้ ใช้แผนมาตรฐานที่มีประสิทธิภาพ');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const mealTypeLabels = {
    breakfast: 'มื้อเช้า (Breakfast)',
    lunch: 'มื้อเที่ยง (Lunch)',
    dinner: 'มื้อเย็น (Dinner)',
    snack: 'ของว่างบ่าย (Snack)',
  };

  return (
    <div id="meal-plan-advisor" className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-all space-y-5">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              แผนอาหาร 3 มื้อ & คู่มือสารอาหาร/อาหารเสริม
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ออกแบบตามเป้าหมายพลังงาน {userProfile.targetCalories} kcal และการลดน้ำหนักแบบถูกหลักโภชนาการ
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
          <button
            onClick={() => setActiveTab('meals')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'meals'
                ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            เมนู 3 มื้อแนะนำ
          </button>
          <button
            onClick={() => setActiveTab('nutrients')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'nutrients'
                ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            สารอาหารที่จำเป็น
          </button>
          <button
            onClick={() => setActiveTab('supplements')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'supplements'
                ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            โดสอาหารเสริมที่แนะนำ
          </button>
        </div>
      </div>

      {/* TAB 1: 3-Meal Recommendations */}
      {activeTab === 'meals' && (
        <div className="space-y-4">
          {/* AI Refresh Button & Target Budget Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40">
            <div>
              <span className="text-xs font-bold text-violet-900 dark:text-violet-200 block">
                เป้าหมายแคลอรี่: {userProfile.targetCalories} kcal/วัน
              </span>
              <span className="text-[11px] text-violet-700 dark:text-violet-300">
                รวม 3 มื้อ + ของว่าง = {meals.reduce((sum, m) => sum + m.estimatedCalories, 0)} kcal (ตรงตามเป้าหมาย)
              </span>
            </div>

            <button
              type="button"
              onClick={handleGenerateAiPlan}
              disabled={isGeneratingAi}
              className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAi ? 'กำลังสร้างเมนู...' : 'สุ่มเมนูใหม่ด้วย AI'}</span>
            </button>
          </div>

          {aiError && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{aiError}</span>
            </div>
          )}

          {/* Meals Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map((meal, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
                    {mealTypeLabels[meal.mealType]}
                  </span>
                  <span className="text-sm font-extrabold text-violet-600 dark:text-violet-400">
                    ~{meal.estimatedCalories} kcal
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  {meal.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {meal.description}
                </p>

                {/* Macros */}
                <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <span>โปรตีน: <strong className="text-indigo-600 dark:text-indigo-400">{meal.macros.protein}g</strong></span>
                  <span>คาร์บ: <strong className="text-amber-600 dark:text-amber-400">{meal.macros.carbs}g</strong></span>
                  <span>ไขมัน: <strong className="text-rose-600 dark:text-rose-400">{meal.macros.fat}g</strong></span>
                </div>

                {/* Weight loss tip */}
                <div className="p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>เคล็ดลับลดไขมัน:</strong> {meal.weightLossTip}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Weight Loss Strategies Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>หลักการโภชนาการเพื่อการลดน้ำหนักแบบไม่โยโย่</span>
            </h4>
            <ul className="space-y-1.5">
              {customTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: Essential Nutrients (Carbs, Protein, Vitamins, Minerals) */}
      {activeTab === 'nutrients' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            สารอาหารสำคัญที่ร่างกายต้องการต่อวัน แหล่งอาหารธรรมชาติ และปริมาณที่ควรได้รับ:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NUTRIENT_GUIDES.filter((n) => n.category !== 'supplement').map((nutrient, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                    {nutrient.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    {nutrient.category === 'macronutrient' ? 'สารอาหารหลัก' : nutrient.category === 'vitamin' ? 'วิตามิน' : 'แร่ธาตุ'}
                  </span>
                </div>

                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ปริมาณที่ควรได้รับ: {nutrient.recommendedDaily}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                    แหล่งอาหารที่พบมาก:
                  </span>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside space-y-0.5">
                    {nutrient.bestFoodSources.slice(0, 3).map((food, fIdx) => (
                      <li key={fIdx}>{food}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-[10px] text-amber-700 dark:text-amber-300/90 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <strong>สัญญาณเมื่อขาด:</strong> {nutrient.deficiencyWarning}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Supplement Dosages & Timing */}
      {activeTab === 'supplements' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong>คำแนะนำจากแพทย์ & นักกำหนดอาหาร:</strong> อาหารหลักคือหัวใจสำคัญ หากได้รับไม่เพียงพอจากมื้ออาหารปกติ สามารถเสริมด้วยอาหารเสริมตามโดสที่ปลอดภัยด้านล่างนี้
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NUTRIENT_GUIDES.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {item.name}
                  </span>
                  <span className="p-1 rounded-md bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                    <Pill className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="text-xs font-medium text-violet-700 dark:text-violet-300">
                  <strong>ปริมาณอาหารเสริมที่แนะนำ:</strong> {item.supplementRecommendation}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>เวลาที่ควรทาน:</strong> {item.timing}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
