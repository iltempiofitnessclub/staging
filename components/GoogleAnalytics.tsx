"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function GoogleAnalytics() {
  const pathname = usePathname();
  
  // Non caricare Google Analytics nelle pagine admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XPSQCJ0ZL1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XPSQCJ0ZL1');
        `}
      </Script>
    </>
  );
}
