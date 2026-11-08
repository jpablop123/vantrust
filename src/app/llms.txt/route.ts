// /llms.txt (formato llmstxt.org): resumen de la entidad para asistentes de IA.
// Se genera desde los mismos datos del sitio para que el NAP no se desvíe.

import { NEGOCIO } from "@/lib/negocio";
import { todasLasRutas } from "@/lib/rutas";
import { abs } from "@/lib/seo";
import { PERSONAS, EMPRESAS } from "@/data/seguros";

export const dynamic = "force-static";

export function GET() {
  const rutas = todasLasRutas().filter((r) => r.indexable);
  const lista = (grupo: string) =>
    rutas
      .filter((r) => r.grupo === grupo)
      .map((r) => `- [${r.titulo}](${abs(r.path)})`)
      .join("\n");
  const d = NEGOCIO.direccion;

  const texto = `# ${NEGOCIO.nombre}

> ${NEGOCIO.nombre} (${NEGOCIO.razonSocial}) es una agencia de seguros con oficina en ${d.ciudad}, ${d.region} (Colombia). Asesora a personas y empresas, compara opciones de ${NEGOCIO.aseguradoras.length} aseguradoras y acompaña a sus clientes en los siniestros. La asesoría no tiene costo.

## Datos de contacto

- Dirección: ${d.calle}, ${d.ciudad}, ${d.region}, Colombia
- Teléfono y WhatsApp: ${NEGOCIO.telefonoVisible}
- Correo: ${NEGOCIO.email}
- Horario: ${NEGOCIO.horarioVisible}
- Sitio web: ${NEGOCIO.url}
- Zona de atención: ${NEGOCIO.areaServed.join(", ")}

## Aseguradoras con las que trabaja

${NEGOCIO.aseguradoras.map((a) => `- ${a}`).join("\n")}

## Ramos que ofrece

- Personas: ${PERSONAS.map((s) => s.nombre).join(", ")}
- Empresas: ${EMPRESAS.map((s) => s.nombre).join(", ")}

## Páginas principales

${lista("principal")}

## Seguros para personas

${lista("personas")}

## Seguros y pólizas para empresas

${lista("empresas")}
${lista("local") ? `\n## Páginas locales\n\n${lista("local")}\n` : ""}${lista("guia") ? `\n## Guías\n\n${lista("guia")}\n` : ""}`;

  return new Response(texto, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
