import React from 'react'
import styles from './BenefitsSection.module.css'

const CLIENT_BENEFITS = [
  'Gestão padronizada e centralizada dos fornecedores',
  'Redução de riscos jurídicos e trabalhistas',
  'Análise fiscal, legal e de compliance integrada',
  'Comparação entre fornecedores em tempo real',
  'Monitoramento proativo de vencimentos',
]

const SUPPLIER_BENEFITS = [
  'Alertas antecipados de vencimentos de documentos',
  'Consultoria fiscal e legal integrada à plataforma',
  'Certificado de aprovação e presença no SIGEC ELOS',
  'Visibilidade para grandes compradores do ecossistema',
  'Score de conformidade e posicionamento no marketplace',
]

function BenefitList({ items, accent }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span
            className={styles.check}
            style={{ color: accent }}
            aria-hidden="true"
          >
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function BenefitsSection() {
  return (
    <section className={`section ${styles.benefits}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Para quem é</p>
          <h2 className="section-title">
            Benefícios para toda a cadeia
          </h2>
        </div>

        <div className={styles.columns}>
          {/* Compradores */}
          <div className={`${styles.col} ${styles.colBlue}`}>
            <div className={styles.colHead}>
              <svg className={styles.colIcon} aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E3192" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21v-4a3 3 0 0 1 6 0v4"/>
                <rect x="9" y="10" width="2" height="3" rx="0.5"/>
                <rect x="13" y="10" width="2" height="3" rx="0.5"/>
              </svg>
              <h3 className={styles.colTitle}>Para compradores</h3>
            </div>
            <BenefitList items={CLIENT_BENEFITS} accent="#2E3192" />
          </div>

          {/* Fornecedores */}
          <div className={`${styles.col} ${styles.colTeal}`}>
            <div className={styles.colHead}>
              <svg className={styles.colIcon} aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00BFA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20V10l6-6 4 4 4-4 6 6v10H2z"/>
                <path d="M10 20v-5h4v5"/>
                <circle cx="7" cy="14" r="1"/>
                <circle cx="17" cy="14" r="1"/>
              </svg>
              <h3 className={styles.colTitle}>Para fornecedores</h3>
            </div>
            <BenefitList items={SUPPLIER_BENEFITS} accent="#00BFA5" />
          </div>
        </div>
      </div>
    </section>
  )
}
