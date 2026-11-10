import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Sliders, 
  Film, 
  SunMedium, 
  Grid, 
  X, 
  ListOrdered, 
  Lightbulb, 
  BookOpen, 
  User 
} from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'dashboard' as TabType, label: 'الرئيسية', icon: Home },
    { id: 'coach' as TabType, label: 'مدرب AI', icon: Sparkles, highlight: true },
    { id: 'settings' as TabType, label: 'الإعدادات', icon: Sliders },
    { id: 'shots' as TabType, label: 'اللقطات', icon: Film },
    { id: 'lighting' as TabType, label: 'الإضاءة', icon: SunMedium },
  ];

  const moreTabs = [
    { id: 'ideas' as TabType, label: 'أفكار الجلسات', icon: Lightbulb, desc: 'مودبورد وأفكار إبداعية' },
    { id: 'shotlist' as TabType, label: 'جدول اللقطات', icon: ListOrdered, desc: 'توليد كول شيت وتخطيط المشاهد' },
    { id: 'learning' as TabType, label: 'مركز التعلم', icon: BookOpen, desc: 'دروس واختبارات فوتوغرافية' },
    { id: 'profile' as TabType, label: 'حقيبة المعدات', icon: User, desc: 'معداتك والمحفوظات' },
  ];

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    setShowMoreMenu(false);
  };

  const isMoreActive = ['ideas', 'shotlist', 'learning', 'profile'].includes(activeTab);

  return (
    <>
      {/* More Options Modal / Bottom Sheet */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end lg:hidden animate-fade-in"
          onClick={() => setShowMoreMenu(false)}
        >
          <div 
            className="bg-[#0e1015] border-t border-[var(--ink-faint)] rounded-t-2xl p-5 pb-8 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--ink-faint)] mb-4">
              <span className="label-mono">Studio Modules</span>
              <button 
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-sm text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {moreTabs.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`p-3.5 card-v2 text-right transition-all flex flex-col gap-2 ${
                      active
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-[rgba(0,240,255,0.06)]'
                        : 'text-slate-300 hover:border-[var(--accent)]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon className={`w-4 h-4 ${active ? 'text-[var(--accent)]' : 'text-slate-400'}`} />
                      {active && <span className="mono text-[10px] text-[var(--accent)] font-bold">●</span>}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-t border-[var(--ink-faint)] px-2 py-1.5">
        <div className="flex items-center justify-around">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 transition-all relative ${
                  active 
                    ? 'text-[var(--accent)] font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.highlight && active && (
                  <span className="absolute -top-1 w-6 h-0.5 bg-[var(--accent)] shadow-[0_0_8px_#00f0ff] animate-pulse" />
                )}
                <div className={`p-1 transition-all ${active ? 'text-[var(--accent)]' : 'text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono tracking-tight">{tab.label}</span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all ${
              isMoreActive ? 'text-[var(--accent)] font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="p-1">
              <Grid className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-mono tracking-tight">المزيد</span>
          </button>
        </div>
      </div>
    </>
  );
};
