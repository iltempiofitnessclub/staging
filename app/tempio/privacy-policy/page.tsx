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

export default function TempioPrivacyPolicyPage() {
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
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2026</p>

          <section className="legal-section">
            <h2>1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è {BRAND_NAME},
              contattabile all&apos;indirizzo{" "}
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Tipologie di dati trattati</h2>
            <p>
              Possono essere trattati dati anagrafici, recapiti, informazioni
              relative alle richieste di contatto, iscrizioni ai corsi e, ove
              necessario, dati relativi allo stato di salute richiesti dalla
              normativa per la pratica di attività sportiva.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Finalità del trattamento</h2>
            <ul>
              <li>gestione delle richieste di informazioni</li>
              <li>gestione delle iscrizioni e degli abbonamenti</li>
              <li>adempimento di obblighi di legge e fiscali</li>
              <li>
                invio di comunicazioni su corsi, eventi e promozioni del{" "}
                {BRAND_NAME}, previo consenso
              </li>
              <li>tutela in sede giudiziaria dei diritti del titolare</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Base giuridica</h2>
            <p>
              Il trattamento si fonda sull&apos;esecuzione di un contratto, sugli
              obblighi legali cui è soggetto il titolare, sul legittimo
              interesse e, per specifiche finalità (ad esempio marketing), sul
              consenso espresso dell&apos;interessato.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Modalità del trattamento</h2>
            <p>
              I dati sono trattati con strumenti cartacei e informatici,
              adottando misure di sicurezza adeguate a prevenire accessi non
              autorizzati, divulgazione, modifica o distruzione non autorizzata
              dei dati personali.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Conservazione dei dati</h2>
            <p>
              I dati sono conservati per il tempo strettamente necessario a
              conseguire le finalità per le quali sono stati raccolti e, in
              seguito, nel rispetto dei termini di legge applicabili.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Comunicazione a terzi</h2>
            <p>
              I dati possono essere comunicati a consulenti, fornitori di
              servizi gestionali, piattaforme di pagamento e altri soggetti che
              agiscono in qualità di responsabili del trattamento. I dati non
              vengono diffusi al pubblico se non nei casi previsti dalla legge.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Trasferimento extra UE</h2>
            <p>
              Qualora alcuni servizi comportino il trasferimento di dati verso
              Paesi non appartenenti all&apos;Unione Europea, tale trasferimento
              avverrà nel rispetto del GDPR, adottando le relative garanzie
              adeguate.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Diritti dell&apos;interessato</h2>
            <p>
              Gli interessati possono esercitare i diritti previsti dagli
              articoli 15–22 del GDPR, contattando il titolare all&apos;indirizzo{" "}
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Reclamo all&apos;Autorità di controllo</h2>
            <p>
              In caso di presunta violazione della normativa, l&apos;interessato può
              proporre reclamo al Garante per la Protezione dei Dati Personali,
              secondo le istruzioni presenti sul sito{" "}
              <a href="https://www.garanteprivacy.it" target="_blank">
                garanteprivacy.it
              </a>
              .
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Modifiche</h2>
            <p>
              Questa informativa può essere soggetta a modifiche. Le versioni
              aggiornate saranno pubblicate su questa pagina.
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
