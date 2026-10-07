import React from 'react';
import { TypePairing } from '../../types';
import { X, ArrowRight, Sparkles, Check, Heart, Shield } from 'lucide-react';

interface Props {
  pairing: TypePairing | null;
  onClose: () => void;
  onApply: (pairing: TypePairing) => void;
  isSaved: boolean;
  onToggleSave: (pairing: TypePairing) => void;
}

export const TypePairingModal: React.FC<Props> = ({
  pairing,
  onClose,
  onApply,
  isSaved,
  onToggleSave,
}) => {
  if (!pairing) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0b0d14] border border-white/10 text-zinc-100 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              LANDING PREVIEW
            </span>
            <div>
              <h2 className="text-sm font-mono font-bold text-zinc-100">
                {pairing.name} — {pairing.headingFont} + {pairing.bodyFont}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(pairing)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-rose-400 border-white/10'
              }`}
              title="Salvar nos favoritos"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Landing Mockup Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12 bg-[#090a0f]">
          
          {/* Simulated Agency/Brand Header */}
          <nav className="flex items-center justify-between pb-6 border-b border-white/10">
            <div 
              className="text-xl font-bold tracking-tight text-white"
              style={{ fontFamily: `"${pairing.headingFont}", sans-serif` }}
            >
              NOVA STUDIO
            </div>

            <div 
              className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest text-zinc-400"
              style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
            >
              <span>Work</span>
              <span>About</span>
              <span>Services</span>
              <span>Contact</span>
            </div>

            <span 
              className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider bg-white/10 text-white"
              style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
            >
              Get In Touch
            </span>
          </nav>

          {/* Hero Section */}
          <div className="space-y-6 max-w-2xl">
            <div 
              className="text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-white"
              style={{ 
                fontFamily: `"${pairing.headingFont}", sans-serif`,
                fontWeight: pairing.headingWeight,
                letterSpacing: pairing.letterSpacing !== undefined ? `${pairing.letterSpacing}em` : undefined,
                lineHeight: pairing.lineHeight,
              }}
            >
              MAKE SOMETHING WORTH REMEMBERING.
            </div>

            <p 
              className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal"
              style={{ 
                fontFamily: `"${pairing.bodyFont}", sans-serif`,
                fontWeight: pairing.bodyWeight,
              }}
            >
              We create digital experiences and brand systems for ambitious companies worldwide. Focused on typography, clarity and enduring value.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  onApply(pairing);
                  onClose();
                }}
                className="px-7 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2"
              >
                <span>APLICAR ESTA COMBINAÇÃO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
              <div 
                className="text-lg font-bold text-white"
                style={{ fontFamily: `"${pairing.headingFont}", sans-serif` }}
              >
                Brand Architecture
              </div>
              <p 
                className="text-xs text-zinc-400 leading-relaxed"
                style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
              >
                Establishing solid foundations through distinctive visual guidelines and custom typography.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
              <div 
                className="text-lg font-bold text-white"
                style={{ fontFamily: `"${pairing.headingFont}", sans-serif` }}
              >
                Digital Flagships
              </div>
              <p 
                className="text-xs text-zinc-400 leading-relaxed"
                style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
              >
                High-performance web applications built with editorial restraint and responsive precision.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
              <div 
                className="text-lg font-bold text-white"
                style={{ fontFamily: `"${pairing.headingFont}", sans-serif` }}
              >
                Design Systems
              </div>
              <p 
                className="text-xs text-zinc-400 leading-relaxed"
                style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
              >
                Scalable token libraries ensuring harmonious typographic hierarchy across all screen sizes.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div>
            Heading: <strong className="text-zinc-200">{pairing.headingFont} ({pairing.headingWeight})</strong> • Body: <strong className="text-zinc-200">{pairing.bodyFont} ({pairing.bodyWeight})</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                onApply(pairing);
                onClose();
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase tracking-wider transition-colors shadow"
            >
              Aplicar no Laboratório
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
