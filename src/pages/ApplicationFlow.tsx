import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ArrowLeft, Home, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
const steps = [
  { id: 1, title: '選擇方案' },
  { id: 2, title: '選擇社區' },
  { id: 3, title: '填寫資訊' },
  { id: 4, title: '完成申請' }
];

const taiwanCities = [
  "臺北市", "新北市", "基隆市", "桃園市", "新竹縣", "新竹市", "苗栗縣", 
  "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義縣", "嘉義市", "臺南市", 
  "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣"
];

const taiwanDistricts: Record<string, string[]> = {
  "臺北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
  "新北市": ["板橋區", "三重區", "中和區", "永和區", "新莊區", "新店區", "土城區", "蘆洲區", "樹林區", "汐止區", "鶯歌區", "三峽區", "淡水區", "瑞芳區", "五股區", "泰山區", "林口區", "深坑區", "石碇區", "坪林區", "三芝區", "石門區", "八里區", "平溪區", "雙溪區", "貢寮區", "金山區", "萬里區", "烏來區"],
  "基隆市": ["仁愛區", "信義區", "中正區", "中山區", "安樂區", "暖暖區", "七堵區"],
  "桃園市": ["桃園區", "中壢區", "大溪區", "楊梅區", "蘆竹區", "大園區", "龜山區", "八德區", "龍潭區", "平鎮區", "新屋區", "觀音區", "復興區"],
  "新竹縣": ["竹北市", "竹東鎮", "新埔鎮", "關西鎮", "湖口鄉", "新豐鄉", "芎林鄉", "橫山鄉", "北埔鄉", "寶山鄉", "峨眉鄉", "尖石鄉", "五峰鄉"],
  "新竹市": ["東區", "北區", "香山區"],
  "苗栗縣": ["苗栗市", "苑裡鎮", "通霄鎮", "竹南鎮", "頭份市", "後龍鎮", "卓蘭鎮", "大湖鄉", "公館鄉", "銅鑼鄉", "南庄鄉", "頭屋鄉", "三義鄉", "西湖鄉", "造橋鄉", "三灣鄉", "獅潭鄉", "泰安鄉"],
  "臺中市": ["中區", "東區", "南區", "西區", "北區", "西屯區", "南屯區", "北屯區", "豐原區", "東勢區", "大甲區", "清水區", "沙鹿區", "梧棲區", "后里區", "神岡區", "潭子區", "大雅區", "新社區", "石岡區", "外埔區", "大安區", "烏日區", "大肚區", "龍井區", "霧峰區", "太平區", "大里區", "和平區"],
  "彰化縣": ["彰化市", "鹿港鎮", "和美鎮", "線西鄉", "伸港鄉", "福興鄉", "秀水鄉", "花壇鄉", "芬園鄉", "員林市", "溪湖鎮", "田中鎮", "大村鄉", "埔鹽鄉", "埔心鄉", "永靖鄉", "社頭鄉", "二水鄉", "北斗鎮", "二林鎮", "田尾鄉", "埤頭鄉", "芳苑鄉", "大城鄉", "竹塘鄉", "溪州鄉"],
  "南投縣": ["南投市", "埔里鎮", "草屯鎮", "竹山鎮", "集集鎮", "名間鄉", "鹿谷鄉", "中寮鄉", "魚池鄉", "國姓鄉", "水里鄉", "信義鄉", "仁愛鄉"],
  "雲林縣": ["斗六市", "斗南鎮", "虎尾鎮", "西螺鎮", "土庫鎮", "北港鎮", "古坑鄉", "大埤鄉", "莿桐鄉", "林內鄉", "二崙鄉", "崙背鄉", "麥寮鄉", "東勢鄉", "褒忠鄉", "臺西鄉", "元長鄉", "四湖鄉", "口湖鄉", "水林鄉"],
  "嘉義縣": ["太保市", "朴子市", "布袋鎮", "大林鎮", "民雄鄉", "溪口鄉", "新港鄉", "六腳鄉", "東石鄉", "義竹鄉", "鹿草鄉", "水上鄉", "中埔鄉", "竹崎鄉", "梅山鄉", "番路鄉", "大埔鄉", "阿里山鄉"],
  "嘉義市": ["東區", "西區"],
  "臺南市": ["新營區", "鹽水區", "白河區", "柳營區", "後壁區", "東山區", "麻豆區", "下營區", "六甲區", "官田區", "大內區", "佳里區", "學甲區", "西港區", "七股區", "將軍區", "北門區", "新化區", "善化區", "新市區", "安定區", "山上區", "玉井區", "楠西區", "南化區", "左鎮區", "仁德區", "歸仁區", "關廟區", "龍崎區", "永康區", "東區", "南區", "北區", "安南區", "安平區", "中西區"],
  "高雄市": ["鹽埕區", "鼓山區", "左營區", "楠梓區", "三民區", "新興區", "前金區", "苓雅區", "前鎮區", "旗津區", "小港區", "鳳山區", "林園區", "大寮區", "大樹區", "大社區", "仁武區", "鳥松區", "岡山區", "橋頭區", "燕巢區", "田寮區", "阿蓮區", "路竹區", "湖內區", "茄萣區", "永安區", "彌陀區", "梓官區", "旗山區", "美濃區", "六龜區", "甲仙區", "杉林區", "內門區", "茂林區", "桃源區", "那瑪夏區"],
  "屏東縣": ["屏東市", "潮州鎮", "東港鎮", "恆春鎮", "萬丹鄉", "長治鄉", "麟洛鄉", "九如鄉", "里港鄉", "鹽埔鄉", "高樹鄉", "萬巒鄉", "內埔鄉", "竹田鄉", "新埤鄉", "枋寮鄉", "新園鄉", "崁頂鄉", "林邊鄉", "南州鄉", "佳冬鄉", "琉球鄉", "車城鄉", "滿州鄉", "枋山鄉", "三地門鄉", "霧臺鄉", "瑪家鄉", "泰武鄉", "來義鄉", "春日鄉", "獅子鄉", "牡丹鄉"],
  "宜蘭縣": ["宜蘭市", "羅東鎮", "蘇澳鎮", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "冬山鄉", "五結鄉", "三星鄉", "大同鄉", "南澳鄉"],
  "花蓮縣": ["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉", "光復鄉", "豐濱鄉", "瑞穗鄉", "富里鄉", "秀林鄉", "萬榮鄉", "卓溪鄉"],
  "臺東縣": ["臺東市", "成功鎮", "關山鎮", "卑南鄉", "大武鄉", "太麻里鄉", "東河鄉", "長濱鄉", "鹿野鄉", "池上鄉", "綠島鄉", "延平鄉", "海端鄉", "達仁鄉", "金峰鄉", "蘭嶼鄉"],
  "澎湖縣": ["馬公市", "湖西鄉", "白沙鄉", "西嶼鄉", "望安鄉", "七美鄉"],
  "金門縣": ["金城鎮", "金湖鎮", "金沙鎮", "金寧鄉", "烈嶼鄉", "烏坵鄉"],
  "連江縣": ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"]
};

