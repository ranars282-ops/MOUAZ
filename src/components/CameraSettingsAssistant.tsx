import React, { useState } from 'react';
import { 
  Sliders, 
  Camera, 
  Sun, 
  Moon, 
  Sunset, 
  Layers, 
  User, 
  Mountain, 
  Zap, 
  Film, 
  Check, 
  Info, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  CheckCheck,
  Disc,
  Clock,
  Gauge,
  X,
  RefreshCw
} from 'lucide-react';
import { CAMERA_PRESETS, SCENE_CONDITIONS } from '../data/mockData';
import { SceneCondition } from '../types';

interface CameraSettingsAssistantProps {
  initialSceneId?: string;
}

export const CameraSettingsAssistant: React.FC<CameraSettingsAssistantProps> = ({ 
  initialSceneId = 'daylight' 
}) => {
  const [selectedCameraId, setSelectedCameraId] = useState('sony-a7iv');
  const [selectedSceneId, setSelectedSceneId] = useState(initialSceneId);
  const [copiedSettings, setCopiedSettings] = useState(false);

  // Custom AI Scenario Consultant state
  const [showAiModal, setShowAiModal] = useState(false);
  const [customGoal, setCustomGoal] = useState('عزل خلفية وبوكيه سينمائي حاد');
  const [customSceneText, setCustomSceneText] = useState('تصوير في شارع ممطر مع انعكاسات أضواء النيون');
  const [customLighting, setCustomLighting] = useState('إضاءة ليلية خافتة مع أضواء شوارع ملونة');
  const [isConsultingAi, setIsConsultingAi] = useState(false);
  const [aiCustomResult, setAiCustomResult] = useState<any>(null);

  // Find active items
  const activeCamera = CAMERA_PRESETS.find((c) => c.id === selectedCameraId) || CAMERA_PRESETS[0];
  const activeScene: SceneCondition = SCENE_CONDITIONS.find((s) => s.id === selectedSceneId) || SCENE_CONDITIONS[0];

  // Interactive Exposure Simulator State initialized from scene defaults
  const [currentIso, setCurrentIso] = useState(activeScene.defaultIso.includes('-') ? 100 : parseInt(activeScene.defaultIso) || 100);
  const [currentAperture, setCurrentAperture] = useState(2.8);
  const [currentShutter, setCurrentShutter] = useState(250); // 1/250s

  // Sync when initialSceneId prop changes
  React.useEffect(() => {
    if (initialSceneId) {
      const match = SCENE_CONDITIONS.find((s) => s.id === initialSceneId);
      if (match) {
        handleSelectScene(match);
      }
    }
  }, [initialSceneId]);

  // When scene changes, update default parameters
  const handleSelectScene = (scene: SceneCondition) => {
    setSelectedSceneId(scene.id);
    if (scene.id === 'daylight') {
      setCurrentIso(100);
      setCurrentAperture(5.6);
      setCurrentShutter(1000);
    } else if (scene.id === 'night') {
      setCurrentIso(1600);
      setCurrentAperture(1.8);
      setCurrentShutter(60);
    } else if (scene.id === 'portrait-bokeh') {
      setCurrentIso(100);
      setCurrentAperture(1.4);
      setCurrentShutter(400);
    } else if (scene.id === 'landscape') {
      setCurrentIso(100);
      setCurrentAperture(11);
      setCurrentShutter(60);
    } else if (scene.id === 'sports-action') {
      setCurrentIso(800);
      setCurrentAperture(2.8);
      setCurrentShutter(2000);
    } else if (scene.id === 'cinematic-video') {
      setCurrentIso(800);
      setCurrentAperture(2.8);
      setCurrentShutter(50);
    }
  };

  const handleCopySettings = () => {
    const text = `إعدادات الكاميرا الموصى بها - SHOT MASTER AI:
الكاميرا: ${activeCamera.name}
المشهد: ${activeScene.name}
ISO: ${activeScene.defaultIso}
Shutter Speed: ${activeScene.defaultShutter}
Aperture: ${activeScene.defaultAperture}
White Balance: ${activeScene.defaultWb}
${activeScene.ndFilter ? `ND Filter: ${activeScene.ndFilter}` : ''}
السبب: ${activeScene.explanation}`;

    navigator.clipboard.writeText(text);
    setCopiedSettings(true);
    setTimeout(() => setCopiedSettings(false), 2500);
  };

  const handleConsultAi = async () => {
    setIsConsultingAi(true);
    try {
      const response = await fetch('/api/ai/suggest-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          camera: activeCamera.name,
          scene: customSceneText,
          goal: customGoal,
          lightingCondition: customLighting,
        }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setAiCustomResult(data.data);
      }
    } catch (err) {
      console.error('Error consulting AI for settings:', err);
    } finally {
      setIsConsultingAi(false);
    }
  };

  // Calculate Exposure Value (EV) indicator
  const ev = Math.log2((currentAperture * currentAperture) / (1 / currentShutter)) - Math.log2(currentIso / 100);
  let evStatus = 'تعريض متوازن (0 EV)';
  let evColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (ev < 8) {
    evStatus = 'إضاءة ساطعة جداً (+2 EV)';
    evColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else if (ev > 15) {
    evStatus = 'إضاءة معتمة / ناقصة (-2 EV)';
    evColor = 'text-blue-400 bg-blue-500/10 border-blue-500/30';
  }

  // Get icon for condition
  const getSceneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'Sunset': return <Sunset className="w-5 h-5 text-rose-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'User': return <User className="w-5 h-5 text-purple-400" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Film': return <Film className="w-5 h-5 text-cyan-400" />;
      default: return <Camera className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 font-mono-tech">
            <Sliders className="w-3.5 h-3.5" />
            EXPOSURE & CAMERA ASSISTANT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            مساعد إعدادات الكاميرا وحاسبة التعريض
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            اختر كاميرتك وبيئة التصوير للحصول على أدق إعدادات ISO و Shutter Speed و Aperture
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAiModal(true)}
            className="btn-v2 px-3.5 py-2 text-xs flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0c0c0e]" />
            <span>طلب استشارة إعدادات بالـ AI</span>
          </button>

          <button
            onClick={handleCopySettings}
            className="btn-outline-v2 px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {copiedSettings ? (
              <>
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ الإعدادات</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step 1: Select Camera Model */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>1. اختر نوع الكاميرا أو الهاتف</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono-tech">
            {activeCamera.sensor}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CAMERA_PRESETS.map((cam) => (
            <button
              key={cam.id}
              onClick={() => setSelectedCameraId(cam.id)}
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between group cursor-pointer ${
                selectedCameraId === cam.id
                  ? 'bg-gradient-to-br from-cyan-950/40 to-[#0e131d] border-cyan-400 ring-1 ring-cyan-400/30'
                  : 'bg-[#0d1017] border-white/5 hover:border-cyan-500/30 hover:bg-[#121622]'
              }`}
            >
              <div>
                <div className="text-[10px] text-cyan-400 font-mono-tech uppercase">
                  {cam.brand}
                </div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                  {cam.name}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 truncate font-mono-tech">
                {cam.nativeIso}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Select Photography Condition / Scene */}
      <section className="space-y-3">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-cyan-400" />
          <span>2. اختر بيئة وظروف التصوير (Photography Conditions)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SCENE_CONDITIONS.map((scene) => {
            const isSelected = selectedSceneId === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => handleSelectScene(scene)}
                className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/50 via-[#0e1420] to-[#0a0d13] border-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#0c0f16] border-white/5 hover:border-cyan-500/30 hover:bg-[#111520]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                      {getSceneIcon(scene.iconName)}
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                    {scene.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {scene.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-cyan-300 font-mono-tech">
                  <span>ISO {scene.defaultIso}</span>
                  <span>{scene.defaultAperture}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recommended Settings Card (Hero Display) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c111a] via-[#080b10] to-[#050608] border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-mono-tech mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              CALCULATED EXPOSURE SPECIFICATIONS
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white">
              الإعدادات الموصى بها لـ: {activeScene.name.split('(')[0]}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              مهيأة خصيصاً لمستشعر {activeCamera.name}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono-tech px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              NATIVE: {activeCamera.nativeIso}
            </span>
          </div>
        </div>

        {/* 4 Big Spec Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* ISO */}
          <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 text-center relative overflow-hidden group">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono-tech">
              ISO (الحساسية)
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono-tech my-1.5">
              {activeScene.defaultIso}
            </div>
            <div className="text-[10px] text-slate-400">أقصى حدة وأقل ضجيج</div>
          </div>

          {/* Shutter Speed */}
          <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 text-center relative overflow-hidden group">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono-tech">
              SHUTTER SPEED (الغالق)
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono-tech my-1.5">
              {activeScene.defaultShutter}
            </div>
            <div className="text-[10px] text-slate-400">تجميد الحركة / انسيابية</div>
          </div>

          {/* Aperture */}
          <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 text-center relative overflow-hidden group">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono-tech">
              APERTURE (فتحة العدسة)
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono-tech my-1.5">
              {activeScene.defaultAperture}
            </div>
            <div className="text-[10px] text-slate-400">عمق الميدان والبوكيه</div>
          </div>

          {/* White Balance */}
          <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 text-center relative overflow-hidden group">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono-tech">
              WHITE BALANCE (توازن البياض)
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono-tech my-1.5">
              {activeScene.defaultWb}
            </div>
            <div className="text-[10px] text-slate-400">دقة ألوان البشرة والمشهد</div>
          </div>
        </div>

        {/* Extra Specs Bar: ND Filter & FPS */}
        <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">فلتر العدسة الموصى به:</span>
            <span className="font-bold text-cyan-300 font-mono-tech">
              {activeScene.ndFilter || 'لا حاجة لفلتر ND في هذه الظروف'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">معدل الإطارات (الفيديو):</span>
            <span className="font-bold text-cyan-300 font-mono-tech">
              {activeScene.defaultFps || '24 FPS (Cinematic)'}
            </span>
          </div>
        </div>

        {/* Why this setting is recommended? */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-[#0e121a] border border-cyan-500/30 space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            لماذا اخترنا هذه الإعدادات بالتحديد؟
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeScene.explanation}
          </p>
        </div>
      </section>

      {/* Interactive Visual Exposure Triangle Simulator */}
      <section className="p-6 rounded-3xl bg-[#0a0d14] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Disc className="w-5 h-5 text-cyan-400" />
              محاكي مثلث التعريض التفاعلي (Interactive Exposure Lab)
            </h3>
            <p className="text-xs text-slate-400">
              شاهد كيف يؤثر تغيير الفتحة والغالق والـ ISO على ضبابية الخلفية (Bokeh) وحدّة الحركة
            </p>
          </div>

          <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${evColor}`}>
            {evStatus}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ISO Slider */}
          <div className="p-4 rounded-2xl bg-[#10141f] border border-white/5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold font-mono-tech">ISO (الحساسية)</span>
              <span className="text-cyan-400 font-mono-tech font-black text-base">{currentIso}</span>
            </div>
            <input
              type="range"
              min="100"
              max="12800"
              step="100"
              value={currentIso}
              onChange={(e) => setCurrentIso(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              {currentIso <= 400 ? 'صورة نقية جداً بدون تشويش' : currentIso <= 1600 ? 'ضجيج رقمي خفيف مقبول' : 'ظهور ضجيج رقمي وحبيبات Noise'}
            </div>
          </div>

          {/* Aperture Slider */}
          <div className="p-4 rounded-2xl bg-[#10141f] border border-white/5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold font-mono-tech">Aperture (الفتحة)</span>
              <span className="text-cyan-400 font-mono-tech font-black text-base">f/{currentAperture}</span>
            </div>
            <input
              type="range"
              min="1.2"
              max="16"
              step="0.2"
              value={currentAperture}
              onChange={(e) => setCurrentAperture(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              {currentAperture <= 2.2 ? 'عزل خلفية قوي وبوكيه سينمائي ناعم' : currentAperture <= 5.6 ? 'عزل متوسط مع حدة للوجه' : 'عمق ميدان عريض وكامل المشهد حاد'}
            </div>
          </div>

          {/* Shutter Speed Slider */}
          <div className="p-4 rounded-2xl bg-[#10141f] border border-white/5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold font-mono-tech">Shutter Speed (الغالق)</span>
              <span className="text-cyan-400 font-mono-tech font-black text-base">1/{currentShutter}s</span>
            </div>
            <input
              type="range"
              min="24"
              max="4000"
              step="20"
              value={currentShutter}
              onChange={(e) => setCurrentShutter(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              {currentShutter >= 1000 ? 'تجميد فوري للرياضة والحركة السريعة' : currentShutter >= 125 ? 'مناسب لحركة الأشخاص الطبيعية' : 'انسيابية حركية / يتطلب حامل لتفادي الاهتزاز'}
            </div>
          </div>
        </div>

        {/* Visual Mock Simulation Stage */}
        <div className="p-6 rounded-2xl bg-black/80 border border-cyan-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          {/* Simulated Model & Bokeh */}
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400">معاينة عمق الميدان والبوكيه</div>
            <div className="relative w-32 h-32 rounded-2xl border border-cyan-500/30 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#141824] to-[#0c0e14]">
              {/* Background blur circles */}
              <div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#00f0ff_0,transparent_50%),radial-gradient(circle_at_70%_70%,#3b82f6_0,transparent_50%)]"
                style={{
                  filter: `blur(${Math.max(2, (16 - currentAperture) * 1.5)}px)`,
                  opacity: 0.6
                }}
              />
              <User className="w-12 h-12 text-white relative z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" />
            </div>
            <span className="text-xs font-mono-tech text-cyan-300">
              DoF: {currentAperture <= 2.8 ? 'Shallow (عزل)' : 'Deep (شامل)'}
            </span>
          </div>

          {/* Simulated Motion */}
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400">معاينة تجميد الحركة</div>
            <div className="relative w-32 h-32 rounded-2xl border border-cyan-500/30 flex items-center justify-center overflow-hidden bg-[#0c0e14]">
              <Zap 
                className="w-12 h-12 text-yellow-400 transition-all"
                style={{
                  filter: currentShutter < 125 ? 'blur(4px)' : 'none',
                  transform: currentShutter < 125 ? 'translateX(-6px)' : 'none'
                }}
              />
            </div>
            <span className="text-xs font-mono-tech text-cyan-300">
              {currentShutter >= 500 ? 'تجميد فوري Frozen' : 'ضبابية حركة Motion Blur'}
            </span>
          </div>

          {/* Simulated Grain */}
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400">معاينة النقاء والـ Noise</div>
            <div className="relative w-32 h-32 rounded-2xl border border-cyan-500/30 flex items-center justify-center overflow-hidden bg-[#11141c]">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                  opacity: currentIso > 1600 ? Math.min(0.5, (currentIso - 1600) / 10000) : 0.03
                }}
              />
              <span className="text-xs font-bold text-slate-200 relative z-10 font-mono-tech">
                {currentIso > 3200 ? 'High Noise' : 'Clean Signal'}
              </span>
            </div>
            <span className="text-xs font-mono-tech text-cyan-300">
              ISO {currentIso}
            </span>
          </div>
        </div>
      </section>

      {/* AI Custom Scenario Consultant Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e121a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base sm:text-lg">
                  استشارة إعدادات الكاميرا عبر Gemini AI
                </h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>
                  الكاميرا المحددة حالياً: <strong className="text-white font-mono-tech">{activeCamera.name}</strong> ({activeCamera.sensor})
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  المشهد أو البيئة التي تريد تصويرها
                </label>
                <input
                  type="text"
                  value={customSceneText}
                  onChange={(e) => setCustomSceneText(e.target.value)}
                  placeholder="مثال: تصوير سباق خيول في مضمار رملي وقت العصر..."
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  الهدف البصري والتأثير المرغوب
                </label>
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="مثال: تجميد تطاير حبات الرمل مع عزل عيون الفارس بخلفية ضبابية..."
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  ظروف الإضاءة المتوفرة
                </label>
                <input
                  type="text"
                  value={customLighting}
                  onChange={(e) => setCustomLighting(e.target.value)}
                  placeholder="مثال: شمس مائلة دافئة Golden Hour مع ظلال طويلة..."
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 cursor-pointer"
                >
                  إغلاق
                </button>
                <button
                  onClick={handleConsultAi}
                  disabled={isConsultingAi}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isConsultingAi ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري استشارة الذكاء الاصطناعي...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>تحليل المشهد واقتراح الإعدادات</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Result Card */}
              {aiCustomResult && (
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#0b0e14] to-[#06080b] border border-cyan-500/40 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono-tech text-cyan-400 font-bold">
                      GEMINI RECOMMENDED PARAMETERS
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ثقة عالية
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono-tech">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/5">
                      <div className="text-[10px] text-slate-400">ISO</div>
                      <div className="text-sm font-bold text-cyan-300">{aiCustomResult.iso}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/5">
                      <div className="text-[10px] text-slate-400">SHUTTER</div>
                      <div className="text-sm font-bold text-cyan-300">{aiCustomResult.shutterSpeed}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/5">
                      <div className="text-[10px] text-slate-400">APERTURE</div>
                      <div className="text-sm font-bold text-cyan-300">{aiCustomResult.aperture}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/5">
                      <div className="text-[10px] text-slate-400">WB</div>
                      <div className="text-sm font-bold text-cyan-300">{aiCustomResult.whiteBalance}</div>
                    </div>
                  </div>

                  {aiCustomResult.lensRecommendation && (
                    <div className="text-xs text-slate-300">
                      <strong className="text-cyan-400">العدسة المقترحة: </strong>
                      {aiCustomResult.lensRecommendation}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-cyan-300 block mb-1">التعليل الفني:</strong>
                    {aiCustomResult.explanation}
                  </div>

                  {aiCustomResult.proTip && (
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200">
                      <strong className="text-cyan-400">نصيحة ذهبية: </strong>
                      {aiCustomResult.proTip}
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        // Apply ISO if numeric
                        const isoNum = parseInt(aiCustomResult.iso.replace(/\D/g, ''));
                        if (isoNum) setCurrentIso(isoNum);
                        // Apply Aperture if numeric
                        const fNum = parseFloat(aiCustomResult.aperture.replace(/[^0-9.]/g, ''));
                        if (fNum) setCurrentAperture(fNum);
                        // Apply Shutter if fraction
                        const shutterMatch = aiCustomResult.shutterSpeed.match(/1\/(\d+)/);
                        if (shutterMatch && shutterMatch[1]) {
                          setCurrentShutter(parseInt(shutterMatch[1]));
                        }
                        setShowAiModal(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-cyan-300"
                    >
                      <Check className="w-4 h-4" />
                      <span>تطبيق هذه الإعدادات على محاكي التعريض</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
