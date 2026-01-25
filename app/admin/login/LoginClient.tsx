'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

import AdminHeader from '../../../components/admin/AdminHeader';
import AdminFooter from '../../../components/admin/AdminFooter';
import { supabase } from '@/lib/supabase/client';

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const next = searchParams.get('next') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    const session = data.session ?? (await supabase.auth.getSession()).data.session;

    if (!session) {
      setLoading(false);
      setErrorMsg(
        'Accesso non completato: sessione non disponibile. Verifica NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      );
      return;
    }

    setLoading(false);

    router.replace(next);
    router.refresh();
  }

  function onForgot(e: React.MouseEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg('Per il reset password contatta il personale tecnico per l’aggiornamento delle credenziali.');
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
        <section className={styles.card} aria-label="Area Riservata">
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderLine} />
            <div className={styles.cardHeaderTitle}>
              <span>Area Riservata</span>
              <span className={styles.userIcon}>👤</span>
            </div>
            <span className={styles.cardHeaderLine} />
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.label}>
              <span>
                Email <span className={styles.req}>*</span>
              </span>
              <input
                name="email"
                type="email"
                className={styles.input}
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className={styles.label}>
              <span>
                Password <span className={styles.req}>*</span>
              </span>
              <input
                name="password"
                type="password"
                className={styles.input}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {errorMsg && (
              <div style={{ fontSize: 12, color: '#c20000', fontWeight: 800 }}>
                {errorMsg}
              </div>
            )}

            {infoMsg && (
              <div style={{ fontSize: 12, fontWeight: 800 }}>
                {infoMsg}
              </div>
            )}

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'ACCESSO...' : 'ACCEDI'}
            </button>

            <div className={styles.forgot}>
              <Link href="#" className={styles.forgotLink} onClick={onForgot}>
                Hai dimenticato la password?
              </Link>
            </div>
          </form>
        </section>
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
