import React, { useState } from 'react';
import { Zap, Activity, Flame, Shield, Trophy, Check, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onNotify?: (msg: string) => void;
}

export const GymSite: React.FC<Props> = ({ onNotify }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [claimedPass, setClaimedPass] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimedPass(true);
    if (onNotify) onNotify(`Day Pass Gratuito ativado no FORGE TRAINING! Apresente o código na recepção.`);
    setTimeout(() => setClaimedPass(false), 5000);
  };

  const modalities = [
    {
      title: 'HYROX & ENDURANCE',
      desc: 'Simulações de corrida de alta intensidade, remos concêntricos e sled pushes com controle de zonas de lactato.',
      intensity: 'MÁXIMA (ZONA 4-5)',
      coach: 'Coach Caio Faria'
    },
    {
      title: 'OLYMPIC WEIGHTLIFTING',
      desc: 'Snatch, Clean & Jerk ministrados com barras Eleiko e plataformas de absorção de impacto de grau de competição.',
      intensity: 'POTÊNCIA NEURAL',
      coach: 'Coach Sofia Ramos'
    },
    {
      title: 'STRENGTH & BIOMECHANICS',
      desc: 'Sobrecarga progressiva individualizada focada em hipertrofia funcional, densidade óssea e prevenção articular.',
      intensity: 'HIPERTROFIA & FORÇA',
      coach: 'Dr. Leonardo Reis'
    },
    {
      title: 'RECOVER & CRYO SPA',
      desc: 'Banheiras de gelo a 3°C, botas de compressão pneumática NormaTec e sauna infravermelha para restauração muscular acelerada.',
      intensity: 'RESTAURAÇÃO',
      coach: 'Equipe de Fisioterapia'
    }
  ];

  const plans = [
    {
      name: 'FORGE BASIC',
      price: billingCycle === 'monthly' ? 'R$ 289' : 'R$ 239',
      period: '/mês',
      features: ['Acesso total à musculação e área cardio', 'App de treinos e métricas de carga', 'Acesso em horários livres', 'Vestiário com sauna seca'],
      highlight: false
    },
    {
      name: 'PRO ATHLETE',
      price: billingCycle === 'monthly' ? 'R$ 449' : 'R$ 379',
      period: '/mês',
      features: ['Tudo do plano Basic', 'Todas as aulas coletivas (Hyrox, Oly, LPO)', '2 sessões mensais no Cryo & Recover Lab', 'Avaliação de bioimpedância InBody 770'],
      highlight: true,
      tag: 'MAIS POPULAR'
    },
    {
      name: 'ELITE UNLIMITED',
      price: billingCycle === 'monthly' ? 'R$ 699' : 'R$ 589',
      period: '/mês',
      features: ['Acesso ilimitado e irrestrito', 'Recover Lab ilimitado (Banho de gelo & botas)', 'Acompanhamento nutricional mensal', 'Armário privativo fixo e toalhas cortesia'],
      highlight: false
    }
  ];

  return (
    <div className="w-full preview-theme-scope min-h-screen">
      {/* Dynamic Announcement Bar */}
      <div 
        className="w-full py-2 px-6 text-[11px] font-mono font-bold uppercase tracking-widest flex items-center justify-between border-b"
        style={{ 
          backgroundColor: 'var(--color-primary)', 
          color: 'var(--color-background)',
          borderColor: 'var(--color-border)'
        }}
      >
        <span className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 fill-current" />
          MATRÍCULAS 2026: GANHE AVALIAÇÃO BIOMECÂNICA GRATUITA
        </span>
        <span className="hidden sm:inline">CENTRO OLÍMPICO DE PERFORMANCE</span>
      </div>

      {/* Navigation */}
      <header 
        className="px-6 md:px-12 py-5 border-b flex items-center justify-between sticky top-0 z-10 backdrop-blur-md"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'color-mix(in srgb, var(--color-background) 88%, transparent)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center font-black text-sm"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
          >
            F
          </div>
          <span className="font-heading text-xl md:text-2xl font-black tracking-tighter" style={{ color: 'var(--color-text)' }}>
            FORGE TRAINING
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
          <a href="#modalidades" className="hover:opacity-80">Modalidades</a>
          <a href="#pilares" className="hover:opacity-80">Metodologia</a>
          <a href="#planos" className="hover:opacity-80">Planos</a>
          <a href="#daypass" className="hover:opacity-80">Free Pass</a>
        </div>

        <a 
          href="#daypass"
          className="px-5 py-2.5 rounded font-black text-xs uppercase tracking-wider transition-transform hover:scale-105"
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-background)' 
          }}
        >
          Treinar 1 Dia Grátis
        </a>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider border"
              style={{ 
                borderColor: 'var(--color-border)', 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-primary)' 
              }}
            >
              <Activity className="w-4 h-4" />
              TREINO BASEADO EM CIÊNCIA E PERFORMANCE
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.98] tracking-tighter uppercase" style={{ color: 'var(--color-text)' }}>
              CONSTRUA UMA VERSÃO MAIS FORTE DE VOCÊ.
            </h1>

            <p className="text-sm md:text-base leading-relaxed max-w-xl" style={{ color: 'var(--color-muted)' }}>
              Esqueça academias monótonas e treinos genéricos. O Forge combina o rigor do levantamento de peso olímpico, capacidade cardiorrespiratória Hyrox e tecnologia de recuperação fisiológica de ponta.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="#daypass"
                className="px-8 py-4 rounded font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                <span>Resgatar Free Pass</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#planos"
                className="px-7 py-4 rounded font-bold text-xs uppercase tracking-widest border"
                style={{ 
                  borderColor: 'var(--color-border)', 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)' 
                }}
              >
                Conhecer Planos
              </a>
            </div>

            {/* Performance Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <div className="font-heading text-3xl font-black" style={{ color: 'var(--color-primary)' }}>1.400m²</div>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--color-muted)' }}>Área Climatizada</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-black" style={{ color: 'var(--color-text)' }}>100%</div>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--color-muted)' }}>Eleiko & Rogue Equipments</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-black" style={{ color: 'var(--color-text)' }}>08</div>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--color-muted)' }}>Treinadores Certificados</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border aspect-[4/5] shadow-2xl relative" style={{ borderColor: 'var(--color-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80" 
                alt="Atleta Forge Training" 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-85"
                style={{ backgroundImage: `linear-gradient(to top, var(--color-background) 15%, transparent 60%)` }}
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-lg border backdrop-blur-md"
                style={{ 
                  backgroundColor: 'color-mix(in srgb, var(--color-surface) 92%, transparent)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-amber-500/20 text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>ZONA METABÓLICA 4</div>
                    <div className="text-[11px]" style={{ color: 'var(--color-muted)' }}>Queima acelerada com acompanhamento de FC ao vivo nos monitores.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section id="modalidades" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
              Pilares do Treinamento
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-black mt-1 uppercase tracking-tight" style={{ color: 'var(--color-text)' }}>
              MODALIDADES DE ALTO IMPACTO
            </h2>
            <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
              Seu corpo foi feito para correr, empurrar, levantar peso e se recuperar como uma máquina de elite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((m, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-xl border flex flex-col justify-between transition-all hover:-translate-y-1"
                style={{ 
                  backgroundColor: 'var(--color-background)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold px-2.5 py-1 rounded w-fit mb-3"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)', color: 'var(--color-primary)' }}
                  >
                    {m.intensity}
                  </div>
                  <h3 className="font-heading text-lg font-black uppercase mb-2" style={{ color: 'var(--color-text)' }}>
                    {m.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {m.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t text-[11px] font-bold" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
                  {m.coach}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos com Toggle Mensal / Anual */}
      <section id="planos" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
              Investimento
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-black mt-1 uppercase tracking-tight" style={{ color: 'var(--color-text)' }}>
              ESCOLHA SEU PLANO DE EVOLUÇÃO
            </h2>

            {/* Toggle */}
            <div className="mt-6 inline-flex p-1 rounded-lg border items-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                className="px-5 py-2 text-xs font-bold uppercase rounded transition-all"
                style={{
                  backgroundColor: billingCycle === 'monthly' ? 'var(--color-primary)' : 'transparent',
                  color: billingCycle === 'monthly' ? 'var(--color-background)' : 'var(--color-muted)'
                }}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className="px-5 py-2 text-xs font-bold uppercase rounded transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: billingCycle === 'annual' ? 'var(--color-primary)' : 'transparent',
                  color: billingCycle === 'annual' ? 'var(--color-background)' : 'var(--color-muted)'
                }}
              >
                <span>Anual</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500 text-black font-black">20% OFF</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, idx) => (
              <div 
                key={idx}
                className={`p-7 rounded-2xl border relative flex flex-col justify-between transition-all ${
                  p.highlight ? 'ring-2 shadow-2xl' : ''
                }`}
                style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  borderColor: p.highlight ? 'var(--color-primary)' : 'var(--color-border)',
                  boxShadow: p.highlight ? '0 10px 40px -10px color-mix(in srgb, var(--color-primary) 30%, transparent)' : 'none'
                }}
              >
                {p.tag && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
                  >
                    {p.tag}
                  </span>
                )}
                <div>
                  <h4 className="font-heading text-lg font-black uppercase" style={{ color: 'var(--color-text)' }}>
                    {p.name}
                  </h4>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-black" style={{ color: 'var(--color-text)' }}>{p.price}</span>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{p.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--color-muted)' }}>
                        <Check className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <a 
                    href="#daypass"
                    className="w-full block py-3 rounded text-center text-xs font-black uppercase tracking-widest transition-transform hover:-translate-y-0.5"
                    style={{ 
                      backgroundColor: p.highlight ? 'var(--color-primary)' : 'var(--color-background)', 
                      color: p.highlight ? 'var(--color-background)' : 'var(--color-text)',
                      border: p.highlight ? 'none' : '1px solid var(--color-border)'
                    }}
                  >
                    Começar Treinamento
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Day Pass Form */}
      <section id="daypass" className="px-6 md:px-12 py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-3xl mx-auto border rounded-2xl p-8 md:p-12 shadow-2xl" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
              Experimente a Estrutura
            </span>
            <h3 className="font-heading text-2xl md:text-4xl font-black mt-1 uppercase" style={{ color: 'var(--color-text)' }}>
              SOLICITAR FREE DAY PASS
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
              1 dia de treino livre com acesso total a todas as áreas e vestiário premium.
            </p>
          </div>

          {claimedPass ? (
            <div className="p-6 rounded-xl border text-center space-y-2" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-primary)' }}>
              <CheckCircle2 className="w-12 h-12 mx-auto" style={{ color: 'var(--color-primary)' }} />
              <h4 className="font-heading text-lg font-black uppercase" style={{ color: 'var(--color-text)' }}>FREE PASS LIBERADO!</h4>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                Seu voucher digital foi enviado por WhatsApp. Apresente na recepção da Forge Training.
              </p>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--color-muted)' }}>Seu Nome</label>
                  <input 
                    type="text" 
                    defaultValue="Lucas Andrade" 
                    className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--color-muted)' }}>WhatsApp</label>
                  <input 
                    type="text" 
                    defaultValue="(11) 99123-8899" 
                    className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: 'var(--color-muted)' }}>Objetivo Principal</label>
                <select 
                  className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <option>Ganho de Força & Hipertrofia</option>
                  <option>Condicionamento Físico & Hyrox</option>
                  <option>Levantamento de Peso Olímpico (LPO)</option>
                  <option>Longevidade & Saúde Articular</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded font-black text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-xl"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                Gerar Meu Passe Gratuito
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
        <span className="font-heading font-black uppercase" style={{ color: 'var(--color-text)' }}>
          FORGE TRAINING LAB © 2026 • ALL RIGHTS RESERVED
        </span>
        <span>Aberto Segunda a Sexta: 05h às 23h • Sábado e Domingo: 08h às 18h</span>
      </footer>
    </div>
  );
};
