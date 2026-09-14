import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Terminal, BookOpen } from 'lucide-react';

interface PromptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptViewerModal: React.FC<PromptViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const MASTER_PROMPT_TEXT = `บทบาทและเป้าหมาย (Role & Objective):
คุณเป็นผู้เชี่ยวชาญระดับสูงด้านการพัฒนาซอฟต์แวร์ฟูลสแตก (Senior Full-Stack AI Engineer) ร่วมกับผู้เชี่ยวชาญด้านโภชนาการคลินิกและการกำหนดอาหาร (Registered Clinical Dietitian & Sports Nutritionist)
หน้าที่ของคุณคือออกแบบ พัฒนา และส่งมอบเว็บแอปพลิเคชันระบบนับแคลอรี่อัจฉริยะจากรูปถ่ายและข้อความ (Smart AI Calorie & Nutrition Vision Web App) แบบเบ็ดเสร็จ มีความถูกต้อง แม่นยำตามหลักวิทยาศาสตร์การแพทย์ ใช้งานง่าย สะอาดตา รองรับ Dark Mode มีระบบ Cloud Persistence และเชื่อมต่ออุปกรณ์สุขภาพได้อย่างสมบูรณ์

ข้อกำหนดทางฟังก์ชันและโภชนาการ (Core Functional & Clinical Nutrition Requirements):
1. การคำนวณแคลอรี่และสารอาหารเป้าหมายรายวัน (BMR & TDEE Calculation):
   - คำนวณอัตราการเผาผลาญพื้นฐาน (BMR) ด้วยสมการ Mifflin-St Jeor Formula ตามเพศ, อายุ, ส่วนสูง (cm), และน้ำหนักตัว (kg)
   - คำนวณพลังงานที่ใช้ทั้งหมดต่อวัน (TDEE) ตามระดับกิจกรรม (Sedentary x1.2 ถึง Extra Active x1.9)
   - คำนวณ Calorie Deficit ที่ปลอดภัย (แนะนำลบ 350-500 kcal/วัน สำหรับการลดไขมันแบบยั่งยืนโดยไม่สูญเสียมวลกล้ามเนื้อ)
   - คำนวณสัดส่วนสารอาหารหลัก (Macronutrients Target): โปรตีน 1.6-2.0 กรัม/กก., ไขมันดี 20-30%, คาร์โบไฮเดรตเชิงซ้อนตามพลังงานที่เหลือ

2. การนับแคลอรี่จากรูปถ่ายและข้อความ (Computer Vision & NLP Food Recognition):
   - รองรับการถ่ายรูปสดจากกล้อง หรืออัปโหลดไฟล์รูปภาพอาหาร (JPG, PNG, WEBP)
   - รองรับการพิมพ์ชื่ออาหาร (เช่น "ข้าวมันไก่ต้มไม่เอาหนัง 1 จาน", "ส้มตำไทย ไข่ต้ม 2 ฟอง")
   - ใช้โมเดล Gemini 3.8 Flash พร้อม Structured JSON Output วิเคราะห์:
     * ชื่ออาหารและปริมาณโดยประมาณ (กรัม/จาน/ชิ้น)
     * แคลอรี่รวมทั้งจาน (Total Calories)
     * ฟังก์ชันระบุจำนวนคนที่ร่วมรับประทาน (Portion Sharing): สามารถหารตามจำนวนคน (เช่น 1, 2, 3, 4 คน) และคำนวณแคลอรี่ต่อ 1 คนที่ทานจริง (Net Consumed Calories) อัตโนมัติ
     * แจกแจงสารอาหารหลัก: โปรตีน (g), คาร์โบไฮเดรต (g), ไขมัน (g), ใยอาหาร (g), โซเดียม (mg)
     * ระบุวิตามินและแร่ธาตุสำคัญที่ตรวจพบ (เช่น วิตามิน A, C, D, ธาตุเหล็ก, แคลเซียม, แมกนีเซียม) พร้อมคะแนน Health Rating และคำแนะนำจากนักกำหนดอาหาร

3. การแนะนำแผนอาหาร 3 มื้อ และสูตรลดน้ำหนัก (3-Meal Diet Plan & Weight Loss Strategy):
   - แนะนำรายการอาหาร 3 มื้อ (มื้อเช้า, เที่ยง, เย็น) และของว่างเพื่อควบคุมให้ได้แคลอรี่ตามเป้าหมาย
   - ให้คำแนะนำและเทคนิคเฉพาะสำหรับการลดน้ำหนัก (เช่น ลำดับการทานผักและโปรตีนก่อนคาร์บ, การดื่มน้ำคุมความอยากอาหาร, การเว้นช่วงเวลา Intermittent Fasting)

4. การจัดการน้ำดื่มและฟังก์ชันแจ้งเตือน (Hydration Tracker & Smart Alarm):
   - คำนวณปริมาณน้ำดื่มที่เหมาะสมต่อวันจากน้ำหนักตัว (สูตรน้ำหนัก kg x 35 ml)
   - Visual Liquid Tube แสดงเปอร์เซ็นต์น้ำที่ดื่มแบบไดนามิก
   - ระบบตั้งเตือนให้ดื่มน้ำตามช่วงเวลาที่กำหนด (เช่น ทุก 30, 60, 90 นาที) พร้อมเสียงเตือน (Web Audio Synthesizer) และ Browser Notification

5. การบันทึกและหักลบแคลอรี่จากการออกกำลังกาย (Exercise Burn & Net Deficit Engine):
   - คำนวณพลังงานที่เผาผลาญจากการออกกำลังกายตามค่า MET (Metabolic Equivalent of Task) ร่วมกับน้ำหนักตัวและระยะเวลา:
     สูตร: Calories Burned = (MET x 3.5 x น้ำหนักตัว kg / 200) x ระยะเวลา (นาที)
   - นำแคลอรี่ที่เผาผลาญไปหักลบกับแคลอรี่อาหารที่ทานโดยอัตโนมัติ เพื่อแสดงแคลอรี่สุทธิ (Net Calories = Food In - Exercise Burn)

6. การประเมิน Calorie Deficit รายวัน สัปดาห์ และรายเดือน (Graphical Deficit Analytics):
   - แสดงผลกราฟิกและตารางเปรียบเทียบแคลอรี่สุทธิกับเป้าหมาย
   - คำนวณผลรวม Calorie Deficit สะสมประจำสัปดาห์ (7 วัน) และรายเดือน (30 วัน)
   - ประเมินน้ำหนักไขมันที่คาดว่าจะลดได้จริง (Projected Fat Loss) ตามหลัก 7,700 kcal Deficit = ลดไขมัน 1 กิโลกรัม

7. การเชื่อมต่ออุปกรณ์สวมใส่และคลาวด์ (Wearables Sync & Cloud Storage):
   - มีระบบ Cloud Account Login เพื่อบันทึกข้อมูลโภชนาการ น้ำหนัก และประวัติอย่างปลอดภัย
   - จำลองและรองรับการเชื่อมต่อกับอุปกรณ์เพื่อสุขภาพยอดนิยม (Apple Health, Garmin, Fitbit, Google Fit) เพื่อดึงก้าวเดิน, Active Calories, และอัตราการเต้นหัวใจ

8. การส่งออกข้อมูลเป็นไฟล์ PDF หรือ CSV (Data Export):
   - รองรับการ Export เป็นไฟล์ CSV ที่มี UTF-8 BOM สำหรับเปิดใน Microsoft Excel ได้อย่างถูกต้อง ไม่เป็นภาษาต่างดาว
   - รองรับการสร้างรายงานทางการพร้อมสั่งพิมพ์หรือบันทึกเป็น PDF (Print to PDF)

9. การออกแบบหน้าจอ (UI/UX Design Standards):
   - ออกแบบด้วย Tailwind CSS คุมโทนสีธรรมชาติ สะอาดตา (Emerald, Cyan, Slate)
   - รองรับ Dark Mode และ Light Mode อย่างสมบูรณ์แบบ
   - วาง Layout ให้ใช้งานสะดวกบนทั้งสมาร์ตโฟน แท็บเล็ต และคอมพิวเตอร์`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MASTER_PROMPT_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Copy error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Master Prompt โภชนาการและระบบวิเคราะห์แคลอรี่ AI
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Prompt ฉบับสมบูรณ์ที่ผ่านการวิศวกรรมทางคลินิกและซอฟต์แวร์
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

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            โครงสร้างคำสั่งพร้อมใช้งาน (Production Master Prompt):
          </span>
          <button
            id="btn-copy-master-prompt"
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'คัดลอกเรียบร้อยแล้ว!' : 'คัดลอก Prompt'}</span>
          </button>
        </div>

        <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono max-h-96 overflow-y-auto leading-relaxed border border-slate-800 whitespace-pre-wrap select-all">
          {MASTER_PROMPT_TEXT}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
