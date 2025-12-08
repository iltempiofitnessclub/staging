"use client";

import { useState, useEffect } from "react";

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

export function ReviewsSection() {
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
