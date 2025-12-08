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
