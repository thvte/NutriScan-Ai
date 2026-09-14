import { NutrientSupplementGuide, UserProfile } from '../types';

// Calculate BMR using Mifflin-St Jeor Equation (Gold Standard)
export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
  } else {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
  }
}

// Activity Multipliers
export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2, // ไม่ออกกำลังกาย ทำงานนั่งโต๊ะ
  light: 1.375, // ออกกำลังกายเบาๆ 1-3 วัน/สัปดาห์
  moderate: 1.55, // ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์
  very_active: 1.725, // ออกกำลังกายหนัก 6-7 วัน/สัปดาห์
  extra_active: 1.9, // ซ้อมกีฬาหนัก ทำงานใช้แรงกาย
};

// Calculate TDEE
export function calculateTDEE(bmr: number, activityLevel: keyof typeof ACTIVITY_MULTIPLIERS): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

// Calculate Calorie Target based on Goal
export function calculateCalorieTarget(tdee: number, goal: 'lose_weight_fast' | 'lose_weight_mild' | 'maintain' | 'gain_muscle'): number {
  switch (goal) {
    case 'lose_weight_fast':
      // 500-750 kcal deficit (ลดประมาณ 0.5-0.75 kg/สัปดาห์)
      return Math.max(1200, Math.round(tdee - 600));
    case 'lose_weight_mild':
      // 300-400 kcal deficit (ลดแบบยั่งยืน 0.3-0.4 kg/สัปดาห์)
      return Math.max(1200, Math.round(tdee - 350));
    case 'gain_muscle':
      // Clean bulk (+250-350 kcal)
      return Math.round(tdee + 300);
    case 'maintain':
    default:
      return tdee;
  }
}

// Water calculation (weight in kg * 33 ml or recommended guidelines)
export function calculateWaterRequirementMl(weightKg: number): number {
  return Math.round(weightKg * 35);
}

// Default initial user profile
export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user_default_01',
  name: 'NutriUser',
  email: 'health.user@nutriscan.ai',
  age: 28,
  gender: 'female',
  weightKg: 60,
  heightCm: 165,
  activityLevel: 'light',
  goal: 'lose_weight_mild',
  bmr: 1358,
  tdee: 1867,
  targetCalories: 1517,
  waterTargetMl: 2100,
  targetProteinG: 90,
  targetCarbsG: 170,
  targetFatG: 50,
};

