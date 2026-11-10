import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Plus, 
  Trash2, 
  Star, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  X,
  Zap,
  Info
} from 'lucide-react';
import { INITIAL_USER_GEAR } from '../data/mockData';
import { GearItem } from '../types';

export const GearProfile: React.FC = () => {
  const [gearList, setGearList] = useState<GearItem[]>(() => {
    try {
      const stored = localStorage.getItem('shotmaster_gear_list');
      return stored ? JSON.parse(stored) : INITIAL_USER_GEAR;
    } catch {
      return INITIAL_USER_GEAR;
    }
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGearName, setNewGearName] = useState('');
  const [newGearType, setNewGearType] = useState<'camera' | 'lens' | 'light' | 'accessory'>('camera');
  const [newGearSpecs, setNewGearSpecs] = useState('');
  const [copiedGear, setCopiedGear] = useState(false);

  // Preferences
  const [gridOverlay, setGridOverlay] = useState(() => {
    return localStorage.getItem('shotmaster_pref_grid') || 'thirds';
  });
  const [shutterFormat, setShutterFormat] = useState(() => {
    return localStorage.getItem('shotmaster_pref_shutter') || 'fraction';
  });
  const [soundEffects, setSoundEffects] = useState(() => {
    const s = localStorage.getItem('shotmaster_pref_sound');
    return s !== null ? s === 'true' : true;
  });

  const saveGearList = (items: GearItem[]) => {
    setGearList(items);
    try {
      localStorage.setItem('shotmaster_gear_list', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = (id: string) => {
    saveGearList(
      gearList.map((g) => (g.id === id ? { ...g, isFavorite: !g.isFavorite } : g))
    );
  };

  const deleteGear = (id: string) => {
    saveGearList(gearList.filter((g) => g.id !== id));
  };

  const handleAddGear = () => {
    if (!newGearName.trim()) return;
    const item: GearItem = {
      id: `gear-${Date.now()}`,
      name: newGearName,
      type: newGearType,
      specs: newGearSpecs || 'معدات تصوير احترافية',
      isFavorite: false,
    };
    saveGearList([item, ...gearList]);
    setNewGearName('');
    setNewGearSpecs('');
    setShowAddModal(false);
  };

  const handleExportGear = () => {
    let text = `قائمة معدات التصوير - SHOT MASTER AI PRO:\n\n`;
    gearList.forEach((item, idx) => {
      text += `${idx + 1}. [${getTypeNameAr(item.type)}] ${item.name} - ${item.specs}\n`;
    });
    navigator.clipboard.writeText(text);
    setCopiedGear(true);
    setTimeout(() => setCopiedGear(false), 2500);
  };

  const getTypeNameAr = (type: string) => {
    switch (type) {
      case 'camera': return 'كاميرا';
      case 'lens': return 'عدسة';
      case 'light': return 'إضاءة';
      case 'accessory': return 'ملحق / حامل';
      default: return 'أخرى';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 font-mono-tech">
            <User className="w-3.5 h-3.5" />
            DIRECTOR PROFILE & GEAR LOCKER
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            الملف الشخصي وحقيبة المعدات
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إدارة أسطول الكاميرات والعدسات الخاصة بك، وتفضيلات واجهة الاستوديو
          </p>
        </div>

        <button
          onClick={handleExportGear}
          className="btn-outline-v2 px-4 py-2 text-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          {copiedGear ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">تم نسخ القائمة للذاكرة</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>تصدير قائمة المعدات</span>
            </>
          )}
        </button>
      </div>

      {/* User Badge Profile Hero */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e131d] to-[#07090e] border border-cyan-500/30 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#080a0f] rounded-[14px] flex items-center justify-center">
                <Camera className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  مصور ومخرج سينمائي
                </h3>
                <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  PRO MASTER
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                عضوية استوديو SHOT MASTER الذكي
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-400 font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                محرك Gemini AI متصل وجاهز للتحليل
              </div>
            </div>
          </div>

          {/* Quick Profile Stats */}
          <div className="grid grid-cols-3 gap-3 border-t sm:border-t-0 sm:border-r border-white/10 pt-4 sm:pt-0 sm:pr-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono-tech">
                {gearList.length}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">قطع معدات</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono-tech">
                24
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">تحليل صورة</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono-tech">
                8
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">جداول لقطات</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Locker Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              حقيبة المعدات المسجلة ({gearList.length})
            </h3>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-400/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة معدة جديدة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {gearList.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#0c0f16] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-black text-cyan-400 border border-cyan-500/20">
                    {getTypeNameAr(item.type)}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    aria-label="المفضلة"
                    className="p-1 rounded-lg text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        item.isFavorite ? 'text-amber-400 fill-amber-400' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => deleteGear(item.id)}
                    aria-label="حذف"
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-mono-tech border-t border-white/5 pt-2">
                {item.specs}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Studio Preferences */}
      <section className="p-6 rounded-3xl bg-[#0b0e15] border border-white/10 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <span>تفضيلات الاستوديو وشاشة الكاميرا</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              شبكة الكادر الافتراضية
            </label>
            <select
              value={gridOverlay}
              onChange={(e) => setGridOverlay(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#171c2b] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="thirds">قاعدة الأثلاث 3x3 (Rule of Thirds)</option>
              <option value="golden">النسبة والحلزون الذهبي (Golden Spiral)</option>
              <option value="crosshair">نقطة المركز والتقاطع فقط</option>
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              صيغة عرض سرعة الغالق
            </label>
            <select
              value={shutterFormat}
              onChange={(e) => setShutterFormat(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#171c2b] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="fraction">كسر بالثواني (مثال: 1/250s)</option>
              <option value="angle">زاوية الغالق السينمائية (180° Shutter Angle)</option>
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              أصوات الغالق والاهتزاز
            </label>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-300">محاكاة صوت غالق الكاميرا</span>
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={(e) => setSoundEffects(e.target.checked)}
                className="accent-cyan-400 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Add Gear Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e121a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">إضافة قطعة معدات جديدة</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  اسم المعدة والموديل
                </label>
                <input
                  type="text"
                  value={newGearName}
                  onChange={(e) => setNewGearName(e.target.value)}
                  placeholder="مثال: Canon EOS R5C أو عدسة 35mm f/1.4"
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  نوع المعدة
                </label>
                <select
                  value={newGearType}
                  onChange={(e) => setNewGearType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="camera">كاميرا (DSLR / Mirrorless / Cinema)</option>
                  <option value="lens">عدسة فوتوغرافية أو سينمائية (Lens)</option>
                  <option value="light">إضاءة واستوديو (LED / Strobe / Softbox)</option>
                  <option value="accessory">ملحق أو مانع اهتزاز (Gimbal / Tripod / Drone)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  المواصفات التقنية
                </label>
                <input
                  type="text"
                  value={newGearSpecs}
                  onChange={(e) => setNewGearSpecs(e.target.value)}
                  placeholder="مثال: 45MP Full Frame / 8K RAW أو f/1.2 Sweet bokeh"
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 hover:bg-white/10"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddGear}
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs"
              >
                إضافة لحقيبتي
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
