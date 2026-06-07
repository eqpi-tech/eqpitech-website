import React from 'react'
import styles from './ElosSpotlight.module.css'

const DIFFERENTIALS = [
  {
    title: 'Ativos estratégicos',
    desc: 'Fornecedores com dados, compliance e inteligência de negócios — não apenas nomes.',
  },
  {
    title: 'Governança e transparência',
    desc: 'Vitrine qualificada com dados reais e processos auditáveis por compradores e clientes.',
  },
  {
    title: 'Novas oportunidades',
    desc: 'Relacionamentos, parcerias e novos contratos com rastreabilidade total do início ao fim.',
  },
]

const JOURNEY = [
  { num: '01', label: 'Cadastro', desc: 'CNPJ + dados cadastrais automáticos' },
  { num: '02', label: 'Plano', desc: 'Verificado (R$199/ano) ou Homologado (R$690/ano)' },
  { num: '03', label: 'Documentos', desc: 'Upload + validação automática' },
  { num: '04', label: 'Selo ELOS', desc: 'Visibilidade no marketplace' },
]

export default function ElosSpotlight() {
  return (
    <section className={styles.spotlight}>
      {/* Left: navy */}
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <p className="section-label">Destaque do portfólio</p>
          <h2 className={`section-title section-title--light ${styles.title}`}>
            SIGEC ELOS
          </h2>
          <p className={`${styles.tagline}`}>
            Conectando competência a grandes oportunidades
          </p>

          <div className={styles.differentials}>
            {DIFFERENTIALS.map((d) => (
              <div key={d.title} className={styles.diff}>
                <div className={styles.diffBar} aria-hidden="true" />
                <div>
                  <h3 className={styles.diffTitle}>{d.title}</h3>
                  <p className={styles.diffDesc}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://elos.eqpitech.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Acessar SIGEC ELOS
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Right: orange accent */}
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <p className={styles.rightLabel}>Jornada do fornecedor</p>
          <div className={styles.journey}>
            {JOURNEY.map((step, i) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepBody}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepDesc}>{step.desc}</span>
                </div>
                {i < JOURNEY.length - 1 && <div className={styles.stepConnector} aria-hidden="true" />}
              </div>
            ))}
          </div>

          <div className={styles.scoreNote}>
            <span className={styles.scoreTitle}>Score de Conformidade</span>
            <span className={styles.scoreDesc}>Sistema de pontuação 0–100 com alertas de vencimento, follow-up automático e status em tempo real.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
