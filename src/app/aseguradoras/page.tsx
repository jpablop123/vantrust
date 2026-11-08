import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import { FaqSeccion, WhatsAppCTA } from "@/components/seo/Contenido";
import { INSURERS } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Aseguradoras con las que trabajamos | VanTrust",
  description: `VanTrust compara opciones de ${INSURERS.length} aseguradoras en Colombia, entre ellas ${INSURERS.slice(0, 3).join(", ")}. Cotiza con todas desde un solo asesor.`,
  path: "/aseguradoras",
});

const FAQS = [
  {
    pregunta: "¿Por qué cotizar con una agencia y no directo con la aseguradora?",
    respuesta:
      "Porque con una sola solicitud ves opciones de varias aseguradoras y un asesor te explica las diferencias de cobertura, deducible y condiciones.",
  },
  {
    pregunta: "¿Todas las aseguradoras ofrecen todos los seguros?",
    respuesta:
      "No. Cada aseguradora tiene sus propios productos y condiciones. Tu asesor cotiza con las que ofrecen el seguro que necesitas.",
  },
];

export default function Aseguradoras() {
  return (
    <>
      <Navbar />
      <PaginaHeader
        migas={[{ nombre: "Aseguradoras", path: "/aseguradoras" }]}
        h1="Aseguradoras con las que trabaja VanTrust"
        respuesta={`VanTrust es una agencia de seguros de Barranquilla que trabaja con ${INSURERS.length} aseguradoras: ${INSURERS.join(", ")}. Comparamos sus opciones para encontrar la que mejor se ajusta a ti o a tu empresa.`}
      />
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-4">Nuestras aseguradoras aliadas</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INSURERS.map((a) => (
                <li
                  key={a}
                  className="rounded-xl border border-primary/10 bg-surface px-4 py-3 text-primary font-semibold text-center"
                >
                  {a}
                </li>
              ))}
            </ul>
          </section>
          <FaqSeccion faqs={FAQS} />
          <WhatsAppCTA mensaje="Hola, quiero comparar opciones de varias aseguradoras." />
        </div>
      </main>
      <Footer />
    </>
  );
}
