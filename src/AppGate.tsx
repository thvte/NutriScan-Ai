import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import App from './App';
import { LogOut, Loader2 } from 'lucide-react';

export default function AppGate() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ตรวจว่ามีการล็อกอินค้างอยู่ไหม
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // คอยฟังการเปลี่ยนสถานะ (เข้า/ออกระบบ)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // ยังไม่ล็อกอิน → แสดงหน้าเข้าสู่ระบบ
  if (!session) {
    return <Auth />;
  }

  // ล็อกอินแล้ว → แสดงแอปเดิม + ปุ่มออกจากระบบเล็กๆ มุมล่างขวา
  return (
    <>
      <App />
      <button
        onClick={() => supabase.auth.signOut()}
        title="ออกจากระบบ"
        className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur border border-gray-200 shadow-lg rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:border-red-200 flex items-center gap-2 transition"
      >
        <LogOut className="w-4 h-4" />
        ออกจากระบบ
      </button>
    </>
  );
}
