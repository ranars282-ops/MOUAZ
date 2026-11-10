import React from 'react';
import { Sparkles, Menu, X, Zap } from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onQuickUploadClick: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onQuickUploadClick,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <header className="px-4 sm:px-8 py-3.5 border-b border-[var(--ink-faint)] bg-[#0c0c0e] sticky top-0 z-40 flex items-center justify-between">
      {/* Brand: S square logo + SHOT MASTER AI */}
      <div 
        onClick={() => setActiveTab('dashboard')} 
        className="flex items-center gap-3 cursor-pointer select-none group"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--accent)] flex items-center justify-center font-black text-[#0c0c0e] font-syne text-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
          S
        </div>
        <div>
          <div className="mono font-bold text-sm sm:text-base tracking-wider text-white">
            SHOT MASTER <span className="text-[var(--accent)]">AI</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono hidden sm:block -mt-1 tracking-tight">
            PRO CINEMATOGRAPHY ENGINE
          </div>
        </div>
      </div>

      {/* Telemetry info (Space Mono) */}
      <div className="mono text-[11px] hidden md:flex items-center gap-6 text-slate-400">
        <span className="hidden lg:inline">SYS_VER: 3.8.F</span>
        <span>AUTH: PRO_USER</span>
        <span className="text-[var(--accent)] flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          LIVE_SYNC
        </span>
      </div>

      {/* Quick Action & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onQuickUploadClick}
          className="btn-v2 pulse-accent px-3 sm:px-4 py-1.5 text-xs flex items-center gap-1.5 font-bold cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>تحليل صورة</span>
        </button>

        {setMobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white border border-[var(--ink-faint)] rounded-sm"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}
      </div>
    </header>
  );
};
