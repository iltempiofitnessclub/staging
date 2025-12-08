export function ContactStrip() {
  return (
    <section className="doghouse-contact-strip" id="contatti">
      <div className="doghouse-contact-strip-inner">
        <div className="doghouse-contact-strip-info">
          <h2 className="doghouse-contact-strip-title">CONTATTACI</h2>
          <p className="doghouse-contact-strip-text">
            DogHouse è in via V. Maiorano, 24 – 70128 Bari (BA)
          </p>
        </div>

        <button className="doghouse-contact-strip-button">
          <img
            src="/mark_email_unread.svg"
            alt=""
            className="doghouse-contact-strip-button-icon"
          />
          <span>CONTATTACI VIA EMAIL</span>
        </button>
      </div>
    </section>
  );
}
