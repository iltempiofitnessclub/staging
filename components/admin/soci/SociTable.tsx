'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/dashboard/dashboard.module.css';
import type { SocioRow, StatusKind } from './types';

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

  dateIscrizione: string;
  onChangeDateIscrizione: (v: string) => void;

  page: number;
  onChangePage: (p: number) => void;

  pageSize: number;
  onChangePageSize: (n: number) => void;

  courseOptions: string[];
  certOptions: string[];
};

function buildPages(page: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);

  for (let p = page - 1; p <= page + 1; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }

  return Array.from(pages).sort((a, b) => a - b);
}

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
  onChangePageSize,
  courseOptions,
  certOptions,
  dateIscrizione,
  onChangeDateIscrizione
}: Props) {
  const router = useRouter();

  const safeRows = Array.isArray(rows) ? rows.filter(Boolean) : [];
  const safeTotal = Number.isFinite(total) ? total : safeRows.length;

  const totalPages = Math.max(1, Math.ceil(safeTotal / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const start = safeTotal === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = safeTotal === 0 ? 0 : Math.min(currentPage * pageSize, safeTotal);

  const pages = useMemo(() => buildPages(currentPage, totalPages), [currentPage, totalPages]);

  function goToSocio(id?: string | number) {
    if (!id) return;
    router.push(`/admin/soci/edit?id=${id}`)
  }

  return (
    <>
      <div className={styles.topBar}>
        <h2 className={styles.pageTitle}>Elenco soci</h2>

        <select
          className={styles.selectTop}
          value={filterCourse}
          onChange={(e) => onChangeFilterCourse(e.target.value)}
        >
          <option value="FILTRA PER CORSO">FILTRA PER CORSO</option>
          {courseOptions.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filtersRow}>
        <select
          className={styles.selectFilter}
          value={filterCert}
          onChange={(e) => onChangeFilterCert(e.target.value)}
        >
          <option value="FILTRA PER STATO CERTIFICATO">FILTRA PER STATO CERTIFICATO</option>
          {certOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className={styles.dateFake}>
          <span>Filtra per data di iscrizione</span>

          {dateIscrizione && (
            <span className={styles.dateValue}>
              {(() => {
                const [y, m, d] = dateIscrizione.split('-');
                return `${d}-${m}-${y}`;
              })()}
            </span>
          )}

          <Image src="/icon/calendar.png" alt="" width={16} height={16} />

          <input
            type="date"
            className={styles.dateOverlay}
            value={dateIscrizione}
            onChange={(e) => onChangeDateIscrizione(e.target.value)}
            aria-label="Filtra per data di iscrizione"
          />
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
            {safeRows.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 18 }}>
                  Nessun socio trovato.
                </td>
              </tr>
            ) : (
              safeRows.map((r, idx) => (
                <tr key={String(r.id)}>
                  <td className={styles.center}>
                    <strong>{(currentPage - 1) * pageSize + (idx + 1)}</strong>
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
                      onClick={() => goToSocio(r.id)}
                    >
                      <span />
                      <span />
                      <span />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className={styles.tableFooter}>
          <div className={styles.footerLeft}>
            <select
              className={styles.pageSize}
              value={String(pageSize)}
              onChange={(e) => onChangePageSize(Number(e.target.value))}
            >
              <option value="10">10 Elementi</option>
              <option value="25">25 Elementi</option>
              <option value="50">50 Elementi</option>
            </select>

            <div className={styles.resultsText}>
              Mostrati {start}-{end} su {safeTotal} risultati
            </div>
          </div>

          <div className={styles.pager}>
            <button
              className={styles.pagerBtn}
              type="button"
              onClick={() => onChangePage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
            >
              ‹
            </button>

            {pages.map((p, i) => {
              const prev = pages[i - 1];
              const showDots = prev && p - prev > 1;

              return (
                <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {showDots && <span className={styles.dots}>…</span>}
                  <button
                    className={styles.pageBtn}
                    data-active={p === currentPage}
                    type="button"
                    onClick={() => onChangePage(p)}
                  >
                    {p}
                  </button>
                </span>
              );
            })}

            <button
              className={styles.pagerBtn}
              type="button"
              onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
