'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './socioForm.module.css';

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
  note: string;
};

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

  quotaMese: 'DICEMBRE',
  quotaAnno: String(new Date().getFullYear()),
  mensilePagato: false,

  telefono: '',
  email: '',

  corso: '',
  note: ''
};

type Props = {
  mode: 'create' | 'edit';
  initialData?: Partial<Socio>;
  onSubmit?: (data: Socio) => Promise<void> | void;
  backHref?: string;
};

export default function SocioForm({ mode, initialData, onSubmit, backHref = '/admin/dashboard' }: Props) {
  const router = useRouter();

  const initial = useMemo(() => ({ ...emptySocio, ...initialData }), [initialData]);

  const [form, setForm] = useState<Socio>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const set = <K extends keyof Socio>(key: K, value: Socio[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await onSubmit?.(form);
      router.push(backHref);
    } catch (err: any) {
      setError(err?.message ?? 'Errore durante il salvataggio.');
    } finally {
      setSaving(false);
    }
  }

  const months = useMemo(
    () => [
      'GENNAIO',
      'FEBBRAIO',
      'MARZO',
      'APRILE',
      'MAGGIO',
      'GIUGNO',
      'LUGLIO',
      'AGOSTO',
      'SETTEMBRE',
      'OTTOBRE',
      'NOVEMBRE',
      'DICEMBRE'
    ],
    []
  );

  const years = useMemo(() => {
    const list: string[] = [];
    for (let y = 2000; y <= 2100; y++) list.push(String(y));
    return list;
  }, []);

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
                <span>
                  Indica il nome del socio <span className={styles.req}>*</span>
                </span>
                <input
                  className={styles.input}
                  value={form.nome}
                  onChange={(e) => set('nome', e.target.value)}
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  Indica il cognome del socio <span className={styles.req}>*</span>
                </span>
                <input
                  className={styles.input}
                  value={form.cognome}
                  onChange={(e) => set('cognome', e.target.value)}
                  required
                />
              </label>

              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>
                    Seleziona il sesso del socio <span className={styles.req}>*</span>
                  </span>
                  <select
                    className={styles.select}
                    value={form.sesso}
                    onChange={(e) => set('sesso', e.target.value as Socio['sesso'])}
                    required
                  >
                    <option value="">Seleziona sesso</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                    <option value="ALTRO">Altro</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>
                    Seleziona la data di nascita del socio <span className={styles.req}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    type="date"
                    value={form.dataNascita}
                    onChange={(e) => set('dataNascita', e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>
                    Indica il luogo di nascita del socio <span className={styles.req}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    type="text"
                    value={form.luogoNascita}
                    onChange={(e) => set('luogoNascita', e.target.value)}
                    required
                    placeholder="Es. Bari"
                  />
                </label>

                <label className={styles.field}>
                  <span>
                    Indica il codice fiscale del socio <span className={styles.req}>*</span>
                  </span>
                  <input
                    className={styles.input}
                    value={form.codiceFiscale}
                    onChange={(e) => set('codiceFiscale', e.target.value.toUpperCase())}
                    required
                    maxLength={16}
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span>
                  Indica l’indirizzo di residenza del socio <span className={styles.req}>*</span>
                </span>
                <input
                  className={styles.input}
                  value={form.indirizzo}
                  onChange={(e) => set('indirizzo', e.target.value)}
                  required
                />
              </label>

              <h3 className={`${styles.sectionTitle} ${styles.sectionSpacer}`}>
                CONTATTI GENITORE MINORE
              </h3>

              <label className={styles.field}>
                <span>Indica il nome del genitore del socio</span>
                <input
                  className={styles.input}
                  value={form.genitoreNome}
                  onChange={(e) => set('genitoreNome', e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span>Indica il cognome del genitore del socio</span>
                <input
                  className={styles.input}
                  value={form.genitoreCognome}
                  onChange={(e) => set('genitoreCognome', e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span>Indica il codice fiscale del genitore del socio</span>
                <input
                  className={styles.input}
                  value={form.genitoreCodiceFiscale}
                  onChange={(e) => set('genitoreCodiceFiscale', e.target.value.toUpperCase())}
                  maxLength={16}
                />
              </label>

              <label className={styles.field}>
                <span>Inserisci il numero di telefono del genitore del socio</span>
                <input
                  className={styles.input}
                  value={form.genitoreTelefono}
                  onChange={(e) => set('genitoreTelefono', e.target.value)}
                  maxLength={18}
                />
              </label>
            </section>

            <section className={styles.col}>
              <h3 className={styles.sectionTitle}>CARATTERISTICHE SOCIO</h3>

              <div className={styles.field}>
                <span>
                  Indica lo stato del certificato medico <span className={styles.req}>*</span>
                </span>

                <div className={styles.inlineChecks}>
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      checked={form.certificatoValido}
                      onChange={() => set('certificatoValido', true)}
                    />
                    <span>Certificato medico valido</span>
                  </label>

                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      checked={!form.certificatoValido}
                      onChange={() => set('certificatoValido', false)}
                    />
                    <span>Certificato medico non valido</span>
                  </label>
                </div>
              </div>

              <label className={styles.field}>
                <span>Indica la data di scadenza del certificato</span>
                <input
                  className={styles.input}
                  type="date"
                  value={form.certificatoScadenza}
                  onChange={(e) => set('certificatoScadenza', e.target.value)}
                />
              </label>

              <div className={styles.field}>
                <span>Indica lo stato del pagamento della quota mensile</span>

                <div className={styles.rowMonthYear}>
                  <select
                    className={styles.select}
                    value={form.quotaMese}
                    onChange={(e) => set('quotaMese', e.target.value)}
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    className={styles.select}
                    value={form.quotaAnno}
                    onChange={(e) => set('quotaAnno', e.target.value)}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inlineChecks}>
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      checked={form.mensilePagato}
                      onChange={() => set('mensilePagato', true)}
                    />
                    <span>Mensile pagato</span>
                  </label>

                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      checked={!form.mensilePagato}
                      onChange={() => set('mensilePagato', false)}
                    />
                    <span>Mensile da pagare</span>
                  </label>
                </div>
              </div>

              <label className={styles.field}>
                <span>
                  Inserisci il numero di telefono del socio <span className={styles.req}>*</span>
                </span>
                <input
                  className={styles.input}
                  value={form.telefono}
                  onChange={(e) => set('telefono', e.target.value)}
                  required
                  maxLength={18}
                />
              </label>

              <label className={styles.field}>
                <span>
                  Indica l’indirizzo email del socio <span className={styles.req}>*</span>
                </span>
                <input
                  className={styles.input}
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Seleziona il/i corso/i al quale desideri iscrivere il socio</span>
                <select
                  className={styles.select}
                  value={form.corso}
                  onChange={(e) => set('corso', e.target.value)}
                >
                  <option value="">Seleziona il/i corso/i ai quali il socio è iscritto</option>
                  <option value="Boxe">Boxe</option>
                  <option value="Kickboxing">Kickboxing</option>
                  <option value="Sala Pesi">Sala Pesi</option>
                </select>
              </label>

              <label className={styles.field}>
                <span>Note aggiuntive</span>
                <textarea
                  className={styles.textarea}
                  value={form.note}
                  onChange={(e) => set('note', e.target.value)}
                  maxLength={500}
                  placeholder="Inserisci qui delle note aggiuntive..."
                />
                <div className={styles.counter}>{form.note.length}/500</div>
              </label>

              <div className={styles.meta}>
                Data iscrizione socio: <strong>DATA CORRENTE</strong> (in formato GG-MM-AA)
              </div>
            </section>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 10, fontSize: 12, color: '#c20000', fontWeight: 700 }}>
            {error}
          </div>
        )}

        <div className={styles.actionsOutside}>
          <button
            type="button"
            className={styles.cancel}
            disabled={saving}
            onClick={() => router.push(backHref)}
          >
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
