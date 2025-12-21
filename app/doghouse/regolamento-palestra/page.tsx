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

function asset(path: string) {
  if (typeof window === "undefined") return path;

  const isGitHubStaging =
    window.location.hostname === "iltempiofitnessclub.github.io" &&
    window.location.pathname.startsWith("/staging");

  return isGitHubStaging ? `/staging${path}` : path;
}

const BRAND_NAME = "DogHouse Boxing";
const BRAND_EMAIL = "tempiofitness@gmail.com";

export default function DoghouseGymRulesPage() {
  return (
    <div className="doghouse-page legal-page">
      <MainHeader
        className="doghouse-header"
        logoSrc="/doghouse-logo.png"
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
          <h1 className="legal-title">Regolamento Palestra</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2025</p>

          <section className="legal-section">
            <h2>1. Accesso alla struttura</h2>
            <p>
              L&apos;accesso alla palestra è consentito solo agli iscritti in regola
              con il pagamento della quota e, ove richiesto, con la
              presentazione del certificato medico in corso di validità.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Abbigliamento</h2>
            <p>
              È obbligatorio l&apos;uso di abbigliamento sportivo e scarpe pulite
              dedicate all&apos;attività in palestra. È consigliato l&apos;utilizzo di
              asciugamano personale per l&apos;utilizzo delle attrezzature.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Utilizzo delle attrezzature</h2>
            <p>
              Le attrezzature devono essere utilizzate in modo corretto e
              rispettoso, seguendo le indicazioni degli istruttori e del
              personale. È vietato modificare le impostazioni dei macchinari in
              modo improprio o potenzialmente pericoloso.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Igiene e ordine</h2>
            <p>
              Gli iscritti sono tenuti a mantenere un elevato standard di igiene
              personale e a lasciare gli spazi comuni ordinati, riponendo
              attrezzi e materiali utilizzati negli appositi spazi.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Comportamento</h2>
            <p>
              Non sono tollerati comportamenti aggressivi, offensivi o lesivi
              della dignità altrui. {BRAND_NAME} si riserva la facoltà di
              allontanare o sospendere l&apos;iscritto che non rispetti il
              regolamento.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Oggetti personali</h2>
            <p>
              Gli utenti sono responsabili dei propri effetti personali. La
              palestra non risponde di eventuali furti o smarrimenti, pur
              adottando misure ragionevoli per la sicurezza degli ambienti.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Comunicazioni</h2>
            <p>
              Eventuali variazioni di orario, chiusure straordinarie o altre
              comunicazioni di servizio saranno esposte in bacheca o pubblicate
              sui canali ufficiali della palestra.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Contatti</h2>
            <p>
              Per informazioni sul regolamento o segnalazioni è possibile
              contattare la segreteria o scrivere a{" "}
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>.
            </p>
          </section>
        </div>
      </main>

      <MainFooter
        legalBasePath="/doghouse"
        logoSrc="/doghouse-logo-monogram.png"
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
