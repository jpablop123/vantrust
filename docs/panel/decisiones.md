# Panel de leads: decisiones

| Parte | Qué incluye | Commit | Respuesta |
|---|---|---|---|
| 1 | Login, roles (admin/asesor), restablecer contraseña, registro de accesos | `31eb5fd` | ✅ |
| 2 | Mi cola del asesor, asignación por turnos, aviso por Telegram, historial | `bcfe667` | ✅ |
| 3 | Vista del admin con filtros, reasignación individual y en bloque, página Equipo | `345f8dd` | ✅ con ajustes: RLS confirmado y registro de quién ve cada lead |
| 3b | Ajustes: API pública cerrada (RLS + sin permisos de tabla), script de verificación, eventos "visto", "abrió WhatsApp" y "llamó" | ver git log | ⏳ |
| 4a | Ventas, renovaciones y comisión (% por ramo, 40 % para la página, solo admin) | `491779f` | ⏳ |
| 4b | Alerta de lead sin atender (5 min, admin) y reasignación (1 h, máx. 2), en horario laboral | ver git log | ⏳ |
| Después | Exportar a Excel y CSV, tablero de métricas | — | — |

Antes de producción: probar un lead completo en el preview conectado a Supabase y hacer el merge.
