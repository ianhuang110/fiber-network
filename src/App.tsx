import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ApplicationFlow from './pages/ApplicationFlow';
import UserPortal from './pages/UserPortal';
import AdminDashboard from './pages/AdminDashboard';
import { User, LogOut, ChevronDown, Database } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [memberName, setMemberName] = useState<string | null>(() => {
    try {
      const stored = sessionStorage.getItem('fiber_auth_user');
      return stored ? JSON.parse(stored).displayName : null;
    } catch {
      return null;
    }
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAuth = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMemberName(customEvent.detail?.name || null);
    };
    window.addEventListener('auth-change', handleAuth);
    return () => window.removeEventListener('auth-change', handleAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMemberName(null);
    setShowDropdown(false);
    sessionStorage.removeItem('fiber_auth_user');
    window.dispatchEvent(new CustomEvent('auth-change', { detail: { name: null } }));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[#0B0F19] text-gray-200">
        {/* Global Header */}
        <header className="bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity">
              <span className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-white">
                S
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#EF4444]">火星區網</span>
            </Link>
            <nav className="flex items-center gap-3 text-sm font-bold">
              <Link 
                to="/" 
                className="px-5 py-2 bg-[#0D1117] border border-[#30363D] hover:border-[#F97316]/60 hover:text-[#F97316] hover:bg-[#F97316]/5 text-gray-200 rounded-xl transition-all shadow-sm tracking-wide hidden sm:block"
              >
                首頁
              </Link>
              <Link 
                to="/apply"
                className="px-5 py-2 bg-[#0D1117] border border-[#30363D] hover:border-[#F97316]/60 hover:text-[#F97316] hover:bg-[#F97316]/5 text-gray-200 rounded-xl transition-all shadow-sm tracking-wide"
              >
                方案選擇
              </Link>
              <a 
                href="https://speed.cloudflare.com/" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2 bg-[#EF4444]/20 border border-[#EF4444]/40 hover:bg-[#EF4444]/40 hover:border-[#EF4444]/70 text-white rounded-xl transition-all shadow-sm tracking-wide flex items-center gap-2 hidden sm:flex"
              >
                網路測速
              </a>
              {memberName ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="px-5 py-2 bg-gradient-to-r from-[#F97316] to-[#EF4444] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl transition-all shadow-sm tracking-wide flex items-center gap-2"
                  >
                    <User size={16} />
                    <span className="hidden sm:inline">{memberName}</span>
                    <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-36 bg-[#0D1117] border border-[#30363D] rounded-xl shadow-xl py-1 z-50">
                      <Link 
                        to="/portal" 
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User size={14} />
                        用戶中心
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors border-t border-[#30363D]/50"
                      >
                        <LogOut size={14} />
                        安全登出
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/portal"
                  className="px-5 py-2 bg-gradient-to-r from-[#F97316] to-[#EF4444] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl transition-all shadow-sm tracking-wide flex items-center gap-2"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">用戶登入</span>
                </Link>
              )}
              {memberName === '黃楷展' && (
                <Link 
                  to="/admin"
                  className="px-4 py-2 bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/40 hover:border-[#8B5CF6]/70 text-[#D8B4FE] rounded-xl transition-all shadow-sm tracking-wide flex items-center gap-2 hidden sm:flex"
                  title="後台管理"
                >
                  <Database size={16} />
                  後台管理
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative w-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<ApplicationFlow />} />
            <Route path="/portal" element={<UserPortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
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
