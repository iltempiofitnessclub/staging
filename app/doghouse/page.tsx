"use client";

import React, { useEffect, useState } from "react";
import NextLink from "next/link";

import { FloatingWhatsAppButton } from "@/components/ui/FloatingWhatsAppButton";
import "@/components/styles/floating-whatsapp.css";
import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/components/styles/hero.css";
import "@/styles/doghouse.css";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { Hero } from "@/components/layout/Hero";

import { publicAsset } from "@/lib/publicAsset";

import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaFacebookF,
} from "react-icons/fa";

export default function DoghousePage() {
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
          { label: "Contatti", href: "/doghouse#contatti" },
        ]}
      />

      <main className="doghouse-main">
        <Hero
          className="doghouse-hero"
          backgroundImage={("/hero-doghouse.jpg")}
          titleLine1="BUILD STRONG"
          titleLine2="TRAIN HARD"
          buttonLabel="RICHIEDI UNA PROVA GRATUITA"
          buttonHref="/doghouse/contatti"
        />

        <AnimatedSection id="chi-siamo" className="doghouse-section doghouse-about">
          <div className="doghouse-section-inner doghouse-about-inner">
            <div className="doghouse-about-text">
              <h2 className="doghouse-section-title">CHI SIAMO</h2>
              <p className="doghouse-section-text">
                DogHouse è una palestra di boxe a Bari - Palese dove formiamo atleti,
                giovani e adulti attraverso tecnica, disciplina e divertimento.
                Seguiti da istruttori certificati, offriamo corsi per tutte le
                età e livelli.
              </p>
            </div>

            <div className="doghouse-about-btn-wrapper">
              <NextLink href="/" className="hero-btn">
                <span className="hero-btn-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
                  </svg>
                </span>
                TORNA ALLA SELEZIONE DEL SITO
              </NextLink>
            </div>
          </div>
        </AnimatedSection>

        <CoursesSection />
        <ContactStrip />
        <EventsAndMapSection />
        <ReviewsSection />
      </main>

      <MainFooter
        legalBasePath="/doghouse"
        logoSrc={publicAsset("/doghouse-logo-monogram.png")}
        email="boxingdoghouse@gmail.com"
        phone="353.450.3806"
        addressLines={[
          "Bari – Palese – 70128",
          "Via V. Maiorano Capitano, 24",
        ]}
        socialItems={[
          { href: "#", icon: <FaYoutube />, label: "YouTube" },
          { href: "https://www.facebook.com/share/17MQaoh5Ya/?mibextid=wwXIfr", icon: <FaFacebookF />, label: "Facebook" },
          { href: "https://www.instagram.com/_doghouse__boxing/", icon: <FaInstagram />, label: "Instagram" },
          { href: "https://www.tiktok.com/@dog.house056?_r=1&_t=ZN-932TvjyTyD8", icon: <FaTiktok />, label: "TikTok" },
        ]}
      />

      <FloatingWhatsAppButton
        phone="+39 353 4503806"
        message="Ciao! Vorrei informazioni sui corsi DogHouse."
        className="floating-whatsapp-btn-doghouse"
      />
    </div>
  );
}

type Course = {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
  schedule: { days: string; time: string }[];
  info: string[];
};

