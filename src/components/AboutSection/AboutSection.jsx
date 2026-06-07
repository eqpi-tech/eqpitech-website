import React from 'react'
import styles from './AboutSection.module.css'

const PILLARS = [
  {
    icon: '⬡',
    title: 'Gestão de contratos e fornecedores',
    desc: 'Larga experiência e metodologia consolidada para operar sua cadeia com eficiência e segurança.',
    color: 'navy',
  },
  {
    icon: '◈',
    title: '20 anos em tecnologia',
    desc: 'Experiência técnica profunda aplicada a processos de homologação, compliance e gestão contratual.',
    color: 'orange',
  },
  {
    icon: '⬟',
    title: 'Eficiência + redução de custos',
    desc: 'Eliminação de vícios de processo, retrabalho e riscos jurídicos — com rastreabilidade total.',
    color: 'teal',
  },
]

export default function AboutSection() {
  return (
    <section className={`section ${styles.about}`} id="sobre">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: text */}
          <div className={styles.textCol}>
            <p className="section-label">Quem somos</p>
            <h2 className={`section-title ${styles.title}`}>
              DNA de parcerias sólidas,
              <br />
              há mais de 12 anos no mercado
            </h2>
            <p className={`section-desc ${styles.desc}`}>
              A EQPI Tech é especializada em soluções sob medida e completas para
              os desafios da gestão de fornecedores. Nossas plataformas unem
              ferramentas próprias, customizações, integrações e prestação de
              serviço — entregando controle, compliance e rastreabilidade em toda
              a sua cadeia produtiva.
            </p>
            <a href="#contato" className={`btn btn-outline-dark ${styles.cta}`}>
              Conheça nossas soluções
            </a>
          </div>

          {/* Right: pillars */}
          <div className={styles.pillarsCol}>
            {PILLARS.map((p) => (
              <div key={p.title} className={`${styles.pillar} ${styles[`pillar--${p.color}`]}`}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  {p.icon}
                </div>
                <div>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
