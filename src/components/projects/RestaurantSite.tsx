import React, { useState } from 'react';
import { Utensils, Clock, MapPin, Calendar, Star, ChevronRight, Check, Wine, Award, ArrowUpRight } from 'lucide-react';

interface Props {
  onNotify?: (msg: string) => void;
}

export const RestaurantSite: React.FC<Props> = ({ onNotify }) => {
  const [selectedCourse, setSelectedCourse] = useState<'degustacao' | 'entradas' | 'principais' | 'sobremesas'>('degustacao');
  const [reservationDate, setReservationDate] = useState('2026-10-15');
  const [reservationGuests, setReservationGuests] = useState('2');
  const [reservationTime, setReservationTime] = useState('20:30');
  const [isReserved, setIsReserved] = useState(false);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReserved(true);
    if (onNotify) onNotify(`Mesa para ${reservationGuests} pessoas pré-reservada na CASA NERA para ${reservationTime}!`);
    setTimeout(() => setIsReserved(false), 5000);
  };

  const menuItems = {
    degustacao: [
      { name: 'Ostra de Santa Catarina & Caldo de Maçã Verde', desc: 'Emulsão de caviar Oscietra, óleo de louro selvagem e raspas de limão cravo.', price: 'R$ 98', tag: 'Abertura' },
      { name: 'Polvo na Brasa de Jacarandá & Tubérculos Fermentados', desc: 'Manteiga tostada de capim-limão, purê aveludado de tupinambor e crocante de arroz negro.', price: 'R$ 165', tag: 'Principal' },
      { name: 'Wagyu A5 Grelhado & Glacê de Cogumelos Nativos', desc: 'Cebolas roxas glaceadas no hidromel, tutano defumado e folhas amargas da serra.', price: 'R$ 240', tag: 'Clássico da Casa' },
      { name: 'Chocolate Selvagem de Ilhéus (72%) & Trufa Branca', desc: 'Sorbet de cumaru, flor de sal de Mossoró e crocante de cacau fermentado.', price: 'R$ 72', tag: 'Finalização' }
    ],
    entradas: [
      { name: 'Tártaro de Vieira Fresca & Ponzu de Caju', desc: 'Brioche artesanal tostado na manteiga de garrafa e emulsão de gergelim torrado.', price: 'R$ 92', tag: 'Fresco' },
      { name: 'Alcachofras na Brasa & Fonduta de Queijo da Canastra', desc: 'Crocante de presunto curado artesanal e azeite extravirgem prensado a frio.', price: 'R$ 84', tag: 'Vegetariano' },
    ],
    principais: [
      { name: 'Pargo Grelhado em Escamas & Infusão de Crustáceos', desc: 'Mousseline de inhame, emulsão de açafrão da terra e aspargos verdes grelhados.', price: 'R$ 178', tag: 'Pesca do Dia' },
      { name: 'Cordeiro Confitado por 16h & Redução de Vinho do Porto', desc: 'Polenta cremosa de milho crioulo moído na pedra e folhas de mostarda salteadas.', price: 'R$ 185', tag: 'Cozimento Lento' },
    ],
    sobremesas: [
      { name: 'Mille-Feuille de Baunilha do Cerrado & Frutas Vermelhas', desc: 'Massa folhada caramelizada na hora com sorbet artesanal de framboesa.', price: 'R$ 68', tag: 'Confeitaria' },
      { name: 'Torta de Queijo de Cabra & Compota de Goiaba Selvagem', desc: 'Base crocante de castanha-do-pará e calda de cachaça envelhecida.', price: 'R$ 64', tag: 'Regional' }
    ]
  };

  return (
    <div className="w-full preview-theme-scope min-h-screen">
      {/* Top Bar / Heritage Banner */}
      <div 
        className="w-full py-2.5 px-6 border-b text-xs flex flex-wrap items-center justify-between tracking-widest uppercase transition-colors"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-muted)'
        }}
      >
        <div className="flex items-center gap-3">
          <Award className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
          <span>Guia Michelin • 2 Estrelas 2024 / 2025</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">Terça a Domingo • Reservas Antecipadas</span>
          <span style={{ color: 'var(--color-text)' }}>Alameda Lorena, 1420 — Jardins, SP</span>
        </div>
      </div>

      {/* Restaurant Header */}
      <nav 
        className="px-6 md:px-12 py-6 border-b flex items-center justify-between transition-colors sticky top-0 z-10 backdrop-blur-md"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'color-mix(in srgb, var(--color-background) 85%, transparent)'
        }}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            CASA NERA
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: 'var(--color-accent)' }}>
            Gastronomia Autoral
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
          <a href="#menu" className="hover:opacity-80 transition-opacity">Menu Degustação</a>
          <a href="#historia" className="hover:opacity-80 transition-opacity">O Terroir</a>
          <a href="#adega" className="hover:opacity-80 transition-opacity">Adega</a>
          <a href="#localizacao" className="hover:opacity-80 transition-opacity">Visita</a>
        </div>
        <a 
          href="#reserva"
          className="px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-background)' 
          }}
        >
          Reservar Mesa
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 border-b overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-wider uppercase border"
              style={{ 
                borderColor: 'var(--color-border)', 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-accent)' 
              }}
            >
              <Wine className="w-3 h-3" />
              Safra de Outono em Andamento
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight" style={{ color: 'var(--color-text)' }}>
              COZINHA QUE FICA NA MEMÓRIA.
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-xl font-light" style={{ color: 'var(--color-muted)' }}>
              Ingredientes colhidos a menos de 100km, cocção lenta no calor da lenha nativa e um diálogo silencioso entre a terra brasileira e a alta técnica clássica.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a 
                href="#reserva" 
                className="px-8 py-3.5 rounded font-medium text-sm tracking-wider uppercase transition-transform hover:-translate-y-0.5 shadow-sm inline-flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                <span>Garantir Experiência</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#menu" 
                className="px-6 py-3.5 rounded font-medium text-sm tracking-wider uppercase border transition-colors hover:opacity-80"
                style={{ 
                  borderColor: 'var(--color-border)', 
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-surface)' 
                }}
              >
                Ver Cardápio Vigente
              </a>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <span className="block font-heading text-2xl font-bold" style={{ color: 'var(--color-text)' }}>8 Etapas</span>
                <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>Menu Degustação</span>
              </div>
              <div>
                <span className="block font-heading text-2xl font-bold" style={{ color: 'var(--color-text)' }}>450+</span>
                <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>Rótulos na Adega</span>
              </div>
              <div>
                <span className="block font-heading text-2xl font-bold" style={{ color: 'var(--color-text)' }}>24 Mesas</span>
                <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>Salão Intimista</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border shadow-2xl aspect-[4/5] group" style={{ borderColor: 'var(--color-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                alt="Alta Gastronomia Prato Assinado" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80"
                style={{ backgroundImage: `linear-gradient(to top, var(--color-background), transparent 70%)` }}
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded backdrop-blur-md border"
                style={{ 
                  backgroundColor: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--color-accent)' }}>
                    Criação do Chef • Safra 2025
                  </span>
                  <span className="text-xs font-mono font-bold" style={{ color: 'var(--color-text)' }}>R$ 165</span>
                </div>
                <h4 className="font-heading text-base font-bold" style={{ color: 'var(--color-text)' }}>
                  Polvo Braseado & Emulsão de Tucupi Preto
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Harmonizado com Chardonnay Mineral da Serra Gaúcha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prato em Destaque & Filosofia */}
      <section id="historia" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>
              Nossa Essência
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
              O TEMPO NÃO É APENAS ESPERADO. ELE É O INGREDIENTE PRINCIPAL.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Fundada pelo Chef Matteo Valente após uma década de imersão nos alpes italianos e nas florestas brasileiras, a Casa Nera é um tributo ao fogo vivo, à fermentação lenta e ao respeito intransigente pela sazonalidade.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-text)' }}>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} /> 100% Orgânico
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} /> Produtores Locais
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} /> Fermentação Natural
              </span>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border aspect-[4/3]" style={{ borderColor: 'var(--color-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" 
                alt="Ambiente Casa Nera" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden border aspect-[4/3] mt-8" style={{ borderColor: 'var(--color-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80" 
                alt="Vinho e taça" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Degustação Interativo */}
      <section id="menu" className="px-6 md:px-12 py-24 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>
              Cardápio Autoral
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold" style={{ color: 'var(--color-text)' }}>
              COMPOSIÇÃO GASTRONÔMICA
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Selecione as etapas para explorar as preparações criadas semanalmente de acordo com a colheita matinal.
            </p>
          </div>

          {/* Course Tabs */}
          <div className="flex justify-center mb-10 overflow-x-auto pb-2">
            <div className="inline-flex p-1 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
              {(['degustacao', 'entradas', 'principais', 'sobremesas'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedCourse(tab)}
                  className="px-5 py-2 text-xs font-medium uppercase tracking-wider rounded transition-all"
                  style={{
                    backgroundColor: selectedCourse === tab ? 'var(--color-primary)' : 'transparent',
                    color: selectedCourse === tab ? 'var(--color-background)' : 'var(--color-muted)'
                  }}
                >
                  {tab === 'degustacao' ? 'Menu Degustação' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems[selectedCourse].map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-lg border transition-all duration-200 hover:shadow-lg group flex flex-col justify-between"
                style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-heading text-lg font-bold group-hover:opacity-90 transition-opacity" style={{ color: 'var(--color-text)' }}>
                      {item.name}
                    </h3>
                    <span className="font-mono text-sm font-bold whitespace-nowrap" style={{ color: 'var(--color-accent)' }}>
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t flex items-center justify-between text-[11px]" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="px-2 py-0.5 rounded uppercase tracking-wider font-semibold" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)', color: 'var(--color-accent)' }}>
                    {item.tag}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
                    Harmonização Sugerida
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserva & Localização */}
      <section id="reserva" className="px-6 md:px-12 py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>
              Experiência Exclusiva
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
              RESERVE SUA NOITE NA CASA NERA.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Para garantir uma experiência de alto padrão e ritmo sereno de serviço, trabalhamos com um número reduzido de lugares por noite.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>Localização</div>
                  <div className="text-xs" style={{ color: 'var(--color-muted)' }}>Alameda Lorena, 1420 — Jardins, São Paulo - SP</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>Horário de Atendimento</div>
                  <div className="text-xs" style={{ color: 'var(--color-muted)' }}>Terça a Sábado: 19h00 às 23h30 • Domingo: 12h30 às 16h30</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form 
              onSubmit={handleReserve}
              className="p-8 rounded-xl border shadow-xl space-y-5"
              style={{ 
                backgroundColor: 'var(--color-background)', 
                borderColor: 'var(--color-border)' 
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <span className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>Formulário de Solicitação</span>
                <span className="text-xs font-mono" style={{ color: 'var(--color-accent)' }}>CONFIRMAÇÃO IMEDIATA</span>
              </div>

              {isReserved ? (
                <div className="p-6 rounded-lg text-center space-y-2 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-primary)' }}>
                  <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-lg" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}>
                    ✓
                  </div>
                  <h4 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>Reserva Solicitada com Sucesso!</h4>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    Enviamos os detalhes da reserva para o seu contato. Aguardamos sua visita na Casa Nera.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>Data</label>
                      <input 
                        type="date" 
                        value={reservationDate}
                        onChange={e => setReservationDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded border text-xs font-mono outline-none focus:ring-1"
                        style={{ 
                          backgroundColor: 'var(--color-surface)', 
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>Lugares</label>
                      <select 
                        value={reservationGuests}
                        onChange={e => setReservationGuests(e.target.value)}
                        className="w-full px-3 py-2.5 rounded border text-xs outline-none"
                        style={{ 
                          backgroundColor: 'var(--color-surface)', 
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)'
                        }}
                      >
                        <option value="1">1 Pessoa</option>
                        <option value="2">2 Pessoas (Mesa)</option>
                        <option value="4">4 Pessoas (Mesa)</option>
                        <option value="6">6 Pessoas (Salão)</option>
                        <option value="8">8 Pessoas (Mesa Privada)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>Horário</label>
                      <select 
                        value={reservationTime}
                        onChange={e => setReservationTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded border text-xs outline-none"
                        style={{ 
                          backgroundColor: 'var(--color-surface)', 
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)'
                        }}
                      >
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:15">21:15</option>
                        <option value="22:00">22:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>Observações Especiais & Restrições</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Aniversário de casamento, alergia a frutos do mar..."
                      className="w-full px-3 py-2.5 rounded border text-xs outline-none"
                      style={{ 
                        backgroundColor: 'var(--color-surface)', 
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)'
                      }}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded font-semibold text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5"
                    style={{ 
                      backgroundColor: 'var(--color-primary)', 
                      color: 'var(--color-background)' 
                    }}
                  >
                    Confirmar Solicitação de Mesa
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
        style={{ 
          borderColor: 'var(--color-border)', 
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-muted)'
        }}
      >
        <span className="font-heading font-bold" style={{ color: 'var(--color-text)' }}>
          CASA NERA © 2026 • Alta Gastronomia Contemporânea
        </span>
        <div className="flex items-center gap-6">
          <span>Política de Privacidade</span>
          <span>Carta de Vinhos (PDF)</span>
          <span>Imprensa</span>
        </div>
      </footer>
    </div>
  );
};
