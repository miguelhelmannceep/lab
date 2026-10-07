import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Star, Heart, Check, Filter } from 'lucide-react';

interface Props {
  onNotify?: (msg: string) => void;
}

export const EcommerceSite: React.FC<Props> = ({ onNotify }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ceramics' | 'lighting' | 'seating'>('all');
  const [cartCount, setCartCount] = useState(2);
  const [newsletterSent, setNewsletterSent] = useState(false);

  const products = [
    {
      id: '1',
      category: 'ceramics',
      name: 'Vessel No. 04 in Matte Sand',
      price: '€ 140',
      tag: 'NEW ARRIVAL',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=700&q=80',
      material: 'Grés Cerâmico Torrado'
    },
    {
      id: '2',
      category: 'lighting',
      name: 'Pendant Lamp in Spun Brass',
      price: '€ 320',
      tag: 'BESTSELLER',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
      material: 'Latão Maciço Polido'
    },
    {
      id: '3',
      category: 'seating',
      name: 'Lounge Chair 01 in Raw Linen',
      price: '€ 890',
      tag: 'LIMITED EDITION',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
      material: 'Madeira Maciça & Linho Puro'
    },
    {
      id: '4',
      category: 'ceramics',
      name: 'Architectural Plate Set (6pcs)',
      price: '€ 210',
      tag: 'ARTISANAL',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80',
      material: 'Porcelana Não-Esmaltada'
    },
    {
      id: '5',
      category: 'lighting',
      name: 'Monolith Table Lamp',
      price: '€ 260',
      tag: 'STUDIO CRAFT',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=80',
      material: 'Base de Travertino Romano'
    },
    {
      id: '6',
      category: 'seating',
      name: 'Stool 02 in Ebonized Ash',
      price: '€ 380',
      tag: 'MINIMAL',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=700&q=80',
      material: 'Freixo Ebonizado a Fogo'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    if (onNotify) onNotify(`"${productName}" adicionado à sua sacola.`);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSent(true);
    if (onNotify) onNotify(`Inscrição confirmada na Journal FORM OBJECTS.`);
    setTimeout(() => setNewsletterSent(false), 5000);
  };

  return (
    <div className="w-full preview-theme-scope min-h-screen">
      {/* Top Banner */}
      <div 
        className="w-full py-2.5 px-6 text-center text-[11px] tracking-[0.2em] uppercase border-b transition-colors"
        style={{ 
          borderColor: 'var(--color-border)', 
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-muted)' 
        }}
      >
        <span>Worldwide Express Shipping • Complimentary over €250</span>
      </div>

      {/* Navigation */}
      <header 
        className="px-6 md:px-12 py-6 border-b flex items-center justify-between sticky top-0 z-10 backdrop-blur-md"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'color-mix(in srgb, var(--color-background) 88%, transparent)'
        }}
      >
        <div className="flex items-center gap-8">
          <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            FORM OBJECTS
          </span>
          <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
            <a href="#collection" className="hover:opacity-80">Collection</a>
            <a href="#ceramics" className="hover:opacity-80">Ceramics</a>
            <a href="#lighting" className="hover:opacity-80">Lighting</a>
            <a href="#editorial" className="hover:opacity-80">Studio Journal</a>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={() => {
              if (onNotify) onNotify(`Sua sacola contém ${cartCount} itens.`);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded border text-xs uppercase tracking-wider font-medium transition-colors"
            style={{ 
              borderColor: 'var(--color-border)', 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)' 
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--color-accent)' }}>
              Autumn / Winter 2026 Collection
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight" style={{ color: 'var(--color-text)' }}>
              OBJECTS FOR EVERYDAY LIFE.
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-xl font-light" style={{ color: 'var(--color-muted)' }}>
              Desenhamos artefatos atemporais que habitam a fronteira entre escultura e utilidade. Feitos à mão na Europa com matérias-primas puras e rastreáveis.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="#collection"
                className="px-8 py-3.5 rounded text-xs font-semibold uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-sm inline-flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#highlight"
                className="px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-widest border"
                style={{ 
                  borderColor: 'var(--color-border)', 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)' 
                }}
              >
                Read Manifesto
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border aspect-[4/5] shadow-2xl relative group" style={{ borderColor: 'var(--color-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80" 
                alt="Objetos e Vasos Esculturais" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80"
                style={{ backgroundImage: `linear-gradient(to top, var(--color-background), transparent 60%)` }}
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded border backdrop-blur-md"
                style={{ 
                  backgroundColor: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-bold" style={{ color: 'var(--color-text)' }}>Vessel No. 04 in Matte Sand</span>
                  <span className="font-mono font-bold" style={{ color: 'var(--color-accent)' }}>€ 140</span>
                </div>
                <div className="text-[11px] mt-1" style={{ color: 'var(--color-muted)' }}>Feito à mão em estúdio artesanal em Copenhague.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid & Filter */}
      <section id="collection" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--color-accent)' }}>
                Catalog
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>
                CURATED PIECES
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 mt-4 sm:mt-0 overflow-x-auto pb-1">
              {(['all', 'ceramics', 'lighting', 'seating'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-4 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all"
                  style={{
                    backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-background)',
                    color: selectedCategory === cat ? 'var(--color-background)' : 'var(--color-muted)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(p => (
              <div 
                key={p.id}
                className="group border rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl"
                style={{ 
                  backgroundColor: 'var(--color-background)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest"
                    style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
                  >
                    {p.tag}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-muted)' }}>{p.material}</div>
                    <h3 className="font-heading text-base font-bold" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
                  </div>

                  <div className="pt-4 mt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="font-mono text-base font-bold" style={{ color: 'var(--color-text)' }}>{p.price}</span>
                    <button 
                      onClick={() => handleAddToCart(p.name)}
                      className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                      style={{ 
                        backgroundColor: 'var(--color-primary)', 
                        color: 'var(--color-background)' 
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Feature */}
      <section id="highlight" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--color-accent)' }}>
              Philosophy & Sourcing
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
              MATERIALITY IN AN AGE OF SPEED.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Cada peça passa por um processo de cura manual de 4 semanas. Rejeitamos acabamentos sintéticos em favor de ceras vegetais, óleos naturais de linhaça e oxidação natural do bronze.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text)' }}>
              <span>• Zero Plástico no Envio</span>
              <span>• Rastreabilidade 100%</span>
              <span>• Garantia Vitalícia de Reparo</span>
            </div>
          </div>
          <div className="lg:col-span-6 rounded-xl overflow-hidden border aspect-[16/10]" style={{ borderColor: 'var(--color-border)' }}>
            <img 
              src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1000&q=80" 
              alt="Ateliê de Design de Interiores" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-12 py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--color-accent)' }}>
            The Form Journal
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
            RECEIVE MONTHLY ESSAYS ON DESIGN & SPACES
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Lançamentos restritos, entrevistas com ceramistas e ensaios fotográficos exclusivos.
          </p>

          {newsletterSent ? (
            <div className="p-4 rounded border text-xs font-semibold" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-text)' }}>
              Obrigado por se inscrever na nossa publicação editorial.
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto pt-2">
              <input 
                type="email" 
                placeholder="seu.email@dominio.com"
                required
                className="flex-1 px-4 py-3 rounded border text-xs outline-none"
                style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
              <button 
                type="submit"
                className="px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
        style={{ 
          borderColor: 'var(--color-border)', 
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-muted)' 
        }}
      >
        <span className="font-heading font-bold" style={{ color: 'var(--color-text)' }}>
          FORM OBJECTS STUDIO © 2026 • COPENHAGEN / BERLIN
        </span>
        <div className="flex items-center gap-6">
          <span>Terms & Shipping</span>
          <span>Archived Drops</span>
          <span>Stockists</span>
        </div>
      </footer>
    </div>
  );
};
