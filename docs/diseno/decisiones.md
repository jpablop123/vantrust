# Decisiones de diseño: propuestas sobre `fix/restaurar-ui`

Rama `feat/ui-propuestas`. Base intocable: navy, dorado, las palabras en dorado cursiva y el escudo.

Flujo: un cambio por commit, capturas del antes y el después en móvil y desktop, preview y espera de respuesta. Si la respuesta es ✅, el cambio queda; si es ❌, se hace `git revert` del commit; si es 🔁, se ajusta y se vuelve a mostrar.

| # | Propuesta | Commit | Capturas | Respuesta |
|---|---|---|---|---|
| 1 | Hero más grande: el titular pasa de 72 a 96 px en desktop (≥1280 px), de 60 a 72 px en tablet y de 44 a 46 px en móvil, con tracking más apretado. En desktop la columna del texto se ensancha para que quepa. | `6d1895d` | `propuestas/01-hero-grande/` | ✅ sí (2026-11-08) |
| 2 | /seguros como página de ventas: autoselección persona o empresa en el header, los 4 más cotizados (Automóviles, Salud, Hogar, Pyme) en bloques grandes con WhatsApp directo, el resto en filas compactas agrupadas por necesidad, franja de garantías y cierre "¿Aún no sabes cuál necesitas?". | `8de1b81` | `propuestas/02-seguros-ventas/` | ✅ sí (2026-11-08) |
| 3 | Campo de placa en el hero: campo con forma de placa (crema, navy y borde dorado) + "Cotizar gratis"; lleva al cotizador con la placa puesta y el cursor en "Tu nombre". "Hablar con asesor" queda debajo. **Ajuste:** "¿Otro seguro? Salud · Hogar · Para mi empresa" debajo del campo, texto "carro o moto" (acepta ABC12D), InitiateCheckout al enviar y placa verificada en el lead. | `9f7031d`, ajuste `61c6535` | `propuestas/03-placa-hero/` (ajuste: `*-v2-*`) | 🔁 ajusta (2026-11-08) → ⏳ pendiente |
