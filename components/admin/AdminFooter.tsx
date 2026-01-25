import styles from '@/components/styles/adminFooter.module.css';

export default function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          © {year} Il Tempio Fitness Club — Doghouse Boxing
        </div>

        <div className={styles.right}>
          <span className={styles.badge}>Admin</span>
        </div>
      </div>
    </footer>
  );
}
