# Hero Video — Handoff para Claude Code

## O que fazer

Substituir os dois arquivos do `HeroSection` pelos novos abaixo.
O vídeo gerado pelo Kling AI já deve estar comprimido e em `/public/`.

---

## Pré-requisitos — arquivos de vídeo

Antes de implementar, confirme que estes dois arquivos existem em `/public/`:

```
public/
├── hero.mp4      (H.264, < 6MB)
└── hero.webm     (VP9,   < 4MB)
```

Se ainda não existirem, o site funciona normalmente com a imagem estática `bg-banner.png` como fallback — pode implementar e testar sem o vídeo.

### Como gerar os arquivos (se ainda não feito)

```bash
# Comprimir o .mp4 original do Kling para web
ffmpeg -i hero_kling.mp4 \
  -c:v libx264 -crf 28 -preset slow \
  -vf "scale=1920:-2" \
  -an -movflags +faststart \
  public/hero.mp4

# Gerar .webm a partir do .mp4 comprimido
ffmpeg -i public/hero.mp4 \
  -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -an \
  public/hero.webm

# Verificar tamanhos — se > 6MB, aumentar -crf para 32/40
ls -lh public/hero.mp4 public/hero.webm
```

---

## Implementação

### 1. Substituir `src/components/HeroSection/HeroSection.jsx`

```jsx
import React, { useRef, useEffect, useState } from 'react'
import styles from './HeroSection.module.css'

const STATS = [
  { value: '60k+', label: 'Fornecedores ativos' },
  { value: '7,2bi', label: 'Documentos analisados' },
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
```

---

### 2. Substituir `src/components/HeroSection/HeroSection.module.css`

```css
/* Hero wrapper */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-top: 68px;
  background: var(--navy-deep);
}

/* Video layer */
.videoBg {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.videoVisible {
  opacity: 1;
}

.videoBg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Static image fallback */
.imageBg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 1s ease;
}

.imageFaded {
  opacity: 0;
}

/* Dark overlay */
.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    135deg,
    rgba(15, 17, 40, 0.86) 0%,
    rgba(27, 31, 59, 0.78) 55%,
    rgba(15, 17, 40, 0.72) 100%
  );
}

/* Grid texture */
.grid {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

/* Content */
.content {
  position: relative;
  z-index: 3;
  padding-top: 80px;
  padding-bottom: 120px;
  max-width: 780px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 500;
  color: var(--orange);
  letter-spacing: 0.04em;
  margin-bottom: 24px;
  opacity: 0;
  animation: fadeUp 0.5s var(--ease) 0.1s forwards;
}

.eyebrowDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--orange);
  flex-shrink: 0;
}

.heading {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  font-weight: 800;
  line-height: 1.08;
  color: var(--white);
  letter-spacing: -0.02em;
  opacity: 0;
  animation: fadeUp 0.5s var(--ease) 0.2s forwards;
}

.headingAccent {
  color: var(--orange);
}

.subtext {
  margin-top: 24px;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--text-on-dark);
  max-width: 600px;
  line-height: 1.7;
  opacity: 0;
  animation: fadeUp 0.5s var(--ease) 0.35s forwards;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
  opacity: 0;
  animation: fadeUp 0.5s var(--ease) 0.45s forwards;
}

/* Stats bar */
.statsBar {
  position: relative;
  z-index: 3;
  background: rgba(0, 0, 0, 0.35);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  animation: fadeUp 0.5s var(--ease) 0.6s forwards;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 28px 0;
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 0 16px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.statItem:last-child {
  border-right: none;
}

.statValue {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--orange);
  line-height: 1;
}

.statLabel {
  font-size: 12px;
  color: var(--text-on-dark);
  letter-spacing: 0.02em;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    padding-top: 48px;
    padding-bottom: 60px;
  }

  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .statItem:nth-child(2) { border-right: none; }
  .statItem:nth-child(3),
  .statItem:nth-child(4) {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
}

@media (max-width: 480px) {
  .actions { flex-direction: column; }
  .actions .btn { text-align: center; justify-content: center; }
}
```

---

## Como funciona (para referência)

```
Camada z-index  Elemento           Comportamento
──────────────────────────────────────────────────────────
0               .imageBg           bg-banner.png — aparece imediatamente
0               .videoBg           opacity:0 → 1 quando vídeo pronto (1.2s fade)
1               .overlay           gradiente navy escuro, sempre visível
2               .grid              textura de grade sutil, pointer-events:none
3               .content           texto + CTAs
3               .statsBar          barra inferior com backdrop-filter blur
```

**Mobile:** `useMatchMedia('(max-width: 768px)')` bloqueia o render do `<video>` inteiro — nenhum byte de vídeo é baixado em celular. A imagem estática aparece normalmente.

**Crossfade:** Quando o vídeo emite `onCanPlay`, `videoLoaded` vira `true`. `.videoVisible` adiciona `opacity:1` no vídeo enquanto `.imageFaded` zera a opacidade da imagem. Resultado: transição suave sem flash.

**Autoplay:** Chamada explícita via `video.play()` após `canplaythrough` para contornar políticas de browsers que ignoram o atributo `autoplay` sem interação do usuário.

---

## Checklist de validação

- [ ] `npm run dev` sobe sem erros
- [ ] Abre no Chrome desktop — vídeo aparece com fade suave após ~1s
- [ ] Abre no Safari iOS — mostra `bg-banner.png` estática, sem flash branco
- [ ] Abre no Chrome mobile — sem vídeo, imagem estática
- [ ] Sem vídeos em `/public/` — site mostra só a imagem, sem erro no console
- [ ] DevTools Network: `hero.webm` é requisitado apenas em desktop
