import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
// Logo: /public/logos/Logo_EQPI.svg → served at /logos/Logo_EQPI.svg
// Usage: <img src="/logos/Logo_EQPI.svg" alt="EQPI Tech" className={styles.logoImg} />
// Uncomment the <img> line in the JSX below once the file is in place.

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'História', href: '#historia' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route click
  const handleLink = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#" className={styles.logo} aria-label="EQPI Tech — início">
          <img src="/logos/Logo_EQPI.svg" alt="EQPI Tech" className={styles.logoImg} />
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={styles.link}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contato"
          className={`btn btn-primary ${styles.cta}`}
        >
          Falar com especialista
        </a>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.drawerLink}
              onClick={handleLink}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className={`btn btn-primary ${styles.drawerCta}`}
            onClick={handleLink}
          >
            Falar com especialista
          </a>
        </div>
      )}
    </nav>
  )
}
