"use client";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/tempio.css";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

export default function TempioContactPage() {
  return (
    <div className="tempio-page tempio-contact-page">
      <MainHeader
        className="tempio-header"
        logoSrc="/tempio-logo.png"
        logoAlt="Il Tempio Fitness Club"
        navItems={[
          { label: "Home", href: "/tempio" },
          { label: "Chi siamo", href: "/tempio#chi-siamo" },
          { label: "Corsi", href: "/tempio#corsi" },
          { label: "Contatti", href: "/tempio/contatti" },
        ]}
      />

      <main className="tempio-contact-main">
        <div className="tempio-contact-inner">
          <div className="tempio-contact-hero">
            <div className="tempio-contact-hero-image">
              <img src="/hero-tempio.jpg" alt="Tempio Fitness Club" />
            </div>
            <div className="tempio-contact-hero-text">
              <p className="tempio-contact-hero-line1">BUILD STRONG</p>
              <p className="tempio-contact-hero-line2">TRAIN HARD</p>
            </div>
          </div>

          <div className="tempio-contact-form-wrapper">
            <div className="tempio-contact-form-card">
              <h1 className="tempio-contact-title">
                Grazie per aver scelto di contattarci
              </h1>
              <p className="tempio-contact-subtitle">
                Compila il seguente modulo al fine di inviarci le informazioni
                necessarie affinché possiamo contattarti il prima possibile.
              </p>

              <form className="tempio-contact-form">
                <div className="tempio-form-field">
                  <label>
                    Nome<span className="tempio-form-required">*</span>
                  </label>
                  <input type="text" name="nome" />
                </div>

                <div className="tempio-form-field">
                  <label>
                    Cognome<span className="tempio-form-required">*</span>
                  </label>
                  <input type="text" name="cognome" />
                </div>

                <div className="tempio-form-field">
                  <label>
                    Indirizzo email<span className="tempio-form-required">*</span>
                  </label>
                  <input type="email" name="email" />
                </div>

                <div className="tempio-form-field">
                  <label>
                    Numero di telefono<span className="tempio-form-required">*</span>
                  </label>
                  <input type="tel" name="telefono" />
                </div>

                <div className="tempio-form-privacy">
                  <label className="tempio-checkbox-label">
                    <input type="checkbox" name="privacy" />
                    <span className="tempio-checkbox-custom" />
                    <span className="tempio-checkbox-text">
                      Ho preso visione dell&apos;informativa privacy e presto il
                      consenso al trattamento dei miei dati personali.
                    </span>
                  </label>
                </div>

                <div className="tempio-form-footer">
                  <a href="#" className="tempio-form-link">
                    Hai già richiesto informazioni?
                  </a>
                  <button type="submit" className="tempio-form-submit">
                    INVIA
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <MainFooter
        legalBasePath="/tempio"
        logoSrc="/tempio-logo-monogram.png"
        email="tempiofitness@gmail.com"
        phone="080.530.1234"
        addressLines={[
          "Bari – Palese – 70128",
          "via V. Maiorano Capitano 27",
        ]}
        socialItems={[]}
      />
    </div>
  );
}
