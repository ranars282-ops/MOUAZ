import React, { useState } from 'react';
import { 
  Film, 
  Search, 
  Video, 
  Compass, 
  Move, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  ArrowLeft,
  Eye,
  Sliders
} from 'lucide-react';
import { CINEMATIC_SHOTS } from '../data/mockData';
import { CinematicShotItem } from '../types';

interface CinematicShotsProps {
  onSelectShotForPlan?: (shot: CinematicShotItem) => void;
}

export const CinematicShots: React.FC<CinematicShotsProps> = ({ onSelectShotForPlan }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'framing' | 'angle' | 'movement'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShot, setSelectedShot] = useState<CinematicShotItem>(CINEMATIC_SHOTS[0]);

  const filteredShots = CINEMATIC_SHOTS.filter((shot) => {
    const matchesCategory = activeCategory === 'all' || shot.type === activeCategory;
    const matchesSearch = 
      shot.nameAr.includes(searchQuery) ||
      shot.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shot.description.includes(searchQuery) ||
      shot.emotion.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Render SVG diagram based on diagramType
  const renderShotDiagram = (shot: CinematicShotItem) => {
    switch (shot.diagramType) {
      case 'ecu':
        return (
          <div className="relative w-full h-44 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            {/* Eye close-up representation */}
            <div className="relative w-36 h-20 rounded-[50px] border-2 border-cyan-400 flex items-center justify-center bg-cyan-950/20">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-300 flex items-center justify-center bg-cyan-900/50">
                <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
              </div>
            </div>
            <div className="absolute top-2 left-2 text-[10px] font-mono-tech text-cyan-400">
              ECU // 85-100mm MACRO
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono-tech">
              DEPTH: SHALLOW (f/1.8)
            </div>
          </div>
        );
      case 'cu':
        return (
          <div className="relative w-full h-44 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            {/* Head and shoulders representation */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-16 rounded-full border-2 border-cyan-400 bg-cyan-950/30 flex items-center justify-center">
                <Eye className="w-6 h-6 text-cyan-300" />
              </div>
              <div className="w-24 h-8 rounded-t-2xl border-t-2 border-cyan-400/60 bg-cyan-950/10 -mt-1" />
            </div>
            <div className="absolute top-2 left-2 text-[10px] font-mono-tech text-cyan-400">
              CU // 50-85mm PRIME
            </div>
          </div>
        );
      case 'ms':
        return (
          <div className="relative w-full h-44 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            {/* Waist up figure */}
            <div className="flex flex-col items-center scale-90">
              <div className="w-10 h-10 rounded-full border border-cyan-400 bg-cyan-950/30" />
              <div className="w-20 h-16 rounded-t-xl border border-cyan-400/80 bg-cyan-950/20 mt-1" />
              <div className="w-16 h-8 border-x border-cyan-400/50" />
            </div>
            <div className="absolute top-2 left-2 text-[10px] font-mono-tech text-cyan-400">
              MS // 35-50mm
            </div>
          </div>
        );
      case 'low-angle':
        return (
          <div className="relative w-full h-44 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            {/* Hero standing tall with camera pointing up */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_#00f0ff]" />
              <div className="w-28 h-20 rounded-t-2xl border-t-2 border-x-2 border-cyan-400 bg-cyan-950/40 mt-1" />
            </div>
            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-cyan-400 text-xs font-mono-tech">
              <span>CAMERA ↗ [15° UP]</span>
            </div>
          </div>
        );
      case 'dutch':
        return (
          <div className="relative w-full h-44 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            {/* Tilted frame */}
            <div className="w-36 h-24 border-2 border-dashed border-cyan-400/60 rotate-[-15deg] rounded-lg flex items-center justify-center bg-cyan-950/20">
              <div className="w-8 h-8 rounded-full border border-cyan-300" />
            </div>
            <div className="absolute bottom-2 left-3 text-[10px] font-mono-tech text-amber-400">
              AXIS TILT: -20°
            </div>
          </div>
        );
      case 'tracking':
        return (
          <div className="relative w-full h-44 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-around px-6">
            {/* Moving camera & Subject */}
            <div className="flex flex-col items-center text-cyan-400">
              <div className="w-8 h-8 rounded-full border border-cyan-400 bg-cyan-950/40" />
              <span className="text-[10px] mt-1 font-mono-tech">الموضوع</span>
            </div>
            <div className="flex items-center text-cyan-400 font-mono-tech text-xs gap-1">
              <span>-- TRACKING ➔ --</span>
            </div>
            <div className="flex flex-col items-center text-cyan-300">
              <Video className="w-7 h-7" />
              <span className="text-[10px] mt-1 font-mono-tech">كاميرا Gimbal</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-44 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            <Video className="w-12 h-12 text-cyan-400 animate-pulse" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 font-mono-tech">
            <Film className="w-3.5 h-3.5" />
            CINEMATIC SHOT BIBLE & MOVEMENT DIRECTORY
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            دليل الكادرات واللقطات السينمائية
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            مرجع احترافي لكل أحجام اللقطات، زوايا الكاميرا، وحركات الإخراج في السينما والإعلانات
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو العدسة أو المشاعر..."
            className="w-full pr-9 pl-4 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
              : 'bg-[#0f121a] text-slate-300 hover:text-white border border-white/5'
          }`}
        >
          جميع اللقطات ({CINEMATIC_SHOTS.length})
        </button>
        <button
          onClick={() => setActiveCategory('framing')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            activeCategory === 'framing'
              ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
              : 'bg-[#0f121a] text-slate-300 hover:text-white border border-white/5'
          }`}
        >
          أحجام الكادرات والتأطير (Framing)
        </button>
        <button
          onClick={() => setActiveCategory('angle')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            activeCategory === 'angle'
              ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
              : 'bg-[#0f121a] text-slate-300 hover:text-white border border-white/5'
          }`}
        >
          زوايا الكاميرا والمنظور (Camera Angles)
        </button>
        <button
          onClick={() => setActiveCategory('movement')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            activeCategory === 'movement'
              ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
              : 'bg-[#0f121a] text-slate-300 hover:text-white border border-white/5'
          }`}
        >
          حركات الكاميرا (Camera Movements)
        </button>
      </div>

      {/* Main Grid: Left List (4 Cols) + Right Inspector Detail (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Shots Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-400 mb-1">
            اختر لقطة لمعاينة الرسم التخطيطي والتكنيك:
          </div>
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredShots.map((shot) => {
              const isSelected = selectedShot.id === shot.id;
              return (
                <div
                  key={shot.id}
                  onClick={() => setSelectedShot(shot)}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/50 to-[#0e131d] border-cyan-400 shadow-md shadow-cyan-500/10'
                      : 'bg-[#0c0f16] border-white/5 hover:border-cyan-500/30 hover:bg-[#111520]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono-tech px-2 py-0.5 rounded bg-black/60 text-cyan-400 border border-cyan-500/30">
                      {shot.abbreviation}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono-tech">
                      {shot.focalLength}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">
                    {shot.nameAr}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono-tech">
                    {shot.nameEn}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {shot.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Shot Deep Dive Inspector */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e121a] via-[#090b10] to-[#060709] border border-cyan-500/30 shadow-2xl space-y-6">
            {/* Visual Diagram */}
            {renderShotDiagram(selectedShot)}

            {/* Title & Description */}
            <div className="border-b border-white/10 pb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-tech px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {selectedShot.abbreviation} // {selectedShot.type.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono-tech">
                  FPS: {selectedShot.fps}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedShot.nameAr} ({selectedShot.nameEn})
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                {selectedShot.description}
              </p>
            </div>

            {/* Technical Specs Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400">البعد البؤري الموصى به</div>
                <div className="text-xs sm:text-sm font-bold text-cyan-300 font-mono-tech">
                  {selectedShot.focalLength}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400">نوع العدسة / الحامل</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono-tech">
                  {selectedShot.lensType}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400">الأثر العاطفي والنفسي</div>
                <div className="text-xs sm:text-sm font-bold text-amber-300">
                  {selectedShot.emotion}
                </div>
              </div>
            </div>

            {/* Famous Film Example */}
            <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Flame className="w-4 h-4" />
                أشهر استخدام في تاريخ السينما والإعلانات:
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedShot.famousUsage}
              </p>
            </div>

            {/* DoP Pro Tip */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <Sparkles className="w-4 h-4" />
                نصيحة مدير التصوير (Director of Photography Pro Tip):
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedShot.proTip}
              </p>
            </div>

            {/* Action Buttons: Copy Specs & Plan Bridge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  const text = `كادر سينمائي: ${selectedShot.nameAr} (${selectedShot.nameEn})
النوع: ${selectedShot.type} [${selectedShot.abbreviation}]
العدسة الموصى بها: ${selectedShot.focalLength} (${selectedShot.lensType})
معدل الإطارات: ${selectedShot.fps}
التأثير العاطفي: ${selectedShot.emotion}
الاستخدام السينمائي: ${selectedShot.famousUsage}
نصيحة مدير التصوير: ${selectedShot.proTip}`;
                  navigator.clipboard.writeText(text);
                  alert('تم نسخ مواصفات اللقطة بنجاح!');
                }}
                className="btn-outline-v2 px-4 py-2.5 text-xs flex items-center gap-2 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>نسخ مواصفات الكادر الفنية</span>
              </button>

              {onSelectShotForPlan && (
                <button
                  onClick={() => onSelectShotForPlan(selectedShot)}
                  className="btn-v2 px-4 py-2.5 text-xs flex items-center gap-2 cursor-pointer font-bold"
                >
                  <Film className="w-4 h-4 text-[#0c0c0e]" />
                  <span>إرسال إلى جدول اللقطات (Shot List)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
