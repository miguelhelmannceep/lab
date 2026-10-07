import { ProjectCategory } from '../types';

export interface ProjectMeta {
  id: ProjectCategory;
  name: string;
  brandName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  vibe: string;
  defaultHeading: string;
  defaultBody: string;
  defaultPaletteId: string;
  accentBadge: string;
}

export const PROJECTS: Record<ProjectCategory, ProjectMeta> = {
  restaurante: {
    id: 'restaurante',
    name: 'RESTAURANTE',
    brandName: 'CASA NERA',
    tagline: 'Alta Gastronomia & Terroir Contemporâneo',
    headline: 'COZINHA QUE FICA NA MEMÓRIA.',
    subheadline: 'Ingredientes de pequenos produtores agroecológicos, fogo a lenha e uma carta de vinhos curada safra por safra pelo nosso sommelier.',
    vibe: 'Editorial / Sofisticada / Gastronômica',
    defaultHeading: 'Playfair Display',
    defaultBody: 'Inter',
    defaultPaletteId: 'warm-burgundy-cream',
    accentBadge: 'Guia Michelin 2025 • 2 Estrelas',
  },
  barbearia: {
    id: 'barbearia',
    name: 'BARBEARIA',
    brandName: 'NORTH BARBER',
    tagline: 'Corte Tradicional & Lounge Urbano',
    headline: 'CORTE. PRESENÇA. IDENTIDADE.',
    subheadline: 'A precisão da navalha clássica em um ambiente projetado para homens que entendem que cuidado pessoal é postura e autoridade.',
    vibe: 'Masculina / Premium / Urbana',
    defaultHeading: 'Space Grotesk',
    defaultBody: 'Inter',
    defaultPaletteId: 'minimal-mono-dark',
    accentBadge: 'Desde 2017 • Jardins, SP',
  },
  academia: {
    id: 'academia',
    name: 'ACADEMIA',
    brandName: 'FORGE TRAINING',
    tagline: 'Performance Lab & High-Intensity Athleticism',
    headline: 'CONSTRUA UMA VERSÃO MAIS FORTE DE VOCÊ.',
    subheadline: 'Treinamento híbrido baseado em ciência biomecânica, monitoramento cardíaco em tempo real e equipamentos de nível olímpico.',
    vibe: 'Energética / Esportiva / Contemporânea',
    defaultHeading: 'Archivo Black',
    defaultBody: 'Inter',
    defaultPaletteId: 'vibrant-hyper-lime',
    accentBadge: 'Eleita Melhor Estrutura de Treino 2024',
  },
  escritorio: {
    id: 'escritorio',
    name: 'ESCRITÓRIO',
    brandName: 'NOVA & ASSOCIADOS',
    tagline: 'Advocacia Empresarial & Estratégia Corporativa',
    headline: 'ESTRATÉGIA PARA DECISÕES IMPORTANTES.',
    subheadline: 'Mais de 25 anos assessorando conselhos diretivos em fusões & aquisições, reestruturações patrimoniais e litígios de alta complexidade.',
    vibe: 'Minimalista / Institucional / Sofisticada',
    defaultHeading: 'Geist',
    defaultBody: 'Geist',
    defaultPaletteId: 'cool-ice-cobalt-light',
    accentBadge: 'Ranked Chambers Global Band 1',
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-COMMERCE',
    brandName: 'FORM OBJECTS',
    tagline: 'Curated Living & Everyday Artifacts',
    headline: 'OBJECTS FOR EVERYDAY LIFE.',
    subheadline: 'Mobiliário autoral, cerâmicas vitrificadas e luminárias desenhadas para envelhecer com dignidade e transformar o cotidiano.',
    vibe: 'Editorial / Fashion / Premium',
    defaultHeading: 'Cormorant Garamond',
    defaultBody: 'Manrope',
    defaultPaletteId: 'luxury-obsidian-gold',
    accentBadge: 'Coleção Outono/Inverno Liberada',
  },
};
