import { ArrowRight, ArrowDownUp, Zap, Users, Search, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('請先輸入社區名稱');
      setSearchResult(null);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    setShowDropdown(true);

    try {
      const response = await fetch(`http://localhost:3001/api/coverage?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Search API error:', error);
      setSearchResult({ error: true, message: '系統連線異常，請稍後再試。' });
    } finally {
      setIsSearching(false);
    }
  };

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
              
              <div className="space-y-6">
                {/* 1. 供裝/社區查詢框 */}
                <div className="w-full max-w-md z-50">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#58A6FF]/20 to-[#238636]/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10"></div>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-500 group-focus-within:text-[#58A6FF] transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value === '') {
                          setShowDropdown(false);
                          setSearchResult(null);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                      }}
                      placeholder="輸入社區名稱查詢是否在供裝範圍..." 
                      className="w-full pl-11 pr-24 py-4 bg-[#0D1117] border border-[#30363D] focus:border-[#58A6FF]/50 text-white rounded-2xl outline-none placeholder-gray-500 shadow-inner transition-colors"
                    />
                    <button 
                      onClick={handleSearch}
                      className="absolute right-2 top-2 bottom-2 px-6 bg-[#238636]/10 hover:bg-[#238636] text-[#238636] hover:text-white font-medium rounded-xl transition-all border border-[#238636]/30"
                    >
                      查詢
                    </button>
                  </div>

                  {/* Dropdown Result */}
                  {(showDropdown && (isSearching || searchResult)) && (
                    <div className="mt-4 w-full bg-[#0D1117]/95 backdrop-blur-xl border border-[#30363D] rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="p-4">
                        {isSearching ? (
                          <div className="flex items-center gap-3 text-gray-400 font-medium">
                            <div className="w-4 h-4 rounded-full border-2 border-[#58A6FF] border-t-transparent animate-spin"></div>
                            連線內部資料庫與外部線路系統中...
                          </div>
                        ) : searchResult ? (
                          <div className={`p-4 rounded-xl border ${searchResult.error || (!searchResult.hasCoverage && searchResult.source === 'external_scraper') ? 'bg-red-900/10 border-red-500/30 text-red-400' : 'bg-[#238636]/10 border-[#238636]/30 text-[#238636] shadow-[0_0_15px_rgba(35,134,54,0.1)]'}`}>
                            <p className="font-semibold text-lg leading-tight mb-1">{searchResult.message}</p>
                            {searchResult.data && (
                              <p className="text-sm opacity-90 mt-2 flex items-center gap-1">📍 匹配社區：{searchResult.data.name} <span className="px-2 py-0.5 ml-2 bg-[#238636]/20 rounded-md text-xs">{searchResult.data.speed}</span></p>
                            )}
                            {searchResult.source === 'external_scraper' && !searchResult.hasCoverage && (
                              <p className="text-sm opacity-80 mt-2 font-light">👉 建議直接點擊下方按鈕預約申請，由專人為您人工勘查確認！</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm font-light">請輸入社區大樓名稱、建案或地址進行查詢</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/apply', { state: { prefillCommunity: searchResult?.data?.name || searchQuery } })}
                    className="group relative px-8 py-4 bg-[#0D1117] border border-[#58A6FF]/40 text-white font-semibold rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(88,166,255,0.2)] hover:shadow-[0_0_25px_rgba(88,166,255,0.4)] transition-all hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#58A6FF]/80 to-[#238636]/80 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2 text-[#58A6FF] group-hover:text-[#79b8ff]">
                      立即預約申請
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
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
                  <img src={`${import.meta.env.BASE_URL}cute_white_robot.png`} alt="Cute White AI Robot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  
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

      {/* 2. Comparison Section */}
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

          <div className="overflow-hidden rounded-2xl border border-[#30363D] bg-[#05080f] py-2 md:py-0 shadow-2xl">
            <div className="overflow-x-auto">
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
                    { label: '硬體設備', us: '免費借用 WiFi 6 路由', them: '需額外每月加價租用', usIcon: <CheckCircle2 className="inline mr-2 text-[#238636]" size={18}/>, themIcon: <X className="inline mr-2 text-red-900" size={18}/> },
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

    </div>
  );
}
