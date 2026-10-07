import React, { useState, useEffect } from 'react';
import { 
  ProjectCategory, 
  TypographySettings, 
  ColorPalette, 
  TypePairing, 
  ColorPaletteReference, 
  DesignSystemCombo, 
  LabTab 
} from './types';
import { PALETTES } from './data/palettes';
import { POPULAR_TYPE_PAIRINGS } from './data/popularPairings';
import { REFERENCE_PALETTES } from './data/referencePalettes';
import { DESIGN_SYSTEM_COMBOS } from './data/designCombos';
import { PROJECTS } from './data/projects';
import { Header } from './components/Header';
import { LivePreview } from './components/LivePreview';
import { TypeSpecimen } from './components/TypeSpecimen';
import { ColorSystem } from './components/ColorSystem';
import { TypePairingsLibrary } from './components/combos/TypePairingsLibrary';
import { ColorPalettesLibrary } from './components/combos/ColorPalettesLibrary';
import { DesignCombosSection } from './components/combos/DesignCombosSection';
import { CompareModal3 } from './components/combos/CompareModal3';
import { MySavedSection } from './components/saved/MySavedSection';
import { TypographyPanel } from './components/TypographyPanel';
import { ColorPanel } from './components/ColorPanel';
import { PresetsModal } from './components/PresetsModal';
import { Check, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

export function App() {
  // 1. Core State
  const [currentProject, setCurrentProject] = useState<ProjectCategory>('restaurante');
  const [activeTab, setActiveTab] = useState<LabTab>('combos'); // Start at COMBOS to showcase the new feature immediately!

  // Sub-tab for Type (Pairings vs Specimen) and Color (Palettes vs Token System)
  const [typeSubTab, setTypeSubTab] = useState<'pairings' | 'specimen'>('pairings');
  const [colorSubTab, setColorSubTab] = useState<'palettes' | 'system'>('palettes');

  // Active Typography and Palette Tokens in the Lab
  const [typography, setTypography] = useState<TypographySettings>({
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    headingWeight: 700,
    bodyWeight: 400,
    headingScale: 1.05,
    bodyScale: 1.0,
    lineHeight: 1.15,
    letterSpacing: -0.02,
    headingTransform: 'none',
  });

  const [palette, setPalette] = useState<ColorPalette>(
    PALETTES.find(p => p.id === 'warm-burgundy-cream') || PALETTES[3]
  );

  // Drawers and Modals
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 2. Favorites / Saved System (Persisted in LocalStorage)
  const [savedComboIds, setSavedComboIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('typelab_saved_combos');
      return stored ? JSON.parse(stored) : ['combo-editorial-luxury', 'combo-modern-tech'];
    } catch {
      return ['combo-editorial-luxury', 'combo-modern-tech'];
    }
  });

  const [savedPairingIds, setSavedPairingIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('typelab_saved_pairings');
      return stored ? JSON.parse(stored) : ['modern-minimal', 'editorial-classic'];
    } catch {
      return ['modern-minimal', 'editorial-classic'];
    }
  });

  const [savedPaletteIds, setSavedPaletteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('typelab_saved_palettes');
      return stored ? JSON.parse(stored) : ['palette-burgundy-cream', 'palette-black-lime'];
    } catch {
      return ['palette-burgundy-cream', 'palette-black-lime'];
    }
  });

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem('typelab_saved_combos', JSON.stringify(savedComboIds));
    } catch {}
  }, [savedComboIds]);

  useEffect(() => {
    try {
      localStorage.setItem('typelab_saved_pairings', JSON.stringify(savedPairingIds));
    } catch {}
  }, [savedPairingIds]);

  useEffect(() => {
    try {
      localStorage.setItem('typelab_saved_palettes', JSON.stringify(savedPaletteIds));
    } catch {}
  }, [savedPaletteIds]);

  // 3. Comparison Queue (Max 3 items)
  const [compareComboIds, setCompareComboIds] = useState<string[]>([
    'combo-editorial-luxury',
    'combo-modern-tech',
    'combo-high-energy'
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Handle Applying a Type Pairing
  const handleApplyPairing = (pairing: TypePairing) => {
    setTypography(prev => ({
      ...prev,
      headingFont: pairing.headingFont,
      bodyFont: pairing.bodyFont,
      headingWeight: pairing.headingWeight,
      bodyWeight: pairing.bodyWeight,
      letterSpacing: pairing.letterSpacing !== undefined ? pairing.letterSpacing : prev.letterSpacing,
      lineHeight: pairing.lineHeight !== undefined ? pairing.lineHeight : prev.lineHeight,
    }));
    showToast(`Combinação tipográfica "${pairing.name}" aplicada ao Live Preview.`);
  };

  // Handle Applying a Reference Palette
  const handleApplyPalette = (palRef: ColorPaletteReference) => {
    const newPal: ColorPalette = {
      id: palRef.id,
      name: palRef.name,
      category: palRef.category,
      description: palRef.style,
      colors: { ...palRef.tokens },
    };
    setPalette(newPal);
    showToast(`Paleta de cores "${palRef.name}" aplicada.`);
  };

  // Handle Applying a Complete Combo
  const handleApplyCombo = (combo: DesignSystemCombo) => {
    setTypography({
      headingFont: combo.headingFont,
      bodyFont: combo.bodyFont,
      headingWeight: combo.headingWeight,
      bodyWeight: combo.bodyWeight,
      headingScale: 1.05,
      bodyScale: 1.0,
      lineHeight: combo.lineHeight,
      letterSpacing: combo.letterSpacing,
      headingTransform: 'none',
    });

    const newPal: ColorPalette = {
      id: combo.id,
      name: combo.name,
      category: combo.style,
      description: combo.tagline,
      colors: { ...combo.tokens },
    };
    setPalette(newPal);

    if (combo.suggestedProject) {
      setCurrentProject(combo.suggestedProject);
    }

    showToast(`Combo completo "${combo.name}" aplicado! Direção visual definida.`);
  };

  // Toggle Save Favorites
  const handleToggleSaveCombo = (combo: DesignSystemCombo) => {
    setSavedComboIds(prev => {
      const exists = prev.includes(combo.id);
      const next = exists ? prev.filter(id => id !== combo.id) : [...prev, combo.id];
      showToast(exists ? `Removido dos salvos: ${combo.name}` : `Salvo nos favoritos: ${combo.name}`);
      return next;
    });
  };

  const handleToggleSavePairing = (pairing: TypePairing) => {
    setSavedPairingIds(prev => {
      const exists = prev.includes(pairing.id);
      const next = exists ? prev.filter(id => id !== pairing.id) : [...prev, pairing.id];
      showToast(exists ? `Removido dos salvos: ${pairing.name}` : `Salvo nos favoritos: ${pairing.name}`);
      return next;
    });
  };

  const handleToggleSavePalette = (palRef: ColorPaletteReference) => {
    setSavedPaletteIds(prev => {
      const exists = prev.includes(palRef.id);
      const next = exists ? prev.filter(id => id !== palRef.id) : [...prev, palRef.id];
      showToast(exists ? `Removido dos salvos: ${palRef.name}` : `Salvo nos favoritos: ${palRef.name}`);
      return next;
    });
  };

  // Toggle Compare (Max 3)
  const handleToggleCompareCombo = (combo: DesignSystemCombo) => {
    setCompareComboIds(prev => {
      if (prev.includes(combo.id)) {
        return prev.filter(id => id !== combo.id);
      }
      if (prev.length >= 3) {
        showToast('Máximo de 3 opções na comparação. Remova uma para adicionar outra.');
        return prev;
      }
      const next = [...prev, combo.id];
      showToast(`Adicionado à comparação: ${combo.name} (${next.length}/3)`);
      return next;
    });
  };

  const handleToggleComparePairing = (pairing: TypePairing) => {
    // Find or create synthetic combo for pairing
    const matchingCombo = DESIGN_SYSTEM_COMBOS.find(c => c.headingFont === pairing.headingFont) || DESIGN_SYSTEM_COMBOS[0];
    handleToggleCompareCombo(matchingCombo);
  };

  const handleToggleComparePalette = (palRef: ColorPaletteReference) => {
    const matchingCombo = DESIGN_SYSTEM_COMBOS.find(c => c.tokens.primary === palRef.tokens.primary) || DESIGN_SYSTEM_COMBOS[0];
    handleToggleCompareCombo(matchingCombo);
  };

  const handleRemoveCompare = (id: string) => {
    setCompareComboIds(prev => prev.filter(i => i !== id));
  };

  const handleClearAllSaved = () => {
    setSavedComboIds([]);
    setSavedPairingIds([]);
    setSavedPaletteIds([]);
    showToast('Todos os favoritos foram limpos.');
  };

  // Get hydrated lists for saved items
  const savedCombosList = DESIGN_SYSTEM_COMBOS.filter(c => savedComboIds.includes(c.id));
  const savedPairingsList = POPULAR_TYPE_PAIRINGS.filter(p => savedPairingIds.includes(p.id));
  const savedPalettesList = REFERENCE_PALETTES.filter(p => savedPaletteIds.includes(p.id));
  const totalSavedCount = savedCombosList.length + savedPairingsList.length + savedPalettesList.length;

  // Hydrated compare list
  const activeCompareCombos = DESIGN_SYSTEM_COMBOS.filter(c => compareComboIds.includes(c.id));

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return next;
    });
  };

  return (
    <div className={`min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans transition-colors ${isDarkMode ? 'dark' : 'light'}`}>
      
      {/* 1. Header with Primary Tabs (PROJECTS | TYPE | COLOR | COMBOS | SAVED) */}
      <Header
        currentProject={currentProject}
        onSelectProject={setCurrentProject}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isColorOpen={isColorOpen}
        onToggleColor={() => setIsColorOpen(prev => !prev)}
        isTypeOpen={isTypeOpen}
        onToggleType={() => setIsTypeOpen(prev => !prev)}
        isPresetsOpen={isPresetsOpen}
        onTogglePresets={() => setIsPresetsOpen(prev => !prev)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        savedTotalCount={totalSavedCount}
        compareCount={compareComboIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        currentColorHex={palette.colors.primary}
        currentHeadingFont={typography.headingFont}
      />

      {/* 2. Main Body Content */}
      <main className="flex-1 pt-28">
        
        {/* TAB 1: PROJECTS & LIVE PREVIEW */}
        {activeTab === 'projects' && (
          <LivePreview
            project={currentProject}
            typography={typography}
            palette={palette}
            onNotify={showToast}
            onOpenColor={() => setIsColorOpen(true)}
            onOpenType={() => setIsTypeOpen(true)}
            onOpenPresets={() => setIsPresetsOpen(true)}
          />
        )}

        {/* TAB 2: TYPE (PAIRINGS LIBRARY + SPECIMEN) */}
        {activeTab === 'type' && (
          <div className="space-y-6">
            <div className="max-w-[1920px] mx-auto px-4 lg:px-8 pt-4 flex gap-2">
              <button
                onClick={() => setTypeSubTab('pairings')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  typeSubTab === 'pairings'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                TYPE PAIRINGS LIBRARY
              </button>
              <button
                onClick={() => setTypeSubTab('specimen')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  typeSubTab === 'specimen'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                TYPE SPECIMEN LAB
              </button>
            </div>

            {typeSubTab === 'pairings' ? (
              <TypePairingsLibrary
                onApplyPairing={handleApplyPairing}
                savedPairingIds={savedPairingIds}
                onToggleSavePairing={handleToggleSavePairing}
                comparePairingIds={compareComboIds}
                onToggleComparePairing={handleToggleComparePairing}
              />
            ) : (
              <TypeSpecimen typography={typography} palette={palette} />
            )}
          </div>
        )}

        {/* TAB 3: COLOR (PALETTES LIBRARY + COLOR SYSTEM) */}
        {activeTab === 'color' && (
          <div className="space-y-6">
            <div className="max-w-[1920px] mx-auto px-4 lg:px-8 pt-4 flex gap-2">
              <button
                onClick={() => setColorSubTab('palettes')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  colorSubTab === 'palettes'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                COLOR PALETTES LIBRARY
              </button>
              <button
                onClick={() => setColorSubTab('system')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  colorSubTab === 'system'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                COLOR SYSTEM TOKENS (WCAG &amp; CSS)
              </button>
            </div>

            {colorSubTab === 'palettes' ? (
              <ColorPalettesLibrary
                onApplyPalette={handleApplyPalette}
                savedPaletteIds={savedPaletteIds}
                onToggleSavePalette={handleToggleSavePalette}
                comparePaletteIds={compareComboIds}
                onToggleComparePalette={handleToggleComparePalette}
                onCopyHex={(hex) => showToast(`HEX copiado: ${hex}`)}
              />
            ) : (
              <ColorSystem
                palette={palette}
                onCopyColor={(hex) => showToast(`HEX copiado: ${hex}`)}
              />
            )}
          </div>
        )}

        {/* TAB 4: COMBOS (POPULAR COMBINATIONS + "WHAT ARE YOU DESIGNING?") */}
        {activeTab === 'combos' && (
          <DesignCombosSection
            onApplyCombo={handleApplyCombo}
            savedComboIds={savedComboIds}
            onToggleSaveCombo={handleToggleSaveCombo}
            compareComboIds={compareComboIds}
            onToggleCompareCombo={handleToggleCompareCombo}
          />
        )}

        {/* TAB 5: SAVED (FAVORITES & COMPARE TRIGGER) */}
        {activeTab === 'saved' && (
          <MySavedSection
            savedCombos={savedCombosList}
            savedPairings={savedPairingsList}
            savedPalettes={savedPalettesList}
            onApplyCombo={handleApplyCombo}
            onApplyPairing={handleApplyPairing}
            onApplyPalette={handleApplyPalette}
            onRemoveCombo={(id) => setSavedComboIds(prev => prev.filter(i => i !== id))}
            onRemovePairing={(id) => setSavedPairingIds(prev => prev.filter(i => i !== id))}
            onRemovePalette={(id) => setSavedPaletteIds(prev => prev.filter(i => i !== id))}
            onClearAll={handleClearAllSaved}
            onOpenCompare={() => setIsCompareModalOpen(true)}
            compareCount={compareComboIds.length}
          />
        )}

      </main>

      {/* Floating View Live Preview Button (when not on projects tab) */}
      {activeTab !== 'projects' && (
        <button
          onClick={() => setActiveTab('projects')}
          className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-transform hover:-translate-y-1"
        >
          <span>VER NO SITE REAL ({PROJECTS[currentProject].name})</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      )}

      {/* 3-Way Compare Modal */}
      <CompareModal3
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedCombos={activeCompareCombos}
        onRemoveCombo={handleRemoveCompare}
        onApplyCombo={handleApplyCombo}
      />

      {/* Slide-over Drawers */}
      <TypographyPanel
        isOpen={isTypeOpen}
        onClose={() => setIsTypeOpen(false)}
        typography={typography}
        onChange={setTypography}
        onApplyPairing={(p) => {
          handleApplyPairing({
            id: p.id,
            name: p.name,
            headingFont: p.headingFont,
            bodyFont: p.bodyFont,
            headingWeight: p.headingWeight,
            bodyWeight: p.bodyWeight,
            category: 'ALL',
            style: p.style,
            contrastLevel: 'High',
            tags: [],
            bestFor: [],
            previewHeadline: '',
            previewBody: '',
            previewCta: '',
          });
        }}
      />

      <ColorPanel
        isOpen={isColorOpen}
        onClose={() => setIsColorOpen(false)}
        palette={palette}
        onChangePalette={setPalette}
        onCopyColor={(hex) => showToast(`HEX copiado: ${hex}`)}
      />

      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={(preset) => {
          setCurrentProject(preset.project);
          setTypography(preset.typography);
          setPalette(preset.palette);
          showToast(`Preset "${preset.name}" carregado.`);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-zinc-950/95 border border-white/20 text-zinc-100 text-xs font-mono shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-200">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

export default App;