const planPrices: Record<string, string> = {
  '400M網路 (綁約2年)': '350',
  '400M網路 (無綁約)': '350'
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

export default function ApplicationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    city: '', district: '', street: '', community: location.state?.prefillCommunity || '', plan: location.state?.plan || '',
    contactName: '', idNumber: '', birthYear: '', birthMonth: '', birthDay: '', mobile: '', email: '', installAddress: '',
    remark: '', referrer: '', agreePrivacy: false, agreeTerms: false
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.plan) {
        setErrorMsg('請先選擇一個方案');
        return;
      }
      setErrorMsg('');
    }
    if (currentStep === 2) {
      if (!formData.city || !formData.district || !formData.community) {
        setErrorMsg('所有社區資訊請務必填寫，才能進行下一步');
        return;
      }

      setErrorMsg('');
    }
    if (currentStep === 3) {
      if (!formData.contactName.trim() || !formData.idNumber.trim() || !formData.birthYear || !formData.birthMonth || !formData.birthDay || !formData.mobile.trim() || !formData.email.trim() || !formData.installAddress.trim()) {
        setErrorMsg('聯絡資訊請務必填寫完整，才能進行下一步');
        return;
      }
      if (!/^[A-Z][1-2]\d{8}$/.test(formData.idNumber)) {
        setErrorMsg('身分證字號格式錯誤，請重新輸入');
        return;
      }
      if (!/^09\d{8}$/.test(formData.mobile)) {
        setErrorMsg('手機號碼格式錯誤（請輸入 09 開頭 10 碼數字），請重新輸入');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrorMsg('Email 格式錯誤，請重新輸入');
        return;
      }
      setErrorMsg('');
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else navigate('/');
  };

  let visualStep = currentStep;

  return (
    <div className="flex-1 bg-[#0B0F19] flex flex-col pt-10 pb-20">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header / Back button */}
        <button 
          onClick={handlePrev}
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          返回
        </button>

        {/* Custom Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-500 -z-10 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((visualStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-[#0B0F19] px-2 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-500 ${
                  visualStep > step.id 
                    ? 'bg-teal-500 text-white' 
                    : visualStep === step.id 
                      ? 'bg-teal-600 text-white ring-4 ring-teal-500/30' 
                      : 'bg-[#131B2F] text-gray-500 border border-gray-800'
                }`}>
                  {visualStep > step.id ? <Check size={18} /> : step.id}
                </div>
                <span className={`text-xs font-medium absolute -bottom-6 w-max ${
                  visualStep >= step.id ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-[#131B2F] rounded-3xl shadow-xl border border-gray-800 overflow-hidden min-h-[500px] flex flex-col relative">
          <div className="p-8 sm:p-12 flex-1">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-2 text-center">選擇適合您的方案</h2>
                  <p className="text-gray-500 text-sm mb-8 text-center max-w-md mx-auto">提供多種超值光纖網路方案，滿足您不同家庭的上網需求。</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {Object.entries(planPrices).map(([planName, price]) => {
                      const isSelected = formData.plan === planName;
                      const isYearly = planName.includes('綁約2年');
                      return (
                      <div 
                        key={planName}
                        onClick={() => setFormData({...formData, plan: planName})}
                        className={`cursor-pointer relative flex flex-col rounded-2xl overflow-hidden border-2 transition-all duration-300 transform ${
                          isSelected 
                            ? 'border-[#14b8a6] ring-2 ring-[#14b8a6]/20 bg-[#131B2F] shadow-xl scale-[1.02]' 
                            : 'border-gray-800 bg-[#0B0F19] hover:border-[#14b8a6]/50 hover:bg-[#131B2F] shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 right-0 z-20 bg-[#14b8a6] text-white px-4 py-1.5 text-sm font-bold rounded-bl-xl shadow-md flex items-center gap-1">
                            <Check size={16} /> 已選擇
                          </div>
                        )}
                        
                        <div className="h-44 overflow-hidden relative">
                          <img 
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800" 
                            alt="Network Plan" 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                          />
                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#131B2F] via-[#131B2F]/80 to-transparent"></div>
                          <h4 className={`absolute bottom-3 left-0 right-0 text-center text-xl drop-shadow-md tracking-wide font-bold ${isSelected ? 'text-[#2dd4bf]' : 'text-gray-200'}`}>
                            {planName}
                          </h4>
                        </div>
                        
                        <div className="py-5 px-6 flex flex-col flex-1 bg-[#131B2F]">
                          <div className="flex items-start gap-3 mb-5">
                            <div className={`w-5 h-5 rounded-full border-2 bg-[#131B2F] flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isSelected ? 'border-[#14b8a6]' : 'border-gray-600'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-[#14b8a6] rounded-full"></div>}
                            </div>
                            <div className="flex flex-col gap-1 mt-[-2px]">
                              <span className={`font-medium leading-tight ${isSelected ? 'text-gray-100' : 'text-gray-400'}`}>400M雙向極速光纖</span>
                              <span className={`text-sm leading-tight ${isSelected ? 'text-[#14b8a6]' : 'text-gray-500'}`}>
                                {isYearly ? '綁約2年免裝機費$1500' : '需收取單次裝機費$1500'}
                              </span>
                              {isYearly && (
                                <span className={`text-xs px-2 py-0.5 rounded w-fit mt-1 border ${isSelected ? 'text-[#58A6FF] bg-[#58A6FF]/10 border-[#58A6FF]/20' : 'text-gray-500 bg-gray-800/50 border-gray-700'}`}>
                                  年繳 $4,200 (平均$350/月)
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`mt-auto pt-5 border-t flex items-center justify-between ${isSelected ? 'border-gray-800' : 'border-gray-800/50'}`}>
                            <p className="text-gray-500 font-medium text-sm">
                              {isYearly ? '換算月租' : '月租費'}
                              <br/>
                              <span className={`text-3xl font-bold leading-none mt-1 inline-block ${isSelected ? 'text-white' : 'text-gray-300'}`}>${price}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">選擇社區</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {/* 新增的裝機地址 / 選擇社區 UI */}
                    <div className="md:col-span-2 mt-4 bg-[#131B2F] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-teal-500/10 px-6 py-4 border-b border-gray-800 flex items-center gap-2">
                        <Home className="text-teal-500" size={20} />
                        <h3 className="text-lg font-bold text-teal-400">選擇社區</h3>
                      </div>
                      <div className="p-6">
                        <div className="flex border-b border-gray-800 mb-8 overflow-x-auto">
                          <button className="px-6 py-3 border-b-2 border-teal-500 text-teal-400 font-bold flex items-center gap-2 whitespace-nowrap">
                            <MapPin size={18} /> 依地址選擇
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
                          {/* 縣市 */}
                          <div className="relative">
                            <label className="absolute -top-3 left-3 bg-[#131B2F] px-2 text-sm text-gray-300 font-bold tracking-wide z-10">
                              <span className="text-red-500 mr-1">*</span>縣市
                            </label>
                            <div className="relative">
                              <select 
                                value={formData.city} 
                                onChange={(e) => setFormData({...formData, city: e.target.value, district: ''})} 
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none appearance-none bg-[#0B0F19] hover:border-gray-500 transition-colors"
                              >
                                <option value="" disabled hidden></option>
                                {taiwanCities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                            </div>
                          </div>
                          
                          {/* 鄉鎮市區 */}
                          <div className="relative">
                            <label className="absolute -top-3 left-3 bg-[#131B2F] px-2 text-sm text-gray-300 font-bold tracking-wide z-10">
                              <span className="text-red-500 mr-1">*</span>鄉鎮市區
                            </label>
                            <div className="relative">
                              <select 
                                value={formData.district} 
                                onChange={(e) => setFormData({...formData, district: e.target.value})} 
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none appearance-none bg-[#0B0F19] hover:border-gray-500 transition-colors"
                              >
                                <option value="" disabled hidden></option>
                                {formData.city && taiwanDistricts[formData.city]?.map(district => (
                                  <option key={district} value={district}>{district}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                            </div>
                          </div>



                          {/* 社區名稱 */}
                          <div className="relative">
                            <label className="absolute -top-3 left-3 bg-[#131B2F] px-2 text-sm text-gray-500 font-bold tracking-wide z-10">
                              <span className="text-red-400 mr-1">*</span>社區名稱
                            </label>
                            <div className="relative">
                              <input 
                                type="text"
                                value={formData.community} 
                                onChange={(e) => setFormData({...formData, community: e.target.value})} 
                                placeholder="例如：巴黎花都"
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-[#0B0F19] hover:border-gray-500 transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    

                  </div>
                </motion.div>
              )}
              
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">填寫基本資訊</h2>
                  <p className="text-gray-500 text-sm mb-8 text-center max-w-md">請輸入您的真實資料，以便後續流程順利進行。</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-10">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">聯絡姓名</label>
                      <input 
                        type="text" 
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all" 
                        placeholder="例如：王小明" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">身分證字號</label>
                      <input 
                        type="text" 
                        value={formData.idNumber}
                        onChange={(e) => setFormData({...formData, idNumber: e.target.value.toUpperCase()})}
                        maxLength={10}
                        className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all" 
                        placeholder="例如：A123456789" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">出生年月日</label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <select 
                            value={formData.birthYear}
                            onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                            className="w-full pl-4 pr-8 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all appearance-none" 
                          >
                            <option value="" disabled hidden>年</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                        </div>
                        <div className="flex-1 relative">
                          <select 
                            value={formData.birthMonth}
                            onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                            className="w-full pl-4 pr-8 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all appearance-none" 
                          >
                            <option value="" disabled hidden>月</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                        </div>
                        <div className="flex-1 relative">
                          <select 
                            value={formData.birthDay}
                            onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                            className="w-full pl-4 pr-8 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all appearance-none" 
                          >
                            <option value="" disabled hidden>日</option>
                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">手機號碼</label>
                      <input 
                        type="tel" 
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        maxLength={10}
                        className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all" 
                        placeholder="例如：0912345678" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all" 
                        placeholder="例如：example@gmail.com" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">預計裝機地址</label>
                      <input 
                        type="text" 
                        value={formData.installAddress}
                        onChange={(e) => setFormData({...formData, installAddress: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#0B0F19] text-gray-100 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all" 
                        placeholder="例如：桃園市中壢區中正路100號5樓之1" 
                      />
                    </div>
                  </div>

                  {/* Additional Fields: Remarks & Referrer */}
                  <div className="w-full max-w-2xl flex flex-col gap-6 mb-10">
                    <div>
                      <label className="block text-sm font-bold text-gray-100 mb-2">如有需要，可備註您的問題</label>
                      <div className="relative">
                        <textarea 
                          value={formData.remark}
                          onChange={(e) => setFormData({...formData, remark: e.target.value})}
                          maxLength={200}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] outline-none transition-all resize-none bg-[#0B0F19]" 
                          placeholder="請輸入備註" 
                        />
                        <span className="absolute bottom-3 right-4 text-xs text-gray-500">
                          {formData.remark.length} / 200
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col items-center max-w-2xl mx-auto"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">確認申請資料</h2>
                  <p className="text-gray-500 text-[15px] mb-8 text-center">請仔細核對以下您的申辦資訊，確認無誤後點擊送出即可完成！</p>
                  
                  <div className="w-full bg-[#131B2F] rounded-2xl shadow-sm border border-gray-800 overflow-hidden mb-10 text-left">
                    {/* Part 1: Plan and Location */}
                    <div className="px-6 py-4 bg-[#0B0F19] border-b border-gray-800">
                      <h3 className="font-bold text-gray-100 flex items-center gap-2">
                        <Check size={18} className="text-[#14b8a6]" />
                        申請方案與社區
                      </h3>
                    </div>
                    <div className="p-6 space-y-5">
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">選擇方案</span>
                        <span className="font-bold text-white border-b-2 border-[#14b8a6]/30 pb-1 inline-block">
                          {formData.plan || '未選擇'} <span className="text-[#14b8a6] ml-2 font-black">${formData.plan ? planPrices[formData.plan] : '0'}</span>/月
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">社區地址</span>
                        <span className="font-medium text-gray-100 leading-relaxed">
                          {formData.city}{formData.district}{formData.community}
                        </span>
                      </div>
                    </div>

                    {/* Part 2: Contact Details */}
                    <div className="px-6 py-4 bg-[#0B0F19] border-y border-gray-800">
                      <h3 className="font-bold text-gray-100 flex items-center gap-2">
                        <Check size={18} className="text-[#14b8a6]" />
                        聯絡與裝機資訊
                      </h3>
                    </div>
                    <div className="p-6 space-y-5">
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">聯絡姓名</span>
                        <span className="font-medium text-gray-100">{formData.contactName || '-'}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">身分證字號</span>
                        <span className="font-medium text-gray-100">{formData.idNumber || '-'}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">出生年月日</span>
                        <span className="font-medium text-gray-100">{formData.birthYear && formData.birthMonth && formData.birthDay ? `${formData.birthYear}/${formData.birthMonth}/${formData.birthDay}` : '-'}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">手機號碼</span>
                        <span className="font-medium text-gray-100">{formData.mobile || '-'}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">電子信箱</span>
                        <span className="font-medium text-gray-100">{formData.email || '-'}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0">裝機地址</span>
                        <span className="font-medium text-gray-100 leading-relaxed">{formData.installAddress || '-'}</span>
                      </div>
                      {formData.remark && (
                        <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4 pt-4 border-t border-gray-50">
                          <span className="text-gray-500 font-medium text-sm md:w-24 shrink-0 mt-1">特殊備註</span>
                          <span className="font-medium text-gray-300 whitespace-pre-wrap bg-[#0B0F19] p-4 rounded-xl flex-1 text-sm border border-gray-800">
                            {formData.remark}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions / Sticky Footer */}
          <div className="bg-[#131B2F] border-t border-gray-800 flex flex-col rounded-b-3xl sticky bottom-0 z-20 shadow-[0_-4px_25px_-5px_rgba(0,0,0,0.06)]">
            {errorMsg && (
              <div className="px-6 py-3 bg-red-50 text-red-600 text-sm font-bold border-b border-red-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                {errorMsg}
              </div>
            )}
            
            <div className={`p-4 md:px-8 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${currentStep !== 1 ? 'bg-[#0B0F19] rounded-b-3xl' : ''}`}>
              {currentStep === 1 ? (
                <div className="flex-1"></div>
              ) : (
                <div className="flex-1">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-3 font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={18} /> 上一步
                  </button>
                </div>
              )}

              <div className="flex items-center gap-4 justify-end md:w-auto w-full">
                {currentStep < 3 && (
                  <button 
                    onClick={handleNext}
                    className="flex items-center justify-center gap-2 px-10 py-3.5 bg-[#14b8a6] hover:bg-teal-600 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95 hover:shadow-lg w-full md:w-auto text-lg"
                  >
                    下一步
                  </button>
                )}
                {currentStep === 3 && (
                  <button 
                    onClick={handleNext}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95 hover:shadow-lg w-full md:w-auto ml-auto"
                  >
                    下一步
                    <ChevronRight size={18} />
                  </button>
                )}
                {currentStep === 4 && (
                  <button 
                    onClick={() => setShowSuccessModal(true)}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95 hover:shadow-lg w-full md:w-auto ml-auto"
                  >
                    確認送出
                    <Check size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Policy Modals */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPrivacyModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#131B2F] rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-white border-b pb-4">《個人資料使用授權同意書》</h3>
              <div className="text-gray-500 space-y-4 text-[15px] leading-relaxed mb-8 pr-2">
                <p>為了提供您最佳的網路申辦與安裝服務，光纖社區網路需要收集您的基本個人資料。本同意書旨在說明我們如何收集、處理及利用您的個人資料，請仔細閱讀。</p>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">一、 蒐集目的</h4>
                <p>僅供辦理申裝網路服務、客戶服務、帳務管理、以及必要之系統建置與本公司派工聯繫使用。</p>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">二、 蒐集類別</h4>
                <p>聯絡人真實姓名、身分證字號（如需）、聯絡電話、電子郵件地址及終端裝機服務地址等必要欄位。</p>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">三、 個人資料利用之期間、地區、對象及方式</h4>
                <p>於本公司營運期間內，限台灣地區，僅由本公司及簽約合作之派工維修單位為業務執行之合理善意利用。我們保證不會將您的資料出售給其他第三方機構。</p>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">四、 當事人權利</h4>
                <p>您可依個人資料保護法規定，隨時向本公司客服中心查詢、閱覽、製給複製本、補充或更正、停止電腦處理及利用或刪除您的個人資料。</p>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <button 
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-8 py-3 bg-gray-100 text-gray-300 rounded-xl hover:bg-gray-200 transition-colors font-bold shadow-sm"
                >
                  確認並關閉
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showTermsModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTermsModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#131B2F] rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-white border-b pb-4">《網路申裝與服務權益說明》</h3>
              <div className="text-gray-500 space-y-4 text-[15px] leading-relaxed mb-8 pr-2">
                <p>感謝您選擇光纖社區網路服務！為保障雙方權益，請在完成申辦前詳閱以下申裝及網路服務使用說明：</p>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">一、 服務申辦與裝機</h4>
                <p>我們將於您線上完成申請並審核無誤後的 3 個工作天內，指派專責工程人員與您透過電話聯繫，以確認確切的到府裝機時間段。請確保您填寫的手機與聯絡方式準確無誤並保持暢通。</p>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">二、 收費標準與繳費原則</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>網路服務之首期相關費用，將於工程師到府將設備安裝完畢，並協助您測試確認網路連線可正常運作後，才會與您進行收取。</li>
                  <li>首期收取之費用僅包含您所選該方案之期數總價（如 24 個月方案即收取 24 個月之總額），除非由客戶額外要求特別佈線工程，否則絕無隱藏之到府安裝費或手續費。</li>
                </ul>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">三、 網路速率與使用品質</h4>
                <p>本服務所提供之網路頻寬為「最高可達」速率（如最高可達 300M）。提醒您，實際測速與體感網速可能因您自備的終端上網設備差異（如舊款網卡、分享器性能）、室內物理環境干擾（如隔牆、訊號死角）或同時間社區內骨幹網路分享的尖峰狀況而有所合理波動，此為網際網路傳輸之自然現象。</p>
                <h4 className="font-bold text-gray-100 mt-6 mb-2">四、 終止合約與退費規則</h4>
                <p>如您於方案合約期間內，因搬家等個人因素導致需提早終止服務，本公司將依據政府既定之電信服務定型化契約規範與裝機時所簽署之實體紙本合約，向您酌收相應之違約補貼款或相關撤機費用。</p>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="px-8 py-3 bg-[#14b8a6] text-white rounded-xl hover:bg-teal-600 transition-colors font-bold shadow-sm"
                >
                  確認並關閉
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-[#131B2F] rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mb-6">
                <Check size={32} className="text-[#14b8a6]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">申請已送出！</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                感謝您選擇光纖社區網路服務，我們的專員將於三個工作天內與您電話聯繫，安排後續施工事宜。
              </p>
              <button 
                onClick={async () => {
                  try {
                    const newAppRecord = { 
                      ...formData,
                      id: formData.idNumber.toUpperCase(), 
                      phone: formData.mobile,
                      name: formData.contactName,
                      appId: Date.now().toString(),
                      createdAt: new Date().toISOString()
                    };

                    if (db && !db.mock) {
                      await addDoc(collection(db, 'fiber_applications'), newAppRecord);
                    } else {
                      const existingStr = localStorage.getItem('fiber_applications');
                      const existingApps = existingStr ? JSON.parse(existingStr) : [];
                      existingApps.push(newAppRecord);
                      localStorage.setItem('fiber_applications', JSON.stringify(existingApps));
                    }
                  } catch (e) {
                    console.error('Save failed:', e);
                  }
                  setShowSuccessModal(false);
                  navigate('/');
                }}
                className="w-full py-3.5 bg-[#14b8a6] text-white font-bold rounded-xl hover:bg-teal-600 transition-colors shadow-md active:scale-95"
              >
                確定
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
