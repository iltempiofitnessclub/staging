'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/components/styles/adminHeader.module.css';

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/soci', label: 'Soci' }
];

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/admin/dashboard" className={styles.brand}>
          <span className={styles.brandMark}>TB</span>
          <span className={styles.brandText}>Backoffice</span>
        </Link>

        <nav className={styles.nav}>
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {/* placeholder: poi lo colleghiamo alla tua auth */}
          <button
            type="button"
            className={styles.logout}
            onClick={() => alert('TODO: logout')}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
