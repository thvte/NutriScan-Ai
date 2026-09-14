import React, { useState } from 'react';
import { X, Download, FileText, Table, Printer, Check } from 'lucide-react';
import { UserProfile, FoodLogEntry, ExerciseLogEntry, WaterLogEntry } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  foodLogs: FoodLogEntry[];
  exerciseLogs: ExerciseLogEntry[];
  waterLogs: WaterLogEntry[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  foodLogs,
  exerciseLogs,
  waterLogs,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<'csv' | 'pdf' | null>(null);

  if (!isOpen) return null;

  const totalCaloriesIn = foodLogs.reduce((sum, l) => sum + (l.caloriesPerPerson || 0), 0);
  const totalBurned = exerciseLogs.reduce((sum, l) => sum + l.caloriesBurned, 0);
  const totalWater = waterLogs.reduce((sum, l) => sum + l.amountMl, 0);
  const netCalories = Math.max(0, totalCaloriesIn - totalBurned);
  const deficit = userProfile.targetCalories - netCalories;

  // Export CSV Function
  const handleExportCSV = () => {
    const today = new Date().toISOString().split('T')[0];

    // CSV Headers with UTF-8 BOM for Thai Excel compatibility
    let csvContent = '\uFEFF';
    csvContent += 'NutriScan AI - รายงานโภชนาการและแคลอรี่ประจำวัน\n';
    csvContent += `ผู้ใช้:,"${userProfile.name}",อีเมล:,"${userProfile.email}",วันที่:,"${today}"\n`;
    csvContent += `เป้าหมายแคลอรี่:,"${userProfile.targetCalories} kcal",BMR:,"${userProfile.bmr} kcal",TDEE:,"${userProfile.tdee} kcal"\n`;
    csvContent += `อาหารรวม:,"${totalCaloriesIn} kcal",เผาผลาญรวม:,"${totalBurned} kcal",แคลอรี่สุทธิ:,"${netCalories} kcal",Deficit:,"${deficit} kcal"\n\n`;

    // Food Table
    csvContent += '--- รายการอาหารที่บันทึก ---\n';
    csvContent += 'มื้อ,ชื่ออาหาร,จำนวนคนแบ่ง,แคลอรี่รวม (kcal),แคลอรี่ต่อคน (kcal),โปรตีน (g),คาร์โบไฮเดรต (g),ไขมัน (g),โซเดียม (mg),สารอาหารสำคัญ\n';

    foodLogs.forEach((f) => {
      const vits = (f.vitaminsAndMinerals || []).map((v) => `${v.name} (${v.amount})`).join('; ');
      csvContent += `"${f.mealType}","${f.foodName.replace(/"/g, '""')}","${f.portionPeople}","${f.totalCalories}","${f.caloriesPerPerson}","${f.macros.protein}","${f.macros.carbs}","${f.macros.fat}","${f.sodiumMg || 0}","${vits}"\n`;
    });

    csvContent += '\n--- รายการออกกำลังกาย ---\n';
    csvContent += 'กิจกรรม,ระยะเวลา (นาที),ระดับความหนัก,แคลอรี่ที่เผาผลาญ (kcal)\n';
    exerciseLogs.forEach((e) => {
      csvContent += `"${e.activityName}","${e.durationMinutes}","${e.intensity}","${e.caloriesBurned}"\n`;
    });

    csvContent += `\n--- ปริมาณน้ำดื่มรวม ---\n`;
    csvContent += `ดื่มไปแล้ว:,"${totalWater} ml",เป้าหมาย:,"${userProfile.waterTargetMl} ml"\n`;

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NutriScan_Report_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('csv');
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  // Export PDF / Print Report
  const handlePrintPDF = () => {
    window.print();
    setDownloadSuccess('pdf');
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                ส่งออกข้อมูลสุขภาพ (Export Data)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ดาวน์โหลดข้อมูลแคลอรี่ อาหาร และการออกกำลังกายไปวิเคราะห์ต่อ
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

        {/* Summary Info */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <div className="flex justify-between">
            <span>รายการอาหารที่บันทึก:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{foodLogs.length} รายการ ({totalCaloriesIn} kcal)</span>
          </div>
          <div className="flex justify-between">
            <span>รายการออกกำลังกาย:</span>
            <span className="font-bold text-orange-600 dark:text-orange-400">{exerciseLogs.length} รายการ (-{totalBurned} kcal)</span>
          </div>
          <div className="flex justify-between">
            <span>ปริมาณน้ำดื่ม:</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{totalWater} / {userProfile.waterTargetMl} ml</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-bold">
            <span>Calorie Deficit สุทธิ:</span>
            <span className={deficit >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600'}>
              {deficit >= 0 ? `-${deficit} kcal` : `+${Math.abs(deficit)} kcal`}
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* CSV Button */}
          <button
            id="btn-export-csv-action"
            type="button"
            onClick={handleExportCSV}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-800 flex items-center justify-between text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                  ส่งออกเป็นไฟล์ Excel / CSV (.csv)
                </span>
                <span className="text-[11px] text-slate-400 block">
                  รวมข้อมูลอาหาร แคลอรี่ สารอาหาร และออกกำลังกาย แยกคอลัมน์ชัดเจน
                </span>
              </div>
            </div>
            {downloadSuccess === 'csv' ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
            )}
          </button>

          {/* PDF Button */}
          <button
            id="btn-export-pdf-action"
            type="button"
            onClick={handlePrintPDF}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 bg-white dark:bg-slate-800 flex items-center justify-between text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                  พิมพ์รายงาน หรือบันทึกเป็น PDF (Print / Save as PDF)
                </span>
                <span className="text-[11px] text-slate-400 block">
                  รายงานรูปแบบทางการสำหรับนำไปปรึกษาแพทย์หรือนักโภชนาการ
                </span>
              </div>
            </div>
            {downloadSuccess === 'pdf' ? (
              <Check className="w-4 h-4 text-violet-500" />
            ) : (
              <Printer className="w-4 h-4 text-slate-400 group-hover:text-violet-500" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold"
        >
          ปิด
        </button>
      </div>
    </div>
  );
};
