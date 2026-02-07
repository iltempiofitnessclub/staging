import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Il Tempio Fitness Club - Bari Palese",
  description: "Centro fitness a Bari - Palese. Sala pesi, functional training e corsi di gruppo.",
  icons: {
    icon: [
      { url: "/tempio-logo.png" },
      { url: "/tempio-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/tempio-logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/tempio-logo.png",
    apple: "/tempio-logo.png",
  },
};

export default function TempioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
