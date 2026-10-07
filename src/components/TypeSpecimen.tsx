import React, { useState } from 'react';
import { TypographySettings, ColorPalette } from '../types';
import { Type, Sparkles, Sliders, AlignLeft, Check } from 'lucide-react';

interface Props {
  typography: TypographySettings;
  palette: ColorPalette;
}

export const TypeSpecimen: React.FC<Props> = ({ typography, palette }) => {
  const [customText, setCustomText] = useState('Design is not decoration. It is communication.');

  const sampleGlyphs = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-300">
      
      {/* Specimen Header & Technical Metadata */}
      <div className="border-b pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              SPECIMEN / 02
            </span>
            <span className="text-xs font-mono text-zinc-500">LABORATÓRIO TIPOGRÁFICO</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100" style={{ fontFamily: typography.headingFont }}>
            {typography.headingFont}
          </h1>
          <p className="text-sm text-zinc-400 mt-1 font-mono">
            Emparelhada com <span className="text-amber-400 font-semibold">{typography.bodyFont}</span> para texto corrido e interfaces.
          </p>
        </div>

        {/* Technical Specs Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10">
            Heading Weight: <strong className="text-zinc-200">{typography.headingWeight}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10">
            Body Weight: <strong className="text-zinc-200">{typography.bodyWeight}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10">
            Tracking: <strong className="text-zinc-200">{typography.letterSpacing.toFixed(3)}em</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10">
            Line-Height: <strong className="text-zinc-200">{typography.lineHeight.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      {/* 1. Massive Glyph Aa Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-2xl border"
        style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderColor: 'var(--color-border)' 
        }}
      >
        <div className="lg:col-span-5 text-center lg:text-left">
          <div 
            className="text-8xl sm:text-9xl md:text-[14rem] font-bold leading-none select-none tracking-tighter"
            style={{ 
              fontFamily: typography.headingFont,
              fontWeight: typography.headingWeight,
              color: 'var(--color-primary)'
            }}
          >
            Aa
          </div>
          <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mt-4">
            {typography.headingFont} • Glyphs &amp; Contrast
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Caixa Alta (Uppercase)</span>
            <div 
              className="text-lg md:text-xl font-bold tracking-wider break-all text-zinc-200"
              style={{ fontFamily: typography.headingFont, fontWeight: typography.headingWeight }}
            >
              {sampleGlyphs.uppercase}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Caixa Baixa (Lowercase)</span>
            <div 
              className="text-lg md:text-xl tracking-normal break-all text-zinc-300"
              style={{ fontFamily: typography.headingFont, fontWeight: typography.headingWeight }}
            >
              {sampleGlyphs.lowercase}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Numeral &amp; Símbolos</span>
            <div 
              className="text-lg md:text-xl font-mono tracking-wider text-amber-400/90"
              style={{ fontFamily: typography.headingFont }}
            >
              {sampleGlyphs.numbers} <span className="text-zinc-500 mx-2">•</span> {sampleGlyphs.symbols}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Statement Headline */}
      <section className="p-8 md:p-14 rounded-2xl border text-center space-y-6"
        style={{ 
          backgroundColor: 'var(--color-background)', 
          borderColor: 'var(--color-border)' 
        }}
      >
        <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
          Manifesto Editorial
        </span>

        <h2 
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] max-w-5xl mx-auto transition-all"
          style={{ 
            fontFamily: typography.headingFont,
            fontWeight: typography.headingWeight,
            letterSpacing: `${typography.letterSpacing}em`,
            lineHeight: typography.lineHeight,
            textTransform: typography.headingTransform,
            color: 'var(--color-text)'
          }}
        >
          {customText}
        </h2>

        <p 
          className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed pt-2"
          style={{ 
            fontFamily: typography.bodyFont,
            fontWeight: typography.bodyWeight,
            color: 'var(--color-muted)' 
          }}
        >
          Tipografia é a infraestrutura silenciosa de qualquer experiência de produto. Ela dita a autoridade, a cadência da leitura e a confiança perceptiva antes mesmo da compreensão da primeira frase.
        </p>

        {/* Live Input to test anything */}
        <div className="max-w-xl mx-auto pt-4">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5 text-left">
            Teste sua própria frase em tempo real:
          </label>
          <input 
            type="text" 
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border bg-zinc-900 text-zinc-100 text-sm outline-none font-mono focus:border-amber-500/60 transition-colors"
            placeholder="Digite qualquer texto para testar..."
          />
        </div>
      </section>

      {/* 3. Hierarchical UI Scale Specimen */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
            Escala Hierárquica de Interface (Type Hierarchy)
          </h3>
          <span className="text-xs font-mono text-zinc-500">UI DESIGN TOKENS</span>
        </div>

        <div className="space-y-6 divide-y" style={{ borderColor: 'var(--color-border)' }}>
          
          {/* Display */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <div className="md:col-span-3 text-xs font-mono text-zinc-500">
              <span className="block font-bold text-zinc-400">Display 01</span>
              <span>4rem • {typography.headingFont}</span>
            </div>
            <div className="md:col-span-9">
              <span 
                className="text-4xl md:text-5xl font-bold tracking-tight block"
                style={{ 
                  fontFamily: typography.headingFont,
                  fontWeight: typography.headingWeight,
                  color: 'var(--color-text)'
                }}
              >
                Direção de Arte &amp; Rigor Gráfico
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <div className="md:col-span-3 text-xs font-mono text-zinc-500">
              <span className="block font-bold text-zinc-400">Heading (H1/H2)</span>
              <span>2.25rem • {typography.headingFont}</span>
            </div>
            <div className="md:col-span-9">
              <span 
                className="text-2xl md:text-3xl font-bold block"
                style={{ 
                  fontFamily: typography.headingFont,
                  fontWeight: typography.headingWeight,
                  color: 'var(--color-text)'
                }}
              >
                Construindo Sistemas Visuais com Alma e Propósito
              </span>
            </div>
          </div>

          {/* Subheading */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <div className="md:col-span-3 text-xs font-mono text-zinc-500">
              <span className="block font-bold text-zinc-400">Subheading</span>
              <span>1.25rem • {typography.headingFont}</span>
            </div>
            <div className="md:col-span-9">
              <span 
                className="text-xl font-semibold block"
                style={{ 
                  fontFamily: typography.headingFont,
                  color: 'var(--color-accent)'
                }}
              >
                Equilíbrio harmônico entre densidade de informação e espaço em branco.
              </span>
            </div>
          </div>

          {/* Paragraph */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <div className="md:col-span-3 text-xs font-mono text-zinc-500">
              <span className="block font-bold text-zinc-400">Paragraph (Body)</span>
              <span>1rem • {typography.bodyFont}</span>
            </div>
            <div className="md:col-span-9">
              <p 
                className="text-base leading-relaxed max-w-3xl font-normal"
                style={{ 
                  fontFamily: typography.bodyFont,
                  fontWeight: typography.bodyWeight,
                  color: 'var(--color-text)'
                }}
              >
                A tipografia não existe no vácuo. Quando aplicada a produtos digitais reais, ela precisa sustentar parágrafos densos, manter legibilidade sob fundos escuros ou claros, e guiar o olho do usuário sem gerar fadiga cognitiva.
              </p>
            </div>
          </div>

          {/* Caption & Metadata */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <div className="md:col-span-3 text-xs font-mono text-zinc-500">
              <span className="block font-bold text-zinc-400">Caption / Metadata</span>
              <span>0.75rem • {typography.bodyFont}</span>
            </div>
            <div className="md:col-span-9">
              <span 
                className="text-xs uppercase tracking-widest block font-medium"
                style={{ 
                  fontFamily: typography.bodyFont,
                  color: 'var(--color-muted)'
                }}
              >
                Publicado em Outubro 2026 • Curadoria Editorial • Revisão 04
              </span>
            </div>
          </div>

          {/* Button & Interactive Elements */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 text-xs font-mono text-zinc-500">
              <span className="block font-bold text-zinc-400">Button CTA</span>
              <span>Primary / Secondary</span>
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-4 items-center">
              <button 
                className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-transform hover:-translate-y-0.5"
                style={{ 
                  fontFamily: typography.bodyFont,
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                Iniciar Projeto
              </button>
              <button 
                className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors"
                style={{ 
                  fontFamily: typography.bodyFont,
                  borderColor: 'var(--color-border)', 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)' 
                }}
              >
                Explorar Portfólio
              </button>
            </div>
          </div>

          {/* Navigation Element */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 text-xs font-mono text-zinc-500">
              <span className="block font-bold text-zinc-400">Navigation</span>
              <span>Header Bar Links</span>
            </div>
            <div className="md:col-span-9 flex gap-6 text-xs uppercase tracking-widest font-semibold"
              style={{ fontFamily: typography.bodyFont, color: 'var(--color-muted)' }}
            >
              <span style={{ color: 'var(--color-primary)' }}>Visão Geral</span>
              <span className="hover:opacity-80 cursor-pointer">Metodologia</span>
              <span className="hover:opacity-80 cursor-pointer">Cases</span>
              <span className="hover:opacity-80 cursor-pointer">Contato</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
