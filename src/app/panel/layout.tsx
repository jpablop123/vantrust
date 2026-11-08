import type { Metadata } from "next";

// El panel es privado: fuera de buscadores.
export const metadata: Metadata = {
  title: "Panel | VanTrust",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface text-primary">{children}</div>;
}
