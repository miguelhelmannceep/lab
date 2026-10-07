import React, { useState } from 'react';
import { TypographySettings, FontPairing } from '../types';
import { FONTS, FONT_PAIRINGS } from '../data/fonts';
import { X, Sliders, Type, RotateCcw, Check, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  typography: TypographySettings;
  onChange: (typo: TypographySettings) => void;
  onApplyPairing: (pairing: FontPairing) => void;
}

export const TypographyPanel: React.FC<Props> = ({
  isOpen,
  onClose,
  typography,
  onChange,
  onApplyPairing,
}) => {
  const [fontCategoryTab, setFontCategoryTab] = useState<'all' | 'sans' | 'serif' | 'display'>('all');
  const [activeTarget, setActiveTarget] = useState<'heading' | 'body'>('heading');

  if (!isOpen) return null;

  const filteredFonts = fontCategoryTab === 'all' 
    ? FONTS 
    : FONTS.filter(f => f.category === fontCategoryTab);

  const headingWeights = [400, 500, 600, 700, 800, 900];
  const bodyWeights = [300, 400, 500, 600, 700];

  const handleReset = () => {
    onChange({
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
      headingWeight: 700,
      bodyWeight: 400,
      headingScale: 1.0,
      bodyScale: 1.0,
      lineHeight: 1.25,
      letterSpacing: 0,
      headingTransform: 'none',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#0e1017] border-l border-white/10 text-zinc-100 h-full flex flex-col shadow-2xl z-10 overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Panel Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold tracking-wider uppercase text-zinc-100">
                TYPE SYSTEM
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                Controle tipográfico cirúrgico &amp; pairings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors"
              title="Restaurar padrão"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* 1. Quick Pairing Presets */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                Combinações Tipográficas
              </span>
              <span className="text-[10px] font-mono text-amber-400">PRESETS DE ESTILO</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {FONT_PAIRINGS.map(p => {
                const isSelected = typography.headingFont === p.headingFont && typography.bodyFont === p.bodyFont;
                return (
                  <button
                    key={p.id}
                    onClick={() => onApplyPairing(p)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-bold text-amber-400/90">{p.style}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <div className="text-xs font-bold leading-tight truncate text-zinc-100">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-1 truncate">
                      {p.headingFont} + {p.bodyFont}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Target Switcher (Heading vs Body) */}
          <section className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                Seleção de Família
              </span>
              <div className="inline-flex p-0.5 rounded bg-zinc-900 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveTarget('heading')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTarget === 'heading'
                      ? 'bg-zinc-800 text-amber-400 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  TÍTULOS ({typography.headingFont})
                </button>
                <button
                  onClick={() => setActiveTarget('body')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTarget === 'body'
                      ? 'bg-zinc-800 text-amber-400 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  CORPO ({typography.bodyFont})
                </button>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 text-[11px] font-mono">
              {(['all', 'sans', 'serif', 'display'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFontCategoryTab(cat)}
                  className={`px-2.5 py-1 rounded border capitalize transition-colors ${
                    fontCategoryTab === cat
                      ? 'bg-white/10 border-white/20 text-white font-semibold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {cat === 'all' ? 'Todas' : cat === 'sans' ? 'Sans-serif' : cat === 'serif' ? 'Serif' : 'Display'}
                </button>
              ))}
            </div>

            {/* Font selector list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {filteredFonts.map(font => {
                const isSelected = activeTarget === 'heading' 
                  ? typography.headingFont === font.name 
                  : typography.bodyFont === font.name;
                return (
                  <button
                    key={font.id}
                    onClick={() => {
                      if (activeTarget === 'heading') {
                        onChange({ ...typography, headingFont: font.name });
                      } else {
                        onChange({ ...typography, bodyFont: font.name });
                      }
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/60 shadow-sm'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-100" style={{ fontFamily: font.name }}>
                        {font.name}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">{font.category}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">
                      {font.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. Weight Controls */}
          <section className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                Peso dos Títulos (Heading Weight)
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">{typography.headingWeight}</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {headingWeights.map(w => (
                <button
                  key={w}
                  onClick={() => onChange({ ...typography, headingWeight: w })}
                  className={`py-1.5 rounded text-xs font-mono font-bold transition-all ${
                    typography.headingWeight === w
                      ? 'bg-amber-500 text-zinc-950 font-black'
                      : 'bg-white/[0.04] text-zinc-300 border border-white/[0.06] hover:bg-white/[0.08]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                Peso do Corpo (Body Weight)
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">{typography.bodyWeight}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {bodyWeights.map(w => (
                <button
                  key={w}
                  onClick={() => onChange({ ...typography, bodyWeight: w })}
                  className={`py-1.5 rounded text-xs font-mono font-bold transition-all ${
                    typography.bodyWeight === w
                      ? 'bg-amber-500 text-zinc-950 font-black'
                      : 'bg-white/[0.04] text-zinc-300 border border-white/[0.06] hover:bg-white/[0.08]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </section>

          {/* 4. Sliders: Scale, Spacing, Line Height */}
          <section className="space-y-4 pt-3 border-t border-white/10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 block">
              Ajustes de Escala &amp; Micro-Tipografia
            </span>

            {/* Heading Size Multiplier */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Escala Títulos (Heading Size)</span>
                <span className="text-amber-400 font-bold">{typography.headingScale.toFixed(2)}x</span>
              </div>
              <input 
                type="range"
                min="0.8"
                max="1.4"
                step="0.05"
                value={typography.headingScale}
                onChange={e => onChange({ ...typography, headingScale: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 bg-zinc-800"
              />
            </div>

            {/* Line Height */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Altura de Linha (Line Height)</span>
                <span className="text-amber-400 font-bold">{typography.lineHeight.toFixed(2)}</span>
              </div>
              <input 
                type="range"
                min="0.95"
                max="1.7"
                step="0.05"
                value={typography.lineHeight}
                onChange={e => onChange({ ...typography, lineHeight: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 bg-zinc-800"
              />
            </div>

            {/* Letter Spacing */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Espaçamento entre Letras (Tracking)</span>
                <span className="text-amber-400 font-bold">{typography.letterSpacing.toFixed(3)}em</span>
              </div>
              <input 
                type="range"
                min="-0.06"
                max="0.12"
                step="0.01"
                value={typography.letterSpacing}
                onChange={e => onChange({ ...typography, letterSpacing: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 bg-zinc-800"
              />
            </div>

            {/* Heading Transform */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Transformação Título</span>
                <span className="text-amber-400 font-bold uppercase">{typography.headingTransform}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'uppercase', 'capitalize'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => onChange({ ...typography, headingTransform: t })}
                    className={`py-1.5 rounded text-xs font-mono capitalize transition-all ${
                      typography.headingTransform === t
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : 'bg-white/[0.03] text-zinc-300 border border-white/[0.06]'
                    }`}
                  >
                    {t === 'none' ? 'Normal' : t}
                  </button>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>{typography.headingFont} + {typography.bodyFont}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
          >
            Aplicar &amp; Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
