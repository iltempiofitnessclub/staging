import Image from 'next/image';
import Link from 'next/link';
import SocioForm from '@/components/admin/soci/SocioForm';
import styles from '../../login/login.module.css';

export default function NewSocioPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoWrap}>
            <Image
              src="/dog81.png"
              alt="Il Tempio Fitness Club - Doghouse Boxing"
              width={70}
              height={70}
              priority
            />
          </div>
          <h1 className={styles.title}>IL TEMPIO FITNESS CLUB - DOGHOUSE BOXING</h1>
        </div>
      </header>

      <main className={`${styles.main} ${styles.mainTop}`}>
        <SocioForm mode="create" />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <Image
              src="/dog81.png"
              alt="Il Tempio Fitness Club - Doghouse Boxing"
              width={90}
              height={90}
            />
          </div>

          <div className={styles.footerCol}>
            <h3>Contatti</h3>
            <p>tempiofitness@gmail.com</p>
            <p>doghouseboxing@gmail.com</p>
            <p>080.530.1234</p>
            <p>080.530.5678</p>
          </div>

          <div className={styles.footerCol}>
            <h3>Dove siamo</h3>
            <p>Bari - Palese - 70128</p>
            <p>via V. Maiorano Capitano, 27</p>
            <p>vico VI Duca D&apos;Aosta, 7a</p>
          </div>

          <div className={styles.footerCol}>
            <h3>Link utili</h3>
            <p><Link className={styles.footerLink} href="#">Privacy Policy</Link></p>
            <p><Link className={styles.footerLink} href="#">Cookie Policy</Link></p>
            <p><Link className={styles.footerLink} href="#">Termini e Condizioni</Link></p>
            <p><Link className={styles.footerLink} href="#">Note legali</Link></p>
          </div>

          <div className={styles.footerCol}>
            <h3>Da capire</h3>
            <p>Uno</p>
            <p>Dueeeeeeee</p>
            <p>Tre</p>
            <p>Quattro</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
