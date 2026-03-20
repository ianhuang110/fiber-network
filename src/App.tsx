import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ApplicationFlow from './pages/ApplicationFlow';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50">
        {/* Global Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-shrek-700 font-bold text-2xl tracking-tight">
              <span className="w-8 h-8 bg-gradient-to-br from-shrek-400 to-shrek-600 rounded-lg flex items-center justify-center text-white">
                S
              </span>
              史瑞克社區網路
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
              <a href="/" className="hover:text-shrek-600 transition-colors">首頁</a>
            </nav>
            <a href="/apply" className="px-5 py-2.5 bg-shrek-600 hover:bg-shrek-700 text-white text-sm font-medium rounded-full shadow-lg shadow-shrek-500/30 transition-all hover:scale-105 active:scale-95">
              線上申辦
            </a>
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
        <footer className="bg-gray-900 text-gray-400 py-8 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            &copy; 2026 史瑞克社區網路股份有限公司. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
