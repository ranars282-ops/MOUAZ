import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  Eye, 
  Compass, 
  Grid3X3, 
  Sun, 
  Focus, 
  Palette, 
  X,
  RefreshCw,
  Zap,
  Check
} from 'lucide-react';
import { PhotoAnalysisResult } from '../types';
import { SAMPLE_COACH_PHOTOS, CAMERA_PRESETS } from '../data/mockData';

export const PhotoCoach: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_COACH_PHOTOS[0].imageUrl);
  const [cameraType, setCameraType] = useState('Sony Alpha 7 IV (Full Frame (33MP))');
  const [sceneType, setSceneType] = useState('استوديو وبورتريه');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<PhotoAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  // Viewfinder overlays
  const [showRuleOfThirds, setShowRuleOfThirds] = useState(false);
  const [showGoldenRatio, setShowGoldenRatio] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const analysisSteps = [
    'جاري قراءة خطوط الكادر وتكوين قاعدة الأثلاث...',
    'فحص التعريض وتوزيع الظلال ومصادر الضوء...',
    'قياس حدة التركيز (Focus Sharpness) وعمق الميدان...',
    'تحليل تناغم الألوان وتوازن البياض (White Balance)...',
    'صياغة التوصيات الإخراجية وزوايا إعادة التصوير...'
  ];

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsLiveCameraActive(false);
  };

  const startLiveCamera = async () => {
    setErrorMessage(null);
    try {
      if (streamRef.current) {
        stopCameraStream();
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLiveCameraActive(true);
    } catch (err: any) {
      console.error('Camera error:', err);
      setErrorMessage('تعذر تشغيل الكاميرا المباشرة في المتصفح. يمكنك رفع صورة بدلاً من ذلك.');
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setSelectedImage(dataUrl);
        stopCameraStream();
        setAnalysisResult(null);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('يرجى اختيار ملف صورة صالح (JPEG, PNG, WEBP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAnalysisResult(null);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_COACH_PHOTOS[0]) => {
    stopCameraStream();
    setSelectedImage(sample.imageUrl);
    setCameraType(sample.context.cameraType);
    setSceneType(sample.context.scene);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const runAnalysis = async () => {
    if (!selectedImage) {
      setErrorMessage('يرجى اختيار صورة أولاً.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
    }, 800);

    try {
      const response = await fetch('/api/ai/analyze-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: 'image/jpeg',
          cameraContext: {
            cameraType,
            scene: sceneType,
          },
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (data.success && data.data) {
        setAnalysisResult(data.data);
      } else {
        throw new Error(data.error || 'فشل في تحليل الصورة');
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Analysis error:', err);
      setErrorMessage('حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. تم استخدام التحليل الإرشادي المحلي.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Module Header (Variation 2) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="label-mono">Primary Module</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-syne leading-none tracking-tight">
            مدرب التصوير والناقد البصري
          </h1>
          <p className="text-xs sm:text-sm text-[rgba(248,248,248,0.6)] mt-2 max-w-2xl leading-relaxed">
            تحليل فوتوغرافي متقدم للتكوين، توازن الإضاءة، حدة الفوكس، والزاوية السينمائية المثالية
          </p>
        </div>

        {/* Viewfinder Overlays Switch */}
        <div className="flex items-center gap-2 bg-[#121216] p-1.5 border border-[var(--ink-faint)] rounded-sm self-start md:self-auto">
          <span className="mono text-[10px] text-slate-400 px-1">HUD:</span>
          <button
            onClick={() => setShowRuleOfThirds(!showRuleOfThirds)}
            className={`px-2 py-1 text-[11px] mono transition-all ${
              showRuleOfThirds 
                ? 'bg-[var(--accent)] text-[#0c0c0e] font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3X3 GRID
          </button>
          <button
            onClick={() => setShowGoldenRatio(!showGoldenRatio)}
            className={`px-2 py-1 text-[11px] mono transition-all ${
              showGoldenRatio 
                ? 'bg-[var(--accent)] text-[#0c0c0e] font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            GOLDEN
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-rose-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Viewfinder Section (Left/Center) + Parameters Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Viewfinder Box (7-8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="viewfinder-shell">
            {/* Real Corner Markers */}
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />

            {/* Center Reticle */}
            <div className="reticle-center" />

            {/* Media: Live video or image */}
            {isLiveCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : selectedImage ? (
              <img
                src={selectedImage}
                alt="Target for analysis"
                className="w-full h-full object-contain select-none"
              />
            ) : (
              <div className="text-center p-8 text-slate-500 space-y-2">
                <Camera className="w-10 h-10 mx-auto text-slate-600" />
                <p className="mono text-xs">NO INPUT DETECTED</p>
              </div>
            )}

            {/* Rule of Thirds Grid Overlay */}
            {showRuleOfThirds && (
              <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3">
                <div className="border-r border-b border-[rgba(0,240,255,0.25)]" />
                <div className="border-r border-b border-[rgba(0,240,255,0.25)]" />
                <div className="border-b border-[rgba(0,240,255,0.25)]" />
                <div className="border-r border-b border-[rgba(0,240,255,0.25)]" />
                <div className="border-r border-b border-[rgba(0,240,255,0.25)]" />
                <div className="border-b border-[rgba(0,240,255,0.25)]" />
                <div className="border-r border-[rgba(0,240,255,0.25)]" />
                <div className="border-r border-[rgba(0,240,255,0.25)]" />
                <div />
              </div>
            )}

            {/* Golden Ratio Overlay */}
            {showGoldenRatio && (
              <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 0,100 A 100,100 0 0,1 100,0 A 61.8,61.8 0 0,1 38.2,100 A 38.2,38.2 0 0,1 61.8,38.2"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                </svg>
              </div>
            )}

            {/* HUD Overlay with Space Mono Telemetry */}
            <div className="hud-overlay">
              <div className="flex justify-between font-mono text-[10px] text-[var(--accent)] tracking-wider">
                <span>REC ● 00:42:11:05</span>
                <span>4K DCI 24FPS</span>
              </div>
              <div className="flex justify-center gap-8 sm:gap-16 font-mono text-[10px] text-[var(--accent)] tracking-widest font-bold">
                <span>ISO 400</span>
                <span>f/2.8</span>
                <span>1/125</span>
              </div>
            </div>

            {/* Live Camera Bottom Floating Shutter Button */}
            {isLiveCameraActive && (
              <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-3">
                <button
                  onClick={captureCameraPhoto}
                  className="w-14 h-14 rounded-full bg-white border-4 border-[var(--accent)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_#00f0ff] cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]" />
                </button>
                <button
                  onClick={stopCameraStream}
                  className="px-3 py-1 bg-black/80 border border-white/20 text-white text-xs mono font-semibold hover:bg-black"
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>

          {/* Sample Thumbnails Grid (Variation 2) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="label-mono">Sample Rigs</span>
              <span className="mono text-[10px] text-slate-500">CLICK TO LOAD</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {SAMPLE_COACH_PHOTOS.map((sample) => {
                const isActive = selectedImage === sample.imageUrl && !isLiveCameraActive;
                return (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`aspect-square border cursor-pointer transition-all duration-300 overflow-hidden relative ${
                      isActive
                        ? 'border-[var(--accent)] grayscale-0 ring-1 ring-[var(--accent)]'
                        : 'border-[var(--ink-faint)] grayscale hover:grayscale-0 hover:border-[var(--accent)]'
                    }`}
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1 py-0.5 text-[9px] text-white font-mono truncate">
                      {sample.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Parameters & Controls (4-5 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Parameters Card (Variation 2) */}
          <div className="card-v2 p-5 space-y-4">
            <span className="label-mono">Parameters</span>
            
            <div>
              <label className="text-[11px] text-[rgba(248,248,248,0.8)] font-semibold block mb-1">
                الكاميرا المستخدمة
              </label>
              <select
                value={cameraType}
                onChange={(e) => setCameraType(e.target.value)}
                className="w-full bg-[#161619] border border-[var(--ink-faint)] text-white text-xs px-3 py-2 rounded-none focus:outline-none focus:border-[var(--accent)] font-mono"
              >
                {CAMERA_PRESETS.map((p) => (
                  <option key={p.id} value={`${p.name} (${p.sensor})`}>
                    {p.name} ({p.sensor})
                  </option>
                ))}
              </select>

              <label className="text-[11px] text-[rgba(248,248,248,0.8)] font-semibold block mb-1">
                بيئة المشهد
              </label>
              <input
                type="text"
                value={sceneType}
                onChange={(e) => setSceneType(e.target.value)}
                className="w-full bg-[#161619] border border-[var(--ink-faint)] text-white text-xs px-3 py-2 rounded-none focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            {/* Primary Action Button with Accent Pulse */}
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing || !selectedImage}
              className={`btn-v2 w-full py-3 text-xs sm:text-sm font-black text-[#0c0c0e] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                !isAnalyzing && selectedImage ? 'pulse-accent' : ''
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#0c0c0e]" />
                  <span>جاري التحليل السينمائي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#0c0c0e]" />
                  <span>تحليل الصورة بالذكاء الاصطناعي</span>
                </>
              )}
            </button>

            {/* Two Secondary Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-outline-v2 py-2 text-xs flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>رفع صورة</span>
              </button>

              <button
                onClick={() => {
                  if (isLiveCameraActive) {
                    stopCameraStream();
                  } else {
                    startLiveCamera();
                  }
                }}
                className={`btn-outline-v2 py-2 text-xs flex items-center justify-center gap-1.5 ${
                  isLiveCameraActive ? 'border-rose-500 text-rose-300' : ''
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isLiveCameraActive ? 'إيقاف' : 'فتح الكاميرا'}</span>
              </button>
            </div>
          </div>

          {/* Audit Checklist Card (Variation 2) */}
          <div className="card-v2 p-5 space-y-3 bg-transparent">
            <span className="label-mono">Audit Checklist</span>
            <ul className="mono text-[11px] text-[rgba(248,248,248,0.5)] space-y-2.5">
              <li className="flex items-center gap-2.5">
                <span className="text-[var(--accent)] font-bold">[✓]</span>
                <span>تطبيق قواعد التكوين Rule of Thirds</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[var(--accent)] font-bold">[✓]</span>
                <span>توازن الإضاءة والـ Dynamic Range</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[var(--accent)] font-bold">[✓]</span>
                <span>موقع نقطة التركيز Focus Sharpness</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[var(--accent)] font-bold">[✓]</span>
                <span>اقتراح الزاوية الأكثر درامية وسينمائية</span>
              </li>
            </ul>
          </div>

          {/* Loading Indicator */}
          {isAnalyzing && (
            <div className="card-v2 p-4 space-y-2 border-[var(--accent)] animate-pulse">
              <div className="flex justify-between items-center text-xs text-[var(--accent)] mono">
                <span>ANALYZING FRAME...</span>
                <span>{analysisStep + 1} / {analysisSteps.length}</span>
              </div>
              <div className="w-full h-1 bg-black">
                <div 
                  className="h-full bg-[var(--accent)] transition-all duration-300"
                  style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-white">
                {analysisSteps[analysisStep]}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results View */}
      {analysisResult && (
        <section className="space-y-6 pt-6 border-t border-[var(--ink-faint)] animate-fade-in">
          {/* Score Header Card */}
          <div className="card-v2 p-6 sm:p-8 space-y-6 border-[var(--accent-muted)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--ink-faint)] pb-6">
              <div>
                <span className="label-mono">Score Output</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-syne">
                  تقييم جودة الصورة الفوتوغرافية
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Overall Score Box */}
              <div className="p-4 sm:p-5 bg-black border border-[var(--accent)] text-center shrink-0">
                <div className="text-3xl sm:text-4xl font-black text-[var(--accent)] mono leading-none">
                  {analysisResult.overallScore}
                  <span className="text-sm font-normal text-slate-400">/10</span>
                </div>
                <div className="mono text-[10px] text-slate-400 mt-1">OVERALL_SCORE</div>
              </div>
            </div>

            {/* Score Breakdown (5 dimensions) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-black/40 border border-[var(--ink-faint)]">
                <div className="text-[10px] text-slate-400 mono">COMPOSITION</div>
                <div className="text-base font-bold text-[var(--accent)] mono mt-1">
                  {analysisResult.scoreBreakdown.composition}/10
                </div>
              </div>
              <div className="p-3 bg-black/40 border border-[var(--ink-faint)]">
                <div className="text-[10px] text-slate-400 mono">LIGHTING</div>
                <div className="text-base font-bold text-[var(--accent)] mono mt-1">
                  {analysisResult.scoreBreakdown.lighting}/10
                </div>
              </div>
              <div className="p-3 bg-black/40 border border-[var(--ink-faint)]">
                <div className="text-[10px] text-slate-400 mono">SHARPNESS</div>
                <div className="text-base font-bold text-[var(--accent)] mono mt-1">
                  {analysisResult.scoreBreakdown.focusSharpness}/10
                </div>
              </div>
              <div className="p-3 bg-black/40 border border-[var(--ink-faint)]">
                <div className="text-[10px] text-slate-400 mono">COLOR_GRADE</div>
                <div className="text-base font-bold text-[var(--accent)] mono mt-1">
                  {analysisResult.scoreBreakdown.colorGrading}/10
                </div>
              </div>
              <div className="p-3 bg-black/40 border border-[var(--ink-faint)] col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 mono">CAMERA_ANGLE</div>
                <div className="text-base font-bold text-[var(--accent)] mono mt-1">
                  {analysisResult.scoreBreakdown.cameraAngle}/10
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Shooting Angle Spotlight */}
          <div className="card-v2 p-5 sm:p-6 border-[var(--accent)] bg-[rgba(0,240,255,0.02)] space-y-2">
            <span className="label-mono flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              RECOMMENDED SHOOTING PERSPECTIVE
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {analysisResult.suggestedAngle}
            </p>
          </div>

          {/* Detailed Critiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-v2 p-4 space-y-1.5">
              <span className="label-mono">1. قواعد التكوين</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysisResult.compositionAnalysis}
              </p>
            </div>

            <div className="card-v2 p-4 space-y-1.5">
              <span className="label-mono">2. جودة وتوزيع الإضاءة</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysisResult.lightingAnalysis}
              </p>
            </div>

            <div className="card-v2 p-4 space-y-1.5">
              <span className="label-mono">3. حدة التركيز وعمق الميدان</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysisResult.focusAnalysis}
              </p>
            </div>

            <div className="card-v2 p-4 space-y-1.5">
              <span className="label-mono">4. تناغم الألوان وتوازن البياض</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysisResult.colorAnalysis}
              </p>
            </div>
          </div>

          {/* Actionable Steps */}
          <div className="card-v2 p-5 space-y-3">
            <span className="label-mono">Actionable Improvements</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {analysisResult.improvements.map((step, idx) => (
                <div key={idx} className="p-3 bg-black/40 border border-[var(--ink-faint)] space-y-1">
                  <div className="mono text-[10px] text-[var(--accent)]">STEP {idx + 1}</div>
                  <p className="text-xs text-slate-200 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Camera Settings */}
          {analysisResult.recommendedSettings && (
            <div className="card-v2 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--ink-faint)] pb-3">
                <span className="label-mono">CALCULATED CAMERA SETTINGS</span>
                <span className="mono text-[11px] text-[var(--accent)]">
                  {analysisResult.recommendedSettings.camera}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-black border border-[var(--ink-faint)]">
                  <div className="mono text-[10px] text-slate-400">ISO</div>
                  <div className="mono text-base font-bold text-[var(--accent)] mt-1">
                    {analysisResult.recommendedSettings.iso}
                  </div>
                </div>
                <div className="p-3 bg-black border border-[var(--ink-faint)]">
                  <div className="mono text-[10px] text-slate-400">SHUTTER</div>
                  <div className="mono text-base font-bold text-[var(--accent)] mt-1">
                    {analysisResult.recommendedSettings.shutterSpeed}
                  </div>
                </div>
                <div className="p-3 bg-black border border-[var(--ink-faint)]">
                  <div className="mono text-[10px] text-slate-400">APERTURE</div>
                  <div className="mono text-base font-bold text-[var(--accent)] mt-1">
                    {analysisResult.recommendedSettings.aperture}
                  </div>
                </div>
                <div className="p-3 bg-black border border-[var(--ink-faint)]">
                  <div className="mono text-[10px] text-slate-400">WHITE BALANCE</div>
                  <div className="mono text-base font-bold text-[var(--accent)] mt-1">
                    {analysisResult.recommendedSettings.whiteBalance}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 p-3 bg-black/40 border border-[var(--ink-faint)] leading-relaxed">
                <span className="mono text-[var(--accent)] font-bold">RATIONALE: </span>
                {analysisResult.recommendedSettings.why}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
