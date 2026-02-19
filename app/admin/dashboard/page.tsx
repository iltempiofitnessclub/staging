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

import { fetchSoci, fetchSociKpis } from '@/lib/supabase/soci';
import { fetchCourseOptions } from '@/lib/supabase/sociFilters';
import { toSocioRow, buildKpis } from '@/components/admin/soci/socioMappers';

const CERT_FILTERS = ['PRESENTE', 'MANCANTE', 'IN SCADENZA'] as const;

function filterListByQuotaPeriod(list: SocioDb[], month: string, year: string) {
  return list.filter((s) => (s.quota_mese ?? '') === month && (s.quota_anno ?? '') === year);
}

export default function DashboardPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check for success message in URL
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    
    if (success === 'created') {
      setSuccessMessage('Socio creato con successo!');
      // Remove query param from URL
      window.history.replaceState({}, '', '/admin/dashboard');
      // Auto-hide after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } else if (success === 'updated') {
      setSuccessMessage('Socio aggiornato con successo!');
      window.history.replaceState({}, '', '/admin/dashboard');
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, []);

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

  const [filterCourse, setFilterCourse] = useState<string[]>([]);
  const [filterCert, setFilterCert] = useState('FILTRA PER STATO CERTIFICATO');
  const [query, setQuery] = useState('');

  const MONTHS = [
    'GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO',
    'LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE',
  ] as const;

  function getCurrentMonthLabel() {
    return MONTHS[new Date().getMonth()];
  }

  const [month, setMonth] = useState<string>(getCurrentMonthLabel());
  const [year, setYear] = useState<string>(String(new Date().getFullYear()));

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [dateIscrizione, setDateIscrizione] = useState('');

  const [rows, setRows] = useState<SocioRow[]>([]);
  const [total, setTotal] = useState(0);

  const [okItems, setOkItems] = useState<KpiItem[]>([]);
  const [warnItems, setWarnItems] = useState<KpiItem[]>([]);
  const [badItems, setBadItems] = useState<KpiItem[]>([]);

  const [courseOptions, setCourseOptions] = useState<{ code: string; title: string }[]>([]);
  const certOptions: string[] = useMemo(() => [...CERT_FILTERS], []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [filterCourse, filterCert, query, pageSize, dateIscrizione]);

  useEffect(() => {
    setPage(1);
  }, [month, year]);

type CourseOpt = { code: string; title: string };

function uniqueByCode(arr: CourseOpt[]) {
  const m = new Map<string, CourseOpt>();
  for (const c of arr || []) {
    const code = String(c?.code ?? '').trim();
    if (!code) continue;
    if (!m.has(code)) m.set(code, { code, title: String(c?.title ?? code).trim() || code });
  }
  return Array.from(m.values());
}

useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      const courses = await fetchCourseOptions();

      const unique = uniqueByCode(Array.isArray(courses) ? courses : []);

      console.log('COURSE OPTIONS UNIQUE:', unique.map((c) => c.code));

      if (!cancelled) setCourseOptions(unique);
    } catch (e) {
      console.error(e);
      if (!cancelled) setCourseOptions([]);
    }
  })();

  return () => {
    cancelled = true;
  };
}, []);



  useEffect(() => {
    let cancelled = false;
    
    // Salva la posizione di scroll prima del caricamento
    const scrollY = window.scrollY;

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

        const kpiList = await fetchSociKpis({
        q: query,
        course: filterCourse,
        cert: filterCert,
        dateIscrizione,
      });

      if (cancelled) return;

      const kpis = buildKpis(kpiList as SocioDb[], month, year);

        setOkItems(kpis.okItems);
        setWarnItems(kpis.warnItems);
        setBadItems(kpis.badItems);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Errore caricamento dati');
      } finally {
        if (!cancelled) {
          setLoading(false);
          // Ripristina la posizione di scroll dopo il caricamento
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
          });
        }
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
          {successMessage && (
            <div className={styles.successMessage}>
              ✓ {successMessage}
            </div>
          )}

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
