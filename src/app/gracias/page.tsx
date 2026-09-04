import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GraciasContent from "./GraciasContent";

export const metadata: Metadata = {
  title: "¡Gracias por contactarnos! | VanTrust",
  description:
    "Recibimos tu solicitud de cotización. Un asesor de VanTrust se comunicará contigo muy pronto.",
  // Es una página de destino tras enviar el formulario, no contenido para buscar.
  robots: { index: false, follow: true },
};

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
