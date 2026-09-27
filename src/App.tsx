import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CalorieOverview } from './components/CalorieOverview';
import { FoodLogger } from './components/FoodLogger';
import { WaterTracker } from './components/WaterTracker';
import { ExerciseLogger } from './components/ExerciseLogger';
import { MealPlanAdvisor } from './components/MealPlanAdvisor';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { WearableSyncModal } from './components/WearableSyncModal';
import { ProfileModal } from './components/ProfileModal';
import { ExportModal } from './components/ExportModal';
import { PromptViewerModal } from './components/PromptViewerModal';
import {
  UserProfile,
  FoodLogEntry,
  ExerciseLogEntry,
  WaterLogEntry,
  WearableData,
} from './types';
import { DEFAULT_USER_PROFILE } from './data/nutritionConstants';
import {
  loadUserData,
  saveProfile,
  saveFoodLogs,
  saveExerciseLogs,
  saveWaterLogs,
} from './lib/db';
import { Utensils, Droplet, Dumbbell, ChefHat, BarChart3 } from 'lucide-react';

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nutriscan_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // User Profile state (โหลดจากคลาวด์ภายหลัง)
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  // Food logs state (โหลดจากคลาวด์ภายหลัง)
  const [foodLogs, setFoodLogs] = useState<FoodLogEntry[]>([]);

  // Exercise logs state (โหลดจากคลาวด์ภายหลัง)
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLogEntry[]>([]);

  // Water logs state (โหลดจากคลาวด์ภายหลัง)
  const [waterLogs, setWaterLogs] = useState<WaterLogEntry[]>([]);

  // Wearables state
  const [wearableData, setWearableData] = useState<WearableData>(() => {
    const defaultWearable: WearableData = {
      connected: true,
      deviceName: 'Apple Watch Ultra',
      deviceType: 'apple_health',
      lastSyncTime: 'เมื่อสักครู่',
      stepsToday: 6840,
      activeEnergyBurnedKcal: 260,
      restingHeartRateBpm: 64,
      currentHeartRateBpm: 72,
    };
    try {
      const saved = localStorage.getItem('nutriscan_wearable');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaultWearable, ...parsed, connected: parsed.connected ?? true };
        }
      }
    } catch (e) {
      console.warn('Error reading saved wearable data', e);
    }
    return defaultWearable;
  });

  // Active Main Navigation Tab
  const [activeTab, setActiveTab] = useState<'tracker' | 'meal-plan' | 'water' | 'exercise' | 'analytics'>('tracker');

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWearablesOpen, setIsWearablesOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // โหลดข้อมูลจากคลาวด์เสร็จหรือยัง (กันบันทึกทับตอนยังไม่โหลด)
  const [dataLoaded, setDataLoaded] = useState(false);

  // Sync Dark Mode with document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nutriscan_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // โหลดข้อมูลของผู้ใช้จากคลาวด์ (Supabase) เมื่อเปิดแอป
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const cloud = await loadUserData();
        if (!active) return;
        if (cloud.profile) {
          setUserProfile((prev) => ({ ...DEFAULT_USER_PROFILE, ...prev, ...cloud.profile }));
        }
        setFoodLogs(cloud.foodLogs);
        setExerciseLogs(cloud.exerciseLogs);
        setWaterLogs(cloud.waterLogs);
      } catch (e) {
        console.warn('โหลดข้อมูลจากคลาวด์ไม่สำเร็จ', e);
      } finally {
        if (active) setDataLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('nutriscan_wearable', JSON.stringify(wearableData));
  }, [wearableData]);

  // บันทึกข้อมูลขึ้นคลาวด์ (Supabase) แยกรายคน — หลังโหลดเสร็จเท่านั้น (กันข้อมูลหาย)
  useEffect(() => {
    if (!dataLoaded) return;
    const timeout = setTimeout(() => {
      saveProfile(userProfile);
      saveFoodLogs(foodLogs);
      saveExerciseLogs(exerciseLogs);
      saveWaterLogs(waterLogs);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [dataLoaded, userProfile, foodLogs, exerciseLogs, waterLogs]);

  // Handlers
  const handleAddFoodLog = (newLog: FoodLogEntry) => {
    setFoodLogs((prev) => [newLog, ...prev]);
  };

  const handleDeleteFoodLog = (id: string) => {
    setFoodLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddExercise = (newEntry: ExerciseLogEntry) => {
    setExerciseLogs((prev) => [newEntry, ...prev]);
  };

  const handleDeleteExercise = (id: string) => {
    setExerciseLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddWater = (amountMl: number) => {
    const newEntry: WaterLogEntry = {
      id: 'water_' + Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      amountMl,
    };
    setWaterLogs((prev) => [...prev, newEntry]);
  };

  const handleResetWater = () => {
    setWaterLogs([]);
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleSyncWearable = async (deviceType: 'apple_health' | 'garmin' | 'fitbit' | 'google_fit') => {
    try {
      const res = await fetch('/api/wearable-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceType }),
      });
      const json = await res.json();
      if (json.data) {
        setWearableData(json.data);
      }
    } catch (err) {
      console.warn('Sync error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        userProfile={userProfile}
        wearable={wearableData}
        wearableConnected={wearableData?.connected}
        lastSyncTime={wearableData?.lastSyncTime}
        onOpenWearableModal={() => setIsWearablesOpen(true)}
        onOpenWearables={() => setIsWearablesOpen(true)}
        onOpenProfileModal={() => setIsProfileOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPromptModal={() => setIsPromptOpen(true)}
        isCloudSynced={true}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Calorie & Macro Dashboard Overview */}
        <CalorieOverview
          userProfile={userProfile}
          foodLogs={foodLogs}
          exerciseLogs={exerciseLogs}
          wearableActiveKcal={wearableData?.activeEnergyBurnedKcal || 0}
        />

        {/* Tab Navigation Navigation Controls */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar gap-2 pb-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { id: 'tracker', label: 'บันทึกอาหาร & กล้อง AI', icon: Utensils },
              { id: 'meal-plan', label: 'แผนอาหาร 3 มื้อ & วิตามิน', icon: ChefHat },
              { id: 'exercise', label: 'ออกกำลังกาย & หักลบแคล', icon: Dumbbell },
              { id: 'water', label: 'ติดตาม & เตือนดื่มน้ำ', icon: Droplet },
              { id: 'analytics', label: 'ประเมิน Deficit & สถิติ', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <span>อุปกรณ์: <strong className="text-emerald-500">{wearableData?.deviceName || 'Smartwatch'}</strong></span>
          </div>
        </div>

        {/* Tab Views */}
        <div className="transition-all">
          {activeTab === 'tracker' && (
            <div className="space-y-6">
              <FoodLogger
                onAddFoodLog={handleAddFoodLog}
                foodLogs={foodLogs}
                onDeleteFoodLog={handleDeleteFoodLog}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WaterTracker
                  waterTargetMl={userProfile.waterTargetMl}
                  waterLogs={waterLogs}
                  onAddWater={handleAddWater}
                  onResetWater={handleResetWater}
                />
                <ExerciseLogger
                  userWeightKg={userProfile.weightKg}
                  onAddExercise={handleAddExercise}
                  exerciseLogs={exerciseLogs}
                  onDeleteExercise={handleDeleteExercise}
                />
              </div>
            </div>
          )}

          {activeTab === 'meal-plan' && (
            <MealPlanAdvisor userProfile={userProfile} />
          )}

          {activeTab === 'exercise' && (
            <div className="space-y-6">
              <ExerciseLogger
                userWeightKg={userProfile.weightKg}
                onAddExercise={handleAddExercise}
                exerciseLogs={exerciseLogs}
                onDeleteExercise={handleDeleteExercise}
              />
            </div>
          )}

          {activeTab === 'water' && (
            <div className="space-y-6">
              <WaterTracker
                waterTargetMl={userProfile.waterTargetMl}
                waterLogs={waterLogs}
                onAddWater={handleAddWater}
                onResetWater={handleResetWater}
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <AnalyticsCharts
              userProfile={userProfile}
              foodLogs={foodLogs}
              exerciseLogs={exerciseLogs}
              wearableActiveKcal={wearableData?.activeEnergyBurnedKcal || 0}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-4 px-4 text-center text-xs text-slate-400">
        <p>
          NutriScan AI • ระบบคำนวณแคลอรี่จากรูปถ่ายและวางแผนโภชนาการทางการแพทย์ • ขับเคลื่อนด้วย Gemini 3.8 Flash Vision & Sports Nutrition Algorithms
        </p>
      </footer>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
      />

      <WearableSyncModal
        isOpen={isWearablesOpen}
        onClose={() => setIsWearablesOpen(false)}
        wearable={wearableData}
        onSyncDevice={handleSyncWearable}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        userProfile={userProfile}
        foodLogs={foodLogs}
        exerciseLogs={exerciseLogs}
        waterLogs={waterLogs}
      />

      <PromptViewerModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
      />
    </div>
  );
}
