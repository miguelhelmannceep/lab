import React, { useState } from 'react';
import { Scissors, ShieldCheck, MapPin, Phone, Star, CheckCircle, Clock, Calendar, Sparkles } from 'lucide-react';

interface Props {
  onNotify?: (msg: string) => void;
}

export const BarberSite: React.FC<Props> = ({ onNotify }) => {
  const [selectedBarber, setSelectedBarber] = useState('marcos');
  const [selectedService, setSelectedService] = useState('signature');
  const [booked, setBooked] = useState(false);

  const barbers = [
    {
      id: 'marcos',
      name: 'Marcos "Viper" Silveira',
      role: 'Master Barber & Fundador',
      exp: '14 anos de experiência',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
      specialty: 'Fade de Alta Precisão & Navalha Livre'
    },
    {
      id: 'andre',
      name: 'André D’Angelo',
      role: 'Especialista em Visagismo',
      exp: '9 anos de experiência',
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
      specialty: 'Design de Barba & Alinhamento Mandibular'
    },
    {
      id: 'gabriel',
      name: 'Gabriel Becker',
      role: 'Senior Stylist',
      exp: '7 anos de experiência',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      specialty: 'Cortes Clássicos Scumbag & Pompadour'
    }
  ];

  const services = [
    {
      id: 'corte',
      title: 'Corte Signature North',
      desc: 'Diagnóstico de formato craniano, corte personalizado na tesoura ou máquina e finalização com pomada matte importada.',
      duration: '45 min',
      price: 'R$ 95'
    },
    {
      id: 'barba',
      title: 'Barboterapia & Toalha Quente',
      desc: 'Ozonioterapia de vapor, óleos essenciais amadeirados, esfoliação facial, navalha cirúrgica e bálsamo refrescante.',
      duration: '40 min',
      price: 'R$ 80'
    },
    {
      id: 'signature',
      title: 'O Ritual Completo (Cabelo + Barba)',
      desc: 'A experiência definitiva North. Corte, barboterapia profunda, lavagem com massagem capilar e um drink cortesia do nosso bar.',
      duration: '75 min',
      price: 'R$ 155',
      badge: 'MAIS ESCOLHIDO'
    },
    {
      id: 'grisalhos',
      title: 'Camuflagem Grisalha & Tonalização',
      desc: 'Pigmentação sutil de ação rápida, atenuando fios brancos sem aspecto artificial ou marcação de raiz.',
      duration: '35 min',
      price: 'R$ 110'
    }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    if (onNotify) onNotify(`Agendamento confirmado no NORTH BARBER!`);
    setTimeout(() => setBooked(false), 5000);
  };

  return (
    <div className="w-full preview-theme-scope min-h-screen">
      {/* Header */}
      <header 
        className="px-6 md:px-12 py-5 border-b flex items-center justify-between sticky top-0 z-10 backdrop-blur-md"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'color-mix(in srgb, var(--color-background) 90%, transparent)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm tracking-tighter"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
          >
            NB
          </div>
          <div>
            <span className="font-heading text-xl font-black tracking-wider block" style={{ color: 'var(--color-text)' }}>
              NORTH BARBER
            </span>
            <span className="text-[10px] tracking-widest uppercase block" style={{ color: 'var(--color-muted)' }}>
              EST. 2017 • SÃO PAULO
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-muted)' }}>
          <a href="#servicos" className="hover:opacity-80">Serviços</a>
          <a href="#barbeiros" className="hover:opacity-80">Barbeiros</a>
          <a href="#clube" className="hover:opacity-80">Club Mensal</a>
          <a href="#galeria" className="hover:opacity-80">Ambiente</a>
        </div>

        <a 
          href="#agendar" 
          className="px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all"
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-background)' 
          }}
        >
          Agendar Horário
        </a>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider border"
              style={{ 
                borderColor: 'var(--color-border)', 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-accent)'
              }}
            >
              <Scissors className="w-3.5 h-3.5" />
              Barbearia Clássica & Club Exclusivo
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight" style={{ color: 'var(--color-text)' }}>
              CORTE. PRESENÇA. IDENTIDADE.
            </h1>

            <p className="text-sm md:text-base leading-relaxed max-w-xl font-normal" style={{ color: 'var(--color-muted)' }}>
              Não é apenas um corte de cabelo. É a reafirmação da sua melhor versão. Cadeiras vintage em couro legítimo, navalhas cirúrgicas, cerveja artesanal e especialistas no formato do seu rosto.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="#agendar" 
                className="px-7 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                Garantir Minha Cadeira
              </a>
              <a 
                href="#servicos" 
                className="px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wider border"
                style={{ 
                  borderColor: 'var(--color-border)', 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)' 
                }}
              >
                Tabela de Valores
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <div className="font-heading text-2xl font-black" style={{ color: 'var(--color-text)' }}>+18.000</div>
                <div className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>Cortes Realizados</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-black" style={{ color: 'var(--color-text)' }}>4.9 ★★★★★</div>
                <div className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>Avaliação Google</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-black" style={{ color: 'var(--color-text)' }}>Lounge Bar</div>
                <div className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>Chopp & Whiskey</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border aspect-[4/5] shadow-2xl relative" style={{ borderColor: 'var(--color-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80" 
                alt="Ambiente Barbearia Vintage" 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-85"
                style={{ backgroundImage: `linear-gradient(to top, var(--color-background) 10%, transparent 60%)` }}
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-lg border backdrop-blur-md"
                style={{ 
                  backgroundColor: 'color-mix(in srgb, var(--color-surface) 92%, transparent)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span style={{ color: 'var(--color-accent)' }}>RUA OSCAR FREIRE, 890</span>
                  <span style={{ color: 'var(--color-text)' }}>ESTACIONAMENTO CORTESIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços & Preços */}
      <section id="servicos" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
                Menu de Cuidados
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-black tracking-tight mt-1" style={{ color: 'var(--color-text)' }}>
                SERVIÇOS DE PRECISÃO
              </h2>
            </div>
            <p className="text-xs max-w-sm mt-3 md:mt-0" style={{ color: 'var(--color-muted)' }}>
              Cada atendimento inclui toalha quente prévia, produtos de linha internacional e café expresso ou cerveja gelada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv) => (
              <div 
                key={srv.id}
                onClick={() => setSelectedService(srv.id)}
                className={`p-6 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  selectedService === srv.id ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{ 
                  backgroundColor: 'var(--color-background)', 
                  borderColor: selectedService === srv.id ? 'var(--color-primary)' : 'var(--color-border)'
                }}
              >
                {srv.badge && (
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase shadow"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-background)' }}
                  >
                    {srv.badge}
                  </span>
                )}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>{srv.title}</h3>
                    <span className="font-mono text-base font-black ml-4" style={{ color: 'var(--color-primary)' }}>{srv.price}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{srv.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--color-muted)' }}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duração: {srv.duration}</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: 'var(--color-accent)' }}>
                    {selectedService === srv.id ? 'Selecionado' : 'Clique para Escolher'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profissionais */}
      <section id="barbeiros" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
              A Banca
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-black mt-1" style={{ color: 'var(--color-text)' }}>
              MESTRES BARBEIROS
            </h2>
            <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
              Profissionais premiados com anos de especialização em visagismo masculino.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((b) => (
              <div 
                key={b.id} 
                onClick={() => setSelectedBarber(b.id)}
                className={`rounded-xl overflow-hidden border transition-all cursor-pointer group ${
                  selectedBarber === b.id ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  borderColor: selectedBarber === b.id ? 'var(--color-primary)' : 'var(--color-border)' 
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 text-[10px] font-mono text-white">
                    {b.exp}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-heading text-base font-bold" style={{ color: 'var(--color-text)' }}>{b.name}</h4>
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-accent)' }}>{b.role}</p>
                  <p className="text-xs mt-2.5 pt-2.5 border-t" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
                    {b.specialty}
                  </p>
                  <div className="mt-4">
                    <span 
                      className="w-full block py-2 rounded text-center text-xs font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: selectedBarber === b.id ? 'var(--color-primary)' : 'var(--color-background)',
                        color: selectedBarber === b.id ? 'var(--color-background)' : 'var(--color-text)'
                      }}
                    >
                      {selectedBarber === b.id ? 'Barbeiro Selecionado' : 'Escolher este Barbeiro'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agendamento Rápido */}
      <section id="agendar" className="px-6 md:px-12 py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="border rounded-2xl p-8 md:p-12 shadow-2xl" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
                Reserva Imediata
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-black mt-1" style={{ color: 'var(--color-text)' }}>
                AGENDE SEU CORTE
              </h3>
              <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                Selecione data e horário para confirmar com o barbeiro selecionado.
              </p>
            </div>

            {booked ? (
              <div className="p-6 rounded-xl border text-center space-y-2" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-primary)' }}>
                <CheckCircle className="w-10 h-10 mx-auto" style={{ color: 'var(--color-primary)' }} />
                <h4 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>Horário Confirmado com Sucesso!</h4>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  Aguardamos você no North Barber. Seu drink estará pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--color-muted)' }}>Nome Completo</label>
                    <input 
                      type="text" 
                      defaultValue="Rodrigo Menezes" 
                      className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--color-muted)' }}>WhatsApp / Telefone</label>
                    <input 
                      type="text" 
                      defaultValue="(11) 98765-4321" 
                      className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--color-muted)' }}>Data Preferida</label>
                    <input 
                      type="date" 
                      defaultValue="2026-10-14" 
                      className="w-full px-3.5 py-2.5 rounded border text-xs font-mono outline-none"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--color-muted)' }}>Horário</label>
                    <select 
                      className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    >
                      <option>14:00 (Disponível)</option>
                      <option>15:00 (Disponível)</option>
                      <option>16:30 (Disponível)</option>
                      <option>18:00 (Disponível)</option>
                      <option>19:15 (Disponível)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded font-bold text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-lg"
                  style={{ 
                    backgroundColor: 'var(--color-primary)', 
                    color: 'var(--color-background)' 
                  }}
                >
                  Confirmar Agendamento com o Barbeiro
                </button>
              </form>
            )}
          </div>
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
        <span className="font-heading font-black" style={{ color: 'var(--color-text)' }}>
          NORTH BARBER CLUB © 2026 • SÃO PAULO
        </span>
        <span>Terça a Sábado das 09h às 21h • Domingos das 10h às 16h</span>
      </footer>
    </div>
  );
};
