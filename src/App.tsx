import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ApplicationFlow from './pages/ApplicationFlow';
import UserPortal from './pages/UserPortal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';

function App() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[#0B0F19] text-gray-200">
        {/* Global Header */}
        <header className="bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity">
              <span className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
                S
              </span>
              光纖社區網路
            </Link>
            <nav className="flex items-center gap-3 text-sm font-bold">
              <Link 
                to="/" 
                className="px-5 py-2 bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF]/60 hover:text-[#58A6FF] hover:bg-[#58A6FF]/5 text-gray-200 rounded-xl transition-all shadow-sm tracking-wide hidden sm:block"
              >
                首頁
              </Link>
              <button 
                onClick={() => setShowPlanModal(true)}
                className="px-5 py-2 bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF]/60 hover:text-[#58A6FF] hover:bg-[#58A6FF]/5 text-gray-200 rounded-xl transition-all shadow-sm tracking-wide"
              >
                方案選擇
              </button>
              <a 
                href="https://speed.cloudflare.com/" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2 bg-[#238636]/20 border border-[#238636]/40 hover:bg-[#238636]/40 hover:border-[#238636]/70 text-white rounded-xl transition-all shadow-sm tracking-wide flex items-center gap-2 hidden sm:flex"
              >
                網路測速
              </a>
              <Link 
                to="/portal"
                className="px-5 py-2 bg-gradient-to-r from-[#58A6FF] to-[#238636] hover:from-[#408BE0] hover:to-[#1C6A2A] text-white rounded-xl transition-all shadow-sm tracking-wide flex items-center gap-2"
              >
                <User size={16} />
                <span className="hidden sm:inline">用戶登入</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative w-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<ApplicationFlow />} />
            <Route path="/portal" element={<UserPortal />} />
          </Routes>
        </main>
        
        {/* Global Footer */}
        <footer className="bg-[#05080f] text-gray-500 py-8 text-sm border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            &copy; 2026 史瑞克數位工作室. All rights reserved.
          </div>
        </footer>
        {/* Global Plan Selection Modal */}
        <AnimatePresence>
          {showPlanModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowPlanModal(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0B0F19] border border-gray-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#131B2F]">
                  <h3 className="text-xl font-bold text-white tracking-wide">選擇方案</h3>
                  <button 
                    onClick={() => setShowPlanModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-gray-400 hover:text-white hover:bg-black/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex flex-col bg-[#131B2F] p-5 pb-6">
                  {/* Toggle Switch */}
                  <div className="flex justify-center mb-5">
                    <div className="bg-[#0B0F19] p-1 rounded-xl flex inline-flex text-sm font-bold border border-gray-800 relative shadow-inner w-full max-w-[280px]">
                      {/* Animated Background Pill */}
                      <div 
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#238636] to-[#1C6A2A] border-[#238636]/50 rounded-lg transition-all duration-300 ease-out shadow-sm border ${billingCycle === 'monthly' ? 'left-1' : 'left-[calc(50%+3px)]'}`}
                      ></div>
                      
                      <button 
                        onClick={() => setBillingCycle('monthly')} 
                        className={`relative z-10 py-2 w-1/2 text-center rounded-lg transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-white shadow-[0_0_10px_rgba(35,134,54,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        月繳方案
                      </button>
                      <button 
                        onClick={() => setBillingCycle('yearly')} 
                        className={`relative z-10 py-2 w-1/2 text-center rounded-lg transition-colors duration-300 flex items-center justify-center gap-1 ${billingCycle === 'yearly' ? 'text-white shadow-[0_0_10px_rgba(35,134,54,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        年繳<span className="text-xs text-yellow-500 ml-0.5 whitespace-nowrap">(優惠)</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative flex flex-col bg-[#131B2F] rounded-2xl overflow-hidden border-2 border-[#58A6FF]/50 ring-2 ring-[#58A6FF]/10 shadow-md">
                    <div className="h-44 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800" alt="Family using tablet" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#131B2F] via-[#131B2F]/80 to-transparent"></div>
                      <h4 className="absolute bottom-3 left-0 right-0 text-center text-teal-400 font-bold text-xl drop-shadow-sm tracking-wide">
                        {billingCycle === 'yearly' ? '400M網路 (綁約2年)' : '400M網路 (無綁約)'}
                      </h4>
                    </div>
                    <div className="py-5 px-6 flex flex-col flex-1">
                      <div className="flex items-start gap-3 mb-5">
                        <div className="w-5 h-5 rounded-full border-2 border-teal-500 bg-[#131B2F] flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
                        </div>
                        <div className="flex flex-col gap-1 mt-[-2px]">
                          <span className="text-gray-300 font-medium leading-tight">400M雙向極速光纖</span>
                          <span className="text-sm text-teal-500 leading-tight">
                            {billingCycle === 'yearly' ? '綁約2年免裝機費$1500' : '需收取單次裝機費$1500'}
                          </span>
                          {billingCycle === 'yearly' && (
                            <span className="text-xs text-[#58A6FF] bg-[#58A6FF]/10 px-2 py-0.5 rounded w-fit mt-1 border border-[#58A6FF]/20">
                              年繳 $4,200 (平均$350/月)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 pt-4 border-t border-gray-800 flex items-center justify-between">
                        <p className="text-gray-500 font-medium text-sm">
                          {billingCycle === 'yearly' ? '換算月租' : '月租費'}
                          <br/>
                          <span className="text-3xl font-bold text-white leading-none mt-1 inline-block">$350</span>
                        </p>
                        <Link 
                          to="/apply"
                          state={{ plan: billingCycle === 'yearly' ? '400M網路 (綁約2年)' : '400M網路 (無綁約)' }}
                          onClick={() => setShowPlanModal(false)}
                          className="px-4 py-2 bg-gradient-to-r from-[#238636] to-[#1C6A2A] hover:opacity-90 text-white rounded-lg font-bold shadow-lg transition-all"
                        >
                          申辦填表
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>



      </div>
    </Router>
  );
}

export default App;
