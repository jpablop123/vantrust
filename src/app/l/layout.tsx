import type { Metadata } from "next";

// Las landings de anuncios (/l/*) no compiten en orgánico: noindex para todas.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LandingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
