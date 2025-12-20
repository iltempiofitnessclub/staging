"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/doghouse.css";

import { COURSES } from "@/data/doghouseCourses";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

import {
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function DoghouseContactPageInner() {
  const searchParams = useSearchParams();

  const courseIdFromUrl = useMemo(() => {
    const v = searchParams.get("course");
    const n = v ? Number(v) : NaN;
    return Number.isFinite(n) ? n : null;
  }, [searchParams]);

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  useEffect(() => {
    if (!courseIdFromUrl) return;
    const exists = COURSES.some((c) => c.id === courseIdFromUrl);
    if (exists) setSelectedCourseId(String(courseIdFromUrl));
  }, [courseIdFromUrl]);

  const selectedCourseTitle =
    COURSES.find((c) => String(c.id) === selectedCourseId)?.title ?? "";

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
                    <input type="text" name="nome" required />
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Cognome<span className="doghouse-form-required">*</span>
                    </label>
                    <input type="text" name="cognome" required />
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Indirizzo email
                      <span className="doghouse-form-required">*</span>
                    </label>
                    <input type="email" name="email" required />
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Numero di telefono
                      <span className="doghouse-form-required">*</span>
                    </label>
                    <input type="tel" name="telefono" required />
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Corso di interesse
                      <span className="doghouse-form-required">*</span>
                    </label>

                    <select
                      name="corso"
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      required
                      className="doghouse-form-select"
                    >
                      <option value="" disabled>
                        Seleziona un corso
                      </option>
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>

                    <input
                      type="hidden"
                      name="corso_label"
                      value={selectedCourseTitle}
                    />
                  </div>

                  <div className="doghouse-form-privacy">
                    <label className="doghouse-checkbox-label">
                      <input type="checkbox" name="privacy" required />
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

export default function DoghouseContactPage() {
  return (
    <Suspense fallback={null}>
      <DoghouseContactPageInner />
    </Suspense>
  );
}
