'use client';

import { useMemo, useState } from 'react';
import styles from './dashboard.module.css';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';

import SociTable from '@/components/admin/soci/SociTable';
import SociMonitoringDashboard from '@/components/admin/soci/SociMonitoringDashboard';

import type { SocioRow } from '@/components/admin/soci/types';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const [filterCert, setFilterCert] = useState('FILTRA PER STATO CERTIFICATO');
  const [filterCourse, setFilterCourse] = useState('FILTRA PER CORSO');
  const [query, setQuery] = useState('');

  const [month, setMonth] = useState('DICEMBRE');
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  
  const rows: SocioRow[] = useMemo(
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
          <SociTable
            rows={rows}
            total={total}
            filterCourse={filterCourse}
            onChangeFilterCourse={setFilterCourse}
            filterCert={filterCert}
            onChangeFilterCert={setFilterCert}
            query={query}
            onChangeQuery={setQuery}
            page={page}
            onChangePage={setPage}
            pageSize={pageSize}
            onChangePageSize={setPageSize}
          />

          <SociMonitoringDashboard
            month={month}
            onChangeMonth={setMonth}
            year={year}
            onChangeYear={setYear}
            okItems={[
              { kind: 'ok', label: 'MENSILI PAGATI', value: 4 },
              { kind: 'ok', label: 'CERTIFICATI MEDICI PRESENTI', value: 4 },
              { kind: 'ok', label: 'ISCRIZIONI VALIDE', value: 4 }
            ]}
            warnItems={[
              { kind: 'warn', label: 'MENSILI IN SCADENZA', value: 5 },
              { kind: 'warn', label: 'CERTIFICATI MEDICI IN SCADENZA', value: 5 },
              { kind: 'warn', label: 'ISCRIZIONI IN SCADENZA', value: 5 }
            ]}
            badItems={[
              { kind: 'bad', label: 'MENSILI NON PAGATI', value: 1 },
              { kind: 'bad', label: 'CERTIFICATI MEDICI NON PRESENTI', value: 1 },
              { kind: 'bad', label: 'ISCRIZIONI SCADUTE', value: 1 }
            ]}
          />
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
