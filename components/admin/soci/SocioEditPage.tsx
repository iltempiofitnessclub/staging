'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';

import type { Socio } from './types';
import { getSocioById } from '../../../app/admin/soci/mock';

import styles from '../../styles/socioEditPage.module.css';

type Props = {
  socioId: string;
};

const months = [
  'GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO',
  'LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE'
];

export default function SocioEditPage({ socioId }: Props) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Socio | null>(null);

  useEffect(() => {
    const found = getSocioById(socioId);
    setForm(found);
  }, [socioId]);

  const years = useMemo(() => {
    const list: string[] = [];
    for (let y = 2000; y <= 2100; y++) list.push(String(y));
    return list;
  }, []);

  const set = <K extends keyof Socio>(key: K, value: Socio[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    try {
      alert('SALVA (TODO API): ' + JSON.stringify(form, null, 2));
    } finally {
      setSaving(false);
    }
  }

  if (!form) {
    return (
      <div className={styles.page}>
        <AdminHeader
          title="IL TEMPIO FITNESS CLUB - DOGHOUSE BOXING"
          logoSrc="/dog81.png"
          logoAlt="Il Tempio Fitness Club - Doghouse Boxing"
          className={styles.header}
          innerClassName={styles.headerInner}
          logoWrapClassName={styles.logoWrap}
          titleClassName={styles.title}
        />
        <main className={styles.main}>
          <div>Socio non trovato.</div>
        </main>
        <AdminFooter
          logoSrc="/dog81.png"
          logoAlt="Il Tempio Fitness Club - Doghouse Boxing"
          className={styles.footer}
          innerClassName={styles.footerInner}
          logoClassName={styles.footerLogo}
          colClassName={styles.footerCol}
          linkClassName={styles.footerLink}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <AdminHeader
        title="IL TEMPIO FITNESS CLUB - DOGHOUSE BOXING"
        logoSrc="/dog81.png"
        logoAlt="Il Tempio Fitness Club - Doghouse Boxing"
        className={styles.header}
        innerClassName={styles.headerInner}
        logoWrapClassName={styles.logoWrap}
        titleClassName={styles.title}
      />

      <main className={styles.main}>
        <div className={styles.wrap}>
          {/* X in alto a destra */}
          <Link href="/admin/dashboard" className={styles.closeX} aria-label="Chiudi">
            ✕
          </Link>

          <h2 className={styles.pageTitle}>Dettaglio socio</h2>

          <div className={styles.formBox}>
            <div className={styles.grid}>
              {/* COL SX */}
              <section className={styles.col}>
                <h3 className={styles.sectionTitle}>ANAGRAFICA SOCIO</h3>

                <label className={styles.field}>
                  <span>Indica il nome del socio <span className={styles.req}>*</span></span>
                  <input className={styles.input} value={form.nome} onChange={(e) => set('nome', e.target.value)} />
                </label>

                <label className={styles.field}>
                  <span>Indica il cognome del socio <span className={styles.req}>*</span></span>
                  <input className={styles.input} value={form.cognome} onChange={(e) => set('cognome', e.target.value)} />
                </label>

                <div className={styles.row2}>
                  <label className={styles.field}>
                    <span>Seleziona il sesso del socio <span className={styles.req}>*</span></span>
                    <select className={styles.select} value={form.sesso} onChange={(e) => set('sesso', e.target.value as Socio['sesso'])}>
                      <option value="">Seleziona sesso</option>
                      <option value="M">Maschio</option>
                      <option value="F">Femmina</option>
                      <option value="ALTRO">Altro</option>
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Seleziona la data di nascita del socio <span className={styles.req}>*</span></span>
                    <input className={styles.input} type="date" value={form.dataNascita} onChange={(e) => set('dataNascita', e.target.value)} />
                  </label>
                </div>

                <div className={styles.row2}>
                  <label className={styles.field}>
                    <span>Indica il luogo di nascita del socio <span className={styles.req}>*</span></span>
                    <input className={styles.input} value={form.luogoNascita} onChange={(e) => set('luogoNascita', e.target.value)} placeholder="Es. Bari" />
                  </label>

                  <label className={styles.field}>
                    <span>Indica il codice fiscale del socio <span className={styles.req}>*</span></span>
                    <input className={styles.input} value={form.codiceFiscale} onChange={(e) => set('codiceFiscale', e.target.value.toUpperCase())} maxLength={16} />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Indica l’indirizzo di residenza del socio <span className={styles.req}>*</span></span>
                  <input className={styles.input} value={form.indirizzo} onChange={(e) => set('indirizzo', e.target.value)} />
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
                  <input className={styles.input} value={form.genitoreCodiceFiscale} onChange={(e) => set('genitoreCodiceFiscale', e.target.value.toUpperCase())} maxLength={16} />
                </label>

                <label className={styles.field}>
                  <span>Inserisci il numero di telefono del genitore del socio</span>
                  <input className={styles.input} value={form.genitoreTelefono} onChange={(e) => set('genitoreTelefono', e.target.value)} maxLength={18} />
                </label>
              </section>

              {/* COL DX */}
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
                      <input type="checkbox" checked={!form.certificatoValido} onChange={() => set('certificatoValido', false)} />
                      <span>Certificato medico non valido</span>
                    </label>
                  </div>
                </div>

                <label className={styles.field}>
                  <span>Indica la data di scadenza del certificato</span>
                  <input className={styles.input} type="date" value={form.certificatoScadenza} onChange={(e) => set('certificatoScadenza', e.target.value)} />
                </label>

                <div className={styles.field}>
                  <span>Indica lo stato del pagamento della quota mensile</span>

                  <div className={styles.rowMonthYear}>
                    <select className={styles.select} value={form.quotaMese} onChange={(e) => set('quotaMese', e.target.value)}>
                      {months.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>

                    <select className={styles.select} value={form.quotaAnno} onChange={(e) => set('quotaAnno', e.target.value)}>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
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
                  <input className={styles.input} value={form.telefono} onChange={(e) => set('telefono', e.target.value)} maxLength={18} />
                </label>

                <label className={styles.field}>
                  <span>Indica l’indirizzo email del socio <span className={styles.req}>*</span></span>
                  <input className={styles.input} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
                </label>

                <label className={styles.field}>
                  <span>Seleziona il/i corso/i al quale desideri iscrivere il socio</span>
                  <select className={styles.select} value={form.corso} onChange={(e) => set('corso', e.target.value)}>
                    <option value="">Seleziona il/i corso/i ai quali il socio è iscritto</option>
                    <option value="Boxe">Boxe</option>
                    <option value="Kickboxing">Kickboxing</option>
                    <option value="Sala Pesi">Sala Pesi</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Note aggiuntive</span>
                  <textarea className={styles.textarea} value={form.note} onChange={(e) => set('note', e.target.value)} maxLength={500} placeholder="Inserisci qui delle note aggiuntive..." />
                  <div className={styles.counter}>{form.note.length}/500</div>
                </label>

                <div className={styles.meta}>
                  Data iscrizione socio: <strong>DATA CORRENTE</strong> (in formato GG-MM-AA)
                </div>
              </section>
            </div>
          </div>

          <div className={styles.actionsOutside}>
            <Link href="/admin/dashboard" className={styles.cancel} aria-disabled={saving}>
              ANNULLA
            </Link>

            <button className={styles.save} type="button" onClick={handleSave} disabled={saving}>
              {saving ? 'SALVATAGGIO...' : 'SALVA'}
            </button>
          </div>
        </div>
      </main>

      <AdminFooter
        logoSrc="/dog81.png"
        logoAlt="Il Tempio Fitness Club - Doghouse Boxing"
        className={styles.footer}
        innerClassName={styles.footerInner}
        logoClassName={styles.footerLogo}
        colClassName={styles.footerCol}
        linkClassName={styles.footerLink}
      />
    </div>
  );
}
