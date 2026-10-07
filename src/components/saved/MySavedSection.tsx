import React, { useState } from 'react';
import { DesignSystemCombo, TypePairing, ColorPaletteReference } from '../../types';
import { TypePairingCard } from '../combos/TypePairingCard';
import { ColorPaletteCard } from '../combos/ColorPaletteCard';
import { Heart, Trash2, ArrowRight, Layers, BookmarkCheck, Sparkles } from 'lucide-react';

interface Props {
  savedCombos: DesignSystemCombo[];
  savedPairings: TypePairing[];
  savedPalettes: ColorPaletteReference[];
  onApplyCombo: (combo: DesignSystemCombo) => void;
  onApplyPairing: (pairing: TypePairing) => void;
  onApplyPalette: (palette: ColorPaletteReference) => void;
  onRemoveCombo: (id: string) => void;
  onRemovePairing: (id: string) => void;
  onRemovePalette: (id: string) => void;
  onClearAll: () => void;
  onOpenCompare: () => void;
  compareCount: number;
}

export const MySavedSection: React.FC<Props> = ({
  savedCombos,
  savedPairings,
  savedPalettes,
  onApplyCombo,
  onApplyPairing,
  onApplyPalette,
  onRemoveCombo,
  onRemovePairing,
  onRemovePalette,
  onClearAll,
  onOpenCompare,
  compareCount,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'combos' | 'pairings' | 'palettes'>('all');

  const totalSaved = savedCombos.length + savedPairings.length + savedPalettes.length;

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
              FAVORITES / SAVED
            </span>
            <span className="text-xs font-mono text-zinc-500">ARMAZENADO NO LOCALSTORAGE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-mono">
            MY SAVED
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-mono">
            Coleção privada com as melhores direções visuais salvas durante suas explorações.
          </p>
        </div>

        {/* Global actions: Clear all & Compare */}
        <div className="flex items-center gap-3">
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Abrir Comparador ({compareCount}/3)</span>
            </button>
          )}

          {totalSaved > 0 && (
            <button
              onClick={onClearAll}
              className="px-3 py-2 rounded-xl border border-white/10 hover:border-rose-500/40 text-xs font-mono text-zinc-400 hover:text-rose-400 transition-colors flex items-center gap-1.5"
              title="Limpar todos os salvos"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Tudo</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'all'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white bg-white/[0.02]'
          }`}
        >
          TODOS ({totalSaved})
        </button>
        <button
          onClick={() => setActiveTab('combos')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'combos'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white bg-white/[0.02]'
          }`}
        >
          COMBOS COMPLETOS ({savedCombos.length})
        </button>
        <button
          onClick={() => setActiveTab('pairings')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'pairings'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white bg-white/[0.02]'
          }`}
        >
          PARES TIPOGRÁFICOS ({savedPairings.length})
        </button>
        <button
          onClick={() => setActiveTab('palettes')}
          className={`px-4 py-1.5 rounded-lg transition-all ${
            activeTab === 'palettes'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white bg-white/[0.02]'
          }`}
        >
          PALETAS DE CORES ({savedPalettes.length})
        </button>
      </div>

      {totalSaved === 0 ? (
        <div className="p-16 text-center border border-dashed border-white/15 rounded-2xl space-y-3">
          <Heart className="w-10 h-10 text-zinc-600 mx-auto" />
          <h4 className="text-base font-mono font-bold text-zinc-300">Você ainda não salvou nenhum item</h4>
          <p className="text-xs text-zinc-500 font-mono max-w-sm mx-auto">
            Navegue pelas abas COMBOS, TYPE ou COLOR e clique no botão ♡ SAVE para guardar suas escolhas favoritas nesta bancada.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* Saved Combos */}
          {(activeTab === 'all' || activeTab === 'combos') && savedCombos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400">
                  Combos Completos Salvos ({savedCombos.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedCombos.map(combo => (
                  <div
                    key={combo.id}
                    className="rounded-2xl border border-white/10 bg-[#0e1017] p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                          {combo.style}
                        </span>
                        <h4 className="text-base font-bold font-mono text-white">{combo.name}</h4>
                        <div className="text-xs text-zinc-400 font-mono mt-0.5">
                          {combo.headingFont} + {combo.bodyFont}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveCombo(combo.id)}
                        className="p-1.5 rounded hover:bg-white/10 text-rose-400 transition-colors"
                        title="Remover dos favoritos"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Color bar */}
                    <div className="flex h-3 rounded overflow-hidden border border-white/10">
                      <div className="flex-1" style={{ backgroundColor: combo.tokens.background }} />
                      <div className="flex-1" style={{ backgroundColor: combo.tokens.surface }} />
                      <div className="flex-1" style={{ backgroundColor: combo.tokens.primary }} />
                      <div className="flex-1" style={{ backgroundColor: combo.tokens.accent }} />
                    </div>

                    <button
                      onClick={() => onApplyCombo(combo)}
                      className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 shadow-md"
                    >
                      <span>APLICAR ESTE COMBO NO LAB</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Pairings */}
          {(activeTab === 'all' || activeTab === 'pairings') && savedPairings.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400">
                  Pares Tipográficos Salvos ({savedPairings.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedPairings.map(pairing => (
                  <TypePairingCard
                    key={pairing.id}
                    pairing={pairing}
                    onApply={onApplyPairing}
                    onView={() => {}}
                    isSaved={true}
                    onToggleSave={() => onRemovePairing(pairing.id)}
                    isCompareSelected={false}
                    onToggleCompare={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Saved Palettes */}
          {(activeTab === 'all' || activeTab === 'palettes') && savedPalettes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400">
                  Paletas Salvas ({savedPalettes.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedPalettes.map(palette => (
                  <ColorPaletteCard
                    key={palette.id}
                    palette={palette}
                    onApply={onApplyPalette}
                    isSaved={true}
                    onToggleSave={() => onRemovePalette(palette.id)}
                    isCompareSelected={false}
                    onToggleCompare={() => {}}
                    onCopyHex={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
