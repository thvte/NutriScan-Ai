import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Users, Utensils, Trash2, Check, RefreshCw, AlertCircle, Info, Flame, Droplets, CheckCircle2, FileImage } from 'lucide-react';
import { FoodItemAnalysis, FoodLogEntry } from '../types';

interface FoodLoggerProps {
  onAddFoodLog: (entry: FoodLogEntry) => void;
  foodLogs: FoodLogEntry[];
  onDeleteFoodLog: (id: string) => void;
}

// Preset samples demonstrating cooking methods (ผัดน้ำ vs ผัดกับน้ำมัน)
const SAMPLE_MEALS = [
  {
    name: 'ปูผัดผงกะหรี่ (ผัดกับน้ำมันปกติ)',
    cookingStyle: 'ผัดกับน้ำมันปกติ',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    desc: 'ปูผัดผงกะหรี่หอมเครื่องเทศ ไขมันสูงจากน้ำมันและนมข้นจืด ~540 kcal',
  },
  {
    name: 'ปูผัดผงกะหรี่ (ผัดน้ำ ไร้น้ำมัน คลีน)',
    cookingStyle: 'ผัดน้ำ (ไร้น้ำมัน)',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    desc: 'สูตรคลีน ใช้น้ำสต็อกแทนน้ำมัน ลดพลังงานลง 240 kcal อุดมโปรตีนลีน ~36g',
  },
  {
    name: 'ผัดกะเพราอกไก่ (ผัดน้ำ ไร้น้ำมัน)',
    cookingStyle: 'ผัดน้ำ (ไร้น้ำมัน)',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    desc: 'กะเพราอกไก่คลีน ใช้น้ำผัดแทนน้ำมัน ลดพลังงานลง 200 kcal',
  },
  {
    name: 'ผัดกะเพราหมูสับ (ผัดกับน้ำมันปกติ) + ไข่ดาว',
    cookingStyle: 'ผัดกับน้ำมันปกติ',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    desc: 'กะเพราหมูสับผัดน้ำมันพืช เสิร์ฟพร้อมไข่ดาวขอบกรอบ',
  },
  {
    name: 'ข้าวมันไก่เนื้ออก (ไม่เอาหนัง)',
    cookingStyle: 'ต้ม / นึ่ง',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    desc: 'ข้าวมันไก่เนื้ออกล้วน ไร้หนัง ลดไขมันอิ่มตัว 15 กรัม',
  },
];

const COOKING_STYLES = [
  { id: 'water_fry', label: 'ผัดน้ำ (ไร้น้ำมัน)', icon: '💧', desc: 'ลดไขมัน ~18g ประหยัด ~180-220 kcal' },
  { id: 'oil_fry', label: 'ผัดกับน้ำมันปกติ', icon: '🍳', desc: 'มีไขมันน้ำมันพืช ~18-24g' },
  { id: 'low_oil', label: 'ผัดน้ำมันน้อย', icon: '🤏', desc: 'ใช้น้ำมัน 1 ช้อนชา ประหยัด ~100 kcal' },
  { id: 'deep_fry', label: 'ทอดกรอบ / ชุบแป้งทอด', icon: '🍗', desc: 'ไขมันสูง (+250-300 kcal)' },
  { id: 'boiled_steamed', label: 'ต้ม / นึ่ง / ลวก', icon: '♨️', desc: 'ไขมันต่ำมาก โปรตีนสูง' },
  { id: 'grilled', label: 'ย่าง / อบ', icon: '🥩', desc: 'รีดไขมันส่วนเกินออกได้ดี' },
];

const INGREDIENT_MODIFIERS = [
  { label: 'ไม่เอาหนัง', icon: '🥗' },
  { label: 'หมูกรอบ', icon: '🥓' },
  { label: '+ ไข่ดาวกรอบ', icon: '🍳' },
  { label: '+ ไข่ดาวน้ำ / ไข่ต้ม', icon: '🥚' },
];

