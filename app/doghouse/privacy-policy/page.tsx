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

export default function DoghousePrivacyPolicyPage() {
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
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Ultimo aggiornamento: 2025</p>

          <section className="legal-section">
            <h2>1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è {BRAND_NAME},{" "}
              contattabile all&apos;indirizzo email{" "}
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Tipologie di dati trattati</h2>
            <p>
              Possono essere trattati dati identificativi (nome, cognome),
              recapiti (email, telefono), informazioni relative alle richieste
              di contatto, iscrizioni ai corsi, preferenze riguardo alle
              attività sportive e, ove necessario, dati relativi allo stato di
              salute limitatamente ai certificati medici richiesti per
              l&apos;accesso ai servizi offerti.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Finalità del trattamento</h2>
            <p>I dati sono trattati per le seguenti finalità:</p>
            <ul>
              <li>gestione delle richieste di informazioni e contatto</li>
              <li>gestione delle iscrizioni ai corsi e dei pagamenti</li>
              <li>adempimento di obblighi legali, fiscali e contabili</li>
              <li>
                invio di comunicazioni informative e promozionali relative alle
                attività della palestra, previo consenso dell&apos;interessato
              </li>
              <li>tutela dei diritti del titolare in sede giudiziaria</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Base giuridica del trattamento</h2>
            <ul>
              <li>
                esecuzione di un contratto o di misure precontrattuali richieste
                dall&apos;interessato
              </li>
              <li>adempimento di obblighi legali</li>
              <li>
                legittimo interesse del titolare, nel rispetto dei diritti e
                delle libertà fondamentali dell&apos;interessato
              </li>
              <li>
                consenso esplicito dell&apos;interessato per l&apos;invio di
                comunicazioni commerciali o per il trattamento di dati
                particolari
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Modalità del trattamento</h2>
            <p>
              I dati sono trattati con strumenti cartacei e informatici,
              adottando misure tecniche e organizzative adeguate a garantirne la
              sicurezza, l&apos;integrità e la riservatezza, nel rispetto di quanto
              previsto dal Regolamento (UE) 2016/679 (GDPR).
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Conservazione dei dati</h2>
            <p>
              I dati personali sono conservati per il tempo strettamente
              necessario al conseguimento delle finalità per cui sono stati
              raccolti e, successivamente, per il periodo previsto dalla
              normativa civile, fiscale e contabile. I dati trattati sulla base
              del consenso sono conservati fino alla revoca dello stesso.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Comunicazione e diffusione dei dati</h2>
            <p>
              I dati possono essere comunicati a collaboratori e fornitori che
              supportano il titolare nell&apos;erogazione dei servizi (ad esempio
              consulenti amministrativi, gestori di piattaforme informatiche,
              provider email), debitamente nominati responsabili del
              trattamento. I dati non sono diffusi al pubblico salvo obblighi di
              legge o richieste dell&apos;autorità giudiziaria.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Trasferimento dei dati verso Paesi terzi</h2>
            <p>
              Ove necessario, alcuni fornitori di servizi potrebbero avere sede
              extra UE. In tali casi il trasferimento dei dati avverrà nel
              rispetto degli articoli 44 e seguenti del GDPR, mediante decisioni
              di adeguatezza della Commissione Europea o clausole contrattuali
              standard.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Diritti dell&apos;interessato</h2>
            <p>
              L&apos;interessato può esercitare in qualsiasi momento i diritti
              previsti dagli articoli 15–22 del GDPR, tra cui:
            </p>
            <ul>
              <li>accesso ai dati personali</li>
              <li>rettifica o aggiornamento</li>
              <li>cancellazione (diritto all&apos;oblio)</li>
              <li>limitazione del trattamento</li>
              <li>opposizione al trattamento</li>
              <li>portabilità dei dati</li>
              <li>revoca del consenso prestato</li>
            </ul>
            <p>
              Per esercitare tali diritti è possibile inviare una richiesta a{" "}
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Reclami</h2>
            <p>
              Qualora l&apos;interessato ritenga che il trattamento dei propri dati
              personali avvenga in violazione del GDPR, ha il diritto di
              proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati
              Personali, secondo le modalità indicate sul sito{" "}
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
              >
                garanteprivacy.it
              </a>
              .
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Modifiche alla presente informativa</h2>
            <p>
              Il titolare si riserva la facoltà di modificare o aggiornare
              periodicamente la presente informativa. Le modifiche saranno
              pubblicate su questa pagina e, ove necessario, comunicate agli
              interessati tramite gli strumenti di contatto disponibili.
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
