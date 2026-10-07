import React, { useState } from 'react';
import { TypePairing, PairingFilter } from '../../types';
import { POPULAR_TYPE_PAIRINGS } from '../../data/popularPairings';
import { TypePairingCard } from './TypePairingCard';
import { TypePairingModal } from './TypePairingModal';
import { Search, Filter, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  onApplyPairing: (pairing: TypePairing) => void;
  savedPairingIds: string[];
  onToggleSavePairing: (pairing: TypePairing) => void;
  comparePairingIds: string[];
  onToggleComparePairing: (pairing: TypePairing) => void;
}

export const TypePairingsLibrary: React.FC<Props> = ({
  onApplyPairing,
  savedPairingIds,
  onToggleSavePairing,
  comparePairingIds,
  onToggleComparePairing,
}) => {
  const [activeFilter, setActiveFilter] = useState<PairingFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingPairing, setViewingPairing] = useState<TypePairing | null>(null);

  const filterOptions: PairingFilter[] = [
    'ALL',
    'MODERN',
    'MINIMAL',
    'EDITORIAL',
    'LUXURY',
    'CORPORATE',
    'TECH',
    'SPORT',
    'CREATIVE',
    'FASHION'
  ];

  const filteredPairings = POPULAR_TYPE_PAIRINGS.filter(p => {
    const matchesFilter = activeFilter === 'ALL' || p.category === activeFilter || p.tags.includes(activeFilter);
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.headingFont.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bodyFont.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.bestFor.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Library Section Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              LIBRARY / 01
            </span>
            <span className="text-xs font-mono text-zinc-500">PARES RECONHECIDOS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-mono">
            TYPE PAIRINGS
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-mono">
            Combinações clássicas e contemporâneas com contraste equilibrado entre títulos e corpo de texto.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar fonte, estilo ou nicho..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 font-mono outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {filterOptions.map(cat => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
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

      {/* Pairings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPairings.map(pairing => (
          <TypePairingCard
            key={pairing.id}
            pairing={pairing}
            onApply={onApplyPairing}
            onView={setViewingPairing}
            isSaved={savedPairingIds.includes(pairing.id)}
            onToggleSave={onToggleSavePairing}
            isCompareSelected={comparePairingIds.includes(pairing.id)}
            onToggleCompare={onToggleComparePairing}
          />
        ))}
      </div>

      {filteredPairings.length === 0 && (
        <div className="p-12 text-center border border-dashed border-white/15 rounded-2xl space-y-2">
          <BookOpen className="w-8 h-8 text-zinc-500 mx-auto" />
          <h4 className="text-sm font-mono font-bold text-zinc-300">Nenhuma combinação encontrada</h4>
          <p className="text-xs text-zinc-500 font-mono">
            Tente buscar por outro termo ou selecione o filtro "ALL".
          </p>
        </div>
      )}

      {/* Landing View Modal */}
      <TypePairingModal
        pairing={viewingPairing}
        onClose={() => setViewingPairing(null)}
        onApply={onApplyPairing}
        isSaved={viewingPairing ? savedPairingIds.includes(viewingPairing.id) : false}
        onToggleSave={onToggleSavePairing}
      />

    </div>
  );
};
