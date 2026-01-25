'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../login/login.module.css';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import SocioForm, { type Socio } from '@/components/admin/soci/SocioForm';
import { getSocioById, updateSocio } from '@/lib/supabase/soci';

export default function EditSocioClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [initialData, setInitialData] = useState<Partial<Socio> | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        if (!id || id === 'undefined' || id === 'null') {
          throw new Error('ID socio mancante');
        }

        const socio = await getSocioById(id);
        if (!cancelled) setInitialData(socio);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? 'Errore caricamento socio');
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
    await updateSocio(id, data);
    router.push('/admin/dashboard');
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

      <main className={`${styles.main} ${styles.mainTop}`}>
        {loading && <div style={{ fontWeight: 700, padding: 20 }}>Caricamento...</div>}
        {err && <div style={{ fontWeight: 800, color: '#c20000', padding: 20 }}>{err}</div>}
        {!loading && !err && initialData && (
          <SocioForm
            mode="edit"
            initialData={initialData}
            onSubmit={handleUpdate}
            backHref="/admin/dashboard"
          />
        )}
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
