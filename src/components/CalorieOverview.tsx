import React from 'react';
import { Flame, Utensils, Activity, AlertTriangle, CheckCircle2, TrendingDown, Target } from 'lucide-react';
import { UserProfile, FoodLogEntry, ExerciseLogEntry } from '../types';

interface CalorieOverviewProps {
  userProfile: UserProfile;
  foodLogs: FoodLogEntry[];
  exerciseLogs: ExerciseLogEntry[];
  wearableActiveKcal: number;
}

export const CalorieOverview: React.FC<CalorieOverviewProps> = ({
  userProfile,
  foodLogs,
  exerciseLogs,
  wearableActiveKcal,
}) => {
  // Sum of calories in
  const totalCaloriesIn = foodLogs.reduce((acc, log) => acc + (log.caloriesPerPerson || 0), 0);

  // Sum of workouts burned
  const workoutBurned = exerciseLogs.reduce((acc, ex) => acc + (ex.caloriesBurned || 0), 0);
  const totalCaloriesBurned = workoutBurned + wearableActiveKcal;

  // Net Calories = In - Burned
  const netCalories = Math.max(0, totalCaloriesIn - totalCaloriesBurned);

  // Daily Deficit = Target - Net (Positive means deficit, negative means surplus)
  const deficit = userProfile.targetCalories - netCalories;

  // Macros consumed
  const consumedProtein = foodLogs.reduce((acc, l) => acc + (l.macros?.protein || 0), 0);
  const consumedCarbs = foodLogs.reduce((acc, l) => acc + (l.macros?.carbs || 0), 0);
  const consumedFat = foodLogs.reduce((acc, l) => acc + (l.macros?.fat || 0), 0);

  // Percentages
  const caloriePercent = Math.min(100, Math.round((netCalories / userProfile.targetCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((consumedProtein / userProfile.targetProteinG) * 100));
  const carbsPercent = Math.min(100, Math.round((consumedCarbs / userProfile.targetCarbsG) * 100));
  const fatPercent = Math.min(100, Math.round((consumedFat / userProfile.targetFatG) * 100));

  // Determine Alert status
  const isOverTarget = netCalories > userProfile.targetCalories;
  const isNearTarget = !isOverTarget && netCalories >= userProfile.targetCalories * 0.85;
  const isHealthyDeficit = deficit >= 300 && deficit <= 700;

  return (
    <div id="calorie-overview-card" className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-all">
      {/* Smart Goal Alert Banner */}
      {isOverTarget && (
        <div id="alert-over-budget" className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300 flex items-start gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">แจ้งเตือน: แคลอรี่เกินเป้าหมายรายวันแล้ว (+{Math.abs(deficit)} kcal)</span>
            <p className="text-xs text-rose-700 dark:text-rose-300/90 mt-0.5">
              คุณทานเกินโควตาประจำวัน แนะนำเพิ่มการเดินเร็ว วิ่งจ๊อกกิ้ง 25-30 นาที เพื่อเผาผลาญส่วนเกินกลับคืนมา
            </p>
          </div>
        </div>
      )}

      {isNearTarget && (
        <div id="alert-near-target" className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-300 flex items-start gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">แจ้งเตือน: ใกล้ถึงเป้าหมายแคลอรี่ประจำวันแล้ว ({caloriePercent}%)</span>
            <p className="text-xs text-amber-700 dark:text-amber-300/90 mt-0.5">
              เหลือแคลอรี่ที่ทานได้อีก {deficit} kcal ในวันนี้ แนะนำเน้นของว่างไฟเบอร์สูง แคลอรี่ต่ำ เช่น แตงกวา ชาเขียวไม่หวาน หรือผลไม้ตระกูลเบอร์รี่
            </p>
          </div>
        </div>
      )}

      {isHealthyDeficit && !isNearTarget && (
        <div id="alert-healthy-deficit" className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300 flex items-start gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">ยอดเยี่ยม! คุณอยู่ในช่วง Calorie Deficit ที่มีประสิทธิภาพสูงสุด (-{deficit} kcal)</span>
            <p className="text-xs text-emerald-700 dark:text-emerald-300/90 mt-0.5">
              ระดับ Deficit นี้ช่วยกระตุ้นการดึงไขมันสะสมออกมาใช้ โดยไม่ส่งผลกระทบต่อมวลกล้ามเนื้อและอัตราการเผาผลาญ BMR
            </p>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Target Calories */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>เป้าหมายประจำวัน</span>
            <Target className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {userProfile.targetCalories.toLocaleString()}
            <span className="text-xs font-normal text-slate-400 ml-1">kcal</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            BMR: {userProfile.bmr} • TDEE: {userProfile.tdee}
          </div>
        </div>

        {/* Calories In */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
          <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 mb-1">
            <span>อาหารที่ทาน (In)</span>
            <Utensils className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
            {totalCaloriesIn.toLocaleString()}
            <span className="text-xs font-normal text-emerald-600/70 dark:text-emerald-400/70 ml-1">kcal</span>
          </div>
          <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-1">
            {foodLogs.length} รายการอาหารที่บันทึก
          </div>
        </div>

        {/* Calories Burned */}
        <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40">
          <div className="flex items-center justify-between text-xs text-orange-700 dark:text-orange-300 mb-1">
            <span>ออกกำลังกาย (Burn)</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
            -{totalCaloriesBurned.toLocaleString()}
            <span className="text-xs font-normal text-orange-500/70 ml-1">kcal</span>
          </div>
          <div className="text-[11px] text-orange-600/80 dark:text-orange-400/80 mt-1">
            {exerciseLogs.length} กิจกรรม + อุปกรณ์ {wearableActiveKcal} kcal
          </div>
        </div>

        {/* Calorie Deficit / Net */}
        <div className={`p-4 rounded-xl border ${
          deficit >= 0
            ? 'bg-teal-50/60 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900/40'
            : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/40'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={deficit >= 0 ? 'text-teal-700 dark:text-teal-300' : 'text-rose-700 dark:text-rose-300'}>
              {deficit >= 0 ? 'Calorie Deficit' : 'Calorie Surplus'}
            </span>
            <TrendingDown className={`w-4 h-4 ${deficit >= 0 ? 'text-teal-500' : 'text-rose-500 rotate-180'}`} />
          </div>
          <div className={`text-2xl font-black ${deficit >= 0 ? 'text-teal-700 dark:text-teal-300' : 'text-rose-600 dark:text-rose-400'}`}>
            {deficit >= 0 ? `-${deficit.toLocaleString()}` : `+${Math.abs(deficit).toLocaleString()}`}
            <span className="text-xs font-normal opacity-75 ml-1">kcal</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            สุทธิ (Net): {netCalories.toLocaleString()} kcal
          </div>
        </div>
      </div>

      {/* Progress Bar of Daily Calories */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <span>ความคืบหน้างบพลังงานประจำวัน</span>
          <span>{netCalories} / {userProfile.targetCalories} kcal ({caloriePercent}%)</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isOverTarget
                ? 'bg-rose-500'
                : isNearTarget
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, (netCalories / userProfile.targetCalories) * 100)}%` }}
          />
        </div>
      </div>

      {/* Macronutrient Breakdown */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          สัดส่วนสารอาหารหลัก (Macronutrients)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Protein */}
          <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
              <span>โปรตีน (Protein)</span>
              <span>{Math.round(consumedProtein)}g / {userProfile.targetProteinG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-indigo-200/50 dark:bg-indigo-900/60 overflow-hidden mb-1">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400">
              {proteinPercent}% ของเป้าหมาย (ซ่อมแซมกล้ามเนื้อ)
            </span>
          </div>

          {/* Carbs */}
          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">
              <span>คาร์โบไฮเดรต (Carbs)</span>
              <span>{Math.round(consumedCarbs)}g / {userProfile.targetCarbsG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-amber-200/50 dark:bg-amber-900/60 overflow-hidden mb-1">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${carbsPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400">
              {carbsPercent}% ของเป้าหมาย (พลังงานหลัก)
            </span>
          </div>

          {/* Fat */}
          <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30">
            <div className="flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-300 mb-1">
              <span>ไขมัน (Fat)</span>
              <span>{Math.round(consumedFat)}g / {userProfile.targetFatG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-rose-200/50 dark:bg-rose-900/60 overflow-hidden mb-1">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${fatPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-rose-600 dark:text-rose-400">
              {fatPercent}% ของเป้าหมาย (ดูดซึมวิตามิน/ฮอร์โมน)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
