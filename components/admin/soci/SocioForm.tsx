'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './socioForm.module.css';
import { supabase } from '@/lib/supabase/client';

export type CourseOption = {
  code: string;
  title: string;
  kind: string | null;
};

export type Socio = {
  id?: string;

  nome: string;
  cognome: string;
  sesso: '' | 'M' | 'F' | 'ALTRO';

  dataNascita: string;
  luogoNascita: string;
  codiceFiscale: string;
  indirizzo: string;

  genitoreNome: string;
  genitoreCognome: string;
  genitoreCodiceFiscale: string;
  genitoreTelefono: string;

  certificatoValido: boolean;
  certificatoScadenza: string;

  quotaMese: string;
  quotaAnno: string;
  mensilePagato: boolean;

  telefono: string;
  email: string;

  corso: string;    
  corsi: string[]; 

  note: string;
  status: boolean;
};

const MONTHS = [
  'GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO',
  'LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE',
] as const;

function getCurrentMonthLabel() {
  return MONTHS[new Date().getMonth()];
}

const PHONE_RE = /^[+]?[\d\s-]{6,18}$/;
const CF_RE = /^[A-Z0-9]{16}$/;
const PLACE_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\s.-]{2,60}$/;

function normalizeEmail(v: string) {
  return (v ?? '').trim().toLowerCase();
}
function normalizePhone(v: string) {
  return (v ?? '').trim();
}
function normalizeCF(v: string) {
  return (v ?? '').trim().toUpperCase();
}
function normalizeText(v: string) {
  return (v ?? '').trim();
}
function normalizeCourses(arr: unknown): string[] {
  const list = Array.isArray(arr) ? arr : [];
  const cleaned = list.map((x) => String(x ?? '').trim()).filter(Boolean);
  return Array.from(new Set(cleaned));
}

const emptySocio: Socio = {
  nome: '',
  cognome: '',
  sesso: '',

  dataNascita: '',
  luogoNascita: '',
  codiceFiscale: '',
  indirizzo: '',

  genitoreNome: '',
  genitoreCognome: '',
  genitoreCodiceFiscale: '',
  genitoreTelefono: '',

  certificatoValido: false,
  certificatoScadenza: '',

  quotaMese: getCurrentMonthLabel(),
  quotaAnno: String(new Date().getFullYear()),
  mensilePagato: false,

  telefono: '',
  email: '',

  corso: '',
  corsi: [],

  note: '',
  status: true,
};

type Props = {
  mode: 'create' | 'edit';
  initialData?: Partial<Socio>;
  onSubmit?: (data: Socio) => Promise<void> | void;
  backHref?: string;
};

