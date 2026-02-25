"use client";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/tempio.css";
import "@/styles/legal.css";

import {
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function asset(path: string) {
  if (typeof window === "undefined") return path;

  const isGitHubStaging =
    window.location.hostname === "iltempiofitnessclub.github.io" &&
    window.location.pathname.startsWith("/staging");

  return isGitHubStaging ? `/staging${path}` : path;
}

const BRAND_NAME = "Tempio Fitness Club";
const BRAND_EMAIL = "iltempiofitnessclub@gmail.com";

export default function TempioTermsConditionsPage() {
  return (
    <div className="tempio-page legal-page">
      <MainHeader
        className="tempio-header"
        logoSrc="/tempio-logo.png"
        logoAlt={BRAND_NAME}
        navItems={[
          { label: "Home", href: "/tempio" },
          { label: "Chi siamo", href: "/tempio#chi-siamo" },
          { label: "Corsi", href: "/tempio#corsi" },
          { label: "Contatti", href: "/tempio#contatti" },
        ]}
      />

      <main className="legal-main">
        <div className="legal-inner">
          <h1 className="legal-title">Termini e Condizioni</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2026</p>

          <section className="legal-section">
            <h2>1. Ambito di applicazione</h2>
            <p>
              I presenti Termini e Condizioni regolano l&apos;uso del sito e la
              fruizione dei servizi offerti da {BRAND_NAME}, inclusi corsi,
              abbonamenti e attività correlate.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Iscrizione e abbonamenti</h2>
            <p>
              L&apos;iscrizione è personale e non cedibile. L&apos;utente si impegna a
              fornire dati corretti e a comunicare eventuali variazioni
              rilevanti. Alcuni servizi possono richiedere la sottoscrizione di
              specifici contratti o regolamenti integrativi.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Pagamenti e rinnovi</h2>
            <p>
              Le quote e le condizioni di pagamento sono indicate sul sito o
              comunicate in sede. Salvo diversa indicazione, gli abbonamenti
              hanno durata determinata e non si rinnovano automaticamente.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Sospensioni e recuperi</h2>
            <p>
              Eventuali sospensioni dell&apos;abbonamento o recuperi delle lezioni
              perse sono gestiti secondo le regole interne del club e possono
              essere concessi solo nei casi previsti.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Responsabilità</h2>
            <p>
              {BRAND_NAME} mette a disposizione ambienti e attrezzature idonei,
              sotto la supervisione di personale qualificato. L&apos;utente è
              tenuto a comunicare eventuali condizioni fisiche che possano
              influire sulla pratica sportiva.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Modifiche dei Termini</h2>
            <p>
              Il club può aggiornare i presenti Termini e Condizioni. Le
              modifiche saranno pubblicate sul sito e, se rilevanti, comunicate
              agli utenti registrati.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Foro competente</h2>
            <p>
              Per ogni controversia relativa ai presenti Termini è competente il
              foro del luogo in cui ha sede {BRAND_NAME}, fatti salvi i diritti
              del consumatore.
            </p>
          </section>
        </div>
      </main>

      <MainFooter
        legalBasePath="/tempio"
        logoSrc="/tempio-logo-monogram.png"
        logoAlt={BRAND_NAME}
        email={BRAND_EMAIL}
        phone="080.530.1234"
        addressLines={["Bari – Palese – 70128", "Vico VI Duca D'Aosta, 7/a"]}
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
