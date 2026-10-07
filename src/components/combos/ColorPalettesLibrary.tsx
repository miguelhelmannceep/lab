import React, { useState } from 'react';
import { ColorPaletteReference, PaletteCategoryRef } from '../../types';
import { REFERENCE_PALETTES } from '../../data/referencePalettes';
import { ColorPaletteCard } from './ColorPaletteCard';
import { Search, Palette, BookOpen } from 'lucide-react';

interface Props {
  onApplyPalette: (palette: ColorPaletteReference) => void;
  savedPaletteIds: string[];
  onToggleSavePalette: (palette: ColorPaletteReference) => void;
  comparePaletteIds: string[];
  onToggleComparePalette: (palette: ColorPaletteReference) => void;
  onCopyHex: (hex: string) => void;
}

export const ColorPalettesLibrary: React.FC<Props> = ({
  onApplyPalette,
  savedPaletteIds,
  onToggleSavePalette,
  comparePaletteIds,
  onToggleComparePalette,
  onCopyHex,
}) => {
  const [activeCategory, setActiveCategory] = useState<PaletteCategoryRef>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: PaletteCategoryRef[] = [
    'ALL',
    'MINIMAL',
    'MONOCHROME',
    'EARTHY',
    'WARM',
    'COOL',
    'LUXURY',
    'CORPORATE',
    'NATURAL',
    'VIBRANT',
    'DARK',
    'PASTEL',
  ];

  const filteredPalettes = REFERENCE_PALETTES.filter(p => {
    const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory || p.tags.includes(activeCategory);
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.bestFor.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.colorList.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Library Section Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              LIBRARY / 02
            </span>
            <span className="text-xs font-mono text-zinc-500">CURADORIA CROMÁTICA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-mono">
            COLOR PALETTES
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-mono">
            Paletas testadas e aplicadas diretamente a componentes reais para validação visual imediata.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar cor, tag ou nicho..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 font-mono outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-sm'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Palettes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPalettes.map(palette => (
          <ColorPaletteCard
            key={palette.id}
            palette={palette}
            onApply={onApplyPalette}
            isSaved={savedPaletteIds.includes(palette.id)}
            onToggleSave={onToggleSavePalette}
            isCompareSelected={comparePaletteIds.includes(palette.id)}
            onToggleCompare={onToggleComparePalette}
            onCopyHex={onCopyHex}
          />
        ))}
      </div>

      {filteredPalettes.length === 0 && (
        <div className="p-12 text-center border border-dashed border-white/15 rounded-2xl space-y-2">
          <Palette className="w-8 h-8 text-zinc-500 mx-auto" />
          <h4 className="text-sm font-mono font-bold text-zinc-300">Nenhuma paleta encontrada</h4>
          <p className="text-xs text-zinc-500 font-mono">
            Tente buscar por outro termo ou selecione a categoria "ALL".
          </p>
        </div>
      )}

    </div>
  );
};
