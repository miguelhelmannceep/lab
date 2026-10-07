export type ProjectCategory = 
  | 'restaurante' 
  | 'barbearia' 
  | 'academia' 
  | 'escritorio' 
  | 'ecommerce';

export type FontCategory = 'sans' | 'serif' | 'display';

export interface FontOption {
  id: string;
  name: string;
  category: FontCategory;
  weights: number[];
  googleFamily: string;
  description: string;
}

export type PopularityBadge = 
  | 'POPULAR' 
  | 'TIMELESS' 
  | 'WIDELY USED' 
  | 'DESIGN CLASSIC' 
  | 'COMMON PAIRING' 
  | 'TRENDING';

export type PairingFilter = 
  | 'ALL'
  | 'MODERN'
  | 'MINIMAL'
  | 'EDITORIAL'
  | 'LUXURY'
  | 'CORPORATE'
  | 'TECH'
  | 'SPORT'
  | 'CREATIVE'
  | 'FASHION';

export interface TypePairing {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: number;
  bodyWeight: number;
  category: PairingFilter;
  style: string;
  contrastLevel: 'Harmonic' | 'High' | 'Extreme' | 'Balanced';
  tags: string[];
  bestFor: string[];
  badge?: PopularityBadge;
  previewHeadline: string;
  previewBody: string;
  previewCta: string;
  lineHeight?: number;
  letterSpacing?: number;
}

export type ColorPaletteCategory = 
  | 'minimal' 
  | 'warm' 
  | 'cool' 
  | 'natural' 
  | 'luxury' 
  | 'vibrant' 
  | 'experimental'
  | string;

export interface FontPairing {
  id: string;
  name: string;
  style: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: number;
  bodyWeight: number;
  description: string;
}

export type PaletteCategoryRef = 
  | 'ALL'
  | 'MINIMAL' 
  | 'MONOCHROME' 
  | 'EARTHY' 
  | 'WARM' 
  | 'COOL' 
  | 'LUXURY' 
  | 'CORPORATE' 
  | 'NATURAL' 
  | 'VIBRANT' 
  | 'DARK' 
  | 'PASTEL' 
  | 'BOLD';

export interface ColorTokens {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
}

export interface ColorPaletteReference {
  id: string;
  name: string;
  colorList: string[]; // 4 to 6 hex strings
  category: Exclude<PaletteCategoryRef, 'ALL'>;
  style: string;
  contrast: string;
  tags: string[];
  bestFor: string[];
  badge?: PopularityBadge;
  tokens: ColorTokens;
}

// Full Design System Combo (Type + Color + Style + Best For)
export interface DesignSystemCombo {
  id: string;
  name: string;
  tagline: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: number;
  bodyWeight: number;
  letterSpacing: number;
  lineHeight: number;
  tokens: ColorTokens;
  colorNames: string[];
  style: string;
  tags: string[];
  bestFor: string[];
  suggestedProject: ProjectCategory;
  badge?: PopularityBadge;
}

export interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  headingWeight: number;
  bodyWeight: number;
  headingScale: number; // 0.8 to 1.5
  bodyScale: number; // 0.85 to 1.3
  lineHeight: number; // 1.0 to 1.8
  letterSpacing: number; // -0.05 to 0.15 (em)
  headingTransform: 'none' | 'uppercase' | 'capitalize';
}

export interface ColorPalette {
  id: string;
  name: string;
  category: string;
  description: string;
  colors: ColorTokens;
}

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  project: ProjectCategory;
  typography: TypographySettings;
  palette: ColorPalette;
}

export interface SavedSnapshot {
  id: string;
  timestamp: string;
  label: string;
  project: ProjectCategory;
  typography: TypographySettings;
  palette: ColorPalette;
}

export type DesignNiche = 
  | 'Restaurant'
  | 'Barber'
  | 'Gym'
  | 'Law Firm'
  | 'Architecture'
  | 'SaaS'
  | 'E-commerce'
  | 'Portfolio'
  | 'Agency'
  | 'Fashion'
  | 'Photography'
  | 'Personal Brand';

export type LabTab = 'projects' | 'type' | 'color' | 'combos' | 'saved';
export type ViewportMode = 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'full';
