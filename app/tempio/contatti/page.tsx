"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/tempio.css";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";

type ClassItem = {
  id: number;
  title: string;
};

const CLASSES: ClassItem[] = [
  { id: 1, title: "KRAV MAGA" },
  { id: 2, title: "FIT POSTURAL" },
  { id: 3, title: "BUDO TAIJUTSU" },
  { id: 4, title: "MUSIC FIT" },
  { id: 5, title: "MOUTAI" },
  { id: 6, title: "FUNNY FIT" },
];

function asset(path: string) {
  if (typeof window === "undefined") return path;

  const isGitHubStaging =
    window.location.hostname === "iltempiofitnessclub.github.io" &&
    window.location.pathname.startsWith("/staging");

  return isGitHubStaging ? `/staging${path}` : path;
}

function TempioContactPageInner() {
  const searchParams = useSearchParams();

  const courseIdFromUrl = useMemo(() => {
    const v = searchParams.get("course");
    const n = v ? Number(v) : NaN;
    return Number.isFinite(n) ? n : null;
  }, [searchParams]);

  const [selectedClassId, setSelectedClassId] = useState<string>("");

  useEffect(() => {
    if (!courseIdFromUrl) return;
    const exists = CLASSES.some((c) => c.id === courseIdFromUrl);
    if (exists) setSelectedClassId(String(courseIdFromUrl));
  }, [courseIdFromUrl]);

  const selectedClassTitle =
    CLASSES.find((c) => String(c.id) === selectedClassId)?.title ?? "";

  return (
    <div className="tempio-page tempio-contact-page">
      <MainHeader
        className="tempio-header"
        logoSrc={asset("/tempio-logo.png")}
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
              <img
                src={asset("/hero-tempio.jpg")}
                alt="Tempio Fitness Club"
                loading="lazy"
                decoding="async"
              />
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
                  <input type="text" name="nome" required />
                </div>

                <div className="tempio-form-field">
                  <label>
                    Cognome<span className="tempio-form-required">*</span>
                  </label>
                  <input type="text" name="cognome" required />
                </div>

                <div className="tempio-form-field">
                  <label>
                    Indirizzo email<span className="tempio-form-required">*</span>
                  </label>
                  <input type="email" name="email" required />
                </div>

                <div className="tempio-form-field">
                  <label>
                    Numero di telefono<span className="tempio-form-required">*</span>
                  </label>
                  <input type="tel" name="telefono" required />
                </div>

                {/* ✅ CORSO (come DogHouse) */}
                <div className="tempio-form-field">
                  <label>
                    Corso di interesse<span className="tempio-form-required">*</span>
                  </label>

                  <select
                    name="corso"
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    required
                    className="tempio-form-select"
                  >
                    <option value="" disabled>
                      Seleziona un corso
                    </option>

                    {CLASSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>

                  {/* label leggibile (utile per mail / backend) */}
                  <input
                    type="hidden"
                    name="corso_label"
                    value={selectedClassTitle}
                  />
                </div>

                <div className="tempio-form-privacy">
                  <label className="tempio-checkbox-label">
                    <input type="checkbox" name="privacy" required />
                    <span className="tempio-checkbox-custom" />
                    <span className="tempio-checkbox-text">
                      Ho preso visione dell&apos;informativa privacy e presto il
                      consenso al trattamento dei miei dati personali
                      <span className="tempio-form-required">*</span>
                    </span>
                  </label>
                </div>

                <div className="tempio-form-footer">
                  <a href="#" className="tempio-form-link"></a>
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
        logoSrc={asset("/tempio-logo-monogram.png")}
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

export default function TempioContactPage() {
  return (
    <Suspense fallback={null}>
      <TempioContactPageInner />
    </Suspense>
  );
}
