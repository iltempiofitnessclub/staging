"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Hovered = "none" | "left" | "right";
type Selected = "none" | "doghouse" | "tempio";

function assetPath(path: string) {
  if (typeof window === "undefined") return path;

  const isGitHubStaging =
    window.location.hostname === "iltempiofitnessclub.github.io" &&
    window.location.pathname.startsWith("/staging");

  return isGitHubStaging ? `/staging${path}` : path;
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

export default function Home() {
  const router = useRouter();
  const [hoveredBox, setHoveredBox] = useState<Hovered>("none");
  const [selected, setSelected] = useState<Selected>("none");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const mobile = useMemo(() => isMobileDevice(), []);
  const [isMobile, setIsMobile] = useState(mobile);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const pushWithBase = (path: string) => {
    router.push(assetPath(path));
  };

  const startTransition = (target: "doghouse" | "tempio") => {
    if (isTransitioning) return;

    setSelected(target);
    setHoveredBox(target === "doghouse" ? "left" : "right");
    setIsTransitioning(true);

    if (typeof document !== "undefined") {
      document.body.style.backgroundColor =
        target === "doghouse" ? "#000000" : "#ffffff";
    }

    setTimeout(() => {
      router.push(target === "doghouse" ? "/doghouse" : "/tempio");
    }, 400);
  };

  const handleBoxPress = (target: "doghouse" | "tempio") => {
    if (isTransitioning) return;

    if (!isMobile) {
      startTransition(target);
      return;
    }

    if (selected !== target) {
      setSelected(target);
      setHoveredBox(target === "doghouse" ? "left" : "right");
      return;
    }

    startTransition(target);
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
        onMouseLeave={() => !isMobile && setHoveredBox("none")}
      >
        <div
          className={[
            "landing-box",
            "landing-box-left",
            !isMobile && hoveredBox === "left"
              ? "expanded"
              : !isMobile && hoveredBox === "right"
              ? "shrunk"
              : "",
            isMobile && selected === "doghouse" ? "expanded" : "",
            isMobile && selected === "tempio" ? "shrunk" : "",
            selected === "doghouse" ? "landing-box--selected" : "",
            isTransitioning && selected === "tempio" ? "landing-box--hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={() => !isMobile && !isTransitioning && setHoveredBox("left")}
          onClick={() => handleBoxPress("doghouse")}
          role="button"
          tabIndex={0}
        >
          <div className="landing-overlay" />
          <h2>DOG HOUSE</h2>

          <p className="landing-description">
            Con la giusta disciplina, la boxe diventa per tutti. 
              <br />
            Allenamenti guidati e professionali, metodo chiaro e crescita costante.
          </p>

          {isMobile && selected === "doghouse" && (
            <p className="landing-tap-hint">Tocca di nuovo per entrare</p>
          )}
        </div>

        <div
          className={[
            "landing-box",
            "landing-box-right",
            !isMobile && hoveredBox === "right"
              ? "expanded"
              : !isMobile && hoveredBox === "left"
              ? "shrunk"
              : "",
            isMobile && selected === "tempio" ? "expanded" : "",
            isMobile && selected === "doghouse" ? "shrunk" : "",
            selected === "tempio" ? "landing-box--selected" : "",
            isTransitioning && selected === "doghouse" ? "landing-box--hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={() => !isMobile && !isTransitioning && setHoveredBox("right")}
          onClick={() => handleBoxPress("tempio")}
          role="button"
          tabIndex={0}
        >
          <div className="landing-overlay" />
          <h2>IL TEMPIO FITNESS CLUB</h2>

          <p className="landing-description">
            Fitness, benessere e trasformazione personale.
          </p>

          {isMobile && selected === "tempio" && (
            <p className="landing-tap-hint">Tocca di nuovo per entrare</p>
          )}
        </div>
      </div>
    </div>
  );
}
