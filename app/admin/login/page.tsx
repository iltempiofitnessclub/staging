import Link from 'next/link';
import styles from './login.module.css';

import AdminHeader from '../../../components/admin/AdminHeader';
import AdminFooter from '../../../components/admin/AdminFooter';

export default function AdminLoginPage() {
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

          <form className={styles.form}>
            <label className={styles.label}>
              <span>
                Username / Nome utente <span className={styles.req}>*</span>
              </span>
              <input name="username" type="text" className={styles.input} autoComplete="username" required />
            </label>

            <label className={styles.label}>
              <span>
                Password <span className={styles.req}>*</span>
              </span>
              <input name="password" type="password" className={styles.input} autoComplete="current-password" required />
            </label>

            <label className={styles.remember}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Ricordami</span>
            </label>

            <button type="submit" className={styles.submit}>
              ACCEDI
            </button>

            <div className={styles.forgot}>
              <Link href="#" className={styles.forgotLink}>
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