export const FoodLogger: React.FC<FoodLoggerProps> = ({
  onAddFoodLog,
  foodLogs,
  onDeleteFoodLog,
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'text'>('photo');
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [portionPeople, setPortionPeople] = useState<number>(1);
  const [foodTextInput, setFoodTextInput] = useState('');
  const [selectedCookingStyle, setSelectedCookingStyle] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isConvertingHeic, setIsConvertingHeic] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodItemAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Camera capture state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Helper to compress and resize image using HTML5 Canvas
  const compressImageToJpeg = (blobOrFile: Blob, maxWidth = 1280, maxHeight = 1280, quality = 0.82): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('ไม่สามารถอ่านไฟล์รูปภาพได้'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => resolve(reader.result as string); // fallback to raw data
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(reader.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(blobOrFile);
    });
  };

  // Helper to convert HEIC/HEIF and read/compress images
  const processImageFile = async (file: File) => {
    if (!file) return;

    setErrorMessage(null);
    setImageFileName(file.name);

    // Auto-detect known dish keywords from filename to assist AI & clinical recognition
    const cleanFileName = file.name.replace(/\.[^/.]+$/, '').trim();
    if (!foodTextInput.trim()) {
      if (
        cleanFileName.includes('ปู') ||
        cleanFileName.includes('กะหรี่') ||
        cleanFileName.includes('กระหรี่')
      ) {
        setFoodTextInput('ปูผัดผงกะหรี่');
      } else if (cleanFileName.includes('กะเพรา') || cleanFileName.includes('กระเพรา')) {
        setFoodTextInput('ผัดกะเพรา');
      } else if (cleanFileName.includes('ข้าวมันไก่')) {
        setFoodTextInput('ข้าวมันไก่');
      } else if (cleanFileName.includes('อกไก่')) {
        setFoodTextInput('อกไก่');
      }
    }

    const isHeic =
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif') ||
      file.type.toLowerCase().includes('heic') ||
      file.type.toLowerCase().includes('heif');

    let processedBlob: Blob = file;

    if (isHeic) {
      setIsConvertingHeic(true);
      try {
        const heic2anyModule = await import('heic2any');
        const heicFn = (heic2anyModule.default || heic2anyModule) as (options: any) => Promise<Blob | Blob[]>;
        const converted = await heicFn({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.85,
        });
        processedBlob = Array.isArray(converted) ? converted[0] : converted;
      } catch (e) {
        console.warn('HEIC conversion failed or skipped:', e);
      } finally {
        setIsConvertingHeic(false);
      }
    }

    try {
      // Compress and optimize image to ensure swift network payload
      const compressedBase64 = await compressImageToJpeg(processedBlob);
      setPreviewImage(compressedBase64);
      setAnalysisResult(null);
      stopCamera();
    } catch (e: any) {
      console.error('Error processing image:', e);
      setErrorMessage('ไม่สามารถประมวลผลไฟล์รูปภาพนี้ได้ กรุณาลองใหม่อีกครั้ง');
    }
  };

  // Handle File Upload from input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    } else if (file) {
      processImageFile(file);
    }
  };

  // Start Camera
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setErrorMessage('ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้งานกล้องหรืออัปโหลดรูปภาพแทน');
      setIsCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Capture Photo from Camera
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setPreviewImage(dataUrl);
      setImageFileName('camera-shot.jpg');
      stopCamera();
    }
  };

  // Select Sample Image
  const handleSelectSample = (sample: typeof SAMPLE_MEALS[0]) => {
    setPreviewImage(sample.image);
    setImageFileName(`${sample.name}.jpg`);
    setFoodTextInput(sample.name);
    setSelectedCookingStyle(sample.cookingStyle);
    setAnalysisResult(null);
    setErrorMessage(null);
    stopCamera();
  };

  // Toggle Addon
  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Trigger AI Analysis
  const handleAnalyze = async (overrideStyle?: string) => {
    if (activeTab === 'photo' && !previewImage) {
      setErrorMessage('กรุณาเลือกหรือถ่ายรูปอาหารก่อนทำการวิเคราะห์');
      return;
    }
    if (activeTab === 'text' && !foodTextInput.trim()) {
      setErrorMessage('กรุณากรอกชื่อหรือชนิดของอาหารที่ทาน เช่น ผัดกะเพราผัดน้ำ หรือ ผัดกะเพราผัดกับน้ำมัน');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    const styleToUse = overrideStyle !== undefined ? overrideStyle : selectedCookingStyle;
    const combinedNotes = [foodTextInput, styleToUse, ...selectedAddons].filter(Boolean).join(' | ');

    try {
      const payload: any = {
        portionPeople,
        mealType: selectedMealType,
        cookingStyle: styleToUse,
        notes: combinedNotes,
      };

      if (activeTab === 'photo' && previewImage) {
        payload.imageBase64 = previewImage;
        payload.mimeType = 'image/jpeg';
        payload.fileName = imageFileName || '';
        if (foodTextInput.trim()) {
          payload.foodText = foodTextInput.trim();
        }
      } else {
        payload.foodText = foodTextInput;
      }

      const res = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      const data: FoodItemAnalysis | undefined = json.data || json.fallbackData;

      if (!res.ok && !data) {
        throw new Error(json.error || 'การวิเคราะห์ล้มเหลว กรุณาลองใหม่อีกครั้ง');
      }

      if (data) {
        setAnalysisResult(data);
        setErrorMessage(null);
      } else {
        throw new Error('ไม่สามารถวิเคราะห์ข้อมูลอาหารได้ กรุณาระบุชื่ออาหารใหม่อีกครั้ง');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'เกิดข้อผิดพลาดในการวิเคราะห์อาหาร กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Add Confirmed Analysis to Food Log
  const handleSaveToLog = () => {
    if (!analysisResult) return;

    const newLog: FoodLogEntry = {
      id: 'food_' + Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      mealType: selectedMealType,
      foodName: analysisResult.foodName,
      portionDescription: analysisResult.portionDescription,
      totalCalories: analysisResult.totalCalories,
      portionPeople: analysisResult.portionPeople || portionPeople,
      caloriesPerPerson: analysisResult.caloriesPerPerson,
      macros: analysisResult.macros,
      sodiumMg: analysisResult.sodiumMg,
      vitaminsAndMinerals: analysisResult.vitaminsAndMinerals || [],
      healthRating: analysisResult.healthRating,
      nutritionAdvice: analysisResult.nutritionAdvice,
      imageUri: previewImage || undefined,
      isAiAnalyzed: true,
    };

    onAddFoodLog(newLog);

    // Reset current form
    setAnalysisResult(null);
    setPreviewImage(null);
    setImageFileName(null);
    setFoodTextInput('');
    setSelectedCookingStyle('');
    setSelectedAddons([]);
  };

  const mealLabels = {
    breakfast: 'มื้อเช้า',
    lunch: 'มื้อเที่ยง',
    dinner: 'มื้อเย็น',
    snack: 'ของว่าง',
  };

  const isCurrentDishWaterFry =
    analysisResult?.foodName.includes('ผัดน้ำ') ||
    analysisResult?.foodName.includes('ไร้น้ำมัน');

  return (
    <div id="food-logger-container" className="space-y-6">
      {/* Logger Box */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                บันทึกอาหาร & นับแคลอรี่อัตโนมัติ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ถ่ายรูป หรือ พิมพ์ชื่ออาหาร พร้อมระบุวิธีปรุง เช่น ผัดน้ำ vs ผัดกับน้ำมัน
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
            <button
              id="tab-photo-mode"
              onClick={() => {
                setActiveTab('photo');
                setErrorMessage(null);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'photo'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              ถ่ายรูป / อัปโหลดรูปภาพ
            </button>
            <button
              id="tab-text-mode"
              onClick={() => {
                setActiveTab('text');
                stopCamera();
                setErrorMessage(null);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'text'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              พิมพ์ชื่ออาหาร
            </button>
          </div>
        </div>

        {/* Meal Type & Portion Sharing Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60">
          {/* Meal Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              เลือกมื้ออาหาร:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedMealType(type)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    selectedMealType === type
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {mealLabels[type]}
                </button>
              ))}
            </div>
          </div>

          {/* Portion Sharing Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>จำนวนคนที่แบ่งทาน (Portion Sharing):</span>
              </span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPortionPeople(num)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    portionPeople === num
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {num === 1 ? 'ทานคนเดียว' : `หาร ${num} คน`}
                </button>
              ))}
              <div className="w-20">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={portionPeople}
                  onChange={(e) => setPortionPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full py-1.5 px-2 rounded-lg text-xs text-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  placeholder="คน"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Photo Input Mode */}
        {activeTab === 'photo' && (
          <div className="space-y-4 mb-5">
            {/* Live Camera View */}
            {isCameraActive ? (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-h-72 flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" /> ถ่ายภาพนี้
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-white text-xs font-medium"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : previewImage ? (
              /* Selected Image Preview */
              <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 max-h-64 flex flex-col items-center justify-center p-2">
                <img
                  src={previewImage}
                  alt="Food to analyze"
                  className="max-h-56 w-auto object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
                {imageFileName && (
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <FileImage className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="truncate max-w-xs">{imageFileName}</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setImageFileName(null);
                      setAnalysisResult(null);
                    }}
                    className="p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white text-xs"
                    title="ลบรูปภาพ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Dropzone / Action Area with Multi-Format Support */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDraggingOver
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500'
                }`}
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <Camera className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  ถ่ายรูปอาหารจากกล้อง หรือลากไฟล์ภาพมาวางที่นี่
                </h4>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-4 max-w-md mx-auto">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">JPG</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">PNG</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">WEBP</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-mono font-bold">HEIC / HEIF (iPhone)</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">AVIF</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">GIF</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">BMP</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all"
                  >
                    <Camera className="w-4 h-4" /> เปิดกล้องถ่ายรูป
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <Upload className="w-4 h-4" /> เลือกรูปจากเครื่อง (ทุกนามสกุล)
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.jpg,.jpeg,.png,.webp,.heic,.heif,.gif,.avif,.bmp,.tiff,.svg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {isConvertingHeic && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>กำลังแปลงรูปภาพ HEIC จาก iPhone ให้เข้ากันได้กับระบบ...</span>
                  </div>
                )}
              </div>
            )}

            {/* Quick Sample Photos for Instant Testing */}
            {!previewImage && !isCameraActive && (
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-2">
                  ตัวอย่างเมนูเปรียบเทียบวิธีปรุง:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_MEALS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-left transition-all group"
                    >
                      <img
                        src={sample.image}
                        alt={sample.name}
                        className="w-10 h-10 rounded-md object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-500">
                          {sample.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{sample.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Text Input Mode */}
        {activeTab === 'text' && (
          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                กรอกชนิดหรือชื่ออาหารที่ทาน (ระบุวิธีปรุงชัดเจน เช่น ผัดน้ำ หรือ ผัดกับน้ำมัน):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={foodTextInput}
                  onChange={(e) => setFoodTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="เช่น ผัดกะเพราอกไก่ผัดน้ำ, ผัดกะเพราหมูกรอบผัดกับน้ำมัน, ข้าวมันไก่ต้มไม่เอาหนัง"
                  className="w-full py-2.5 pl-3 pr-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-emerald-500"
                />
              </div>
            </div>

            {/* Popular quick-fill suggestions */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-slate-400">เมนูแนะนำ:</span>
              {[
                'ผัดกะเพราผัดน้ำ (ไร้น้ำมัน)',
                'ผัดกะเพราผัดกับน้ำมันปกติ',
                'ผัดกะเพราหมูกรอบ',
                'ข้าวมันไก่ต้มไม่เอาหนัง',
                'ส้มตำไทย + อกไก่ย่าง',
                'ไข่ดาวน้ำ (ไร้น้ำมัน)',
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFoodTextInput(item)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-600"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Cooking Technique & Modifier Controls */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>ระบุวิธีปรุง / ใช้น้ำมัน (Cooking Technique):</span>
              </label>
              {selectedCookingStyle && (
                <button
                  type="button"
                  onClick={() => setSelectedCookingStyle('')}
                  className="text-[11px] text-slate-400 hover:text-rose-500"
                >
                  ล้างตัวเลือก
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COOKING_STYLES.map((style) => {
                const isSelected = selectedCookingStyle === style.label;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedCookingStyle(isSelected ? '' : style.label)}
                    className={`p-2 rounded-lg text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span>{style.icon}</span>
                      <span>{style.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {style.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-on Modifiers */}
          <div>
            <span className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              ส่วนประกอบเพิ่มเติม:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {INGREDIENT_MODIFIERS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.label);
                return (
                  <button
                    key={addon.label}
                    type="button"
                    onClick={() => toggleAddon(addon.label)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{addon.icon}</span>
                    <span>{addon.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional notes input */}
          {activeTab === 'photo' && previewImage && (
            <div>
              <input
                type="text"
                value={foodTextInput}
                onChange={(e) => setFoodTextInput(e.target.value)}
                placeholder="ระบุข้อความเพิ่มเติม (เช่น ไม่ใส่น้ำตาล, อกไก่ 150g)"
                className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400"
              />
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Analyze Action Button */}
        {!analysisResult && (
          <button
            id="btn-trigger-ai-analysis"
            type="button"
            disabled={isAnalyzing || (activeTab === 'photo' && !previewImage) || (activeTab === 'text' && !foodTextInput)}
            onClick={() => handleAnalyze()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-md shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>กำลังวิเคราะห์รายละเอียดอาหารและคำนวณแคลอรี่...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>วิเคราะห์แคลอรี่ตามวิธีปรุง (Convert to Calories)</span>
              </>
            )}
          </button>
        )}

        {/* Analysis Result Display */}
        {analysisResult && (
          <div className="mt-5 p-4 sm:p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-emerald-100 dark:border-emerald-900/40 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    ผลการวิเคราะห์โภชนาการ
                  </span>
                  {isCurrentDishWaterFry ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> ผัดน้ำ ไร้น้ำมัน
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 flex items-center gap-1">
                      <Flame className="w-3 h-3" /> ผัดกับน้ำมัน
                    </span>
                  )}
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {analysisResult.foodName}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {analysisResult.portionDescription}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {portionPeople > 1 ? `ส่วนแบ่งของคุณ (${portionPeople} คน):` : 'แคลอรี่สุทธิ:'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {analysisResult.caloriesPerPerson}
                  <span className="text-sm font-normal ml-1">kcal</span>
                </span>
                {portionPeople > 1 && (
                  <span className="text-[11px] text-slate-400 block">
                    (ทั้งจานรวม: {analysisResult.totalCalories} kcal)
                  </span>
                )}
              </div>
            </div>

            {/* Quick Cooking Method Comparison & Toggle */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {isCurrentDishWaterFry
                      ? 'คุณประหยัดพลังงานได้ถึง ~180-220 kcal จากการผัดน้ำ'
                      : 'หากเปลี่ยนเป็น "ผัดน้ำ (ไร้น้ำมัน)" จะลดพลังงานได้ถึง ~180-220 kcal'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isCurrentDishWaterFry
                      ? 'ไขมันต่ำมาก เหมาะสำหรับการควบคุมระดับไขมันและน้ำหนักตัว'
                      : 'คลิกสลับวิธีปรุงด้านล่างเพื่อเปรียบเทียบแคลอรี่ทันที'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleAnalyze('ผัดน้ำ (ไร้น้ำมัน)')}
                  disabled={isAnalyzing}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isCurrentDishWaterFry
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  💧 ดูผลแบบ ผัดน้ำ
                </button>
                <button
                  type="button"
                  onClick={() => handleAnalyze('ผัดกับน้ำมันปกติ')}
                  disabled={isAnalyzing}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !isCurrentDishWaterFry
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  🍳 ดูผลแบบ ผัดน้ำมัน
                </button>
              </div>
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">โปรตีน</span>
                <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                  {analysisResult.macros.protein}g
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">คาร์บ</span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                  {analysisResult.macros.carbs}g
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">ไขมัน</span>
                <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">
                  {analysisResult.macros.fat}g
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">ใยอาหาร / โซเดียม</span>
                <span className="text-base font-extrabold text-teal-600 dark:text-teal-400">
                  {analysisResult.macros.fiber || 0}g / {analysisResult.sodiumMg || 0}mg
                </span>
              </div>
            </div>

            {/* Vitamins & Minerals Found */}
            {analysisResult.vitaminsAndMinerals && analysisResult.vitaminsAndMinerals.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  วิตามินและแร่ธาตุสำคัญที่ได้รับ:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.vitaminsAndMinerals.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200"
                    >
                      {item.name}: {item.amount} ({item.source})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dietitian Advice */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white">คำแนะนำจากนักโภชนาการ: </span>
                <span>{analysisResult.nutritionAdvice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveToLog}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Check className="w-4 h-4" /> บันทึกลงในไดอารี่ประจำวัน
              </button>
              <button
                type="button"
                onClick={() => setAnalysisResult(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-300 transition-all"
              >
                ถ่ายใหม่ / เปลี่ยนตัวเลือก
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Today's Food Logs List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Utensils className="w-4 h-4 text-emerald-500" />
            <span>รายการอาหารที่ทานวันนี้ ({foodLogs.length})</span>
          </h4>
          <span className="text-xs text-slate-500">
            รวม: {foodLogs.reduce((sum, l) => sum + (l.caloriesPerPerson || 0), 0)} kcal
          </span>
        </div>

        {foodLogs.length === 0 ? (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
            ยังไม่มีรายการอาหารที่บันทึกสำหรับวันนี้ เริ่มถ่ายรูปอาหารด้านบนได้เลย!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {foodLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {log.imageUri ? (
                    <img
                      src={log.imageUri}
                      alt={log.foodName}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Utensils className="w-5 h-5" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                        {log.foodName}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {mealLabels[log.mealType]}
                      </span>
                      {log.portionPeople > 1 && (
                        <span className="text-[10px] text-slate-400">
                          (หาร {log.portionPeople} คน)
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      P: {log.macros?.protein || 0}g • C: {log.macros?.carbs || 0}g • F: {log.macros?.fat || 0}g
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {log.caloriesPerPerson} kcal
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeleteFoodLog(log.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="ลบรายการนี้"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

