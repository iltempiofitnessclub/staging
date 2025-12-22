"use client";

import Link from "next/link";

type HeroProps = {
  titleLine1: string;
  titleLine2: string;
  backgroundImage?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

export function Hero({
  className = "",
  backgroundImage,
  titleLine1,
  titleLine2,
  subtitle,
  buttonLabel,
  buttonHref,
}: HeroProps) {
  return (
    <section
      className={`hero-section ${className}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-line1">{titleLine1}</h1>
          <h1 className="hero-line2">{titleLine2}</h1>

          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {buttonLabel && buttonHref && (
            <Link href={buttonHref} className="hero-btn">
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
