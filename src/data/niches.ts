import { DesignNiche, ProjectCategory } from '../types';

export interface NicheRecommendation {
  niche: DesignNiche;
  iconName: string;
  description: string;
  defaultProject: ProjectCategory;
  comboIds: string[];
  pairingIds: string[];
  paletteIds: string[];
}

export const NICHE_RECOMMENDATIONS: Record<DesignNiche, NicheRecommendation> = {
  'Restaurant': {
    niche: 'Restaurant',
    iconName: 'Utensils',
    description: 'Cozinha autoral, hospitalidade, cartas de vinhos e experiências sensoriais.',
    defaultProject: 'restaurante',
    comboIds: ['combo-premium-restaurant', 'combo-editorial-luxury', 'combo-artisan-clay'],
    pairingIds: ['editorial-classic', 'premium-heritage', 'literary-warmth'],
    paletteIds: ['palette-burgundy-cream', 'palette-forest-cream', 'palette-terracotta-sand'],
  },
  'Barber': {
    niche: 'Barber',
    iconName: 'Scissors',
    description: 'Cuidado masculino, navalha clássica, ambiente urbano e presença forte.',
    defaultProject: 'barbearia',
    comboIds: ['combo-urban-barber', 'combo-high-energy', 'combo-swiss-studio'],
    pairingIds: ['kinetic-power', 'modern-minimal', 'bold-impact'],
    paletteIds: ['palette-monochrome', 'palette-obsidian-gold', 'palette-black-lime'],
  },
  'Gym': {
    niche: 'Gym',
    iconName: 'Zap',
    description: 'Alta intensidade, performance atlética, superação e energia contagiante.',
    defaultProject: 'academia',
    comboIds: ['combo-high-energy', 'combo-modern-tech', 'combo-urban-barber'],
    pairingIds: ['bold-impact', 'kinetic-power', 'modern-minimal'],
    paletteIds: ['palette-black-lime', 'palette-neon-void', 'palette-monochrome'],
  },
  'Law Firm': {
    niche: 'Law Firm',
    iconName: 'Scale',
    description: 'Autoridade jurídica, segurança corporativa e aconselhamento de conselho.',
    defaultProject: 'escritorio',
    comboIds: ['combo-corporate-trust', 'combo-swiss-studio', 'combo-editorial-luxury'],
    pairingIds: ['classic-trust', 'swiss-purist', 'editorial-classic'],
    paletteIds: ['palette-navy-cream', 'palette-monochrome', 'palette-slate-cyan'],
  },
  'Architecture': {
    niche: 'Architecture',
    iconName: 'Building',
    description: 'Estruturas espaciais, luz natural, rigor de proporção e materiais puros.',
    defaultProject: 'escritorio',
    comboIds: ['combo-swiss-studio', 'combo-editorial-luxury', 'combo-artisan-clay'],
    pairingIds: ['swiss-purist', 'creative-editorial', 'premium-heritage'],
    paletteIds: ['palette-graphite-cream', 'palette-monochrome', 'palette-terracotta-sand'],
  },
  'SaaS': {
    niche: 'SaaS',
    iconName: 'Code',
    description: 'Plataformas digitais, infraestrutura na nuvem e interfaces de alta densidade.',
    defaultProject: 'escritorio',
    comboIds: ['combo-modern-tech', 'combo-swiss-studio', 'combo-high-energy'],
    pairingIds: ['modern-minimal', 'tech-engineering', 'geometric-friendly'],
    paletteIds: ['palette-cobalt-white', 'palette-slate-cyan', 'palette-monochrome'],
  },
  'E-commerce': {
    niche: 'E-commerce',
    iconName: 'ShoppingBag',
    description: 'Boutiques autorais, catálogo de produtos com curadoria e conversão estética.',
    defaultProject: 'ecommerce',
    comboIds: ['combo-editorial-luxury', 'combo-artisan-clay', 'combo-modern-tech'],
    pairingIds: ['premium-heritage', 'creative-editorial', 'fashion-curation'],
    paletteIds: ['palette-terracotta-sand', 'palette-obsidian-gold', 'palette-sage-oatmeal'],
  },
  'Portfolio': {
    niche: 'Portfolio',
    iconName: 'User',
    description: 'Mostra de trabalhos para designers, fotógrafos e diretores de arte.',
    defaultProject: 'ecommerce',
    comboIds: ['combo-swiss-studio', 'combo-editorial-luxury', 'combo-artisan-clay'],
    pairingIds: ['modern-minimal', 'swiss-purist', 'fashion-curation'],
    paletteIds: ['palette-monochrome', 'palette-graphite-cream', 'palette-forest-cream'],
  },
  'Agency': {
    niche: 'Agency',
    iconName: 'Compass',
    description: 'Estúdios criativos, publicidade estratégica e branding contemporâneo.',
    defaultProject: 'escritorio',
    comboIds: ['combo-modern-tech', 'combo-editorial-luxury', 'combo-swiss-studio'],
    pairingIds: ['fashion-curation', 'modern-minimal', 'creative-editorial'],
    paletteIds: ['palette-cobalt-white', 'palette-monochrome', 'palette-black-lime'],
  },
  'Fashion': {
    niche: 'Fashion',
    iconName: 'Sparkles',
    description: 'Alta moda, coleções sazonais, sensibilidade escultural e glamour.',
    defaultProject: 'ecommerce',
    comboIds: ['combo-editorial-luxury', 'combo-artisan-clay', 'combo-urban-barber'],
    pairingIds: ['premium-heritage', 'fashion-curation', 'editorial-classic'],
    paletteIds: ['palette-obsidian-gold', 'palette-burgundy-cream', 'palette-monochrome'],
  },
  'Photography': {
    niche: 'Photography',
    iconName: 'Camera',
    description: 'Ensaios visuais, galerias e foco absoluto no enquadramento e luz.',
    defaultProject: 'ecommerce',
    comboIds: ['combo-swiss-studio', 'combo-editorial-luxury', 'combo-artisan-clay'],
    pairingIds: ['swiss-purist', 'editorial-classic', 'modern-minimal'],
    paletteIds: ['palette-monochrome', 'palette-graphite-cream', 'palette-navy-cream'],
  },
  'Personal Brand': {
    niche: 'Personal Brand',
    iconName: 'Award',
    description: 'Especialistas, autores, consultores de liderança e criadores de conteúdo.',
    defaultProject: 'escritorio',
    comboIds: ['combo-corporate-trust', 'combo-swiss-studio', 'combo-editorial-luxury'],
    pairingIds: ['literary-warmth', 'classic-trust', 'modern-minimal'],
    paletteIds: ['palette-navy-cream', 'palette-graphite-cream', 'palette-forest-cream'],
  },
};
