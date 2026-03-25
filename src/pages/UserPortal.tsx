import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, FileText, Zap, Activity, LogOut, AlertCircle } from 'lucide-react';

export default function UserPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isValidTaiwanID = (id: string) => {
    if (!/^[A-Z][1289]\d{8}$/.test(id)) return false;
    const letterMapping = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
    const weight = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
    const firstLetterCode = letterMapping.indexOf(id.charAt(0)) + 10;
    const idArray = `${firstLetterCode}${id.substring(1)}`.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < 11; i++) sum += idArray[i] * weight[i];
    return sum % 10 === 0;
  };

  const isValidTaxID = (gui: string) => {
    if (!/^\d{8}$/.test(gui)) return false;
    const weight = [1, 2, 1, 2, 1, 2, 4, 1];
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      const product = Number(gui[i]) * weight[i];
      sum += Math.floor(product / 10) + (product % 10);
    }
    return sum % 5 === 0 || (gui[6] === '7' && (sum + 1) % 5 === 0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const formattedUsername = username.trim().toUpperCase();
    
    if (!isValidTaiwanID(formattedUsername) && !isValidTaxID(formattedUsername)) {
      setErrorMsg('請輸入正確的身分證字號或統一編號');
      return;
    }
    
    if (!/^\d{4}$/.test(password)) {
      setErrorMsg('密碼格式錯誤，請輸入手機後 4 碼數字');
      return;
    }

    if (formattedUsername === 'D122183708') {
      if (password !== '9985') {
        setErrorMsg('密碼錯誤（與您申請時輸入的手機號碼不符）');
        return;
      }
    } else {
      let isAppMatched = false;
      let expectedPassword = '';

      try {
        const existingStr = localStorage.getItem('shrek_applications');
        const existingApps = existingStr ? JSON.parse(existingStr) : [];
        const appRecord = existingApps.find((app: any) => app.id === formattedUsername);
        if (appRecord) {
          isAppMatched = true;
          expectedPassword = appRecord.phone.slice(-4);
        }
      } catch (e) {
        console.error(e);
      }

      if (!isAppMatched) {
        setErrorMsg('請先完成預約申請，才能用戶登入');
        return;
      }

      if (password !== expectedPassword) {
        setErrorMsg('密碼錯誤（與您申請時輸入的手機號碼不符）');
        return;
      }
    }
    
    setUsername(formattedUsername);
    setIsLoggedIn(true);
  };

  const handleDownloadReceipt = (invoiceNumber: string, month: string) => {
    const receiptContent = `
=========================================
          史瑞克社區網路 - 繳費收據
=========================================
單號：${invoiceNumber}
期數：${month}
金額：$300 (已繳清)

-----------------------------------------
感謝您使用本社區專屬網路服務！
如有任何問題請洽社區管理中心。
=========================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `收據_${invoiceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden bg-[#05080f] min-h-[calc(100vh-64px)]">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#58A6FF]/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#238636]/10 rounded-full blur-[100px] -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#0D1117] border border-[#30363D] rounded-3xl p-8 shadow-2xl relative z-10"
        >
          <div className="flex justify-center mb-8">
            <span className="w-12 h-12 bg-gradient-to-br from-[#58A6FF] to-[#238636] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_20px_rgba(88,166,255,0.3)]">
              S
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">用戶中心</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">請輸入您的網路申辦帳號與密碼</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">用戶帳號 (身分證/統編)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500 group-focus-within:text-[#58A6FF] transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF]/50 text-white rounded-xl outline-none shadow-inner transition-colors"
                  placeholder="A123456789"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">密碼預設 (手機後4碼)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#58A6FF] transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF]/50 text-white rounded-xl outline-none shadow-inner transition-colors"
                  placeholder="••••"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-3.5 mt-4 bg-gradient-to-r from-[#58A6FF] to-[#238636] hover:from-[#408BE0] hover:to-[#1C6A2A] text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 group transition-all"
            >
              登入系統
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="flex-1 p-6 md:p-8 relative bg-[#05080f] min-h-[calc(100vh-64px)]">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#30363D 1px, transparent 1px), linear-gradient(90deg, #30363D 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">歡迎回來，{username === 'D122183708' ? '黃楷展' : '親愛的住戶'}</h1>
            <p className="text-gray-400">這是您的專屬社區網路管理面板</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 border border-[#30363D] bg-[#0D1117] text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/50 rounded-xl transition-colors flex items-center gap-2"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">安全登出</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Status Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1117] border border-[#30363D] rounded-3xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Activity size={80} className="text-[#238636]" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#238636]/10 flex items-center justify-center">
                <Activity className="text-[#238636]" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">網路狀態</h3>
            </div>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#238636] to-[#2ea043]">穩定連線中</span>
            </div>
            <p className="text-gray-400 text-sm">已連續運行 45 天 12 小時</p>
          </motion.div>

          {/* Plan Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0D1117] border border-[#30363D] rounded-3xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Zap size={80} className="text-[#58A6FF]" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#58A6FF]/10 flex items-center justify-center">
                <Zap className="text-[#58A6FF]" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">目前方案</h3>
            </div>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-black text-white">300<span className="text-xl text-gray-500">M</span></span>
            </div>
            <p className="text-[#58A6FF] text-sm font-medium">極速雙向光纖 (綁約3年)</p>
          </motion.div>

          {/* Billing Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0D1117] border border-[#58A6FF]/40 rounded-3xl p-6 shadow-[0_0_30px_rgba(88,166,255,0.08)] relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <FileText className="text-orange-400" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">本期帳單</h3>
              </div>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full border border-orange-500/30">待繳費</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-black text-white">$ 300</span>
              <span className="text-gray-500 text-sm mb-1">/ 2026年3月份</span>
            </div>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="w-full py-2.5 bg-[#58A6FF]/10 hover:bg-[#58A6FF]/20 border border-[#58A6FF]/40 text-[#58A6FF] font-bold rounded-xl transition-colors"
            >
              顯示現金繳費條碼 / 管理中心繳款
            </button>
          </motion.div>
        </div>

        {/* Billing History Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0D1117] border border-[#30363D] rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="p-6 border-b border-[#30363D] flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">歷史帳單查詢</h3>
            <span className="text-sm text-gray-400">僅顯示最近三期</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#05080f]/50">
                  <th className="p-4 pl-6 text-gray-400 font-medium border-b border-[#30363D]">帳單單號</th>
                  <th className="p-4 text-gray-400 font-medium border-b border-[#30363D]">期數</th>
                  <th className="p-4 text-gray-400 font-medium border-b border-[#30363D]">金額</th>
                  <th className="p-4 text-gray-400 font-medium border-b border-[#30363D]">繳費期限</th>
                  <th className="p-4 text-gray-400 font-medium border-b border-[#30363D]">狀態</th>
                  <th className="p-4 pr-6 text-gray-400 font-medium border-b border-[#30363D] text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363D]/50 text-sm">
                <tr className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 pl-6 text-gray-500 font-mono">INV-202603-019</td>
                  <td className="p-4 text-white font-medium">2026年 3月</td>
                  <td className="p-4 text-gray-300 font-mono">$300</td>
                  <td className="p-4 text-gray-400 font-mono">2026/04/15</td>
                  <td className="p-4"><span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full border border-orange-500/20">待繳費</span></td>
                  <td className="p-4 pr-6 text-right">
                    <button 
                      onClick={() => setShowPaymentModal(true)}
                      className="text-[#58A6FF] hover:underline font-medium"
                    >
                      查看繳費單
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-gray-500 font-mono">INV-202602-019</td>
                  <td className="p-4 text-gray-400">2026年 2月</td>
                  <td className="p-4 text-gray-500 font-mono">$300</td>
                  <td className="p-4 text-gray-600 font-mono">2026/03/15</td>
                  <td className="p-4"><span className="px-3 py-1 bg-[#238636]/20 text-[#238636] text-xs font-bold rounded-full border border-[#238636]/20">已繳清</span></td>
                  <td className="p-4 pr-6 text-right"><button onClick={() => handleDownloadReceipt('INV-202602-019', '2026年 2月')} className="text-gray-500 hover:text-white transition-colors">下載收據</button></td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-gray-500 font-mono">INV-202601-019</td>
                  <td className="p-4 text-gray-400">2026年 1月</td>
                  <td className="p-4 text-gray-500 font-mono">$300</td>
                  <td className="p-4 text-gray-600 font-mono">2026/02/15</td>
                  <td className="p-4"><span className="px-3 py-1 bg-[#238636]/20 text-[#238636] text-xs font-bold rounded-full border border-[#238636]/20">已繳清</span></td>
                  <td className="p-4 pr-6 text-right"><button onClick={() => handleDownloadReceipt('INV-202601-019', '2026年 1月')} className="text-gray-500 hover:text-white transition-colors">下載收據</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0D1117] border border-[#30363D] rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">本期帳單繳費</h3>
            
            <div className="bg-white p-6 rounded-2xl mb-6 flex flex-col items-center">
              <p className="text-gray-900 font-bold mb-4">超商代收條碼</p>
              
              <div className="flex gap-[3px] h-16 mb-3 w-full justify-center">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className="bg-black h-full" style={{ width: [2, 4, 3, 1, 5][i % 5] + 'px' }}></div>
                ))}
              </div>
              
              <p className="text-gray-600 text-sm font-mono tracking-widest">TW829471940003</p>
              <p className="text-red-500 text-xs mt-3 font-bold">繳費期限：2026/04/15</p>
            </div>

            <div className="bg-[#58A6FF]/10 border border-[#58A6FF]/20 rounded-xl p-4 mb-6">
              <p className="text-[#58A6FF] text-sm text-center font-medium leading-relaxed">
                或者，您也可以截圖此畫面<br/>
                直接至<span className="font-bold underline ml-1">社區管理中心現金繳納</span>
              </p>
            </div>

            <button 
              onClick={() => setShowPaymentModal(false)}
              className="w-full py-3 bg-[#30363D] hover:bg-[#30363D]/80 text-white font-bold rounded-xl transition-colors"
            >
              關閉並返回
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
