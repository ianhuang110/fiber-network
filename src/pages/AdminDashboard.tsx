import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Edit2, Trash2, Plus, X, Search, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<any | null>(null);
  
  // Form State for Create/Edit
  const [formData, setFormData] = useState({
    appId: '',
    name: '',
    id: '',
    phone: '',
    plan: '',
    city: '',
    district: '',
    community: '',
    installAddress: '',
    remark: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const data = localStorage.getItem('fiber_applications');
      if (data) {
        setApplications(JSON.parse(data));
      }
    } catch (e) {
      console.error('Failed to load data', e);
    }
  };

  const handleSave = () => {
    let updatedApps = [...applications];
    
    if (editingApp) {
      // Update
      updatedApps = updatedApps.map(app => 
        app.appId === formData.appId ? { ...app, ...formData } : app
      );
    } else {
      // Create
      const newApp = {
        ...formData,
        appId: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      updatedApps.push(newApp);
    }
    
    setApplications(updatedApps);
    localStorage.setItem('fiber_applications', JSON.stringify(updatedApps));
    setIsModalOpen(false);
    setEditingApp(null);
  };

  const handleDelete = (appId: string) => {
    if (window.confirm('確定要刪除這筆申請資料嗎？')) {
      const updatedApps = applications.filter(app => app.appId !== appId);
      setApplications(updatedApps);
      localStorage.setItem('fiber_applications', JSON.stringify(updatedApps));
    }
  };

  const openModal = (app?: any) => {
    if (app) {
      setEditingApp(app);
      setFormData({ ...app });
    } else {
      setEditingApp(null);
      setFormData({
        appId: '',
        name: '',
        id: '',
        phone: '',
        plan: '400M網路 (綁約2年)',
        city: '',
        district: '',
        community: '',
        installAddress: '',
        remark: ''
      });
    }
    setIsModalOpen(true);
  };

  const filteredApps = applications.filter(app => 
    app.name?.includes(searchTerm) || 
    app.id?.includes(searchTerm) || 
    app.phone?.includes(searchTerm) ||
    app.community?.includes(searchTerm)
  );

  return (
    <div className="flex-1 p-6 md:p-8 relative bg-[#05080f] min-h-[calc(100vh-64px)] text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Database className="text-[#58A6FF]" size={32} />
              後台資料庫
            </h1>
            <p className="text-gray-400 mt-1">管理所有申請者的詳細資料</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="搜尋姓名、電話、社區..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none text-sm transition-colors"
              />
            </div>
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#238636] hover:bg-[#2EA043] text-white rounded-xl font-bold shadow-lg transition-colors whitespace-nowrap"
            >
              <Plus size={18} />
              新增申請
            </button>
          </div>
        </div>

        <div className="bg-[#0D1117] border border-[#30363D] rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#161B22] border-b border-[#30363D]">
                  <th className="p-4 pl-6 text-gray-400 font-medium text-sm">申請日期</th>
                  <th className="p-4 text-gray-400 font-medium text-sm">姓名 / 身分證</th>
                  <th className="p-4 text-gray-400 font-medium text-sm">聯絡電話</th>
                  <th className="p-4 text-gray-400 font-medium text-sm">方案</th>
                  <th className="p-4 text-gray-400 font-medium text-sm">社區</th>
                  <th className="p-4 pr-6 text-gray-400 font-medium text-sm text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363D]">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      目前沒有申請資料
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.appId} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 text-sm text-gray-400">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">{app.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{app.id}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-300 font-mono">{app.phone}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#58A6FF]/10 text-[#58A6FF] border border-[#58A6FF]/20">
                          {app.plan || '未指定'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-200">{app.community || '-'}</div>
                        <div className="text-xs text-gray-500 mt-0.5 max-w-[200px] truncate" title={app.installAddress}>
                          {app.installAddress}
                        </div>
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openModal(app)}
                            className="p-2 text-gray-400 hover:text-[#58A6FF] hover:bg-[#58A6FF]/10 rounded-lg transition-colors"
                            title="編輯"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(app.appId)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="刪除"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D1117] border border-[#30363D] rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-[#30363D] flex justify-between items-center bg-[#161B22]">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {editingApp ? <Edit2 size={20} className="text-[#58A6FF]" /> : <Plus size={20} className="text-[#238636]" />}
                  {editingApp ? '編輯申請資料' : '新增申請資料'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">姓名</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">身分證字號</label>
                    <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value.toUpperCase()})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">手機號碼</label>
                    <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">方案選擇</label>
                    <select value={formData.plan} onChange={(e) => setFormData({...formData, plan: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none text-white">
                      <option value="400M網路 (綁約2年)">400M網路 (綁約2年)</option>
                      <option value="400M網路 (無綁約)">400M網路 (無綁約)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">縣市</label>
                    <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">鄉鎮市區</label>
                    <input type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">社區名稱</label>
                    <input type="text" value={formData.community} onChange={(e) => setFormData({...formData, community: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">裝機地址</label>
                    <input type="text" value={formData.installAddress} onChange={(e) => setFormData({...formData, installAddress: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">備註</label>
                    <textarea rows={3} value={formData.remark} onChange={(e) => setFormData({...formData, remark: e.target.value})} className="w-full px-4 py-2.5 bg-[#05080f] border border-[#30363D] focus:border-[#58A6FF] rounded-xl outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-[#30363D] bg-[#161B22] flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors">
                  取消
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-[#58A6FF] hover:bg-[#408BE0] text-white rounded-xl font-bold shadow-lg transition-colors">
                  <CheckCircle size={18} />
                  儲存資料
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
