import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Area amministrativa",
  icons: {
    icon: "/tempio-logo-monogram.png", // Usa il logo Tempio per admin
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
