import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ApplicationFlow from './pages/ApplicationFlow';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[#0B0F19] text-gray-200">
        {/* Global Header */}
        <header className="bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
              <span className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
                S
              </span>
              社區網路
            </div>
            <nav className="flex items-center gap-3 text-sm font-bold">
              <Link 
                to="/" 
                className="px-5 py-2 bg-[#0D1117] border border-[#30363D] hover:border-[#58A6FF]/60 hover:text-[#58A6FF] hover:bg-[#58A6FF]/5 text-gray-200 rounded-xl transition-all shadow-sm tracking-wide"
              >
                首頁
              </Link>
              <a 
                href="https://speed.cloudflare.com/" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2 bg-[#238636]/20 border border-[#238636]/40 hover:bg-[#238636]/40 hover:border-[#238636]/70 text-white rounded-xl transition-all shadow-sm tracking-wide flex items-center gap-2"
              >
                網路測速
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative w-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<ApplicationFlow />} />
          </Routes>
        </main>
        
        {/* Global Footer */}
        <footer className="bg-[#05080f] text-gray-500 py-8 text-sm border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            &copy; 2026 社區網路股份有限公司. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
