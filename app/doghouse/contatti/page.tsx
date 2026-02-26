"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/styles/doghouse.css";

import { COURSES } from "@/data/doghouseCourses";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { publicAsset } from "@/lib/publicAsset";

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

  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [contactError, setContactError] = useState("");
  const [corsiError, setCorsiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!courseIdFromUrl) return;
    const exists = COURSES.some((c) => c.id === courseIdFromUrl);
    if (exists) setSelectedCourseIds([courseIdFromUrl]);
  }, [courseIdFromUrl]);

  const selectedCourseTitles = selectedCourseIds
    .map((id) => COURSES.find((c) => c.id === id)?.title)
    .filter(Boolean)
    .join(", ");

  const toggleCourse = (courseId: number) => {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
    // Rimuovi l'errore quando l'utente seleziona un corso
    if (corsiError) {
      setCorsiError("");
    }
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
    if (selectedCourseIds.length === 0) {
      setCorsiError("Seleziona almeno un corso");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // Netlify Forms submission
      const formData = new FormData(form);
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (!response.ok) {
        throw new Error("Errore nell'invio del form");
      }

      setSubmitSuccess(true);
      // Reset form
      form.reset();
      setEmail("");
      setTelefono("");
      setSelectedCourseIds([]);
      setEmailError("");
      setTelefonoError("");
      setContactError("");
      setCorsiError("");
      
      // Scroll to top per mostrare il messaggio di successo
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="doghouse-page">
      <MainHeader
        className="doghouse-header"
        logoSrc={publicAsset("/doghouse-logo.png")}
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
                <img
                  src={publicAsset("/IMG_0204.jpg")}
                  alt="DogHouse Boxing"
                  loading="lazy"
                  decoding="async"
                />
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

                <form className="doghouse-contact-form" onSubmit={handleSubmit} name="doghouse-contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                  <input type="hidden" name="form-name" value="doghouse-contact" />
                  <input type="hidden" name="bot-field" />
                  
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

                  {contactError && (
                    <div className="doghouse-form-error" style={{ marginBottom: "12px" }}>
                      {contactError}
                    </div>
                  )}

                  <div className="doghouse-form-field">
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
                      <div className="doghouse-form-error">{emailError}</div>
                    )}
                  </div>

                  <div className="doghouse-form-field">
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
                      <div className="doghouse-form-error">{telefonoError}</div>
                    )}
                  </div>

                  <div className="doghouse-form-field">
                    <label>
                      Corsi di interesse
                      <span className="doghouse-form-required">*</span>
                    </label>

                    <div className="doghouse-courses-multiselect">
                      {COURSES.map((c) => (
                        <label
                          key={c.id}
                          className="doghouse-course-checkbox-label"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCourseIds.includes(c.id)}
                            onChange={() => toggleCourse(c.id)}
                          />
                          <span>{c.title}</span>
                        </label>
                      ))}
                    </div>

                    {corsiError && (
                      <div className="doghouse-form-error">
                        {corsiError}
                      </div>
                    )}

                    <input
                      type="hidden"
                      name="corsi"
                      value={selectedCourseIds.join(",")}
                      required={selectedCourseIds.length === 0}
                    />
                    <input
                      type="hidden"
                      name="corsi_labels"
                      value={selectedCourseTitles}
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
                    <button 
                      type="submit" 
                      className="doghouse-form-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "INVIO IN CORSO..." : "INVIA"}
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
        logoSrc={publicAsset("/doghouse-logo-monogram.png")}
        email="boxingdoghouse@gmail.com"
        phone="353.450.3806"
        addressLines={["Bari – Palese – 70128", "Via V. Maiorano Capitano, 24"]}
        socialItems={[
          { href: "#", icon: <FaYoutube />, label: "YouTube" },
          { href: "https://www.facebook.com/share/17MQaoh5Ya/?mibextid=wwXIfr", icon: <FaFacebookF />, label: "Facebook" },
          { href: "https://www.instagram.com/_doghouse__boxing/", icon: <FaInstagram />, label: "Instagram" },
          { href: "https://www.tiktok.com/@dog.house056?_r=1&_t=ZN-932TvjyTyD8", icon: <FaLinkedinIn />, label: "TikTok" },
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