// Comprehensive Essential Nutrients, Vitamins, Minerals & Supplements Guide
export const NUTRIENT_GUIDES: NutrientSupplementGuide[] = [
  {
    category: 'macronutrient',
    name: 'โปรตีน (Protein)',
    recommendedDaily: '1.2 - 1.8 กรัมต่อน้ำหนักตัว 1 กก. (เช่น 70-110 กรัม/วัน)',
    bestFoodSources: ['อกไก่ไร้หนัง 100g (โปรตีน 31g)', 'ไข่ไก่ 1 ฟอง (โปรตีน 6g)', 'ปลาแซลมอน/ปลากระพง', 'เต้าหู้ขาว 100g (โปรตีน 8g)', 'กรีกโยเกิร์ต'],
    supplementRecommendation: 'เวย์โปรตีน (Whey Isolate หรือ Plant-based) 1 สกู๊ป (25g) หลังออกกำลังกาย หรือวันที่ทานโปรตีนจากอาหารหลักไม่เพียงพอ',
    timing: 'แบ่งทานเฉลี่ยทุกมื้อ มื้อละ 20-35 กรัม เพื่อให้กล้ามเนื้อสังเคราะห์โปรตีนได้สูงสุด',
    deficiencyWarning: 'สูญเสียมวลกล้ามเนื้อ เผาผลาญลดลง หิวง่าย ภูมิคุ้มกันต่ำลง',
  },
  {
    category: 'macronutrient',
    name: 'คาร์โบไฮเดรตเชิงซ้อน (Complex Carbs)',
    recommendedDaily: '3 - 5 กรัมต่อน้ำหนักตัว 1 กก. (45-55% ของแคลอรี่รวม)',
    bestFoodSources: ['ข้าวกล้อง / ข้าวไรซ์เบอร์รี่ 1 ทัพพี (คาร์บ 18g)', 'มันหวานนึ่ง 1 หัวกลาง', 'ข้าวโอ๊ต 40g (คาร์บ 27g)', 'ฟักทองนึ่ง', 'ถั่วเลนทิลและถั่วแดง'],
    supplementRecommendation: 'ไม่จำเป็นต้องทานเสริม เน้นคาร์บเชิงซ้อนไฟเบอร์สูง หลีกเลี่ยงน้ำตาลทรายขาวและน้ำหวาน',
    timing: 'ทานเน้นในมื้อเช้าและมื้อก่อน/หลังออกกำลังกายเพื่อเป็นพลังงานหลัก',
    deficiencyWarning: 'อ่อนเพลีย สมองล้า อารมณ์แปรปรวน สมรรถภาพออกกำลังกายลดลง',
  },
  {
    category: 'macronutrient',
    name: 'ไขมันดี (Healthy Unsaturated Fats)',
    recommendedDaily: '0.8 - 1.0 กรัมต่อน้ำหนักตัว (20-30% ของแคลอรี่รวม)',
    bestFoodSources: ['อะโวคาโด 1/2 ลูก (ไขมันดี 11g)', 'น้ำมันมะกอก Extra Virgin 1 ช้อนโต๊ะ', 'ถั่วอัลมอนด์/วอลนัท 1 กำมือ (28g)', 'เมล็ดเจีย/แฟลกซ์ซีด'],
    supplementRecommendation: 'น้ำมันปลา (Fish Oil โอเมก้า 3 EPA+DHA รวม 1,000-2,000 mg/วัน)',
    timing: 'ทานร่วมกับมื้ออาหารที่มีผัก เพื่อช่วยดูดซึมวิตามิน A, D, E, K',
    deficiencyWarning: 'ฮอร์โมนเสียสมดุล ผิวแห้งกร้าน ร่างกายดูดซึมวิตามินบางชนิดไม่ได้',
  },
  {
    category: 'vitamin',
    name: 'วิตามินดี 3 (Vitamin D3)',
    recommendedDaily: '600 - 2,000 IU ต่อวัน',
    bestFoodSources: ['แสงแดดยามเช้า (15-20 นาที)', 'ปลาแซลมอนธรรมชาติ', 'ไข่แดง', 'เห็ดตากแดด'],
    supplementRecommendation: 'Vitamin D3 (ร่วมกับ K2) 1,000 - 2,000 IU/วัน พร้อมมื้ออาหารที่มีไขมัน',
    timing: 'ทานตอนเช้าพร้อมมื้ออาหาร',
    deficiencyWarning: 'กระดูกเปราะบาง ภูมิคุ้มกันตก เสี่ยงภาวะซึมเศร้าและอ่อนเพลียเรื้อรัง',
  },
  {
    category: 'vitamin',
    name: 'วิตามินซี (Vitamin C)',
    recommendedDaily: '75 - 100 mg (หรือ 500-1,000 mg เพื่อเสริมภูมิคุ้มกัน)',
    bestFoodSources: ['ฝรั่ง 1 ลูก (วิตามินซี 200mg+)', 'พริกหวานสีแดง/เหลือง', 'ส้ม/กีวี่/สตรอว์เบอร์รี', 'บรอกโคลีลวก'],
    supplementRecommendation: 'Vitamin C 500-1,000 mg (ชนิด Buffered หรือ Time-Release เพื่อลดการระคายเคืองกระเพาะ)',
    timing: 'ทานหลังอาหารเช้าหรือเที่ยง ดื่มน้ำตามมากๆ',
    deficiencyWarning: 'เลือดออกตามไรฟัน ป่วยง่าย ผิวหนังชะลอการสร้างคอลลาเจน แผลหายช้า',
  },
  {
    category: 'vitamin',
    name: 'วิตามินบีรวม (B-Complex)',
    recommendedDaily: 'B1 (1.2mg), B2 (1.3mg), B6 (1.7mg), B12 (2.4mcg), โฟเลต (400mcg)',
    bestFoodSources: ['ไข่ไก่ทั้งฟอง', 'เนื้อไม่ติดมัน', 'ตับไก่/ตับหมู', 'ธัญพืชไม่ขัดสี', 'ผักใบเขียวเข้ม'],
    supplementRecommendation: 'Vitamin B-Complex 1 เม็ดในผู้ที่ทำงานหนัก เครียด หรือทานมังสวิรัติ (โดยเฉพาะ B12)',
    timing: 'ทานตอนเช้าพร้อมอาหารเพื่อเร่งการเผาผลาญพลังงาน',
    deficiencyWarning: 'เหน็บชา ปลายประสาทอักเสบ เหนื่อยง่าย โลหิตจาง แผลร้อนในมุมปาก',
  },
  {
    category: 'mineral',
    name: 'แคลเซียม (Calcium)',
    recommendedDaily: '800 - 1,000 mg ต่อวัน',
    bestFoodSources: ['นมจืด/นมถั่วเหลืองเสริมแคลเซียม 1 แก้ว (300mg)', 'ปลาตัวเล็กทอดกรอบ', 'งาดำคั่ว 1 ช้อนโต๊ะ', 'ผักคะน้า/กวางตุ้ง'],
    supplementRecommendation: 'Calcium L-Threonate (ดูดซึมได้ 95% ไม่ทำให้ท้องผูก) 500-800 mg หรือ Calcium Citrate',
    timing: 'ทานพร้อมมื้ออาหาร หลีกเลี่ยงการทานพร้อมอาหารเสริมธาตุเหล็ก',
    deficiencyWarning: 'กระดูกพรุน ข้อเสื่อม ตะคริว ชาตามมือและเท้า',
  },
  {
    category: 'mineral',
    name: 'ธาตุเหล็ก (Iron)',
    recommendedDaily: '10 - 15 mg ต่อวัน (หญิงวัยเจริญพันธุ์ต้องการ 15-18 mg)',
    bestFoodSources: ['เลือดหมู/ตับหมู', 'เนื้อวัวไม่ติดมัน', 'หอยแมลงภู่', 'ผักโขม/ตำลึง'],
    supplementRecommendation: 'Iron Chelate หรือ Ferrous Fumarate ตามที่แพทย์แนะนำ หากตรวจพบฮีโมโกลบินต่ำ',
    timing: 'ทานตอนท้องว่างร่วมกับวิตามินซี (ห้ามทานคู่กับชา กาแฟ หรือนม)',
    deficiencyWarning: 'ภาวะโลหิตจาง หน้ามืด วิงเวียนศีรษะ ผิวซีด หอบเหนื่อยง่าย',
  },
  {
    category: 'mineral',
    name: 'แมกนีเซียม (Magnesium)',
    recommendedDaily: '310 - 420 mg ต่อวัน',
    bestFoodSources: ['กล้วยหอม 1 ลูก', 'ดาร์กช็อกโกแลต 70%+ (20g)', 'เมล็ดฟักทอง 30g', 'ผักโขม', 'ถั่วดำ'],
    supplementRecommendation: 'Magnesium Glycinate หรือ Citrate 200-400 mg ก่อนนอน ช่วยผ่อนคลายกล้ามเนื้อและการนอนหลับ',
    timing: 'ทาน 30-60 นาทีก่อนนอน',
    deficiencyWarning: 'นอนไม่หลับ เป็นตะคริวบ่อย ไมเกรน หัวใจเต้นผิดจังหวะ เครียดง่าย',
  },
  {
    category: 'mineral',
    name: 'สังกะสี (Zinc)',
    recommendedDaily: '8 - 11 mg ต่อวัน',
    bestFoodSources: ['หอยนางรม 2 ตัว (Zinc สูงมาก)', 'เนื้อสัตว์แดง', 'เมล็ดทานตะวัน', 'ไข่แดง'],
    supplementRecommendation: 'Zinc Amino Acid Chelate 15-30 mg ต่อวัน',
    timing: 'ทานพร้อมมื้ออาหาร',
    deficiencyWarning: 'ผมร่วง ภูมิคุ้มกันตก แผลหายช้า เล็บเปราะ ต่อมรับรสผิดปกติ',
  },
  {
    category: 'supplement',
    name: 'โอเมก้า 3 (Omega-3 EPA/DHA)',
    recommendedDaily: '1,000 - 2,000 mg ต่อวัน',
    bestFoodSources: ['ปลาแซลมอน ทูน่า ซาร์ดีน แมคเคอเรล สัปดาห์ละ 2-3 มื้อ'],
    supplementRecommendation: 'Fish Oil เกรด Molecularly Distilled EPA 500mg + DHA 250mg ขึ้นไป',
    timing: 'ทานพร้อมอาหารมื้อหลัก',
    deficiencyWarning: 'ไขมันไตรกลีเซอไรด์สูง ผิวอักเสบ ข้อต่อติดขัด ความจำและสมาธิลดลง',
  },
];

