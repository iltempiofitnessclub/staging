'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './dashboard.module.css';

type StatusKind = 'ok' | 'warn' | 'bad';

type Row = {
  id: number;
  nome: string;
  nascita: string;
  dataIscrizione: string;
  pagamentoMensile: { kind: StatusKind; label: string };
  dataPagamento: string;
  certificato: { kind: StatusKind; label: string };
  scadenzaCertificato: string;
};

const months = [
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
];

const years = Array.from({ length: 101 }).map((_, i) => String(2000 + i));

function StatusChip({ kind, label }: { kind: StatusKind; label: string }) {
  const icon =
    kind === 'ok'
      ? '/icon/status-ok.png'
      : kind === 'warn'
        ? '/icon/status-warn.png'
        : '/icon/status-bad.png';

  return (
    <span className={styles.chip} data-kind={kind}>
      <Image className={styles.chipIcon} src={icon} alt="" width={16} height={16} />
      <span className={styles.chipText}>{label}</span>
    </span>
  );
}

export default function DashboardPage() {
  const [filterCert, setFilterCert] = useState('FILTRA PER STATO CERTIFICATO');
  const [filterCourse, setFilterCourse] = useState('FILTRA PER CORSO');
  const [query, setQuery] = useState('');
  const [month, setMonth] = useState('DICEMBRE');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const rows: Row[] = useMemo(
    () => [
      {
        id: 1,
        nome: 'Socio uno',
        nascita: 'Data di nascita',
        dataIscrizione: '01-01-2025',
        pagamentoMensile: { kind: 'ok', label: 'MENSILE PAGATO' },
        dataPagamento: '01-01-2025',
        certificato: { kind: 'ok', label: 'CERTIFICATO PRESENTE' },
        scadenzaCertificato: '22-08-2026'
      },
      {
        id: 2,
        nome: 'Socio due',
        nascita: 'Data di nascita',
        dataIscrizione: '02-02-2025',
        pagamentoMensile: { kind: 'bad', label: 'MENSILE NON PAGATO' },
        dataPagamento: '01-02-2025',
        certificato: { kind: 'bad', label: 'CERTIFICATO MANCANTE' },
        scadenzaCertificato: '22-08-2026'
      },
      {
        id: 3,
        nome: 'Socio tre',
        nascita: 'Data di nascita',
        dataIscrizione: '02-02-2025',
        pagamentoMensile: { kind: 'warn', label: 'MENSILE IN SCADENZA' },
        dataPagamento: '01-02-2025',
        certificato: { kind: 'warn', label: 'CERTIFICATO IN SCADENZA' },
        scadenzaCertificato: '22-08-2026'
      }
    ],
    []
  );

  const total = 50;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoWrap}>
            <Image
              src="/dog81.png"
              alt="Il Tempio Fitness Club - Doghouse Boxing"
              width={70}
              height={70}
              priority
            />
          </div>
          <h1 className={styles.title}>
            IL TEMPIO FITNESS CLUB - DOGHOUSE BOXING
          </h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.topBar}>
            <h2 className={styles.pageTitle}>Elenco soci</h2>

            <select className={styles.selectTop} value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
              <option>FILTRA PER CORSO</option>
              <option>BOXE</option>
              <option>KICKBOXING</option>
              <option>SALA PESI</option>
            </select>
          </div>

          <div className={styles.filtersRow}>
            <select className={styles.selectFilter} value={filterCert} onChange={(e) => setFilterCert(e.target.value)}>
              <option>FILTRA PER STATO CERTIFICATO</option>
              <option>PRESENTE</option>
              <option>MANCANTE</option>
              <option>IN SCADENZA</option>
            </select>

            <div className={styles.dateFake}>
              <span>Filtra per data di iscrizione</span>
              <Image src="/icon/calendar.png" alt="" width={16} height={16} />
            </div>

            <div className={styles.searchWrap}>
              <Image className={styles.searchIcon} src="/icon/search.png" alt="" width={16} height={16} />
              <input
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ricerca un socio per nome"
              />
            </div>

            <button className={styles.btnDark} type="button">
              <Image src="/icon/search-white.png" alt="" width={18} height={18} />
              <span>CERCA</span>
            </button>

            <Link className={styles.btnDark} href="/admin/soci/new">
              <Image src="/icon/user-plus.png" alt="" width={18} height={18} />
              <span>INSERISCI NUOVO SOCIO</span>
            </Link>
          </div>

          <div className={styles.tableBox}>
            <table className={styles.table}>
              {/* ✅ COLGROUP DEVE STARE QUI */}
              <colgroup>
                <col className={styles.colN} />
                <col className={styles.colSocio} />
                <col className={styles.colIscrizione} />
                <col className={styles.colPagamento} />
                <col className={styles.colDataPagamento} />
                <col className={styles.colCertificato} />
                <col className={styles.colScadenza} />
                <col className={styles.colActions} />
              </colgroup>

              <thead>
                <tr>
                  <th className={styles.thN}></th>
                  <th>Socio</th>
                  <th>Data iscrizione</th>
                  <th>Pagamento mensile</th>
                  <th>Data pagamento mensile</th>
                  <th>Certificato medico</th>
                  <th>Scadenza certificato medico</th>
                  <th className={styles.thActions}></th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 10 }).map((_, idx) => {
                  const r = rows[idx % rows.length];
                  return (
                    <tr key={idx}>
                      <td className={styles.center}>
                        <strong>{idx + 1}</strong>
                      </td>

                      <td>
                        <div className={styles.socioCell}>
                          <div className={styles.socioName}>{r.nome}</div>
                          <div className={styles.socioSub}>{r.nascita}</div>
                        </div>
                      </td>

                      <td>{r.dataIscrizione}</td>

                      <td>
                        <StatusChip kind={r.pagamentoMensile.kind} label={r.pagamentoMensile.label} />
                      </td>

                      <td>{r.dataPagamento}</td>

                      <td>
                        <StatusChip kind={r.certificato.kind} label={r.certificato.label} />
                      </td>

                      <td>{r.scadenzaCertificato}</td>

                      <td className={styles.center}>
                        <button className={styles.kebab} type="button" aria-label="Azioni">
                          <span />
                          <span />
                          <span />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.tableFooter}>
              <div className={styles.footerLeft}>
                <select
                  className={styles.pageSize}
                  value={String(pageSize)}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <option value="10">10 Elementi</option>
                  <option value="25">25 Elementi</option>
                  <option value="50">50 Elementi</option>
                </select>

                <div className={styles.resultsText}>
                  Mostrati {start}-{end} su {total} risultati
                </div>
              </div>

              <div className={styles.pager}>
                <button className={styles.pagerBtn} type="button" onClick={() => setPage(Math.max(1, page - 1))}>
                  ‹
                </button>

                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={styles.pageBtn}
                    data-active={p === page}
                    type="button"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}

                <span className={styles.dots}>…</span>

                <button className={styles.pageBtn} type="button" data-active={5 === page} onClick={() => setPage(5)}>
                  5
                </button>

                <button className={styles.pagerBtn} type="button" onClick={() => setPage(page + 1)}>
                  ›
                </button>
              </div>
            </div>
          </div>

          <section className={styles.dashboard}>
            <h3 className={styles.dashboardTitle}>DASHBOARD DI MONITORAGGIO DEI SOCI</h3>

            <div className={styles.dashboardFilters}>
              <select className={styles.selectSmall} value={month} onChange={(e) => setMonth(e.target.value)}>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select className={styles.selectSmall} value={year} onChange={(e) => setYear(e.target.value)}>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.kpiGrid}>
              <div className={styles.kpiCol}>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-ok.png" alt="" width={18} height={18} />
                  <span>MENSILI PAGATI: 4</span>
                </div>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-ok.png" alt="" width={18} height={18} />
                  <span>CERTIFICATI MEDICI PRESENTI: 4</span>
                </div>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-ok.png" alt="" width={18} height={18} />
                  <span>ISCRIZIONI VALIDE: 4</span>
                </div>
              </div>

              <div className={styles.kpiCol}>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-warn.png" alt="" width={18} height={18} />
                  <span>MENSILI IN SCADENZA: 5</span>
                </div>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-warn.png" alt="" width={18} height={18} />
                  <span>CERTIFICATI MEDICI IN SCADENZA: 5</span>
                </div>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-warn.png" alt="" width={18} height={18} />
                  <span>ISCRIZIONI IN SCADENZA: 5</span>
                </div>
              </div>

              <div className={styles.kpiCol}>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-bad.png" alt="" width={18} height={18} />
                  <span>MENSILI NON PAGATI: 1</span>
                </div>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-bad.png" alt="" width={18} height={18} />
                  <span>CERTIFICATI MEDICI NON PRESENTI: 1</span>
                </div>
                <div className={styles.kpiCard}>
                  <Image src="/icon/status-bad.png" alt="" width={18} height={18} />
                  <span>ISCRIZIONI SCADUTE: 1</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <Image src="/dog81.png" alt="Il Tempio Fitness Club - Doghouse Boxing" width={90} height={90} />
          </div>

          <div className={styles.footerCol}>
            <h3>Contatti</h3>
            <p>tempiofitness@gmail.com</p>
            <p>doghouseboxing@gmail.com</p>
            <p>080.530.1234</p>
            <p>080.530.5678</p>
          </div>

          <div className={styles.footerCol}>
            <h3>Dove siamo</h3>
            <p>Bari - Palese - 70128</p>
            <p>via V. Maiorano Capitano, 27</p>
            <p>vico VI Duca D&apos;Aosta, 7a</p>
          </div>

          <div className={styles.footerCol}>
            <h3>Link utili</h3>
            <p>
              <Link className={styles.footerLink} href="#">
                Privacy Policy
              </Link>
            </p>
            <p>
              <Link className={styles.footerLink} href="#">
                Cookie Policy
              </Link>
            </p>
            <p>
              <Link className={styles.footerLink} href="#">
                Termini e Condizioni
              </Link>
            </p>
            <p>
              <Link className={styles.footerLink} href="#">
                Note legali
              </Link>
            </p>
          </div>

          <div className={styles.footerCol}>
            <h3>Da capire</h3>
            <p>Uno</p>
            <p>Dueeeeeeee</p>
            <p>Tre</p>
            <p>Quattro</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
