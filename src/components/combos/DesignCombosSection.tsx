import React, { useState } from 'react';
import { DesignSystemCombo, DesignNiche } from '../../types';
import { DESIGN_SYSTEM_COMBOS } from '../../data/designCombos';
import { NICHE_RECOMMENDATIONS } from '../../data/niches';
import { Sparkles, Heart, ArrowRight, Layers, Compass, Check, HelpCircle } from 'lucide-react';

interface Props {
  onApplyCombo: (combo: DesignSystemCombo) => void;
  savedComboIds: string[];
  onToggleSaveCombo: (combo: DesignSystemCombo) => void;
  compareComboIds: string[];
  onToggleCompareCombo: (combo: DesignSystemCombo) => void;
}

export const DesignCombosSection: React.FC<Props> = ({
  onApplyCombo,
  savedComboIds,
  onToggleSaveCombo,
  compareComboIds,
  onToggleCompareCombo,
}) => {
  const [selectedNiche, setSelectedNiche] = useState<DesignNiche | null>('Restaurant');

  const niches: DesignNiche[] = [
    'Restaurant',
    'Barber',
    'Gym',
    'Law Firm',
    'Architecture',
    'SaaS',
    'E-commerce',
    'Portfolio',
    'Agency',
    'Fashion',
    'Photography',
    'Personal Brand'
  ];

  // If a niche is selected, filter recommended combos
  const currentRecommendation = selectedNiche ? NICHE_RECOMMENDATIONS[selectedNiche] : null;

  const displayedCombos = currentRecommendation
    ? DESIGN_SYSTEM_COMBOS.filter(c => currentRecommendation.comboIds.includes(c.id))
    : DESIGN_SYSTEM_COMBOS;

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8 py-8 space-y-12 animate-in fade-in duration-300">
      
      {/* 1. Main Header of the Concept */}
      <div className="border-b border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
            SYSTEM / COMBOS
          </span>
          <span className="text-xs font-mono text-zinc-500">DIREÇÕES COMPLETAS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-mono">
          POPULAR COMBINATIONS
        </h1>

        <div className="text-lg sm:text-xl font-medium text-amber-400 font-mono">
          Combinações que funcionam.
        </div>

        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Explore pares tipográficos e paletas de cores utilizados em diferentes estilos de design, marcas e interfaces digitais. Uma biblioteca de referências atemporais para acelerar e fundamentar sua decisão visual.
        </p>
      </div>

      {/* 2. "WHAT ARE YOU DESIGNING?" Interactive Recommendation Tool */}
      <section className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-[#12141e] to-[#0c0e14] space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-100">
                WHAT ARE YOU DESIGNING?
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Selecione o tipo de negócio para ver recomendações sob medida
              </p>
            </div>
          </div>

          {selectedNiche && (
            <button
              onClick={() => setSelectedNiche(null)}
              className="text-xs font-mono text-zinc-400 hover:text-white underline self-start sm:self-auto"
            >
              Ver todas as combinações
            </button>
          )}
        </div>

        {/* Niche Pills Selector */}
        <div className="flex flex-wrap gap-2">
          {niches.map(niche => {
            const isSelected = selectedNiche === niche;
            return (
              <button
                key={niche}
                onClick={() => setSelectedNiche(isSelected ? null : niche)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md font-bold'
                    : 'bg-white/[0.02] border-white/[0.06] text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {niche}
              </button>
            );
          })}
        </div>

        {/* Recommendation Context Banner */}
        {currentRecommendation && (
          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                RECOMMENDED FOR YOU:
              </span>
              <span className="text-zinc-300">{currentRecommendation.description}</span>
            </div>
            <span className="text-zinc-500 shrink-0">
              {displayedCombos.length} direções sugeridas
            </span>
          </div>
        )}
      </section>

      {/* 3. Grid of Design System Combos Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
            {selectedNiche ? `COMBINAÇÕES RECOMENDADAS PARA ${selectedNiche.toUpperCase()}` : 'TODAS AS COMBINAÇÕES RECONHECIDAS'}
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            {displayedCombos.length} COMBOS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedCombos.map(combo => {
            const isSaved = savedComboIds.includes(combo.id);
            const isCompareSelected = compareComboIds.includes(combo.id);
            const { tokens } = combo;

            return (
              <div
                key={combo.id}
                className="group rounded-2xl border border-white/10 bg-[#0e1017] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl"
              >
                {/* Combo Card Header */}
                <div className="p-5 border-b border-white/[0.06] bg-zinc-950/40">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                          {combo.style}
                        </span>
                        {combo.badge && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-300">
                            {combo.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-mono text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {combo.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5 line-clamp-1">
                        {combo.tagline}
                      </p>
                    </div>

                    {/* Quick Action Buttons (Favorite & Compare) */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onToggleCompareCombo(combo)}
                        className={`p-2 rounded-lg text-xs font-mono transition-colors border ${
                          isCompareSelected
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
                        }`}
                        title={isCompareSelected ? 'Remover da comparação' : 'Comparar até 3 opções'}
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleSaveCombo(combo)}
                        className={`p-2 rounded-lg transition-colors border ${
                          isSaved
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-rose-400 hover:bg-white/[0.06]'
                        }`}
                        title={isSaved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Font Specs and Color Swatches Preview */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">TIPOGRAFIA</span>
                      <div className="text-zinc-200 font-semibold truncate">{combo.headingFont}</div>
                      <div className="text-zinc-400 text-[11px] truncate">+ {combo.bodyFont}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">PALETA</span>
                      <div className="flex h-4 rounded overflow-hidden border border-white/10 mt-1 mb-1">
                        <div className="flex-1" style={{ backgroundColor: tokens.background }} />
                        <div className="flex-1" style={{ backgroundColor: tokens.surface }} />
                        <div className="flex-1" style={{ backgroundColor: tokens.primary }} />
                        <div className="flex-1" style={{ backgroundColor: tokens.accent }} />
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">
                        {combo.colorNames.join(' • ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Mini Interface Rendering */}
                <div className="p-4 bg-zinc-950/60 flex-1 flex flex-col justify-center border-b border-white/[0.06]">
                  <div 
                    className="rounded-xl p-4 border transition-all duration-300 shadow-inner space-y-3 select-none"
                    style={{ 
                      backgroundColor: tokens.background,
                      borderColor: tokens.border,
                      color: tokens.text,
                    }}
                  >
                    {/* Header */}
                    <div 
                      className="flex items-center justify-between pb-2 border-b text-[10px]"
                      style={{ borderColor: tokens.border, fontFamily: `"${combo.bodyFont}", sans-serif` }}
                    >
                      <span className="font-bold tracking-wider" style={{ color: tokens.text }}>
                        ESTÚDIO DEMO
                      </span>
                      <span style={{ color: tokens.muted }}>Online 2026</span>
                    </div>

                    {/* Headline */}
                    <div 
                      className="text-xl sm:text-2xl font-bold leading-tight"
                      style={{ 
                        fontFamily: `"${combo.headingFont}", sans-serif`,
                        fontWeight: combo.headingWeight,
                        letterSpacing: `${combo.letterSpacing}em`,
                        lineHeight: combo.lineHeight,
                        color: tokens.text,
                      }}
                    >
                      Design with timeless clarity.
                    </div>

                    <p 
                      className="text-[11px] leading-relaxed line-clamp-2"
                      style={{ 
                        fontFamily: `"${combo.bodyFont}", sans-serif`,
                        fontWeight: combo.bodyWeight,
                        color: tokens.muted,
                      }}
                    >
                      Real design tokens operating in seamless harmony across typography, depth and intent.
                    </p>

                    {/* CTA Button */}
                    <div className="pt-1 flex items-center justify-between">
                      <button
                        className="px-3.5 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider"
                        style={{ 
                          fontFamily: `"${combo.bodyFont}", sans-serif`,
                          backgroundColor: tokens.primary,
                          color: tokens.background,
                        }}
                      >
                        Action CTA
                      </button>
                      <span 
                        className="text-[10px] font-semibold"
                        style={{ fontFamily: `"${combo.bodyFont}", sans-serif`, color: tokens.accent }}
                      >
                        Learn More →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Best For (Ideal para) Section */}
                <div className="p-4 bg-zinc-950/80 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                      Ideal para:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {combo.bestFor.map((item, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* USE COMBO Button */}
                  <button
                    onClick={() => onApplyCombo(combo)}
                    className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    <span>USE COMBO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