// MET Database for Common Activities
export const EXERCISE_DATABASE = [
  { name: 'วิ่งจ๊อกกิ้ง (Jogging 8 km/h)', met: 8.0, defaultMins: 30, icon: 'Flame' },
  { name: 'เดินเร็ว (Brisk Walking 5 km/h)', met: 3.8, defaultMins: 45, icon: 'Footprints' },
  { name: 'ปั่นจักรยาน (Cycling Moderate)', met: 7.5, defaultMins: 30, icon: 'Bike' },
  { name: 'ว่ายน้ำ (Swimming Freestyle)', met: 8.0, defaultMins: 30, icon: 'Waves' },
  { name: 'เวทเทรนนิ่ง (Weight Training)', met: 5.0, defaultMins: 45, icon: 'Dumbbell' },
  { name: 'HIIT / บอดี้เวทเข้มข้น', met: 9.5, defaultMins: 25, icon: 'Zap' },
  { name: 'โยคะ / ยืดเหยียด (Yoga / Pilates)', met: 3.0, defaultMins: 40, icon: 'HeartPulse' },
  { name: 'ตีแบดมินตัน (Badminton)', met: 6.0, defaultMins: 45, icon: 'Activity' },
  { name: 'ชกมวย (Boxing Fitness)', met: 9.0, defaultMins: 30, icon: 'Shield' },
  { name: 'กระโดดเชือก (Jump Rope)', met: 11.0, defaultMins: 20, icon: 'Timer' },
];

