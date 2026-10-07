import React, { useState } from 'react';
import { ProjectCategory, TypographySettings, ColorPalette, ViewportMode } from '../types';
import { RestaurantSite } from './projects/RestaurantSite';
import { BarberSite } from './projects/BarberSite';
import { GymSite } from './projects/GymSite';
import { OfficeSite } from './projects/OfficeSite';
import { EcommerceSite } from './projects/EcommerceSite';
import { Monitor, Tablet, Smartphone, Laptop, Maximize2, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Sparkles } from 'lucide-react';

interface Props {
  project: ProjectCategory;
  typography: TypographySettings;
  palette: ColorPalette;
  onNotify: (msg: string) => void;
  onOpenColor: () => void;
  onOpenType: () => void;
  onOpenPresets: () => void;
}

export const LivePreview: React.FC<Props> = ({
  project,
  typography,
  palette,
  onNotify,
  onOpenColor,
  onOpenType,
  onOpenPresets,
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Viewport width styling
  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return 'max-w-[390px]';
      case 'tablet': return 'max-w-[768px]';
      case 'laptop': return 'max-w-[1024px]';
      case 'desktop': return 'max-w-[1440px]';
      case 'full': return 'w-full';
    }
  };

  // Build the inline CSS variables style object
  const previewCustomStyles = {
    '--color-background': palette.colors.background,
    '--color-surface': palette.colors.surface,
    '--color-primary': palette.colors.primary,
    '--color-secondary': palette.colors.secondary,
    '--color-accent': palette.colors.accent,
    '--color-text': palette.colors.text,
    '--color-muted': palette.colors.muted,
    '--color-border': palette.colors.border,
    '--font-heading': `"${typography.headingFont}", serif, sans-serif`,
    '--font-body': `"${typography.bodyFont}", sans-serif`,
    '--heading-weight': typography.headingWeight,
    '--body-weight': typography.bodyWeight,
    '--line-height': typography.lineHeight,
    '--letter-spacing': `${typography.letterSpacing}em`,
  } as React.CSSProperties;

  const renderActiveSite = () => {
    switch (project) {
      case 'restaurante': return <RestaurantSite onNotify={onNotify} />;
      case 'barbearia': return <BarberSite onNotify={onNotify} />;
      case 'academia': return <GymSite onNotify={onNotify} />;
      case 'escritorio': return <OfficeSite onNotify={onNotify} />;
      case 'ecommerce': return <EcommerceSite onNotify={onNotify} />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-24">
      
      {/* Top Laboratory Toolbar: Device Switchers, Zoom, Canvas Info */}
      <div className="w-full max-w-[1920px] px-4 lg:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-b border-white/[0.06] bg-[#090a0f]/80 backdrop-blur sticky top-26 z-20">
        
        {/* Left: Metadata status */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
            PREVIEW / 01
          </span>
          <div className="hidden sm:flex items-center gap-2 text-zinc-300">
            <span className="text-zinc-600">CANVAS:</span>
            <span className="font-semibold text-zinc-200 uppercase">{project}</span>
            <span className="text-zinc-600">•</span>
            <span>{typography.headingFont} ({typography.headingWeight})</span>
            <span className="text-zinc-600">•</span>
            <span>{palette.name}</span>
          </div>
        </div>

        {/* Center: Device Viewport Toggle Buttons */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-900 border border-white/10">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded transition-colors ${viewport === 'desktop' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Desktop 1440px"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('laptop')}
            className={`p-1.5 rounded transition-colors ${viewport === 'laptop' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Laptop 1024px"
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded transition-colors ${viewport === 'tablet' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Tablet 768px"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded transition-colors ${viewport === 'mobile' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Mobile 390px"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('full')}
            className={`p-1.5 rounded transition-colors ${viewport === 'full' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            title="Full Width 100%"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Quick Zoom controls */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-[11px]">
            <button
              onClick={() => setZoomScale(Math.max(0.7, zoomScale - 0.1))}
              className="hover:text-white px-1"
              title="Diminuir Zoom"
            >
              -
            </button>
            <span className="text-zinc-300 font-bold px-1.5">{Math.round(zoomScale * 100)}%</span>
            <button
              onClick={() => setZoomScale(Math.min(1.2, zoomScale + 0.1))}
              className="hover:text-white px-1"
              title="Aumentar Zoom"
            >
              +
            </button>
          </div>

          <button
            onClick={() => { setZoomScale(1); setViewport('desktop'); }}
            className="p-1.5 rounded hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Resetar visualização"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area with subtle studio grid backdrop */}
      <div className="w-full flex-1 flex justify-center py-8 px-2 sm:px-6 lab-grid-bg overflow-x-auto">
        <div 
          className={`w-full ${getViewportWidth()} transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-white/10`}
          style={{
            transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
            transformOrigin: 'top center',
            ...previewCustomStyles
          }}
        >
          {/* Simulated Browser Frame */}
          <div 
            className="py-2.5 px-4 border-b flex items-center justify-between text-xs font-mono select-none"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-muted)'
            }}
          >
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* URL bar simulation */}
            <div 
              className="px-4 py-1 rounded-md text-[11px] truncate max-w-sm sm:max-w-md border"
              style={{ 
                backgroundColor: 'var(--color-background)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)'
              }}
            >
              https://{project}.lab.visual/{project === 'restaurante' ? 'casanera' : project === 'barbearia' ? 'northbarber' : project === 'academia' ? 'forgetraining' : project === 'escritorio' ? 'nova-associados' : 'form-objects'}
            </div>

            {/* Viewport label */}
            <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--color-accent)' }}>
              {viewport}
            </div>
          </div>

          {/* Render Actual Demonstration Site */}
          <div className="overflow-x-hidden">
            {renderActiveSite()}
          </div>
        </div>
      </div>

      {/* Floating Quick Action Bar at the bottom of the screen */}
      <div className="fixed bottom-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-zinc-950/90 border border-white/15 backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onOpenPresets}
          className="px-4 py-2 rounded-full text-xs font-mono font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Presets (1-Click)</span>
        </button>

        <div className="w-[1px] h-4 bg-white/15" />

        <button
          onClick={onOpenColor}
          className="px-4 py-2 rounded-full text-xs font-mono font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ backgroundColor: palette.colors.primary }} />
          <span>Trocar Paleta ({palette.name})</span>
        </button>

        <div className="w-[1px] h-4 bg-white/15" />

        <button
          onClick={onOpenType}
          className="px-4 py-2 rounded-full text-xs font-mono font-semibold text-zinc-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <span>Tipografia ({typography.headingFont})</span>
        </button>
      </div>

    </div>
  );
};
