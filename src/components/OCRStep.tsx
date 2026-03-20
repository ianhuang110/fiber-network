import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, UploadCloud, RefreshCw, ShieldCheck, AlertTriangle } from 'lucide-react';
import Tesseract from 'tesseract.js';

interface FormData {
  name: string;
  idNumber: string;
  birthday: string;
  address: string;
}

export default function OCRStep({ onComplete, formData }: { onComplete: () => void, formData: FormData }) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'scanning' | 'success' | 'error'>('idle');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [progressText, setProgressText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      startOCRProcess(url);
    }
  };

  const startOCRProcess = async (imageUrl: string) => {
    setStatus('uploading');
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('scanning');
    setProgressText('初始化 AI 辨識引擎...');

    try {
      const result = await Tesseract.recognize(
        imageUrl,
        'chi_tra+eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgressText(`正在擷取證件文字... ${Math.round(m.progress * 100)}%`);
            } else if (m.status.includes('loading')) {
              setProgressText('載入光學字元辨識模型中...');
            }
          }
        }
      );

      const text = result.data.text.replace(/\s/g, '');
      console.log("OCR Extracted text:", text);

      // Verify if the extracted text contains the user's ID number, Name, and ROC Year
      const isIdMatch = text.includes(formData.idNumber);
      const isNameMatch = text.includes(formData.name);
      
      const rocYear = formData.birthday ? (parseInt(formData.birthday.split('/')[0]) - 1911).toString() : '';
      const isYearMatch = rocYear ? text.includes(rocYear) : false;

      // 嚴格比對：必須在證件上同時找到相對應的姓名、身分證字號與出生年份（民國）
      if (isIdMatch && isNameMatch && isYearMatch) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('防偽比對失敗：辨識出的證件資料與您填寫的基本資料不一致！（請確保上傳的為本人的真實身分證，且資料相符）');
      }
    } catch (err) {
      console.error("OCR Error:", err);
      setStatus('error');
      setErrorMessage('證件文字解析發生錯誤，請重新上傳或更換清晰的照片。');
    }
  };

  const resetProcess = () => {
    setStatus('idle');
    setUploadedImage(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">證件 OCR 認證與防偽</h2>
      <p className="text-gray-500 text-sm mb-8">
        NCC 要求落實實名制，請上傳您的身分證正面。系統將自動提取資訊並進行防偽檢測。
      </p>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 bg-gray-50 hover:bg-shrek-50 hover:border-shrek-300 transition-all cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-shrek-500 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-700 text-lg">點擊或拖曳上傳身分證正面</p>
                <p className="text-sm text-gray-500 mt-2">支援 JPG, PNG 格式，請確保無反光、字跡清晰</p>
              </div>
            </motion.div>
          )}

          {(status === 'uploading' || status === 'scanning') && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-900 aspect-[1.6/1]"
            >
              {/* Display exactly what the user uploaded */}
              {uploadedImage && (
                <img src={uploadedImage} alt="Uploaded ID" className="absolute inset-0 w-full h-full object-contain opacity-60" />
              )}
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/50 backdrop-blur-sm transition-opacity p-6 text-center">
                <RefreshCw size={40} className="text-shrek-400 animate-spin mb-4 drop-shadow-lg" />
                <p className="text-white font-bold text-lg drop-shadow-md">
                  {status === 'uploading' ? '影像安全連線中...' : '進行真實端點光學字元辨識 (OCR)'}
                </p>
                {status === 'scanning' && (
                  <p className="text-shrek-300 text-sm mt-3 flex items-center justify-center gap-2 drop-shadow-md bg-black/30 px-4 py-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-shrek-400 animate-ping"></span>
                    {progressText || '正在擷取與比對資料...'}
                  </p>
                )}
              </div>

              {/* Scanning laser line */}
              {status === 'scanning' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-shrek-400 shadow-[0_0_20px_#3fb897] z-20 animate-scan"></div>
              )}
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-xl text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">認證與比對成功</h3>
              <p className="text-gray-500 mb-6">防偽檢測通過，且證件資料與您填寫的基本資料完全一致！</p>
              
              <div className="bg-gray-50 rounded-2xl p-5 text-left mb-8 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center gap-1">
                  <ShieldCheck size={14} /> 資料一致
                </div>
                <div className="grid grid-cols-2 gap-y-4 text-sm mt-2">
                  <div className="text-gray-500">姓名</div>
                  <div className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{formData.name}</div>
                  <div className="text-gray-500">身分證字號</div>
                  <div className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{formData.idNumber}</div>
                  <div className="text-gray-500">出生年月日</div>
                  <div className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{formData.birthday}</div>
                </div>
              </div>

              <button 
                onClick={onComplete}
                className="w-full py-4 bg-shrek-600 hover:bg-shrek-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-shrek-500/30"
              >
                確認無誤，前往下一步
              </button>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center max-w-sm w-full"
            >
              <div className="bg-red-50 border border-red-100 rounded-3xl p-8 shadow-sm">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                  <AlertTriangle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">認證失敗</h3>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">{errorMessage}</p>
                
                <button 
                  onClick={resetProcess}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95"
                >
                  <RefreshCw size={20} />
                  重新上傳證件
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
    </div>
  );
}
