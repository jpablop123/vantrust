# Panel de leads: decisiones

| Parte | Qué incluye | Commit | Respuesta |
|---|---|---|---|
| 1 | Login, roles (admin/asesor), restablecer contraseña, registro de accesos | `31eb5fd` | ✅ |
| 2 | Mi cola del asesor, asignación por turnos, aviso por Telegram, historial | `bcfe667` | ✅ |
| 3 | Vista del admin con filtros, reasignación individual y en bloque, página Equipo | `345f8dd` | ✅ con ajustes: RLS confirmado y registro de quién ve cada lead |
| 3b | Ajustes: API pública cerrada (RLS + sin permisos de tabla), script de verificación, eventos "visto", "abrió WhatsApp" y "llamó" | ver git log | ⏳ |
| Siguiente | Ventas con prima, aseguradora y comisión (40 %); alerta de lead sin atender a los 5 min y reasignación a la hora | — | — |
| Después | Exportar a Excel y CSV, tablero de métricas | — | — |

Antes de producción: probar un lead completo en el preview conectado a Supabase y hacer el merge.
