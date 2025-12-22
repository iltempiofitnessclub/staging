"use client";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/doghouse.css";
import "@/styles/legal.css";

import {
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { publicAsset } from "@/lib/publicAsset";

const BRAND_NAME = "DogHouse Boxing";
const BRAND_EMAIL = "tempiofitness@gmail.com";

export default function DoghouseCookiePolicyPage() {
  return (
    <div className="doghouse-page legal-page">
      <MainHeader
        className="doghouse-header"
        logoSrc={publicAsset("/doghouse-logo.png")}
        logoAlt={BRAND_NAME}
        navItems={[
          { label: "Home", href: "/doghouse" },
          { label: "Chi siamo", href: "/doghouse#chi-siamo" },
          { label: "Corsi", href: "/doghouse#corsi" },
          { label: "Contatti", href: "/doghouse#contatti" },
        ]}
      />

      <main className="legal-main">
        <div className="legal-inner">
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2025</p>

          <section className="legal-section">
            <h2>1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al
              dispositivo dell&apos;utente, dove vengono memorizzati per essere poi
              ritrasmessi agli stessi siti alla visita successiva. I cookie
              permettono di migliorare l&apos;esperienza di navigazione e di
              raccogliere informazioni in forma aggregata sull&apos;utilizzo del sito.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Tipologie di cookie utilizzati</h2>
            <ul>
              <li>
                Cookie tecnici: necessari al corretto funzionamento del sito e
                alla fruizione dei servizi richiesti dall&apos;utente.
              </li>
              <li>
                Cookie statistici o di analisi: utilizzati in forma aggregata
                per raccogliere informazioni sul numero di utenti e su come
                questi visitano il sito.
              </li>
              <li>
                Cookie di profilazione di terze parti: eventualmente impiegati
                da servizi esterni (ad esempio strumenti di marketing o social
                media) per creare profili relativi all&apos;utente e mostrare
                contenuti o annunci in linea con i suoi interessi.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Cookie di terze parti</h2>
            <p>
              Il sito può integrare servizi di terze parti, come ad esempio
              strumenti di analisi del traffico (Google Analytics), player video
              o pulsanti social. Questi fornitori possono installare cookie
              autonomi sul dispositivo dell&apos;utente. Per maggiori informazioni sui
              relativi trattamenti, si rimanda alle informative privacy dei
              singoli soggetti terzi.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Gestione dei cookie</h2>
            <p>
              Alla prima visita sul sito è possibile gestire le preferenze
              tramite l&apos;apposito banner. In qualunque momento l&apos;utente può
              modificare o revocare il consenso attraverso le impostazioni del
              browser, scegliendo se accettare o rifiutare i cookie. La
              disattivazione di alcuni cookie potrebbe compromettere il corretto
              funzionamento del sito.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Durata dei cookie</h2>
            <p>
              Alcuni cookie rimangono attivi solo per la durata della sessione
              di navigazione, altri possono essere conservati per un periodo
              più lungo, in base alla loro funzione e alle impostazioni dei
              fornitori di servizi. In ogni caso, i cookie non vengono
              conservati oltre il tempo necessario al raggiungimento delle
              finalità per cui sono stati impostati.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Diritti dell&apos;utente</h2>
            <p>
              L&apos;utente può esercitare i diritti previsti dal GDPR, tra cui
              accesso, cancellazione, limitazione e opposizione al trattamento
              dei dati personali raccolti tramite cookie, contattando il
              titolare all&apos;indirizzo{" "}
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>.
            </p>
          </section>
        </div>
      </main>

      <MainFooter
        legalBasePath="/doghouse"
        logoSrc={publicAsset("/doghouse-logo-monogram.png")}
        logoAlt={BRAND_NAME}
        email={BRAND_EMAIL}
        phone="080.530.1234"
        addressLines={["Bari – Palese – 70128", "via V. Maiorano Capitano 27"]}
        socialItems={[
          { href: "#", icon: <FaYoutube />, label: "YouTube" },
          { href: "#", icon: <FaWhatsapp />, label: "WhatsApp" },
          { href: "#", icon: <FaFacebookF />, label: "Facebook" },
          { href: "#", icon: <FaInstagram />, label: "Instagram" },
          { href: "#", icon: <FaLinkedinIn />, label: "LinkedIn" },
        ]}
      />
    </div>
  );
}