export function calculateBurnedCalories(met: number, weightKg: number, durationMinutes: number): number {
  // Calories = (MET * 3.5 * weightKg / 200) * durationMinutes
  return Math.round((met * 3.5 * weightKg * durationMinutes) / 200);
}

// Preset recommended 3-meal menus for weight loss & calorie control
export const PRESET_WEIGHT_LOSS_MEALS = [
  {
    mealType: 'breakfast' as const,
    name: 'ข้าวโอ๊ตนมอัลมอนด์ กล้วยหอม และไข่ต้ม 2 ฟอง',
    description: 'คาร์บเชิงซ้อนไฟเบอร์สูง อิ่มนาน อยู่ท้อง โปรตีนสูงจากไข่ต้ม',
    estimatedCalories: 380,
    macros: { protein: 22, carbs: 45, fat: 12, fiber: 6 },
    keyNutrients: ['วิตามินบีรวม', 'แมกนีเซียม', 'โปรตีนอัลบูมิน'],
    weightLossTip: 'ไข่ต้มช่วยกระตุ้นฮอร์โมนความอิ่ม (Leptin) ลดความอยากกินจุกจิกตลอดช่วงเช้า',
  },
  {
    mealType: 'lunch' as const,
    name: 'ข้าวไรซ์เบอร์รี่ อกไก่ย่างสมุนไพร ผักสด/บล็อกโคลีลวก',
    description: 'โปรตีนไร้ไขมันจากอกไก่ ข้าวไรซ์เบอร์รี่ดัชนีน้ำตาลต่ำ ผักลวกไมโครนิวเทรียนท์แน่น',
    estimatedCalories: 450,
    macros: { protein: 42, carbs: 48, fat: 8, fiber: 7 },
    keyNutrients: ['ธาตุเหล็ก', 'วิตามินซี', 'ใยอาหารพรีไบโอติก'],
    weightLossTip: 'ทานผักเป็นลำดับแรก ตามด้วยอกไก่ และข้าวกล้องเป็นลำดับสุดท้าย เพื่อชะลอการพุ่งขึ้นของระดับน้ำตาลในเลือด (Glucose Spike)',
  },
  {
    mealType: 'dinner' as const,
    name: 'สเต็กปลากะพง/แซลมอนย่างเกลือ พร้อมสลัดผักน้ำสลัดบัลซามิก',
    description: 'มื้อเย็นเบาท้อง เน้นโปรตีนย่อยง่ายและกรดไขมันดีโอเมก้า 3',
    estimatedCalories: 390,
    macros: { protein: 35, carbs: 14, fat: 18, fiber: 5 },
    keyNutrients: ['Omega-3 (EPA/DHA)', 'วิตามิน D3', 'แคลเซียม'],
    weightLossTip: 'ลดคาร์โบไฮเดรตในมื้อเย็นเพื่อลดการกักเก็บไกลโคเจนและน้ำในร่างกาย ช่วยให้การเผาผลาญไขมันขณะนอนหลับทำงานได้เต็มที่',
  },
  {
    mealType: 'snack' as const,
    name: 'กรีกโยเกิร์ต 0% ไขมัน 150g ผสมเบอร์รี่สด 1 กำมือ',
    description: 'ของว่างโปรตีนสูง แคลเซียม และโพรไบโอติกส์เพื่อสุขภาพลำไส้',
    estimatedCalories: 140,
    macros: { protein: 15, carbs: 16, fat: 1, fiber: 3 },
    keyNutrients: ['แคลเซียม', 'วิตามินซี', 'Probiotics'],
    weightLossTip: 'ทานช่วงบ่าย 15.00-16.00 น. ป้องกันอาการหิวหน้ามืดก่อนมื้อเย็น',
  },
];

