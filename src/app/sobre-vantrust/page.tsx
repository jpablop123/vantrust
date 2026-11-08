import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import { TodoPendiente, WhatsAppCTA } from "@/components/seo/Contenido";
import { NEGOCIO } from "@/lib/negocio";
import { TODO_SOBRE } from "@/data/seo/pendientes";
import { buildMetadata, publicable } from "@/lib/seo";

// Hechos verificables que la IA puede citar. Nada inventado: lo que falte va
// en TODO y la página queda en noindex.
const TODO = TODO_SOBRE;

export const metadata: Metadata = buildMetadata({
  title: "Sobre VanTrust, agencia de seguros en Barranquilla",
  description:
    "VanTrust es una agencia de seguros inscrita en el RUI, con oficina en Barranquilla y 10 aseguradoras aliadas. Conoce nuestros datos y escríbenos.",
  path: "/sobre-vantrust",
  noindex: !publicable(TODO),
});

export default function SobreVantrust() {
  const d = NEGOCIO.direccion;
  const hechos: [string, string][] = [
    ["Razón social", NEGOCIO.razonSocial],
    ["NIT", NEGOCIO.nit],
    ["Tipo de entidad", "Agencia de seguros (intermediario de seguros)"],
    ["Registro", "Inscrita ante la Superintendencia Financiera de Colombia en el RUI"],
    ["Oficina", `${d.calle}, ${d.ciudad}, ${d.region}`],
    ["Teléfono y WhatsApp", NEGOCIO.telefonoVisible],
    ["Correo", NEGOCIO.email],
    ["Horario", NEGOCIO.horarioVisible],
    ["Aseguradoras aliadas", NEGOCIO.aseguradoras.join(", ")],
  ];
  return (
    <>
      <Navbar />
      <PaginaHeader
        migas={[{ nombre: "Sobre VanTrust", path: "/sobre-vantrust" }]}
        h1="Sobre VanTrust"
        respuesta={`VanTrust (${NEGOCIO.razonSocial}) es una agencia de seguros con oficina en Barranquilla. Asesora a personas y empresas, compara opciones de ${NEGOCIO.aseguradoras.length} aseguradoras y acompaña a sus clientes cuando tienen un siniestro.`}
      />
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <TodoPendiente todo={TODO} />
          <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-4">Datos de la empresa</h2>
            <dl className="divide-y divide-primary/10">
              {hechos.map(([k, v]) => (
                <div key={k} className="grid sm:grid-cols-3 gap-1 py-3">
                  <dt className="font-semibold text-primary">{k}</dt>
                  <dd className="sm:col-span-2 text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
          <WhatsAppCTA mensaje="Hola, quiero hablar con un asesor de VanTrust." />
        </div>
      </main>
      <Footer />
    </>
  );
}
