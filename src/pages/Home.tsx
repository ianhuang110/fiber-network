import { ArrowRight, FileText, X, ArrowDownUp, Zap, Users } from 'lucide-react';
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
        {/* Deep background color (#0D1117) */}
        <div className="absolute inset-0 bg-[#0D1117] -z-30"></div>
        
        {/* Technological Pulse Grid (#30363D) */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#30363D_1px,transparent_1px),linear-gradient(to_bottom,#30363D_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_80%,transparent_100%)] opacity-80"></div>
        
        {/* Pulsing Light Nodes (Data Blue #58A6FF & Running Green #238636) */}
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-[#58A6FF]/15 rounded-full blur-[100px] mix-blend-screen animate-pulse -z-10"></div>
        <div className="absolute bottom-[0%] right-[15%] w-[500px] h-[500px] bg-[#238636]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse -z-10" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        
        {/* Scanline Overlay */}
        <div className="absolute inset-0 -z-10 pointer-events-none mix-blend-overlay opacity-30" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.2) 50%)', backgroundSize: '100% 4px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#238636]/10 text-[#238636] text-sm font-semibold mb-6 shadow-sm border border-[#238636]/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#238636] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#238636]"></span>
                </span>
                狀態：全網監控中．穩定運行
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                住社區就要裝<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#238636] drop-shadow-[0_0_15px_rgba(88,166,255,0.3)]">
                  專屬社區網路
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                雙向 300M 極速光纖，遊戲不卡頓，追劇不轉圈。每月只需 300 元，綁約 3 年即送光纖設備，為您打造最穩定的居家網路體驗。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/apply')}
                  className="group relative px-8 py-4 bg-[#0D1117] border border-[#58A6FF]/40 text-white font-semibold rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(88,166,255,0.2)] hover:shadow-[0_0_25px_rgba(88,166,255,0.4)] transition-all hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#58A6FF]/80 to-[#238636]/80 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2 text-[#58A6FF] group-hover:text-[#79b8ff]">
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
              <div className="absolute inset-0 bg-gradient-to-tr from-[#58A6FF]/30 to-[#238636]/30 rounded-[3rem] blur-3xl opacity-50 -z-10"></div>
              <div className="relative bg-[#0D1117]/60 backdrop-blur-xl border border-[#30363D] rounded-[2rem] p-4 shadow-2xl">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#0D1117] overflow-hidden relative group border border-[#30363D]/50">
                  <div className="absolute inset-0 bg-[#58A6FF]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src="/cute_white_robot.png" alt="Cute White AI Robot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* HUD Elements */}
                  <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="w-2 h-2 rounded-full bg-[#58A6FF] animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-[#238636]" style={{ animation: 'pulse 3s infinite' }}></div>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20 font-mono text-xs text-[#58A6FF] opacity-80 tracking-widest bg-[#0D1117]/50 px-2 py-1 rounded backdrop-blur-sm">
                    SYS.MONITOR //
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Fiber Section */}
      <section className="relative py-24 bg-[#05080f] border-y border-[#30363D]/50 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">為什麼選擇 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#238636]">極速光纖</span>？</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">超越傳統寬頻體驗，專為現代高畫質影音與即時互動打造的新世代網路。</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <ArrowDownUp size={32} className="text-[#58A6FF]" />,
                title: "對稱網路",
                desc: "上傳與下載一樣快，完美適合視訊會議與大型檔案傳送。",
                delay: 0.1
              },
              {
                icon: <Zap size={32} className="text-[#238636]" />,
                title: "極低延遲",
                desc: "毫秒級反應時間，競技類遊戲不掉速，搶奪先機毫不卡頓。",
                delay: 0.2
              },
              {
                icon: <Users size={32} className="text-[#58A6FF]" />,
                title: "多人共享",
                desc: "智慧頻寬分流技術，同時連接多個裝置依然順暢不卡頓。",
                delay: 0.3
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="group p-8 rounded-3xl bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF]/50 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#58A6FF]/5 to-[#238636]/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="w-16 h-16 rounded-2xl bg-[#0B0F19] border border-[#30363D] flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(88,166,255,0.2)] transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
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
