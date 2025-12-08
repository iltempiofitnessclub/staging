"use client";

import { useState } from "react";

type Course = {
  id: number;
  title: string;
  imageSrc: string;
};

const COURSES: Course[] = [
  { id: 1, title: "BOXE BIMBI", imageSrc: "/course-bimbi.jpg" },
  { id: 2, title: "BOXE ADULTI", imageSrc: "/course-adulti.jpg" },
  { id: 3, title: "BOXE FEMMINILE", imageSrc: "/course-femminile.jpg" },
];

export function CoursesSection() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev - 1 + COURSES.length) % COURSES.length);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % COURSES.length);
  };

  const currentCourse = COURSES[index];

  return (
    <section className="doghouse-section doghouse-courses" id="corsi">
      <div className="doghouse-section-inner">
        <h2 className="doghouse-section-title">I NOSTRI CORSI</h2>

        <div className="doghouse-courses-wrapper">
          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--left"
            onClick={prev}
            aria-label="Corso precedente"
          >
            ‹
          </button>

          <article className="doghouse-courses-card doghouse-card-animated">
            <div className="doghouse-courses-image">
              <img src={currentCourse.imageSrc} alt={currentCourse.title} />
            </div>
            <h3 className="doghouse-courses-title">{currentCourse.title}</h3>
          </article>

          <button
            type="button"
            className="doghouse-slider-arrow doghouse-slider-arrow--right"
            onClick={next}
            aria-label="Corso successivo"
          >
            ›
          </button>
        </div>

        <div className="doghouse-slider-dots">
          {COURSES.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={
                "doghouse-slider-dot" +
                (i === index ? " doghouse-slider-dot--active" : "")
              }
              onClick={() => setIndex(i)}
              aria-label={`Vai al corso ${c.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
