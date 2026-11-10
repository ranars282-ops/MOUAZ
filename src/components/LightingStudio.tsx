import React, { useState } from 'react';
import { 
  SunMedium, 
  Lightbulb, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  Eye, 
  Info, 
  Sparkles, 
  User, 
  Video, 
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { LIGHTING_SETUPS } from '../data/mockData';
import { LightingSetup } from '../types';

export const LightingStudio: React.FC = () => {
  const [selectedSetupId, setSelectedSetupId] = useState('rembrandt');
  
  // Custom live lighting control states
  const [keyAngle, setKeyAngle] = useState(45);
  const [keyPower, setKeyPower] = useState(85);
  const [keyModifier, setKeyModifier] = useState('Softbox 90cm مع Grid');
  
  const [fillActive, setFillActive] = useState(true);
  const [fillAngle, setFillAngle] = useState(-45);
  const [fillPower, setFillPower] = useState(25);
  
  const [rimActive, setRimActive] = useState(true);
  const [rimAngle, setRimAngle] = useState(135);
  const [rimPower, setRimPower] = useState(40);
  
  const [bgActive, setBgActive] = useState(false);
  const [bgPower, setBgPower] = useState(30);

  const activeSetup: LightingSetup = LIGHTING_SETUPS.find((s) => s.id === selectedSetupId) || LIGHTING_SETUPS[0];

  // Apply a preset to the interactive stage
  const handleApplyPreset = (setup: LightingSetup) => {
    setSelectedSetupId(setup.id);
    setKeyAngle(setup.lights.key.angle);
    setKeyPower(setup.lights.key.power);
    setKeyModifier(setup.lights.key.modifier);

    setFillActive(setup.lights.fill.active);
    setFillAngle(setup.lights.fill.angle);
    setFillPower(setup.lights.fill.power);

    setRimActive(setup.lights.rim.active);
    setRimAngle(setup.lights.rim.angle);
    setRimPower(setup.lights.rim.power);

    setBgActive(setup.lights.background.active);
    setBgPower(setup.lights.background.power);
  };

  // Convert polar coordinates (angle, radius) to Cartesian (x, y) centered at (150, 150)
  const getCoordinates = (angleDegrees: number, radius = 90) => {
    // 0 deg is front (bottom in our canvas, pointing at model)
    const angleRad = ((angleDegrees + 90) * Math.PI) / 180;
    const x = 150 + radius * Math.cos(angleRad);
    const y = 150 + radius * Math.sin(angleRad);
    return { x, y };
  };

  const keyCoords = getCoordinates(keyAngle, 100);
  const fillCoords = getCoordinates(fillAngle, 95);
  const rimCoords = getCoordinates(rimAngle, 100);

  // Computed Lighting Ratio
  const ratioText = fillActive && fillPower > 0 
    ? `${Math.round(keyPower / Math.max(fillPower, 10))}:1` 
    : '8:1+ (High Contrast)';

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 font-mono-tech">
            <SunMedium className="w-3.5 h-3.5" />
            2D/3D LIGHTING SIMULATOR & WORKSHOP
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            استوديو الإضاءة التفاعلي ومحاكي الظلال
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            حرّك زوايا الكي لايت والفيل لايت لمعاينة أنماط إضاءة رامبرانت، الفراشة، والإضاءة المنقسمة
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono-tech">نسبة التباين:</span>
            <span className="text-xs font-bold font-mono-tech px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {ratioText}
            </span>
          </div>

          <button
            onClick={() => {
              const text = `وصفة إضاءة الاستوديو: ${activeSetup.nameAr} (${activeSetup.nameEn})
النوع: ${activeSetup.category}
Key Light: زاوية ${keyAngle}° - شدة ${keyPower}% - مشتت (${keyModifier})
Fill Light: ${fillActive ? `زاوية ${fillAngle}° - شدة ${fillPower}%` : 'معطل'}
Rim Light: ${rimActive ? `زاوية ${rimAngle}° - شدة ${rimPower}%` : 'معطل'}
Backdrop: ${bgActive ? `شدة ${bgPower}%` : 'معطل'}
نسبة التباين (Contrast Ratio): ${ratioText}
النمط والظلال: ${activeSetup.shadowPattern}
مناسب لـ: ${activeSetup.idealFor}`;
              navigator.clipboard.writeText(text);
              alert('تم نسخ وصفة الإضاءة بنجاح!');
            }}
            className="btn-outline-v2 px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>نسخ وصفة الإضاءة</span>
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {LIGHTING_SETUPS.map((setup) => {
          const isSelected = selectedSetupId === setup.id;
          return (
            <button
              key={setup.id}
              onClick={() => handleApplyPreset(setup)}
              className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/50 via-[#0e1420] to-[#0a0d14] border-cyan-400 shadow-md shadow-cyan-500/10'
                  : 'bg-[#0c0f16] border-white/5 hover:border-cyan-500/30 hover:bg-[#111520]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-cyan-400 font-mono-tech uppercase">
                  {setup.category}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                {setup.nameAr}
              </h4>
              <div className="text-[10px] text-slate-400 font-mono-tech">
                {setup.nameEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Studio Stage & Real-time Shadow Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 2D Top-Down Stage Simulator (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#090b10] border border-cyan-500/30 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <SunMedium className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">مسقط الاستوديو من الأعلى (Top-Down Diagram)</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono-tech">
              STAGE RADIUS: 3 METERS
            </span>
          </div>

          {/* SVG Studio Canvas */}
          <div className="relative w-full aspect-square max-h-[380px] sm:max-h-[420px] rounded-2xl bg-[#050608] border border-white/5 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 300 300" className="w-full h-full select-none">
              {/* Circular Stage Grid Lines */}
              <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <circle cx="150" cy="150" r="95" fill="none" stroke="rgba(0,240,255,0.1)" />
              <circle cx="150" cy="150" r="50" fill="none" stroke="rgba(255,255,255,0.04)" />
              <line x1="150" y1="20" x2="150" y2="280" stroke="rgba(255,255,255,0.04)" />
              <line x1="20" y1="150" x2="280" y2="150" stroke="rgba(255,255,255,0.04)" />

              {/* Light Rays towards model */}
              {/* Key Light Ray */}
              <line 
                x1={keyCoords.x} 
                y1={keyCoords.y} 
                x2="150" 
                y2="150" 
                stroke="#00f0ff" 
                strokeWidth="1.5" 
                strokeDasharray="4,3" 
                opacity={keyPower / 100} 
              />
              {/* Fill Light Ray */}
              {fillActive && (
                <line 
                  x1={fillCoords.x} 
                  y1={fillCoords.y} 
                  x2="150" 
                  y2="150" 
                  stroke="#38bdf8" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                  opacity={fillPower / 100} 
                />
              )}
              {/* Rim Light Ray */}
              {rimActive && (
                <line 
                  x1={rimCoords.x} 
                  y1={rimCoords.y} 
                  x2="150" 
                  y2="150" 
                  stroke="#fbbf24" 
                  strokeWidth="1.2" 
                  strokeDasharray="3,3" 
                  opacity={rimPower / 100} 
                />
              )}

              {/* Center Subject (Model) */}
              <g transform="translate(150, 150)">
                <circle r="18" fill="#1e293b" stroke="#00f0ff" strokeWidth="2" />
                {/* Nose pointer facing down toward camera (0 deg) */}
                <polygon points="0,18 -4,26 4,26" fill="#00f0ff" />
                <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">مودل</text>
              </g>

              {/* Camera Icon at bottom (0 degrees, looking up) */}
              <g transform="translate(150, 270)">
                <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#090b10" stroke="#00f0ff" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="5" fill="#00f0ff" />
                <text x="0" y="20" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">CAMERA</text>
              </g>

              {/* Background Backdrop line at top */}
              {bgActive && (
                <line x1="60" y1="35" x2="240" y2="35" stroke="#00f0ff" strokeWidth="3" opacity={bgPower / 100} />
              )}

              {/* Key Light Fixture */}
              <g transform={`translate(${keyCoords.x}, ${keyCoords.y})`}>
                <circle r="12" fill="#00f0ff" opacity="0.2" className="animate-pulse" />
                <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#00f0ff" />
                <text x="0" y="-12" textAnchor="middle" fill="#00f0ff" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  KEY {keyPower}%
                </text>
              </g>

              {/* Fill Light Fixture */}
              {fillActive && (
                <g transform={`translate(${fillCoords.x}, ${fillCoords.y})`}>
                  <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#38bdf8" />
                  <text x="0" y="-10" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
                    FILL {fillPower}%
                  </text>
                </g>
              )}

              {/* Rim Light Fixture */}
              {rimActive && (
                <g transform={`translate(${rimCoords.x}, ${rimCoords.y})`}>
                  <polygon points="0,-7 7,7 -7,7" fill="#fbbf24" />
                  <text x="0" y="-11" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">
                    RIM {rimPower}%
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Real-time Facial Shadow Simulator Preview */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Facial shadow SVG representation */}
              <div className="relative w-16 h-16 rounded-full bg-[#1a1f2c] border border-cyan-500/40 flex items-center justify-center overflow-hidden">
                {/* Nose shadow based on key angle */}
                <div 
                  className="absolute w-2 h-4 bg-black/70 rounded-full"
                  style={{
                    transform: `translate(${keyAngle > 0 ? '6px' : '-6px'}, 2px) rotate(${keyAngle}deg)`,
                    opacity: 0.8
                  }}
                />
                {/* Rembrandt triangle simulation */}
                {Math.abs(keyAngle) >= 30 && Math.abs(keyAngle) <= 60 && (
                  <div 
                    className="absolute w-3 h-3 bg-cyan-300/40 rounded-sm"
                    style={{
                      transform: `translate(${keyAngle > 0 ? '-10px' : '10px'}, 4px) rotate(45deg)`,
                    }}
                  />
                )}
                {/* Rim light edge */}
                {rimActive && (
                  <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-amber-400 opacity-60" />
                )}
                <User className="w-10 h-10 text-slate-300" />
              </div>

              <div>
                <div className="text-xs font-bold text-white">
                  نمط الظل المتشكل: {activeSetup.nameAr}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  {activeSetup.shadowPattern}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Interactive Light Controls & Presets (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-[#0d1017] border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                التحكم اليدوي بوحدات الإضاءة
              </h4>
            </div>

            {/* 1. Key Light Controls */}
            <div className="p-3.5 rounded-2xl bg-[#131722] border border-cyan-500/30 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-cyan-300">الضوء الرئيسي (Key Light)</span>
                <span className="font-mono-tech text-cyan-400 font-extrabold">{keyPower}% | {keyAngle}°</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>الزاوية بالنسبة للمودل:</span>
                  <span className="font-mono-tech">{keyAngle}°</span>
                </div>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={keyAngle}
                  onChange={(e) => setKeyAngle(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>شدة الإضاءة (Power):</span>
                  <span className="font-mono-tech">{keyPower}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={keyPower}
                  onChange={(e) => setKeyPower(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <label className="block text-[10px] text-slate-400 mb-1">
                  مشتت الإضاءة (Light Modifier):
                </label>
                <select
                  value={keyModifier}
                  onChange={(e) => setKeyModifier(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-[#0c0e14] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="Softbox 90cm مع Grid">Softbox 90cm مع Grid (تشتيت ناعم وموجه)</option>
                  <option value="Beauty Dish 70cm فضي">Beauty Dish 70cm فضي (بورتريه عالي التباين)</option>
                  <option value="Octabox 120cm كبير">Octabox 120cm كبير (إضاءة ناعمة شاملة)</option>
                  <option value="Stripbox 30x120cm">Stripbox 30x120cm (إضاءة طولية جانبية)</option>
                  <option value="Silver Umbrella 150cm">مظلة فضية 150cm (انعكاس ساطع ومفتوح)</option>
                  <option value="Standard Reflector 55°">عاكس قياسي 55° بدون مشتت (ضوء مباشر حاد)</option>
                </select>
              </div>
            </div>

            {/* 2. Fill Light Controls */}
            <div className="p-3.5 rounded-2xl bg-[#131722] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="fillCheck"
                    checked={fillActive}
                    onChange={(e) => setFillActive(e.target.checked)}
                    className="accent-cyan-400 cursor-pointer"
                  />
                  <label htmlFor="fillCheck" className="font-bold text-slate-200 cursor-pointer">
                    ضوء الملء (Fill Light)
                  </label>
                </div>
                <span className="font-mono-tech text-slate-400 font-bold">{fillActive ? `${fillPower}%` : 'OFF'}</span>
              </div>

              {fillActive && (
                <div className="space-y-2 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fillPower}
                    onChange={(e) => setFillPower(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    تخفيف الظلال على الجانب المعاكس دون محو الخطوط البنائية
                  </div>
                </div>
              )}
            </div>

            {/* 3. Rim / Hair Light Controls */}
            <div className="p-3.5 rounded-2xl bg-[#131722] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rimCheck"
                    checked={rimActive}
                    onChange={(e) => setRimActive(e.target.checked)}
                    className="accent-amber-400 cursor-pointer"
                  />
                  <label htmlFor="rimCheck" className="font-bold text-slate-200 cursor-pointer">
                    إضاءة الحواف والشعر (Rim Light)
                  </label>
                </div>
                <span className="font-mono-tech text-amber-400 font-bold">{rimActive ? `${rimPower}%` : 'OFF'}</span>
              </div>

              {rimActive && (
                <div className="space-y-2 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={rimPower}
                    onChange={(e) => setRimPower(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    رسم خط فصل ضوئي لعزل الشعر والأكتاف عن الخلفية الداكنة
                  </div>
                </div>
              )}
            </div>

            {/* 4. Background Light Controls */}
            <div className="p-3.5 rounded-2xl bg-[#131722] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="bgCheck"
                    checked={bgActive}
                    onChange={(e) => setBgActive(e.target.checked)}
                    className="accent-cyan-400 cursor-pointer"
                  />
                  <label htmlFor="bgCheck" className="font-bold text-slate-200 cursor-pointer">
                    إضاءة الخلفية (Background Light)
                  </label>
                </div>
                <span className="font-mono-tech text-cyan-400 font-bold">{bgActive ? `${bgPower}%` : 'OFF'}</span>
              </div>

              {bgActive && (
                <div className="space-y-2 pt-1">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={bgPower}
                    onChange={(e) => setBgPower(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    توليد تدرج لوني أو هالة ضوئية خلف رأس المودل لإبراز العمق
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Setup Step-by-Step Guide */}
          <div className="p-5 rounded-3xl bg-[#0b0e15] border border-cyan-500/20 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              خطوات تطبيق إضاءة {activeSetup.nameAr}:
            </h4>
            <div className="space-y-2">
              {activeSetup.stepByStep.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5 text-[11px] text-cyan-400">
              <span className="font-bold text-slate-400">مثالية لـ: </span>
              {activeSetup.idealFor}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
