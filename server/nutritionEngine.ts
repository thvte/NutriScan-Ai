import { FoodItemAnalysis } from '../src/types';

export interface FoodDatabaseEntry {
  keywords: string[];
  nameThai: string;
  nameEn: string;
  basePortionDesc: string;
  baseWeightGrams: number;
  baseCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodiumMg: number;
  vitaminsAndMinerals: { name: string; amount: string; source: string; benefit: string }[];
  healthRating: 'healthy' | 'moderate' | 'high_calorie';
  dietitianTip: string;
  unitType: 'gram' | 'piece' | 'plate' | 'bowl' | 'cup' | 'scoop';
  unitMultiplierKeywords?: { unit: string; factor: number }[];
}

export const CLINICAL_FOOD_DATABASE: FoodDatabaseEntry[] = [
  {
    keywords: ['อกไก่', 'ไก่อก', 'เนื้ออกไก่', 'chicken breast', 'อกไก่ต้ม', 'อกไก่ย่าง', 'อกไก่นึ่ง'],
    nameThai: 'อกไก่ (Chicken Breast)',
    nameEn: 'Skinless Chicken Breast',
    basePortionDesc: '100 กรัม (100g)',
    baseWeightGrams: 100,
    baseCalories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sodiumMg: 74,
    vitaminsAndMinerals: [
      { name: 'Vitamin B6', amount: '0.6 mg (35% DV)', source: 'เนื้ออกไก่', benefit: 'ช่วยขบวนการเผาผลาญโปรตีนและสร้างเม็ดเลือดแดง' },
      { name: 'Niacin (B3)', amount: '13.7 mg (85% DV)', source: 'เนื้ออกไก่', benefit: 'ช่วยระบบการเปลี่ยนอาหารเป็นพลังงานระดับเซลล์' },
      { name: 'Phosphorus', amount: '228 mg (23% DV)', source: 'เนื้ออกไก่', benefit: 'ช่วยเสริมสร้างความแข็งแรงของกระดูกและกล้ามเนื้อ' },
      { name: 'Selenium', amount: '27 mcg (39% DV)', source: 'เนื้ออกไก่', benefit: 'สารต้านอนุมูลอิสระเสริมภูมิคุ้มกัน' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'อกไก่เป็นสุดยอดโปรตีนลีนไขมันต่ำมาก (High Protein, Low Fat) ช่วยรักษาอัตราการเผาผลาญและรักษามวลกล้ามเนื้อขณะทำ Calorie Deficit แนะนำปรุงด้วยการต้ม อบ หรือจี่กระทะเคลือบโดยไม่ใช้น้ำมัน',
    unitType: 'gram',
  },
  {
    keywords: ['สันในไก่', 'chicken tenderloin'],
    nameThai: 'สันในไก่ (Chicken Tenderloin)',
    nameEn: 'Chicken Tenderloin',
    basePortionDesc: '100 กรัม',
    baseWeightGrams: 100,
    baseCalories: 120,
    protein: 26,
    carbs: 0,
    fat: 1.5,
    fiber: 0,
    sodiumMg: 65,
    vitaminsAndMinerals: [
      { name: 'Vitamin B6', amount: '0.5 mg', source: 'เนื้อไก่', benefit: 'ช่วยระบบเมตาบอลิซึม' },
      { name: 'Potassium', amount: '350 mg', source: 'เนื้อไก่', benefit: 'ปรับสมดุลความดันโลหิต' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'เนื้อสันในมีความนุ่มกว่าอกไก่ตามธรรมชาติ ไขมันต่ำมาก เหมาะกับผู้ที่เบื่ออกไก่ต้มทั่วไป',
    unitType: 'gram',
  },
  {
    keywords: ['ไข่ต้ม', 'ไข่ลวก', 'boiled egg', 'soft boiled egg', 'ไข่ไก่ต้ม'],
    nameThai: 'ไข่ต้ม (Boiled Egg)',
    nameEn: 'Hard/Soft Boiled Egg',
    basePortionDesc: '1 ฟอง (~50 กรัม)',
    baseWeightGrams: 50,
    baseCalories: 74,
    protein: 6.3,
    carbs: 0.6,
    fat: 5.0,
    fiber: 0,
    sodiumMg: 71,
    vitaminsAndMinerals: [
      { name: 'Choline', amount: '147 mg (27% DV)', source: 'ไข่แดง', benefit: 'บำรุงสมองและความจำ ตับ' },
      { name: 'Vitamin B12', amount: '0.5 mcg (21% DV)', source: 'ไข่ทั้งฟอง', benefit: 'บำรุงประสาทและสร้างเม็ดเลือด' },
      { name: 'Lutein & Zeaxanthin', amount: '250 mcg', source: 'ไข่แดง', benefit: 'ปกป้องจอประสาทตาและกรองแสงสีฟ้า' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'ไข่ต้มมีโปรตีนชีวสมบูรณ์ (Biological Value สูงที่สุด) มีสารโคลีนช่วยระบบประสาท ทานได้วันละ 1-3 ฟองสำหรับคนสุขภาพปกติ',
    unitType: 'piece',
  },
  {
    keywords: ['ไข่ดาว', 'fried egg'],
    nameThai: 'ไข่ดาว (Fried Egg)',
    nameEn: 'Sunny Side Up Fried Egg',
    basePortionDesc: '1 ฟอง',
    baseWeightGrams: 55,
    baseCalories: 135,
    protein: 6.5,
    carbs: 0.8,
    fat: 11.5,
    fiber: 0,
    sodiumMg: 95,
    vitaminsAndMinerals: [
      { name: 'Vitamin A', amount: '80 mcg', source: 'ไข่แดง', benefit: 'บำรุงสายตาและภูมิคุ้มกัน' },
      { name: 'Iron', amount: '0.9 mg', source: 'ไข่แดง', benefit: 'บำรุงเม็ดเลือด' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'ไข่ดาวทอดน้ำมันจะมีพลังงานเพิ่มขึ้นเท่าตัวจากน้ำมัน แนะนำสั่งไข่ดาวน้ำ (Poached Egg) หรือไข่ดาวไร้น้ำมันในกระทะ Non-stick เพื่อลดพลังงานส่วนเกิน 60-70 kcal ต่อฟอง',
    unitType: 'piece',
  },
  {
    keywords: ['ไข่เจียว', 'omelet', 'omelette', 'ไข่เจียวหมูสับ'],
    nameThai: 'ไข่เจียว (Thai Omelette)',
    nameEn: 'Thai Style Fluffy Omelet',
    basePortionDesc: '1 จาน (ไข่ 2 ฟอง)',
    baseWeightGrams: 120,
    baseCalories: 260,
    protein: 13,
    carbs: 2.5,
    fat: 22,
    fiber: 0,
    sodiumMg: 380,
    vitaminsAndMinerals: [
      { name: 'Vitamin D', amount: '1.8 mcg', source: 'ไข่แดง', benefit: 'ช่วยการดูดซึมแคลเซียม' },
      { name: 'Zinc', amount: '1.2 mg', source: 'ไข่', benefit: 'เสริมภูมิคุ้มกัน' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'ไข่เจียวไทยฟูกรอบจะดูดซับน้ำมันปรุงอาหารสูงมาก หากกำลังคุมน้ำหนัก แนะนำเปลี่ยนเป็นไข่เจียวไร้น้ำมัน หรือไข่คน (Scrambled eggs) ใส่นมไขมันต่ำ',
    unitType: 'plate',
  },
  {
    keywords: ['ข้าวมันไก่', 'khao man gai', 'ข้าวมันไก่ต้ม'],
    nameThai: 'ข้าวมันไก่ (Hainanese Chicken Rice)',
    nameEn: 'Hainanese Steamed Chicken Rice',
    basePortionDesc: '1 จานมาตรฐาน (~350 กรัม)',
    baseWeightGrams: 350,
    baseCalories: 580,
    protein: 25,
    carbs: 68,
    fat: 23,
    fiber: 1.5,
    sodiumMg: 920,
    vitaminsAndMinerals: [
      { name: 'Vitamin B3 (Niacin)', amount: '8 mg', source: 'เนื้อไก่', benefit: 'ระบบเผาผลาญ' },
      { name: 'Sodium', amount: '920 mg', source: 'น้ำจิ้มเต้าเจี้ยวและน้ำซุป', benefit: 'โซเดียมสูง ควรจำกัดการซดน้ำซุป' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'หากต้องการลดไขมัน แนะนำสั่ง "ข้าวมันไก่เนื้ออก ไม่เอาหนัง" และขอเปลี่ยนเป็นข้าวสวยธรรมดา จะลดแคลอรี่ลงได้ทันที 150-200 kcal และลดการตักน้ำจิ้มเต้าเจี้ยวเพื่อคุมโซเดียม',
    unitType: 'plate',
  },
  {
    keywords: ['ข้าวมันไก่ไม่เอาหนัง', 'ข้าวมันไก่ต้มไม่เอาหนัง', 'ข้าวมันไก่เนื้ออก', 'ข้าวมันไก่ไม่หนัง'],
    nameThai: 'ข้าวมันไก่เนื้ออก (ไม่เอาหนัง / Skinless)',
    nameEn: 'Hainanese Steamed Chicken Rice (Skinless Breast)',
    basePortionDesc: '1 จานมาตรฐาน (~320 กรัม)',
    baseWeightGrams: 320,
    baseCalories: 430,
    protein: 29,
    carbs: 62,
    fat: 8.5,
    fiber: 1.5,
    sodiumMg: 780,
    vitaminsAndMinerals: [
      { name: 'Niacin (B3)', amount: '9.2 mg', source: 'เนื้ออกไก่', benefit: 'ช่วยเร่งการเผาผลาญพลังงาน' },
      { name: 'Phosphorus', amount: '210 mg', source: 'เนื้ออกไก่', benefit: 'เสริมสร้างกระดูกและกล้ามเนื้อ' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'การสั่งข้าวมันไก่ไม่เอาหนังช่วยตัดไขมันอิ่มตัวออกได้ถึง 14-16 กรัม และลดพลังงานลงได้ถึง 150 kcal เหมาะอย่างยิ่งสำหรับผู้ที่กำลังควบคุมน้ำหนัก',
    unitType: 'plate',
  },
  {
    keywords: ['ข้าวมันไก่ทอด', 'ข้าวมันไก่กรอบ'],
    nameThai: 'ข้าวมันไก่ทอด (ชุบแป้งทอดน้ำมัน / Deep-Fried)',
    nameEn: 'Deep-Fried Crispy Chicken Rice',
    basePortionDesc: '1 จานมาตรฐาน (~380 กรัม)',
    baseWeightGrams: 380,
    baseCalories: 720,
    protein: 22,
    carbs: 76,
    fat: 36,
    fiber: 1.2,
    sodiumMg: 1050,
    vitaminsAndMinerals: [
      { name: 'Iron', amount: '1.8 mg', source: 'เนื้อไก่', benefit: 'เสริมการนำออกซิเจนในเลือด' },
    ],
    healthRating: 'high_calorie',
    dietitianTip: 'ไก่ชุบแป้งทอดดูดซับน้ำมันปรุงอาหารสูงมาก ให้พลังงานมากกว่าไก่ต้มถึง 250-300 kcal แนะนำสลับเป็นไก่ต้มไม่เอาหนัง',
    unitType: 'plate',
  },
  {
    keywords: ['ผัดกะเพราผัดน้ำ', 'กะเพราผัดน้ำ', 'ผัดกะเพราอกไก่ผัดน้ำ', 'กะเพราอกไก่ผัดน้ำ', 'กะเพราไร้น้ำมัน', 'ผัดกะเพราไม่ใช้น้ำมัน', 'กะเพราไม่ใส่น้ำมัน', 'pad kra pao water fry'],
    nameThai: 'ผัดกะเพรา (ผัดน้ำ ไร้น้ำมัน / Water Stir-fried)',
    nameEn: 'Thai Holy Basil (Water Stir-Fried, Oil-Free)',
    basePortionDesc: '1 จานมาตรฐาน (~320 กรัม)',
    baseWeightGrams: 320,
    baseCalories: 360,
    protein: 34,
    carbs: 50,
    fat: 4.2,
    fiber: 2.8,
    sodiumMg: 820,
    vitaminsAndMinerals: [
      { name: 'Iron', amount: '2.8 mg', source: 'เนื้ออกไก่และใบกะเพรา', benefit: 'เสริมการนำออกซิเจนในเลือดและพลังงาน' },
      { name: 'Vitamin A', amount: '140 mcg', source: 'ใบกะเพราและพริกสด', benefit: 'สารต้านอนุมูลอิสระชะลอวัย' },
      { name: 'Capsaicin', amount: 'สารเผ็ดร้อนธรรมชาติ', source: 'พริกขี้หนู', benefit: 'ช่วยกระตุ้นเทอร์โมเจเนซิสเร่งการเผาผลาญ' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'ยอดเยี่ยมมาก! การผัดน้ำ (Water Stir-fry) ใช้น้ำเปล่าหรือน้ำสต็อกแทนน้ำมันพืช ช่วยลดพลังงานจากน้ำมันลงได้ถึง 180-220 kcal (ลดไขมันได้เกือบ 20 กรัม) เป็นเทคนิคทองคำของการลดไขมัน',
    unitType: 'plate',
  },
  {
    keywords: [
      'ปูผัดผงกะหรี่',
      'ปูผัดผงกระหรี่',
      'เนื้อปูผัดผงกะหรี่',
      'เนื้อปูผัดผงกระหรี่',
      'กรรเชียงปูผัดผงกะหรี่',
      'กรรเชียงปูผัดผงกระหรี่',
      'ปูผัดกะหรี่',
      'ปูผัดกระหรี่',
      'crab in curry powder',
      'stir-fried crab curry',
      'yellow curry crab',
    ],
    nameThai: 'ปูผัดผงกะหรี่ (ผัดกับน้ำมันปกติ / Oil Stir-fried)',
    nameEn: 'Stir-Fried Crab in Curry Powder (Oil Stir-Fried)',
    basePortionDesc: '1 จานมาตรฐาน (~320 กรัม)',
    baseWeightGrams: 320,
    baseCalories: 540,
    protein: 32,
    carbs: 18,
    fat: 36,
    fiber: 2.2,
    sodiumMg: 1150,
    vitaminsAndMinerals: [
      { name: 'Zinc & Selenium', amount: '5.2 mg (48% DV)', source: 'เนื้อปูแท้', benefit: 'ช่วยเสริมสร้างภูมิคุ้มกันและระบบต้านอนุมูลอิสระ' },
      { name: 'Vitamin B12', amount: '6.8 mcg (280% DV)', source: 'เนื้อปู', benefit: 'บำรุงระบบประสาท กล้ามเนื้อ และการสร้างเม็ดเลือดแดง' },
      { name: 'Curcumin', amount: 'สารออกฤทธิ์ธรรมชาติ', source: 'ผงกะหรี่ขมิ้นชัน', benefit: 'ลดการอักเสบในร่างกายและชะลอความเสื่อมของเซลล์' },
      { name: 'Choline', amount: '120 mg', source: 'ไข่ไก่ที่ใช้ผัด', benefit: 'ช่วยการทำงานของสมองและตับ' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'ปูผัดผงกะหรี่มีโปรตีนคุณภาพสูงมากจากเนื้อปูและไข่ (~32g) แต่สูตรภัตตาคารทั่วไปจะมีไขมันสูงจากน้ำมันผัด นมข้นจืด และน้ำพริกเผา (~36g fat) แนะนำตักทานเน้นเนื้อปูและผัก หลีกเลี่ยงการราดน้ำมันเยิ้มก้นจานลงบนข้าว หรือเลือกปรุงแบบ "ผัดน้ำ" เพื่อลดพลังงานลงได้ถึง 240 kcal',
    unitType: 'plate',
  },
  {
    keywords: [
      'ปูผัดผงกะหรี่ผัดน้ำ',
      'ปูผัดผงกระหรี่ผัดน้ำ',
      'ปูผัดผงกะหรี่ไร้น้ำมัน',
      'ปูผัดผงกระหรี่ไร้น้ำมัน',
      'ปูผัดผงกะหรี่คลีน',
      'ปูผัดผงกระหรี่คลีน',
      'กรรเชียงปูผัดผงกะหรี่ผัดน้ำ',
      'เนื้อปูผัดผงกะหรี่ผัดน้ำ',
    ],
    nameThai: 'ปูผัดผงกะหรี่ (ผัดน้ำ ไร้น้ำมัน / Clean)',
    nameEn: 'Stir-Fried Crab in Curry Powder (Water Stir-Fried, Low Fat)',
    basePortionDesc: '1 จานมาตรฐาน (~300 กรัม)',
    baseWeightGrams: 300,
    baseCalories: 300,
    protein: 36,
    carbs: 14,
    fat: 9.5,
    fiber: 2.8,
    sodiumMg: 720,
    vitaminsAndMinerals: [
      { name: 'Zinc & Selenium', amount: '5.8 mg (52% DV)', source: 'เนื้อปูแท้', benefit: 'เสริมภูมิคุ้มกันและเร่งการฟื้นฟูกล้ามเนื้อ' },
      { name: 'Vitamin B12', amount: '7.2 mcg', source: 'เนื้อปู', benefit: 'บำรุงประสาทและเซลล์เม็ดเลือด' },
      { name: 'Curcumin', amount: 'สารออกฤทธิ์ธรรมชาติ', source: 'ผงกะหรี่แท้', benefit: 'ต้านการอักเสบตามธรรมชาติ' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'สุดยอดเมนูไฮโปรตีน คลีนไขมัน! การผัดด้วยน้ำสต็อกและใช้นมไขมันต่ำ/ไข่ไก่โดยไม่ใส่น้ำมันพืชและน้ำพริกเผา ตัดไขมันออกได้ถึง 26 กรัม และประหยัดแคลอรี่ได้ 240 kcal อุดมไปด้วยโปรตีนลีนถึง 36g',
    unitType: 'plate',
  },
  {
    keywords: [
      'กุ้งผัดผงกะหรี่',
      'กุ้งผัดผงกระหรี่',
      'ทะเลผัดผงกะหรี่',
      'ทะเลผัดผงกระหรี่',
      'shrimp curry powder',
      'seafood curry powder',
    ],
    nameThai: 'กุ้ง/ทะเลผัดผงกะหรี่ (ผัดกับน้ำมันปกติ)',
    nameEn: 'Stir-Fried Shrimp / Seafood in Curry Powder',
    basePortionDesc: '1 จานมาตรฐาน (~320 กรัม)',
    baseWeightGrams: 320,
    baseCalories: 510,
    protein: 28,
    carbs: 18,
    fat: 34,
    fiber: 2.0,
    sodiumMg: 1100,
    vitaminsAndMinerals: [
      { name: 'Astaxanthin', amount: 'สารต้านอนุมูลอิสระเข้มข้น', source: 'เนื้อกุ้งทะเล', benefit: 'ชะลอความเสื่อมของเซลล์และบำรุงสายตา' },
      { name: 'Iron & Zinc', amount: 'แร่ธาตุจำเป็น', source: 'อาหารทะเล', benefit: 'เสริมสร้างภูมิคุ้มกัน' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'เนื้อกุ้งให้โปรตีนสูงและไขมันต่ำมาก แต่ระวังไขมันจากน้ำมันและนมข้นในการผัด แนะนำทานเนื้อกุ้งและผักเคียงเป็นหลัก',
    unitType: 'plate',
  },
  {
    keywords: ['ผัดกะเพราผัดกับน้ำมัน', 'กะเพราผัดกับน้ำมัน', 'ผัดกะเพราผัดน้ำมัน', 'กะเพราผัดน้ำมัน', 'ผัดกะเพราน้ำมันปกติ', 'กะเพราน้ำมันปกติ', 'pad kra pao with oil'],
    nameThai: 'ผัดกะเพรา (ผัดกับน้ำมันปกติ / Oil Stir-fried)',
    nameEn: 'Thai Holy Basil (Oil Stir-Fried)',
    basePortionDesc: '1 จานมาตรฐาน (~350 กรัม)',
    baseWeightGrams: 350,
    baseCalories: 580,
    protein: 26,
    carbs: 65,
    fat: 24,
    fiber: 2.2,
    sodiumMg: 1120,
    vitaminsAndMinerals: [
      { name: 'Iron', amount: '2.4 mg', source: 'เนื้อสัตว์และใบกะเพรา', benefit: 'เสริมการนำออกซิเจน' },
      { name: 'Vitamin A', amount: '120 mcg', source: 'ใบกะเพราและพริก', benefit: 'สารต้านอนุมูลอิสระ' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'กะเพราผัดกับน้ำมันปกติมีน้ำมันพืชจากการผัด 15-22 กรัม (+140-200 kcal) หากกำลังลดไขมัน แนะนำแจ้งร้านให้ "ผัดน้ำ" หรือ "ผัดน้ำมันน้อย" จะช่วยประหยัดแคลอรี่ได้มาก',
    unitType: 'plate',
  },
  {
    keywords: ['ผัดกะเพราผัดน้ำมันน้อย', 'กะเพราผัดน้ำมันน้อย', 'กะเพราน้ำมันน้อย'],
    nameThai: 'ผัดกะเพรา (ผัดน้ำมันน้อย / Light Oil)',
    nameEn: 'Thai Holy Basil (Light Oil Stir-Fried)',
    basePortionDesc: '1 จานมาตรฐาน (~330 กรัม)',
    baseWeightGrams: 330,
    baseCalories: 460,
    protein: 29,
    carbs: 60,
    fat: 12,
    fiber: 2.5,
    sodiumMg: 960,
    vitaminsAndMinerals: [
      { name: 'Iron', amount: '2.5 mg', source: 'เนื้อสัตว์และใบกะเพรา', benefit: 'เสริมการนำออกซิเจน' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'การผัดน้ำมันน้อย (ใช้น้ำมัน 1 ช้อนชา) ได้กลิ่นหอมของกระทะและยังสามารถประหยัดแคลอรี่ได้ 100-120 kcal เหมาะสำหรับผู้ที่ต้องการความสมดุล',
    unitType: 'plate',
  },
  {
    keywords: ['กะเพราหมูกรอบ', 'ผัดกะเพราหมูกรอบ', 'ข้าวกะเพราหมูกรอบ'],
    nameThai: 'ผัดกะเพราหมูกรอบ (ทอดน้ำมัน / Crispy Pork)',
    nameEn: 'Thai Holy Basil Crispy Pork Belly (Deep-Fried)',
    basePortionDesc: '1 จานมาตรฐาน (~370 กรัม)',
    baseWeightGrams: 370,
    baseCalories: 760,
    protein: 22,
    carbs: 65,
    fat: 46,
    fiber: 1.8,
    sodiumMg: 1250,
    vitaminsAndMinerals: [
      { name: 'Vitamin B1', amount: '0.6 mg', source: 'เนื้อหมู', benefit: 'ระบบเผาผลาญ' },
      { name: 'Zinc', amount: '2.8 mg', source: 'เนื้อหมู', benefit: 'การซ่อมแซมเซลล์' },
    ],
    healthRating: 'high_calorie',
    dietitianTip: 'หมูกรอบผ่านการทอดน้ำมันท่วมและมีไขมันจากชั้นไขมันหมูสูงมาก ให้พลังงานสูงถึง 760 kcal แนะนำทานเป็นมื้อ Cheat Meal หรือเปลี่ยนเป็นกะเพราอกไก่ผัดน้ำ',
    unitType: 'plate',
  },
  {
    keywords: ['ไข่ดาวน้ำ', 'ไข่ดาวไร้น้ำมัน', 'poached egg'],
    nameThai: 'ไข่ดาวน้ำ / ไข่ดาวไร้น้ำมัน (Poached Egg)',
    nameEn: 'Poached Egg / Oil-Free Egg',
    basePortionDesc: '1 ฟอง (~50 กรัม)',
    baseWeightGrams: 50,
    baseCalories: 72,
    protein: 6.3,
    carbs: 0.6,
    fat: 4.8,
    fiber: 0,
    sodiumMg: 70,
    vitaminsAndMinerals: [
      { name: 'Choline', amount: '145 mg', source: 'ไข่แดง', benefit: 'บำรุงสมองและความจำ' },
      { name: 'Lutein', amount: '240 mcg', source: 'ไข่แดง', benefit: 'บำรุงสายตา' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'ไข่ดาวน้ำหรือไข่ดาวไร้น้ำมันในกระทะ Non-stick มีไขมันเพียง 4.8g (เทียบกับไข่ดาวทอดน้ำมันที่มีไขมัน 11-14g) ประหยัดแคลอรี่ได้ 65 kcal ต่อฟอง',
    unitType: 'piece',
  },
  {
    keywords: ['ไข่ดาวกรอบ', 'ไข่ดาวทอดน้ำมัน'],
    nameThai: 'ไข่ดาวกรอบ (ทอดน้ำมัน / Crispy Fried Egg)',
    nameEn: 'Crispy Deep-Fried Egg',
    basePortionDesc: '1 ฟอง (~55 กรัม)',
    baseWeightGrams: 55,
    baseCalories: 155,
    protein: 6.5,
    carbs: 0.8,
    fat: 14,
    fiber: 0,
    sodiumMg: 95,
    vitaminsAndMinerals: [
      { name: 'Vitamin A', amount: '80 mcg', source: 'ไข่แดง', benefit: 'บำรุงสายตา' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'ไข่ดาวขอบกรอบดูดซับน้ำมันทอดสูงมาก ทำให้พลังงานพุ่งขึ้นเป็น 155 kcal หากต้องการลดไขมัน แนะนำเปลี่ยนเป็นไข่ต้ม (74 kcal) หรือไข่ดาวน้ำ (72 kcal)',
    unitType: 'piece',
  },
  {
    keywords: ['กะเพราไก่', 'ข้าวผัดกะเพราไก่', 'ข้าวกะเพราไก่', 'กะเพราไก่ไข่ดาว', 'pad kra pao chicken'],
    nameThai: 'ข้าวกะเพราไก่ (Pad Kra Pao Chicken with Rice)',
    nameEn: 'Thai Holy Basil Chicken with Rice',
    basePortionDesc: '1 จานมาตรฐาน (~350 กรัม)',
    baseWeightGrams: 350,
    baseCalories: 560,
    protein: 28,
    carbs: 66,
    fat: 21,
    fiber: 2.2,
    sodiumMg: 1100,
    vitaminsAndMinerals: [
      { name: 'Iron', amount: '2.5 mg', source: 'เนื้อไก่และใบกะเพรา', benefit: 'เสริมการนำออกซิเจนในเลือด' },
      { name: 'Vitamin A', amount: '120 mcg', source: 'ใบกะเพราและพริก', benefit: 'สารต้านอนุมูลอิสระ' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'เมนูยอดนิยมที่มีโปรตีนดี แต่มีน้ำมันผัดและโซเดียมจากซีอิ๊ว/น้ำปลาสูง แนะนำสั่ง "ใช้น้ำมันน้อย หรือผัดน้ำ" และสั่งไข่ต้มแทนไข่ดาวกรอบ',
    unitType: 'plate',
  },
  {
    keywords: ['กะเพราหมู', 'ข้าวผัดกะเพราหมู', 'ข้าวกะเพราหมู', 'pad kra pao pork'],
    nameThai: 'ข้าวกะเพราหมูสับ (Pad Kra Pao Minced Pork with Rice)',
    nameEn: 'Thai Holy Basil Minced Pork with Rice',
    basePortionDesc: '1 จาน (~360 กรัม)',
    baseWeightGrams: 360,
    baseCalories: 630,
    protein: 24,
    carbs: 66,
    fat: 29,
    fiber: 2.0,
    sodiumMg: 1180,
    vitaminsAndMinerals: [
      { name: 'Vitamin B1 (Thiamine)', amount: '0.7 mg', source: 'เนื้อหมู', benefit: 'ช่วยการทำงานของกล้ามเนื้อและระบบประสาท' },
      { name: 'Zinc', amount: '3.2 mg', source: 'เนื้อหมู', benefit: 'ภูมิคุ้มกันและการซ่อมแซมเซลล์' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'หมูสับทั่วไปมักมีมันหมูผสมถึง 30-40% หากเลือกได้ให้เลือกหมูชิ้นไม่ติดมัน หรือเปลี่ยนเป็นอกไก่เพื่อลดไขมันอิ่มตัว',
    unitType: 'plate',
  },
  {
    keywords: ['ส้มตำ', 'ส้มตำไทย', 'som tum', 'papaya salad'],
    nameThai: 'ส้มตำไทย (Papaya Salad Thai Style)',
    nameEn: 'Thai Papaya Salad',
    basePortionDesc: '1 จาน (~200 กรัม)',
    baseWeightGrams: 200,
    baseCalories: 125,
    protein: 3.8,
    carbs: 23,
    fat: 2.0,
    fiber: 3.6,
    sodiumMg: 850,
    vitaminsAndMinerals: [
      { name: 'Vitamin C', amount: '45 mg (50% DV)', source: 'มะละกอดิบ มะเขือเทศ มะนาว', benefit: 'เสริมสร้างคอลลาเจนและภูมิคุ้มกัน' },
      { name: 'Lycopene', amount: '1200 mcg', source: 'มะเขือเทศ', benefit: 'ต้านอนุมูลอิสระชะลอวัย' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'แคลอรี่ต่ำมาก ใยอาหารสูง วิตามินซีสูง เหมาะกับการลดน้ำหนัก ข้อควรระวังคือปริมาณน้ำตาลปี๊บและน้ำปลา สั่ง "หวานน้อย โซเดียมน้อย" จะดีต่อสุขภาพที่สุด',
    unitType: 'plate',
  },
  {
    keywords: ['ข้าวสวย', 'ข้าวหอมมะลิ', 'white rice', 'cooked rice', 'ข้าวขาว'],
    nameThai: 'ข้าวสวยหอมมะลิ (Cooked Jasmine Rice)',
    nameEn: 'Steamed White Jasmine Rice',
    basePortionDesc: '1 ทัพพี (~80 กรัม)',
    baseWeightGrams: 80,
    baseCalories: 104,
    protein: 2.1,
    carbs: 23.5,
    fat: 0.3,
    fiber: 0.4,
    sodiumMg: 2,
    vitaminsAndMinerals: [
      { name: 'Manganese', amount: '0.6 mg', source: 'เมล็ดข้าว', benefit: 'ช่วยขบวนการเผาผลาญคาร์โบไฮเดรต' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'ข้าวสวย 1 ทัพพี (~80g) มีพลังงานประมาณ 100 kcal ให้คาร์โบไฮเดรตสำหรับเป็นพลังงานของสมองและกล้ามเนื้อ คุมการทานที่ 1-2 ทัพพีต่อมื้อ',
    unitType: 'gram',
  },
  {
    keywords: ['ข้าวกล้อง', 'brown rice', 'ข้าวไรซ์เบอร์รี่', 'riceberry'],
    nameThai: 'ข้าวกล้อง / ข้าวไรซ์เบอร์รี่ (Brown Rice)',
    nameEn: 'Steamed Brown / Riceberry Rice',
    basePortionDesc: '1 ทัพพี (~80 กรัม)',
    baseWeightGrams: 80,
    baseCalories: 98,
    protein: 2.4,
    carbs: 21,
    fat: 0.8,
    fiber: 1.8,
    sodiumMg: 2,
    vitaminsAndMinerals: [
      { name: 'Anthocyanin', amount: 'สารต้านอนุมูลอิสระ', source: 'เยื่อหุ้มเมล็ดข้าว', benefit: 'ลดการอักเสบและชะลอการเสื่อมของเซลล์' },
      { name: 'Magnesium', amount: '40 mg', source: 'รำข้าว', benefit: 'ช่วยการผ่อนคลายของกล้ามเนื้อและควบคุมน้ำตาล' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'ดัชนีน้ำตาล (Glycemic Index) ต่ำกว่าข้าวขาว มีกากใยสูง ทำให้อิ่มนานและระดับน้ำตาลในเลือดไม่เหวี่ยงตัว',
    unitType: 'gram',
  },
  {
    keywords: ['แซลมอน', 'ปลาแซลมอน', 'salmon', 'แซลมอนย่าง'],
    nameThai: 'ปลาแซลมอน (Salmon Fillet)',
    nameEn: 'Grilled Salmon Fillet',
    basePortionDesc: '100 กรัม',
    baseWeightGrams: 100,
    baseCalories: 208,
    protein: 20.4,
    carbs: 0,
    fat: 13.4,
    fiber: 0,
    sodiumMg: 60,
    vitaminsAndMinerals: [
      { name: 'Omega-3 EPA/DHA', amount: '2200 mg', source: 'ไขมันปลาทะเล', benefit: 'บำรุงหัวใจ หลอดเลือด ลดไขมันไตรกลีเซอไรด์' },
      { name: 'Vitamin D3', amount: '11 mcg (55% DV)', source: 'เนื้อปลาแซลมอน', benefit: 'เสริมภูมิคุ้มกันและช่วยดูดซึมแคลเซียม' },
      { name: 'Astaxanthin', amount: 'สารสีส้มธรรมชาติ', source: 'เนื้อปลา', benefit: 'ต้านอนุมูลอิสระปกป้องผิวและสายตา' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'แหล่งไขมันดี (Healthy Fats) และกรดไขมันโอเมก้า 3 ที่สำคัญมากต่อสมองและหัวใจ แนะนำทานสัปดาห์ละ 2-3 ครั้ง',
    unitType: 'gram',
  },
  {
    keywords: ['เวย์โปรตีน', 'whey protein', 'เวย์'],
    nameThai: 'เวย์โปรตีนไอโซเลท (Whey Protein)',
    nameEn: 'Whey Protein Isolate / Concentrate',
    basePortionDesc: '1 สกู๊ป (~30 กรัม)',
    baseWeightGrams: 30,
    baseCalories: 120,
    protein: 25,
    carbs: 2.0,
    fat: 1.2,
    fiber: 0,
    sodiumMg: 140,
    vitaminsAndMinerals: [
      { name: 'BCAA (Leucine, Isoleucine, Valine)', amount: '5.5 g', source: 'โปรตีนนม', benefit: 'กระตุ้นการสังเคราะห์โปรตีนกล้ามเนื้อ (mTOR pathway)' },
      { name: 'Calcium', amount: '120 mg', source: 'หางนม', benefit: 'บำรุงกระดูก' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'สะดวก ดูดซึมเร็ว เหมาะมากสำหรับดื่มหลังเวทเทรนนิ่ง หรือทานเสริมในวันที่ได้รับโปรตีนจากอาหารหลักไม่ถึงเป้าหมาย 1.6g/กก.',
    unitType: 'scoop',
  },
  {
    keywords: ['กล้วยหอม', 'banana', 'กล้วย'],
    nameThai: 'กล้วยหอม (Fresh Banana)',
    nameEn: 'Cavendish Banana',
    basePortionDesc: '1 ลูกขนาดกลาง (~100 กรัม)',
    baseWeightGrams: 100,
    baseCalories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    fiber: 2.6,
    sodiumMg: 1,
    vitaminsAndMinerals: [
      { name: 'Potassium', amount: '358 mg (10% DV)', source: 'เนื้อกล้วย', benefit: 'ป้องกันตะคริวและควบคุมสมดุลน้ำในเซลล์' },
      { name: 'Vitamin B6', amount: '0.4 mg (20% DV)', source: 'เนื้อกล้วย', benefit: 'สร้างสารสื่อประสาทซีโรโทนินช่วยให้อารมณ์ดี' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'สุดยอดคาร์โบไฮเดรตเชิงพลังงานด่วน เหมาะสำหรับรับประทานก่อนออกกำลังกาย 30-45 นาที',
    unitType: 'piece',
  },
  {
    keywords: ['กาแฟดำ', 'อเมริกาโน่', 'black coffee', 'americano', 'อเมริกาโน่ไม่หวาน'],
    nameThai: 'กาแฟดำ / อเมริกาโน่ไม่หวาน (Black Coffee)',
    nameEn: 'Iced/Hot Americano (Zero Sugar)',
    basePortionDesc: '1 แก้ว (16 oz)',
    baseWeightGrams: 350,
    baseCalories: 8,
    protein: 0.4,
    carbs: 1.0,
    fat: 0.1,
    fiber: 0,
    sodiumMg: 10,
    vitaminsAndMinerals: [
      { name: 'Caffeine', amount: '120-180 mg', source: 'เมล็ดกาแฟ', benefit: 'กระตุ้นสมาธิและเพิ่มอัตราการเผาผลาญไขมัน (Fat Oxidation)' },
      { name: 'Chlorogenic Acid', amount: 'สารโพลีฟีนอล', source: 'กาแฟ', benefit: 'ต้านอนุมูลอิสระชะลอวัย' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'เครื่องดื่ม 0 แคลอรี่ที่ช่วยเพิ่มความตื่นตัวและเร่งการเผาผลาญขณะออกกำลังกาย ไม่ควรดื่มหลัง 15:00 น. เพื่อไม่ให้รบกวนคุณภาพการนอนหลับ',
    unitType: 'cup',
  },
  {
    keywords: ['สลัดอกไก่', 'chicken salad', 'สลัดผักอกไก่'],
    nameThai: 'สลัดอกไก่ย่าง (Grilled Chicken Salad)',
    nameEn: 'Grilled Chicken Breast Garden Salad',
    basePortionDesc: '1 จาน (~250 กรัม)',
    baseWeightGrams: 250,
    baseCalories: 260,
    protein: 28,
    carbs: 14,
    fat: 9,
    fiber: 4.8,
    sodiumMg: 420,
    vitaminsAndMinerals: [
      { name: 'Folate & Vitamin K', amount: '180 mcg', source: 'ผักสลัดใบเขียว', benefit: 'ช่วยการแข็งตัวของเลือดและบำรุงเซลล์' },
      { name: 'Beta-carotene', amount: '1400 mcg', source: 'แครอท มะเขือเทศ', benefit: 'ต้านอนุมูลอิสระ' },
    ],
    healthRating: 'healthy',
    dietitianTip: 'อุดมด้วยโปรตีนลีนและใยอาหาร ระวังน้ำสลัดครีมข้นซึ่งมีไขมันสูง แนะนำเลือกน้ำสลัดน้ำใส (Vinaigrette) หรืองาญี่ปุ่นแบบเบา และตักราดทีละน้อย',
    unitType: 'plate',
  },
  {
    keywords: ['ก๋วยเตี๋ยวน้ำใส', 'เส้นเล็กน้ำใส', 'บะหมี่น้ำใส', 'เกาเหลา'],
    nameThai: 'ก๋วยเตี๋ยวน้ำใสหมู/ไก่ (Clear Noodle Soup)',
    nameEn: 'Thai Rice Noodle Soup with Lean Meat',
    basePortionDesc: '1 ชาม (~400 กรัม)',
    baseWeightGrams: 400,
    baseCalories: 330,
    protein: 18,
    carbs: 48,
    fat: 7,
    fiber: 2.2,
    sodiumMg: 1350,
    vitaminsAndMinerals: [
      { name: 'Sodium', amount: '1350 mg', source: 'น้ำซุปกระดูกปรุงรส', benefit: 'ไม่ควรซดน้ำซุปจนหมดเพื่อลดความดัน' },
    ],
    healthRating: 'moderate',
    dietitianTip: 'หากต้องการลดแป้ง ให้สั่ง "เกาเหลา" (ไม่ใส่เส้น) เพิ่มถั่วงอกและผักบุ้ง และสั่ง "ไม่ใส่กระเทียมเจียว" เพื่อลดไขมันลงได้ 80-100 kcal',
    unitType: 'bowl',
  },
];

/**
 * Parses user food input using clinical database and NLP unit extraction
 */
export function analyzeFoodTextClinically(
  foodText: string,
  portionPeople: number = 1,
  notes: string = ''
): FoodItemAnalysis {
  const cleanInput = (foodText || '').trim().toLowerCase();
  const cleanNotes = (notes || '').trim().toLowerCase();
  const combinedText = `${cleanInput} ${cleanNotes}`;
  const people = Math.max(1, portionPeople || 1);

  // 1. Extract Weight in grams (e.g. 100 กรัม, 100g, 200 g)
  const gramRegex = /(\d+(\.\d+)?)\s*(กรัม|g|gram|grams|ขีด)/i;
  const gramMatch = cleanInput.match(gramRegex) || cleanNotes.match(gramRegex);

  // 2. Extract Piece/Plate Count (e.g. 1 จาน, 2 ฟอง, 3 ชิ้น, 1 ลูก)
  const countRegex = /(\d+(\.\d+)?)\s*(จาน|ชาม|ถ้วย|ฟอง|ชิ้น|ทัพพี|ลูก|แก้ว|สกู๊ป|scoop|serving|มื้อ)/i;
  const countMatch = cleanInput.match(countRegex) || cleanNotes.match(countRegex);

  // Cooking method modifiers detection
  const isWaterStirFry =
    combinedText.includes('ผัดน้ำ') ||
    combinedText.includes('ไร้น้ำมัน') ||
    combinedText.includes('ไม่ใช้น้ำมัน') ||
    combinedText.includes('ไม่ใส่น้ำมัน') ||
    combinedText.includes('water fry') ||
    combinedText.includes('water stir');

  const isOilStirFry =
    (combinedText.includes('ผัดน้ำมัน') ||
      combinedText.includes('ผัดกับน้ำมัน') ||
      combinedText.includes('ใช้น้ำมัน') ||
      combinedText.includes('น้ำมันปกติ')) &&
    !isWaterStirFry;

  const isLowOil =
    combinedText.includes('น้ำมันน้อย') ||
    combinedText.includes('ผัดน้ำมันน้อย') ||
    combinedText.includes('ใช้น้ำมันน้อย');

  const isDeepFried =
    combinedText.includes('ทอดกรอบ') ||
    combinedText.includes('ชุบแป้งทอด') ||
    (combinedText.includes('ทอด') && !combinedText.includes('ไม่ทอด') && !combinedText.includes('ไข่ทอด'));

  const isSkinless =
    combinedText.includes('ไม่เอาหนัง') ||
    combinedText.includes('ไม่ติดหนัง') ||
    combinedText.includes('ลอกหนัง') ||
    combinedText.includes('skinless');

  const hasFriedEgg =
    (combinedText.includes('ไข่ดาว') || combinedText.includes('ไข่ดาวกรอบ')) &&
    !cleanInput.startsWith('ไข่ดาว');

  const hasBoiledEgg =
    (combinedText.includes('ไข่ต้ม') || combinedText.includes('ไข่ดาวน้ำ')) &&
    !cleanInput.startsWith('ไข่ต้ม') &&
    !cleanInput.startsWith('ไข่ดาวน้ำ');

  // 3. Find closest matched food entry in the clinical database
  let matchedEntry: FoodDatabaseEntry | null = null;
  let highestMatchScore = 0;

  for (const entry of CLINICAL_FOOD_DATABASE) {
    for (const keyword of entry.keywords) {
      if (cleanInput.includes(keyword.toLowerCase()) || combinedText.includes(keyword.toLowerCase())) {
        const score = keyword.length;
        if (score > highestMatchScore) {
          highestMatchScore = score;
          matchedEntry = entry;
        }
      }
    }
  }

  // If a matched entry is found
  if (matchedEntry) {
    let multiplier = 1.0;
    let detectedPortionDesc = matchedEntry.basePortionDesc;

    if (gramMatch && gramMatch[1]) {
      const parsedGrams = parseFloat(gramMatch[1]);
      multiplier = parsedGrams / matchedEntry.baseWeightGrams;
      detectedPortionDesc = `${parsedGrams} กรัม`;
    } else if (countMatch && countMatch[1]) {
      const count = parseFloat(countMatch[1]);
      multiplier = count;
      const unit = countMatch[3];
      detectedPortionDesc = `${count} ${unit}`;
    }

    let totalKcal = Math.round(matchedEntry.baseCalories * multiplier);
    let totalProtein = Math.round(matchedEntry.protein * multiplier * 10) / 10;
    let totalCarbs = Math.round(matchedEntry.carbs * multiplier * 10) / 10;
    let totalFat = Math.round(matchedEntry.fat * multiplier * 10) / 10;
    let totalFiber = Math.round(matchedEntry.fiber * multiplier * 10) / 10;
    let totalSodium = Math.round(matchedEntry.sodiumMg * multiplier);
    let dishName = matchedEntry.nameThai;
    let advice = matchedEntry.dietitianTip;
    let healthRating = matchedEntry.healthRating;

    // Apply modifiers if not already in the matchedEntry name
    if (isWaterStirFry && !dishName.includes('ผัดน้ำ')) {
      totalFat = Math.max(3, totalFat - 15);
      totalKcal = Math.max(250, totalKcal - 140);
      dishName = dishName.replace(/\(.*?\)/g, '').trim() + ' (ผัดน้ำ ไร้น้ำมัน / Water Stir-fried)';
      healthRating = 'healthy';
      advice = 'ยอดเยี่ยมมาก! การผัดน้ำ (Water Stir-fry) ช่วยลดพลังงานจากน้ำมันพืชลงได้ถึง 150-200 kcal และลดไขมันอิ่มตัวได้ 15-20 กรัม เหมาะมากสำหรับการควบคุมไขมันสะสม';
    } else if (isOilStirFry && !dishName.includes('ผัดกับน้ำมัน')) {
      totalFat += 12;
      totalKcal += 110;
      dishName = dishName.replace(/\(.*?\)/g, '').trim() + ' (ผัดกับน้ำมันปกติ / Oil Stir-fried)';
      advice = 'จานนี้ผัดกับน้ำมันปกติ ให้พลังงานจากน้ำมันประมาณ 100-150 kcal แนะนำตักทานแบบไม่ตักน้ำมันก้นจาน หรือซับน้ำมันออก';
    } else if (isLowOil && !dishName.includes('น้ำมันน้อย')) {
      totalFat = Math.max(4, totalFat - 8);
      totalKcal = Math.max(300, totalKcal - 70);
      dishName = dishName.replace(/\(.*?\)/g, '').trim() + ' (ผัดน้ำมันน้อย / Light Oil)';
    }

    if (isSkinless && !dishName.includes('ไม่เอาหนัง')) {
      totalFat = Math.max(3, totalFat - 8);
      totalKcal = Math.max(250, totalKcal - 75);
      dishName += ' [ไม่เอาหนัง]';
    }

    if (hasFriedEgg) {
      totalFat += 11.5;
      totalProtein += 6.5;
      totalKcal += 135;
      dishName += ' + ไข่ดาวกรอบ';
    } else if (hasBoiledEgg) {
      totalFat += 5.0;
      totalProtein += 6.3;
      totalKcal += 74;
      dishName += ' + ไข่ต้ม';
    }

    const kcalPerPerson = Math.round(totalKcal / people);

    return {
      foodName: dishName,
      portionDescription: detectedPortionDesc,
      totalCalories: totalKcal,
      portionPeople: people,
      caloriesPerPerson: kcalPerPerson,
      macros: {
        protein: Math.round((totalProtein / people) * 10) / 10,
        carbs: Math.round((totalCarbs / people) * 10) / 10,
        fat: Math.round((totalFat / people) * 10) / 10,
        fiber: Math.round((totalFiber / people) * 10) / 10,
      },
      sodiumMg: Math.round(totalSodium / people),
      vitaminsAndMinerals: matchedEntry.vitaminsAndMinerals,
      healthRating,
      nutritionAdvice: advice,
      confidenceScore: 96,
    };
  }

  // Generic fallback if not explicitly in the top dictionary
  // Smart heuristic estimation
  let estimatedKcal = 380;
  let protein = 18;
  let carbs = 45;
  let fat = 12;
  let healthRating: 'healthy' | 'moderate' | 'high_calorie' = 'moderate';
  let advice = 'แนะนำทานร่วมกับผักใบเขียว ดื่มน้ำตาม และควบคุมการใช้น้ำมันปรุงอาหาร';
  let genericName = (foodText || 'อาหารปรุงสุก').trim();

  if (isWaterStirFry) {
    estimatedKcal = 320;
    fat = 4;
    protein = 28;
    carbs = 42;
    healthRating = 'healthy';
    genericName += ' (ผัดน้ำ ไร้น้ำมัน)';
    advice = 'การผัดน้ำช่วยตัดแคลอรี่จากน้ำมันพืชออกได้มากกว่า 150 kcal แนะนำทานคู่กับผักสด';
  } else if (isOilStirFry) {
    estimatedKcal = 550;
    fat = 24;
    protein = 20;
    carbs = 58;
    genericName += ' (ผัดกับน้ำมันปกติ)';
    advice = 'การผัดกับน้ำมันจะมีไขมันพืชแทรกซึม หากอยู่ในช่วงคุมแคลอรี่แนะนำตักเลี่ยงน้ำมันก้นจาน';
  } else if (isDeepFried) {
    estimatedKcal = 580;
    fat = 32;
    carbs = 50;
    protein = 20;
    healthRating = 'high_calorie';
    genericName += ' (ทอดกรอบ / Deep-Fried)';
    advice = 'เมนูทอดมักมีปริมาณไขมันอิ่มตัวสูง แนะนำสั่งแบบต้ม นึ่ง หรือย่างเมื่ออยู่ในช่วงลดไขมัน';
  } else if (combinedText.includes('ต้ม') || combinedText.includes('นึ่ง') || combinedText.includes('ย่าง')) {
    estimatedKcal = 260;
    fat = 5;
    carbs = 20;
    protein = 28;
    healthRating = 'healthy';
    advice = 'เมนูไขมันต่ำ โปรตีนดี ยอดเยี่ยมสำหรับการควบคุมแคลอรี่และรักษาความกระชับของกล้ามเนื้อ';
  }

  if (hasFriedEgg) {
    fat += 11.5;
    protein += 6.5;
    estimatedKcal += 135;
    genericName += ' + ไข่ดาวกรอบ';
  } else if (hasBoiledEgg) {
    fat += 5.0;
    protein += 6.3;
    estimatedKcal += 74;
    genericName += ' + ไข่ต้ม';
  }

  // Apply gram scaling if mentioned
  if (gramMatch && gramMatch[1]) {
    const parsedGrams = parseFloat(gramMatch[1]);
    const factor = parsedGrams / 200; // assume 200g base for unknown dish
    estimatedKcal = Math.round(estimatedKcal * factor);
    protein = Math.round(protein * factor * 10) / 10;
    carbs = Math.round(carbs * factor * 10) / 10;
    fat = Math.round(fat * factor * 10) / 10;
  }

  const kcalPerPerson = Math.round(estimatedKcal / people);

  return {
    foodName: genericName,
    portionDescription: gramMatch ? `${gramMatch[1]} กรัม` : '1 จานมาตรฐาน (~250 กรัม)',
    totalCalories: estimatedKcal,
    portionPeople: people,
    caloriesPerPerson: kcalPerPerson,
    macros: {
      protein: Math.round((protein / people) * 10) / 10,
      carbs: Math.round((carbs / people) * 10) / 10,
      fat: Math.round((fat / people) * 10) / 10,
      fiber: 3.5,
    },
    sodiumMg: 550,
    vitaminsAndMinerals: [
      { name: 'Vitamin B Complex', amount: 'ประมาณ 20-30% DV', source: 'เนื้อสัตว์และธัญพืช', benefit: 'ช่วยการเผาผลาญพลังงาน' },
      { name: 'Iron & Zinc', amount: 'แร่ธาตุพื้นฐาน', source: 'วัตถุดิบอาหาร', benefit: 'เสริมสร้างภูมิคุ้มกัน' },
    ],
    healthRating,
    nutritionAdvice: advice,
    confidenceScore: 88,
  };
}

/**
 * Generates an evidence-based clinical 3-meal plan tailored to target calories and goal
 */
export function generateClinical3MealPlan(targetCalories: number, goal: string, weightKg: number = 65) {
  const target = Math.max(1200, Math.min(3500, targetCalories || 1600));

  const bTarget = Math.round(target * 0.25);
  const lTarget = Math.round(target * 0.35);
  const sTarget = Math.round(target * 0.12);
  const dTarget = target - (bTarget + lTarget + sTarget);

  return {
    dailyTargetKcal: target,
    meals: [
      {
        mealType: 'breakfast',
        name: 'ข้าวโอ๊ตต้มไข่ขาว + อกไก่ฉีก & อโวคาโดครึ่งลูก (High Protein Oatmeal)',
        description: 'ข้าวโอ๊ต 40g ปรุงสุกในน้ำซุปผัก อกไก่ต้มฉีก 80g ไข่ต้ม 1 ฟอง และอโวคาโด 50g',
        estimatedCalories: bTarget,
        macros: {
          protein: Math.round((bTarget * 0.3) / 4),
          carbs: Math.round((bTarget * 0.45) / 4),
          fat: Math.round((bTarget * 0.25) / 9),
          fiber: 5,
        },
        keyNutrients: ['Beta-glucan (โอ๊ต)', 'Choline (ไข่)', 'Healthy MUFA Fats (อโวคาโด)'],
        weightLossTip: 'การทานโปรตีนอย่างน้อย 25-30g ในมื้อเช้าช่วยกระตุ้นฮอร์โมน Peptide YY ระงับความอยากอาหารตลอดวัน',
      },
      {
        mealType: 'lunch',
        name: 'ข้าวกะเพราอกไก่ผัดน้ำ + ไข่ต้ม & ผักเคียงแตงกวา (Clean Pad Kra Pao)',
        description: 'ข้าวกล้อง 1 ทัพพีครึ่ง (120g) อกไก่สับไม่ติดมัน 150g ผัดน้ำไม่ใช้น้ำมัน พริกกระเทียมใบกะเพรา เสิร์ฟพร้อมไข่ต้ม 1 ฟอง',
        estimatedCalories: lTarget,
        macros: {
          protein: Math.round((lTarget * 0.35) / 4),
          carbs: Math.round((lTarget * 0.45) / 4),
          fat: Math.round((lTarget * 0.2) / 9),
          fiber: 4,
        },
        keyNutrients: ['Niacin B3', 'Capsaicin (เร่งการเผาผลาญ)', 'Complex Carbs'],
        weightLossTip: 'จัดลำดับการทาน: ทานแตงกวาและโปรตีนอกไก่ก่อนเริ่มทานข้าวกล้อง ช่วยลด Glucose Spike ได้ถึง 40%',
      },
      {
        mealType: 'snack',
        name: 'กรีกโยเกิร์ตแท้ 0% ไขมัน + บลูเบอร์รี่สด & อัลมอนด์ 8 เม็ด',
        description: 'กรีกโยเกิร์ตโปรตีนสูง 150g บลูเบอร์รี่สด 40g เมล็ดอัลมอนด์อบธรรมชาติ 8 เม็ด',
        estimatedCalories: sTarget,
        macros: {
          protein: Math.round((sTarget * 0.35) / 4),
          carbs: Math.round((sTarget * 0.4) / 4),
          fat: Math.round((sTarget * 0.25) / 9),
          fiber: 3,
        },
        keyNutrients: ['Probiotics (จุลินทรีย์ลำไส้)', 'Anthocyanins', 'Vitamin E'],
        weightLossTip: 'ของว่างช่วง 15:30 น. ช่วยป้องกันอาการหิวจัดหน้ามืดก่อนมื้อเย็น',
      },
      {
        mealType: 'dinner',
        name: 'สเต๊กปลาแซลมอนย่างเกลือชมพู + สลัดผักรวม & ฟักทองนึ่ง',
        description: 'แซลมอนย่าง 120g ผักสลัดไฮโดรโปนิกส์จานใหญ่ ฟักทองญี่ปุ่นนึ่ง 80g น้ำสลัดบัลซามิก',
        estimatedCalories: dTarget,
        macros: {
          protein: Math.round((dTarget * 0.35) / 4),
          carbs: Math.round((dTarget * 0.35) / 4),
          fat: Math.round((dTarget * 0.3) / 9),
          fiber: 6,
        },
        keyNutrients: ['Omega-3 DHA/EPA', 'Magnesium (ช่วยการนอนหลับ)', 'Potassium'],
        weightLossTip: 'ลดสัดส่วนคาร์โบไฮเดรตในมื้อเย็นลง เน้นผักและปลา ช่วยให้อินซูลินลดลงช่วงนอนหลับ ส่งเสริมการหลั่ง Growth Hormone',
      },
    ],
    weightLossTips: [
      'ลำดับการรับประทานอาหาร (Food Sequencing): ทานผักใยอาหารก่อน ตามด้วยโปรตีน และปิดท้ายด้วยคาร์โบไฮเดรต เพื่อชะลอการดูดซึมน้ำตาลเข้ากระแสเลือด',
      'ดื่มน้ำ 1 แก้ว (250-300 ml) ก่อนอาหาร 20-30 นาที: ช่วยลดปริมาณแคลอรี่ที่ทานในมื้ออาหารโดยไม่รู้สึกทรมาน',
      'ตั้งหน้าต่างการทานอาหาร (14/10 หรือ 16/8 IF): หยุดรับประทานอาหารก่อนนอนอย่างน้อย 3 ชั่วโมง เพื่อให้ระบบทางเดินอาหารได้พักและเร่งกระบวนการสลายไขมันสะสม',
    ],
    supplementsGuide: [
      {
        name: 'Whey Protein Isolate',
        dosage: '1 สกู๊ป (25-30g โปรตีน)',
        timing: 'หลังออกกำลังกาย หรือเสริมระหว่างมื้อ',
        purpose: 'ช่วยให้ถึงเป้าหมายโปรตีน 1.6-2.0 กรัม/กก. ป้องกันการสลายกล้ามเนื้อขณะทำ Calorie Deficit',
      },
      {
        name: 'Omega-3 Fish Oil (EPA 500mg / DHA 250mg)',
        dosage: '1,000 - 2,000 mg ต่อวัน',
        timing: 'พร้อมมื้ออาหารเช้าหรือเที่ยง',
        purpose: 'ลดการอักเสบในเซลล์ไขมัน เพิ่มความไวต่ออินซูลิน และบำรุงสุขภาพหัวใจและหลอดเลือด',
      },
      {
        name: 'Vitamin D3 + K2',
        dosage: '1,000 - 2,000 IU ต่อวัน',
        timing: 'พร้อมอาหารมื้อที่มีไขมันดี',
        purpose: 'เสริมความแข็งแรงของกระดูก ปรับสมดุลฮอร์โมนเทสโทสเตอโรน และเพิ่มประสิทธิภาพระบบภูมิคุ้มกัน',
      },
      {
        name: 'Magnesium Glycinate / Citrate',
        dosage: '200 - 400 mg',
        timing: 'ก่อนนอน 30-45 นาที',
        purpose: 'ช่วยการคลายตัวของกล้ามเนื้อ ลดความเครียดคอร์ติซอล และเพิ่มคุณภาพการนอนหลับลึก (Deep Sleep)',
      },
    ],
  };
}
