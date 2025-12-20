export type Course = {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
  schedule: { days: string; time: string }[];
  info: string[];
};

export const COURSES: Course[] = [
  {
    id: 1,
    title: "BOXE MATUTTINO",
    imageSrc: "/mattutino.jpg",
    description:
      "Allenati al mattino con un corso completo di boxe per migliorare forma fisica, tecnica ed energia. Adatto a tutti i livelli, seguito da istruttori qualificati.",
    schedule: [
      {
        days: "Lunedì, mercoledì e venerdì",
        time: "10:00 – 11:00",
      },
    ],
    info: [
      "Livello: base / intermedio",
      "Durata lezione: 60 minuti",
      "Allenamento tecnico e atletico",
      "Ideale per iniziare la giornata con energia",
    ],
  },

  {
    id: 2,
    title: "BOXE BABY",
    imageSrc: "/baby.jpg",
    description:
      "Un corso divertente e sicuro per avvicinare i bambini alla boxe. Migliora coordinazione, disciplina e fiducia in sé stessi attraverso lo sport.",
    schedule: [
      {
        days: "Lunedì e mercoledì",
        time: "18:00 – 19:00",
      },
    ],
    info: [
      "Corso dedicato ai più piccoli",
      "Allenamento ludico e coordinativo",
      "Durata lezione: 60 minuti",
      "Obiettivo: disciplina e divertimento",
    ],
  },

  {
    id: 3,
    title: "BOXE FEMMINILE",
    imageSrc: "/femminile.jpg",
    description:
      "Corso di boxe femminile dedicato a forza, tecnica e sicurezza di sè. Allenamenti energici in un ambiente motivante e inclusivo.",
    schedule: [
      {
        days: "Martedì e giovedì",
        time: "18:00 – 19:00",
      },
    ],
    info: [
      "Corso riservato alle donne",
      "Allenamento tecnico e funzionale",
      "Adatto a tutti i livelli",
      "Ambiente inclusivo e motivante",
    ],
  },

  {
    id: 4,
    title: "BOXE ADULTI I",
    imageSrc: "/adultiI.jpg",
    description:
      "Il corso serale ideale dopo il lavoro. Allenamenti dinamici per migliorare forza, resistenza e tecnica pugilistica.",
    schedule: [
      {
        days: "Lunedì, mercoledì e venerdì",
        time: "19:00 – 20:00",
      },
    ],
    info: [
      "Livello: principiante",
      "Durata lezione: 60 minuti",
      "Tecnica di base e condizionamento",
      "Nessuna esperienza richiesta",
    ],
  },

  {
    id: 5,
    title: "BOXE ADULTI II",
    imageSrc: "/adultiII.jpg",
    description:
      "Orari flessibili e allenamenti completi. Perfetto per chi vuole risultati concreti senza vincoli di orario.",
    schedule: [
      {
        days: "Martedì e giovedì",
        time: "19:00 – 20:00",
      },
      {
        days: "Venerdì",
        time: "18:00 – 19:00",
      },
    ],
    info: [
      "Livello: intermedio",
      "Allenamento tecnico avanzato",
      "Durata lezione: 60 minuti",
      "Richiesta esperienza base",
    ],
  },

  {
    id: 6,
    title: "BOXE ADULTI III",
    imageSrc: "/adultiIII.jpg",
    description:
      "Allenamenti intensi in fascia serale per migliorare tecnica, potenza e forma fisica, scaricando lo stress della giornata.",
    schedule: [
      {
        days: "Lunedì, mercoledì e venerdì",
        time: "20:00 – 21:00",
      },
    ],
    info: [
      "Livello: avanzato",
      "Allenamento ad alta intensità",
      "Durata lezione: 60 minuti",
      "Preparazione agonistica",
    ],
  },

  {
    id: 7,
    title: "LEZIONI PRIVATE",
    imageSrc: "/private.jpg",
    description:
      "Le lezioni private offrono un allenamento personalizzato e su misura, ideale per lavorare su obiettivi specifici, tecnica individuale e preparazione atletica.",
    schedule: [
      {
        days: "Su appuntamento",
        time: "Orari flessibili",
      },
    ],
    info: [
      "Allenamento personalizzato",
      "Adatto a tutti i livelli",
      "Programma su misura",
      "Contattaci per informazioni",
    ],
  },
];
