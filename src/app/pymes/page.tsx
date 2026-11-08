import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import { WhatsAppCTA } from "@/components/seo/Contenido";
import { SeguroIcon } from "@/components/seguros/icons";
import { getSeguro } from "@/data/seguros";
import { PYMES } from "@/data/seo/paginas";
import { buildMetadata, publicable } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Seguros y pólizas para pymes en Barranquilla | VanTrust",
  description:
    "Pólizas de cumplimiento, responsabilidad civil, transporte y todo riesgo para pymes en Barranquilla. Compara aseguradoras con VanTrust. Escríbenos.",
  path: "/pymes",
});

export default function PymesIndex() {
  const paginas = PYMES.filter((p) => publicable(p.todo));
  return (
    <>
      <Navbar />
      <PaginaHeader
        migas={[{ nombre: "Pymes", path: "/pymes" }]}
        h1="Seguros y pólizas para pymes"
        respuesta="En VanTrust tramitamos las pólizas que tu empresa necesita para contratar y operar: cumplimiento para licitaciones, responsabilidad civil, transporte de mercancías y todo riesgo para tus activos. Comparamos varias aseguradoras desde Barranquilla."
      />
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {paginas.map((p) => {
              const s = p.seguroSlug ? getSeguro(p.seguroSlug) : undefined;
              return (
                <Link
                  key={p.ruta}
                  href={p.ruta}
                  className="group bg-white rounded-2xl border border-primary/10 hover:border-accent/40 p-6 shadow-sm transition-colors flex flex-col"
                >
                  <SeguroIcon name={s?.icon ?? "Briefcase"} className="w-7 h-7 text-accent mb-3" />
                  <h2 className="text-lg font-bold text-primary mb-1.5">{p.h1}</h2>
                  <p className="text-muted text-sm leading-relaxed flex-1">{s?.descripcion}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-sm">
                    Ver póliza <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="text-muted">
            ¿Buscas otra póliza empresarial? Mira todos los{" "}
            <Link href="/seguros" className="text-primary font-semibold underline underline-offset-4">
              seguros para empresas
            </Link>
            .
          </p>
          <WhatsAppCTA mensaje="Hola, quiero asesoría para los seguros de mi empresa." />
        </div>
      </main>
      <Footer />
    </>
  );
}
