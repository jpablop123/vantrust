import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GraciasContent from "./GraciasContent";

export const metadata: Metadata = buildMetadata({
  title: "¡Gracias por contactarnos! | VanTrust",
  description:
    "Recibimos tu solicitud de cotización. Un asesor de VanTrust se comunicará contigo muy pronto.",
  path: "/gracias",
  noindex: true,
});

export default function Gracias() {
  return (
    <>
      <Navbar />
      <main>
        <GraciasContent />
      </main>
      <Footer />
    </>
  );
}
