import Image from 'next/image';
import Link from 'next/link';
import styles from './login.module.css';

export default function AdminLoginPage() {
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoWrap}>
            {/* Metti il tuo logo qui: public/images/logo.png (o cambia path) */}
            <Image
              src="/public/tempio-logo.png"
              alt="Il Tempio Fitness Club - Doghouse Boxing"
              width={70}
              height={70}
              priority
            />
          </div>

          <h1 className={styles.title}>IL TEMPIO FITNESS CLUB - DOGHOUSE BOXING</h1>
        </div>
      </header>

      {/* MAIN */}
      <main className={styles.main}>
        <section className={styles.card} aria-label="Area Riservata">
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderLine} />
            <div className={styles.cardHeaderTitle}>
              <span>Area Riservata</span>
              <span className={styles.userIcon} aria-hidden="true">👤</span>
            </div>
            <span className={styles.cardHeaderLine} />
          </div>

          <form className={styles.form} method="post" action="#">
            <label className={styles.label}>
              <span>
                Username / Nome utente <span className={styles.req}>*</span>
              </span>
              <input
                name="username"
                type="text"
                className={styles.input}
                autoComplete="username"
                required
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
              />
            </label>

            <label className={styles.remember}>
              <input type="checkbox" name="remember" className={styles.checkbox} />
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

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <Image
              src="/images/logo.png"
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
