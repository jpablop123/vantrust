# Decisiones de diseño: propuestas sobre `fix/restaurar-ui`

Rama `feat/ui-propuestas`. Base intocable: navy, dorado, las palabras en dorado cursiva y el escudo.

Flujo: un cambio por commit, capturas del antes y el después en móvil y desktop, preview y espera de respuesta. Si la respuesta es ✅, el cambio queda; si es ❌, se hace `git revert` del commit; si es 🔁, se ajusta y se vuelve a mostrar.

| # | Propuesta | Commit | Capturas | Respuesta |
|---|---|---|---|---|
| 1 | Hero más grande: el titular pasa de 72 a 96 px en desktop (≥1280 px), de 60 a 72 px en tablet y de 44 a 46 px en móvil, con tracking más apretado. En desktop la columna del texto se ensancha para que quepa. | `6d1895d` | `propuestas/01-hero-grande/` | ✅ sí (2026-11-08) |
| 2 | /seguros como página de ventas: autoselección persona o empresa en el header, los 4 más cotizados (Automóviles, Salud, Hogar, Pyme) en bloques grandes con WhatsApp directo, el resto en filas compactas agrupadas por necesidad, franja de garantías y cierre "¿Aún no sabes cuál necesitas?". | `8de1b81` | `propuestas/02-seguros-ventas/` | ✅ sí (2026-11-08) |
| 3 | Campo de placa en el hero: campo con forma de placa (crema, navy y borde dorado) + "Cotizar gratis"; lleva al cotizador con la placa puesta y el cursor en "Tu nombre". "Hablar con asesor" queda debajo. **Ajuste:** "¿Otro seguro? Salud · Hogar · Para mi empresa" debajo del campo, texto "carro o moto" (acepta ABC12D), InitiateCheckout al enviar y placa verificada en el lead. | `9f7031d`, ajuste `61c6535` | `propuestas/03-placa-hero/` (ajuste: `*-v2-*`) | 🔁 ajusta → ✅ sí (2026-11-08) |
| 5 | Logos de aseguradoras aliadas. Primera versión: cuadrícula de 10 logos en tarjetas blancas (no gustó). **Ajuste:** franja de logos a color, sin tarjetas, que se desplaza sola y se pausa con el mouse; quieta y en filas con movimiento reducido. Fuentes en `logos-aseguradoras.md`. | `9ec769d`, ajuste `436fd07` | `propuestas/05-logos-aseguradoras/` (ajuste: `comparacion-ajuste-*`) | 🔁 ajusta → ✅ sí (2026-11-08) |
| 4 | ¿Por qué elegir VanTrust?: de 8 cajas iguales a 4 razones numeradas en filas (comparación, asesor, siniestros, renovaciones), con "Más que vender seguros, *protegemos su patrimonio*" en dorado cursiva y botón a WhatsApp. | `bfdd83e` | `propuestas/04-por-que-vantrust/` | ✅ sí (2026-11-08) |
| 6 | Preguntas frecuentes en pestañas (General, Personas, Empresas): 4 visibles por pestaña + "Ver más"; todas las respuestas siguen en el HTML para el schema FAQPage. En móvil la sección pasa de 2.264 a 1.386 px. | `12df764` | `propuestas/06-faq/` | ✅ sí (2026-11-08) |
