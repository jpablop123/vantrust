# SEO + AEO — estado y pendientes

Complementa PLAN-SEO. Todo el contenido vive en datos; las páginas son plantillas.

| Qué | Dónde |
|---|---|
| NAP y datos de la entidad (única fuente) | `src/lib/negocio.ts` |
| Metadata, JSON-LD, regla `publicable()` | `src/lib/seo.ts` |
| Páginas madre de ramo (SEO) | `src/data/seo/paginas.ts` |
| Páginas locales (ramo + ciudad) | `src/data/seo/locales.ts`, `src/data/ciudades.ts` |
| Guías | `src/data/seo/guias.ts` |
| TODOs de /siniestros y /sobre-vantrust | `src/data/seo/pendientes.ts` |
| Inventario de rutas (sitemap + llms.txt) | `src/lib/rutas.ts` |

**Regla de publicación:** si una página tiene algún `todo`, sale con `noindex`, fuera del sitemap y de `llms.txt`, y no se enlaza desde otras páginas. En `npm run dev` los TODO se ven como un recuadro amarillo; en producción no. Las guías además necesitan `autor` y `revisadoPor`. Las páginas locales necesitan `asesor`.

## Datos reales que faltan (bloquean la indexación)

- **/sobre-vantrust:** número RUI, año de fundación, equipo (nombre, cargo, foto), código postal, coordenadas, URL de Google Business, confirmar NIT con el RUT.
- **/siniestros:** línea de asistencia de cada aseguradora, revisión legal del asesor, tiempo real de respuesta.
- **/seguros/arriendo:** confirmar que se vende y con qué aseguradoras, y las coberturas reales. Si se confirma, agregarlo a `seguros.ts`.
- **/pymes/polizas-de-cumplimiento/barranquilla** y **/seguros/automoviles/barranquilla:** asesor local, talleres en convenio (autos), experiencia local verificable, FAQ reales.
- **Guías (3 borradores):** autor real + revisión de un asesor + verificar las referencias normativas (Ley 80/1993, Ley 1150/2007, Decreto 1082/2015).
- **Guías sin borrador (9):** ver `GUIAS_PENDIENTES` en `guias.ts`.

## Keywords objetivo por página (para seguir en Search Console)

| Página | Keyword principal | Secundarias |
|---|---|---|
| `/` | agencia de seguros Barranquilla | agencia de seguros, cotizar seguros |
| `/pymes/polizas-de-cumplimiento` | póliza de cumplimiento | póliza de cumplimiento licitación, póliza de seriedad de la oferta |
| `/pymes/polizas-de-cumplimiento/barranquilla` | póliza de cumplimiento Barranquilla | pólizas para contratistas Barranquilla |
| `/pymes/responsabilidad-civil` | póliza de responsabilidad civil extracontractual | póliza RCE empresa |
| `/pymes/transporte-de-mercancias` | seguro de transporte de mercancías | póliza de transporte automática |
| `/pymes/todo-riesgo-pyme` | seguro todo riesgo empresa | seguro daños materiales pyme |
| `/pymes` | seguros para pymes Barranquilla | pólizas empresariales |
| `/seguros/automoviles` | seguro todo riesgo carro | cotizar seguro de carro |
| `/seguros/automoviles/barranquilla` | seguro de carro Barranquilla | seguro todo riesgo Barranquilla |
| `/seguros/salud` | seguro de salud complementario | póliza de salud vs prepagada |
| `/seguros/vida` | seguro de vida | cuánto asegurar seguro de vida |
| `/seguros/hogar` | seguro de hogar | seguro de hogar terremoto |
| `/seguros/arriendo` | seguro de arrendamiento | seguro de arriendo propietarios |
| `/siniestros` | qué hacer si choco | reclamar seguro de carro |
| `/aseguradoras` | aseguradoras en Colombia | agencia que compara aseguradoras |
| Guía cumplimiento | qué es una póliza de cumplimiento | cuándo piden póliza de cumplimiento |
| Guía requisitos | requisitos póliza de cumplimiento | documentos póliza de cumplimiento |
| Guía cumplimiento vs RC | diferencia póliza de cumplimiento y responsabilidad civil | — |

## Medición

- GA4 `organic_lead`: Lead cuyo **primer toque** fue un buscador (Google, Bing, DuckDuckGo, Yahoo, Ecosia, Brave). También existe `ai_lead` (ChatGPT, Perplexity, Gemini, Copilot, Claude). Todos los eventos GA4 llevan `canal_primer_toque`. El primer toque se guarda en `localStorage["vt-primer-toque"]` y no toca `vt-atribucion`.
- Marcar `organic_lead` como evento clave en GA4.

## Pasos manuales (fuera del código)

1. Google Search Console: verificar el dominio con un registro TXT en GoDaddy y enviar `https://vantrust.com.co/sitemap.xml`.
2. Bing Webmaster Tools: importar desde Search Console (ChatGPT busca con Bing).
3. Rich Results Test de la home, `/seguros/automoviles`, `/pymes/polizas-de-cumplimiento` y una guía, una vez estén desplegadas en el dominio. Anotar el resultado aquí. Nota: desde 2023 Google solo muestra resultados enriquecidos de FAQ para sitios de gobierno y salud. El FAQPage igual sirve para que Google y la IA entiendan la página, pero no esperen los desplegables en los resultados.
4. Vercel: `vantrust.com.co` como dominio principal. El 301 desde `vantrust.vercel.app` y `www` ya está en `next.config.ts`.
5. Revisión AEO mensual: preguntar a ChatGPT, Gemini y Perplexity "mejor agencia de seguros en Barranquilla", "cómo sacar póliza de cumplimiento en Barranquilla", etc. Anotar si aparece VanTrust y a quién citan en su lugar.

## Resultados (build local, Lighthouse móvil)

| Página | Performance | SEO | LCP |
|---|---|---|---|
| `/` | 100 (antes 74) | 100 | 0,9 s |
| `/seguros/automoviles` | 100 | 100 | 0,9 s |
| `/pymes/polizas-de-cumplimiento` | 100 | 100 | 0,9 s |

La home estaba en 74 por la textura de ruido (SVG `feTurbulence`), que bloqueaba el hilo principal unos 1,5 s. Se reemplazó por un PNG (`public/noise.png`).
