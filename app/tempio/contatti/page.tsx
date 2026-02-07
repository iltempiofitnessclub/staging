"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/tempio.css";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { publicAsset as asset } from "@/lib/publicAsset";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

type ClassItem = {
  id: number;
  title: string;
};

const CLASSES: ClassItem[] = [
  { id: 1, title: "Krav Maga" },
  { id: 2, title: "Fit postural" },
  { id: 3, title: "Budo Taijutsu" },
  { id: 4, title: "Music fit" },
  { id: 5, title: "Moutai" },
  { id: 6, title: "Funny fit" },
];

function TempioContactPageInner() {
  const searchParams = useSearchParams();

  const courseIdFromUrl = useMemo(() => {
    const v = searchParams.get("course");
    const n = v ? Number(v) : NaN;
    return Number.isFinite(n) ? n : null;
  }, [searchParams]);

  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [contactError, setContactError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!courseIdFromUrl) return;
    const exists = CLASSES.some((c) => c.id === courseIdFromUrl);
    if (exists) setSelectedClassIds([courseIdFromUrl]);
  }, [courseIdFromUrl]);

  const selectedClassTitles = selectedClassIds
    .map((id) => CLASSES.find((c) => c.id === id)?.title)
    .filter(Boolean)
    .join(", ");

  const toggleClass = (classId: number) => {
    setSelectedClassIds((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const validateEmail = (value: string): boolean => {
    if (!value) return true; // Email non obbligatoria se c'è telefono
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Inserisci un indirizzo email valido");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateTelefono = (value: string): boolean => {
    if (!value) return true; // Telefono non obbligatorio se c'è email
    const telefonoRegex = /^[\d\s\+\-\(\)]{9,}$/;
    if (!telefonoRegex.test(value)) {
      setTelefonoError("Inserisci un numero di telefono valido (minimo 9 cifre)");
      return false;
    }
    setTelefonoError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    if (value || telefono) {
      setContactError("");
    }
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTelefono(value);
    validateTelefono(value);
    if (value || email) {
      setContactError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Salva il riferimento al form prima della chiamata async
    const form = e.currentTarget;

    // Validazione: almeno email o telefono deve essere compilato
    if (!email && !telefono) {
      setContactError("Inserisci almeno un indirizzo email o un numero di telefono");
      return;
    }

    // Validazione formato email
    if (email && !validateEmail(email)) {
      return;
    }

    // Validazione formato telefono
    if (telefono && !validateTelefono(telefono)) {
      return;
    }

    // Validazione corsi
    if (selectedClassIds.length === 0) {
      return;
    }

    // Prepara i dati del form
    const formData = new FormData(form);
    const data = {
      nome: formData.get("nome"),
      cognome: formData.get("cognome"),
      email: email || null,
      telefono: telefono || null,
      corsi: selectedClassIds.join(","),
      corsi_labels: selectedClassTitles,
      privacy: formData.get("privacy") === "on",
    };

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact/tempio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Errore nell'invio del form");
      }

      setSubmitSuccess(true);
      // Reset form
      form.reset();
      setEmail("");
      setTelefono("");
      setSelectedClassIds([]);
    } catch (error) {
      console.error("Errore:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Si è verificato un errore. Riprova più tardi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

              {submitSuccess && (
                <div style={{
                  padding: "16px",
                  marginBottom: "20px",
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  border: "1px solid #c3e6cb",
                  borderRadius: "4px",
                  textAlign: "center"
                }}>
                  ✅ Messaggio inviato con successo! Ti contatteremo presto.
                </div>
              )}

              {submitError && (
                <div style={{
                  padding: "16px",
                  marginBottom: "20px",
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  border: "1px solid #f5c6cb",
                  borderRadius: "4px",
                  textAlign: "center"
                }}>
                  ❌ {submitError}
                </div>
              )}

              <form className="tempio-contact-form" onSubmit={handleSubmit}>
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

                {contactError && (
                  <div className="tempio-form-error" style={{ marginBottom: "12px" }}>
                    {contactError}
                  </div>
                )}

                <div className="tempio-form-field">
                  <label>
                    Indirizzo email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="esempio@email.com"
                  />
                  {emailError && (
                    <div className="tempio-form-error">{emailError}</div>
                  )}
                </div>

                <div className="tempio-form-field">
                  <label>
                    Numero di telefono
                  </label>
                  <input 
                    type="tel" 
                    name="telefono"
                    value={telefono}
                    onChange={handleTelefonoChange}
                    placeholder="+39 123 456 7890"
                  />
                  {telefonoError && (
                    <div className="tempio-form-error">{telefonoError}</div>
                  )}
                </div>

                <div className="tempio-form-field">
                  <label>
                    Corsi di interesse<span className="tempio-form-required">*</span>
                  </label>

                  <div className="tempio-courses-multiselect">
                    {CLASSES.map((c) => (
                      <label
                        key={c.id}
                        className="tempio-course-checkbox-label"
                      >
                        <input
                          type="checkbox"
                          checked={selectedClassIds.includes(c.id)}
                          onChange={() => toggleClass(c.id)}
                        />
                        <span>{c.title}</span>
                      </label>
                    ))}
                  </div>

                  {selectedClassIds.length === 0 && (
                    <div className="tempio-form-error">
                      Seleziona almeno un corso
                    </div>
                  )}

                  <input
                    type="hidden"
                    name="corsi"
                    value={selectedClassIds.join(",")}
                    required={selectedClassIds.length === 0}
                  />
                  <input
                    type="hidden"
                    name="corsi_labels"
                    value={selectedClassTitles}
                  />
                </div>

                <div className="tempio-form-privacy">
                  <label className="tempio-checkbox-label">
                    <input type="checkbox" name="privacy" required />
                    <span className="tempio-checkbox-custom" />
                    <span className="tempio-checkbox-text">
                      Ho preso visione dell'informativa privacy e presto il consenso al trattamento dei miei dati personali
                      <span className="tempio-form-required">*</span>
                    </span>
                  </label>
                </div>

                <div className="tempio-form-footer">
                  <a href="#" className="tempio-form-link"></a>
                  <button 
                    type="submit" 
                    className="tempio-form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "INVIO IN CORSO..." : "INVIA"}
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
        email="iltempiofitnessclub@gmail.com"
        phone="392.097.8713"
        addressLines={[
          "Bari – Palese – 70128",
          "via V. Maiorano, 27",
        ]}
        socialItems={[
          { href: "https://www.facebook.com/tempiofitnessclub/?locale=it_IT", icon: <FaFacebookF />, label: "Facebook" },
          { href: "https://www.instagram.com/tempiofitnessclub/?hl=it", icon: <FaInstagram />, label: "Instagram" },
          { href: "https://www.tiktok.com/@iltempio", icon: <FaTiktok />, label: "TikTok" },
        ]}
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
