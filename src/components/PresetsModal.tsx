import React from 'react';
import { Preset } from '../types';
import { PRESETS } from '../data/presets';
import { Sparkles, X, ArrowRight, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: Preset) => void;
  currentPresetId?: string;
}

export const PresetsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentPresetId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-[#0e1017] border border-white/10 text-zinc-100 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold tracking-wider uppercase text-zinc-100">
                PRESETS &amp; DIREÇÕES DE ARTE
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                Carregue negócio, tipografia, paleta e espaçamento em 1 clique
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESETS.map((preset) => {
            const isSelected = currentPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/60 shadow-lg'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {preset.name}
                    </span>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-amber-500 text-zinc-950">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 font-normal leading-relaxed mb-4">
                    {preset.tagline}
                  </p>

                  {/* Swatches preview */}
                  <div className="flex h-5 rounded overflow-hidden border border-white/10 mb-3">
                    <div className="flex-1" style={{ backgroundColor: preset.palette.colors.background }} />
                    <div className="flex-1" style={{ backgroundColor: preset.palette.colors.surface }} />
                    <div className="flex-1" style={{ backgroundColor: preset.palette.colors.primary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.palette.colors.secondary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.palette.colors.accent }} />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{preset.typography.headingFont} + {preset.typography.bodyFont}</span>
                  <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Carregar</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Selecione para aplicar imediatamente</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
