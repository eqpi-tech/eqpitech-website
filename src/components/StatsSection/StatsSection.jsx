import React, { useEffect, useRef, useState } from 'react'
import styles from './StatsSection.module.css'

function AnimatedNumber({ end, suffix = '', prefix = '', decimals = 0 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const startTime = performance.now()
          const step = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(eased * end)
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  const display =
    decimals > 0
      ? value.toFixed(decimals).replace('.', ',')
      : Math.round(value).toLocaleString('pt-BR')

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

const STATS = [
  {
    number: 60,
    suffix: 'k+',
    label: 'Fornecedores ativos',
    detail: 'na base do ecossistema EQPI Tech',
  },
  {
    number: 7.2,
    suffix: 'mi',
    decimals: 1,
    label: 'Documentos analisados',
    detail: 'desde o início das operações em 2014',
  },
  {
    number: 31,
    suffix: '%',
    label: 'Redução de riscos',
    detail: 'em contratos de terceirização',
  },
  {
    number: 12,
    suffix: '+',
    label: 'Anos de experiência',
    detail: 'no mercado brasileiro de compliance',
  },
]

export default function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.value}>
                <AnimatedNumber
                  end={s.number}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                />
              </div>
              <div className={styles.label}>{s.label}</div>
              <div className={styles.detail}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
