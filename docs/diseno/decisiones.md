# Decisiones de diseño: propuestas sobre `fix/restaurar-ui`

Rama `feat/ui-propuestas`. Base intocable: navy, dorado, las palabras en dorado cursiva y el escudo.

Flujo: un cambio por commit, capturas del antes y el después en móvil y desktop, preview y espera de respuesta. Si la respuesta es ✅, el cambio queda; si es ❌, se hace `git revert` del commit; si es 🔁, se ajusta y se vuelve a mostrar.

| # | Propuesta | Commit | Capturas | Respuesta |
|---|---|---|---|---|
| 1 | Hero más grande: el titular pasa de 72 a 96 px en desktop (≥1280 px), de 60 a 72 px en tablet y de 44 a 46 px en móvil, con tracking más apretado. En desktop la columna del texto se ensancha para que quepa. | `6d1895d` | `propuestas/01-hero-grande/` | ⏳ pendiente |
