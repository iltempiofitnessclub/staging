'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import SocioForm, { type Socio } from '@/components/admin/soci/SocioForm';

import styles from '@/app/admin/dashboard/dashboard.module.css';
import { createSocio } from '@/lib/supabase/soci';

export default function NewSocioPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(data: Socio) {
    if (saving) return;

    try {
      setSaving(true);
      setError(null);

      await createSocio(data);

      router.push('/admin/dashboard');
    } catch (e: any) {
      setError(e?.message ?? 'Errore durante la creazione del socio');
    } finally {
      setSaving(false);
    }
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
            <div style={{ marginBottom: 12, fontWeight: 800, color: '#c20000' }}>
              {error}
            </div>
          )}

          <SocioForm
            mode="create"
            onSubmit={handleCreate}
            backHref="/admin/dashboard"
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
