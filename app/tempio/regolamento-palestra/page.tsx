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

export default function TempioGymRulesPage() {
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
          <h1 className="legal-title">Regolamento Palestra</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2026</p>

          <section className="legal-section">
            <h2>1. Accesso</h2>
            <p>
              L&apos;accesso alla struttura è riservato agli iscritti e agli
              utenti autorizzati. È vietato l&apos;ingresso a persone non
              autorizzate nelle aree riservate.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Norme di comportamento</h2>
            <p>
              Gli utenti sono tenuti a mantenere un comportamento rispettoso,
              evitando urla, linguaggio offensivo o atteggiamenti che possano
              disturbare gli altri.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Utilizzo degli spogliatoi</h2>
            <p>
              Gli spogliatoi devono essere utilizzati in modo ordinato e
              rispettoso. È vietato lasciare oggetti personali incustoditi al di
              fuori degli armadietti.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Sicurezza</h2>
            <p>
              È obbligatorio seguire le indicazioni del personale per quanto
              riguarda l&apos;uso delle attrezzature e le procedure di sicurezza.
              Eventuali infortuni o malesseri devono essere segnalati
              immediatamente allo staff.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Animali e oggetti vietati</h2>
            <p>
              Non è consentito introdurre animali (salvo casi specifici
              autorizzati) né sostanze o oggetti pericolosi all&apos;interno della
              struttura.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Responsabilità su beni personali</h2>
            <p>
              Il club non è responsabile per smarrimenti o furti di oggetti
              personali. Si raccomanda l&apos;uso degli armadietti e di non
              lasciare beni di valore incustoditi.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Sanzioni</h2>
            <p>
              In caso di violazione del regolamento, {BRAND_NAME} può adottare
              provvedimenti che vanno dal richiamo verbale fino alla sospensione
              o revoca dell&apos;abbonamento, senza diritto a rimborso.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Contatti</h2>
            <p>
              Per chiarimenti sul regolamento è possibile rivolgersi alla
              segreteria o scrivere a{" "}
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
