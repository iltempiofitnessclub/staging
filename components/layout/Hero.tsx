type HeroProps = {
  titleLine1: string;
  titleLine2: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

export function Hero({
  titleLine1,
  titleLine2,
  subtitle,
  buttonLabel = "GET STARTED",
  buttonHref = "#",
  className,
}: HeroProps) {
  return (
    <section className={`hero-section ${className ?? ""}`}>
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-heading">
            <span className="hero-line1">{titleLine1}</span>
            <br />
            <span className="hero-line2">{titleLine2}</span>
          </h1>

          {subtitle && <p className="hero-subtitle">{subtitle}</p>}

          <a href={buttonHref} className="hero-btn">
            {buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
