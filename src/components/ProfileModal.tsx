import React, { useState } from 'react';
import { X, User, Save, Calculator, Cloud, Check } from 'lucide-react';
import { UserProfile, Gender, ActivityLevel, HealthGoal } from '../types';
import { calculateBMR, calculateTDEE, calculateCalorieTarget, calculateWaterRequirementMl } from '../data/nutritionConstants';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Real-time calculation helpers
  const handleNumericChange = (key: keyof UserProfile, val: number) => {
    const updated = { ...formData, [key]: val };
    const bmr = calculateBMR(updated.weightKg, updated.heightCm, updated.age, updated.gender);
    const tdee = calculateTDEE(bmr, updated.activityLevel);
    const targetCalories = calculateCalorieTarget(tdee, updated.goal);
    const waterTargetMl = calculateWaterRequirementMl(updated.weightKg);

    // Protein target: 1.6g per kg for weight loss/muscle
    const targetProteinG = Math.round(updated.weightKg * 1.6);
    // Fat target: 25% of calories
    const targetFatG = Math.round((targetCalories * 0.25) / 9);
    // Carbs target: remaining calories
    const remainingCaloriesForCarbs = Math.max(0, targetCalories - (targetProteinG * 4) - (targetFatG * 9));
    const targetCarbsG = Math.round(remainingCaloriesForCarbs / 4);

    setFormData({
      ...updated,
      bmr,
      tdee,
      targetCalories,
      waterTargetMl,
      targetProteinG,
      targetFatG,
      targetCarbsG,
    });
  };

  const handleGenderOrGoalChange = (key: 'gender' | 'activityLevel' | 'goal', val: any) => {
    const updated = { ...formData, [key]: val };
    const bmr = calculateBMR(updated.weightKg, updated.heightCm, updated.age, updated.gender);
    const tdee = calculateTDEE(bmr, updated.activityLevel);
    const targetCalories = calculateCalorieTarget(tdee, updated.goal);

    const targetProteinG = Math.round(updated.weightKg * 1.6);
    const targetFatG = Math.round((targetCalories * 0.25) / 9);
    const remainingCaloriesForCarbs = Math.max(0, targetCalories - (targetProteinG * 4) - (targetFatG * 9));
    const targetCarbsG = Math.round(remainingCaloriesForCarbs / 4);

    setFormData({
      ...updated,
      bmr,
      tdee,
      targetCalories,
      targetProteinG,
      targetFatG,
      targetCarbsG,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                โปรไฟล์ผู้ใช้ & คำนวณ BMR / TDEE
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ข้อมูลเก็บและซิงค์บน Cloud เพื่อคำนวณแคลอรี่ที่เหมาะสมกับร่างกายของคุณ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Email for Cloud Sync */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ชื่อผู้ใช้งาน:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                อีเมล (Cloud Account Login):
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Gender & Age */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                เพศ:
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleGenderOrGoalChange('gender', e.target.value as Gender)}
                className="w-full py-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="female">หญิง (Female)</option>
                <option value="male">ชาย (Male)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                อายุ (ปี):
              </label>
              <input
                type="number"
                min="12"
                max="100"
                value={formData.age}
                onChange={(e) => handleNumericChange('age', parseInt(e.target.value) || 25)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                น้ำหนัก (กก.):
              </label>
              <input
                type="number"
                step="0.5"
                min="30"
                max="250"
                value={formData.weightKg}
                onChange={(e) => handleNumericChange('weightKg', parseFloat(e.target.value) || 60)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ส่วนสูง (ซม.):
              </label>
              <input
                type="number"
                min="100"
                max="230"
                value={formData.heightCm}
                onChange={(e) => handleNumericChange('heightCm', parseInt(e.target.value) || 165)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ระดับกิจกรรมในชีวิตประจำวัน:
            </label>
            <select
              value={formData.activityLevel}
              onChange={(e) => handleGenderOrGoalChange('activityLevel', e.target.value as ActivityLevel)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
            >
              <option value="sedentary">ไม่ออกกำลังกาย / ทำงานนั่งโต๊ะ (x1.2)</option>
              <option value="light">ออกกำลังกายเบาๆ 1-3 วัน/สัปดาห์ (x1.375)</option>
              <option value="moderate">ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์ (x1.55)</option>
              <option value="very_active">ออกกำลังกายหนัก 6-7 วัน/สัปดาห์ (x1.725)</option>
              <option value="extra_active">นักกีฬา / ซ้อมวันละ 2 ครั้ง (x1.9)</option>
            </select>
          </div>

          {/* Health Goal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              เป้าหมายสุขภาพ:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'lose_weight_mild', label: 'ลดน้ำหนักยั่งยืน', sub: '-350 kcal/วัน' },
                { id: 'lose_weight_fast', label: 'ลดน้ำหนักเร็ว', sub: '-600 kcal/วัน' },
                { id: 'maintain', label: 'รักษาน้ำหนัก', sub: 'เท่ากับ TDEE' },
                { id: 'gain_muscle', label: 'เพิ่มกล้ามเนื้อ', sub: '+300 kcal/วัน' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleGenderOrGoalChange('goal', g.id as HealthGoal)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    formData.goal === g.id
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="font-bold text-xs block">{g.label}</span>
                  <span className="text-[10px] text-slate-400 block">{g.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Results Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span>ผลการคำนวณอัตโนมัติ (Mifflin-St Jeor Equation)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">BMR (พลังงานพื้นฐาน)</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {formData.bmr} kcal
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">TDEE (พลังงานรวม)</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {formData.tdee} kcal
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] text-emerald-600 block font-semibold">เป้าหมายแคลอรี่/วัน</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {formData.targetCalories} kcal
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800">
                <span className="text-[10px] text-cyan-600 block font-semibold">เป้าหมายน้ำดื่ม</span>
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                  {formData.waterTargetMl} ml
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'บันทึกสำเร็จ!' : 'บันทึก & ซิงค์โปรไฟล์'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              ปิด
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
