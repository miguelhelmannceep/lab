import React from 'react';
import { ProjectCategory, LabTab } from '../types';
import { PROJECTS } from '../data/projects';
import { Palette, Type, SplitSquareVertical, Sun, Moon, Sparkles, Heart, Layers, Compass } from 'lucide-react';

interface HeaderProps {
  currentProject: ProjectCategory;
  onSelectProject: (p: ProjectCategory) => void;
  activeTab: LabTab;
  onSelectTab: (t: LabTab) => void;
  isColorOpen: boolean;
  onToggleColor: () => void;
  isTypeOpen: boolean;
  onToggleType: () => void;
  isPresetsOpen: boolean;
  onTogglePresets: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  savedTotalCount: number;
  compareCount: number;
  onOpenCompare: () => void;
  currentColorHex: string;
  currentHeadingFont: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentProject,
  onSelectProject,
  activeTab,
  onSelectTab,
  isColorOpen,
  onToggleColor,
  isTypeOpen,
  onToggleType,
  isPresetsOpen,
  onTogglePresets,
  isDarkMode,
  onToggleTheme,
  savedTotalCount,
  compareCount,
  onOpenCompare,
  currentColorHex,
  currentHeadingFont,
}) => {
  const categories: ProjectCategory[] = ['restaurante', 'barbearia', 'academia', 'escritorio', 'ecommerce'];

  const mainTabs: { id: LabTab; label: string; badge?: number }[] = [
    { id: 'projects', label: 'PROJECTS' },
    { id: 'type', label: 'TYPE' },
    { id: 'color', label: 'COLOR' },
    { id: 'combos', label: 'COMBOS' },
    { id: 'saved', label: 'SAVED', badge: savedTotalCount },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090a0f]/95 dark:bg-[#090a0f]/95 backdrop-blur-md border-b border-white/[0.08] text-zinc-100 transition-colors">
      
      {/* 1. Main Navigation Header */}
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => onSelectTab('projects')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-black text-xs text-amber-400 shadow-inner group-hover:border-amber-500/50 transition-colors">
              T&amp;C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-widest text-zinc-100 uppercase group-hover:text-amber-400 transition-colors">
                  TYPE &amp; COLOR LAB
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-white/5 border border-white/10 text-zinc-400">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono tracking-wider hidden md:block">
                Visual Direction &amp; Decision Tool
              </div>
            </div>
          </div>
        </div>

        {/* Center: Main Primary Tabs (PROJECTS | TYPE | COLOR | COMBOS | SAVED) */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 px-1 bg-white/[0.03] border border-white/[0.06] rounded-xl max-w-full">
          {mainTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'text-zinc-950 bg-amber-400 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-950 mr-0.5" />
                )}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                    isActive ? 'bg-zinc-950 text-amber-400' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Controls, Compare trigger, Theme */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
              compareCount > 0
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                : 'bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 border-white/[0.08]'
            }`}
            title="Comparar opções selecionadas (até 3)"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">COMPARE</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
              compareCount > 0 ? 'bg-indigo-500 text-white' : 'bg-white/10 text-zinc-400'
            }`}>
              {compareCount}/3
            </span>
          </button>

          {/* Cores Drawer Button */}
          <button
            onClick={onToggleColor}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
              isColorOpen
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                : 'bg-white/[0.03] hover:bg-white/[0.06] text-zinc-200 border-white/[0.08]'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-sm shrink-0"
              style={{ backgroundColor: currentColorHex }}
            />
            <span>CORES</span>
          </button>

          {/* Tipografia Drawer Button */}
          <button
            onClick={onToggleType}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
              isTypeOpen
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                : 'bg-white/[0.03] hover:bg-white/[0.06] text-zinc-200 border-white/[0.08]'
            }`}
          >
            <Type className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>TIPO</span>
          </button>

          {/* Light/Dark Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Alternar tema claro/escuro"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Sub-Bar: Contextual Actions based on Active Tab */}
      <div className="bg-[#0e1017]/95 border-t border-white/[0.04] px-4 lg:px-8 h-10 flex items-center justify-between text-xs font-mono overflow-x-auto">
        {activeTab === 'projects' ? (
          /* Projects Switcher Sub-Bar */
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-zinc-500 text-[10px] uppercase font-bold mr-1">NICHO:</span>
            {categories.map((cat) => {
              const isActive = currentProject === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectProject(cat)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/40'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                  }`}
                >
                  {PROJECTS[cat].name}
                </button>
              );
            })}
          </div>
        ) : activeTab === 'type' ? (
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="text-amber-400 font-bold">TYPE LIBRARY &amp; PAIRINGS</span>
            <span className="text-zinc-600">•</span>
            <span>Emparelhamentos com alto contraste e harmonia</span>
          </div>
        ) : activeTab === 'color' ? (
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="text-amber-400 font-bold">COLOR PALETTES &amp; PREVIEWS</span>
            <span className="text-zinc-600">•</span>
            <span>Paletas testadas diretamente em interfaces de demonstração</span>
          </div>
        ) : activeTab === 'combos' ? (
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="text-amber-400 font-bold">POPULAR COMBINATIONS &amp; RECOMMENDATIONS</span>
            <span className="text-zinc-600">•</span>
            <span>Combinações que funcionam na prática</span>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="text-amber-400 font-bold">MY SAVED FAVORITES</span>
            <span className="text-zinc-600">•</span>
            <span>{savedTotalCount} seleções guardadas</span>
          </div>
        )}

        {/* Live Token status indicator */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-zinc-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">HEADING:</span>
            <span className="text-zinc-200 font-medium">{currentHeadingFont}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">PRIMARY:</span>
            <span className="text-zinc-200 font-mono font-medium">{currentColorHex}</span>
          </div>
        </div>
      </div>

    </header>
  );
};