export default function SocioForm({ mode, initialData, onSubmit, backHref = '/admin/dashboard' }: Props) {
  const router = useRouter();

  const initial = useMemo(() => {
    const merged: Socio = { ...emptySocio, ...(initialData ?? {}) } as Socio;

    const hasArray = Array.isArray(merged.corsi) && merged.corsi.length > 0;
    const legacy = String(merged.corso ?? '').trim();

    if (!hasArray && legacy) merged.corsi = [legacy];
    merged.corsi = normalizeCourses(merged.corsi);

    return merged;
  }, [initialData]);

  const [form, setForm] = useState<Socio>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  useEffect(() => setForm(initial), [initial]);

  const set = <K extends keyof Socio>(key: K, value: Socio[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const years = useMemo(() => {
    const list: string[] = [];
    for (let y = 2000; y <= 2100; y++) list.push(String(y));
    return list;
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setCoursesLoading(true);
      setCoursesError(null);

      try {
        const { data, error } = await supabase
          .from('corsi')
          .select('code,title,kind')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
          .order('title', { ascending: true });

        if (error) throw error;

        if (!cancelled) setCourses((data ?? []) as CourseOption[]);
      } catch (e: any) {
        if (!cancelled) setCoursesError(e?.message ?? 'Errore caricamento corsi');
      } finally {
        if (!cancelled) setCoursesLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCourseTitles = useMemo(() => {
    const picked = Array.isArray(form.corsi) ? form.corsi : [];
    if (!picked.length) return [];
    const map = new Map(courses.map((c) => [c.code, c.title]));
    return picked.map((code) => map.get(code) ?? code);
  }, [form.corsi, courses]);

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setSaving(true);
      setError(null);
      setFieldErrors({});

      const errors: Record<string, string> = {};

      try {
        const next: Socio = {
          ...form,
          nome: normalizeText(form.nome),
          cognome: normalizeText(form.cognome),
          luogoNascita: normalizeText(form.luogoNascita),
          indirizzo: normalizeText(form.indirizzo),
          email: normalizeEmail(form.email),
          telefono: normalizePhone(form.telefono),
          codiceFiscale: normalizeCF(form.codiceFiscale),

          genitoreNome: normalizeText(form.genitoreNome),
          genitoreCognome: normalizeText(form.genitoreCognome),
          genitoreCodiceFiscale: normalizeCF(form.genitoreCodiceFiscale),
          genitoreTelefono: normalizePhone(form.genitoreTelefono),

          corsi: normalizeCourses(form.corsi),
          corso: '',
        };

        if (!next.nome) errors.nome = 'Il nome è obbligatorio.';
        if (!next.cognome) errors.cognome = 'Il cognome è obbligatorio.';
        if (!next.sesso) errors.sesso = 'Il sesso è obbligatorio.';
        
        if (!next.dataNascita) {
          errors.dataNascita = 'La data di nascita è obbligatoria.';
        } else {
          const birthDate = new Date(next.dataNascita);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (birthDate >= today) {
            errors.dataNascita = 'La data di nascita deve essere nel passato.';
          }
        }

        if (!next.luogoNascita) {
          errors.luogoNascita = 'Il luogo di nascita è obbligatorio.';
        } else if (!PLACE_RE.test(next.luogoNascita)) {
          errors.luogoNascita = 'Luogo di nascita non valido (solo lettere e spazi).';
        }

        if (!next.codiceFiscale) {
          errors.codiceFiscale = 'Il codice fiscale è obbligatorio.';
        } else if (!CF_RE.test(next.codiceFiscale)) {
          errors.codiceFiscale = 'Codice fiscale non valido (16 caratteri alfanumerici).';
        }

        if (!next.indirizzo) {
          errors.indirizzo = "L'indirizzo di residenza è obbligatorio.";
        } else if (next.indirizzo.length < 5) {
          errors.indirizzo = 'Indirizzo troppo corto (minimo 5 caratteri).';
        }

        if (!next.telefono) {
          errors.telefono = 'Il numero di telefono è obbligatorio.';
        } else if (!PHONE_RE.test(next.telefono)) {
          errors.telefono = 'Numero di telefono non valido.';
        }

        if (!next.email) {
          errors.email = "L'email è obbligatoria.";
        } else if (!next.email.includes('@')) {
          errors.email = 'Email non valida.';
        }

        if (next.certificatoValido && !next.certificatoScadenza) {
          errors.certificatoScadenza = 'Inserisci la data di scadenza del certificato.';
        } else {
          next.certificatoScadenza = next.certificatoScadenza || '';
        }

        if (next.genitoreTelefono && !PHONE_RE.test(next.genitoreTelefono)) {
          errors.genitoreTelefono = 'Telefono genitore non valido.';
        }
        if (next.genitoreCodiceFiscale && !CF_RE.test(next.genitoreCodiceFiscale)) {
          errors.genitoreCodiceFiscale = 'Codice fiscale genitore non valido (16 caratteri).';
        }

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setError('Correggi gli errori evidenziati prima di salvare.');
          setSaving(false);
          // Scroll to first error
          setTimeout(() => {
            const firstErrorField = document.querySelector(`.${styles.hasError}`);
            if (firstErrorField) {
              firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          return;
        }

        await onSubmit?.(next);
        router.push(`${backHref}?success=${mode === 'create' ? 'created' : 'updated'}`);
      } catch (err: any) {
        setError(err?.message ?? 'Errore durante il salvataggio.');
        setSaving(false);
      }
    }


  return (
    <div className={styles.wrap}>
      <h2 className={styles.pageTitle}>
        {mode === 'create' ? 'Inserisci nuovo socio' : 'Dettaglio socio'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formBox}>
          <div className={styles.grid}>
            <section className={styles.col}>
              <h3 className={styles.sectionTitle}>ANAGRAFICA SOCIO</h3>

              <label className={styles.field}>
                <span>Indica il nome del socio <span className={styles.req}>*</span></span>
                <input 
                  className={`${styles.input} ${fieldErrors.nome ? styles.hasError : ''}`}
                  value={form.nome} 
                  onChange={(e) => set('nome', e.target.value)} 
                  required 
                />
                {fieldErrors.nome && <span className={styles.fieldError}>{fieldErrors.nome}</span>}
              </label>

              <label className={styles.field}>
                <span>Indica il cognome del socio <span className={styles.req}>*</span></span>
                <input 
                  className={`${styles.input} ${fieldErrors.cognome ? styles.hasError : ''}`}
                  value={form.cognome} 
                  onChange={(e) => set('cognome', e.target.value)} 
                  required 
                />
                {fieldErrors.cognome && <span className={styles.fieldError}>{fieldErrors.cognome}</span>}
              </label>

              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Seleziona il sesso del socio <span className={styles.req}>*</span></span>
                  <select 
                    className={`${styles.select} ${fieldErrors.sesso ? styles.hasError : ''}`}
                    value={form.sesso} 
                    onChange={(e) => set('sesso', e.target.value as Socio['sesso'])} 
                    required
                  >
                    <option value="">Seleziona sesso</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                    <option value="ALTRO">Altro</option>
                  </select>
                  {fieldErrors.sesso && <span className={styles.fieldError}>{fieldErrors.sesso}</span>}
                </label>

                <label className={styles.field}>
                  <span>Seleziona la data di nascita del socio <span className={styles.req}>*</span></span>
                  <input 
                    className={`${styles.input} ${fieldErrors.dataNascita ? styles.hasError : ''}`}
                    type="date" 
                    value={form.dataNascita} 
                    onChange={(e) => set('dataNascita', e.target.value)} 
                    max={new Date().toISOString().split('T')[0]}
                    required 
                  />
                  {fieldErrors.dataNascita && <span className={styles.fieldError}>{fieldErrors.dataNascita}</span>}
                </label>
              </div>

              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Indica il luogo di nascita del socio <span className={styles.req}>*</span></span>
                  <input
                    className={`${styles.input} ${fieldErrors.luogoNascita ? styles.hasError : ''}`}
                    type="text"
                    value={form.luogoNascita}
                    onChange={(e) => set('luogoNascita', e.target.value)}
                    required
                    placeholder="Es. Bari"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ'’\s.-]{2,60}"
                    title="Inserisci un luogo valido (solo lettere e spazi)."
                  />
                  {fieldErrors.luogoNascita && <span className={styles.fieldError}>{fieldErrors.luogoNascita}</span>}
                </label>

                <label className={styles.field}>
                  <span>Indica il codice fiscale del socio <span className={styles.req}>*</span></span>
                  <input
                    className={`${styles.input} ${fieldErrors.codiceFiscale ? styles.hasError : ''}`}
                    value={form.codiceFiscale}
                    onChange={(e) => set('codiceFiscale', e.target.value.toUpperCase())}
                    required
                    maxLength={16}
                    minLength={16}
                    pattern="[A-Za-z0-9]{16}"
                    title="Inserisci un codice fiscale valido (16 caratteri alfanumerici)."
                  />
                  {fieldErrors.codiceFiscale && <span className={styles.fieldError}>{fieldErrors.codiceFiscale}</span>}
                </label>
              </div>

              <label className={styles.field}>
                <span>Indica l’indirizzo di residenza del socio <span className={styles.req}>*</span></span>
                <input 
                  className={`${styles.input} ${fieldErrors.indirizzo ? styles.hasError : ''}`}
                  value={form.indirizzo} 
                  onChange={(e) => set('indirizzo', e.target.value)} 
                  required 
                  minLength={5} 
                />
                {fieldErrors.indirizzo && <span className={styles.fieldError}>{fieldErrors.indirizzo}</span>}
              </label>

              <h3 className={`${styles.sectionTitle} ${styles.sectionSpacer}`}>CONTATTI GENITORE MINORE</h3>

              <label className={styles.field}>
                <span>Indica il nome del genitore del socio</span>
                <input className={styles.input} value={form.genitoreNome} onChange={(e) => set('genitoreNome', e.target.value)} />
              </label>

              <label className={styles.field}>
                <span>Indica il cognome del genitore del socio</span>
                <input className={styles.input} value={form.genitoreCognome} onChange={(e) => set('genitoreCognome', e.target.value)} />
              </label>

              <label className={styles.field}>
                <span>Indica il codice fiscale del genitore del socio</span>
                <input
                  className={`${styles.input} ${fieldErrors.genitoreCodiceFiscale ? styles.hasError : ''}`}
                  value={form.genitoreCodiceFiscale}
                  onChange={(e) => set('genitoreCodiceFiscale', e.target.value.toUpperCase())}
                  maxLength={16}
                  pattern="[A-Za-z0-9]{16}"
                />
                {fieldErrors.genitoreCodiceFiscale && <span className={styles.fieldError}>{fieldErrors.genitoreCodiceFiscale}</span>}
              </label>

              <label className={styles.field}>
                <span>Inserisci il numero di telefono del genitore del socio</span>
                <input
                  className={`${styles.input} ${fieldErrors.genitoreTelefono ? styles.hasError : ''}`}
                  value={form.genitoreTelefono}
                  onChange={(e) => set('genitoreTelefono', e.target.value)}
                  maxLength={18}
                  inputMode="tel"
                  pattern="[+]?[\d\s-]{6,18}"
                />
                {fieldErrors.genitoreTelefono && <span className={styles.fieldError}>{fieldErrors.genitoreTelefono}</span>}
              </label>
            </section>

            <section className={styles.col}>
              <h3 className={styles.sectionTitle}>CARATTERISTICHE SOCIO</h3>

              <div className={styles.field}>
                <span>Indica lo stato del certificato medico <span className={styles.req}>*</span></span>

                <div className={styles.inlineChecks}>
                  <label className={styles.check}>
                    <input type="checkbox" checked={form.certificatoValido} onChange={() => set('certificatoValido', true)} />
                    <span>Certificato medico valido</span>
                  </label>

                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      checked={!form.certificatoValido}
                      onChange={() => {
                        set('certificatoValido', false);
                        set('certificatoScadenza', '');
                      }}
                    />
                    <span>Certificato medico non valido</span>
                  </label>
                </div>
              </div>

              <label className={styles.field}>
                <span>Indica la data di scadenza del certificato {form.certificatoValido ? <span className={styles.req}>*</span> : null}</span>
                <input
                  className={`${styles.input} ${fieldErrors.certificatoScadenza ? styles.hasError : ''}`}
                  type="date"
                  value={form.certificatoScadenza}
                  onChange={(e) => set('certificatoScadenza', e.target.value)}
                  required={form.certificatoValido}
                />
                {fieldErrors.certificatoScadenza && <span className={styles.fieldError}>{fieldErrors.certificatoScadenza}</span>}
              </label>

              <label className={styles.field}>
                <span>Stato socio <span className={styles.req}>*</span></span>
                <select className={styles.select} value={form.status ? 'true' : 'false'} onChange={(e) => set('status', e.target.value === 'true')} required>
                  <option value="true">ATTIVO</option>
                  <option value="false">NON ATTIVO</option>
                </select>
              </label>

              <div className={styles.field}>
                <span>Indica lo stato del pagamento della quota mensile</span>

                <div className={styles.rowMonthYear}>
                  <select className={styles.select} value={form.quotaMese} onChange={(e) => set('quotaMese', e.target.value)}>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select className={styles.select} value={form.quotaAnno} onChange={(e) => set('quotaAnno', e.target.value)}>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.inlineChecks}>
                  <label className={styles.check}>
                    <input type="checkbox" checked={form.mensilePagato} onChange={() => set('mensilePagato', true)} />
                    <span>Mensile pagato</span>
                  </label>
                  <label className={styles.check}>
                    <input type="checkbox" checked={!form.mensilePagato} onChange={() => set('mensilePagato', false)} />
                    <span>Mensile da pagare</span>
                  </label>
                </div>
              </div>

              <label className={styles.field}>
                <span>Inserisci il numero di telefono del socio <span className={styles.req}>*</span></span>
                <input
                  className={`${styles.input} ${fieldErrors.telefono ? styles.hasError : ''}`}
                  value={form.telefono}
                  onChange={(e) => set('telefono', e.target.value)}
                  required
                  maxLength={18}
                  inputMode="tel"
                  pattern="[+]?[\d\s-]{6,18}"
                />
                {fieldErrors.telefono && <span className={styles.fieldError}>{fieldErrors.telefono}</span>}
              </label>

              <label className={styles.field}>
                <span>Indica l’indirizzo email del socio <span className={styles.req}>*</span></span>
                <input 
                  className={`${styles.input} ${fieldErrors.email ? styles.hasError : ''}`}
                  type="email" 
                  value={form.email} 
                  onChange={(e) => set('email', e.target.value)} 
                  required 
                />
                {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
              </label>

            <label className={styles.field}>
            <span>Seleziona il/i corso/i al quale desideri iscrivere il socio</span>

            {coursesLoading ? (
              <div className={styles.meta} style={{ fontWeight: 700 }}>
                Caricamento corsi...
              </div>
            ) : coursesError ? (
              <div className={styles.meta} style={{ color: '#c20000', fontWeight: 700 }}>
                {coursesError}
              </div>
            ) : (
              <>
                <div className={styles.courseBox} role="group" aria-label="Selezione corsi">
                  {(courses || []).map((c) => {
                    const checked = Array.isArray(form.corsi) && form.corsi.includes(c.code);

                    return (
                      <label key={c.code} className={styles.courseItem}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const prev = Array.isArray(form.corsi) ? form.corsi : [];
                            const next = e.target.checked
                              ? Array.from(new Set([...prev, c.code]))
                              : prev.filter((x) => x !== c.code);
                            set('corsi', next);
                          }}
                        />
                        <span className={styles.courseTitle}>{c.title}</span>
                      </label>
                    );
                  })}
                </div>

                {Array.isArray(form.corsi) && form.corsi.length > 0 && (
                  <div className={styles.selectedWrap} aria-live="polite">
                    <div className={styles.meta} style={{ marginBottom: 6 }}>
                      Selezionati:
                    </div>

                    <div className={styles.chips}>
                      {form.corsi.map((code) => {
                        const title =
                          (courses || []).find((x) => x.code === code)?.title ?? code;

                        return (
                          <button
                            key={code}
                            type="button"
                            className={styles.chipBtn}
                            onClick={() => set('corsi', form.corsi.filter((x) => x !== code))}
                            aria-label={`Rimuovi ${title}`}
                            title="Clicca per rimuovere"
                          >
                            {title} <span className={styles.chipX}>×</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </label>
              <label className={styles.field}>
                <span>Note aggiuntive</span>
                <textarea className={styles.textarea} value={form.note} onChange={(e) => set('note', e.target.value)} maxLength={500} />
                <div className={styles.counter}>{form.note.length}/500</div>
              </label>
            </section>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 10, fontSize: 12, color: '#c20000', fontWeight: 700 }}>
            {error}
          </div>
        )}

        <div className={styles.actionsOutside}>
          <button type="button" className={styles.cancel} disabled={saving} onClick={() => router.push(backHref)}>
            ANNULLA
          </button>

          <button type="submit" className={styles.save} disabled={saving}>
            {saving ? 'SALVATAGGIO...' : 'SALVA'}
          </button>
        </div>
      </form>
    </div>
  );
}
