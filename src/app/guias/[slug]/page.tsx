import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import JsonLd from "@/components/seo/JsonLd";
import { FaqSeccion, TodoPendiente, WhatsAppCTA } from "@/components/seo/Contenido";
import {
  ArticuloSecciones,
  IndiceMovil,
  LateralGuia,
  RelacionadasTarjetas,
} from "@/components/seo/Articulo";
import { GUIAS, getGuia, guiaPublicable, guiasDelMismoTema, minutosLectura } from "@/data/seo/guias";
import { getPaginaRamo } from "@/data/seo/paginas";
import { articleLd, buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  return buildMetadata({
    title: g.title,
    description: g.description,
    path: `/guias/${g.slug}`,
    type: "article",
    // Sin autor real y revisión de un asesor, la guía no se indexa.
    noindex: !guiaPublicable(g),
  });
}

function fecha(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function GuiaPage({ params }: { params: Params }) {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) notFound();
  const ramo = getPaginaRamo(g.ramoRuta);
  // En producción solo se enlazan guías publicadas; en previews, también los
  // borradores, para revisar el recorrido completo.
  const relacionadas = guiasDelMismoTema(g.slug).filter(
    (x) => process.env.VERCEL_ENV !== "production" || guiaPublicable(x)
  );
  const path = `/guias/${g.slug}`;

  return (
    <>
      <Navbar />
      <PaginaHeader
        amplio
        migas={[
          { nombre: "Guías", path: "/guias" },
          { nombre: g.titulo, path },
        ]}
        h1={g.titulo}
        respuesta={g.respuesta}
      >
        <div className="mt-6 flex items-center gap-3 text-sm text-white/60">
          {g.autor ? (
            <>
              <Image
                src={g.autor.foto}
                alt={g.autor.nombre}
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
              <span>
                Por <strong className="text-white/85">{g.autor.nombre}</strong>, {g.autor.cargo}
              </span>
            </>
          ) : (
            <span>Equipo VanTrust</span>
          )}
          <span aria-hidden>·</span>
          <span>
            Actualizado el <time dateTime={g.actualizado}>{fecha(g.actualizado)}</time>
          </span>
        </div>
      </PaginaHeader>
      <main className="bg-surface py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <article className="min-w-0 max-w-3xl">
            <TodoPendiente todo={g.todo} />
            <IndiceMovil secciones={g.secciones} conFaq={g.faqs.length > 0} />
            <ArticuloSecciones secciones={g.secciones} />
            <div className="mt-14 space-y-8">
              <FaqSeccion faqs={g.faqs} />
              {ramo && (
                <p className="text-muted">
                  Más información:{" "}
                  <Link href={ramo.ruta} className="text-primary font-semibold underline underline-offset-4">
                    {ramo.h1}
                  </Link>
                </p>
              )}
              <WhatsAppCTA
                mensaje={g.waMensaje}
                titulo="¿Te ayudamos con tu caso?"
                texto="Escríbenos por WhatsApp y un asesor de VanTrust te responde con opciones de varias aseguradoras."
              />
            </div>
            <RelacionadasTarjetas guias={relacionadas} />
          </article>
          <LateralGuia
            secciones={g.secciones}
            conFaq={g.faqs.length > 0}
            minutos={minutosLectura(g)}
            waMensaje={g.waMensaje}
          />
        </div>
      </main>
      <Footer />
      <JsonLd
        data={articleLd({
          titulo: g.titulo,
          descripcion: g.description,
          path,
          autor: g.autor,
          publicado: g.publicado,
          actualizado: g.actualizado,
        })}
      />
    </>
  );
}
