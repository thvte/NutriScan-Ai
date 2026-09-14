import React, { useState } from 'react';
import { X, Watch, RefreshCw, CheckCircle2, Heart, Footprints, Flame, Activity } from 'lucide-react';
import { WearableData } from '../types';

interface WearableSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  wearable?: WearableData;
  onSyncDevice: (deviceType: 'apple_health' | 'garmin' | 'fitbit' | 'google_fit') => Promise<void>;
}

export const WearableSyncModal: React.FC<WearableSyncModalProps> = ({
  isOpen,
  onClose,
  wearable,
  onSyncDevice,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'apple_health' | 'garmin' | 'fitbit' | 'google_fit'>(
    wearable?.deviceType || 'apple_health'
  );
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  const handleSync = async () => {
    setIsSyncing(true);
    await onSyncDevice(selectedDevice);
    setIsSyncing(false);
  };

  const devices = [
    {
      id: 'apple_health' as const,
      name: 'Apple Health (HealthKit)',
      desc: 'Apple Watch Series 4 - 9, Ultra',
      icon: '🍎',
    },
    {
      id: 'garmin' as const,
      name: 'Garmin Connect',
      desc: 'Forerunner, Fenix, Venu, Instinct',
      icon: '⌚',
    },
    {
      id: 'fitbit' as const,
      name: 'Fitbit / Google Pixel Watch',
      desc: 'Charge, Sense, Versa, Pixel Watch',
      icon: '🏃',
    },
    {
      id: 'google_fit' as const,
      name: 'Google Fit / Health Connect',
      desc: 'Wear OS, Samsung Galaxy Watch',
      icon: '🟢',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Watch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                เชื่อมต่ออุปกรณ์สวมใส่ (Wearables Sync)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ซิงค์ก้าวเดิน แคลอรี่ที่เผาผลาญ และอัตราการเต้นหัวใจแบบเรียลไทม์
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

        {/* Device Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
            เลือกแพลตฟอร์มอุปกรณ์สุขภาพของคุณ:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {devices.map((dev) => (
              <button
                key={dev.id}
                type="button"
                onClick={() => setSelectedDevice(dev.id)}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  selectedDevice === dev.id
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xl">{dev.icon}</span>
                <div className="min-w-0">
                  <span className="font-bold text-xs block truncate">{dev.name}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{dev.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Live Synced Data Card */}
        {wearable?.connected && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> เชื่อมต่อแล้ว ({wearable.deviceName || 'Smartwatch'})
              </span>
              <span className="text-slate-400 text-[10px]">
                ซิงค์ล่าสุด: {wearable.lastSyncTime || 'เมื่อสักครู่'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] mb-0.5">
                  <Footprints className="w-3.5 h-3.5 text-emerald-500" />
                  <span>ก้าวเดิน</span>
                </div>
                <span className="text-base font-black text-slate-800 dark:text-slate-100">
                  {wearable.stepsToday?.toLocaleString?.() ?? '0'}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] mb-0.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>Active Burn</span>
                </div>
                <span className="text-base font-black text-orange-600 dark:text-orange-400">
                  {wearable.activeEnergyBurnedKcal ?? 0} <span className="text-[10px] font-normal">kcal</span>
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] mb-0.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>อัตราเต้นหัวใจ</span>
                </div>
                <span className="text-base font-black text-rose-600 dark:text-rose-400">
                  {wearable.currentHeartRateBpm ?? 72} <span className="text-[10px] font-normal">bpm</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'กำลังดึงข้อมูลจากอุปกรณ์...' : 'ซิงค์ข้อมูลสุขภาพเดี๋ยวนี้'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
