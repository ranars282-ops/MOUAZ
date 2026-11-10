import React, { useState } from 'react';
import { 
  ListOrdered, 
  Sparkles, 
  Plus, 
  Trash2, 
  Printer, 
  Copy, 
  CheckCheck, 
  RefreshCw, 
  Video, 
  Film, 
  Sliders, 
  Info,
  Clock,
  Camera,
  SunMedium,
  Pencil,
  X,
  Check
} from 'lucide-react';
import { ShotListPlan, ShotListItem } from '../types';

interface ShotListGeneratorProps {
  initialData?: {
    title?: string;
    synopsis?: string;
    visualTone?: string;
    shotToAdd?: ShotListItem;
  } | null;
}

export const ShotListGenerator: React.FC<ShotListGeneratorProps> = ({ initialData }) => {
  const [projectTitle, setProjectTitle] = useState('إعلان عطر فاخر - نبض الأصالة');
  const [projectType, setProjectType] = useState('إعلان تجاري للتلفزيون والسوشيال');
  const [synopsis, setSynopsis] = useState('رجل أعمال يدخل إلى قاعة معمارية فخمة عند الغروب، يمرر يده على زجاجة عطر ذهبية، تتطاير ذرات الرذاذ بحركة بطيئة مع انعكاسات ضوئية حادة.');
  const [location, setLocation] = useState('قاعة رخامية ذات نوافذ عالية / استوديو');
  const [visualTone, setVisualTone] = useState('سينمائي درامي High-End مع تباين ألوان عنبري وأزرق كحلي');

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingShot, setEditingShot] = useState<ShotListItem | null>(null);

  // Sync initialData if provided from other tabs
  React.useEffect(() => {
    if (initialData) {
      if (initialData.title) setProjectTitle(initialData.title);
      if (initialData.synopsis) setSynopsis(initialData.synopsis);
      if (initialData.visualTone) setVisualTone(initialData.visualTone);
      if (initialData.shotToAdd) {
        setCurrentPlan((prev) => ({
          ...prev,
          shots: [initialData.shotToAdd!, ...prev.shots],
        }));
      }
    }
  }, [initialData]);

  // Initial generated plan
  const [currentPlan, setCurrentPlan] = useState<ShotListPlan>({
    projectTitle: 'إعلان عطر فاخر - نبض الأصالة',
    totalEstimatedTime: '4 ساعات تصوير',
    recommendedLensPackage: ['24mm f/1.4 GM (تأسيس)', '50mm f/1.2 GM (حوار ومتوسط)', '90mm f/2.8 Macro (تفاصيل الزجاجة)'],
    lightingMood: 'إضاءة سينمائية بنمط درامي خفيف مع تباين محسوب واستخدام Rim Light لإبراز الموضوع عن الخلفية.',
    shots: [
      {
        id: 's-1a',
        sceneNumber: '1',
        shotNumber: '1A',
        shotType: 'Extreme Wide Shot (EWS)',
        angle: 'Slightly Low Angle',
        movement: 'Slow Forward Push (Dolly In)',
        focalLength: '24mm',
        fps: '24 FPS',
        lighting: 'ضوء طبيعي ناعم من النوافذ الكبيرة مع Haze خفيف',
        actionDescription: 'البطل يدخل من الباب الضخم، ظلاله تمتد على الأرضية الرخامية اللامعة مع انعكاسات ضوء الغروب.',
        directorNote: 'الحفاظ على الكادر مستقيماً تماماً لإظهار الفخامة المعمارية.',
      },
      {
        id: 's-1b',
        sceneNumber: '1',
        shotNumber: '1B',
        shotType: 'Medium Shot (MS)',
        angle: 'Eye Level',
        movement: 'Tracking Shot (Lateral)',
        focalLength: '50mm',
        fps: '24 FPS',
        lighting: 'Key Light بزاوية 45 درجة (Softbox) مع عاكس فضي خفيف',
        actionDescription: 'البطل يقترب من الطاولة الخشبية الداكنة، تتوقف خطواته وتثبت نظراته الواثقة نحو زجاجة العطر.',
        directorNote: 'عزل الخلفية بدرجة f/2.0 لخلق بوكيه سينمائي ناعم.',
      },
      {
        id: 's-1c',
        sceneNumber: '1',
        shotNumber: '1C',
        shotType: 'Extreme Close-Up (ECU)',
        angle: 'Low Angle',
        movement: 'Rack Focus (من اليد إلى الغطاء الذهبي)',
        focalLength: '90mm Macro',
        fps: '60 FPS (Slow Motion)',
        lighting: 'إضاءة جانبية دقيقة بمصدر LED موجه Grid لإبراز النقش',
        actionDescription: 'أصابع اليد تلمس الغطاء الذهبي وتفتحه، بريق انعكاس الضوء يمر عبر المعدن.',
        directorNote: 'مهم جداً استخدام حامل ثلاثي متين مع رأس هيدروليكي لمنع أي اهتزاز مجهري.',
      },
      {
        id: 's-1d',
        sceneNumber: '1',
        shotNumber: '1D',
        shotType: 'Macro Detail Shot',
        angle: 'High Angle 45°',
        movement: 'Static (ثابتة تماماً)',
        focalLength: '90mm Macro',
        fps: '120 FPS (Ultra Slow Motion)',
        lighting: 'Backlight حاد يخترق رذاذ العطر ليجعله يتلألأ كالنجوم',
        actionDescription: 'لحظة ضغط البخاخ؛ رذاذ العطر ينتشر بانسيابية ساحرة في الهواء أمام خلفية داكنة.',
        directorNote: 'سرعة غالق 1/250s لتجميد حركة قطرات الرذاذ الفردية.',
      },
    ],
  });

  const handleGenerateShotList = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-shotlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: projectTitle,
          projectType,
          synopsis,
          location,
          visualTone,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setCurrentPlan(data.data);
      }
    } catch (err) {
      console.error('Error generating shot list:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddShot = () => {
    const nextIndex = currentPlan.shots.length + 1;
    const newShot: ShotListItem = {
      id: `custom-${Date.now()}`,
      sceneNumber: '1',
      shotNumber: `1${String.fromCharCode(64 + nextIndex)}`,
      shotType: 'Close-Up (CU)',
      angle: 'Eye Level',
      movement: 'Static',
      focalLength: '50mm',
      fps: '24 FPS',
      lighting: 'Soft Key + Reflector',
      actionDescription: 'وصف الحدث في هذا المشهد...',
      directorNote: 'ملاحظة الفوكس والإحساس...',
    };
    setCurrentPlan({
      ...currentPlan,
      shots: [...currentPlan.shots, newShot],
    });
  };

  const handleDeleteShot = (id: string) => {
    setCurrentPlan({
      ...currentPlan,
      shots: currentPlan.shots.filter((s) => s.id !== id),
    });
  };

  const handleCopyTable = () => {
    let text = `جدول لقطات مشروع: ${currentPlan.projectTitle}\n`;
    text += `الوقت التقديري: ${currentPlan.totalEstimatedTime}\n`;
    text += `حزمة العدسات: ${currentPlan.recommendedLensPackage.join(' - ')}\n\n`;
    currentPlan.shots.forEach((s) => {
      text += `[مشهد ${s.sceneNumber} - لقطة ${s.shotNumber}] | ${s.shotType} | عدسة ${s.focalLength} | حركة: ${s.movement}\n`;
      text += `الحدث: ${s.actionDescription}\n`;
      text += `الإضاءة: ${s.lighting}\n`;
      text += `ملاحظة الإخراج: ${s.directorNote}\n-------------------\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 font-mono-tech">
            <ListOrdered className="w-3.5 h-3.5" />
            DIRECTOR CALL SHEET & SHOT LIST GENERATOR
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            مولّد جدول اللقطات والكول شيت
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            حوّل أفكار الإعلانات والفيديوهات إلى جدول لقطات تنفيذي مفصل بمقاسات الكادرات والعدسات
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleCopyTable}
            className="px-3.5 py-2 rounded-xl bg-[#121622] hover:bg-[#181f30] border border-white/10 text-xs font-semibold text-cyan-400 flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ الجدول</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-400/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة / تصدير PDF</span>
          </button>
        </div>
      </div>

      {/* Project Brief Input Accordion / Form */}
      <section className="p-6 rounded-3xl bg-[#0c0f16] border border-cyan-500/30 shadow-xl space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <Film className="w-4 h-4 text-cyan-400" />
          <span>بيانات المشروع والفكرة الإعلانية</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              عنوان المشروع أو الإعلان
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              نوع العمل والمخرجات
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="إعلان تجاري للتلفزيون والسوشيال">إعلان تجاري (Commercial Ad)</option>
              <option value="ريلز وتيك توك عمودي 9:16">ريلز وسوشيال ميديا عمودي (Vertical 9:16)</option>
              <option value="فيلم روائي قصير">فيلم روائي قصير (Short Film)</option>
              <option value="فيديو كليب موسيقي">فيديو كليب موسيقي (Music Video)</option>
              <option value="وثائقي ومقابلات">وثائقي ومقابلات (Documentary)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            فكرة المشهد والسيناريو الموجز (Synopsis)
          </label>
          <textarea
            rows={2}
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              موقع التصوير (Location)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              الطابع البصري والجو (Visual Tone)
            </label>
            <input
              type="text"
              value={visualTone}
              onChange={(e) => setVisualTone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerateShotList}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>جاري بناء جدول اللقطات بالـ AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>توليد جدول لقطات ذكي جديد</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Production Metadata Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0d1017] border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-4 h-4 text-cyan-400" />
            الوقت التقديري للتصوير:
          </div>
          <div className="text-sm font-bold text-white font-mono-tech">
            {currentPlan.totalEstimatedTime}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1017] border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Camera className="w-4 h-4 text-cyan-400" />
            حزمة العدسات المقترحة:
          </div>
          <div className="text-xs font-bold text-cyan-300 truncate font-mono-tech">
            {currentPlan.recommendedLensPackage.join(' • ')}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1017] border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <SunMedium className="w-4 h-4 text-cyan-400" />
            طبيعة الإضاءة العامة:
          </div>
          <div className="text-xs text-slate-300 line-clamp-1">
            {currentPlan.lightingMood}
          </div>
        </div>
      </div>

      {/* Structured Shot List Table */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan-400" />
            <span>قائمة اللقطات التنفيذية ({currentPlan.shots.length} لقطة)</span>
          </h3>

          <div className="flex items-center gap-2">
            {currentPlan.shots.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('هل تريد مسح جميع اللقطات لبدء مشروع جديد؟')) {
                    setCurrentPlan({ ...currentPlan, shots: [] });
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح القائمة</span>
              </button>
            )}

            <button
              onClick={handleAddShot}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة لقطة يدوية</span>
            </button>
          </div>
        </div>

        {currentPlan.shots.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0a0d14] border border-white/5 text-center space-y-3">
            <Film className="w-8 h-8 text-cyan-400/40 mx-auto" />
            <p className="text-xs text-slate-400">القائمة فارغة حالياً. اضغط على "إضافة لقطة يدوية" أو "توليد جدول لقطات ذكي جديد" لملء الجدول.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentPlan.shots.map((shot) => (
              <div
                key={shot.id}
                className="p-5 rounded-2xl bg-[#0a0d14] border border-white/5 hover:border-cyan-500/30 transition-all space-y-3 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono-tech font-bold text-xs border border-cyan-500/40">
                      #{shot.shotNumber}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {shot.shotType}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono-tech">
                      • {shot.focalLength} • {shot.fps}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-black text-slate-300 border border-white/10">
                      حركة: {shot.movement}
                    </span>
                    <button
                      onClick={() => setEditingShot(shot)}
                      aria-label="تعديل اللقطة"
                      className="p-1 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteShot(shot.id)}
                      aria-label="حذف اللقطة"
                      className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                  {/* Action description (7 cols) */}
                  <div className="md:col-span-7 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-mono-tech">
                      وصف الحدث وما يظهر في الكادر:
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {shot.actionDescription}
                    </p>
                  </div>

                  {/* Lighting & Notes (5 cols) */}
                  <div className="md:col-span-5 space-y-2 bg-[#121622] p-3 rounded-xl border border-white/5">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold">الإضاءة: </span>
                      <span className="text-slate-300 text-[11px]">{shot.lighting}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold">ملاحظة المخرج: </span>
                      <span className="text-slate-300 text-[11px]">{shot.directorNote}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit Shot Modal */}
      {editingShot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e121a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-base">تعديل بيانات اللقطة #{editingShot.shotNumber}</h3>
              </div>
              <button
                onClick={() => setEditingShot(null)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">نوع اللقطة والتأطير</label>
                  <input
                    type="text"
                    value={editingShot.shotType}
                    onChange={(e) => setEditingShot({ ...editingShot, shotType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">العدسة والبعد البؤري</label>
                  <input
                    type="text"
                    value={editingShot.focalLength}
                    onChange={(e) => setEditingShot({ ...editingShot, focalLength: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">حركة الكاميرا</label>
                <input
                  type="text"
                  value={editingShot.movement}
                  onChange={(e) => setEditingShot({ ...editingShot, movement: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">وصف الحدث في الكادر</label>
                <textarea
                  rows={2}
                  value={editingShot.actionDescription}
                  onChange={(e) => setEditingShot({ ...editingShot, actionDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">الإضاءة والجو</label>
                <input
                  type="text"
                  value={editingShot.lighting}
                  onChange={(e) => setEditingShot({ ...editingShot, lighting: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">ملاحظة المخرج</label>
                <input
                  type="text"
                  value={editingShot.directorNote}
                  onChange={(e) => setEditingShot({ ...editingShot, directorNote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setEditingShot(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 hover:bg-white/10 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  setCurrentPlan({
                    ...currentPlan,
                    shots: currentPlan.shots.map((s) => (s.id === editingShot.id ? editingShot : s)),
                  });
                  setEditingShot(null);
                }}
                className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-cyan-300"
              >
                <Check className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
