import React, { useState } from 'react'
import styles from './ContactSection.module.css'

const INITIAL = { name: '', company: '', email: '', phone: '', message: '' }

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Send failed')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={`section ${styles.contact}`} id="contato">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: form */}
          <div className={styles.formCol}>
            <p className="section-label">Fale conosco</p>
            <h2 className={`section-title section-title--light ${styles.title}`}>
              Pronto para transformar
              <br />
              sua cadeia de fornecimento?
            </h2>
            <p className="section-desc section-desc--light">
              Nossa equipe responde em até 1 dia útil.
            </p>

            {status === 'success' ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>✓</span>
                <div>
                  <strong>Mensagem enviada!</strong>
                  <p>Nossa equipe entrará em contato em breve.</p>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Nome *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="company" className={styles.label}>Empresa *</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={form.company}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>E-mail *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>Telefone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>Mensagem *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Como podemos ajudar?"
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
                </button>
                {status === 'error' && (
                  <p className={styles.errorMsg}>
                    Erro ao enviar. Tente pelo WhatsApp abaixo.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Right: contact info */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contatos diretos</h3>

              <a
                href="https://wa.me/5511988049376"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                <div className={styles.infoIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>WhatsApp</div>
                  <div className={styles.infoValue}>(11) 98804-9376</div>
                </div>
              </a>

              <a href="mailto:comercial@eqpitech.com.br" className={styles.infoLink}>
                <div className={styles.infoIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>E-mail</div>
                  <div className={styles.infoValue}>comercial@eqpitech.com.br</div>
                </div>
              </a>

              <div className={styles.infoLink} style={{ cursor: 'default' }}>
                <div className={styles.infoIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Endereço</div>
                  <div className={styles.infoValue}>
                    Av. Luiz Carlos Berrini, 1681<br />
                    Conj. 111 e 112 — Cidade Monções<br />
                    São Paulo — SP, 04571-011
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              <a
                href="https://www.instagram.com/eqpi.tech"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                @eqpi.tech no Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
