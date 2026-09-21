import { createClient } from '@supabase/supabase-js';

// อ่านค่าจาก Environment Variables ที่ตั้งไว้ใน Vercel
// (VITE_ ขึ้นต้น = ให้ฝั่งเบราว์เซอร์อ่านได้ ปลอดภัยเพราะ RLS กันข้อมูลรายคน)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // ถ้าลืมตั้งค่า env จะได้เห็น error ชัดเจนใน console แทนที่จะเงียบ
  console.error(
    'ไม่พบ VITE_SUPABASE_URL หรือ VITE_SUPABASE_ANON_KEY — กรุณาตั้งค่าใน Vercel',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
