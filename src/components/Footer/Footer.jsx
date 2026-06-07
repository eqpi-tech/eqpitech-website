import React from 'react'
import styles from './Footer.module.css'

const PRODUCTS = [
  { label: 'SIGEC HOC', href: '#solucoes' },
  { label: 'SIGEC WEB', href: '#solucoes' },
  { label: 'SIGEC ELOS', href: 'https://elos.eqpitech.com.br' },
  { label: 'BC Report', href: '#solucoes' },
  { label: 'MOBI', href: '#solucoes' },
  { label: 'COA', href: '#solucoes' },
]

const LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'História', href: '#historia' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contato', href: '#contato' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <img src="/logos/Logo_EQPI.svg" alt="EQPI Tech" className={styles.logoImg} />
            <p className={styles.tagline}>
              A plataforma que transforma a gestão de fornecedores em inteligência operacional.
            </p>
            <a
              href="https://www.instagram.com/eqpi.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              Instagram @eqpi.tech
            </a>
            <a
              href="https://www.linkedin.com/company/eqpi-tech-software-solu%C3%A7%C3%B5es-corporativas"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
            >
              LinkedIn
            </a>
          </div>

          {/* Col 2: Products */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Soluções</h4>
            <ul className={styles.navList}>
              {PRODUCTS.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    className={styles.navLink}
                    target={p.href.startsWith('http') ? '_blank' : undefined}
                    rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Empresa</h4>
            <ul className={styles.navList}>
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={styles.navLink}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contato</h4>
            <div className={styles.contactList}>
              <a href="tel:+5511988049376" className={styles.contactItem}>
                (11) 98804-9376
              </a>
              <a href="mailto:comercial@eqpitech.com.br" className={styles.contactItem}>
                comercial@eqpitech.com.br
              </a>
              <p className={styles.address}>
                Av. Luiz Carlos Berrini, 1681<br />
                Conj. 111 e 112 — São Paulo, SP
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} EQPI Tech. Todos os direitos reservados.</span>
          <span>Equipo Info Serviços de TI Ltda — CNPJ 21.270.860/0001-15</span>
        </div>
      </div>
    </footer>
  )
}
