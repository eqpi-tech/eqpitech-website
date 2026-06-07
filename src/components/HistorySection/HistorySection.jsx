import React from 'react'
import styles from './HistorySection.module.css'

const MILESTONES = [
  {
    year: '2014',
    title: 'Fundação',
    desc: 'Surge a Equipo Info com a missão de atender as necessidades na gestão de contratos e fornecedores em grandes operações.',
  },
  {
    year: '2016',
    title: 'Lançamento do HOC',
    desc: 'Sistema de Homologação Cadastral, referência no controle de exigências e monitoramento documental baseado em categoria de compra.',
  },
  {
    year: '2018',
    title: 'Lançamento do SIGEC-WEB',
    desc: 'Plataforma expansível, configurável e integrável para gestão de contratos — atendendo múltiplos clientes de grande porte.',
  },
  {
    year: '2021',
    title: 'Inteligência com BC Report',
    desc: 'Ferramenta estratégica de enriquecimento e análise de informações sobre pessoas e empresas parceiras.',
  },
  {
    year: '2023',
    title: 'Integração Total',
    desc: 'SIGEC HOC, SIGEC WEB e BC Report formam um ecossistema inteligente para atender diversos setores da economia.',
  },
  {
    year: '2025',
    title: 'Equipo Info se torna EQPI Tech',
    desc: 'Nasce com o propósito de potencializar grandes setores com Inteligência Artificial, automação e integração digital.',
  },
]

export default function HistorySection() {
  return (
    <section className={`section ${styles.history}`} id="historia">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Nossa trajetória</p>
          <h2 className="section-title">
            Mais de 12 anos construindo
            <br />
            o padrão em gestão de fornecedores
          </h2>
        </div>

        <div className={styles.timeline}>
          {MILESTONES.map((m, i) => (
            <div key={m.year} className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.yearBadge}>{m.year}</div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{m.title}</h3>
                <p className={styles.cardDesc}>{m.desc}</p>
              </div>
            </div>
          ))}

          {/* Vertical line */}
          <div className={styles.line} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
