import React, { useState } from 'react';
import { BarChart3, TrendingDown, Calendar, Award, Zap, CheckCircle } from 'lucide-react';
import { UserProfile, FoodLogEntry, ExerciseLogEntry } from '../types';

interface AnalyticsChartsProps {
  userProfile: UserProfile;
  foodLogs: FoodLogEntry[];
  exerciseLogs: ExerciseLogEntry[];
  wearableActiveKcal: number;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  userProfile,
  foodLogs,
  exerciseLogs,
  wearableActiveKcal,
}) => {
  const [viewPeriod, setViewPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Today's stats
  const todayCaloriesIn = foodLogs.reduce((acc, l) => acc + (l.caloriesPerPerson || 0), 0);
  const todayBurned = exerciseLogs.reduce((acc, l) => acc + l.caloriesBurned, 0) + wearableActiveKcal;
  const todayNet = Math.max(0, todayCaloriesIn - todayBurned);
  const todayDeficit = userProfile.targetCalories - todayNet;

  // Generate simulated 7-day data ending today
  const daysOfWeek = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'วันนี้'];
  const weeklyData = [
    { day: 'จันทร์', in: 1420, burn: 420, net: 1000, target: userProfile.targetCalories, deficit: userProfile.targetCalories - 1000 },
    { day: 'อังคาร', in: 1510, burn: 380, net: 1130, target: userProfile.targetCalories, deficit: userProfile.targetCalories - 1130 },
    { day: 'พุธ', in: 1620, burn: 510, net: 1110, target: userProfile.targetCalories, deficit: userProfile.targetCalories - 1110 },
    { day: 'พฤหัส', in: 1390, burn: 350, net: 1040, target: userProfile.targetCalories, deficit: userProfile.targetCalories - 1040 },
    { day: 'ศุกร์', in: 1580, burn: 460, net: 1120, target: userProfile.targetCalories, deficit: userProfile.targetCalories - 1120 },
    { day: 'เสาร์', in: 1690, burn: 580, net: 1110, target: userProfile.targetCalories, deficit: userProfile.targetCalories - 1110 },
    { day: 'วันนี้', in: todayCaloriesIn, burn: todayBurned, net: todayNet, target: userProfile.targetCalories, deficit: todayDeficit },
  ];

  // Weekly Cumulative Deficit
  const totalWeeklyDeficit = weeklyData.reduce((acc, d) => acc + d.deficit, 0);
  // 7,700 kcal deficit = ~1 kg fat loss
  const projectedWeeklyFatLossKg = (totalWeeklyDeficit / 7700).toFixed(2);

  // Monthly stats projection
  const monthlyTotalDeficit = Math.round(totalWeeklyDeficit * 4.2);
  const projectedMonthlyFatLossKg = (monthlyTotalDeficit / 7700).toFixed(2);

  return (
    <div id="analytics-charts-card" className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-all space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              การประเมิน Calorie Deficit & กราฟิกสุขภาพ
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              วิเคราะห์ส่วนต่างพลังงานประจำวัน สัปดาห์ และรายเดือน พร้อมคาดการณ์การลดไขมัน
            </p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
          {[
            { id: 'daily', label: 'ประจำวัน' },
            { id: 'weekly', label: 'รายสัปดาห์ (7 วัน)' },
            { id: 'monthly', label: 'รายเดือน (30 วัน)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setViewPeriod(item.id as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewPeriod === item.id
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Deficit Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40">
          <span className="text-xs text-teal-700 dark:text-teal-300 font-semibold block mb-1">
            {viewPeriod === 'daily' ? 'Deficit วันนี้' : viewPeriod === 'weekly' ? 'Deficit รวม 7 วัน' : 'Deficit ประเมินรายเดือน'}
          </span>
          <div className="text-2xl font-black text-teal-700 dark:text-teal-300">
            {viewPeriod === 'daily'
              ? `${todayDeficit.toLocaleString()} kcal`
              : viewPeriod === 'weekly'
              ? `${totalWeeklyDeficit.toLocaleString()} kcal`
              : `${monthlyTotalDeficit.toLocaleString()} kcal`}
          </div>
          <span className="text-[11px] text-teal-600/80 dark:text-teal-400/80 mt-1 block">
            {todayDeficit >= 0 ? 'อยู่ในภาวะดึงไขมันมาเผาผลาญ' : 'แคลอรี่เกินเป้าหมาย'}
          </span>
        </div>

        {/* Metric 2: Fat loss projection */}
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold block mb-1">
            คาดการณ์ไขมันที่ลดได้จริง (Fat Loss)
          </span>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
            ~{viewPeriod === 'daily' ? (todayDeficit / 7700).toFixed(3) : viewPeriod === 'weekly' ? projectedWeeklyFatLossKg : projectedMonthlyFatLossKg} kg
          </div>
          <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-1 block">
            คำนวณจากกฎ 7,700 kcal = ไขมัน 1 กิโลกรัม
          </span>
        </div>

        {/* Metric 3: Consistency Score */}
        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
          <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold block mb-1">
            ความสม่ำเสมอในการคุมอาหาร
          </span>
          <div className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
            92%
          </div>
          <span className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 mt-1 block">
            อยู่ในเกณฑ์ดีเยี่ยม ไม่ส่งผลกระทบต่อกล้ามเนื้อ
          </span>
        </div>
      </div>

      {/* Visual Graphical Chart (Bar Graphics) */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            กราฟเปรียบเทียบแคลอรี่สุทธิ (Net Calories) กับเป้าหมาย {userProfile.targetCalories} kcal
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" /> แคลอรี่สุทธิ
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-xs bg-teal-300 inline-block" /> Deficit ที่ทำได้
            </span>
          </div>
        </div>

        {/* Bar Chart Bars */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 h-48 items-end p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
          {weeklyData.map((item, idx) => {
            const netHeightPercent = Math.min(100, Math.round((item.net / userProfile.targetCalories) * 80));
            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.net}
                </div>

                <div className="w-full max-w-[36px] bg-slate-200 dark:bg-slate-700 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      item.deficit >= 0 ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-rose-500'
                    }`}
                    style={{ height: `${netHeightPercent}%` }}
                  />
                </div>

                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-2 truncate">
                  {item.day}
                </span>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                  {item.deficit >= 0 ? `-${item.deficit}` : `+${Math.abs(item.deficit)}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Deficit Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
              <th className="py-2 font-semibold">วัน</th>
              <th className="py-2 font-semibold">อาหารที่ทาน (In)</th>
              <th className="py-2 font-semibold">ออกกำลังกาย (Burn)</th>
              <th className="py-2 font-semibold">แคลอรี่สุทธิ (Net)</th>
              <th className="py-2 font-semibold text-right">Calorie Deficit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {weeklyData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                <td className="py-2 font-bold">{row.day}</td>
                <td className="py-2">{row.in} kcal</td>
                <td className="py-2 text-orange-600 dark:text-orange-400">-{row.burn} kcal</td>
                <td className="py-2">{row.net} kcal</td>
                <td className="py-2 text-right font-bold text-teal-600 dark:text-teal-400">
                  {row.deficit >= 0 ? `-${row.deficit} kcal` : `+${Math.abs(row.deficit)} kcal`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
