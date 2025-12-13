"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export type NavItem = {
  label: string;
  href: string;
};

type MainHeaderProps = {
  logoSrc?: string;
  logoText?: string;
  logoAlt?: string;
  navItems: NavItem[];
  className?: string;
};

export function MainHeader({
  logoSrc,
  logoText = "",
  logoAlt = "Logo",
  navItems,
  className,
}: MainHeaderProps) {
  const pathname = usePathname();

  const homeHref =
    pathname?.startsWith("/doghouse")
      ? "/doghouse"
      : pathname?.startsWith("/tempio")
      ? "/tempio"
      : "/";

  return (
    <header className={`gym-header ${className ?? ""}`}>
      <div className="gym-header__inner">
        <div className="gym-header__brand">
          <Link href={homeHref} aria-label="Torna alla home">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={80}
                height={80}
                className="gym-header__logo-img"
              />
            ) : (
              <span className="gym-header__logo-text">{logoText}</span>
            )}
          </Link>
        </div>

        <nav className="gym-header__nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="gym-header__nav-item"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
