import React, { useState } from 'react';
import { Briefcase, Building2, Scale, ArrowUpRight, CheckCircle, Shield, FileText, ChevronRight } from 'lucide-react';

interface Props {
  onNotify?: (msg: string) => void;
}

export const OfficeSite: React.FC<Props> = ({ onNotify }) => {
  const [meetingSubmitted, setMeetingSubmitted] = useState(false);

  const practiceAreas = [
    {
      code: 'M&A / 01',
      title: 'Fusões, Aquisições e Private Equity',
      desc: 'Assessoria integral em operações transfronteiriças, due diligence aprofundada, contratos de compra e venda de quotas e acordos de acionistas complexos.',
      metric: 'R$ 4.2B em transações lideradas'
    },
    {
      code: 'ARB / 02',
      title: 'Arbitragem e Litígios de Alta Complexidade',
      desc: 'Representação em disputas arbitrais perante as principais câmaras nacionais e internacionais (CAM-CCBC, ICC Paris, LCIA).',
      metric: '96% de êxito em disputas estratégicas'
    },
    {
      code: 'GOV / 03',
      title: 'Governança Corporativa e Reestruturação',
      desc: 'Blindagem e planejamento sucessório patrimonial para famílias empresárias, governança de conselhos e programas de compliance ético.',
      metric: '+80 grupos familiares assessorados'
    },
    {
      code: 'REG / 04',
      title: 'Direito Tributário Estratégico e ESG',
      desc: 'Otimização de estruturas tributárias transnacionais, modelagem fiscal de operações de infraestrutura e alinhamento a critérios globais ESG.',
      metric: 'Ranked Chambers Global Band 1'
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'DIAGNÓSTICO PROFUNDO',
      desc: 'Mapeamento meticuloso de riscos regulatórios, societários e de mercado antes de qualquer movimento tático.'
    },
    {
      step: '02',
      title: 'DESENHO ESTRATÉGICO',
      desc: 'Construção da tese jurídica e econômica com modelagem de cenários e salvaguardas contratuais robustas.'
    },
    {
      step: '03',
      title: 'EXECUÇÃO & DEFEZA',
      desc: 'Condução implacável das negociações ou do litígio com reporte direto ao conselho de administração.'
    }
  ];

  const partners = [
    {
      name: 'Dr. Arthur Nova',
      role: 'Sócio-Fundador • Prática de M&A',
      background: 'Doutor em Direito Comercial pela USP. LL.M. pela Columbia Law School. Árbitro listado na CAM-CCBC.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Dra. Helena Valadares',
      role: 'Sócia • Contencioso Estratégico & Arbitragem',
      background: 'Mestre em Direito Internacional pela Sorbonne (Paris I). Mais de 20 anos de atuação perante a CCI Paris.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Dr. Carlos Eduardo Mendonça',
      role: 'Sócio • Direito Tributário & Wealth Planning',
      background: 'Especialista pelo IBDT. Assessor de grupos multinacionais em transações cross-border na América Latina.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingSubmitted(true);
    if (onNotify) onNotify(`Solicitação de reunião confidencial enviada para NOVA & ASSOCIADOS.`);
    setTimeout(() => setMeetingSubmitted(false), 5000);
  };

  return (
    <div className="w-full preview-theme-scope min-h-screen">
      {/* Top Header */}
      <header 
        className="px-6 md:px-12 py-5 border-b flex items-center justify-between sticky top-0 z-10 backdrop-blur-md"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'color-mix(in srgb, var(--color-background) 92%, transparent)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded border flex items-center justify-center font-serif text-sm font-bold"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
          >
            §
          </div>
          <span className="font-heading text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            NOVA & ASSOCIADOS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--color-muted)' }}>
          <a href="#areas" className="hover:opacity-80">Áreas de Atuação</a>
          <a href="#metodo" className="hover:opacity-80">Metodologia</a>
          <a href="#socios" className="hover:opacity-80">Sócios</a>
          <a href="#contato" className="hover:opacity-80">Contato Confidencial</a>
        </div>

        <a 
          href="#contato"
          className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider border transition-colors hover:opacity-90"
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            borderColor: 'var(--color-primary)', 
            color: 'var(--color-background)' 
          }}
        >
          Agendar Reunião
        </a>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs tracking-wider uppercase border"
              style={{ 
                borderColor: 'var(--color-border)', 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-primary)' 
              }}
            >
              <Shield className="w-3.5 h-3.5" />
              Assessoria Jurídica & Corporativa Institucional
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight" style={{ color: 'var(--color-text)' }}>
              ESTRATÉGIA PARA DECISÕES IMPORTANTES.
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-2xl font-light" style={{ color: 'var(--color-muted)' }}>
              Atuamos como conselheiros de confiança de conselhos de administração, fundos e acionistas em momentos de alta complexidade regulatória, litígios decisivos e transações que definem o futuro do negócio.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a 
                href="#contato"
                className="px-7 py-3.5 rounded font-medium text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                <span>Consulta Confidencial</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#areas"
                className="px-6 py-3.5 rounded font-medium text-xs uppercase tracking-wider border"
                style={{ 
                  borderColor: 'var(--color-border)', 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)' 
                }}
              >
                Explorar Práticas
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 border rounded-xl p-6 space-y-6"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)' 
            }}
          >
            <div className="border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
              <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-muted)' }}>Total Transacionado</div>
              <div className="font-heading text-3xl font-bold mt-1" style={{ color: 'var(--color-primary)' }}>+R$ 14 Bilhões</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Em operações de M&A nos últimos 5 anos.</div>
            </div>

            <div className="border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
              <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-muted)' }}>Reconhecimento Global</div>
              <div className="font-heading text-xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>Chambers & Legal 500</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Reconhecidos consecutivamente na Banda 1.</div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-muted)' }}>Escopo de Atuação</div>
              <div className="font-heading text-xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>São Paulo • NY • Londres</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Rede de correspondentes transfronteiriços.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section id="areas" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-primary)' }}>
              Especialidades
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>
              PRÁTICAS JURÍDICAS E CORPORATIVAS
            </h2>
            <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
              Combinamos rigor técnico doutrinário com uma profunda compreensão da dinâmica dos negócios contemporâneos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceAreas.map((area, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-xl border flex flex-col justify-between transition-all hover:shadow-md"
                style={{ 
                  backgroundColor: 'var(--color-background)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div>
                  <span className="text-xs font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>{area.code}</span>
                  <h3 className="font-heading text-xl font-bold mt-2" style={{ color: 'var(--color-text)' }}>{area.title}</h3>
                  <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--color-muted)' }}>{area.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-medium" style={{ borderColor: 'var(--color-border)' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Track record comprovado</span>
                  <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{area.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section id="metodo" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-primary)' }}>
              Rigor de Governança
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>
              NOSSA METODOLOGIA
            </h2>
            <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
              Processo estruturado que reduz incertezas e antecipa movimentos adversos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodology.map((m, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-xl border"
                style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div className="font-mono text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{m.step}</div>
                <h4 className="font-heading text-lg font-bold mt-4" style={{ color: 'var(--color-text)' }}>{m.title}</h4>
                <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--color-muted)' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sócios */}
      <section id="socios" className="px-6 md:px-12 py-20 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-primary)' }}>
              Liderança
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>
              SÓCIOS ESTRATÉGICOS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((p, idx) => (
              <div 
                key={idx}
                className="border rounded-xl overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--color-background)', 
                  borderColor: 'var(--color-border)' 
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h4 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>{p.name}</h4>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-primary)' }}>{p.role}</div>
                  <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{p.background}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Confidencial */}
      <section id="contato" className="px-6 md:px-12 py-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-4xl mx-auto border rounded-2xl p-8 md:p-12 shadow-xl" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-primary)' }}>
              Confidencialidade Estrita
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>
              SOLICITAR REUNIÃO DIRETIVA
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
              Todas as interações são protegidas por compromisso de sigilo profissional imediato.
            </p>
          </div>

          {meetingSubmitted ? (
            <div className="p-6 rounded-xl border text-center space-y-2" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-primary)' }}>
              <CheckCircle className="w-10 h-10 mx-auto" style={{ color: 'var(--color-primary)' }} />
              <h4 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>Solicitação Recebida</h4>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                Nossa assessoria entrará em contato em até 2 horas úteis para coordenar a agenda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium mb-1" style={{ color: 'var(--color-muted)' }}>Representante / Nome</label>
                  <input 
                    type="text" 
                    defaultValue="Eduardo Brandão" 
                    className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                    style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium mb-1" style={{ color: 'var(--color-muted)' }}>Empresa / Grupo</label>
                  <input 
                    type="text" 
                    defaultValue="Investimentos Holding S/A" 
                    className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                    style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase font-medium mb-1" style={{ color: 'var(--color-muted)' }}>Natureza da Demanda</label>
                <select 
                  className="w-full px-3.5 py-2.5 rounded border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <option>Operação de Fusão / Aquisição (M&A)</option>
                  <option>Disputa Societária ou Arbitragem</option>
                  <option>Reorganização Patrimonial Sucessória</option>
                  <option>Consulta Tributária Estratégica</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded font-bold text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-md"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-background)' 
                }}
              >
                Encaminhar Solicitação ao Comitê de Sócios
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
        style={{ 
          borderColor: 'var(--color-border)', 
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-muted)'
        }}
      >
        <span className="font-heading font-bold" style={{ color: 'var(--color-text)' }}>
          NOVA & ASSOCIADOS ADVOGADOS © 2026 • SÃO PAULO | NOVA YORK
        </span>
        <span>OAB/SP 19.840 • Sigilo e Integridade Institucional</span>
      </footer>
    </div>
  );
};
