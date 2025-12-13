"use client";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/doghouse.css";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

import {
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function DoghouseContactPage() {
  return (
    <div className="doghouse-page">
      <MainHeader
        className="doghouse-header"
        logoSrc="/doghouse-logo.png"
        logoAlt="DogHouse Boxing"
        navItems={[
          { label: "Home", href: "/doghouse" },
          { label: "Chi siamo", href: "/doghouse#chi-siamo" },
          { label: "Corsi", href: "/doghouse#corsi" },
          { label: "Contatti", href: "/doghouse/contatti" },
        ]}
      />

      <main className="doghouse-main doghouse-contact-main">
        <section className="doghouse-contact-section">
          <div className="doghouse-contact-inner">
            <div className="doghouse-contact-hero">
              <div className="doghouse-contact-hero-image">
                <img src="/IMG_0204.jpg" alt="DogHouse Boxing" />
              </div>
              <div className="doghouse-contact-hero-text">
                <p className="doghouse-contact-hero-line1">BUILD STRONG</p>
                <p className="doghouse-contact-hero-line2">TRAIN HARD</p>
              </div>
            </div>

            <div className="doghouse-contact-form-wrapper">
              <div className="doghouse-contact-form-card">
                <h1 className="doghouse-contact-title">
                  Grazie per aver scelto di contattarci
                </h1>
                <p className="doghouse-contact-subtitle">
                  Compila il seguente modulo al fine di inviarci le informazioni
                  necessarie affinché possiamo contattarti il prima possibile.
                </p>

                <form className="doghouse-contact-form">
                  <div className="doghouse-form-field">
                    <label>
                      Nome<span className="doghouse-form-required">*</span>
                    </label>
                    <input type="text" name="nome" />
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Cognome<span className="doghouse-form-required">*</span>
                    </label>
                    <input type="text" name="cognome" />
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Indirizzo email
                      <span className="doghouse-form-required">*</span>
                    </label>
                    <input type="email" name="email" />
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Numero di telefono
                      <span className="doghouse-form-required">*</span>
                    </label>
                    <input type="tel" name="telefono" />
                  </div>

                  <div className="doghouse-form-privacy">
                    <label className="doghouse-checkbox-label">
                      <input type="checkbox" name="privacy" />
                      <span className="doghouse-checkbox-custom" />
                      <span className="doghouse-checkbox-text">
                        Ho preso visione dell&apos;informativa privacy e presto
                        il consenso al trattamento dei miei dati personali
                        <span className="doghouse-form-required">*</span>
                      </span>
                    </label>
                  </div>

                  <div className="doghouse-form-footer">
                    <a href="#" className="doghouse-form-link"></a>
                    <button type="submit" className="doghouse-form-submit">
                      INVIA
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter
        legalBasePath="/doghouse"
        logoSrc="/doghouse-logo-monogram.png"
        email="tempiofitness@gmail.com"
        phone="080.530.1234"
        addressLines={[
          "Bari – Palese – 70128",
          "via V. Maiorano Capitano 27",
        ]}
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
