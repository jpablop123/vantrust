import RamoCards from "@/components/seo/RamoCards";
import {
  EnlacesLocales,
  FaqSeccion,
  GuiasRelacionadas,
  Secciones,
  TodoPendiente,
} from "@/components/seo/Contenido";
import JsonLd from "@/components/seo/JsonLd";
import { CIUDADES } from "@/data/ciudades";
import { guiasEnlazables } from "@/data/seo/guias";
import { localesDe } from "@/data/seo/locales";
import { publicable, serviceLd } from "@/lib/seo";
import type { Seguro } from "@/data/seguros";
import type { PaginaRamo } from "@/data/seo/tipos";

/**
 * Cuerpo de una página madre de ramo: coberturas (seguros.ts), contenido SEO,
 * FAQ, guías y páginas locales. Solo se enlaza lo que ya está publicado.
 */
export default function RamoCuerpo({
  seguro,
  pagina,
}: {
  seguro?: Seguro;
  pagina?: PaginaRamo;
}) {
  const locales = pagina
    ? localesDe(pagina.ruta)
        .filter((l) => publicable(l.todo))
        .map((l) => ({
          href: `${pagina.ruta}/${l.ciudad}`,
          texto: `${pagina.h1} en ${CIUDADES.find((c) => c.slug === l.ciudad)?.nombre ?? l.ciudad}`,
        }))
    : [];

  return (
    <>
      <TodoPendiente todo={pagina?.todo} />
      {seguro && <RamoCards seguro={seguro} />}
      {pagina && <Secciones secciones={pagina.secciones} />}
      {pagina && <FaqSeccion faqs={pagina.faqs} />}
      <GuiasRelacionadas guias={guiasEnlazables(pagina?.guias)} />
      <EnlacesLocales enlaces={locales} />
      <JsonLd
        data={serviceLd({
          nombre: pagina?.h1 ?? `Seguro de ${seguro?.nombre ?? ""}`,
          serviceType: pagina?.serviceType ?? `Seguro de ${seguro?.nombre ?? ""}`,
          descripcion: pagina?.respuesta ?? seguro?.descripcion ?? "",
          path: pagina?.ruta ?? `/seguros/${seguro?.slug}`,
        })}
      />
    </>
  );
}
