import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ApplicationFlow from './pages/ApplicationFlow';
import UserPortal from './pages/UserPortal';
import { User } from 'lucide-react';

function App() {
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
              <Link 
                to="/apply"
                className="px-5 py-2 bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF]/60 hover:text-[#58A6FF] hover:bg-[#58A6FF]/5 text-gray-200 rounded-xl transition-all shadow-sm tracking-wide"
              >
                方案選擇
              </Link>
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
      </div>
    </Router>
  );
}

export default App;
