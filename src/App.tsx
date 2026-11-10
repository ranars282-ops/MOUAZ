/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { PhotoCoach } from './components/PhotoCoach';
import { CameraSettingsAssistant } from './components/CameraSettingsAssistant';
import { CinematicShots } from './components/CinematicShots';
import { LightingStudio } from './components/LightingStudio';
import { PhotoshootIdeas } from './components/PhotoshootIdeas';
import { ShotListGenerator } from './components/ShotListGenerator';
import { LearningCenter } from './components/LearningCenter';
import { GearProfile } from './components/GearProfile';
import { 
  Home, 
  Sparkles, 
  Sliders, 
  Film, 
  SunMedium, 
  Lightbulb, 
  ListOrdered, 
  BookOpen, 
  User,
  X
} from 'lucide-react';
import { CinematicShotItem, PhotoshootConcept } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('coach');
  const [selectedSceneConditionId, setSelectedSceneConditionId] = useState<string>('daylight');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shotListInitialData, setShotListInitialData] = useState<any>(null);

  const handleSelectSceneCondition = (conditionId: string) => {
    setSelectedSceneConditionId(conditionId);
    setActiveTab('settings');
  };

  const handleSelectShotForPlan = (shot: CinematicShotItem) => {
    setShotListInitialData({
      shotToAdd: {
        id: `shot-${Date.now()}`,
        sceneNumber: '1',
        shotNumber: shot.abbreviation,
        shotType: `${shot.nameAr} (${shot.nameEn})`,
        angle: shot.type === 'angle' ? shot.nameAr : 'Eye Level',
        movement: shot.type === 'movement' ? shot.nameAr : 'Static',
        focalLength: shot.focalLength,
        fps: shot.fps,
        lighting: 'Key Light + Accent',
        actionDescription: shot.description,
        directorNote: shot.proTip,
      }
    });
    setActiveTab('shotlist');
  };

  const handleUseConceptForShotList = (concept: PhotoshootConcept) => {
    setShotListInitialData({
      title: concept.conceptTitle,
      synopsis: `${concept.logline} - الأسلوب: ${concept.moodAndAesthetics}`,
      visualTone: `طابع ألوان: ${concept.colorPalette.join(', ')} - كاميرا: ${concept.cameraAndLens}`,
    });
    setActiveTab('shotlist');
  };

  const navLinks = [
    { id: 'dashboard' as TabType, label: 'الرئيسية', icon: Home },
    { id: 'coach' as TabType, label: 'مدرب AI', icon: Sparkles },
    { id: 'settings' as TabType, label: 'حاسبة الكاميرا', icon: Sliders },
    { id: 'shots' as TabType, label: 'اللقطات السينمائية', icon: Film },
    { id: 'lighting' as TabType, label: 'استوديو الإضاءة', icon: SunMedium },
    { id: 'ideas' as TabType, label: 'أفكار الجلسات', icon: Lightbulb },
    { id: 'shotlist' as TabType, label: 'جدول اللقطات', icon: ListOrdered },
    { id: 'learning' as TabType, label: 'مركز التعلم', icon: BookOpen },
    { id: 'profile' as TabType, label: 'حقيبة المعدات', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f8f8f8] flex flex-col selection:bg-[var(--accent)] selection:text-[#0c0c0e]">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onQuickUploadClick={() => setActiveTab('coach')}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main App Shell with Sidebar */}
      <div className="flex-1 flex w-full border-t border-[var(--ink-faint)] relative overflow-hidden">
        {/* Desktop Sidebar (Variation 2 style) */}
        <aside className="hidden lg:flex w-64 xl:w-72 flex-col justify-between p-6 border-l border-[var(--ink-faint)] bg-gradient-to-b from-[#111114] to-[#0c0c0e] shrink-0">
          <div className="space-y-6">
            <div>
              <span className="label-mono mb-3">Navigation</span>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeTab === link.id;
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => setActiveTab(link.id)}
                      className={`text-right px-3 py-2 text-xs sm:text-sm font-semibold rounded-sm transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'text-[var(--accent)] font-bold bg-[rgba(0,240,255,0.08)] border-r-2 border-[var(--accent)]'
                          : 'text-[rgba(248,248,248,0.6)] hover:text-white hover:bg-[rgba(248,248,248,0.03)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--accent)]' : 'text-slate-400'}`} />
                        <span>{link.label}</span>
                      </div>
                      {isActive && (
                        <span className="mono text-[10px] text-[var(--accent)] font-bold animate-pulse">●</span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar Bottom Analytics Card (Variation 2) */}
          <div className="card-v2 p-4 text-xs space-y-2 mt-8">
            <span className="label-mono">Analytics</span>
            <p className="text-[11px] text-[rgba(248,248,248,0.5)] leading-relaxed">
              يقوم محرك Gemini 3.8 Flash بفحص أدق عناصر التكوين والإضاءة وزوايا التصوير.
            </p>
          </div>
        </aside>

        {/* Mobile Slide-Over Drawer */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 lg:hidden flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="w-72 bg-[#0e1015] h-full p-6 flex flex-col justify-between border-l border-[var(--ink-faint)] animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--ink-faint)] mb-4">
                  <span className="label-mono">Navigation</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = activeTab === link.id;
                    const Icon = link.icon;
                    return (
                      <button
                        key={link.id}
                        onClick={() => {
                          setActiveTab(link.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-right px-3 py-2 text-sm font-semibold rounded-sm transition-all flex items-center justify-between ${
                          isActive
                            ? 'text-[var(--accent)] font-bold bg-[rgba(0,240,255,0.08)] border-r-2 border-[var(--accent)]'
                            : 'text-[rgba(248,248,248,0.6)] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--accent)]' : 'text-slate-400'}`} />
                          <span>{link.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="card-v2 p-3 text-[11px] text-slate-400">
                <span className="label-mono mb-1">Status</span>
                <span>SYS_VER: 3.8.F // AUTH: PRO_USER</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
          {activeTab === 'coach' && (
            <PhotoCoach />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard 
              setActiveTab={setActiveTab} 
              onSelectSceneCondition={handleSelectSceneCondition} 
            />
          )}

          {activeTab === 'settings' && (
            <CameraSettingsAssistant 
              initialSceneId={selectedSceneConditionId} 
            />
          )}

          {activeTab === 'shots' && (
            <CinematicShots 
              onSelectShotForPlan={handleSelectShotForPlan} 
            />
          )}

          {activeTab === 'lighting' && (
            <LightingStudio />
          )}

          {activeTab === 'ideas' && (
            <PhotoshootIdeas 
              onUseConceptForShotList={handleUseConceptForShotList} 
            />
          )}

          {activeTab === 'shotlist' && (
            <ShotListGenerator 
              initialData={shotListInitialData} 
            />
          )}

          {activeTab === 'learning' && (
            <LearningCenter />
          )}

          {activeTab === 'profile' && (
            <GearProfile />
          )}
        </main>
      </div>

      {/* Footer (Variation 2 design) */}
      <footer className="px-4 sm:px-8 py-3 border-t border-[var(--ink-faint)] bg-[#0c0c0e] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[rgba(248,248,248,0.5)]">
        <div className="mono font-semibold">
          © 2026 SHOT MASTER AI PRO
        </div>
        <div className="mono flex items-center gap-6">
          <span>SHUTTER: 180°</span>
          <span>FPS: 24.00</span>
          <span className="text-[var(--ink)] font-bold">STATUS: PRODUCTION READY</span>
        </div>
      </footer>

      {/* Mobile Floating Bottom Bar */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
}
