# Il Tempio Fitness Club & DogHouse Boxing - Sito Web Ufficiale

Sito web multi-brand per **Il Tempio Fitness Club** e **DogHouse Boxing**, due palestre situate a Bari - Palese. Il progetto include landing page separate, sistema di gestione soci (backoffice admin), form di contatto e pagine legali.

## 📋 Indice

- [Tecnologie Utilizzate](#tecnologie-utilizzate)
- [Struttura del Progetto](#struttura-del-progetto)
- [Installazione e Setup](#installazione-e-setup)
- [Configurazione](#configurazione)
- [Deployment](#deployment)
- [Funzionalità Principali](#funzionalità-principali)
- [Architettura](#architettura)
- [Gestione Form](#gestione-form)
- [Backoffice Admin](#backoffice-admin)
- [Stili e Design](#stili-e-design)
- [SEO e Performance](#seo-e-performance)

---

## 🚀 Tecnologie Utilizzate

### Core
- **Next.js 16.1.4** - Framework React con App Router
- **React 19.2.0** - Libreria UI
- **TypeScript 5.9.3** - Type safety

### Styling
- **CSS Modules** - Stili component-scoped
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom CSS** - Stili brand-specific per DogHouse e Tempio

### Backend & Database
- **Supabase** - Database PostgreSQL e autenticazione
  - `@supabase/supabase-js` - Client JavaScript
  - `@supabase/auth-helpers-nextjs` - Helper per autenticazione Next.js

### Form & Email
- **Netlify Forms** - Gestione form statici
- **Resend** - Servizio email (legacy, non più utilizzato con export statico)

### Charts & Visualizzazione
- **Chart.js 4.5.1** - Grafici per dashboard admin
- **react-chartjs-2** - Wrapper React per Chart.js

### Icons
- **react-icons 5.5.0** - Libreria icone (Font Awesome, etc.)

### Build & Deploy
- **Netlify** - Hosting e deployment
- **Static Export** - Build statico per performance ottimali

---

## 📁 Struttura del Progetto

```
.
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page selezione sito
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Stili globali
│   │
│   ├── doghouse/                 # Sezione DogHouse Boxing
│   │   ├── page.tsx              # Homepage DogHouse
│   │   ├── contatti/             # Form contatti DogHouse
│   │   ├── privacy-policy/       # Privacy policy
│   │   ├── cookie-policy/        # Cookie policy
│   │   ├── termini-condizioni/   # Termini e condizioni
│   │   └── regolamento-palestra/ # Regolamento palestra
│   │
│   ├── tempio/                   # Sezione Il Tempio Fitness Club
│   │   ├── page.tsx              # Homepage Tempio
│   │   ├── contatti/             # Form contatti Tempio
│   │   ├── privacy-policy/       # Privacy policy
│   │   ├── cookie-policy/        # Cookie policy
│   │   ├── termini-condizioni/   # Termini e condizioni
│   │   └── regolamento-palestra/ # Regolamento palestra
│   │
│   └── admin/                    # Backoffice amministrazione
│       ├── login/                # Login admin
│       ├── dashboard/            # Dashboard gestione soci
│       └── soci/                 # CRUD soci
│           ├── new/              # Nuovo socio
│           └── edit/             # Modifica socio
│
├── components/                   # Componenti React riutilizzabili
│   ├── admin/                    # Componenti admin
│   │   ├── AdminHeader.tsx       # Header backoffice
│   │   ├── AdminFooter.tsx       # Footer backoffice
│   │   └── soci/                 # Componenti gestione soci
│   │       ├── SociTable.tsx     # Tabella soci
│   │       ├── SocioForm.tsx     # Form socio
│   │       ├── SociMonitoringDashboard.tsx  # Dashboard KPI
│   │       ├── socioMappers.ts   # Mapping dati soci
│   │       ├── socioKpis.ts      # Calcolo KPI
│   │       └── types.ts          # TypeScript types
│   │
│   ├── layout/                   # Componenti layout
│   │   ├── MainHeader.tsx        # Header principale
│   │   ├── MainFooter.tsx        # Footer principale
│   │   └── Hero.tsx              # Sezione hero
│   │
│   ├── routing/                  # Componenti routing
│   │   └── Link.tsx              # Link wrapper
│   │
│   ├── ui/                       # Componenti UI
│   │   ├── PageLoader.tsx        # Loader pagina
│   │   └── FloatingWhatsAppButton.tsx  # Pulsante WhatsApp
│   │
│   └── styles/                   # CSS Modules componenti
│       ├── adminHeader.module.css
│       ├── adminFooter.module.css
│       ├── header.css
│       ├── footer.css
│       ├── hero.css
│       └── floating-whatsapp.css
│
├── lib/                          # Utility e helper
│   ├── supabase/                 # Supabase utilities
│   │   ├── client.ts             # Client Supabase
│   │   ├── soci.ts               # Query soci
│   │   ├── sociFilters.ts        # Filtri soci
│   │   └── socioMappers.ts       # Mapping dati
│   ├── date.ts                   # Utility date
│   ├── linkBasePath.ts           # Base path links
│   └── publicAsset.ts            # Asset pubblici
│
├── data/                         # Dati statici
│   └── doghouseCourses.ts        # Corsi DogHouse
│
├── styles/                       # Stili globali brand
│   ├── doghouse.css              # Stili DogHouse
│   ├── tempio.css                # Stili Tempio
│   └── legal.css                 # Stili pagine legali
│
├── public/                       # Asset statici
│   ├── forms.html                # Form HTML per Netlify Forms
│   ├── *.jpg, *.png              # Immagini
│   └── icon/                     # Icone
│
├── next.config.mjs               # Configurazione Next.js
├── netlify.toml                  # Configurazione Netlify
├── tsconfig.json                 # Configurazione TypeScript
└── package.json                  # Dipendenze
```

---

## 🛠️ Installazione e Setup

### Prerequisiti
- Node.js 20.x o superiore
- npm, yarn, pnpm o bun

### Installazione

```bash
# Clona il repository
git clone <repository-url>
cd iltempio.it

# Installa le dipendenze
npm install

# Copia il file .env.example
cp .env.example .env.local

# Configura le variabili d'ambiente (vedi sezione Configurazione)
```

### Avvio Development Server

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

---

## ⚙️ Configurazione

### Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://productiontempio.netlify.app

# Resend (legacy - non utilizzato con export statico)
RESEND_API_KEY=your_resend_api_key
```

### Configurazione Supabase

1. Crea un progetto su [Supabase](https://supabase.com)
2. Crea la tabella `soci` con lo schema:

```sql
CREATE TABLE soci (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  cognome TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  data_iscrizione DATE NOT NULL,
  stato_pagamento TEXT CHECK (stato_pagamento IN ('pagato', 'non_pagato')),
  data_pagamento DATE,
  quota_mese INTEGER,
  quota_anno INTEGER,
  certificato_medico TEXT CHECK (certificato_medico IN ('presente', 'assente', 'scaduto')),
  data_scadenza_certificato DATE,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indici per performance
CREATE INDEX idx_soci_stato_pagamento ON soci(stato_pagamento);
CREATE INDEX idx_soci_certificato_medico ON soci(certificato_medico);
CREATE INDEX idx_soci_data_iscrizione ON soci(data_iscrizione);
```

3. Configura le Row Level Security (RLS) policies per proteggere i dati

### Configurazione Netlify

Il sito è configurato per il deploy su Netlify con le seguenti impostazioni:

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `out`
- Node version: 20.x

**Environment Variables su Netlify:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

---

## 🚢 Deployment

### Build Locale

```bash
# Build statico
npm run build

# La cartella 'out' conterrà i file statici
```

### Deploy su Netlify

1. **Connetti il repository** a Netlify
2. **Configura le variabili d'ambiente** nel dashboard Netlify
3. **Imposta Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
4. **Deploy automatico** ad ogni push su main

### Netlify Forms Setup

I form di contatto utilizzano Netlify Forms. Dopo il primo deploy:

1. Vai su **Forms** nel dashboard Netlify
2. Configura le **notifiche email** per i form:
   - `doghouse-contact` → `boxingdoghouse@gmail.com`
   - `tempio-contact` → `iltempiofitnessclub@gmail.com`

---

## ✨ Funzionalità Principali

### 1. Landing Page Multi-Brand
- Pagina di selezione iniziale tra DogHouse e Tempio
- Design responsive con animazioni smooth
- Immagini hero ottimizzate

### 2. Siti Brand Separati

#### DogHouse Boxing
- **Colori brand:** Giallo (#FFD52E) e Nero (#000000)
- **Indirizzo:** Via V. Maiorano Capitano, 24 - 70128 Bari - Palese (BA)
- **Corsi:** Boxing, Functional Training, Kids Boxing, etc.
- **Contatti:** boxingdoghouse@gmail.com | 353.450.3806

#### Il Tempio Fitness Club
- **Colori brand:** Rosso (#C7322B) e Bianco (#FFFFFF)
- **Indirizzo:** Vico VI Duca D'Aosta, 7/a - 70128 Bari - Palese (BA)
- **Corsi:** Krav Maga, Fit Postural, Budo Taijutsu, Music Fit, etc.
- **Contatti:** iltempiofitnessclub@gmail.com | 392.097.8713

### 3. Form di Contatto
- Validazione client-side (email o telefono obbligatorio)
- Selezione multipla corsi
- Checkbox privacy GDPR-compliant
- Integrazione Netlify Forms
- Notifiche email automatiche

### 4. Backoffice Admin
- **Autenticazione** con Supabase Auth
- **Dashboard KPI** con grafici Chart.js:
  - Totale soci attivi
  - Soci pagati/non pagati
  - Certificati medici (presenti/assenti/scaduti)
  - Filtri per mese/anno
- **Gestione Soci:**
  - Tabella con paginazione
  - Filtri avanzati (stato pagamento, certificato, data iscrizione, ricerca)
  - CRUD completo (Create, Read, Update, Delete)
  - Export dati (futuro)
- **Responsive design** per tablet e mobile

### 5. Pagine Legali
- Privacy Policy
- Cookie Policy
- Termini e Condizioni
- Regolamento Palestra
- Versioni separate per DogHouse e Tempio

### 6. Componenti UI
- **PageLoader:** Loader con barra di progresso e logo animato
- **FloatingWhatsAppButton:** Pulsante WhatsApp fisso
- **Hero Section:** Sezione hero con overlay e CTA
- **Animated Sections:** Animazioni scroll-based con Intersection Observer

---

## 🏗️ Architettura

### Next.js App Router
Il progetto utilizza Next.js 16 con App Router per:
- **File-based routing**
- **Server Components** (dove possibile)
- **Client Components** per interattività
- **Static Export** per performance ottimali

### Static Site Generation (SSG)
Configurazione `output: 'export'` in `next.config.mjs`:
- Genera sito completamente statico
- Deploy su CDN Netlify
- Performance eccellenti
- **Limitazione:** No API Routes (risolto con Netlify Forms)

### Gestione Stato
- **React Hooks** (useState, useEffect, useMemo)
- **URL Search Params** per stato condiviso (es. corso preselezionato)
- **Supabase Client** per dati backend

### Styling Strategy
- **CSS Modules** per componenti isolati
- **Global CSS** per stili brand (doghouse.css, tempio.css)
- **Tailwind CSS** per utility classes
- **Responsive Design** con media queries (768px, 520px breakpoints)

---

## 📝 Gestione Form

### Netlify Forms
I form utilizzano Netlify Forms per funzionare con il sito statico:

**Configurazione Form:**
```tsx
<form 
  name="doghouse-contact" 
  method="POST" 
  data-netlify="true" 
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="doghouse-contact" />
  <input type="hidden" name="bot-field" />
  {/* Altri campi */}
</form>
```

**File HTML Statico** (`public/forms.html`):
- Necessario per far rilevare i form a Netlify durante il build
- Contiene versioni HTML statiche dei form

**Submission:**
```typescript
const formData = new FormData(form);
const response = await fetch("/", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams(formData as any).toString(),
});
```

### Validazione Form
- **Email o Telefono obbligatorio** (almeno uno dei due)
- **Regex validation:**
  - Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Telefono: `/^[\d\s\+\-\(\)]{9,}$/`
- **Corsi:** Almeno un corso deve essere selezionato
- **Privacy:** Checkbox obbligatorio

---

## 👨‍💼 Backoffice Admin

### Autenticazione
- **Supabase Auth** per login sicuro
- **Protected Routes** con middleware
- **Session management** con cookies

### Dashboard KPI
Metriche calcolate in tempo reale:

```typescript
// Esempio calcolo KPI
const kpis = {
  totale_soci: soci.length,
  soci_pagati: soci.filter(s => s.stato_pagamento === 'pagato').length,
  soci_non_pagati: soci.filter(s => s.stato_pagamento === 'non_pagato').length,
  certificati_presenti: soci.filter(s => s.certificato_medico === 'presente').length,
  certificati_assenti: soci.filter(s => s.certificato_medico === 'assente').length,
  certificati_scaduti: soci.filter(s => s.certificato_medico === 'scaduto').length,
};
```

### Filtri Avanzati
- **Stato Pagamento:** Tutti, Pagato, Non Pagato
- **Certificato Medico:** Tutti, Presente, Assente, Scaduto
- **Data Iscrizione:** Picker con range date
- **Ricerca:** Nome, cognome, email, telefono
- **Periodo Dashboard:** Mese/Anno specifico

### Tabella Soci
- **Paginazione:** 10, 25, 50, 100 risultati per pagina
- **Sorting:** Click su header colonna
- **Azioni:** Modifica, Elimina
- **Status Icons:** Icone colorate per stato pagamento e certificato
- **Responsive:** Scroll orizzontale su mobile

---

## 🎨 Stili e Design

### Brand Colors

**DogHouse Boxing:**
```css
--doghouse-primary: #FFD52E;  /* Giallo */
--doghouse-secondary: #000000; /* Nero */
--doghouse-text: #FFFFFF;      /* Bianco */
```

**Il Tempio Fitness Club:**
```css
--tempio-primary: #C7322B;    /* Rosso */
--tempio-secondary: #FFFFFF;  /* Bianco */
--tempio-text: #000000;       /* Nero */
```

### Typography
- **Font principale:** System fonts (system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI")
- **Font monospace:** Geist Mono (Next.js font optimization)
- **Peso:** 700-900 per titoli, 400-600 per testo

### Responsive Breakpoints
```css
/* Tablet */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 520px) { }
```

### Animazioni
- **Fade-in on scroll:** Intersection Observer API
- **Smooth transitions:** 0.2s - 0.4s ease
- **Page loader:** Barra di progresso animata
- **Hover effects:** Opacity, transform, underline

---

## 🔍 SEO e Performance

### Ottimizzazioni
- **Static Export:** Sito completamente statico
- **Image Optimization:** `unoptimized: true` per compatibilità Netlify
- **Font Optimization:** Next.js font loading
- **CSS Modules:** Code splitting automatico
- **Lazy Loading:** Immagini con `loading="lazy"`

### Meta Tags
```tsx
export const metadata: Metadata = {
  title: "Il tempio Fitness Club - DogHouse",
  description: "Tutti i diritti riservati",
};
```

### Performance Tips
- Immagini ottimizzate (WebP quando possibile)
- CSS minificato in produzione
- JavaScript tree-shaking automatico
- CDN Netlify per distribuzione globale

---

## 📞 Contatti e Supporto

**DogHouse Boxing:**
- Email: boxingdoghouse@gmail.com
- Telefono: 353.450.3806
- Indirizzo: Via V. Maiorano Capitano, 24 - 70128 Bari - Palese (BA)

**Il Tempio Fitness Club:**
- Email: iltempiofitnessclub@gmail.com
- Telefono: 392.097.8713
- Indirizzo: Vico VI Duca D'Aosta, 7/a - 70128 Bari - Palese (BA)

**Sviluppo e Supporto Tecnico:**
- Email: webteamsolutionswork@gmail.com
- Developer: dangelodavide.work@gmail.com
- Analista: devidqerrei13@gmail.com

---

## 📄 Licenza

Tutti i diritti riservati © 2025 Il Tempio Fitness Club & DogHouse Boxing