const COURSES: Course[] = [
  {
    id: 1,
    title: "BOXE MATUTTINO",
    imageSrc: "/mattutino.jpg",
    description:
      "Allenati al mattino con un corso completo di boxe per migliorare forma fisica, tecnica ed energia. Adatto a tutti i livelli, seguito da istruttori qualificati.",
    schedule: [{ days: "Lunedì, mercoledì e venerdì", time: "10:00 – 11:00" }],
    info: [
      "Livello: Principiante - Intermedio - Avanzato",
      "Tecnica pugilistica, strenght and conditioning (Forza e Condizionamento)",
      "Durata lezione: 60 minuti",
      "Allenamento tecnico e atletico",
      "Ideale per iniziare la giornata con energia",
    ],
  },
  {
    id: 2,
    title: "BOXE BABY",
    imageSrc: "/baby.jpg",
    description:
      "Un corso divertente e sicuro per avvicinare i bambini alla boxe. Migliora coordinazione, disciplina e fiducia in sé stessi attraverso lo sport.",
    schedule: [{ days: "Lunedì e mercoledì", time: "18:00 – 19:00" }],
    info: [
      "Livello: Principiante - Intermedio - Avanzato",
      "Tecnica pugilistica, strenght and conditioning (Forza e Condizionamento)",
      "Corso dedicato ai più piccoli",
      "Allenamento ludico e coordinativo",
      "Durata lezione: 60 minuti",
      "Obiettivo: disciplina e divertimento",
    ],
  },
  {
    id: 3,
    title: "BOXE FEMMINILE",
    imageSrc: "/femminile.jpg",
    description:
      "Corso di boxe femminile dedicato a forza, tecnica e sicurezza di sè. Allenamenti energici in un ambiente motivante e inclusivo.",
    schedule: [{ days: "Martedì e giovedì", time: "18:00 – 19:00" }],
    info: [
      "Livello: Principiante - Intermedio - Avanzato",
      "Tecnica pugilistica, strenght and conditioning (Forza e Condizionamento)",
      "Corso riservato alle donne",
      "Allenamento tecnico e funzionale",
      "Adatto a tutti i livelli",
      "Ambiente inclusivo e motivante",
    ],
  },
  {
    id: 4,
    title: "BOXE ADULTI I",
    imageSrc: "/adultiI.jpg",
    description:
      "Il corso serale ideale dopo il lavoro. Allenamenti dinamici per migliorare forza, resistenza e tecnica pugilistica.",
    schedule: [{ days: "Lunedì, mercoledì e venerdì", time: "19:00 – 20:00" }],
    info: [
      "Livello: Principiante - Intermedio - Avanzato",
      "Tecnica pugilistica, strenght and conditioning (Forza e Condizionamento)",
      "Durata lezione: 60 minuti",
      "Tecnica di base e condizionamento",
      "Nessuna esperienza richiesta",
    ],
  },
  {
    id: 5,
    title: "BOXE ADULTI II",
    imageSrc: "/adultiII.jpg",
    description:
      "Orari flessibili e allenamenti completi. Perfetto per chi vuole risultati concreti senza vincoli di orario.",
    schedule: [
      { days: "Martedì e giovedì", time: "19:00 – 20:00" },
      { days: "Venerdì", time: "18:00 – 19:00" },
    ],
    info: [
      "Livello: Principiante - Intermedio - Avanzato",
      "Tecnica pugilistica, strenght and conditioning (Forza e Condizionamento)",
      "Allenamento tecnico avanzato",
      "Durata lezione: 60 minuti",
      "Nessuna esperienza richiesta",
    ],
  },
  {
    id: 6,
    title: "BOXE ADULTI III",
    imageSrc: "/adultiIII.jpg",
    description:
      "Allenamenti intensi in fascia serale per migliorare tecnica, potenza e forma fisica, scaricando lo stress della giornata.",
    schedule: [{ days: "Lunedì, mercoledì e venerdì", time: "20:00 – 21:00" }],
    info: [
      "Livello: Principiante - Intermedio - Avanzato",
      "Tecnica pugilistica, strenght and conditioning (Forza e Condizionamento)",
      "Allenamento ad alta intensità",
      "Durata lezione: 60 minuti",
      "Preparazione agonistica",
      "Nessuna esperienza richiesta",
    ],
  },
  {
    id: 7,
    title: "LEZIONI PRIVATE",
    imageSrc: "/private.jpg",
    description:
      "Le lezioni private offrono un allenamento personalizzato e su misura, ideale per lavorare su obiettivi specifici, tecnica individuale e preparazione atletica.",
    schedule: [{ days: "Su appuntamento", time: "Orari flessibili" }],
    info: [
      "Livello: Principiante - Intermedio - Avanzato",
      "Tecnica pugilistica, strenght and conditioning (Forza e Condizionamento)",
      "Allenamento personalizzato",
      "Adatto a tutti i livelli",
      "Programma su misura",
      "Contattaci per informazioni",
    ],
  },
];

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

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2, rootMargin: "30px 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      onClick={onClick}
      className={
        "doghouse-card-animated" +
        (isVisible ? " doghouse-card-animated--visible" : "") +
        (className ? ` ${className}` : "") +
        (onClick ? " doghouse-card-clickable" : "")
      }
    >
      {children}
    </article>
  );
}

