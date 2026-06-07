import React from 'react'
import styles from './ClientsSection.module.css'

/**
 * All 20 client logos available in /public/logos/
 * - 14 from eqpi_site_old GitHub repo (SVG/PNG)
 * - 6 extracted from SITE_.pptx slide 22 (PNG/JPG)
 */
const CLIENTS = [
  // Row 1
  { name: 'Sapura Energy',        file: 'Logo_Clientes_Sapura.svg'         },
  { name: 'Kinross',              file: 'Logo_Clientes_Kinross.svg'         },
  { name: 'Atlantic Nickel',      file: 'Logo_Clientes_Atlantic.svg'        },
  { name: 'Aura 360° Mining',     file: 'Logo_Clientes_Aura.svg'            },
  { name: 'FAMESP',               file: 'Logo_Clientes_Famesp.svg'          },
  // Row 2
  { name: 'SPMAR Rodoanel',       file: 'Logo_Clientes_SPMar.svg'           },
  { name: 'Serra Verde',          file: 'Logo_Clientes_Mining.svg'          },
  { name: 'AngloGoldAshanti',     file: 'Logo_Clientes_AngloGold.svg'       },
  { name: 'CSN',                  file: 'Logo_Clientes_CSN.svg'             },
  { name: 'Seagems',              file: 'Logo_Clientes_Seagems.png'         },
  // Row 3
  { name: 'Appian Capital',       file: 'Logo_Clientes_AppianCapital.png'   },
  { name: 'Nexa',                 file: 'Logo_Clientes_Nexa.png'            },
  { name: 'Mineração Vale Verde', file: 'Logo_Clientes_MinValeVerde.svg'    },
  { name: 'OZ Minerals',          file: 'Logo_Clientes_OZMinerals.png'      },
  { name: 'Vixpar',               file: 'Logo_Clientes_Vixpar.png'          },
  // Row 4
  { name: 'AES Brasil',           file: 'Logo_Clientes_AES.svg'             },
  { name: 'Graphcoa',             file: 'Logo_Clientes_Graphcoa.png'        },
  { name: 'Omnigen Energy',       file: 'Logo_Clientes_Omnigen.jpg'         },
  { name: 'Chemtrade',            file: 'Logo_Clientes_Chemtrade.png'       },
  { name: 'CSG Serra Gaúcha',     file: 'Logo_Clientes_CSG.png'             },
]

export default function ClientsSection() {
  return (
    <section className={`section ${styles.clients}`} id="clientes">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Nossos clientes</p>
          <h2 className="section-title">
            Empresas líderes de diversos setores
            <br />
            confiam no SIGEC
          </h2>
          <p className="section-desc">
            De mineradoras globais a concessionárias de infraestrutura — o
            ecossistema EQPI Tech opera nas cadeias mais exigentes do Brasil.
          </p>
        </div>

        <div className={styles.grid}>
          {CLIENTS.map((c) => (
            <div key={c.name} className={styles.logoCard} title={c.name}>
              <img
                src={`/logos/${c.file}`}
                alt={c.name}
                className={styles.logoImg}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'block'
                }}
              />
              <span className={styles.logoText} style={{ display: 'none' }}>{c.name}</span>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          +60 mil fornecedores cadastrados no ecossistema EQPI Tech
        </p>
      </div>
    </section>
  )
}
