import React, { useState } from 'react';
import { ColorPalette, ColorTokens } from '../types';
import { Copy, Check, ShieldCheck, Download, Code, Layers } from 'lucide-react';

interface Props {
  palette: ColorPalette;
  onCopyColor: (hex: string) => void;
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

// Helper to convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Calculate relative luminance for contrast ratio
function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export const ColorSystem: React.FC<Props> = ({ palette, onCopyColor }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);

  const tokensOrder: { key: keyof ColorTokens; name: string; role: string }[] = [
    { key: 'primary', name: 'PRIMARY', role: 'Cor principal de ação, destaque e identidade de marca' },
    { key: 'secondary', name: 'SECONDARY', role: 'Superfície de suporte, containers secundários e tags' },
    { key: 'accent', name: 'ACCENT', role: 'Destaque de microdetalhes, links e badges de destaque' },
    { key: 'surface', name: 'SURFACE', role: 'Plano de fundo de cards, painéis e elementos elevados' },
    { key: 'background', name: 'BACKGROUND', role: 'Plano de fundo base de toda a interface' },
    { key: 'text', name: 'TEXT', role: 'Tipografia de alta legibilidade para títulos e parágrafos' },
    { key: 'muted', name: 'MUTED', role: 'Tipografia secundária, legendas e textos de apoio' },
    { key: 'border', name: 'BORDER', role: 'Linhas divisórias e contornos estruturais' },
  ];

  const handleCopy = (tokenKey: string, hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(tokenKey);
    onCopyColor(hex);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const generateCssVariables = () => {
    return `:root {
  /* Type & Color Lab — Palette: ${palette.name} */
  --color-background: ${palette.colors.background};
  --color-surface: ${palette.colors.surface};
  --color-primary: ${palette.colors.primary};
  --color-secondary: ${palette.colors.secondary};
  --color-accent: ${palette.colors.accent};
  --color-text: ${palette.colors.text};
  --color-muted: ${palette.colors.muted};
  --color-border: ${palette.colors.border};
}`;
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generateCssVariables());
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2500);
  };

  // Contrast scores
  const textBgContrast = getContrastRatio(palette.colors.text, palette.colors.background);
  const textSurfaceContrast = getContrastRatio(palette.colors.text, palette.colors.surface);
  const primaryBgContrast = getContrastRatio(palette.colors.primary, palette.colors.background);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-300">
      
      {/* Header & Meta */}
      <div className="border-b pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              SYSTEM / 03
            </span>
            <span className="text-xs font-mono text-zinc-500">TOKENS CROMÁTICOS</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100">
            {palette.name}
          </h1>
          <p className="text-sm text-zinc-400 mt-1 font-mono">
            {palette.description} • Categoria: <strong className="text-amber-400 uppercase">{palette.category}</strong>
          </p>
        </div>

        {/* Export CSS Button */}
        <button
          onClick={handleCopyCss}
          className="px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-amber-500/50 text-xs font-mono font-semibold text-zinc-200 hover:text-white flex items-center gap-2 transition-all self-start md:self-auto"
        >
          {copiedCss ? <Check className="w-4 h-4 text-emerald-400" /> : <Code className="w-4 h-4 text-amber-400" />}
          <span>{copiedCss ? 'CSS COPIADO!' : 'EXPORTAR TOKENS CSS'}</span>
        </button>
      </div>

      {/* 1. Main Design Token Cards & Values (HEX, RGB, HSL) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
            Design Tokens &amp; Notações de Cor
          </h3>
          <span className="text-xs font-mono text-zinc-500">CLIQUE PARA COPIAR HEX</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tokensOrder.map(tok => {
            const rawVal = palette.colors[tok.key];
            const isHex = rawVal.startsWith('#');
            const rgb = isHex ? hexToRgb(rawVal) : null;
            const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
            const isCopied = copiedToken === tok.key;

            return (
              <div 
                key={tok.key}
                onClick={() => handleCopy(tok.key, rawVal)}
                className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Swatch preview */}
                  <div 
                    className="w-14 h-14 rounded-lg border border-white/10 shadow-md shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: rawVal }}
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black tracking-wider text-zinc-100">
                        {tok.name}
                      </span>
                      {isCopied && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          COPIADO!
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5 line-clamp-1">
                      {tok.role}
                    </div>
                  </div>
                </div>

                {/* Values columns */}
                <div className="text-right font-mono text-xs space-y-0.5 shrink-0">
                  <div className="font-bold text-zinc-100 flex items-center justify-end gap-1.5">
                    <span>{rawVal}</span>
                    <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
                  </div>
                  {rgb && (
                    <div className="text-[10px] text-zinc-400">
                      rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </div>
                  )}
                  {hsl && (
                    <div className="text-[10px] text-zinc-500">
                      hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Accessibility & Contrast Matrix */}
      <section className="p-8 rounded-2xl border bg-white/[0.02] space-y-6" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
            Acessibilidade &amp; Relação de Contraste (WCAG 2.1)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contrast 1: Text on Background */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/60 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Texto no Fundo</span>
              <span className="font-bold text-amber-400">{textBgContrast.toFixed(2)}:1</span>
            </div>
            <div className="p-3 rounded-lg border text-sm font-semibold"
              style={{ backgroundColor: palette.colors.background, color: palette.colors.text, borderColor: palette.colors.border }}
            >
              Legibilidade do Texto Principal
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-500">Status WCAG:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${textBgContrast >= 4.5 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {textBgContrast >= 7 ? 'AAA PASS' : textBgContrast >= 4.5 ? 'AA PASS' : 'BAIXO'}
              </span>
            </div>
          </div>

          {/* Contrast 2: Text on Surface */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/60 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Texto no Surface</span>
              <span className="font-bold text-amber-400">{textSurfaceContrast.toFixed(2)}:1</span>
            </div>
            <div className="p-3 rounded-lg border text-sm font-semibold"
              style={{ backgroundColor: palette.colors.surface, color: palette.colors.text, borderColor: palette.colors.border }}
            >
              Cards &amp; Painéis Elevados
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-500">Status WCAG:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${textSurfaceContrast >= 4.5 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {textSurfaceContrast >= 7 ? 'AAA PASS' : textSurfaceContrast >= 4.5 ? 'AA PASS' : 'BAIXO'}
              </span>
            </div>
          </div>

          {/* Contrast 3: Primary on Background */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/60 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Primary no Fundo</span>
              <span className="font-bold text-amber-400">{primaryBgContrast.toFixed(2)}:1</span>
            </div>
            <div className="p-3 rounded-lg border text-sm font-semibold"
              style={{ backgroundColor: palette.colors.primary, color: palette.colors.background, borderColor: palette.colors.border }}
            >
              Botão CTA Principal
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-500">Status WCAG:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${primaryBgContrast >= 3.0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {primaryBgContrast >= 4.5 ? 'AA PASS' : 'UI ELEMENT'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CSS Variables Export Codebox */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
            Exportação de Variáveis CSS
          </h3>
          <span className="text-xs font-mono text-zinc-500">PRONTO PARA PRODUÇÃO</span>
        </div>

        <div className="relative rounded-xl border border-white/10 bg-[#090b10] p-6 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
          <button
            onClick={handleCopyCss}
            className="absolute top-4 right-4 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono text-zinc-200 transition-colors flex items-center gap-1.5"
          >
            {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCss ? 'Copiado!' : 'Copiar CSS'}</span>
          </button>
          <pre>{generateCssVariables()}</pre>
        </div>
      </section>

    </div>
  );
};
