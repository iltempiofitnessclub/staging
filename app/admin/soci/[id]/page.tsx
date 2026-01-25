'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import SocioForm, { type Socio } from '@/components/admin/soci/SocioForm';

import styles from '@/app/admin/dashboard/dashboard.module.css';
import { getSocioById, updateSocio } from '@/lib/supabase/soci';

export default function EditSocioPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [initialData, setInitialData] = useState<Partial<Socio> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const socio = await getSocioById(String(id));
        if (cancelled) return;

        setInitialData(socio);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Errore nel caricamento del socio');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleUpdate(data: Socio) {
    await updateSocio(String(id), data);
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
          {loading && (
            <div style={{ fontWeight: 700 }}>
              Caricamento socio...
            </div>
          )}

          {error && (
            <div style={{ fontWeight: 800, color: '#c20000' }}>
              {error}
            </div>
          )}

          {!loading && !error && initialData && (
            <SocioForm
              mode="edit"
              initialData={initialData}
              onSubmit={handleUpdate}
              backHref="/admin/dashboard"
            />
          )}
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
