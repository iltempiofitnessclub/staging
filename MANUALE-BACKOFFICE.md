# 📘 Manuale Utente Backoffice Admin

**Il Tempio Fitness Club & DogHouse Boxing**  
Sistema di Gestione Soci - Guida Completa

---

## 📋 Indice

1. [Introduzione](#introduzione)
2. [Accesso al Sistema](#accesso-al-sistema)
3. [Dashboard Principale](#dashboard-principale)
4. [Gestione Soci](#gestione-soci)
5. [Filtri e Ricerca](#filtri-e-ricerca)
6. [Dashboard di Monitoraggio](#dashboard-di-monitoraggio)
7. [Risoluzione Problemi](#risoluzione-problemi)

---

## 🎯 Introduzione

Il backoffice admin è il sistema di gestione centralizzato per i soci di **Il Tempio Fitness Club** e **DogHouse Boxing**. 

### Funzionalità Principali
- ✅ Visualizzazione elenco soci con paginazione
- ✅ Ricerca e filtri avanzati
- ✅ Inserimento nuovi soci
- ✅ Modifica dati soci esistenti
- ✅ Eliminazione soci
- ✅ Dashboard KPI con statistiche in tempo reale
- ✅ Monitoraggio pagamenti mensili
- ✅ Gestione certificati medici
- ✅ Responsive design (desktop, tablet, mobile)

---

## 🔐 Accesso al Sistema

### URL di Accesso
```
https://productiontempio.netlify.app/admin/login
```

### Procedura di Login

1. **Apri il browser** e vai all'URL di accesso
2. **Inserisci le credenziali:**
   - Email amministratore
   - Password
3. **Clicca su "ACCEDI"**
4. Se le credenziali sono corrette, verrai reindirizzato alla dashboard

### Recupero Password
Se hai dimenticato la password, contatta l'amministratore di sistema:
- Email: webteamsolutionswork@gmail.com

### Logout
Per uscire dal sistema, chiudi semplicemente il browser o la scheda.

---

## 📊 Dashboard Principale

Dopo il login, accedi alla **Dashboard Principale** che mostra:

### Sezioni della Dashboard

#### 1. Header
- **Loghi:** DogHouse (sinistra) e Tempio (destra)
- **Titolo:** "DOGHOUSE BOXING - IL TEMPIO FITNESS CLUB"
- **Link rapidi:** Cliccando sui loghi torni alle rispettive homepage

#### 2. Elenco Soci
Tabella principale con tutti i soci registrati.

**Colonne visualizzate:**
- **N°** - Numero progressivo
- **Socio** - Nome completo e data di nascita
- **Data iscrizione** - Data di registrazione
- **Stato pagamento** - Pagato/Non Pagato con icona colorata
- **Data pagamento mensile** - Data ultimo pagamento
- **Certificato medico** - Presente/Assente/Scaduto con icona
- **Scadenza certificato** - Data scadenza certificato
- **Azioni** - Pulsante modifica (icona ingranaggio)

#### 3. Dashboard di Monitoraggio
Sezione con KPI (Key Performance Indicators) divisi in tre colonne:

**Colonna Verde (OK):**
- Totale soci attivi
- Soci con pagamento in regola
- Certificati medici validi

**Colonna Gialla (Warning):**
- Certificati in scadenza (entro 30 giorni)

**Colonna Rossa (Critica):**
- Soci con pagamento non effettuato
- Certificati medici assenti
- Certificati medici scaduti

---

## 👥 Gestione Soci

### Inserimento Nuovo Socio

#### Passo 1: Accedi al Form
1. Dalla dashboard, clicca sul pulsante **"INSERISCI NUOVO SOCIO"** (in alto a destra)
2. Si aprirà il form di inserimento

#### Passo 2: Compila i Dati Anagrafici

**Sezione ANAGRAFICA SOCIO (colonna sinistra):**

1. **Nome** * (obbligatorio)
   - Inserisci il nome del socio
   - Solo lettere e spazi

2. **Cognome** * (obbligatorio)
   - Inserisci il cognome del socio

3. **Sesso** * (obbligatorio)
   - Seleziona: Maschio, Femmina, o Altro

4. **Data di nascita** * (obbligatorio)
   - Clicca sul campo e seleziona la data dal calendario
   - La data deve essere nel passato

5. **Luogo di nascita** * (obbligatorio)
   - Inserisci la città di nascita (es. "Bari")
   - Solo lettere e spazi

6. **Codice fiscale** * (obbligatorio)
   - Inserisci il codice fiscale (16 caratteri alfanumerici)
   - Viene automaticamente convertito in maiuscolo

7. **Indirizzo di residenza** * (obbligatorio)
   - Inserisci l'indirizzo completo
   - Minimo 5 caratteri

**Sezione CONTATTI GENITORE MINORE (opzionale):**

Se il socio è minorenne, compila:
- Nome genitore
- Cognome genitore
- Codice fiscale genitore (16 caratteri)
- Telefono genitore (formato: +39 123 456 7890)

#### Passo 3: Compila le Caratteristiche

**Sezione CARATTERISTICHE SOCIO (colonna destra):**

1. **Stato certificato medico** * (obbligatorio)
   - Seleziona una delle due opzioni:
     - ☑ Certificato medico valido
     - ☐ Certificato medico non valido

2. **Data scadenzamo 18

6. **Email** * (obbligatorio)
   - Inserisci un indirizzo email valido
   - Deve contenere @

7. **Corsi**
   - Seleziona uno o più corsi dalla lista
   - I corsi selezionati appaiono come "chip" sotto la lista
   - Clicca sulla X per rimuovere un corso

8. **Note aggiuntive** (opzionale)
   - Campo libero per annotazioni
   - Massimo 500 caratteri
   - Il contatore mostra i caratteri rimanenti

#### Passo 4: Salva il Socio

1. **Controlla i dati** inseriti
2. Clicca su **"SALVA"**
3. Se ci sono errori, verranno evidenziati in rosso
4. Se tutto è corretto, vedrai il messaggio: **"✓ Socio creato con successo!"**
5. Verrai reindirizzato alla dashboard

**Pulsante ANNULLA:**
- Clicca per tornare alla dashboard senza salvare

---

### Modifica Socio Esistente

#### Passo 1: Trova il Socio
1. Dalla dashboard, cerca il socio usando i filtri o la ricerca
2. Clicca sull'**icona ingranaggio** (⚙️) nella colonna "Azioni"

#### Passo 2: Modifica i Dati
1. Si aprirà il form con i dati precompilati
2. Modifica i campi necessari
3. Tutti i campi obbligatori devono rimanere compilati

#### Passo 3: Salva le Modifiche
1. Clicca su **"SALVA"**
2. Vedrai il messaggio: **"✓ Socio aggiornato con successo!"**
3. Verrai reindirizzato alla dashboard

---

### Eliminazione Socio

⚠️ **ATTENZIONE:** L'eliminazione è permanente e non può essere annullata!

#### Procedura
1. Apri il form di modifica del socio
2. Scorri fino in fondo alla pagina
3. Clicca sul pulsante **"ELIMINA SOCIO"** (rosso)
4. Conferma l'eliminazione
5. Il socio verrà rimosso dal database

---

## 🔍 Filtri e Ricerca

La dashboard offre potenti strumenti di filtro per trovare rapidamente i soci.

### Filtro per Corso

**Posizione:** In alto a sinistra, sopra la tabella

**Come usarlo:**
1. Clicca sul menu a tendina **"FILTRA PER CORSO"**
2. Si apre una lista con tutti i corsi disponibili
3. Seleziona uno o più corsi (checkbox)
4. Il filtro si applica automaticamente
5. Il menu mostra: "X CORSI SELEZIONATI"

**Per rimuovere il filtro:**
- Clicca su **"Cancella tutto"** in fondo al menu
- Oppure deseleziona manualmente i corsi

**Corsi disponibili:**
- DogHouse: Boxing, Functional Training, Kids Boxing, etc.
- Tempio: Krav Maga, Fit Postural, Budo Taijutsu, Music Fit, etc.

---

### Filtro per Stato Certificato

**Posizione:** Prima riga filtri, primo campo

**Opzioni disponibili:**
- **PRESENTE** - Mostra solo soci con certificato valido
- **MANCANTE** - Mostra solo soci senza certificato
- **IN SCADENZA** - Mostra certificati in scadenza entro 30 giorni

**Come usarlo:**
1. Clicca sul menu a tendina
2. Seleziona lo stato desiderato
3. La tabella si aggiorna automaticamente

**Per rimuovere il filtro:**
- Seleziona "FILTRA PER STATO CERTIFICATO" (opzione predefinita)

---

### Filtro per Data Iscrizione

**Posizione:** Prima riga filtri, secondo campo

**Come usarlo:**
1. Clicca sul campo **"Filtra per data di iscrizione"**
2. Si apre il calendario
3. Seleziona una data
4. Vengono mostrati solo i soci iscritti in quella data

**Formato data visualizzato:** GG/MM/AAAA (es. 15/01/2025)

**Per rimuovere il filtro:**
- Clicca sulla **X** a destra del campo
- La data viene cancellata e il filtro rimosso

---

### Ricerca per Nome

**Posizione:** Prima riga filtri, terzo campo (con icona lente)

**Come usarlo:**
1. Clicca nel campo di ricerca
2. Digita il nome, cognome, email o telefono del socio
3. La ricerca è **in tempo reale** (si aggiorna mentre digiti)
4. Non serve premere Invio

**Cosa puoi cercare:**
- Nome del socio
- Cognome del socio
- Email
- Numero di telefono

**Per cancellare la ricerca:**
- Cancella il testo dal campo
- La tabella torna a mostrare tutti i soci

---

### Combinazione Filtri

**Puoi combinare più filtri contemporaneamente!**

**Esempio:**
- Filtra per corso: "Krav Maga"
- Filtra per certificato: "IN SCADENZA"
- Ricerca: "Mario"

Risultato: Mostra solo i soci di nome Mario, iscritti a Krav Maga, con certificato in scadenza.

---

### Pulsante "Inserisci Nuovo Socio"

**Posizione:** Prima riga filtri, ultimo elemento (pulsante nero)

**Icona:** Simbolo utente con +

**Funzione:** Apre il form per inserire un nuovo socio

---

## 📈 Dashboard di Monitoraggio

La dashboard di monitoraggio fornisce statistiche in tempo reale sui soci.

### Posizione
Sotto la tabella soci, nella sezione **"DASHBOARD DI MONITORAGGIO DEI SOCI"**

---

### Selezione Periodo

**Filtri disponibili:**
1. **Mese** - Seleziona il mese (GENNAIO, FEBBRAIO, etc.)
2. **Anno** - Seleziona l'anno (2000-2100)

**Funzionamento:**
- Le statistiche si aggiornano in base al periodo selezionato
- Mostra i pagamenti per il mese/anno scelto
- I certificati vengono sempre mostrati indipendentemente dal periodo

**Periodo predefinito:**
- Mese corrente
- Anno corrente

---

### KPI (Key Performance Indicators)

Le statistiche sono divise in **3 colonne** con icone colorate:

#### 🟢 Colonna Verde (Situazione OK)

**Icona:** Cerchio verde con spunta

**Metriche visualizzate:**

1. **Totale soci attivi**
   - Numero totale di soci con stato ATTIVO
   - Include tutti i soci registrati e attivi

2. **Soci con pagamento in regola**
   - Soci che hanno pagato la quota del mese/anno selezionato
   - Calcolato in base ai filtri mese/anno

3. **Certificati medici validi**
   - Soci con certificato presente e non scaduto
   - Data scadenza > data odierna

**Esempio:**
```
✓ Totale soci attivi: 45
✓ Soci con pagamento in regola: 38
✓ Certificati medici validi: 40
```

---

#### 🟡 Colonna Gialla (Attenzione)

**Icona:** Triangolo giallo con punto esclamativo

**Metriche visualizzate:**

1. **Certificati in scadenza**
   - Certificati che scadono entro 30 giorni
   - Calcolo: Data scadenza - Data odierna ≤ 30 giorni

**Esempio:**
```
⚠ Certificati in scadenza: 5
```

**Azione consigliata:**
- Contatta i soci per rinnovare il certificato
- Verifica le date di scadenza nella tabella

---

#### 🔴 Colonna Rossa (Critica)

**Icona:** Cerchio rosso con X

**Metriche visualizzate:**

1. **Soci con pagamento non effettuato**
   - Soci che NON hanno pagato la quota del mese/anno selezionato
   - Calcolato in base ai filtri mese/anno

2. **Certificati medici assenti**
   - Soci senza certificato medico
   - Stato certificato = "non valido" e data scadenza vuota

3. **Certificati medici scaduti**
   - Certificati con data scadenza < data odierna
   - Richiedono rinnovo immediato

**Esempio:**
```
✗ Soci con pagamento non effettuato: 7
✗ Certificati medici assenti: 3
✗ Certificati medici scaduti: 2
```

**Azioni consigliate:**
- Contatta i soci per sollecitare il pagamento
- Richiedi i certificati medici mancanti
- Blocca l'accesso ai soci con certificato scaduto

---

### Interpretazione dei Dati

#### Scenario Ideale
```
🟢 Totale soci attivi: 50
🟢 Pagamenti in regola: 50
🟢 Certificati validi: 50
🟡 Certificati in scadenza: 0
🔴 Pagamenti non effettuati: 0
🔴 Certificati assenti: 0
🔴 Certificati scaduti: 0
```

#### Scenario con Problemi
```
🟢 Totale soci attivi: 50
🟢 Pagamenti in regola: 35
🟢 Certificati validi: 40
🟡 Certificati in scadenza: 5
🔴 Pagamenti non effettuati: 15
🔴 Certificati assenti: 3
🔴 Certificati scaduti: 2
```

**Azioni da intraprendere:**
1. Contatta i 15 soci con pagamento non effettuato
2. Sollecita i 5 soci con certificato in scadenza
3. Richiedi certificati ai 3 soci senza
4. Blocca i 2 soci con certificato scaduto

---

### Aggiornamento Dati

**Le statistiche si aggiornano automaticamente quando:**
- Cambi il mese o l'anno
- Applichi filtri nella tabella
- Inserisci, modifichi o elimini un socio
- Ricarichi la pagina

**Tempo di aggiornamento:** Istantaneo

---

## 📄 Paginazione e Visualizzazione

### Elementi per Pagina

**Posizione:** In basso a sinistra della tabella

**Opzioni disponibili:**
- 10 Elementi
- 25 Elementi
- 50 Elementi

**Come usarlo:**
1. Clicca sul menu a tendina
2. Seleziona il numero di elementi da visualizzare
3. La tabella si aggiorna automaticamente

**Consiglio:**
- Usa 10 elementi per navigazione veloce
- Usa 50 elementi per avere una visione d'insieme

---

### Contatore Risultati

**Posizione:** In basso a sinistra, sotto il menu elementi

**Formato:** "Mostrati X-Y su Z risultati"

**Esempio:**
```
Mostrati 1-10 su 45 risultati
```

**Significato:**
- Stai visualizzando i soci dal numero 1 al 10
- Ci sono 45 soci totali che corrispondono ai filtri applicati

---

### Navigazione Pagine

**Posizione:** In basso a destra della tabella

**Controlli disponibili:**

1. **Freccia sinistra (‹)**
   - Vai alla pagina precedente
   - Disabilitata se sei alla prima pagina

2. **Numeri pagina**
   - Clicca su un numero per andare a quella pagina
   - La pagina corrente è evidenziata in grigio scuro

3. **Puntini (...)**
   - Indicano pagine nascoste
   - Appaiono quando ci sono molte pagine

4. **Freccia destra (›)**
   - Vai alla pagina successiva
   - Disabilitata se sei all'ultima pagina

**Esempio navigazione:**
```
‹  1  2  3  ...  10  ›
```

**Pagine visualizzate:**
- Prima pagina (1)
- Pagina corrente e adiacenti
- Ultima pagina
- Puntini per le pagine intermedie

---

## 🎨 Icone e Indicatori Visivi

### Icone Stato Pagamento

**🟢 Cerchio Verde con Spunta**
- Significato: Pagamento effettuato
- Testo: "PAGATO"

**🔴 Cerchio Rosso con X**
- Significato: Pagamento non effettuato
- Testo: "NON PAGATO"

---

### Icone Certificato Medico

**🟢 Cerchio Verde con Spunta**
- Significato: Certificato presente e valido
- Testo: "PRESENTE"

**🟡 Triangolo Giallo con !**
- Significato: Certificato in scadenza (entro 30 giorni)
- Testo: "IN SCADENZA"

**🔴 Cerchio Rosso con X**
- Significato: Certificato assente o scaduto
- Testo: "MANCANTE" o "SCADUTO"

---

### Pulsanti Azione

**⚙️ Icona Ingranaggio**
- Funzione: Modifica socio
- Posizione: Ultima colonna della tabella
- Colore: Nero
- Hover: Diventa più chiaro

---

## 📱 Utilizzo su Mobile e Tablet

### Tablet (768px - 1024px)

**Adattamenti:**
- Tabella con scroll orizzontale
- Filtri disposti in colonna
- KPI dashboard in colonna singola
- Pulsanti touch-friendly (44px minimo)

**Come usare:**
- Scorri la tabella orizzontalmente con il dito
- Tutti i filtri sono accessibili
- La navigazione rimane fluida

---

### Mobile (< 768px)

**Adattamenti:**
- Tabella con scroll orizzontale obbligatorio
- Larghezza minima tabella: 800px
- Filtri in colonna singola
- KPI in colonna singola
- Paginazione centrata e wrappata

**Consigli per l'uso:**
- Ruota il dispositivo in orizzontale per vedere più colonne
- Usa lo zoom per leggere meglio i dettagli
- I filtri sono più facili da usare in verticale

---

## ❗ Validazioni e Messaggi di Errore

### Campi Obbligatori

I campi contrassegnati con **asterisco rosso (*)** sono obbligatori.

**Se provi a salvare senza compilarli:**
- Il campo viene evidenziato in rosso
- Appare un messaggio di errore sotto il campo
- La pagina scrolla automaticamente al primo errore
- Il salvataggio viene bloccato

---

### Errori Comuni e Soluzioni

#### 1. "Il nome è obbligatorio"
**Causa:** Campo nome vuoto  
**Soluzione:** Inserisci il nome del socio

#### 2. "La data di nascita deve essere nel passato"
**Causa:** Data di nascita futura o odierna  
**Soluzione:** Seleziona una data passata

#### 3. "Codice fiscale non valido (16 caratteri alfanumerici)"
**Causa:** Codice fiscale con meno/più di 16 caratteri o caratteri non validi  
**Soluzione:** Inserisci esattamente 16 caratteri (lettere e numeri)

#### 4. "Numero di telefono non valido"
**Causa:** Formato telefono errato  
**Soluzione:** Usa formato +39 123 456 7890 (minimo 6 cifre)

#### 5. "Email non valida"
**Causa:** Email senza @ o formato errato  
**Soluzione:** Inserisci email valida (es. nome@dominio.it)

#### 6. "Inserisci la data di scadenza del certificato"
**Causa:** Certificato valido selezionato ma data scadenza vuota  
**Soluzione:** Seleziona la data di scadenza dal calendario

#### 7. "Luogo di nascita non valido (solo lettere e spazi)"
**Causa:** Numeri o caratteri speciali nel luogo di nascita  
**Soluzione:** Usa solo lettere (es. "Bari", non "Bari123")

#### 8. "Indirizzo troppo corto (minimo 5 caratteri)"
**Causa:** Indirizzo con meno di 5 caratteri  
**Soluzione:** Inserisci indirizzo completo (es. "Via Roma 10")

---

### Messaggi di Successo

#### "✓ Socio creato con successo!"
- **Quando appare:** Dopo aver salvato un nuovo socio
- **Durata:** 5 secondi (poi scompare automaticamente)
- **Colore:** Verde
- **Posizione:** In alto nella dashboard

#### "✓ Socio aggiornato con successo!"
- **Quando appare:** Dopo aver modificato un socio esistente
- **Durata:** 5 secondi
- **Colore:** Verde
- **Posizione:** In alto nella dashboard

---

## 🔧 Risoluzione Problemi

### Problema: Non riesco ad accedere

**Possibili cause e soluzioni:**

1. **Credenziali errate**
   - Verifica email e password
   - Controlla che Caps Lock sia disattivato
   - Prova a copiare/incollare le credenziali

2. **Account non autorizzato**
   - Contatta l'amministratore per verificare i permessi
   - Email: webteamsolutionswork@gmail.com

3. **Problemi di connessione**
   - Verifica la connessione internet
   - Prova a ricaricare la pagina (F5)
   - Svuota la cache del browser

---

### Problema: La tabella non si carica

**Soluzioni:**

1. **Ricarica la pagina**
   - Premi F5 o Ctrl+R (Cmd+R su Mac)

2. **Controlla i filtri**
   - Rimuovi tutti i filtri applicati
   - Cancella il testo di ricerca

3. **Verifica la connessione**
   - Controlla che internet funzioni
   - Prova ad aprire altri siti

4. **Svuota la cache**
   - Chrome: Ctrl+Shift+Canc
   - Firefox: Ctrl+Shift+Canc
   - Safari: Cmd+Option+E

---

### Problema: I dati non si salvano

**Soluzioni:**

1. **Controlla gli errori**
   - Leggi i messaggi di errore in rosso
   - Correggi tutti i campi evidenziati

2. **Verifica i campi obbligatori**
   - Tutti i campi con * devono essere compilati

3. **Controlla il formato dei dati**
   - Codice fiscale: 16 caratteri
   - Telefono: formato +39 123 456 7890
   - Email: deve contenere @

4. **Riprova dopo qualche secondo**
   - Potrebbe essere un problema temporaneo di rete

---

### Problema: Le statistiche non si aggiornano

**Soluzioni:**

1. **Ricarica la pagina**
   - Le statistiche si aggiornano automaticamente
   - Se non funziona, ricarica con F5

2. **Verifica i filtri mese/anno**
   - Le statistiche dipendono dal periodo selezionato
   - Prova a cambiare mese/anno

3. **Controlla lo stato dei soci**
   - Solo i soci ATTIVI vengono conteggiati
   - Verifica che i soci abbiano stato corretto

---

### Problema: La pagina è lenta

**Soluzioni:**

1. **Riduci il numero di elementi visualizzati**
   - Usa 10 elementi invece di 50

2. **Applica filtri**
   - Filtra per corso o certificato
   - Riduci il numero di risultati

3. **Chiudi altre schede del browser**
   - Libera memoria RAM

4. **Aggiorna il browser**
   - Usa l'ultima versione di Chrome, Firefox o Safari

---

### Problema: Non vedo il pulsante "Salva"

**Soluzioni:**

1. **Scorri in basso**
   - Il pulsante è in fondo al form

2. **Zoom del browser**
   - Riduci lo zoom (Ctrl+0 o Cmd+0)

3. **Risoluzione schermo**
   - Usa risoluzione minima 1024x768

---

## 📞 Supporto Tecnico

### Contatti

**Email Supporto:**
- webteamsolutionswork@gmail.com
- dangelodavide.work@gmail.com

**Orari:**
- Lunedì - Venerdì: 9:00 - 18:00
- Sabato: 9:00 - 13:00
- Domenica: Chiuso

**Tempo di risposta:**
- Problemi critici: Entro 2 ore
- Problemi non critici: Entro 24 ore

---

### Informazioni da Fornire

Quando contatti il supporto, fornisci:

1. **Descrizione del problema**
   - Cosa stavi facendo
   - Cosa è successo
   - Cosa ti aspettavi

2. **Screenshot**
   - Cattura schermo dell'errore
   - Includi l'intera pagina

3. **Browser e dispositivo**
   - Nome browser (Chrome, Firefox, Safari)
   - Versione browser
   - Sistema operativo (Windows, Mac, iOS, Android)

4. **Passaggi per riprodurre**
   - Elenca i passaggi esatti che hai fatto

---

## 📚 Best Practices

### Gestione Quotidiana

**Mattina:**
1. Controlla la dashboard KPI
2. Verifica certificati in scadenza
3. Sollecita pagamenti non effettuati

**Durante il giorno:**
1. Inserisci nuovi soci appena si iscrivono
2. Aggiorna pagamenti ricevuti
3. Registra nuovi certificati medici

**Sera:**
1. Verifica che tutti i dati siano aggiornati
2. Controlla le statistiche del giorno
3. Pianifica azioni per il giorno successivo

---

### Sicurezza

**Password:**
- Non condividere mai le credenziali
- Usa password complessa (minimo 12 caratteri)
- Cambia password ogni 3 mesi

**Logout:**
- Esci sempre dopo l'uso
- Non lasciare il browser aperto incustodito

**Dati sensibili:**
- Non condividere dati dei soci
- Rispetta la privacy GDPR
- Non fare screenshot con dati personali

---

### Manutenzione Dati

**Settimanale:**
- Verifica soci con certificati in scadenza
- Controlla pagamenti non effettuati
- Aggiorna note soci se necessario

**Mensile:**
- Aggiorna stato pagamenti per il nuovo mese
- Verifica soci non attivi
- Pulisci note obsolete

**Annuale:**
- Archivia soci non più attivi
- Verifica correttezza dati anagrafici
- Aggiorna corsi disponibili

---

## 🎓 Glossario

**Socio:** Persona iscritta alla palestra

**KPI:** Key Performance Indicator - Indicatore di performance

**Dashboard:** Pannello di controllo con statistiche

**Certificato medico:** Documento obbligatorio per praticare sport

**Quota mensile:** Pagamento mensile per l'iscrizione

**Stato attivo:** Socio che frequenta attualmente la palestra

**Paginazione:** Suddivisione dei risultati in più pagine

**Filtro:** Strumento per visualizzare solo alcuni soci

**CRUD:** Create, Read, Update, Delete - Operazioni base

---

## 📖 Versione Manuale

**Versione:** 1.0.0  
**Data:** Gennaio 2025  
**Autore:** Dev Team Solutions

**Aggiornamenti:**
- v1.0.0 (Gennaio 2025) - Prima versione

---

**Fine del Manuale**

Per ulteriori informazioni o supporto, contatta:  
📧 webteamsolutionswork@gmail.com
