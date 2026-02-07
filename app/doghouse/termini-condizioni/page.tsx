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
const BRAND_EMAIL = "boxingdoghouse@gmail.com";

export default function DoghouseTermsConditionsPage() {
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
          <h1 className="legal-title">Termini e Condizioni</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2026</p>

          <section className="legal-section">
            <h2>1. Oggetto</h2>
            <p>
              I presenti Termini e Condizioni disciplinano l&apos;utilizzo del sito
              web e la fruizione dei servizi offerti da {BRAND_NAME}, inclusi i
              corsi, le attività sportive e i servizi accessori.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Iscrizione ai corsi</h2>
            <p>
              L&apos;iscrizione ai corsi avviene secondo le modalità indicate sul
              sito o presso la segreteria della palestra. L&apos;utente è tenuto a
              fornire dati veritieri e aggiornati. L&apos;accesso ad alcune attività
              può essere subordinato alla presentazione di idoneo certificato
              medico.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Pagamenti</h2>
            <p>
              Le tariffe dei corsi e degli abbonamenti sono indicate sul sito o
              comunicate presso la sede. I pagamenti devono essere effettuati
              secondo le modalità e le scadenze previste. In caso di ritardo o
              mancato pagamento, {BRAND_NAME} si riserva la facoltà di sospendere
              o interrompere l&apos;erogazione dei servizi.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Regole di comportamento</h2>
            <p>
              Gli utenti sono tenuti a mantenere un comportamento corretto e
              rispettoso verso il personale, gli istruttori e gli altri
              frequentatori della palestra, utilizzando le attrezzature in modo
              conforme alle indicazioni ricevute.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Responsabilità</h2>
            <p>
              {BRAND_NAME} adotta tutte le misure ragionevoli per garantire la
              sicurezza degli ambienti e delle attrezzature. Resta inteso che
              alcune attività sportive comportano un rischio intrinseco, che
              l&apos;utente accetta nel momento in cui partecipa alle attività
              proposte.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Modifiche dei servizi</h2>
            <p>
              La palestra si riserva la facoltà di modificare orari, corsi,
              istruttori o programmi per esigenze organizzative o di forza
              maggiore, impegnandosi a darne comunicazione nel modo più idoneo.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Legge applicabile e foro competente</h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla legge italiana.
              Per ogni controversia sarà competente in via esclusiva il Foro di
              Bari, salvo diversa competenza inderogabile prevista dalla legge.
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
