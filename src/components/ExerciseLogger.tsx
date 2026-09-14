import React, { useState } from 'react';
import { Flame, Plus, Trash2, Activity, Zap, Footprints, Dumbbell, Timer } from 'lucide-react';
import { ExerciseLogEntry } from '../types';
import { EXERCISE_DATABASE, calculateBurnedCalories } from '../data/nutritionConstants';

interface ExerciseLoggerProps {
  userWeightKg: number;
  onAddExercise: (entry: ExerciseLogEntry) => void;
  exerciseLogs: ExerciseLogEntry[];
  onDeleteExercise: (id: string) => void;
}

export const ExerciseLogger: React.FC<ExerciseLoggerProps> = ({
  userWeightKg,
  onAddExercise,
  exerciseLogs,
  onDeleteExercise,
}) => {
  const [selectedActivity, setSelectedActivity] = useState(EXERCISE_DATABASE[0]);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'vigorous'>('moderate');
  const [customName, setCustomName] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Intensity multiplier
  const intensityMultiplier = intensity === 'light' ? 0.85 : intensity === 'vigorous' ? 1.25 : 1.0;
  const currentMet = selectedActivity.met * intensityMultiplier;
  const estimatedCalories = calculateBurnedCalories(currentMet, userWeightKg, durationMinutes);

  const handleAddWorkout = () => {
    const activityTitle = isCustom && customName.trim() ? customName.trim() : selectedActivity.name;
    const newEntry: ExerciseLogEntry = {
      id: 'ex_' + Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      activityName: activityTitle,
      durationMinutes,
      intensity,
      caloriesBurned: estimatedCalories,
    };

    onAddExercise(newEntry);
    if (isCustom) {
      setCustomName('');
      setIsCustom(false);
    }
  };

  const totalCaloriesBurned = exerciseLogs.reduce((acc, log) => acc + log.caloriesBurned, 0);

  return (
    <div id="exercise-logger-card" className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              บันทึกการออกกำลังกาย & หักลบแคลอรี่
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              คำนวณพลังงานที่เผาผลาญจากน้ำหนักตัว ({userWeightKg} kg) และค่า MET ไปหักลบกับอาหารที่ทาน
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">เผาผลาญรวมวันนี้</span>
          <span className="text-xl font-black text-orange-600 dark:text-orange-400">
            -{totalCaloriesBurned.toLocaleString()} kcal
          </span>
        </div>
      </div>

      {/* Activity Selector & Intensity */}
      <div className="space-y-4 mb-5">
        {/* Presets Grid */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            เลือกประเภทกิจกรรม:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {EXERCISE_DATABASE.map((act, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedActivity(act);
                  setIsCustom(false);
                }}
                className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex flex-col justify-between ${
                  !isCustom && selectedActivity.name === act.name
                    ? 'border-orange-500 bg-orange-50/70 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-500 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-300'
                }`}
              >
                <span className="font-bold block truncate">{act.name.split(' (')[0]}</span>
                <span className="text-[10px] text-slate-400 mt-1">MET: {act.met}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Activity Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCustom(!isCustom)}
            className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-semibold"
          >
            {isCustom ? '← เลือกจากรายการมาตรฐาน' : '+ ระบุกิจกรรมอื่นที่ไม่มีในรายการ'}
          </button>
        </div>

        {isCustom && (
          <div>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="ระบุชื่อกีฬาหรือกิจกรรม เช่น เต้นแอโรบิก, ปีนหน้าผา, ชกมวยไทย"
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
            />
          </div>
        )}

        {/* Duration & Intensity Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60">
          {/* Duration */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>ระยะเวลาที่ออกกำลังกาย</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">{durationMinutes} นาที</span>
            </div>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>15 นาที</span>
              <span>45 นาที</span>
              <span>90 นาที</span>
              <span>120+ นาที</span>
            </div>
          </div>

          {/* Intensity */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              ระดับความหนัก (Intensity):
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'light', label: 'เบา (Light)' },
                { id: 'moderate', label: 'ปานกลาง (Mod)' },
                { id: 'vigorous', label: 'หนัก (Vigorous)' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setIntensity(lvl.id as any)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    intensity === lvl.id
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Burn Calculation Summary & Add Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/60">
          <div>
            <span className="text-xs text-orange-800 dark:text-orange-200 block">
              พลังงานที่จะถูกเผาผลาญและนำไปหักลบ:
            </span>
            <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
              -{estimatedCalories} kcal
            </span>
            <span className="text-xs text-slate-400 ml-2">
              (เทียบเท่าการเดิน ~{Math.round(estimatedCalories / 0.045).toLocaleString()} ก้าว)
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddWorkout}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> บันทึกการออกกำลังกาย
          </button>
        </div>
      </div>

      {/* Today's Exercise Log History */}
      {exerciseLogs.length > 0 && (
        <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            ประวัติการออกกำลังกายวันนี้ ({exerciseLogs.length} รายการ)
          </h4>
          <div className="space-y-2">
            {exerciseLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                      {log.activityName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {log.durationMinutes} นาที • ระดับ {log.intensity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
                    -{log.caloriesBurned} kcal
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeleteExercise(log.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
