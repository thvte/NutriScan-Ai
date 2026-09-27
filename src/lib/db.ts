import { supabase } from './supabase';
import type {
  UserProfile,
  FoodLogEntry,
  ExerciseLogEntry,
  WaterLogEntry,
} from '../types';

// หา user id ของคนที่ล็อกอินอยู่ (อ่านจาก session ในเครื่อง ไม่เรียกเน็ต)
async function currentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

// โหลดข้อมูลทั้งหมดของผู้ใช้จากคลาวด์
export async function loadUserData() {
  const [profileRes, foodRes, exRes, waterRes] = await Promise.all([
    supabase.from('profiles').select('data').maybeSingle(),
    supabase.from('food_logs').select('data, created_at').order('created_at', { ascending: false }),
    supabase.from('exercise_logs').select('data, created_at').order('created_at', { ascending: false }),
    supabase.from('water_logs').select('data, created_at').order('created_at', { ascending: true }),
  ]);

  return {
    profile: (profileRes.data?.data ?? null) as Partial<UserProfile> | null,
    foodLogs: (foodRes.data ?? []).map((r: any) => r.data as FoodLogEntry),
    exerciseLogs: (exRes.data ?? []).map((r: any) => r.data as ExerciseLogEntry),
    waterLogs: (waterRes.data ?? []).map((r: any) => r.data as WaterLogEntry),
  };
}

// บันทึกโปรไฟล์ (มีแถวเดียวต่อคน)
export async function saveProfile(profile: UserProfile) {
  const uid = await currentUserId();
  if (!uid) return;
  await supabase
    .from('profiles')
    .upsert({ id: uid, data: profile, updated_at: new Date().toISOString() });
}

// แทนที่รายการ log ทั้งชุดของผู้ใช้ (ลบเก่า → ใส่ใหม่)
async function replaceLogs(
  table: 'food_logs' | 'exercise_logs' | 'water_logs',
  entries: Array<{ id: string }>,
  uid: string,
) {
  await supabase.from(table).delete().eq('user_id', uid);
  if (entries.length > 0) {
    const rows = entries.map((e) => ({ user_id: uid, id: String(e.id), data: e }));
    await supabase.from(table).insert(rows);
  }
}

export async function saveFoodLogs(logs: FoodLogEntry[]) {
  const uid = await currentUserId();
  if (!uid) return;
  await replaceLogs('food_logs', logs as Array<{ id: string }>, uid);
}

export async function saveExerciseLogs(logs: ExerciseLogEntry[]) {
  const uid = await currentUserId();
  if (!uid) return;
  await replaceLogs('exercise_logs', logs as Array<{ id: string }>, uid);
}

export async function saveWaterLogs(logs: WaterLogEntry[]) {
  const uid = await currentUserId();
  if (!uid) return;
  await replaceLogs('water_logs', logs as Array<{ id: string }>, uid);
}
