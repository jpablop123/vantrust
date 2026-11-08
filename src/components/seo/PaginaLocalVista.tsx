import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import JsonLd from "@/components/seo/JsonLd";
import {
  FaqSeccion,
  Secciones,
  TodoPendiente,
  WhatsAppCTA,
} from "@/components/seo/Contenido";
import { buildMetadata, publicable, serviceLd, type Miga } from "@/lib/seo";
import type { Ciudad } from "@/data/ciudades";
import type { PaginaLocal, PaginaRamo } from "@/data/seo/tipos";
import Link from "next/link";

export function metadataLocal(local: PaginaLocal) {
  return buildMetadata({
    title: local.title,
    description: local.description,
    path: `${local.rutaMadre}/${local.ciudad}`,
    // Anti-contenido delgado: sin aliados y asesor reales no se publica.
    noindex: !publicable(local.todo) || !local.asesor,
  });
}

/** Plantilla de página local (ramo + ciudad). */
export default function PaginaLocalVista({
  local,
  madre,
  ciudad,
  migaSeccion,
}: {
  local: PaginaLocal;
  madre: PaginaRamo;
  ciudad: Ciudad;
  migaSeccion: Miga;
}) {
  const path = `${local.rutaMadre}/${local.ciudad}`;
  return (
    <>
      <Navbar />
      <PaginaHeader
        migas={[migaSeccion, { nombre: madre.h1, path: madre.ruta }, { nombre: ciudad.nombre, path }]}
        h1={local.h1}
        respuesta={local.respuesta}
      />
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <TodoPendiente todo={local.todo} />
          <Secciones secciones={local.secciones} />

          {local.aliados.length > 0 && (
            <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4">Aliados en {ciudad.nombre}</h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-muted">
                {local.aliados.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          {local.asesor && (
            <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm flex items-center gap-5">
              <Image
                src={local.asesor.foto}
                alt={local.asesor.nombre}
                width={96}
                height={96}
                className="rounded-full object-cover w-24 h-24"
              />
              <div>
                <h2 className="text-lg font-bold text-primary">Tu asesor en {ciudad.nombre}</h2>
                <p className="text-primary font-semibold">{local.asesor.nombre}</p>
                <p className="text-muted text-sm">{local.asesor.cargo}</p>
              </div>
            </section>
          )}

          <FaqSeccion faqs={local.faqs} />

          <p className="text-muted">
            ¿Quieres ver todas las coberturas?{" "}
            <Link href={madre.ruta} className="text-primary font-semibold underline underline-offset-4">
              {madre.h1}
            </Link>
          </p>

          <WhatsAppCTA mensaje={`${madre.waMensaje} (${ciudad.nombre})`} />
        </div>
      </main>
      <Footer />
      <JsonLd
        data={serviceLd({
          nombre: local.h1,
          serviceType: madre.serviceType,
          descripcion: local.respuesta,
          path,
          ciudad: ciudad.nombre,
        })}
      />
    </>
  );
}
