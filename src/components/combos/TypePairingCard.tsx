import React from 'react';
import { TypePairing } from '../../types';
import { Eye, Check, Heart, Sparkles, ArrowRight, Layers } from 'lucide-react';

interface Props {
  pairing: TypePairing;
  onApply: (pairing: TypePairing) => void;
  onView: (pairing: TypePairing) => void;
  isSaved: boolean;
  onToggleSave: (pairing: TypePairing) => void;
  isCompareSelected: boolean;
  onToggleCompare: (pairing: TypePairing) => void;
}

export const TypePairingCard: React.FC<Props> = ({
  pairing,
  onApply,
  onView,
  isSaved,
  onToggleSave,
  isCompareSelected,
  onToggleCompare,
}) => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0e1017] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl">
      
      {/* Card Header & Metadata */}
      <div className="p-5 border-b border-white/[0.06] bg-zinc-950/40">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                {pairing.category}
              </span>
              {pairing.badge && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-300">
                  {pairing.badge}
                </span>
              )}
            </div>
            <h3 className="font-mono text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
              {pairing.name}
            </h3>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              <span className="text-zinc-200 font-semibold">{pairing.headingFont}</span>
              <span className="text-zinc-600 mx-1.5">+</span>
              <span className="text-zinc-300">{pairing.bodyFont}</span>
            </div>
          </div>

          {/* Quick Actions (Favorite & Compare) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleCompare(pairing)}
              className={`p-2 rounded-lg text-xs font-mono transition-colors border ${
                isCompareSelected
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                  : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
              }`}
              title={isCompareSelected ? 'Remover da comparação' : 'Comparar esta opção'}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleSave(pairing)}
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
      </div>

      {/* Real Mini Typography Preview Box */}
      <div className="p-6 bg-[#090b10] flex-1 flex flex-col justify-between border-b border-white/[0.06]">
        <div className="space-y-3">
          <div 
            className="text-2xl sm:text-3xl font-bold text-zinc-100 leading-[1.12] tracking-tight group-hover:translate-x-0.5 transition-transform"
            style={{ 
              fontFamily: `"${pairing.headingFont}", sans-serif`,
              fontWeight: pairing.headingWeight,
              letterSpacing: pairing.letterSpacing !== undefined ? `${pairing.letterSpacing}em` : undefined,
              lineHeight: pairing.lineHeight,
            }}
          >
            {pairing.previewHeadline}
          </div>

          <p 
            className="text-xs text-zinc-400 leading-relaxed font-normal max-w-md"
            style={{ 
              fontFamily: `"${pairing.bodyFont}", sans-serif`,
              fontWeight: pairing.bodyWeight,
            }}
          >
            {pairing.previewBody}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between">
          <span 
            className="inline-block px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white/10 text-zinc-200"
            style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
          >
            {pairing.previewCta}
          </span>

          <span className="text-[10px] font-mono text-zinc-500">
            Contraste: <strong className="text-zinc-300">{pairing.contrastLevel}</strong>
          </span>
        </div>
      </div>

      {/* Best For (Ideal para) & Tags */}
      <div className="p-4 bg-zinc-950/60 space-y-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
            Ideal para:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pairing.bestFor.map((item, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: VIEW & USE THIS COMBINATION */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onView(pairing)}
            className="py-2.5 px-3 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono font-medium text-zinc-300 flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW LANDING</span>
          </button>

          <button
            onClick={() => onApply(pairing)}
            className="py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 shadow-md"
          >
            <span>USAR COMBO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
