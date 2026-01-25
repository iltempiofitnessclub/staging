'use client';

import Image from 'next/image';
import styles from '@/app/admin/dashboard/dashboard.module.css';
import type { KpiItem, StatusKind } from './types';

const months = ['GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO','LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE'];
const years = Array.from({ length: 101 }).map((_, i) => String(2000 + i));

function iconByKind(kind: StatusKind) {
  return kind === 'ok' ? '/icon/status-ok.png' : kind === 'warn' ? '/icon/status-warn.png' : '/icon/status-bad.png';
}

type Props = {
  month: string;
  onChangeMonth: (m: string) => void;

  year: string;
  onChangeYear: (y: string) => void;

  okItems: KpiItem[];
  warnItems: KpiItem[];
  badItems: KpiItem[];
};

export default function SociMonitoringDashboard({
  month,
  onChangeMonth,
  year,
  onChangeYear,
  okItems,
  warnItems,
  badItems
}: Props) {
  return (
    <section className={styles.dashboard}>
      <h3 className={styles.dashboardTitle}>DASHBOARD DI MONITORAGGIO DEI SOCI</h3>

      <div className={styles.dashboardFilters}>
        <select className={styles.selectSmall} value={month} onChange={(e) => onChangeMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select className={styles.selectSmall} value={year} onChange={(e) => onChangeYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCol}>
          {okItems.map((k) => (
            <div key={k.label} className={styles.kpiCard}>
              <Image src={iconByKind('ok')} alt="" width={18} height={18} />
              <span>{k.label}: {k.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.kpiCol}>
          {warnItems.map((k) => (
            <div key={k.label} className={styles.kpiCard}>
              <Image src={iconByKind('warn')} alt="" width={18} height={18} />
              <span>{k.label}: {k.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.kpiCol}>
          {badItems.map((k) => (
            <div key={k.label} className={styles.kpiCard}>
              <Image src={iconByKind('bad')} alt="" width={18} height={18} />
              <span>{k.label}: {k.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
