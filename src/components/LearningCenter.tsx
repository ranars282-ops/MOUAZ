import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Sun, 
  Flame,
  ArrowLeft
} from 'lucide-react';
import { PHOTOGRAPHY_LESSONS } from '../data/mockData';
import { LessonItem } from '../types';

export const LearningCenter: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<string>(PHOTOGRAPHY_LESSONS[0].id);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const activeLesson: LessonItem = PHOTOGRAPHY_LESSONS.find((l) => l.id === activeLessonId) || PHOTOGRAPHY_LESSONS[0];

  const quizQuestions = [
    {
      id: 1,
      question: 'تريد تصوير شلال مياه نهاري لتبدو المياه انسيابية وحريرية كالحليب (Silk Effect). ما هو الإجراء الصحيح؟',
      options: [
        'رفع سرعة الغالق إلى 1/4000s ورفع الـ ISO إلى 6400.',
        'استخدام حامل ثلاثي مع فلتر ND قوي وسرعة غالق بطيئة (1s إلى 3s).',
        'توسيع فتحة العدسة إلى f/1.2 في ضوء الشمس المباشر.',
        'استخدام فلاش مباشر من فوق الكاميرا نحو الشلال.'
      ],
      correctIndex: 1,
      explanation: 'انسيابية المياه تتطلب تعريضاً طويلاً (Long Exposure) لعدة ثوانٍ؛ وفي ضوء النهار يتطلب ذلك فلتر ND لحجب الضوء الزائد ومنع احتراق الصورة، مع حامل ثلاثي لمنع اهتزاز الصخور المحيطة.'
    },
    {
      id: 2,
      question: 'في تصوير الفيديو السينمائي بمعدل 24 FPS، ما هي سرعة الغالق المعيارية وفقاً لقاعدة 180 درجة؟',
      options: [
        '1/24s',
        '1/50s (أو 1/48s)',
        '1/200s',
        '1/1000s'
      ],
      correctIndex: 1,
      explanation: 'قاعدة 180-Degree Shutter Rule تفرض أن تكون سرعة الغالق ضعف معدل الإطارات تماماً (24 x 2 = 1/48s أو 1/50s في الكاميرات الرقمية) لإنتاج ضبابية حركة تحاكي عين الإنسان.'
    },
    {
      id: 3,
      question: 'ما هي العلامة المميزة لإضاءة رامبرانت (Rembrandt Lighting) على وجه الشخصية؟',
      options: [
        'ظل يشبه الفراشة تحت فتحتي الأنف مباشرة.',
        'مثلث ضوء صغير وواضح على خد الشخصية في الجانب المظلل تحت العين.',
        'تقسيم الوجه بالتساوي إلى نصف مضاء بالكامل ونصف مظلم تماماً.',
        'انعدام أي ظلال على الوجه لتسوية الملامح.'
      ],
      correctIndex: 1,
      explanation: 'إضاءة رامبرانت تشتهر بتكوين مثلث ضوئي مميز على الخد البعيد عن الضوء الرئيسي، متصل بظل الأنف، وهي توقيع لوحات الفنان رامبرانت.'
    },
    {
      id: 4,
      question: 'أي فتحة عدسة من الآتي تمنح أعلى عمق ميدان وتجعل الجبال والصخور البعيدة حادة في المشهد الطبيعي؟',
      options: [
        'f/1.4',
        'f/2.8',
        'f/11',
        'f/0.95'
      ],
      correctIndex: 2,
      explanation: 'كلما زاد رقم الـ f-stop (مثل f/11)، صغرت الفتحة الفيزيائية وزاد عمق الميدان (Deep Depth of Field)، فتصبح العناصر القريبة والبعيدة حادة في الكادر.'
    }
  ];

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizScore(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 font-mono-tech">
            <BookOpen className="w-3.5 h-3.5" />
            PHOTOGRAPHY & CINEMA MASTERCLASS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            مركز التعليم الفوتوغرافي والسينمائي
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            دروس عملية مكثفة، جداول اختصارات سريعة، واختبارات تفاعلية لترقية مستواك
          </p>
        </div>
      </div>

      {/* Main Lessons Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Lessons Menu (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 mb-1">
            الدروس التعليمية التفاعلية:
          </div>
          {PHOTOGRAPHY_LESSONS.map((lesson) => {
            const isSelected = activeLessonId === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className={`w-full p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/50 to-[#0e131d] border-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-[#0c0f16] border-white/5 hover:border-cyan-500/30 hover:bg-[#111520]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-black/60 text-cyan-400 border border-cyan-500/30">
                    {lesson.level}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {lesson.readTime}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white mt-1">
                  {lesson.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {lesson.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Lesson Detail (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0d1017] to-[#07090e] border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {activeLesson.category}
                </span>
                <span className="text-xs text-slate-400 font-mono-tech">
                  مستوى: {activeLesson.level}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {activeLesson.title}
              </h3>
            </div>

            {/* Lesson Body Paragraphs */}
            <div className="space-y-3">
              {activeLesson.content.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Lesson Cheat Sheet Card */}
            <div className="p-5 rounded-2xl bg-[#111520] border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono-tech">
                <Sparkles className="w-4 h-4" />
                CHEAT SHEET // القاعدة الذهبية للدرس:
              </div>
              <div className="text-xs text-white font-semibold">
                {activeLesson.cheatSheet.rule}
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300">
                <span className="text-cyan-300 font-bold">مثال تطبيقي: </span>
                {activeLesson.cheatSheet.example}
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300">
                <span className="font-bold">خطأ شائع يجب تجنبه: </span>
                {activeLesson.cheatSheet.mistakeToAvoid}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photography Cheat Sheet Reference Cards */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span>جداول المرجع السريع (Quick Photography Reference)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Aperture Chart */}
          <div className="p-5 rounded-2xl bg-[#0c0f16] border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 font-mono-tech">
              APERTURE (فتحة العدسة)
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-mono-tech">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>f/1.2 - f/1.8</span>
                <span className="text-cyan-300">عزل فائق وبوكيه سينمائي</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>f/2.8 - f/4.0</span>
                <span className="text-slate-300">بورتريه وأزياء حادة</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>f/5.6 - f/8.0</span>
                <span className="text-emerald-300">Sweet Spot لأقصى حدة بصرية</span>
              </div>
              <div className="flex justify-between">
                <span>f/11 - f/16</span>
                <span className="text-slate-400">مناظر طبيعية ومعمارية</span>
              </div>
            </div>
          </div>

          {/* Shutter Speed Chart */}
          <div className="p-5 rounded-2xl bg-[#0c0f16] border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 font-mono-tech">
              SHUTTER SPEED (سرعة الغالق)
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-mono-tech">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>1/2000s - 1/4000s</span>
                <span className="text-cyan-300">تجميد طيور وسيارات سريعة</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>1/500s - 1/1000s</span>
                <span className="text-slate-300">رياضة وأطفال يركضون</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>1/125s - 1/250s</span>
                <span className="text-emerald-300">بورتريه وحركة يد طبيعية</span>
              </div>
              <div className="flex justify-between">
                <span>1/2s - 10s (حامل)</span>
                <span className="text-amber-300">انسيابية مياه وشلالات</span>
              </div>
            </div>
          </div>

          {/* White Balance Chart */}
          <div className="p-5 rounded-2xl bg-[#0c0f16] border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 font-mono-tech">
              WHITE BALANCE (كلفن KELVIN)
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-mono-tech">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>2800K - 3200K</span>
                <span className="text-amber-400">مصابيح تنجستن منزلية دافئة</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>4000K - 4500K</span>
                <span className="text-slate-300">إضاءة فلورسنت مكتبية</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>5500K - 5600K</span>
                <span className="text-cyan-300">ضوء نهار نقي وفلاش استوديو</span>
              </div>
              <div className="flex justify-between">
                <span>6500K - 7500K</span>
                <span className="text-blue-300">ظلال نهارية وسماء غائمة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Photography Quiz */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c0f16] to-[#07090e] border border-cyan-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              اختبار التحدي الفوتوغرافي (Pro Photographer Quiz)
            </h3>
          </div>
          {quizSubmitted && (
            <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono-tech">
              النتيجة: {quizScore} من {quizQuestions.length}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, qIdx) => (
            <div key={q.id} className="p-5 rounded-2xl bg-[#0e121a] border border-white/5 space-y-3">
              <div className="text-xs sm:text-sm font-bold text-white">
                <span className="text-cyan-400 font-mono-tech">س {qIdx + 1}: </span>
                {q.question}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[qIdx] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;
                  let optStyle = 'bg-[#141824] border-white/5 text-slate-300 hover:bg-[#191f2e]';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full p-3 rounded-xl border text-right text-xs transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
                  <span className="text-cyan-400 font-bold">التفسير العلمي: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length < quizQuestions.length}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs sm:text-sm shadow-md shadow-cyan-400/20 active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              تصحيح الاختبار وعرض النتيجة
            </button>
          ) : (
            <button
              onClick={handleResetQuiz}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              إعادة المحاولة من جديد
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
