import React, { useState } from 'react';
import { ColorPaletteReference } from '../../types';
import { Check, Copy, Heart, ArrowRight, Layers, ExternalLink } from 'lucide-react';

interface Props {
  palette: ColorPaletteReference;
  onApply: (palette: ColorPaletteReference) => void;
  isSaved: boolean;
  onToggleSave: (palette: ColorPaletteReference) => void;
  isCompareSelected: boolean;
  onToggleCompare: (palette: ColorPaletteReference) => void;
  onCopyHex: (hex: string) => void;
}

export const ColorPaletteCard: React.FC<Props> = ({
  palette,
  onApply,
  isSaved,
  onToggleSave,
  isCompareSelected,
  onToggleCompare,
  onCopyHex,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onCopyHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const { tokens } = palette;

  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0e1017] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl">
      
      {/* Card Top Header & Metadata */}
      <div className="p-5 border-b border-white/[0.06] bg-zinc-950/40">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                {palette.category}
              </span>
              {palette.badge && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-300">
                  {palette.badge}
                </span>
              )}
            </div>
            <h3 className="font-mono text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
              {palette.name}
            </h3>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              <span>{palette.style}</span>
              <span className="text-zinc-600 mx-1.5">•</span>
              <span className="text-zinc-300">{palette.contrast}</span>
            </div>
          </div>

          {/* Quick Actions (Compare & Favorite) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleCompare(palette)}
              className={`p-2 rounded-lg text-xs font-mono transition-colors border ${
                isCompareSelected
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                  : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
              }`}
              title={isCompareSelected ? 'Remover da comparação' : 'Comparar esta paleta'}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleSave(palette)}
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

        {/* Color Chips Row with 1-click Hex copy */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1">
          {palette.colorList.map((hex, idx) => (
            <button
              key={idx}
              onClick={() => handleCopy(hex)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] transition-colors group/chip shrink-0"
              title="Copiar código HEX"
            >
              <span 
                className="w-3 h-3 rounded-full border border-black/30 shrink-0"
                style={{ backgroundColor: hex }}
              />
              <span className="text-zinc-300 uppercase">{hex}</span>
              {copiedHex === hex && <Check className="w-3 h-3 text-emerald-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* REAL MINI INTERFACE PREVIEW (Requirement 8) */}
      <div className="p-4 bg-zinc-950/60 flex-1 flex flex-col justify-center border-b border-white/[0.06]">
        <div 
          className="rounded-xl p-4 border transition-all duration-300 shadow-inner space-y-3.5 select-none"
          style={{ 
            backgroundColor: tokens.background,
            borderColor: tokens.border,
            color: tokens.text,
          }}
        >
          {/* Mini Navbar */}
          <div 
            className="flex items-center justify-between pb-2 border-b text-[10px] font-mono"
            style={{ borderColor: tokens.border }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.primary }} />
              <span className="font-bold tracking-wider" style={{ color: tokens.text }}>STUDIO BRAND</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: tokens.muted }}>
              <span>Work</span>
              <span>About</span>
              <span style={{ color: tokens.accent }}>Menu</span>
            </div>
          </div>

          {/* Mini Hero */}
          <div className="space-y-1.5 pt-1">
            <span 
              className="text-[9px] uppercase tracking-widest font-mono font-bold block"
              style={{ color: tokens.accent }}
            >
              Curated Experience
            </span>
            <div 
              className="text-lg font-bold leading-tight"
              style={{ color: tokens.text }}
            >
              Where Form Meets Quiet Purpose.
            </div>
            <p 
              className="text-[11px] leading-relaxed line-clamp-2"
              style={{ color: tokens.muted }}
            >
              Real interfaces built with conscious material tokens, balanced contrast and functional typographic rhythm.
            </p>
          </div>

          {/* Mini Cards & Interactive Button */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div 
              className="p-2.5 rounded-lg border text-left space-y-1"
              style={{ 
                backgroundColor: tokens.surface,
                borderColor: tokens.border,
              }}
            >
              <span className="text-[9px] uppercase font-mono font-bold" style={{ color: tokens.accent }}>Feature 01</span>
              <div className="text-[11px] font-bold" style={{ color: tokens.text }}>Surface Depth</div>
              <div className="text-[10px]" style={{ color: tokens.muted }}>Seamless card hierarchy.</div>
            </div>

            <div 
              className="p-2.5 rounded-lg border text-left space-y-1"
              style={{ 
                backgroundColor: tokens.surface,
                borderColor: tokens.border,
              }}
            >
              <span className="text-[9px] uppercase font-mono font-bold" style={{ color: tokens.primary }}>Feature 02</span>
              <div className="text-[11px] font-bold" style={{ color: tokens.text }}>Dynamic Accent</div>
              <div className="text-[10px]" style={{ color: tokens.muted }}>Cohesive micro-accents.</div>
            </div>
          </div>

          {/* Mini Button CTA */}
          <div className="pt-1 flex items-center justify-between">
            <button
              className="px-3.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm"
              style={{ 
                backgroundColor: tokens.primary,
                color: tokens.background,
              }}
            >
              Explore Project
            </button>
            <span className="text-[10px] font-mono" style={{ color: tokens.muted }}>
              Preview Aplicada
            </span>
          </div>
        </div>
      </div>

      {/* Best For & USE PALETTE Action */}
      <div className="p-4 bg-zinc-950/80 space-y-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
            Ideal para:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {palette.bestFor.map((item, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* USE PALETTE Button */}
        <button
          onClick={() => onApply(palette)}
          className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 shadow-md"
        >
          <span>USE PALETTE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
