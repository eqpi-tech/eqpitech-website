# EQPI Tech — Website Handoff

> Leia este documento antes de escrever qualquer linha de código.

---

## Contexto

Site institucional da **EQPI Tech** (https://eqpitech.com.br), empresa dona do ecossistema SIGEC.
O site atual precisa ser substituído por uma versão mais moderna que reflita o portfólio completo
da empresa conforme o deck de apresentação do CEO (SITE_.pptx).

**Stack:** React + Vite — mesma base do SIGEC-ELOS (`elos.eqpitech.com.br`) para facilitar
compartilhamento de componentes no futuro.

**Hospedagem:** Netlify (novo site, ou substituindo o existente no mesmo domínio)

---

## Estrutura do projeto

```
eqpitech-website/
├── package.json
├── vite.config.js
├── index.html
├── netlify.toml
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css              ← tokens de design, reset, utilitários
│   ├── components/
│   │   ├── Navbar/            ← sticky, transparente → sólida no scroll, hamburger mobile
│   │   ├── HeroSection/       ← dark navy, heading grande, 2 CTAs, stats bar
│   │   ├── AboutSection/      ← Quem Somos, 3 pilares
│   │   ├── SolutionsSection/  ← 6 cards clicáveis (HOC, WEB, ELOS, BC, MOBI, COA)
│   │   ├── ElosSpotlight/     ← destaque SIGEC ELOS, split layout navy/orange
│   │   ├── StatsSection/      ← 4 contadores animados no scroll
│   │   ├── BenefitsSection/   ← para compradores vs para fornecedores
│   │   ├── ClientsSection/    ← grid de 20 logos
│   │   ├── ContactSection/    ← formulário + info de contato
│   │   └── Footer/            ← 4 colunas, dark
│   └── hooks/
│       └── useCountUp.js
├── netlify/
│   └── functions/
│       └── contact.js         ← recebe form e encaminha p/ comercial@eqpitech.com.br
└── WEBSITE_HANDOFF.md
```

---

## Decisões bloqueadas (não alterar)

| Item | Decisão |
|------|---------|
| Stack | React + Vite + CSS Modules |
| Hospedagem | Netlify |
| Paleta | navy `#1B1F3B`, `#2E3192`, orange `#F47E2F`, teal `#00BFA5` |
| Tipografia | Outfit (headings) + DM Sans (body) |
| Email contato | `comercial@eqpitech.com.br` |
| WhatsApp | `(11) 98804-9376` |
| Instagram | `@eqpi.tech` |
| Link ELOS | `https://elos.eqpitech.com.br` |

---

## Tarefas para Claude Code — por prioridade

### Etapa 1 — Instalação e primeira build

```bash
cd eqpitech-website
npm install
npm run dev
```

Verificar que o site abre sem erros em `localhost:5173`.

---

### Etapa 2 — Logos dos clientes

Todos os logos foram copiados do repositório `eqpi_site_old` para `/public/logos/`.

**Logos disponíveis (confirmados do repo):**

| Arquivo | Cliente |
|---------|---------|
| `Logo_Clientes_AngloGold.svg` | AngloGoldAshanti |
| `Logo_Clientes_Sapura.svg` | Sapura Energy |
| `Logo_Clientes_AES.svg` | AES Brasil |
| `Logo_Clientes_Famesp.svg` | FAMESP |
| `Logo_Clientes_Atlantic.svg` | Atlantic Nickel |
| `Logo_Clientes_Mining.svg` | Serra Verde |
| `Logo_Clientes_SPMar.svg` | SPMAR Rodoanel |
| `Logo_Clientes_Aura.svg` | Aura 360° Mining |
| `Logo_Clientes_CSN.svg` | CSN |
| `Logo_Clientes_Yamana.svg` | Yamana (adquirida pela Agnico Eagle em 2023 — verificar se ainda usa) |
| `Logo_Clientes_Kinross.svg` | Kinross |
| `Logo_Clientes_LundinMining.svg` | Lundin Mining |
| `Logo_Clientes_MinValeVerde.svg` | Mineração Vale Verde |
| `Logo_Clientes_PAGold.png` | PA Gold |
| `Logo_Clientes_CSG.png` | CSG Serra Gaúcha |
| `Logo_Clientes_Ipe.svg` | Cliente Ipê (no repo mas não no HTML antigo — confirmar com Luiz) |

**Logos necessários (deck do CEO, sem arquivo ainda):**
Seagems · Appian Capital · Nexa · OZ Minerals · Vixpar · Graphcoa · Omnigen Energy · Chemtrade

---

### Etapa 3 — Imagens de produto disponíveis

Copiadas do `eqpi_site_old` para `/public/`:

| Arquivo | Dimensões | Uso sugerido |
|---------|-----------|--------------|
| `bg-banner.png` | 2118×992 | ✅ Já usado como fundo do Hero |
| `img-tela01.png` | 513×312 | SolutionsSection ou AboutSection — mostra a UI do SIGEC |
| `img-tela02.png` | 515×291 | SolutionsSection — segunda tela |
| `img-tela03.png` | 506×397 | SolutionsSection — terceira tela |
| `logo_sigec_elos.png` | — | ElosSpotlight — logo do produto ELOS |
| `Logo_EQPI.svg` | — | ✅ Já usado na Navbar e Footer |

---

### Etapa 4 — Netlify Function de contato

O arquivo `netlify/functions/contact.js` está scaffoldado com TODOs.

1. Ver como o envio de e-mail funciona em `SIGEC-ELOS/netlify/functions/send-email.js`
2. Reutilizar o mesmo provider (SendGrid ou outro já configurado)
3. Variáveis de ambiente necessárias no painel Netlify:
   - `SEND_EMAIL_TO=comercial@eqpitech.com.br`
   - `SEND_EMAIL_FROM=noreply@eqpitech.com.br`  
   - `SENDGRID_API_KEY` (ou o equivalente do provider atual)

---

### Etapa 5 — Imagem de hero (opcional, alto impacto)

O `HeroSection` usa decoração geométrica por CSS puro (círculos + grid).
Para elevar o impacto visual, considerar:
- Uma imagem de fundo de mineradora/indústria (opaca, navy overlay forte)
- Ou manter o look geométrico atual

Se adicionar imagem: usar `background-image` com overlay `linear-gradient(rgba(15,17,40,0.85), rgba(15,17,40,0.9))`.

---

### Etapa 6 — SEO e meta tags

1. Atualizar `index.html`:
   - `og:image` com screenshot/banner 1200×630
   - `og:url` = `https://eqpitech.com.br`

2. Opcional: adicionar `sitemap.xml` e `robots.txt` em `/public`

---

### Etapa 7 — Deploy

1. Criar novo site no Netlify (ou vincular ao repositório)
2. Configurar domínio `eqpitech.com.br`
3. Adicionar variáveis de ambiente da função de contato
4. Confirmar redirect `/* → /index.html 200` já está no `netlify.toml`

---

## Design tokens principais

```css
/* Cores */
--navy-deep:    #0F1128;
--navy:         #1B1F3B;
--navy-mid:     #2E3192;
--orange:       #F47E2F;
--orange-light: #FF9A4D;
--teal:         #00BFA5;
--white:        #FFFFFF;
--light:        #F4F6FA;
--grey:         #9B9B9B;

/* Tipografia */
--font-heading: 'Outfit', sans-serif;
--font-body:    'DM Sans', sans-serif;

/* Espaçamento */
--section-y:    96px;
--container:    1200px;
```

---

## Pontos de integração futura com SIGEC-ELOS

| Site EQPI Tech | SIGEC-ELOS |
|----------------|-----------|
| Link "Acessar SIGEC ELOS" | `https://elos.eqpitech.com.br` |
| Tokens de design (`index.css`) | Pode ser extraído p/ `@eqpi/ui` compartilhado |
| `Navbar.module.css` | Mesmas classes base que `LandingPage.jsx` do ELOS |
| Email provider | Mesmo `send-email.js` já configurado no ELOS |

---

## Contatos / dados fixos

- **Telefone/WhatsApp:** (11) 98804-9376
- **Email comercial:** comercial@eqpitech.com.br
- **Instagram:** @eqpi.tech
- **Site atual:** https://eqpi.tech / https://eqpitech.com.br
- **SIGEC ELOS:** https://elos.eqpitech.com.br
- **Endereço:** Av. Luiz Carlos Berrini, 1681, Conj. 111 e 112, Cidade Monções, CEP 04571-011, São Paulo — SP

---

*Handoff gerado em: junho 2026*
*Baseado em: SITE_.pptx (deck do CEO) + Estudo_e_Proposta_SIGECELOS.pdf*
