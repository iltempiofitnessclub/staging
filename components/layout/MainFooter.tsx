import Image from "next/image";
import Link from "@/components/routing/Link";
import { ReactNode } from "react";

type SocialItem = {
  href: string;
  icon: ReactNode;
  label?: string;
};

type MainFooterProps = {
  logoSrc: string;
  logoAlt?: string;
  email: string;
  phone: string;
  addressLines: string[];
  hoursLines?: string[];
  socialItems: SocialItem[];
  legalBasePath?: string;
};

export function MainFooter({
  logoSrc,
  logoAlt = "Logo",
  email,
  phone,
  addressLines,
  hoursLines = ["-", "-"],
  socialItems,
  legalBasePath,
}: MainFooterProps) {
  const basePath = (legalBasePath ?? "").replace(/\/$/, "");

  const legalLinks =
    basePath === ""
      ? []
      : [
          { label: "Privacy Policy", href: `${basePath}/privacy-policy` },
          { label: "Cookie Policy", href: `${basePath}/cookie-policy` },
          { label: "Termini e Condizioni", href: `${basePath}/termini-condizioni` },
          { label: "Regolamento Palestra", href: `${basePath}/regolamento-palestra` },
        ];

  return (
    <footer className="main-footer">
      <div className="main-footer-inner">
        <div className="main-footer-logo-col">
          <Image src={logoSrc} alt={logoAlt} width={100} height={100} />
        </div>

        <div className="main-footer-col">
          <h3 className="main-footer-col-title">Come contattarci</h3>
          <p>{email}</p>
          <p>{phone}</p>
        </div>

        <div className="main-footer-col">
          <h3 className="main-footer-col-title">Dove ci trovi</h3>
          {addressLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="main-footer-col main-footer-col-legal">
          {legalLinks.length > 0 && (
            <>
              <h3 className="main-footer-col-title">Link utili</h3>
              <ul className="main-footer-legal-list">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="main-footer-col main-footer-col-social">
          <h3 className="main-footer-col-title">Segui sui nostri social</h3>
          <div className="main-footer-social-icons">
            {socialItems.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                aria-label={s.label ?? "Social link"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
