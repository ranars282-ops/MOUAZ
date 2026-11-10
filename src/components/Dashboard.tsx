import React, { useState } from 'react';
import { 
  Sparkles, 
  Sliders, 
  Film, 
  SunMedium, 
  ListOrdered, 
  Lightbulb, 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2, 
  Camera, 
  Flame, 
  Compass, 
  Layers,
  ChevronLeft
} from 'lucide-react';
import { TabType } from '../types';
import { CINEMATIC_SHOTS, SCENE_CONDITIONS } from '../data/mockData';

interface DashboardProps {
  setActiveTab: (tab: TabType) => void;
  onSelectSceneCondition: (conditionId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab, onSelectSceneCondition }) => {
  // Mini interactive exposure widget state
  const [miniIso, setMiniIso] = useState(200);
  const [miniAperture, setMiniAperture] = useState(2.8);
  const [miniShutter, setMiniShutter] = useState(250); // 1/250s

  const ev = Math.log2((miniAperture * miniAperture) / (1 / miniShutter)) - Math.log2(miniIso / 100);
  let exposureLabel = 'تعريض متوازن ومثالي (Balanced)';
  let exposureColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (ev < 8) {
    exposureLabel = 'تعريض مرتفع (Overexposed) - مشهد ساطع';
    exposureColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else if (ev > 15) {
    exposureLabel = 'تعريض منخفض (Underexposed) - مشهد معتم';
    exposureColor = 'text-blue-400 bg-blue-500/10 border-blue-500/30';
  }

  const featuredShot = CINEMATIC_SHOTS[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner with Cinematic Reticle (Variation 2) */}
      <section className="relative overflow-hidden card-v2 p-6 sm:p-10 border-[var(--ink-faint)]">
        <div className="hud-corner tl" />
        <div className="hud-corner tr" />
        <div className="hud-corner bl" />
        <div className="hud-corner br" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="label-mono">AI PHOTOGRAPHY ENGINE // PRO</span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-syne leading-tight">
            حوّل كل لقطة إلى <span className="text-[var(--accent)]">تحفة سينمائية</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            مساعدك المتكامل في الجيب: تحليل جودة التكوين والإضاءة بالذكاء الاصطناعي، حاسبة التعريض الدقيقة لكل أنواع الكاميرات، استوديو محاكاة الإضاءة، ودليل اللقطات الإخراجية.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('coach')}
              className="btn-v2 px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>ابدأ تحليل صورتك الآن</span>
              <ArrowLeft className="w-4 h-4 mr-1" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className="btn-outline-v2 px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[var(--accent)]" />
              <span>حاسبة إعدادات الكاميرا</span>
            </button>
          </div>
        </div>

        {/* Live Status Indicators in Space Mono */}
        <div className="mt-8 pt-6 border-t border-[var(--ink-faint)] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="mono text-[10px] text-slate-400">COMPOSITION</div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
              <span className="text-[var(--accent)] font-mono font-bold">[✓]</span>
              قواعد الأثلاث والحلزون
            </div>
          </div>
          <div>
            <div className="mono text-[10px] text-slate-400">CAMERAS_SUPPORTED</div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
              <span className="text-[var(--accent)] font-mono font-bold">[✓]</span>
              DSLR، سينما، هواتف Pro
            </div>
          </div>
          <div>
            <div className="mono text-[10px] text-slate-400">LIGHTING_RIGS</div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
              <span className="text-[var(--accent)] font-mono font-bold">[✓]</span>
              Rembrandt & Butterfly
            </div>
          </div>
          <div>
            <div className="mono text-[10px] text-slate-400">CALL_SHEETS</div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
              <span className="text-[var(--accent)] font-mono font-bold">[✓]</span>
              Shot List & Plan
            </div>
          </div>
        </div>
      </section>

      {/* Core Studio Feature Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="label-mono">Main Modules</span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-syne flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--accent)]" />
              أدوات الاستوديو الرئيسية
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Feature 1: AI Photo Coach */}
          <div 
            onClick={() => setActiveTab('coach')}
            className="card-v2 p-5 hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="label-mono">AI COACH</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                مدرب التصوير الذكي
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                ارفع صورتك أو التقطها مباشرة؛ سيقوم الذكاء الاصطناعي بتشريح التكوين، فحص درجات الإضاءة، واقتراح زاوية بديلة.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-[var(--accent)] group-hover:translate-x-[-4px] transition-transform">
              <span>تحليل صورة الآن</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </div>
          </div>

          {/* Feature 2: Camera Settings Assistant */}
          <div 
            onClick={() => setActiveTab('settings')}
            className="card-v2 p-5 hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <Sliders className="w-5 h-5" />
                </div>
                <span className="label-mono">EXPOSURE</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                مساعد إعدادات الكاميرا
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                حدد نوع كاميرتك أو هاتفك وظروف الإضاءة؛ واحصل على قيم دقيقة لـ ISO و Shutter Speed و Aperture.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-[var(--accent)] group-hover:translate-x-[-4px] transition-transform">
              <span>حساب الإعدادات فوراً</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </div>
          </div>

          {/* Feature 3: Cinematic Video Shots */}
          <div 
            onClick={() => setActiveTab('shots')}
            className="card-v2 p-5 hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <Film className="w-5 h-5" />
                </div>
                <span className="label-mono">CINEMA</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                اللقطات السينمائية
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                مكتبة بصرية للقطات هوليوود: زوايا التصوير (Low Angle, Dutch Angle)، الكادرات (ECU, Cowboy, Wide)، وحركات الكاميرا.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-[var(--accent)] group-hover:translate-x-[-4px] transition-transform">
              <span>استعراض اللقطات</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </div>
          </div>

          {/* Feature 4: Lighting Studio */}
          <div 
            onClick={() => setActiveTab('lighting')}
            className="card-v2 p-5 hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <SunMedium className="w-5 h-5" />
                </div>
                <span className="label-mono">STUDIO</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                استوديو الإضاءة التفاعلي
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                محاكاة مباشرة لتوزيع إضاءة رامبرانت، الفراشة، والإضاءة الثلاثية مع التحكم بزوايا الكي لايت ومعاينة أنماط الظلال.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-[var(--accent)] group-hover:translate-x-[-4px] transition-transform">
              <span>دخول الاستوديو</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </div>
          </div>

          {/* Feature 5: Photoshoot Ideas */}
          <div 
            onClick={() => setActiveTab('ideas')}
            className="card-v2 p-5 hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="label-mono">CREATIVE</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                أفكار جلسات التصوير
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                مودبوردات جاهزة للبورتريه، الموضة، السيارات، المنتجات، والطعام، مع توليد مفاهيم حصرية بالذكاء الاصطناعي.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-[var(--accent)] group-hover:translate-x-[-4px] transition-transform">
              <span>استكشاف الأفكار</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </div>
          </div>

          {/* Feature 6: Shot List Generator */}
          <div 
            onClick={() => setActiveTab('shotlist')}
            className="card-v2 p-5 hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <ListOrdered className="w-5 h-5" />
                </div>
                <span className="label-mono">CALL SHEET</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                مولّد جدول اللقطات
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                اكتب فكرة إعلانك أو الفيلم، وسيقوم النظام بتوليد جدول لقطات تنفيذي مفصل مع العدسات وتوجيهات الحركة.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-[var(--accent)] group-hover:translate-x-[-4px] transition-transform">
              <span>إنشاء جدول لقطات</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick Exposure Lab Widget */}
      <section className="card-v2 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--ink-faint)] pb-4">
          <div>
            <span className="label-mono">EXPOSURE LAB</span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-syne">
              <Compass className="w-4 h-4 text-[var(--accent)]" />
              مختبر التعريض السريع (Live Exposure Lab)
            </h3>
          </div>

          <div className={`px-2.5 py-0.5 border text-xs mono font-bold ${exposureColor}`}>
            {exposureLabel}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ISO */}
          <div className="p-4 bg-[#141418] border border-[var(--ink-faint)] space-y-2">
            <div className="flex justify-between items-center text-xs mono">
              <span className="text-slate-300 font-bold">ISO</span>
              <span className="text-[var(--accent)] font-bold">{miniIso}</span>
            </div>
            <input
              type="range"
              min="100"
              max="6400"
              step="100"
              value={miniIso}
              onChange={(e) => setMiniIso(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mono">
              <span>100</span>
              <span>800</span>
              <span>6400</span>
            </div>
          </div>

          {/* Aperture */}
          <div className="p-4 bg-[#141418] border border-[var(--ink-faint)] space-y-2">
            <div className="flex justify-between items-center text-xs mono">
              <span className="text-slate-300 font-bold">APERTURE</span>
              <span className="text-[var(--accent)] font-bold">f/{miniAperture}</span>
            </div>
            <input
              type="range"
              min="1.4"
              max="16"
              step="0.2"
              value={miniAperture}
              onChange={(e) => setMiniAperture(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mono">
              <span>f/1.4</span>
              <span>f/5.6</span>
              <span>f/16</span>
            </div>
          </div>

          {/* Shutter */}
          <div className="p-4 bg-[#141418] border border-[var(--ink-faint)] space-y-2">
            <div className="flex justify-between items-center text-xs mono">
              <span className="text-slate-300 font-bold">SHUTTER</span>
              <span className="text-[var(--accent)] font-bold">1/{miniShutter}s</span>
            </div>
            <input
              type="range"
              min="30"
              max="2000"
              step="20"
              value={miniShutter}
              onChange={(e) => setMiniShutter(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mono">
              <span>1/30s</span>
              <span>1/250s</span>
              <span>1/2000s</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Scene Conditions Grid */}
      <section className="space-y-3">
        <span className="label-mono">Quick Scene Presets</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SCENE_CONDITIONS.slice(0, 4).map((cond) => (
            <button
              key={cond.id}
              onClick={() => {
                onSelectSceneCondition(cond.id);
                setActiveTab('settings');
              }}
              className="card-v2 p-3 text-right hover:border-[var(--accent)] transition-all group cursor-pointer"
            >
              <div className="text-xs font-bold text-white group-hover:text-[var(--accent)] transition-colors mb-1 truncate">
                {cond.name.split('(')[0]}
              </div>
              <div className="text-[10px] text-[var(--accent)] mono">
                ISO {cond.defaultIso} • {cond.defaultAperture}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
