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

export default function TempioCookiePolicyPage() {
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
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2026</p>

          <section className="legal-section">
            <h2>1. Uso dei cookie</h2>
            <p>
              Il sito di {BRAND_NAME} utilizza cookie per garantire il corretto
              funzionamento delle pagine e migliorare l&apos;esperienza di
              navigazione degli utenti.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Tipologie di cookie</h2>
            <ul>
              <li>cookie tecnici necessari alla navigazione</li>
              <li>cookie analitici, anche di terze parti, in forma aggregata</li>
              <li>cookie di profilazione di terze parti, se presenti</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Gestione del consenso</h2>
            <p>
              Al primo accesso l&apos;utente può accettare o personalizzare le
              preferenze tramite il banner dedicato. Il consenso può essere
              revocato in qualsiasi momento modificando le impostazioni del
              browser o le preferenze dei cookie, se disponibili.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Come disabilitare i cookie tramite browser</h2>
            <p>
              È possibile configurare il proprio browser per rifiutare
              automaticamente i cookie o ricevere un avviso quando ne viene
              inviato uno. Le istruzioni specifiche sono disponibili nelle
              guide dei principali browser (Chrome, Firefox, Safari, Edge, ecc.).
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Diritti dell&apos;utente</h2>
            <p>
              L&apos;utente può chiedere informazioni sul trattamento dei dati
              personali raccolti tramite cookie scrivendo a{" "}
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>.
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