// Initial preset food logs
export const PRESET_FOOD_LOGS = [
  {
    id: 'food_init_1',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    date: new Date().toISOString().split('T')[0],
    mealType: 'breakfast' as const,
    foodName: 'ข้าวโอ๊ตนมอัลมอนด์ กล้วยหอม และไข่ต้ม 2 ฟอง',
    portionDescription: '1 ชาม (ข้าวโอ๊ต 40g + ไข่ต้ม 2 ฟอง)',
    totalCalories: 380,
    portionPeople: 1,
    caloriesPerPerson: 380,
    macros: { protein: 22, carbs: 45, fat: 12, fiber: 6 },
    sodiumMg: 180,
    vitaminsAndMinerals: [
      { name: 'วิตามินบี 12', amount: '1.2 mcg', source: 'ไข่ต้ม' },
      { name: 'แมกนีเซียม', amount: '65 mg', source: 'ข้าวโอ๊ต' },
    ],
    healthRating: 'healthy' as const,
    nutritionAdvice: 'มื้อเช้าโปรตีนสูงและใยอาหารเชิงซ้อน ช่วยคุมน้ำตาลในเลือดให้คงที่ตลอดช่วงเช้า',
    isAiAnalyzed: true,
  },
  {
    id: 'food_init_2',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    date: new Date().toISOString().split('T')[0],
    mealType: 'lunch' as const,
    foodName: 'ข้าวผัดกะเพราอกไก่ไข่ดาวน้ำ',
    portionDescription: '1 จาน (อกไก่ 150g ข้าวกล้อง 1 ทัพพี)',
    totalCalories: 480,
    portionPeople: 1,
    caloriesPerPerson: 480,
    macros: { protein: 38, carbs: 52, fat: 12, fiber: 4 },
    sodiumMg: 520,
    vitaminsAndMinerals: [
      { name: 'ธาตุเหล็ก', amount: '2.4 mg', source: 'ใบกะเพรา, อกไก่' },
      { name: 'วิตามินซี', amount: '18 mg', source: 'พริกและใบกะเพรา' },
    ],
    healthRating: 'healthy' as const,
    nutritionAdvice: 'เลือกไข่ดาวน้ำแทนไข่ดาวทอดน้ำมันท่วม ลดพลังงานไขมันแฝงได้ถึง 120 kcal',
    isAiAnalyzed: true,
  },
];

// Initial preset exercise logs
export const PRESET_EXERCISE_LOGS = [
  {
    id: 'ex_init_1',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    date: new Date().toISOString().split('T')[0],
    activityName: 'วิ่งจ๊อกกิ้ง (Jogging 8 km/h)',
    durationMinutes: 30,
    intensity: 'moderate' as const,
    caloriesBurned: 260,
  },
];

// Initial preset water logs
export const PRESET_WATER_LOGS = [
  { id: 'water_init_1', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), date: new Date().toISOString().split('T')[0], amountMl: 350 },
  { id: 'water_init_2', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), date: new Date().toISOString().split('T')[0], amountMl: 500 },
  { id: 'water_init_3', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), date: new Date().toISOString().split('T')[0], amountMl: 250 },
];

