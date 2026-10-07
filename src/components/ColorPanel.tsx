import React, { useState } from 'react';
import { ColorPalette, ColorPaletteCategory, ColorTokens } from '../types';
import { PALETTES } from '../data/palettes';
import { X, Palette, Sliders, Check, Copy, Sparkles, RefreshCw, Eye } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  palette: ColorPalette;
  onChangePalette: (palette: ColorPalette) => void;
  onCopyColor: (hex: string) => void;
}

export const ColorPanel: React.FC<Props> = ({
  isOpen,
  onClose,
  palette,
  onChangePalette,
  onCopyColor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ColorPaletteCategory | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');

  if (!isOpen) return null;

  const categories: { id: ColorPaletteCategory; label: string }[] = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'warm', label: 'Warm' },
    { id: 'cool', label: 'Cool' },
    { id: 'natural', label: 'Natural' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'vibrant', label: 'Vibrant' },
    { id: 'experimental', label: 'Experimental' },
  ];

  const filteredPalettes = selectedCategory === 'all'
    ? PALETTES
    : PALETTES.filter(p => p.category === selectedCategory);

  const handleTokenChange = (tokenName: keyof ColorTokens, value: string) => {
    onChangePalette({
      ...palette,
      name: palette.name.includes('(Custom)') ? palette.name : `${palette.name} (Custom)`,
      colors: {
        ...palette.colors,
        [tokenName]: value,
      },
    });
  };

  // Quick Invert Background / Text
  const handleInvert = () => {
    onChangePalette({
      ...palette,
      name: `${palette.name} (Invertida)`,
      colors: {
        ...palette.colors,
        background: palette.colors.text,
        surface: palette.colors.muted,
        text: palette.colors.background,
        muted: palette.colors.surface,
      },
    });
  };

  const tokenList: { key: keyof ColorTokens; label: string; desc: string }[] = [
    { key: 'background', label: 'BACKGROUND', desc: 'Fundo principal da página e telas' },
    { key: 'surface', label: 'SURFACE', desc: 'Superfícies de cards, painéis e seções alternadas' },
    { key: 'primary', label: 'PRIMARY', desc: 'Cor primária de marca, botões principais e ênfase' },
    { key: 'secondary', label: 'SECONDARY', desc: 'Apoio secundário para tags e badges' },
    { key: 'accent', label: 'ACCENT', desc: 'Destaque refinado para links e microdetalhes' },
    { key: 'text', label: 'TEXT', desc: 'Cor de leitura principal de títulos e copy' },
    { key: 'muted', label: 'MUTED', desc: 'Texto secundário, legendas e metadados' },
    { key: 'border', label: 'BORDER', desc: 'Divisores e bordas estruturais' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#0e1017] border-l border-white/10 text-zinc-100 h-full flex flex-col shadow-2xl z-10 overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Panel Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold tracking-wider uppercase text-zinc-100">
                COLOR SYSTEM
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                Curadoria cromática &amp; tokens dinâmicos
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

        {/* Tab Switcher: Presets vs Custom */}
        <div className="px-5 pt-3 pb-0 flex border-b border-white/10 gap-2">
          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-2.5 px-3 text-xs font-mono font-bold tracking-wider border-b-2 transition-all ${
              activeTab === 'presets'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            PALETTES CURADAS
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 px-3 text-xs font-mono font-bold tracking-wider border-b-2 transition-all ${
              activeTab === 'custom'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            EDITOR CUSTOMIZADO
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {activeTab === 'presets' ? (
            <>
              {/* Category Filter Pills */}
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-white/15 text-white font-bold'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Todas
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-white/15 text-white font-bold'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Current Active Palette Highlight */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Paleta em Uso
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {palette.name}
                  </span>
                </div>

                {/* Swatches Bar */}
                <div className="flex h-10 rounded-lg overflow-hidden border border-white/10 shadow-inner">
                  <div className="flex-1" style={{ backgroundColor: palette.colors.background }} title={`Background: ${palette.colors.background}`} />
                  <div className="flex-1" style={{ backgroundColor: palette.colors.surface }} title={`Surface: ${palette.colors.surface}`} />
                  <div className="flex-1" style={{ backgroundColor: palette.colors.primary }} title={`Primary: ${palette.colors.primary}`} />
                  <div className="flex-1" style={{ backgroundColor: palette.colors.secondary }} title={`Secondary: ${palette.colors.secondary}`} />
                  <div className="flex-1" style={{ backgroundColor: palette.colors.accent }} title={`Accent: ${palette.colors.accent}`} />
                  <div className="flex-1" style={{ backgroundColor: palette.colors.text }} title={`Text: ${palette.colors.text}`} />
                  <div className="flex-1" style={{ backgroundColor: palette.colors.muted }} title={`Muted: ${palette.colors.muted}`} />
                </div>
              </div>

              {/* Palettes List */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 block">
                  Selecione uma Paleta
                </span>

                <div className="grid grid-cols-1 gap-2.5">
                  {filteredPalettes.map(p => {
                    const isSelected = palette.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => onChangePalette(p)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-xs font-mono font-bold text-zinc-100">{p.name}</span>
                            <span className="ml-2 text-[10px] font-mono uppercase text-zinc-500 tracking-wider">[{p.category}]</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                        </div>

                        {/* Color swatches */}
                        <div className="flex h-7 rounded-md overflow-hidden border border-white/10 shadow-sm">
                          <div className="flex-1" style={{ backgroundColor: p.colors.background }} />
                          <div className="flex-1" style={{ backgroundColor: p.colors.surface }} />
                          <div className="flex-1" style={{ backgroundColor: p.colors.primary }} />
                          <div className="flex-1" style={{ backgroundColor: p.colors.secondary }} />
                          <div className="flex-1" style={{ backgroundColor: p.colors.accent }} />
                          <div className="flex-1" style={{ backgroundColor: p.colors.text }} />
                          <div className="flex-1" style={{ backgroundColor: p.colors.muted }} />
                        </div>

                        <p className="text-[10px] text-zinc-400 font-mono mt-2 truncate">
                          {p.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Custom Color Editor Mode */
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                  Ajuste de Tokens Individuais
                </span>
                <button
                  onClick={handleInvert}
                  className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5 transition-colors border border-white/10"
                  title="Inverter fundo e texto"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Inverter Contraste</span>
                </button>
              </div>

              <div className="space-y-3">
                {tokenList.map(tok => {
                  const val = palette.colors[tok.key];
                  return (
                    <div 
                      key={tok.key}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input 
                            type="color"
                            value={val.startsWith('#') ? val : '#ffffff'}
                            onChange={e => handleTokenChange(tok.key, e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-bold text-zinc-200">{tok.label}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{tok.desc}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input 
                          type="text"
                          value={val}
                          onChange={e => handleTokenChange(tok.key, e.target.value)}
                          className="w-24 px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs text-right text-zinc-200 outline-none"
                        />
                        <button
                          onClick={() => onCopyColor(val)}
                          className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                          title="Copiar cor"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Paleta: {palette.name}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
          >
            Aplicar &amp; Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
