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
            <nav className="hidden md:flex gap-8 text-lg font-bold text-gray-100">
              <Link to="/" className="hover:text-teal-300 transition-colors tracking-wide">首頁</Link>
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
