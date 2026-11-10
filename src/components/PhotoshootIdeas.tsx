import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Palette, 
  Camera, 
  Copy, 
  CheckCheck, 
  Bookmark, 
  BookmarkCheck, 
  RefreshCw, 
  Sliders, 
  X, 
  CheckCircle2, 
  Layers,
  ArrowLeft
} from 'lucide-react';
import { PHOTOSHOOT_CONCEPTS } from '../data/mockData';
import { PhotoshootConcept } from '../types';

interface PhotoshootIdeasProps {
  onUseConceptForShotList?: (concept: PhotoshootConcept) => void;
}

export const PhotoshootIdeas: React.FC<PhotoshootIdeasProps> = ({ onUseConceptForShotList }) => {
  const [concepts, setConcepts] = useState<PhotoshootConcept[]>(PHOTOSHOOT_CONCEPTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [savedConceptIds, setSavedConceptIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('shotmaster_saved_concepts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // AI Generator Modal
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [customCategory, setCustomCategory] = useState('بورتريه وأزياء');
  const [customTheme, setCustomTheme] = useState('سينمائي درامي مع إضاءة نيون');
  const [customProduct, setCustomProduct] = useState('مودل فوتوغرافي مع ملابس شتوية فاخرة');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorError, setGeneratorError] = useState<string | null>(null);

  const filteredConcepts = concepts.filter((c) => {
    if (activeCategory === 'saved') {
      return savedConceptIds.includes(c.id);
    }
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  const toggleSaveConcept = (id: string) => {
    setSavedConceptIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('shotmaster_saved_concepts', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const copyConcept = (concept: PhotoshootConcept) => {
    const text = `فكرة جلسة تصوير: ${concept.conceptTitle}
الطابع البصري: ${concept.moodAndAesthetics}
الإضاءة:
- Key Light: ${concept.lightingRecipe.keyLight}
- Fill Light: ${concept.lightingRecipe.fillLight}
- Rim Light: ${concept.lightingRecipe.rimLight}
الوضعيات الموصى بها:
${concept.recommendedPoses.map((p, i) => `${i + 1}. ${p}`).join('\n')}
الإكسسوارات والديكور:
${concept.propsAndStyling.join(' • ')}
الكاميرا والعدسة: ${concept.cameraAndLens}
نصيحة ذهبية: ${concept.proTips}`;

    navigator.clipboard.writeText(text);
    setCopiedId(concept.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleGenerateCustomConcept = async () => {
    setIsGenerating(true);
    setGeneratorError(null);
    try {
      const response = await fetch('/api/ai/photoshoot-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: customCategory,
          theme: customTheme,
          audienceOrProduct: customProduct,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        const newConcept: PhotoshootConcept = {
          id: `ai-concept-${Date.now()}`,
          category: 'portraits',
          categoryAr: customCategory,
          ...data.data,
        };
        setConcepts([newConcept, ...concepts]);
        setShowGeneratorModal(false);
      } else {
        throw new Error(data.error || 'فشل في توليد الفكرة');
      }
    } catch (err: any) {
      console.error('Error generating concept:', err);
      setGeneratorError('حدث خطأ أثناء توليد الفكرة، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 font-mono-tech">
            <Lightbulb className="w-3.5 h-3.5" />
            CREATIVE PHOTOSHOOT CONCEPTS & MOODBOARDS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            أفكار جلسات التصوير والمودبورد
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            مفاهيم بصرية سينمائية متكاملة مع لوحات الألوان، وضعيات المودل، ووصفات توزيع الإضاءة
          </p>
        </div>

        <button
          onClick={() => setShowGeneratorModal(true)}
          className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>ابتكر فكرة جديدة بالـ AI</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'saved', label: `المحفوظات (${savedConceptIds.length})` },
          { id: 'portraits', label: 'بورتريه' },
          { id: 'fashion', label: 'أزياء وموضة' },
          { id: 'cars', label: 'سيارات وسرعة' },
          { id: 'products', label: 'منتجات وإعلانات' },
          { id: 'food', label: 'طعام ومشروبات' },
          { id: 'social', label: 'محتوى سوشيال' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                : 'bg-[#0e1118] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Concept Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredConcepts.map((concept) => {
          const isSaved = savedConceptIds.includes(concept.id);
          const isCopied = copiedId === concept.id;

          return (
            <div
              key={concept.id}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0d1017] via-[#090b10] to-[#06080b] border border-cyan-500/20 hover:border-cyan-500/40 shadow-xl space-y-5 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {concept.categoryAr}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-2 group-hover:text-cyan-300 transition-colors">
                      {concept.conceptTitle}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {concept.logline}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleSaveConcept(concept.id)}
                      aria-label="حفظ في المفضلة"
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => copyConcept(concept)}
                      aria-label="نسخ الفكرة"
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all cursor-pointer"
                    >
                      {isCopied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Color Palette Swatches */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Palette className="w-3.5 h-3.5 text-cyan-400" />
                    لوحة الألوان المتناسقة (Color Palette):
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {concept.colorPalette.map((hex, idx) => (
                      <div key={idx} className="space-y-1 text-center">
                        <div
                          className="w-full h-8 rounded-lg border border-white/10 shadow-inner"
                          style={{ backgroundColor: hex }}
                        />
                        <div className="text-[9px] text-slate-400 font-mono-tech truncate">
                          {concept.colorNames?.[idx] || hex}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lighting Recipe Box */}
                <div className="p-4 rounded-2xl bg-[#111520] border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    وصفة توزيع الإضاءة (Lighting Recipe):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div>
                      <span className="font-bold text-white">الضوء الرئيسي (Key): </span>
                      {concept.lightingRecipe.keyLight}
                    </div>
                    <div>
                      <span className="font-bold text-white">ضوء الملء (Fill): </span>
                      {concept.lightingRecipe.fillLight}
                    </div>
                    <div>
                      <span className="font-bold text-white">إضاءة الحواف (Rim): </span>
                      {concept.lightingRecipe.rimLight}
                    </div>
                    <div>
                      <span className="font-bold text-white">الجو / الفلاتر: </span>
                      {concept.lightingRecipe.ambientOrGels}
                    </div>
                  </div>
                </div>

                {/* Recommended Poses */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-white">
                    وضعيات التصوير المقترحة (Recommended Poses):
                  </div>
                  <div className="space-y-1.5">
                    {concept.recommendedPoses.map((pose, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Camera & Lens + Props and Shot List Action Button */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono-tech text-slate-200">{concept.cameraAndLens}</span>
                  </div>
                  <span className="text-[11px] text-amber-300">
                    {concept.propsAndStyling.slice(0, 2).join(' • ')}
                  </span>
                </div>

                {onUseConceptForShotList && (
                  <button
                    onClick={() => onUseConceptForShotList(concept)}
                    className="w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>توليد جدول لقطات تنفيذي من هذه الفكرة</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Concept Generator Modal */}
      {showGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e121a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base sm:text-lg">
                  توليد فكرة جلسة تصوير مخصصة بالـ AI
                </h3>
              </div>
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {generatorError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {generatorError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  تصنيف الجلسة
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="بورتريه شخصي">بورتريه شخصي (Creative Portrait)</option>
                  <option value="أزياء وموضة">أزياء وموضة (Fashion & Editorial)</option>
                  <option value="سيارات وسرعة">سيارات وسرعة (Automotive Photography)</option>
                  <option value="منتجات تجارية">منتجات تجارية وعطور وساعات (Commercial Products)</option>
                  <option value="طعام ومشروبات">طعام ومشروبات وقهاوي (Food & Beverage)</option>
                  <option value="محتوى سوشيال وإعلانات ريلز">محتوى سوشيال وإعلانات ريلز (Social Content)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  الموضوع أو المنتج أو المودل
                </label>
                <input
                  type="text"
                  value={customProduct}
                  onChange={(e) => setCustomProduct(e.target.value)}
                  placeholder="مثال: ساعة يد فاخرة مع حجر بركاني، عارضة أزياء ترتدي فستاناً أحمر..."
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  الطابع البصري والمزاج (Visual Mood)
                </label>
                <input
                  type="text"
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                  placeholder="مثال: سينمائي مظلم، إضاءة نيون سايبر بانك، ناعم مع ألوان باستيل هادئة..."
                  className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleGenerateCustomConcept}
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري الابتكار بالذكاء الاصطناعي...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>توليد مفهوم الجلسة الكامل</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
