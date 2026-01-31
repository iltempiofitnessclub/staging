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

      if (!next.nome) throw new Error('Il nome è obbligatorio.');
      if (!next.cognome) throw new Error('Il cognome è obbligatorio.');
      if (!next.sesso) throw new Error('Il sesso è obbligatorio.');
      if (!next.dataNascita) throw new Error('La data di nascita è obbligatoria.');

      if (!next.luogoNascita) throw new Error('Il luogo di nascita è obbligatorio.');
      if (!PLACE_RE.test(next.luogoNascita)) throw new Error('Luogo di nascita non valido.');

      if (!next.codiceFiscale) throw new Error('Il codice fiscale è obbligatorio.');
      if (!CF_RE.test(next.codiceFiscale)) throw new Error('Codice fiscale non valido (16 caratteri alfanumerici).');

      if (!next.indirizzo) throw new Error("L’indirizzo di residenza è obbligatorio.");
      if (next.indirizzo.length < 5) throw new Error('Indirizzo troppo corto.');

      if (!next.telefono) throw new Error('Il numero di telefono è obbligatorio.');
      if (!PHONE_RE.test(next.telefono)) throw new Error('Numero di telefono non valido (solo numeri, spazi, + e -).');

      if (!next.email) throw new Error("L’email è obbligatoria.");
      if (!next.email.includes('@')) throw new Error('Email non valida.');

      if (next.certificatoValido) {
        if (!next.certificatoScadenza) throw new Error('Inserisci la data di scadenza del certificato (certificato valido).');
      } else {
        next.certificatoScadenza = next.certificatoScadenza || '';
      }

      if (next.genitoreTelefono && !PHONE_RE.test(next.genitoreTelefono)) {
        throw new Error('Telefono genitore non valido.');
      }
      if (next.genitoreCodiceFiscale && !CF_RE.test(next.genitoreCodiceFiscale)) {
        throw new Error('Codice fiscale genitore non valido (16 caratteri).');
      }

      await onSubmit?.(next);
      router.push(backHref);
    } catch (err: any) {
      setError(err?.message ?? 'Errore durante il salvataggio.');
    } finally {
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
                <input className={styles.input} value={form.nome} onChange={(e) => set('nome', e.target.value)} required />
              </label>

              <label className={styles.field}>
                <span>Indica il cognome del socio <span className={styles.req}>*</span></span>
                <input className={styles.input} value={form.cognome} onChange={(e) => set('cognome', e.target.value)} required />
              </label>

              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Seleziona il sesso del socio <span className={styles.req}>*</span></span>
                  <select className={styles.select} value={form.sesso} onChange={(e) => set('sesso', e.target.value as Socio['sesso'])} required>
                    <option value="">Seleziona sesso</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                    <option value="ALTRO">Altro</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Seleziona la data di nascita del socio <span className={styles.req}>*</span></span>
                  <input className={styles.input} type="date" value={form.dataNascita} onChange={(e) => set('dataNascita', e.target.value)} required />
                </label>
              </div>

              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Indica il luogo di nascita del socio <span className={styles.req}>*</span></span>
                  <input
                    className={styles.input}
                    type="text"
                    value={form.luogoNascita}
                    onChange={(e) => set('luogoNascita', e.target.value)}
                    required
                    placeholder="Es. Bari"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ'’\s.-]{2,60}"
                    title="Inserisci un luogo valido (solo lettere e spazi)."
                  />
                </label>

                <label className={styles.field}>
                  <span>Indica il codice fiscale del socio <span className={styles.req}>*</span></span>
                  <input
                    className={styles.input}
                    value={form.codiceFiscale}
                    onChange={(e) => set('codiceFiscale', e.target.value.toUpperCase())}
                    required
                    maxLength={16}
                    minLength={16}
                    pattern="[A-Za-z0-9]{16}"
                    title="Inserisci un codice fiscale valido (16 caratteri alfanumerici)."
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span>Indica l’indirizzo di residenza del socio <span className={styles.req}>*</span></span>
                <input className={styles.input} value={form.indirizzo} onChange={(e) => set('indirizzo', e.target.value)} required minLength={5} />
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
                  className={styles.input}
                  value={form.genitoreCodiceFiscale}
                  onChange={(e) => set('genitoreCodiceFiscale', e.target.value.toUpperCase())}
                  maxLength={16}
                  pattern="[A-Za-z0-9]{16}"
                />
              </label>

              <label className={styles.field}>
                <span>Inserisci il numero di telefono del genitore del socio</span>
                <input
                  className={styles.input}
                  value={form.genitoreTelefono}
                  onChange={(e) => set('genitoreTelefono', e.target.value)}
                  maxLength={18}
                  inputMode="tel"
                  pattern="[+]?[\d\s-]{6,18}"
                />
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
                  className={styles.input}
                  type="date"
                  value={form.certificatoScadenza}
                  onChange={(e) => set('certificatoScadenza', e.target.value)}
                  required={form.certificatoValido}
                />
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
                  className={styles.input}
                  value={form.telefono}
                  onChange={(e) => set('telefono', e.target.value)}
                  required
                  maxLength={18}
                  inputMode="tel"
                  pattern="[+]?[\d\s-]{6,18}"
                />
              </label>

              <label className={styles.field}>
                <span>Indica l’indirizzo email del socio <span className={styles.req}>*</span></span>
                <input className={styles.input} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
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
