import SocioForm from '@/components/admin/soci/SocioForm';
import styles from '../../login/login.module.css';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';

export default function NewSocioPage() {
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
        <SocioForm mode="create" />
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
