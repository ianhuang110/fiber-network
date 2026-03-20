import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function FaceMatchStep({ onComplete }: { onComplete: () => void }) {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'success' | 'failed'>('idle');

  const capture = useCallback(() => {
    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImageSrc(image);
      setStatus('analyzing');
      
      // Simulate face matching and liveness detection
      setTimeout(() => {
        setStatus('success'); // for demo purposes
      }, 3500);
    }
  }, [webcamRef]);

  const retake = () => {
    setImageSrc(null);
    setStatus('idle');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">人臉活體比對</h2>
      <p className="text-gray-500 text-sm mb-6">
        為確保由本人親自申辦，請將臉部對準框線內並保持平視。我們會驗證您的活體特徵與證件照片是否一致。
      </p>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-sm aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
          
          <AnimatePresence mode="wait">
            {!imageSrc ? (
              <motion.div 
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative"
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  className="w-full h-full object-cover"
                />
                
                {/* Face Guide Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-2/3 aspect-[3/4] border-2 border-shrek-400 border-dashed rounded-full opacity-60"></div>
                </div>

                {/* Instructions Overlay */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                  <button 
                    onClick={capture}
                    className="flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md p-1 border border-white/50 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center text-shrek-600">
                        <Camera size={24} />
                      </div>
                    </div>
                    <span className="text-white text-xs font-semibold drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">點擊拍攝</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full relative"
              >
                <img src={imageSrc} alt="Captured Face" className="w-full h-full object-cover" />
                
                {/* Scanning overlay */}
                {status === 'analyzing' && (
                  <div className="absolute inset-0 bg-shrek-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
                    <div className="w-32 h-32 relative mb-6">
                      <div className="absolute inset-0 border-4 border-shrek-400 rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-2 border-4 border-teal-300 rounded-full border-b-transparent animate-spin-reverse delay-150"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <RefreshCcw size={32} className="text-white animate-pulse" />
                      </div>
                    </div>
                    <p className="text-white font-bold text-xl tracking-wider">活體特徵分析中</p>
                    <p className="text-shrek-200 text-sm mt-2">正在與身分證照片比對 84 個特徵點...</p>
                  </div>
                )}

                {status === 'success' && (
                  <div className="absolute inset-0 bg-green-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl shadow-green-500/50"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-extrabold text-white mb-2">比對一致</h3>
                    <p className="text-green-100 text-lg mb-8">相似度 98.7% / 活體驗證通過</p>
                    <button 
                      onClick={onComplete}
                      className="w-full py-4 bg-white text-green-700 font-bold rounded-2xl shadow-xl hover:bg-green-50 transition-colors"
                    >
                      完成並前往簽約
                    </button>
                  </div>
                )}

                {status === 'failed' && (
                  <div className="absolute inset-0 bg-red-900/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center">
                    <ShieldAlert size={64} className="text-red-400 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">比對失敗</h3>
                    <p className="text-red-100 mb-8">無法確認為同一人或未通過活體驗證，請重新拍攝。</p>
                    <button 
                      onClick={retake}
                      className="px-8 py-3 bg-white text-red-600 font-bold rounded-xl shadow-xl"
                    >
                      重新拍攝
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
