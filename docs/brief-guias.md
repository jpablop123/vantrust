# Brief para redactar guías de VanTrust

## Contexto
VanTrust Agencia de Seguros LTDA., agencia (intermediario) en Barranquilla, Colombia. Trabaja con 10 aseguradoras: Allianz, AXA Colpatria, Coomeva, Equidad Seguros, HDI Seguros, Mundial Seguros, SBS Seguros, Seguros Bolívar, Sura y Zurich.
Lo que la hace distinta: un asesor humano, respuesta rápida por WhatsApp y acompañamiento cuando hay un siniestro. No compite por precio.
Lo que más dinero le deja: pymes (cumplimiento, RC, transporte) y auto todo riesgo.
Las guías existen para posicionarse en Google y en las IA (ChatGPT, Gemini, Perplexity) y para convertir lectores en leads de WhatsApp.

## Reglas obligatorias
1. **Nada inventado.** Ni testimonios, ni clientes, ni cifras, ni precios, ni estadísticas, ni porcentajes de mercado. Si un número no tiene una fuente oficial que encontraste, no va. En su lugar explica de qué depende.
2. **Casos ilustrativos.** Cada guía abre (primera sección) con un caso: cómo a una persona o empresa le cambió la situación por tener, o no tener, el seguro adecuado.
   - Debe ser **hipotético y estar rotulado**. El título de la sección empieza por "Caso ilustrativo:" y el primer párrafo dice textualmente: "Este es un ejemplo para explicar cómo funciona; no es un cliente real."
   - Personaje creíble y de Barranquilla o la Costa cuando encaje (ej.: un contratista de obras en Soledad, una tienda en el centro, una familia en el norte de Barranquilla).
   - Sin cifras de dinero inventadas presentadas como reales. Si usas montos para explicar una cuenta (un deducible, por ejemplo), dilo claro: "supongamos un valor de…". Usa números redondos y obviamente ilustrativos.
   - Cuenta el antes, lo que pasó y el después, con la lección práctica.
3. **SOAT.** VanTrust NO vende SOAT. No lo ofrezcas ni lo pongas en CTA. Solo puedes mencionarlo como dato informativo cuando sea imprescindible (ej.: en un choque con heridos, el SOAT atiende a los lesionados), sin sugerir que VanTrust lo vende.
4. **No prometas resultados** ("te garantizamos que te pagan"). Sí puedes decir que el asesor acompaña el trámite.
5. **No afirmes datos específicos de una aseguradora concreta** (deducibles, líneas, coberturas de un producto) salvo que estén verificados con una fuente oficial. Habla en general: "según la póliza", "en muchas pólizas".
6. **Normas.** Cita leyes o artículos (Código de Comercio, Ley 80 de 1993, Ley 1150 de 2007, Decreto 1082 de 2015, Ley 1328 de 2009, Ley 1480 de 2011, Ley 820 de 2003, Código Nacional de Tránsito, etc.) solo si las verificaste con WebSearch en una fuente oficial o confiable: Secretaría del Senado, Función Pública (funcionpublica.gov.co/eva), Superintendencia Financiera, Fasecolda, Colombia Compra Eficiente, MinTransporte. Anota cada referencia en `todo` como "Verificar con el asesor: <norma> — <URL fuente>". Si no la pudiste verificar, no la cites.
7. **Tono.** Español de Colombia, tuteo, claro y concreto, sin relleno ni frases de marketing vacías. Frases cortas, para alguien que no sabe de seguros.
8. **Local.** Ángulo Barranquilla/Costa Caribe cuando aporte de verdad (arroyos, puerto, calor y lluvias, tráfico de la Circunvalar, vías a Cartagena y Santa Marta). No lo fuerces.
9. **No dupliques** las guías existentes en `src/data/seo/guias.ts`: qué es la póliza de cumplimiento, requisitos de la póliza de cumplimiento, cumplimiento vs. RC. Enlázalas con texto si aplica, no repitas su contenido.

## Formato técnico
- Tipo `Guia` en `src/data/seo/tipos.ts`. Léelo, y lee también `src/data/seo/guias.ts` como ejemplo de estilo y nivel.
- Bloques disponibles: `p`, `lista`, `pasos`, `tabla` (con caption, columnas y filas). Nada de markdown ni HTML dentro de los textos.
- Campos:
  - `slug`: el que se te asigne.
  - `titulo`: H1 en forma de pregunta, como la buscaría la gente.
  - `title`: 60 caracteres o menos, sin "| VanTrust" (la plantilla lo agrega).
  - `description`: 155 caracteres o menos, con un llamado a la acción suave.
  - `respuesta`: la respuesta directa en 2 o 3 frases. Es lo que citan Google y las IA, así que debe poder leerse sola.
  - `secciones`: 4 a 6. La primera es el caso ilustrativo. Incluye al menos una tabla o unos pasos.
  - `faqs`: 4 o 5 preguntas reales de la gente, con respuestas cortas.
  - `ramoRuta`: uno de estos valores exactos: `/pymes/polizas-de-cumplimiento`, `/pymes/responsabilidad-civil`, `/pymes/transporte-de-mercancias`, `/pymes/todo-riesgo-pyme`, `/seguros/automoviles`, `/seguros/salud`, `/seguros/vida`, `/seguros/hogar`, `/seguros/arriendo`.
  - `waMensaje`: el mensaje de WhatsApp que enviaría el lector, en primera persona. Ej.: "Hola, leí la guía del deducible y quiero cotizar mi carro."
  - `autor: null`, `revisadoPor: null`, `publicado: "2026-11-08"`, `actualizado: "2026-11-08"`.
  - `todo`: `[...PENDIENTE_REVISION, PENDIENTE_CASO, ...tus "Verificar con el asesor: …"]`.
- Extensión: entre 900 y 1.500 palabras de contenido real por guía.
- Archivo: `src/data/seo/guias/<grupo>.ts`.
  ```ts
  import type { Guia } from "../tipos";
  import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";
  export const GUIAS_<GRUPO>: Guia[] = [ … ];
  ```
- Para verificar: `npx tsc --noEmit -p . 2>&1 | grep "data/seo"` no debe mostrar nada. Ignora los errores de imágenes `.png`, son del entorno.
- No hagas commit. No toques otros archivos. Trabaja solo en `/Users/juanpinto/vantrust/.claude/worktrees/guias`.

## Al terminar, reporta
- Los slugs, con su `title` y el número de caracteres.
- Las normas que citaste, con su URL.
- Cualquier dato que quisiste poner y quitaste por no poder verificarlo, para que el asesor lo complete.
