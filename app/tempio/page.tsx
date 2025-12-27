"use client";

import React, { useEffect, useState } from "react";

import { FloatingWhatsAppButton } from "@/components/ui/FloatingWhatsAppButton";
import "@/components/styles/floating-whatsapp.css";
import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/components/styles/hero.css";
import Link from "@/components/routing/Link";
import "@/styles/tempio.css";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { Hero } from "@/components/layout/Hero";
import { publicAsset } from "@/lib/publicAsset";

import {
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function TempioPage() {
  return (
    <div className="tempio-page">
      <MainHeader
        className="tempio-header"
        logoSrc={publicAsset("/tempio-logo.png")}
        logoAlt="Il Tempio Fitness Club"
        navItems={[
          { label: "Home", href: "/tempio" },
          { label: "Chi siamo", href: "#chi-siamo" },
          { label: "Corsi", href: "#corsi" },
          { label: "Contatti", href: "#contatti" },
        ]}
      />

      <main className="tempio-main">
        <Hero
          className="tempio-hero"
          titleLine1="BUILD STRENGTH"
          titleLine2="TRAIN HARD"
          buttonLabel="RICHIEDI UNA PROVA GRATUITA"
          buttonHref="/tempio/contatti"
        />

        <section id="chi-siamo" className="tempio-section tempio-about">
          <div className="tempio-section-inner tempio-about-layout">
            <div className="tempio-about-text">
              <h2 className="tempio-section-title">CHI SIAMO</h2>
              <p className="tempio-section-text">
                Il Tempio Fitness Club è un centro dedicato all&apos;allenamento
                di qualità: sala pesi, functional, corsi di gruppo e programmi
                personalizzati per ogni livello, dal principiante
                all&apos;atleta avanzato.
              </p>
            </div>

            <div className="tempio-about-btn-wrapper">
              <Link href="/" className="hero-btn hero-btn--tempio">
                <span className="hero-btn-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
                  </svg>
                </span>
                TORNA ALLA SELEZIONE DEL SITO
              </Link>
            </div>
          </div>
        </section>

        <ClassesSection />
        <ContactStrip />
        <EventsAndMapSection />
        <ReviewsSection />
      </main>

      <MainFooter
        legalBasePath="/tempio"
        logoSrc={publicAsset("/tempio-logo-monogram.png")}
        email="info@iltempio.it"
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

      <FloatingWhatsAppButton
        phone="+39 333 1112222"
        message="Ciao! Vorrei informazioni sui corsi Il Tempio."
        className="floating-whatsapp-btn-tempio"
      />
    </div>
  );
}

type ClassItem = {
  id: number;
  title: string;
  imageSrc: string;

  // nuovi campi (stile DogHouse, ma con nomi Tempio)
  description: string;
  schedule: { days: string; time: string }[];
  info: string[];
};

const CLASSES: ClassItem[] = [
  {
    id: 1,
    title: "KRAV MAGA",
    imageSrc: "/kravmaga.jpg",
    description:
      "Allenati con il Krav Maga: la disciplina di difesa personale pratica ed efficace, adatta a tutti. Migliora sicurezza , forza e prontezza in ogni situazione.",
    schedule: [
      { days: "Lunedì e Mercoledì", time: "20:00 – 21:00" },
    ],
    info: [
      "Livello: Principiante – Intermedio – Avanzato",
      "Tecniche di difesa personale e condizionamento",
      "Durata lezione: 60 minuti",
      "Allenamento intenso e funzionale",
    ],
  },
  {
    id: 2,
    title: "FIT POSTURAL",
    imageSrc: "/fitpostural.jpg",
    description:
      "Il Fit Postural è un corso che unisce esercizi di tonificazione, allungamento e respirazione con l'obbiettivo di migliorare la postura, aumentare la mobilità articolare e ridurre tensioni muscolari . Ideale per chi vuole ritrovare equilibrio , benessere e una corretta consapevolezza del proprio corpo ,",
    schedule: [
      { days: "Martedì e Giovedì", time: "18:30 – 19:30" },
    ],
    info: [
      "Livello: Tutti",
      "Mobilità, postura, core e respirazione",
      "Durata lezione: 60 minuti",
      "Ottimo anche come prevenzione infortuni",
    ],
  },
  {
    id: 3,
    title: "BUDO TAIJUTSU",
    imageSrc: "/budo.jpg",
    description:
      "Il Budo è l’insieme delle arti marziali tradizionali giapponesi, nate come disciplina dei samurai. Oltre alla pratica tecnica di combattimento, il Budo pone al centro valori come rispetto, autocontrollo, armonia tra corpo e mente e crescita personale. Non è solo difesa o attacco, ma un vero percorso di formazione fisica, mentale e spirituale.",
    schedule: [{ days: "Martedì e Giovedì", time: "20:30 – 21:30" }],
    info: [
      "Livello: Principiante – Intermedio – Avanzato",
      "Tecniche tradizionali + lavoro su equilibrio e coordinazione",
      "Durata lezione: 60 minuti",
      "Approccio tecnico e progressivo",
    ],
  },
  {
    id: 4,
    title: "MUSIC FIT",
    imageSrc: "/musicfit.jpg",
    description:
      "Music Fit Energy – Un allenamento dinamico che unisce aerobica e total body, per bruciare calorie, tonificare tutto il corpo e divertirti al ritmo della musica.",
    schedule: [
      { days: "Lunedì e Mercoledì", time: "19:00 – 20:00" },
    ],
    info: [
      "Livello: Tutti",
      "Cardio + tonificazione",
      "Durata lezione: 60 minuti",
      "Alta energia e zero noia",
    ],
  },
  {
    id: 5,
    title: "MUAY THAY",
    imageSrc: "/moutai.jpg",
    description:
      "Allenamenti dinamici e coinvolgenti per migliorare forza, resistenza e coordinazione. Il corso di Muay Thai è adatto a tutti i livelli e combina tecnica, disciplina e allenamento funzionale, aiutando a sviluppare sicurezza, controllo del corpo e benessere fisico in un ambiente motivante e professionale.",
    schedule: [{ days: "Mercoledì", time: "21:00 – 22:00" }],
    info: [
      "Livello: Intermedio – Avanzato",
      "Forza, resistenza e coordinazione",
      "Durata lezione: 60 minuti",
      "Allenamento ad alta intensità",
    ],
  },
  {
    id: 6,
    title: "FUNNY FIT",
    imageSrc: "/funnyfit.jpg",
    description:
      "Funny Fit è un corso dinamico e coinvolgente che unisce cardio e tonificazione in un allenamento divertente e completo. Attraverso l’utilizzo di piccoli attrezzi come step, fitball, trampolino e pesetti, migliora resistenza, coordinazione e forza muscolare, rendendo ogni lezione varia, efficace e stimolante. Perfetto per chi vuole allenarsi con energia e buonumore!",
    schedule: [
      { days: "Martedì", time: "19:30 – 20:30" },
    ],
    info: [
      "Livello: Tutti",
      "Functional + circuito",
      "Durata lezione: 60 minuti",
      "Perfetto per ripartire e divertirsi",
    ],
  },
];

function ClassesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 640) setVisibleCount(1);
      else if (window.innerWidth <= 900) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedClass(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (selectedClass) root.classList.add("tempio-modal-open");
    else root.classList.remove("tempio-modal-open");
    return () => root.classList.remove("tempio-modal-open");
  }, [selectedClass]);

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + CLASSES.length) % CLASSES.length);
  };

  const next = () => {
    setStartIndex((prev) => (prev + 1) % CLASSES.length);
  };

  const getVisibleClasses = () => {
    const result: ClassItem[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIndex + i) % CLASSES.length;
      result.push(CLASSES[idx]);
    }
    return result;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40;

    if (diff > threshold) prev();
    else if (diff < -threshold) next();

    setTouchStartX(null);
  };

  return (
    <section id="corsi" className="tempio-section tempio-classes">
      <div className="tempio-section-inner">
        <h2 className="tempio-section-title">I NOSTRI CORSI</h2>

        <div className="tempio-classes-wrapper">
          <button
            type="button"
            className="tempio-slider-arrow tempio-slider-arrow--left"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Corsi precedenti"
          >
            ‹
          </button>

          <div
            className="tempio-classes-grid"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleClasses().map((cls) => (
              <AnimatedCard
                key={cls.id}
                className="tempio-class-card"
                onClick={() => setSelectedClass(cls)}
              >
                <div className="tempio-class-image">
                  <img
                    src={publicAsset(cls.imageSrc)}
                    alt={cls.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="tempio-class-title">{cls.title}</h3>
              </AnimatedCard>
            ))}
          </div>

          <button
            type="button"
            className="tempio-slider-arrow tempio-slider-arrow--right"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Corsi successivi"
          >
            ›
          </button>
        </div>

        <div className="tempio-slider-dots tempio-slider-dots--classes">
          {CLASSES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={
                "tempio-slider-dot" +
                (startIndex === i ? " tempio-slider-dot--active" : "")
              }
              onClick={() => setStartIndex(i)}
              aria-label={`Vai al corso ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedClass && (
        <div
          className="tempio-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedClass(null);
          }}
        >
          <div className="tempio-modal">
            <button
              type="button"
              className="tempio-modal-close"
              onClick={() => setSelectedClass(null)}
              aria-label="Chiudi"
            >
              ✕
            </button>

            <h3 className="tempio-modal-title">{selectedClass.title}</h3>

            <div className="tempio-modal-body">
              <p className="tempio-modal-desc">{selectedClass.description}</p>

              <div className="tempio-modal-divider" />

              <div className="tempio-modal-section">
                <h4 className="tempio-modal-subtitle">Orari</h4>

                <ul className="tempio-modal-schedule">
                  {selectedClass.schedule.map((row, idx) => (
                    <li key={idx} className="tempio-modal-schedule-row">
                      <span>{row.days}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tempio-modal-divider" />

              <div className="tempio-modal-section">
                <h4 className="tempio-modal-subtitle">Info</h4>

                <ul className="tempio-modal-list">
                  {selectedClass.info.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="tempio-modal-actions">
                <Link
                  href="/tempio/contatti"
                  className="tempio-modal-cta"
                  onClick={() => setSelectedClass(null)}
                >
                  CHIEDI INFORMAZIONI
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function AnimatedCard({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fallback = window.setTimeout(() => setIsVisible(true), 800);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          window.clearTimeout(fallback);
        }
      },
      { threshold: 0.15, rootMargin: "200px 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      onClick={onClick}
      className={
        "tempio-card-animated" +
        (isVisible ? " tempio-card-animated--visible" : "") +
        (className ? ` ${className}` : "") +
        (onClick ? " tempio-card-clickable" : "")
      }
    >
      {children}
    </article>
  );
}

function ContactStrip() {
  return (
    <section className="tempio-contact-strip" id="contatti">
      <div className="tempio-contact-strip-inner">
        <div className="tempio-contact-strip-info">
          <h2 className="tempio-contact-strip-title">CONTATTI</h2>
          <p className="tempio-contact-strip-text">
            Il Tempio Fitness Club è in via V. Maiorano, 27 – 70128 Bari (BA)
          </p>
        </div>

        <Link href="/tempio/contatti">
          <button className="tempio-contact-strip-button">
            <img
              src={publicAsset("/mark-email.svg")}
              alt=""
              className="tempio-contact-strip-button-icon"
              loading="lazy"
              decoding="async"
            />
            <span>CONTATTACI VIA EMAIL</span>
          </button>
        </Link>
      </div>
    </section>
  );
}

export function EventsAndMapSection() {
  const events = [
    {
      id: 1,
      title: "Open Day Il Tempio",
      date: "15 Marzo 2026",
      label: "Evento",
      imageSrc: "/event-1.jpg",
    },
    {
      id: 2,
      title: "Weekend Functional Training",
      date: "Dal 10 Aprile 2026",
      label: "Evento",
      imageSrc: "/event-2.jpg",
    },
    {
      id: 3,
      title: "Challenge Cardio & Strength",
      date: "20–21 Maggio 2026",
      label: "Evento",
      imageSrc: "/event-3.jpg",
    },
  ];

  return (
    <section className="tempio-section tempio-events">
      <div className="tempio-section-inner tempio-events-grid">
        <div className="tempio-events-column">
          <h2 className="tempio-section-title">I NOSTRI EVENTI</h2>
          <div className="tempio-events-list">
            {events.map((ev) => (
              <AnimatedCard key={ev.id} className="tempio-event-card">
                <div className="tempio-event-layout">
                  <div className="tempio-event-image">
                    <img
                      src={publicAsset(ev.imageSrc)}
                      alt={ev.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="tempio-event-content">
                    <div className="tempio-event-badge">{ev.label}</div>
                    <h3 className="tempio-event-title">{ev.title}</h3>
                    <p className="tempio-event-date">{ev.date}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        <div className="tempio-events-column tempio-events-column-map">
          <h2 className="tempio-section-title">COME RAGGIUNGERCI</h2>
          <div className="tempio-map-wrapper">
            <iframe
              title="Il Tempio Fitness Club - Palese Bari"
              src="https://maps.google.com/maps?q=Palese%20Bari&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>
          <div className="tempio-map-button-wrapper">
            <a
              href="https://www.google.com/maps?q=41.1486,16.7602"
              target="_blank"
              rel="noopener noreferrer"
              className="tempio-map-button"
            >
              <img
                src={publicAsset("/pin-map.svg")}
                alt=""
                className="tempio-map-button-icon"
                loading="lazy"
                decoding="async"
              />
              <span>APRI SU MAPS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type Review = {
  id: number;
  text: string;
  name: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    text: "Fantastic gym, atmosfera motivante e istruttori sempre presenti.",
    name: "Elisa R.",
  },
  {
    id: 2,
    text: "Struttura pulita, corsi vari e adatti a tutti i livelli.",
    name: "Marco D.",
  },
  {
    id: 3,
    text: "Mi alleno qui da anni, non lo cambierei con nessun altro posto.",
    name: "Francesco P.",
  },
  {
    id: 4,
    text: "Ottima sala pesi e corsi funzionali davvero completi.",
    name: "Luisa M.",
  },
  {
    id: 5,
    text: "Staff disponibile, ambiente accogliente e professionale.",
    name: "Davide S.",
  },
];

function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 900) setVisibleCount(3);
      else if (window.innerWidth >= 600) setVisibleCount(2);
      else setVisibleCount(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalSlides = Math.ceil(REVIEWS.length / visibleCount);

  const getVisibleReviews = () => {
    const items: Review[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIndex + i) % REVIEWS.length;
      items.push(REVIEWS[idx]);
    }
    return items;
  };

  const prev = () => {
    setStartIndex((prev) => {
      const lastStart = (totalSlides - 1) * visibleCount;
      const nextVal = prev - visibleCount;
      return nextVal < 0 ? lastStart : nextVal;
    });
  };

  const next = () => {
    setStartIndex((prev) => {
      const nextVal = prev + visibleCount;
      const wrapLimit = totalSlides * visibleCount;
      return nextVal >= wrapLimit ? 0 : nextVal;
    });
  };

  return (
    <section className="tempio-section tempio-reviews">
      <div className="tempio-section-inner">
        <h2 className="tempio-section-title">
          LE VALUTAZIONI SULLA NOSTRA PALESTRA
        </h2>

        <div className="tempio-reviews-wrapper multiple">
          <button
            type="button"
            className="tempio-slider-arrow tempio-slider-arrow--left"
            onClick={prev}
          >
            ‹
          </button>

          <div className="tempio-review-multi-container">
            {getVisibleReviews().map((review) => (
              <AnimatedCard key={review.id} className="tempio-review-card multi">
                <p className="tempio-review-text">{review.text}</p>
                <p className="tempio-review-name">
                  ★ ★ ★ ★ ★ – {review.name}
                </p>
              </AnimatedCard>
            ))}
          </div>

          <button
            type="button"
            className="tempio-slider-arrow tempio-slider-arrow--right"
            onClick={next}
          >
            ›
          </button>
        </div>

        <div className="tempio-slider-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={
                "tempio-slider-dot" +
                (startIndex === i * visibleCount
                  ? " tempio-slider-dot--active"
                  : "")
              }
              onClick={() => setStartIndex(i * visibleCount)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
