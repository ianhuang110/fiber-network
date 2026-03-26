import { ArrowRight, ArrowDownUp, Zap, Users, CheckCircle2, X, ChevronDown, HelpCircle, PhoneCall, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// FAQ Content Data
const FAQs = [
  {
    question: "申裝流程需要多長時間？",
    answer: "完成線上預約後，我們的專屬客服專員會於3天內與您聯繫確認需求與方案。一般來說，最快3-7個工作天內即可安排專業技師到府安裝。實際到府施工時間約1天時間，安裝完畢即可立即上網！"
  },
  {
    question: "光纖路由器設備需要另外付費租用嗎？",
    answer: "需要！只要您申辦我們的【專屬社區網路】雙向 300M 方案並綁約三年，我們就會免費提供並安裝一台光纖設備，若您有需要Wi-Fi 6 路由器我們將額外報價收費。"
  },
  {
    question: "網路速度真的能穩跑「雙向 300M」嗎？",
    answer: "是的！不同於傳統寬頻非對稱且需與全區住戶塞車的線路，我們採用專線直達本社區機房，並透過智慧型網路頻寬分配技術，保證您在下班尖峰時段無論是「下載追劇」或「上傳大型檔案」，都能享有極低延遲與暢快網速。"
  },
  {
    question: "合約到期後費用會突然調漲嗎？",
    answer: "請您放心，合約到期後不會無緣無故調漲原合約費用。到期時我們會提醒您續約，您不但可以用原價繼續享受服務，屆時還可能會有更優惠的網速升級方案供老客戶選擇！"
  },
  {
    question: "要是網路臨時斷線，維修報修快嗎？",
    answer: "我們擁有 24 小時的社區主幹網路監控系統，若有設備層級異常我們常比住戶更早發現。住戶若遇連線問題，可直接撥打客服專線，我們會優先派遣技師前往您的社區為您處理，免去傳統電信層層轉接客服總機的漫長等待。"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [showContractModal, setShowContractModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Top Welcome Section */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-[#0D1117]">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#30363D_1px,transparent_1px),linear-gradient(to_bottom,#30363D_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_80%,transparent_100%)] opacity-80"></div>
        
        {/* Pulsing Light Nodes */}
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-[#58A6FF]/10 rounded-full blur-[100px] mix-blend-screen animate-pulse -z-10"></div>
        <div className="absolute bottom-[0%] right-[15%] w-[500px] h-[500px] bg-[#238636]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse -z-10" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#238636]/10 text-[#238636] text-sm font-semibold mb-6 shadow-sm border border-[#238636]/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#238636] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#238636]"></span>
                </span>
                狀態：全網監控中．穩定運行
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 mt-2">
                住社區就要裝<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#238636] drop-shadow-[0_0_15px_rgba(88,166,255,0.3)]">
                  專屬社區網路
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed font-light mx-auto lg:mx-0 max-w-xl">
                雙向 300M 極速光纖，遊戲不卡頓，追劇不轉圈。每月只需 300 元，綁約 3 年即送光纖設備，為您打造最穩定的居家網路體驗。
              </p>

              <button 
                onClick={() => navigate('/apply')}
                className="group relative px-8 py-4 bg-[#0D1117] border border-[#58A6FF]/40 text-white font-semibold text-lg rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(88,166,255,0.2)] hover:shadow-[0_0_25px_rgba(88,166,255,0.4)] transition-all hover:-translate-y-1 inline-flex w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#58A6FF]/80 to-[#238636]/80 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2 text-[#58A6FF] group-hover:text-[#79b8ff] w-full">
                  立即預約申請
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>

            {/* Right Side Visuals */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative block mt-12 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#58A6FF]/30 to-[#238636]/30 rounded-[3rem] blur-3xl opacity-50 -z-10"></div>
              <div className="relative bg-[#0D1117]/60 backdrop-blur-xl border border-[#30363D] rounded-[2rem] p-4 shadow-2xl">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#0D1117] overflow-hidden relative group border border-[#30363D]/50">
                  <div className="absolute inset-0 bg-[#58A6FF]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src={`${import.meta.env.BASE_URL}fiber_optic_network.png`} alt="Fiber Optic Network" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Moving Light Pulses Overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen">
                    <motion.div 
                      className="absolute top-[30%] left-0 w-2/3 h-[4px] bg-gradient-to-r from-transparent via-[#58A6FF] to-transparent opacity-100 blur-[1px] drop-shadow-[0_0_15px_rgba(88,166,255,1)]"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div 
                      className="absolute top-[60%] left-0 w-1/2 h-[6px] bg-gradient-to-r from-transparent via-[#238636] to-transparent opacity-100 blur-[2px] drop-shadow-[0_0_15px_rgba(35,134,54,1)]"
                      animate={{ x: ['-100%', '250%'] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                    />
                    <motion.div 
                      className="absolute left-[40%] top-0 w-[4px] h-1/2 bg-gradient-to-b from-transparent via-[#58A6FF] to-transparent opacity-100 blur-[1px] drop-shadow-[0_0_15px_rgba(88,166,255,1)]"
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear', delay: 0.1 }}
                    />
                    <motion.div 
                      className="absolute -left-[50%] top-[40%] w-[150%] h-[4px] bg-gradient-to-r from-transparent via-[#79b8ff] to-transparent opacity-100 rotate-12 blur-[1px] drop-shadow-[0_0_15px_rgba(121,184,255,1)]"
                      animate={{ x: ['-50%', '150%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
                    />
                  </div>

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

      {/* Comparison Section */}
      <section className="relative py-24 bg-[#0D1117] z-10 border-b border-[#30363D]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">真實對比，<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#238636]">高下立判</span></h2>
            <p className="text-gray-400">不再被傳統合約綁架，用最合理的價格享受最優質的網路</p>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-[#30363D] bg-[#05080f] pb-2 md:pb-0 shadow-2xl">
            <div className="overflow-x-auto pt-5">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-5 md:p-6 border-b border-[#30363D] text-gray-400 font-medium w-1/4">比較項目</th>
                    <th className="p-5 md:p-6 border-b border-t-4 border-[#238636] border-b-[#30363D] text-white font-bold text-lg bg-[#238636]/10 w-2/5 border-l border-r border-x-[#238636]/20 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#238636] text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(35,134,54,0.5)] whitespace-nowrap">
                        專屬首選
                      </div>
                      社區網路
                    </th>
                    <th className="p-5 md:p-6 border-b border-[#30363D] text-gray-500 font-medium w-[35%]">一般傳統電信</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363D]/50">
                  {[
                    { label: '月租費', us: '300 元 / 月', them: '約 899 - 1,299 元', usIcon: <CheckCircle2 className="inline mr-2 text-[#238636]" size={18}/>, themIcon: <X className="inline mr-2 text-red-900" size={18}/> },
                    { label: '頻寬速率', us: '雙向 300M (上傳保證)', them: '300M / 150M (非對稱)', usIcon: <CheckCircle2 className="inline mr-2 text-[#238636]" size={18}/>, themIcon: <X className="inline mr-2 text-red-900" size={18}/> },
                    { label: '硬體設備', us: '免費提供一台光纖設備', them: '需額外每月加價租用', usIcon: <CheckCircle2 className="inline mr-2 text-[#238636]" size={18}/>, themIcon: <X className="inline mr-2 text-red-900" size={18}/> },
                    { label: '維修服務', us: '24Hr 監控, 專屬快速報修', them: '層層轉接客服總機', usIcon: <CheckCircle2 className="inline mr-2 text-[#238636]" size={18}/>, themIcon: <X className="inline mr-2 text-red-900" size={18}/> }
                  ].map((row, i) => (
                    <tr key={i} className="group transition-colors hover:bg-white/[0.02]">
                      <td className="p-5 md:p-6 text-gray-300 font-medium">{row.label}</td>
                      <td className="p-5 md:p-6 text-[#79b8ff] font-semibold bg-[#238636]/5 border-x border-[#238636]/20 transition-colors group-hover:bg-[#238636]/10">
                        {row.usIcon} {row.us}
                      </td>
                      <td className="p-5 md:p-6 text-gray-500">
                        {row.themIcon} {row.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-[#05080f] z-10 border-b border-[#30363D]/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-[#0D1117] border border-[#30363D] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#58A6FF]/5">
              <HelpCircle size={32} className="text-[#58A6FF]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">常見問題解答 (FAQ)</h2>
            <p className="text-gray-400">為您整理住戶最關心的幾個問題，讓您申辦更安心</p>
          </motion.div>

          <div className="space-y-4">
            {FAQs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#58A6FF]/40 bg-[#0D1117] shadow-lg shadow-[#58A6FF]/5' 
                      : 'border-[#30363D] bg-[#0D1117]/50 hover:border-[#58A6FF]/30 hover:bg-[#0D1117]'
                  }`}
                >
                  <button 
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className={`text-lg font-semibold transition-colors duration-300 pr-8 ${isOpen ? 'text-[#79b8ff]' : 'text-gray-200'}`}>
                      Q: {faq.question}
                    </span>
                    <div className={`text-[#58A6FF] shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-[#30363D]/40 mt-2 mx-6">
                          <span className="text-[#238636] font-bold mr-2">A:</span>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="relative py-16 bg-[#05080f] z-10 border-b border-[#30363D]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#58A6FF]/10 to-[#131B2F] border border-[#58A6FF]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#58A6FF]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">有任何問題嗎？讓專屬客服幫助您！</h2>
              <p className="text-gray-400 text-lg">
                無論是申裝諮詢、網路疑難排解、或是報修問題，歡迎隨時撥打我們的客服專線。真人客服將盡速為您服務。
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 flex flex-col items-center sm:items-end gap-2">
              <a 
                href="tel:0971789985" 
                className="group relative inline-flex items-center gap-3 px-8 py-5 bg-[#58A6FF] text-[#0B0F19] font-bold text-xl rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(88,166,255,0.3)] hover:shadow-[0_0_30px_rgba(88,166,255,0.5)] transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <PhoneCall size={28} className="group-hover:scale-110 transition-transform" />
                撥打客服專線
              </a>
              <span className="text-gray-500 font-mono mt-2 tracking-widest text-lg font-semibold">0971-789-985</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contract Trigger Section at the bottom */}
      <section className="relative py-16 bg-[#05080f] z-10 border-b border-[#30363D]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">申請前請先詳閱合約書</h2>
          <button 
            onClick={() => setShowContractModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#131B2F] border border-[#30363D] hover:border-[#58A6FF]/60 hover:bg-[#58A6FF]/10 text-gray-200 hover:text-[#58A6FF] font-semibold text-lg rounded-xl transition-all shadow-md group border-2"
          >
            <FileText className="text-[#58A6FF] group-hover:scale-110 transition-transform" size={24} />
            點此檢視社區網路合約書
          </button>
        </div>
      </section>

      {/* Contract Modal */}
      <AnimatePresence>
        {showContractModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowContractModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#131B2F] rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-800"
            >
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6 sticky top-0 bg-[#131B2F] z-10 pt-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-[#58A6FF]" size={24} />
                  《社區網路服務條款暨合約書》
                </h3>
                <button 
                  onClick={() => setShowContractModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors shrink-0"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="text-gray-400 space-y-6 text-[15px] leading-relaxed pr-2">
                <p>歡迎您申請社區網路服務！為保障您的權益，請仔細閱讀以下合約條款內容：</p>
                
                <div>
                  <h4 className="font-bold text-gray-100 text-lg mb-2 flex items-center gap-2">一、 服務申辦與裝機</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>申請人透過線上系統完成預約後，本服務中心將於 3 個工作天內聯繫排程。</li>
                    <li>首次到府安裝含線路佈建及設備測試，並於確認網路暢通後開始起算合約期與費用。</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-100 text-lg mb-2 flex items-center gap-2">二、 收費標準與服務期間</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>本合約包含 300M 雙向極速光纖上網服務，月租費為新台幣 300 元整。</li>
                    <li>基本合約期限為三年（36個月），申裝時免費提供標準光纖路由器乙台供合約期間內使用。</li>
                    <li>若需額外升級 Wi-Fi 6 等進階設備，相關費用另依報價單為準。</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-100 text-lg mb-2 flex items-center gap-2">三、 網路速率與連線品質</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>本方案標示之「雙向 300M」係指最高可達速率。實際傳輸速率可能因用戶終端設備性能、介面、室內環境阻隔等實體因素而有所影響。</li>
                    <li>我們提供 24 小時網路設備監控與專屬報修處理，若遇硬體異常將優先排程處理。</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-100 text-lg mb-2 flex items-center gap-2">四、 設備提供與保管責任</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>合約期間內提供之光纖設備產權歸屬本公司，用戶應善盡保管責任。若因人為損壞（如：進水、摔壞等）需照價賠償。</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-100 text-lg mb-2 flex items-center gap-2">五、 終止合約與違約處理</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>若於合約期間內（三年內）因搬家或其他個人因素提前終止服務，本公司將依剩餘合約天數比例，酌收裝機補貼款與相關手續費用。</li>
                    <li>合約期滿後，未提出終止申請將自動展延，並可繼續享有原優惠月租。</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end pt-6 mt-6 border-t border-gray-800">
                <button 
                  onClick={() => setShowContractModal(false)}
                  className="px-8 py-3 bg-[#131B2F] border border-[#30363D] hover:border-[#58A6FF]/60 hover:bg-[#58A6FF]/10 text-gray-200 hover:text-[#58A6FF] rounded-xl transition-all shadow-md font-bold"
                >
                  確認並關閉
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
