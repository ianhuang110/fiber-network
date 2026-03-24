import { ArrowRight, FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [showContract, setShowContract] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Background gradient & pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] to-[#05080f] -z-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-sm font-semibold mb-6 shadow-sm border border-teal-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                2026 頻寬再升級，社區首選
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                住社區就要裝<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                  專屬社區網路
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                雙向 300M 極速光纖，遊戲不卡頓，追劇不轉圈。每月只需 300 元，綁約 3 年即送光纖設備，為您打造最穩定的居家網路體驗。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/apply')}
                  className="group relative px-8 py-4 bg-[#0B0F19] border border-teal-500/50 text-white font-semibold rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2 text-teal-400 group-hover:text-teal-300">
                    立即預約申請
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>

                </button>
              </div>
            </motion.div>

            {/* Right Side Visuals */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/30 to-blue-600/30 rounded-[3rem] blur-3xl opacity-50"></div>
              <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                <div className="w-full aspect-[4/3] rounded-2xl bg-gray-900 overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2670&auto=format&fit=crop" alt="Abstract Network Diagram" className="w-full h-full object-cover mix-blend-screen opacity-90 transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contract Template Section */}
      <section className="relative py-24 bg-[#0B0F19] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 inline-block mb-4">中華電信合約書</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10">為了提供您最高品質與穩定的連線，我們採用中華電信光世代企業級線路，保障社區網路的絕對品質。</p>
            
            <button 
              onClick={() => setShowContract(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#131B2F] border border-teal-500/50 text-white font-semibold rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FileText className="text-teal-400" size={24} />
              <span className="relative z-10 text-lg">開啟合約書預覽 (PDF)</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contract PDF Modal */}
      <AnimatePresence>
        {showContract && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowContract(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#131B2F] rounded-3xl w-full max-w-5xl h-[85vh] sm:h-[90vh] shadow-2xl flex flex-col border border-gray-800 overflow-hidden relative"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0B0F19]">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-teal-400" size={20} />
                  中華電信合約書
                </h3>
                <button 
                  onClick={() => setShowContract(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 bg-gray-900 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none z-0">
                  <FileText className="text-gray-700 w-24 h-24 mb-6" />
                  <p className="text-gray-400 text-lg">載入合約書中...</p>
                  <p className="text-gray-600 text-sm mt-4">請確認是否已將 PDF 放置於 public/contract.pdf</p>
                </div>
                <iframe 
                  src="/contract.pdf" 
                  title="中華電信合約書"
                  className="w-full h-full border-none relative z-10 bg-transparent"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
