"use client";

import React, { useState, useEffect } from "react";

import { FloatingWhatsAppButton } from "@/components/ui/FloatingWhatsAppButton";
import "@/components/styles/floating-whatsapp.css";
import "@/components/styles/header.css";
import "@/components/styles/footer.css";
import "@/components/styles/hero.css";
import Link from "next/link";
import "@/styles/doghouse.css";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { Hero } from "@/components/layout/Hero";

import {
  FaYoutube,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function DoghousePage() {
  return (
    <div className="doghouse-page">
      <MainHeader
        className="doghouse-header"
        logoSrc="/doghouse-logo.png"
        logoAlt="DogHouse Boxing"
        navItems={[
          { label: "Home", href: "/doghouse" },
          { label: "Chi siamo", href: "#chi-siamo" },
          { label: "Corsi", href: "#corsi" },
          { label: "Contatti", href: "#contatti" },
        ]}
      />

      <main className="doghouse-main">
        <Hero
          className="doghouse-hero"
          titleLine1="BUILD STRONG"
          titleLine2="TRAIN HARD"
          subtitle="DogHouse è una palestra di boxe a Bari dove formiamo atleti, giovani e adulti attraverso tecnica, disciplina e divertimento."
          buttonLabel="RICHIEDI UNA PROVA GRATUITA"
          buttonHref="tel:+390805301234"
        />

        <section id="chi-siamo" className="doghouse-section doghouse-about">
          <div className="doghouse-section-inner doghouse-about-inner">
            <div className="doghouse-about-text">
              <h2 className="doghouse-section-title">CHI SIAMO</h2>
              <p className="doghouse-section-text">
                DogHouse è una palestra di boxe a Bari dove formiamo atleti,
                giovani e adulti attraverso tecnica, disciplina e divertimento.
                Seguiti da istruttori certificati, offriamo corsi per tutte le età
                e livelli.
              </p>
            </div>
            <div className="doghouse-about-btn-wrapper">
            <Link href="/" className="hero-btn">
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
            </Link>
            </div>
          </div>
        </section>

        <CoursesSection />
        <ContactStrip />
        <EventsAndMapSection />
        <ReviewsSection />
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
        <FloatingWhatsAppButton
        phone="+39 333 1112222"
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
};

const COURSES: Course[] = [
  { id: 1, title: "BOXE BIMBI", imageSrc: "/course-bimbi.jpg" },
  { id: 2, title: "BOXE ADULTI", imageSrc: "/course-adulti.jpg" },
  { id: 3, title: "BOXE FEMMINILE", imageSrc: "/course-femminile.jpg" },
  { id: 4, title: "LEZIONI PRIVATE", imageSrc: "/course-private.jpg" },
  { id: 5, title: "PREPARAZIONE ATLETICA", imageSrc: "/course-athletic.jpg" },
];

function CoursesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 900) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const prev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + COURSES.length) % COURSES.length
    );
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

    if (diff > threshold) {
      prev();
    } else if (diff < -threshold) {
      next();
    }

    setTouchStartX(null);
  };

  return (
    <section id="corsi" className="doghouse-section doghouse-courses">
      <div className="doghouse-section-inner">
        <h2 className="doghouse-section-title">I NOSTRI CORSI</h2>

        <div className="doghouse-courses-wrapper">
          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--left"
            onClick={prev}
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
              <article
                key={course.id}
                className="doghouse-course-card doghouse-card-animated"
              >
                <div className="doghouse-course-image">
                  <img src={course.imageSrc} alt={course.title} />
                </div>
                <h3 className="doghouse-course-title">{course.title}</h3>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--right"
            onClick={next}
            aria-label="Corsi successivi"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="doghouse-contact-strip" id="contatti">
      <div className="doghouse-contact-strip-inner">
        <div className="doghouse-contact-strip-info">
          <h2 className="doghouse-contact-strip-title">CONTATTI</h2>
          <p className="doghouse-contact-strip-text">
            DogHouse è in via V. Maiorano, 24 – 70128 Bari (BA)
          </p>
        </div>
        <button className="doghouse-contact-strip-button">
          <img
            src="/mark-email.svg"
            alt=""
            className="doghouse-contact-strip-button-icon"
          />
          <span>CONTATTACI VIA EMAIL</span>
        </button>
      </div>
    </section>
  );
}

export function EventsAndMapSection() {
  const events = [
    {
      id: 1,
      title: "DogHouse alla manifestazione del IV municipio",
      date: "15 Dicembre 2025",
      label: "Evento",
      imageSrc: "/event-1.jpg",
    },
    {
      id: 2,
      title: "DogHouse e il Pink Boxing",
      date: "Dal 01 Gennaio 2026",
      label: "Evento",
      imageSrc: "/event-2.jpg",
    },
    {
      id: 3,
      title: "DogHouse al torneo di boxe interregionale a Mesagne",
      date: "20–21 Marzo 2026",
      label: "Evento",
      imageSrc: "/event-3.jpg",
    },
  ];

  return (
    <section className="doghouse-section doghouse-events">
      <div className="doghouse-section-inner doghouse-events-grid">
        <div className="doghouse-events-column">
          <h2 className="doghouse-section-title">I NOSTRI EVENTI</h2>
          <div className="doghouse-events-list">
            {events.map((ev) => (
              <article
                key={ev.id}
                className="doghouse-event-card doghouse-card-animated"
              >
                <div className="doghouse-event-layout">
                  <div className="doghouse-event-image">
                    <img src={ev.imageSrc} alt={ev.title} />
                  </div>
                  <div className="doghouse-event-content">
                    <div className="doghouse-event-badge">{ev.label}</div>
                    <h3 className="doghouse-event-title">{ev.title}</h3>
                    <p className="doghouse-event-date">{ev.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="doghouse-events-column doghouse-events-column-map">
          <h2 className="doghouse-section-title">COME RAGGIUNGERCI</h2>
          <div className="doghouse-map-wrapper">
            <iframe
              title="DogHouse Boxing - Palese Bari"
              src="https://maps.google.com/maps?q=Palese%20Bari&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>

          <div className="doghouse-map-button-wrapper">
            <button className="doghouse-map-button">
              <img
                src="/pin-map.svg"
                alt=""
                className="doghouse-map-button-icon"
              />
              <span>APRI SU MAPS</span>
            </button>
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
    text: "Nunc aliquam phasellus molestie blandit. Nisi, amet, id maecenas diam.",
    name: "Mario Rossi",
  },
  {
    id: 2,
    text: "Allenatori fantastici, ambiente motivante e inclusivo.",
    name: "Giulia Bianchi",
  },
  {
    id: 3,
    text: "La migliore palestra di boxe di Bari, senza dubbio.",
    name: "Luca Verdi",
  },
  {
    id: 4,
    text: "Una palestra incredibile, atmosfera super positiva.",
    name: "Francesco Moretti",
  },
  {
    id: 5,
    text: "Struttura perfetta, allenatori molto preparati.",
    name: "Sara Nitti",
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
    setStartIndex((prev) =>
      (prev - visibleCount + REVIEWS.length) % REVIEWS.length
    );
  };

  const next = () => {
    setStartIndex((prev) => (prev + visibleCount) % REVIEWS.length);
  };

  return (
    <section className="doghouse-section doghouse-reviews">
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
              <article key={review.id} className="doghouse-review-card multi">
                <p className="doghouse-review-text">{review.text}</p>
                <p className="doghouse-review-name">
                  ★ ★ ★ ★ ★ – {review.name}
                </p>
              </article>
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
                (startIndex === i * visibleCount
                  ? " doghouse-slider-dot--active"
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
