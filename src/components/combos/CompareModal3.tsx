import React from 'react';
import { DesignSystemCombo, TypePairing, ColorPaletteReference } from '../../types';
import { X, Layers, ArrowRight, Trash2, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCombos: DesignSystemCombo[];
  onRemoveCombo: (id: string) => void;
  onApplyCombo: (combo: DesignSystemCombo) => void;
}

export const CompareModal3: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedCombos,
  onRemoveCombo,
  onApplyCombo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-6xl bg-[#0b0d14] border border-white/10 text-zinc-100 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold tracking-wider uppercase text-zinc-100">
                COMPARADOR VISUAL ({selectedCombos.length}/3 OPÇÕES)
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Compare até 3 direções visuais lado a lado antes de escolher a identidade
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {selectedCombos.length === 0 ? (
            <div className="p-16 text-center border border-dashed border-white/15 rounded-2xl space-y-3">
              <Layers className="w-10 h-10 text-zinc-500 mx-auto" />
              <h4 className="text-base font-mono font-bold text-zinc-200">Nenhuma combinação selecionada</h4>
              <p className="text-xs text-zinc-400 font-mono max-w-md mx-auto">
                Clique no ícone de camadas (comparar) em qualquer card nas seções de Combos, Tipografia ou Cores para adicionar até 3 itens aqui.
              </p>
            </div>
          ) : (
            <>
              {/* SIDE-BY-SIDE VISUAL PREVIEWS */}
              <div className={`grid grid-cols-1 md:grid-cols-${selectedCombos.length} gap-6`}>
                {selectedCombos.map((combo, idx) => {
                  const { tokens } = combo;
                  return (
                    <div 
                      key={combo.id}
                      className="border border-white/10 rounded-2xl p-5 bg-[#0e1017] flex flex-col justify-between space-y-4 shadow-xl"
                    >
                      {/* Top label */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
                          OPÇÃO 0{idx + 1}
                        </span>
                        <button
                          onClick={() => onRemoveCombo(combo.id)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                          title="Remover da comparação"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Title */}
                      <div>
                        <h4 className="font-mono text-base font-bold text-white">{combo.name}</h4>
                        <div className="text-xs font-mono text-zinc-400 mt-0.5">{combo.style}</div>
                      </div>

                      {/* Rendered Live Card Preview */}
                      <div 
                        className="rounded-xl p-4 border transition-all duration-200 space-y-3 select-none flex-1"
                        style={{ 
                          backgroundColor: tokens.background,
                          borderColor: tokens.border,
                          color: tokens.text,
                        }}
                      >
                        <div 
                          className="flex justify-between items-center text-[10px] pb-2 border-b"
                          style={{ borderColor: tokens.border, fontFamily: `"${combo.bodyFont}", sans-serif` }}
                        >
                          <span className="font-bold">{combo.name.toUpperCase()}</span>
                          <span style={{ color: tokens.muted }}>Visual Test</span>
                        </div>

                        <div 
                          className="text-xl font-bold leading-tight"
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
                          Real typographic hierarchy and material color tokens working together.
                        </p>

                        <button
                          className="px-3.5 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider"
                          style={{ 
                            fontFamily: `"${combo.bodyFont}", sans-serif`,
                            backgroundColor: tokens.primary,
                            color: tokens.background,
                          }}
                        >
                          CTA Action
                        </button>
                      </div>

                      {/* Swatches strip */}
                      <div className="flex h-3.5 rounded overflow-hidden border border-white/10">
                        <div className="flex-1" style={{ backgroundColor: tokens.background }} />
                        <div className="flex-1" style={{ backgroundColor: tokens.surface }} />
                        <div className="flex-1" style={{ backgroundColor: tokens.primary }} />
                        <div className="flex-1" style={{ backgroundColor: tokens.accent }} />
                      </div>

                      {/* Apply Button */}
                      <button
                        onClick={() => {
                          onApplyCombo(combo);
                          onClose();
                        }}
                        className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5 shadow-md"
                      >
                        <span>ESCOLHER ESTA OPÇÃO</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* SPECIFICATION MATRIX TABLE (Requirement 13) */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0e1017]">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-zinc-950/80 border-b border-white/10 text-zinc-400">
                    <tr>
                      <th className="p-4 uppercase tracking-wider font-bold w-1/4">Atributo</th>
                      {selectedCombos.map((combo, idx) => (
                        <th key={combo.id} className="p-4 uppercase tracking-wider font-bold text-amber-400">
                          Opção 0{idx + 1}: {combo.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                    <tr>
                      <td className="p-4 font-bold text-zinc-400 bg-zinc-950/40">Tipografia</td>
                      {selectedCombos.map(c => (
                        <td key={c.id} className="p-4">
                          <strong className="text-white">{c.headingFont}</strong> ({c.headingWeight})
                          <div className="text-zinc-400 text-[11px]">+ {c.bodyFont} ({c.bodyWeight})</div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-400 bg-zinc-950/40">Cores</td>
                      {selectedCombos.map(c => (
                        <td key={c.id} className="p-4">
                          <div className="text-white font-medium">{c.colorNames.join(' • ')}</div>
                          <div className="text-[10px] text-zinc-500 mt-1 font-mono">
                            BG: {c.tokens.background} | Primary: {c.tokens.primary}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-400 bg-zinc-950/40">Estilo</td>
                      {selectedCombos.map(c => (
                        <td key={c.id} className="p-4">
                          <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-zinc-200">
                            {c.style}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-400 bg-zinc-950/40">Ideal para</td>
                      {selectedCombos.map(c => (
                        <td key={c.id} className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {c.bestFor.map((item, bIdx) => (
                              <span key={bIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-300">
                                {item}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/90 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>{selectedCombos.length} de 3 slots preenchidos</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Fechar Comparador
          </button>
        </div>

      </div>
    </div>
  );
};
