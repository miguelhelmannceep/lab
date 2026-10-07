import React, { useState } from 'react';
import { SavedSnapshot, ProjectCategory, TypographySettings, ColorPalette } from '../types';
import { PROJECTS } from '../data/projects';
import { SplitSquareVertical, BookmarkPlus, Trash2, RotateCcw, ArrowRight, Check, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  snapshots: SavedSnapshot[];
  currentSnapshot: {
    project: ProjectCategory;
    typography: TypographySettings;
    palette: ColorPalette;
  };
  onSaveCurrent: (label: string) => void;
  onRestoreSnapshot: (snapshot: SavedSnapshot) => void;
  onDeleteSnapshot: (id: string) => void;
}

export const ComparePanel: React.FC<Props> = ({
  isOpen,
  onClose,
  snapshots,
  currentSnapshot,
  onSaveCurrent,
  onRestoreSnapshot,
  onDeleteSnapshot,
}) => {
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(
    snapshots.length > 0 ? snapshots[0].id : null
  );
  const [customLabel, setCustomLabel] = useState('');

  if (!isOpen) return null;

  const activeCompareSnapshot = snapshots.find(s => s.id === selectedSnapshotId) || snapshots[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const labelToSave = customLabel.trim() || `${PROJECTS[currentSnapshot.project].name} — ${currentSnapshot.typography.headingFont}`;
    onSaveCurrent(labelToSave);
    setCustomLabel('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Comparison Modal */}
      <div className="relative w-full max-w-5xl bg-[#0e1017] border border-white/10 text-zinc-100 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <SplitSquareVertical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold tracking-wider uppercase text-zinc-100">
                COMPARADOR VISUAL (COMPARE LAB)
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                Compare a direção atual contra versões e testes anteriores salvos
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Save Current State Bar */}
          <form onSubmit={handleSave} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <input 
                type="text" 
                value={customLabel}
                onChange={e => setCustomLabel(e.target.value)}
                placeholder={`Nome para salvar este estado (Ex: ${PROJECTS[currentSnapshot.project].name} com ${currentSnapshot.typography.headingFont})...`}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-200 font-mono outline-none focus:border-indigo-500/60"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap transition-all shadow-md"
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>Salvar Estado Atual</span>
            </button>
          </form>

          {/* Comparison Arena: CURRENT vs SAVED */}
          {snapshots.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-white/15 rounded-xl space-y-3">
              <BookmarkPlus className="w-8 h-8 text-zinc-500 mx-auto" />
              <h4 className="text-sm font-mono font-bold text-zinc-300">Nenhum snapshot salvo ainda</h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Clique no botão acima para capturar sua primeira direção visual. Em seguida, troque fontes e paletas para compará-las lado a lado!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Snapshots Selector Shelf */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 block">
                  Selecione uma Versão Salva para Comparar:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {snapshots.map(s => {
                    const isSelected = (selectedSnapshotId || snapshots[0].id) === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSnapshotId(s.id)}
                        className={`px-4 py-2.5 rounded-xl border text-left shrink-0 transition-all ${
                          isSelected
                            ? 'bg-indigo-500/15 border-indigo-500/50 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="text-xs font-bold font-mono">{s.label}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {s.typography.headingFont} • {s.palette.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Side-by-Side Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. CURRENT CONFIGURATION */}
                <div className="border border-amber-500/30 rounded-2xl p-6 bg-amber-500/[0.02] space-y-5 relative">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      CURRENT (EM EDIÇÃO)
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {PROJECTS[currentSnapshot.project].name}
                    </span>
                  </div>

                  {/* Visual Card simulation */}
                  <div 
                    className="p-6 rounded-xl border space-y-3 transition-colors"
                    style={{ 
                      backgroundColor: currentSnapshot.palette.colors.surface,
                      borderColor: currentSnapshot.palette.colors.border
                    }}
                  >
                    <span className="text-[10px] uppercase tracking-widest font-mono font-semibold" style={{ color: currentSnapshot.palette.colors.accent }}>
                      Demonstração Rápida
                    </span>
                    <h3 
                      className="text-2xl font-bold leading-tight"
                      style={{ 
                        fontFamily: currentSnapshot.typography.headingFont,
                        fontWeight: currentSnapshot.typography.headingWeight,
                        color: currentSnapshot.palette.colors.text
                      }}
                    >
                      {PROJECTS[currentSnapshot.project].headline}
                    </h3>
                    <p 
                      className="text-xs leading-relaxed"
                      style={{ 
                        fontFamily: currentSnapshot.typography.bodyFont,
                        fontWeight: currentSnapshot.typography.bodyWeight,
                        color: currentSnapshot.palette.colors.muted
                      }}
                    >
                      {PROJECTS[currentSnapshot.project].subheadline}
                    </p>
                    <button
                      className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider mt-2"
                      style={{ 
                        backgroundColor: currentSnapshot.palette.colors.primary,
                        color: currentSnapshot.palette.colors.background
                      }}
                    >
                      Botão de Ação
                    </button>
                  </div>

                  {/* Metadata Specs */}
                  <div className="space-y-2 font-mono text-xs border-t border-white/10 pt-4">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Títulos:</span>
                      <span className="text-zinc-200 font-bold">{currentSnapshot.typography.headingFont} ({currentSnapshot.typography.headingWeight})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Corpo:</span>
                      <span className="text-zinc-200 font-bold">{currentSnapshot.typography.bodyFont} ({currentSnapshot.typography.bodyWeight})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Paleta:</span>
                      <span className="text-zinc-200 font-bold">{currentSnapshot.palette.name}</span>
                    </div>
                  </div>

                  {/* Swatches mini-bar */}
                  <div className="flex h-4 rounded overflow-hidden border border-white/10">
                    <div className="flex-1" style={{ backgroundColor: currentSnapshot.palette.colors.background }} />
                    <div className="flex-1" style={{ backgroundColor: currentSnapshot.palette.colors.surface }} />
                    <div className="flex-1" style={{ backgroundColor: currentSnapshot.palette.colors.primary }} />
                    <div className="flex-1" style={{ backgroundColor: currentSnapshot.palette.colors.accent }} />
                  </div>
                </div>

                {/* 2. SAVED SNAPSHOT CONFIGURATION */}
                {activeCompareSnapshot && (
                  <div className="border border-indigo-500/30 rounded-2xl p-6 bg-indigo-500/[0.02] space-y-5 relative">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        SAVED (ESTADO SALVO)
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDeleteSnapshot(activeCompareSnapshot.id)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                          title="Excluir este snapshot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono text-zinc-400">
                          {PROJECTS[activeCompareSnapshot.project].name}
                        </span>
                      </div>
                    </div>

                    {/* Visual Card simulation */}
                    <div 
                      className="p-6 rounded-xl border space-y-3 transition-colors"
                      style={{ 
                        backgroundColor: activeCompareSnapshot.palette.colors.surface,
                        borderColor: activeCompareSnapshot.palette.colors.border
                      }}
                    >
                      <span className="text-[10px] uppercase tracking-widest font-mono font-semibold" style={{ color: activeCompareSnapshot.palette.colors.accent }}>
                        Demonstração Salva
                      </span>
                      <h3 
                        className="text-2xl font-bold leading-tight"
                        style={{ 
                          fontFamily: activeCompareSnapshot.typography.headingFont,
                          fontWeight: activeCompareSnapshot.typography.headingWeight,
                          color: activeCompareSnapshot.palette.colors.text
                        }}
                      >
                        {PROJECTS[activeCompareSnapshot.project].headline}
                      </h3>
                      <p 
                        className="text-xs leading-relaxed"
                        style={{ 
                          fontFamily: activeCompareSnapshot.typography.bodyFont,
                          fontWeight: activeCompareSnapshot.typography.bodyWeight,
                          color: activeCompareSnapshot.palette.colors.muted
                        }}
                      >
                        {PROJECTS[activeCompareSnapshot.project].subheadline}
                      </p>
                      <button
                        className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider mt-2"
                        style={{ 
                          backgroundColor: activeCompareSnapshot.palette.colors.primary,
                          color: activeCompareSnapshot.palette.colors.background
                        }}
                      >
                        Botão de Ação
                      </button>
                    </div>

                    {/* Metadata Specs */}
                    <div className="space-y-2 font-mono text-xs border-t border-white/10 pt-4">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Títulos:</span>
                        <span className="text-zinc-200 font-bold">{activeCompareSnapshot.typography.headingFont} ({activeCompareSnapshot.typography.headingWeight})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Corpo:</span>
                        <span className="text-zinc-200 font-bold">{activeCompareSnapshot.typography.bodyFont} ({activeCompareSnapshot.typography.bodyWeight})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Paleta:</span>
                        <span className="text-zinc-200 font-bold">{activeCompareSnapshot.palette.name}</span>
                      </div>
                    </div>

                    {/* Swatches mini-bar */}
                    <div className="flex h-4 rounded overflow-hidden border border-white/10">
                      <div className="flex-1" style={{ backgroundColor: activeCompareSnapshot.palette.colors.background }} />
                      <div className="flex-1" style={{ backgroundColor: activeCompareSnapshot.palette.colors.surface }} />
                      <div className="flex-1" style={{ backgroundColor: activeCompareSnapshot.palette.colors.primary }} />
                      <div className="flex-1" style={{ backgroundColor: activeCompareSnapshot.palette.colors.accent }} />
                    </div>

                    {/* Restore button */}
                    <button
                      onClick={() => {
                        onRestoreSnapshot(activeCompareSnapshot);
                        onClose();
                      }}
                      className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Restaurar esta Versão no Canvas</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>{snapshots.length} snapshots salvos na sessão</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
