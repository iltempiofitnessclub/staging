"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Hovered = "none" | "left" | "right";
type Selected = "none" | "doghouse" | "tempio";

export default function HomePage() {
  const router = useRouter();
  const [hoveredBox, setHoveredBox] = useState<Hovered>("none");
  const [selected, setSelected] = useState<Selected>("none");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = (target: "doghouse" | "tempio") => {
    if (isTransitioning) return;

    setSelected(target);
    setHoveredBox(target === "doghouse" ? "left" : "right");
    setIsTransitioning(true);

    if (typeof document !== "undefined") {
      if (target === "doghouse") {
        document.body.style.backgroundColor = "#000000";
      } else {
        document.body.style.backgroundColor = "#ffffff";
      }
    }

    setTimeout(() => {
      router.push(target === "doghouse" ? "/doghouse" : "/tempio");
    }, 400);
  };

  const transitionClass =
    isTransitioning && selected === "doghouse"
      ? "landing-home--transition-dog"
      : isTransitioning && selected === "tempio"
      ? "landing-home--transition-tempio"
      : "";

  return (
    <div className={`landing-home ${transitionClass}`}>
      <div
        className="landing-split-container"
        onMouseLeave={() => setHoveredBox("none")}
      >
        <div
          className={[
            "landing-box",
            "landing-box-left",
            hoveredBox === "left"
              ? "expanded"
              : hoveredBox === "right"
              ? "shrunk"
              : "",
            selected === "doghouse" ? "landing-box--selected" : "",
            selected === "tempio" ? "landing-box--hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={() => !isTransitioning && setHoveredBox("left")}
          onClick={() => handleClick("doghouse")}
        >
          <div className="landing-overlay" />
          <h2>DOG HOUSE</h2>
          <p className="landing-description">
            Allenamenti, corsi e disciplina: entra nel mondo DogHouse.
          </p>
        </div>

        <div
          className={[
            "landing-box",
            "landing-box-right",
            hoveredBox === "right"
              ? "expanded"
              : hoveredBox === "left"
              ? "shrunk"
              : "",
            selected === "tempio" ? "landing-box--selected" : "",
            selected === "doghouse" ? "landing-box--hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={() => !isTransitioning && setHoveredBox("right")}
          onClick={() => handleClick("tempio")}
        >
          <div className="landing-overlay" />
          <h2>TEMPIO</h2>
          <p className="landing-description">
            Fitness, benessere e trasformazione personale.
          </p>
        </div>
      </div>
    </div>
  );
}
