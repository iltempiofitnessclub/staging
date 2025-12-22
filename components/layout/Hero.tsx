"use client";

import NextLink from "next/link";

type HeroProps = {
  className?: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
};

export function Hero({
  className = "",
  titleLine1,
  titleLine2,
  subtitle,
  buttonLabel,
  buttonHref,
}: HeroProps) {
  return (
    <section className={`hero ${className}`}>
      <div className="hero__inner">
        <h1 className="hero__title">
          <span className="hero__title-line">{titleLine1}</span>
          <span className="hero__title-line">{titleLine2}</span>
        </h1>

        <p className="hero__subtitle">{subtitle}</p>
        <NextLink href={buttonHref} className="hero-btn">
          {buttonLabel}
        </NextLink>
      </div>
    </section>
  );
}
