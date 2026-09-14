import React from 'react';
import { Moon, Sun, Watch, Download, Sparkles, User, CloudCheck, Flame } from 'lucide-react';
import { UserProfile, WearableData } from '../types';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode?: (val: boolean) => void;
  onToggleDarkMode?: () => void;
  userProfile?: UserProfile;
  wearable?: WearableData;
  wearableConnected?: boolean;
  lastSyncTime?: string;
  onOpenWearableModal?: () => void;
  onOpenWearables?: () => void;
  onOpenProfileModal?: () => void;
  onOpenProfile?: () => void;
  onOpenExportModal?: () => void;
  onOpenExport?: () => void;
  onOpenPromptModal: () => void;
  isCloudSynced?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onToggleDarkMode,
  userProfile,
  wearable,
  wearableConnected,
  lastSyncTime,
  onOpenWearableModal,
  onOpenWearables,
  onOpenProfileModal,
  onOpenProfile,
  onOpenExportModal,
  onOpenExport,
  onOpenPromptModal,
  isCloudSynced = true,
}) => {
  const isConnected = wearable?.connected ?? wearableConnected ?? false;
  const stepsCount = wearable?.stepsToday ?? 0;
  const userName = userProfile?.name || 'โปรไฟล์';

  const handleToggleDark = () => {
    if (onToggleDarkMode) {
      onToggleDarkMode();
    } else if (setDarkMode) {
      setDarkMode(!darkMode);
    }
  };

  const handleWearableClick = onOpenWearableModal || onOpenWearables || (() => {});
  const handleProfileClick = onOpenProfileModal || onOpenProfile || (() => {});
  const handleExportClick = onOpenExportModal || onOpenExport || (() => {});
  return (
    <header
      id="app-navbar"
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                Nutri<span className="text-emerald-500">Scan</span> AI
              </span>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                Vision & Health
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              AI นับแคลอรี่จากรูปถ่าย • โภชนาการ • Water & Calorie Deficit
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cloud Sync Status */}
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            title="ซิงค์ข้อมูลกับคลาวด์อัตโนมัติ"
          >
            <CloudCheck className={`w-3.5 h-3.5 ${isCloudSynced ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span>{isCloudSynced ? 'Cloud Synced' : 'Syncing...'}</span>
          </div>

          {/* Wearable Sync Button */}
          <button
            id="btn-wearable-sync"
            onClick={handleWearableClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isConnected
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
            title="เชื่อมต่อและซิงค์อุปกรณ์สวมใส่"
          >
            <Watch className={`w-4 h-4 ${isConnected ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">
              {isConnected ? `${stepsCount.toLocaleString()} ก้าว` : 'เชื่อมต่ออุปกรณ์'}
            </span>
          </button>

          {/* Prompt Viewer Modal Trigger */}
          <button
            id="btn-prompt-spec"
            onClick={onOpenPromptModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800 transition-colors"
            title="ดู Master Prompt และสเปก AI โภชนาการ"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span className="hidden md:inline">Master Prompt</span>
          </button>

          {/* Export Button (CSV / PDF) */}
          <button
            id="btn-export-data"
            onClick={handleExportClick}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title="ส่งออกรายงาน PDF และ CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ส่งออก</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="btn-toggle-dark-mode"
            onClick={handleToggleDark}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'เปลี่ยนเป็นธีมสว่าง' : 'เปลี่ยนเป็นธีมกลางคืน (Dark Mode)'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Profile & BMR/TDEE Settings */}
          <button
            id="btn-profile-settings"
            onClick={handleProfileClick}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{userName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
