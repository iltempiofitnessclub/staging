'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/admin/dashboard/dashboard.module.css';
import type { SocioRow, StatusKind } from './types';
import { useRouter } from 'next/navigation';
import router from 'next/router';

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

type Props = {
  rows: SocioRow[];
  total: number;

  filterCourse: string;
  onChangeFilterCourse: (v: string) => void;

  filterCert: string;
  onChangeFilterCert: (v: string) => void;

  query: string;
  onChangeQuery: (v: string) => void;

  page: number;
  onChangePage: (p: number) => void;

  pageSize: number;
  onChangePageSize: (n: number) => void;
};

export default function SociTable({
  rows,
  total,
  filterCourse,
  onChangeFilterCourse,
  filterCert,
  onChangeFilterCert,
  query,
  onChangeQuery,
  page,
  onChangePage,
  pageSize,
  onChangePageSize
}: Props) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const router = useRouter();

  return (
    <>
      <div className={styles.topBar}>
        <h2 className={styles.pageTitle}>Elenco soci</h2>

        <select className={styles.selectTop} value={filterCourse} onChange={(e) => onChangeFilterCourse(e.target.value)}>
          <option>FILTRA PER CORSO</option>
          <option>BOXE</option>
          <option>KICKBOXING</option>
          <option>SALA PESI</option>
        </select>
      </div>

      <div className={styles.filtersRow}>
        <select className={styles.selectFilter} value={filterCert} onChange={(e) => onChangeFilterCert(e.target.value)}>
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
            onChange={(e) => onChangeQuery(e.target.value)}
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
                    <button
                      className={styles.kebab}
                      type="button"
                      aria-label="Azioni"
                      onClick={() => router.push(`/admin/soci/${r.id}`)}
                    >
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
            <select className={styles.pageSize} value={String(pageSize)} onChange={(e) => onChangePageSize(Number(e.target.value))}>
              <option value="10">10 Elementi</option>
              <option value="25">25 Elementi</option>
              <option value="50">50 Elementi</option>
            </select>

            <div className={styles.resultsText}>
              Mostrati {start}-{end} su {total} risultati
            </div>
          </div>

          <div className={styles.pager}>
            <button className={styles.pagerBtn} type="button" onClick={() => onChangePage(Math.max(1, page - 1))}>
              ‹
            </button>

            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={styles.pageBtn}
                data-active={p === page}
                type="button"
                onClick={() => onChangePage(p)}
              >
                {p}
              </button>
            ))}

            <span className={styles.dots}>…</span>

            <button className={styles.pageBtn} type="button" data-active={5 === page} onClick={() => onChangePage(5)}>
              5
            </button>

            <button className={styles.pagerBtn} type="button" onClick={() => onChangePage(page + 1)}>
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
