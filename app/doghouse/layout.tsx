import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DogHouse Boxing - Bari Palese",
  description: "Palestra di boxe a Bari - Palese. Corsi per tutte le età e livelli.",
  icons: {
    icon: [
      { url: "/doghouse-logo-monogram.png" },
      { url: "/doghouse-logo-monogram.png", sizes: "32x32", type: "image/png" },
      { url: "/doghouse-logo-monogram.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/doghouse-logo-monogram.png",
    apple: "/doghouse-logo-monogram.png",
  },
};

export default function DoghouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
