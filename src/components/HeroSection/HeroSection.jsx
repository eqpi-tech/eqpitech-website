import React, { useRef, useEffect, useState } from 'react'
import styles from './HeroSection.module.css'

const STATS = [
  { value: '60k+', label: 'Fornecedores ativos' },
  { value: '7,2mi', label: 'Documentos analisados' },
  { value: '31%',   label: 'Redução de riscos' },
  { value: '12+',   label: 'Anos de experiência' },
]

export default function HeroSection() {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || isMobile) return
    const tryPlay = () => {
      video.play().catch(() => {})
    }
    if (video.readyState >= 3) {
      tryPlay()
    } else {
      video.addEventListener('canplaythrough', tryPlay, { once: true })
    }
  }, [isMobile])

  return (
    <section className={styles.hero} id="hero">

      {/* Video background — desktop only */}
      {!isMobile && (
        <div className={`${styles.videoBg} ${videoLoaded ? styles.videoVisible : ''}`}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/bg-banner.png"
            onCanPlay={() => setVideoLoaded(true)}
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4"  type="video/mp4"  />
          </video>
        </div>
      )}

      {/* Static fallback — mobile + while video loads */}
      <div
        className={`${styles.imageBg} ${videoLoaded && !isMobile ? styles.imageFaded : ''}`}
        style={{ backgroundImage: 'url(/bg-banner.png)' }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Grid texture */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Plataforma líder em gestão de fornecedores
        </div>

        <h1 className={styles.heading}>
          Transformando fornecedores
          <br />
          <span className={styles.headingAccent}>em inteligência operacional</span>
        </h1>

        <p className={styles.subtext}>
          Homologação, compliance e marketplace integrados numa única plataforma.
          Mais de 60 mil fornecedores. Mais de 12 anos conectando grandes empresas
          aos seus melhores parceiros.
        </p>

        <div className={styles.actions}>
          <a href="#contato" className="btn btn-primary">
            Falar com especialista
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="https://elos.eqpitech.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Acessar SIGEC ELOS
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