function AnimatedSection({
  className = "",
  children,
  as = "section",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
  id?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "50px 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const Component = as;

  return (
    <Component
      ref={ref as any}
      id={id}
      className={
        "doghouse-card-animated" +
        (isVisible ? " doghouse-card-animated--visible" : "") +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </Component>
  );
}

function CoursesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
      if (e.key === "Escape") setSelectedCourse(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (selectedCourse) root.classList.add("doghouse-modal-open");
    else root.classList.remove("doghouse-modal-open");
    return () => root.classList.remove("doghouse-modal-open");
  }, [selectedCourse]);

  const prev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + COURSES.length) % COURSES.length);
  };

  const next = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % COURSES.length);
  };

  const getVisibleCourses = () => {
    const result: Course[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIndex + i) % COURSES.length;
      result.push(COURSES[idx]);
    }
    return result;
  };

  const visibleCourses = getVisibleCourses();

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
    <AnimatedSection id="corsi" className="doghouse-section doghouse-courses">
      <div className="doghouse-section-inner">
        <h2 className="doghouse-section-title">I NOSTRI CORSI</h2>

        <div className="doghouse-courses-wrapper">
          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--left"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Corsi precedenti"
          >
            ‹
          </button>

          <div
            className="doghouse-courses-grid"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {visibleCourses.map((course) => (
              <AnimatedCard
                key={course.id}
                className="doghouse-course-card"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="doghouse-course-image">
                  <img
                    src={publicAsset(course.imageSrc)}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="doghouse-course-title">{course.title}</h3>
              </AnimatedCard>
            ))}
          </div>

          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--right"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Corsi successivi"
          >
            ›
          </button>
        </div>

        <div className="doghouse-slider-dots doghouse-slider-dots--courses">
          {COURSES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={
                "doghouse-slider-dot" +
                (startIndex === i ? " doghouse-slider-dot--active" : "")
              }
              onClick={() => setStartIndex(i)}
              aria-label={`Vai al corso ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div
          className="doghouse-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedCourse(null);
          }}
        >
          <div className="doghouse-modal">
            <button
              type="button"
              className="doghouse-modal-close"
              onClick={() => setSelectedCourse(null)}
              aria-label="Chiudi"
            >
              ✕
            </button>

            <h3 className="doghouse-modal-title">{selectedCourse.title}</h3>

            <div className="doghouse-modal-body">
              <p className="doghouse-modal-desc">{selectedCourse.description}</p>

              <div className="doghouse-modal-section">
                <h4 className="doghouse-modal-subtitle">Orari</h4>

                <ul className="doghouse-modal-schedule">
                  {selectedCourse.schedule.map((row, idx) => (
                    <li key={idx} className="doghouse-modal-schedule-row">
                      <span>{row.days}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="doghouse-modal-section">
                <h4 className="doghouse-modal-subtitle">Info</h4>

                <ul className="doghouse-modal-list">
                  {selectedCourse.info.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="doghouse-modal-actions">
                <NextLink
                  href={`/doghouse/contatti?course=${selectedCourse.id}`}
                  className="doghouse-modal-cta"
                  onClick={() => setSelectedCourse(null)}
                >
                  CHIEDI INFORMAZIONI
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}

function ContactStrip() {
  return (
    <AnimatedSection className="doghouse-contact-strip" id="contatti">
      <div className="doghouse-contact-strip-inner">
        <div className="doghouse-contact-strip-info">
          <h2 className="doghouse-contact-strip-title">CONTATTI</h2>
          <p className="doghouse-contact-strip-text">
            DogHouse è in Via V. Maiorano Capitano, 24 - 70128 Bari - Palese (BA)
          </p>
        </div>

        <NextLink href="/doghouse/contatti">
          <button className="doghouse-contact-strip-button">
            <img
              src={publicAsset("/mark-email.svg")}
              alt=""
              className="doghouse-contact-strip-button-icon"
              loading="lazy"
              decoding="async"
            />
            <span>CONTATTACI VIA EMAIL</span>
          </button>
        </NextLink>
      </div>
    </AnimatedSection>
  );
}

export function EventsAndMapSection() {
  const events = [
    {
      id: 1,
      title: "Primo posto campionati regionali esordienti 🏅",
      description:
        "Grande successo ai Campionati Regionali Esordienti di Brindisi: Gioele Galiano, 14 anni, categoria 60 kg, conquista il 1° posto, confermandosi uno dei giovani talenti più promettenti della nostra squadra. Un risultato che premia impegno, sacrificio e il lavoro costante svolto in palestra.",
      date: "03 - 04 - 05 - 06 Aprile 2025",
      label: "Evento",
      imageSrc: "/evento1.jpg",
    },
    {
      id: 2,
      title: "Festa dello sport V Municipio",
      description:
        "In occasione della Festa dello Sport nel V Municipio di Bari, i nostri ragazzi sono stati protagonisti di un’esibizione di pugilato all’aperto. Un allenamento dimostrativo che ha unito sport, passione e coinvolgimento del pubblico, portando la boxe tra la gente e promuovendo i valori di disciplina, rispetto e crescita personale.",
      date: "29 Settembre 2024",
      label: "Evento",
      imageSrc: "/evento2.jpg",
    },
  ];

  return (
    <AnimatedSection className="doghouse-section doghouse-events">
      <div className="doghouse-section-inner doghouse-events-grid">
        <div className="doghouse-events-column">
          <h2 className="doghouse-section-title">I NOSTRI EVENTI</h2>

          <div className="doghouse-events-list">
            {events.map((ev) => (
              <AnimatedCard key={ev.id} className="doghouse-event-card">
                <div className="doghouse-event-layout">
                  <div className="doghouse-event-image">
                    <img
                      src={publicAsset(ev.imageSrc)}
                      alt={ev.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="doghouse-event-content">
                    <div className="doghouse-event-badge">{ev.label}</div>

                    <h3 className="doghouse-event-title">{ev.title}</h3>

                    <p className="doghouse-event-desc">{ev.description}</p>

                    {ev.date ? <p className="doghouse-event-date">{ev.date}</p> : null}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        <div className="doghouse-events-column doghouse-events-column-map">
          <h2 className="doghouse-section-title">COME RAGGIUNGERCI</h2>

          <div className="doghouse-map-wrapper">
            <iframe
              title="DogHouse Boxing - Palese Bari"
              src="https://maps.google.com/maps?q=Via+V.+Maiorano+Capitano,+24,+70128+Bari+BA&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>

          <div className="doghouse-map-button-wrapper">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Via+V.+Maiorano+Capitano,+24,+70128+Bari+BA"
              target="_blank"
              rel="noopener noreferrer"
              className="doghouse-map-button"
            >
              <img
                src={publicAsset("/pin-map.svg")}
                alt=""
                className="doghouse-map-button-icon"
                loading="lazy"
                decoding="async"
              />
              <span>APRI SU MAPS</span>
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

type Review = {
  id: number;
  text: string;
  name: string;
};

const REVIEWS: Review[] = [
  { id: 1, text: "Ambiente super motivante e allenatori molto preparati. Mi sento seguito in ogni allenamento.", name: "Marco De Santis" },
  { id: 2, text: "Palestra curata e clima davvero positivo. Allenamenti intensi ma adatti anche a chi inizia.", name: "Roberto Ancona" },
  { id: 3, text: "Struttura ottima e istruttori seri. Ho migliorato tecnica e forma fisica in poco tempo.", name: "Alessandro Lorusso" },
  { id: 4, text: "Consigliatissima. Allenamenti completi, ambiente pulito e tanta professionalità.", name: "Francesca Milella" },
  { id: 5, text: "La migliore palestra di boxe della zona. Passione vera e grande attenzione agli atleti.", name: "Davide Ladisa" },
  { id: 6, text: "Perfetta sia per principianti che per chi ha già esperienza. Ti fanno sentire parte del gruppo.", name: "Chiara Vitale" },
  { id: 7, text: "Allenatori competenti e sempre disponibili. Allenarsi qui è uno stimolo continuo.", name: "Michele Rizzi" },
  { id: 8, text: "Ottima esperienza. Allenamenti seri, divertenti e mai improvvisati.", name: "Laura Mancini" },
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
    <AnimatedSection className="doghouse-section doghouse-reviews">
      <div className="doghouse-section-inner">
        <h2 className="doghouse-section-title">
          LE VALUTAZIONI SULLA NOSTRA PALESTRA
        </h2>

        <div className="doghouse-reviews-wrapper multiple">
          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--left"
            onClick={prev}
          >
            ‹
          </button>

          <div className="doghouse-review-multi-container">
            {getVisibleReviews().map((review) => (
              <AnimatedCard key={review.id} className="doghouse-review-card multi">
                <p className="doghouse-review-text">{review.text}</p>
                <p className="doghouse-review-name">★ ★ ★ ★ ★ – {review.name}</p>
              </AnimatedCard>
            ))}
          </div>

          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--right"
            onClick={next}
          >
            ›
          </button>
        </div>

        <div className="doghouse-slider-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={
                "doghouse-slider-dot" +
                (startIndex === i * visibleCount ? " doghouse-slider-dot--active" : "")
              }
              onClick={() => setStartIndex(i * visibleCount)}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
