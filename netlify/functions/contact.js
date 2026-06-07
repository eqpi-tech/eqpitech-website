/**
 * Netlify Function: contact
 * Receives contact form data and forwards to comercial@eqpitech.com.br via Resend.
 *
 * Environment variables (set in Netlify dashboard):
 *   RESEND_API_KEY  — Resend API key
 *   SEND_EMAIL_TO   — "comercial@eqpitech.com.br"
 *   SEND_EMAIL_FROM — "noreply@eqpitech.com.br"
 */

const ALLOWED_ORIGIN = 'https://eqpitech.com.br'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method not allowed' }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { name, company, email, phone, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      statusCode: 422,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Nome, e-mail e mensagem são obrigatórios.' }),
    }
  }

  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!basicEmailRegex.test(email)) {
    return {
      statusCode: 422,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'E-mail inválido.' }),
    }
  }

  const to = process.env.SEND_EMAIL_TO || 'comercial@eqpitech.com.br'
  const from = process.env.SEND_EMAIL_FROM || 'noreply@eqpitech.com.br'
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY não configurada')
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Configuração de e-mail ausente.' }),
    }
  }

  const subject = `[Site EQPI Tech] Contato de ${name.trim()}${company?.trim() ? ` — ${company.trim()}` : ''}`

  const textBody = [
    'Nova mensagem pelo site eqpitech.com.br',
    '',
    `Nome:     ${name.trim()}`,
    `Empresa:  ${company?.trim() || '—'}`,
    `E-mail:   ${email.trim()}`,
    `Telefone: ${phone?.trim() || '—'}`,
    '',
    'Mensagem:',
    message.trim(),
  ].join('\n')

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1B1F3B">
      <div style="background:#1B1F3B;padding:24px 32px;border-radius:8px 8px 0 0">
        <p style="color:#ffffff;margin:0;font-size:18px;font-weight:700">Nova mensagem — site eqpitech.com.br</p>
      </div>
      <div style="background:#F4F6FA;padding:32px;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#6B7280;width:100px">Nome</td><td style="padding:8px 0;font-weight:600">${esc(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Empresa</td><td style="padding:8px 0">${esc(company) || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">E-mail</td><td style="padding:8px 0"><a href="mailto:${esc(email)}" style="color:#2E3192">${esc(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Telefone</td><td style="padding:8px 0">${esc(phone) || '—'}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #E8EBF4;margin:20px 0"/>
        <p style="color:#6B7280;margin:0 0 8px">Mensagem:</p>
        <p style="white-space:pre-wrap;margin:0">${esc(message)}</p>
      </div>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `EQPI Tech Site <${from}>`,
        to: [to],
        reply_to: `${name.trim()} <${email.trim()}>`,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[contact] Resend error:', response.status, errText)
      return {
        statusCode: 502,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Falha ao enviar e-mail. Tente novamente.' }),
      }
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true }),
    }
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Erro interno. Tente novamente.' }),
    }
  }
}

function esc(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
