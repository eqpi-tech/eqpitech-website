import React, { useState } from 'react'
import styles from './SolutionsSection.module.css'

const SOLUTIONS = [
  {
    id: 'hoc',
    tag: 'SIGEC HOC',
    title: 'Homologação & Monitoramento',
    desc: 'A plataforma completa de gestão de fornecedores. Homologação, monitoramento, compliance e certificação — com monitoramento automático e proativo de vencimentos.',
    features: ['Monitoramento automático de vencimentos', 'Portal exclusivo de documentação', 'Conformidade contínua', 'Carta de Exceção e Restrição Administrativa'],
    color: '#2E3192',
    accent: '#3D4499',
  },
  {
    id: 'web',
    tag: 'SIGEC WEB',
    title: 'Gestão de Contratos',
    desc: 'A plataforma completa de gestão de contratos e mobilização de terceiros. Controle, Medição, Desempenho e compliance — com visibilidade total no ciclo dos contratos.',
    features: ['Controle de documentos 24/7', 'Avaliação de desempenho', 'Boletim de medição automático', 'Análise Make or Buy'],
    color: '#1B1F3B',
    accent: '#2E3192',
  },
  {
    id: 'elos',
    tag: 'SIGEC ELOS',
    title: 'Pré-homologação & Marketplace',
    desc: 'Pré-homologação e marketplace de fornecedores, conectando competência a grandes oportunidades. Vitrine qualificada com dados reais e processos auditáveis.',
    features: ['Pré-homologação automatizada', 'Marketplace B2B', 'Selo ELOS Verificado e Homologado', 'Integração com SIGEC HOC'],
    color: '#F47E2F',
    accent: '#FF9A4D',
    highlight: true,
  },
  {
    id: 'bc',
    tag: 'BC REPORT',
    title: 'Background Check Completo',
    desc: 'Relatório completo de análise de empresas e parceiros. Identidade, Integridade, Listas restritivas, Jurídico e Financeiro — com score EQPI de 0 a 100.',
    features: ['Consulta CEIS, CNEP, OFAC, ONU', 'Score de risco 0–100', 'Análise Serasa integrada', 'Rastreabilidade e evidências'],
    color: '#00BFA5',
    accent: '#008F7A',
  },
  {
    id: 'mobi',
    tag: 'MOBI',
    title: 'Mobilização de Terceiros',
    desc: 'Outsourcing completo — sistema e mão de obra para mobilização de fornecedores fixos e eventuais. Conformidade, Documentação, SST e controle de acesso.',
    features: ['SLA de 3 dias úteis', 'Liberação de acesso integrada', 'Obrigações trabalhistas e SST', 'Notificações automáticas'],
    color: '#1B1F3B',
    accent: '#2E3192',
  },
  {
    id: 'coa',
    tag: 'COA',
    title: 'Controle de Obrigações Acessórias',
    desc: 'Outsourcing completo para o controle das obrigações acessórias dos terceiros. Trabalhista, Previdenciário e Compliance — com liberação de pagamentos integrada.',
    features: ['Validação mensal por competência', 'Liberação ou bloqueio de faturamento', 'Portal 24/7', 'Segurança jurídica documentada'],
    color: '#0F1128',
    accent: '#1B1F3B',
  },
]

export default function SolutionsSection() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section className={`section ${styles.solutions}`} id="solucoes">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Portfólio de soluções</p>
          <h2 className="section-title section-title--light">
            Uma plataforma para cada etapa
            <br />
            da sua cadeia de fornecimento
          </h2>
          <p className="section-desc section-desc--light">
            Do primeiro contato com um fornecedor até a gestão do contrato em operação
            — o ecossistema EQPI Tech cobre cada etapa.
          </p>
        </div>

        <div className={styles.grid}>
          {SOLUTIONS.map((s) => (
            <div
              key={s.id}
              className={`${styles.card} ${s.highlight ? styles.cardHighlight : ''} ${expanded === s.id ? styles.cardOpen : ''}`}
              style={{ '--card-color': s.color, '--card-accent': s.accent }}
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardTag}>{s.tag}</span>
                <svg
                  className={styles.cardArrow}
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  style={{ transform: expanded === s.id ? 'rotate(180deg)' : 'none' }}
                  aria-hidden="true"
                >
                  <path d="M4.5 7 L9 11.5 L13.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>

              {expanded === s.id && (
                <ul className={styles.featureList}>
                  {s.features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span className={styles.featureDot} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {s.id === 'elos' && (
                <a
                  href="https://elos.eqpitech.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardCta}
                  onClick={(e) => e.stopPropagation()}
                >
                  Acessar plataforma →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
