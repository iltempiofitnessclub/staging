'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../login/login.module.css';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import SocioForm, { type Socio } from '@/components/admin/soci/SocioForm';

import { getSocioById, updateSocio } from '@/lib/supabase/soci';

export default function EditSocioPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [initialData, setInitialData] = useState<Partial<Socio> | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        if (!id) throw new Error('ID socio mancante');

        const socio = await getSocioById(String(id));

        if (cancelled) return;
        setInitialData(socio);
      } catch (e: any) {
        if (cancelled) return;
        setErr(e?.message ?? 'Errore caricamento socio');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleUpdate(data: Socio) {
    if (!id) return;
    await updateSocio(String(id), data);
  }

  if (loading) {
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
        <main className={`${styles.main} ${styles.mainTop}`}>
          <div style={{ fontWeight: 700, padding: 20 }}>Caricamento...</div>
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

  if (err) {
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
        <main className={`${styles.main} ${styles.mainTop}`}>
          <div style={{ fontWeight: 800, color: '#c20000', padding: 20 }}>{err}</div>
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

  if (!initialData) return null;

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

      <main className={`${styles.main} ${styles.mainTop}`}>
        <SocioForm
          mode="edit"
          initialData={initialData}
          onSubmit={handleUpdate}
          backHref="/admin/dashboard"
        />
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
