import React, { useState, useEffect, useRef } from 'react';
import { Droplet, Plus, Bell, BellOff, Volume2, RotateCcw, Check } from 'lucide-react';
import { WaterLogEntry } from '../types';

interface WaterTrackerProps {
  waterTargetMl: number;
  waterLogs: WaterLogEntry[];
  onAddWater: (amountMl: number) => void;
  onResetWater: () => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  waterTargetMl,
  waterLogs,
  onAddWater,
  onResetWater,
}) => {
  const totalWaterMl = waterLogs.reduce((acc, log) => acc + log.amountMl, 0);
  const percentage = Math.min(100, Math.round((totalWaterMl / waterTargetMl) * 100));

  // Reminder state
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [reminderMinutes, setReminderMinutes] = useState(60);
  const [lastReminderTime, setLastReminderTime] = useState<Date | null>(null);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound chime synthesizer using Web Audio API
  const playReminderChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  };

  // Toggle Reminder
  const toggleReminder = async () => {
    if (!isReminderActive) {
      // Request browser notification permission if available
      if ('Notification' in window && Notification.permission !== 'granted') {
        try {
          await Notification.requestPermission();
        } catch (err) {
          console.warn('Notification permission request error:', err);
        }
      }
      setIsReminderActive(true);
      setLastReminderTime(new Date());
      playReminderChime();
    } else {
      setIsReminderActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // Set up timer for water reminder
  useEffect(() => {
    if (!isReminderActive) return;

    const intervalMs = reminderMinutes * 60 * 1000;
    timerRef.current = setInterval(() => {
      playReminderChime();
      setShowNotificationBadge(true);
      setLastReminderTime(new Date());

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('💧 ได้เวลาดื่มน้ำแล้ว!', {
          body: `ดื่มน้ำสักแก้ว (250 ml) เพื่อรักษาระดับการเผาผลาญและความสดชื่น`,
          icon: '/favicon.ico',
        });
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isReminderActive, reminderMinutes]);

  return (
    <div id="water-tracker-card" className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
            <Droplet className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              ระบบติดตาม & เตือนดื่มน้ำ (Hydration Tracker)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              เป้าหมายที่แนะนำสำหรับร่างกายคุณ: {waterTargetMl.toLocaleString()} ml / วัน
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={onResetWater}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
          title="รีเซ็ตค่าน้ำของวันนี้"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีเซ็ต</span>
        </button>
      </div>

      {/* Reminder Notification Banner if triggered */}
      {showNotificationBadge && (
        <div className="mb-4 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-cyan-500 fill-current animate-bounce" />
            <span className="font-semibold">ได้เวลาดื่มน้ำแล้ว! เติมน้ำสัก 1 แก้ว (250 ml) เพื่อความสดชื่น</span>
          </div>
          <button
            onClick={() => {
              onAddWater(250);
              setShowNotificationBadge(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-bold text-[11px] hover:bg-cyan-500"
          >
            ดื่มแล้ว +250ml
          </button>
        </div>
      )}

      {/* Water Fill & Stats Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
        {/* Visual Water Bottle / Fill Tube */}
        <div className="relative mx-auto w-24 h-48 rounded-3xl border-4 border-cyan-400/40 bg-slate-50 dark:bg-slate-900/60 overflow-hidden flex flex-col justify-end shadow-inner">
          {/* Water Fill Layer */}
          <div
            className="w-full bg-gradient-to-t from-cyan-500 to-teal-400 transition-all duration-700 relative"
            style={{ height: `${percentage}%` }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-white/40 animate-pulse" />
          </div>
          {/* Centered Percentage Label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-sm font-extrabold text-slate-800 dark:text-white drop-shadow-xs">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Current Total & Target Numbers */}
        <div className="space-y-3 text-center md:text-left">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              ปริมาณน้ำที่ดื่มไปแล้ว
            </span>
            <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400">
              {totalWaterMl.toLocaleString()}
              <span className="text-sm font-normal text-slate-400 ml-1">/ {waterTargetMl} ml</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {totalWaterMl >= waterTargetMl ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 justify-center md:justify-start">
                <Check className="w-4 h-4" /> ยอดเยี่ยม! ดื่มน้ำครบตามเป้าหมายรายวันแล้ว
              </span>
            ) : (
              <span>
                ยังขาดอีก <strong className="text-cyan-600 dark:text-cyan-400">{(waterTargetMl - totalWaterMl).toLocaleString()} ml</strong> เพื่อรักษาระดับการเผาผลาญไขมันให้ทำงานเต็มประสิทธิภาพ
              </span>
            )}
          </div>

          {/* Quick Add Buttons */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
            {[
              { label: '+200 ml (แก้วเล็ก)', amount: 200 },
              { label: '+250 ml (แก้วมาตรฐาน)', amount: 250 },
              { label: '+500 ml (ขวดเล็ก)', amount: 500 },
              { label: '+1000 ml (กระติก)', amount: 1000 },
            ].map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onAddWater(btn.amount)}
                className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 font-semibold text-xs border border-cyan-200/60 dark:border-cyan-800/60 flex items-center gap-1 transition-all active:scale-95"
              >
                <Plus className="w-3 h-3" />
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Water Reminder Control Center */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              {isReminderActive ? (
                <Bell className="w-4 h-4 text-cyan-500 animate-pulse" />
              ) : (
                <BellOff className="w-4 h-4 text-slate-400" />
              )}
              <span>ฟังก์ชันเตือนดื่มน้ำ</span>
            </span>

            <button
              id="btn-toggle-water-reminder"
              type="button"
              onClick={toggleReminder}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isReminderActive
                  ? 'bg-cyan-500 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isReminderActive ? 'เปิดใช้งานอยู่' : 'ปิดอยู่'}
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              ความถี่ในการเตือน: ทุกๆ {reminderMinutes} นาที
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              disabled={!isReminderActive}
              value={reminderMinutes}
              onChange={(e) => setReminderMinutes(parseInt(e.target.value))}
              className="w-full accent-cyan-500 disabled:opacity-40"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>15 นาที</span>
              <span>60 นาที</span>
              <span>120 นาที</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={playReminderChime}
              className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" /> ทดสอบเสียงเตือน
            </button>

            {lastReminderTime && (
              <span className="text-[10px] text-slate-400">
                เตือนล่าสุด: {lastReminderTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
