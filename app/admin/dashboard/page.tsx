'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import SociTable from '@/components/admin/soci/SociTable';
import SociMonitoringDashboard from '@/components/admin/soci/SociMonitoringDashboard';

import type { SocioDb, SocioRow, KpiItem } from '@/components/admin/soci/types';
import { supabase } from '@/lib/supabase/client';

import { fetchSoci } from '@/lib/supabase/soci';
import { fetchDistinctCourses } from '@/lib/supabase/sociFilters';
import { toSocioRow, buildKpis } from '@/components/admin/soci/socioMappers';

const CERT_FILTERS = ['PRESENTE', 'MANCANTE', 'IN SCADENZA'] as const;

function filterListByQuotaPeriod(list: SocioDb[], month: string, year: string) {
  return list.filter((s) => (s.quota_mese ?? '') === month && (s.quota_anno ?? '') === year);
}

export default function DashboardPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!mounted) return;

      if (!session) {
        router.replace('/admin/login?next=%2Fadmin%2Fdashboard');
        return;
      }

      setUserEmail(session.user.email ?? '');
      setCheckingAuth(false);
    }

    boot();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      if (!session) {
        router.replace('/admin/login?next=%2Fadmin%2Fdashboard');
        return;
      }

      setUserEmail(session.user.email ?? '');
      setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const [filterCourse, setFilterCourse] = useState('FILTRA PER CORSO');
  const [filterCert, setFilterCert] = useState('FILTRA PER STATO CERTIFICATO');
  const [query, setQuery] = useState('');

  const [month, setMonth] = useState('DICEMBRE');
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [dateIscrizione, setDateIscrizione] = useState('');

  const [rows, setRows] = useState<SocioRow[]>([]);
  const [total, setTotal] = useState(0);

  const [okItems, setOkItems] = useState<KpiItem[]>([]);
  const [warnItems, setWarnItems] = useState<KpiItem[]>([]);
  const [badItems, setBadItems] = useState<KpiItem[]>([]);

  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const certOptions: string[] = useMemo(() => [...CERT_FILTERS], []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [filterCourse, filterCert, query, pageSize, dateIscrizione]);

  useEffect(() => {
    setPage(1);
  }, [month, year]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const courses = await fetchDistinctCourses();
        if (!cancelled) setCourseOptions(courses);
      } catch {
        
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const { list, total } = await fetchSoci({
          q: query,
          course: filterCourse,
          cert: filterCert,
          page,
          pageSize,
          dateIscrizione,
        });

        if (cancelled) return;

        setTotal(total);
        setRows(list.map(toSocioRow));

        const kpiList = filterListByQuotaPeriod(list as SocioDb[], month, year);
        const kpis = buildKpis(kpiList);

        setOkItems(kpis.okItems);
        setWarnItems(kpis.warnItems);
        setBadItems(kpis.badItems);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Errore caricamento dati');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, pageSize, filterCourse, filterCert, query, month, year, dateIscrizione]);

  if (checkingAuth) {
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
          <div className={styles.wrap} style={{ fontWeight: 700 }}>
            Caricamento...
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
          {error && (
            <div style={{ marginBottom: 10, fontWeight: 800, color: '#c20000' }}>
              {error}
            </div>
          )}

          {loading && (
            <div style={{ marginBottom: 10, fontWeight: 700 }}>
              Caricamento soci...
            </div>
          )}

          <SociTable
            rows={rows}
            total={total}
            filterCourse={filterCourse}
            onChangeFilterCourse={setFilterCourse}
            filterCert={filterCert}
            onChangeFilterCert={setFilterCert}
            query={query}
            onChangeQuery={setQuery}
            dateIscrizione={dateIscrizione}
            onChangeDateIscrizione={setDateIscrizione}
            page={page}
            onChangePage={setPage}
            pageSize={pageSize}
            onChangePageSize={setPageSize}
            courseOptions={courseOptions}
            certOptions={certOptions}
          />

          <SociMonitoringDashboard
            month={month}
            onChangeMonth={setMonth}
            year={year}
            onChangeYear={setYear}
            okItems={okItems}
            warnItems={warnItems}
            badItems={badItems}
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
