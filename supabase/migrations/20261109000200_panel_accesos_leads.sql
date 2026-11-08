-- Panel de leads: ajustes de la parte 3.
--
-- 1) Defensa en profundidad: además de RLS sin políticas, la API pública
--    (roles anon y authenticated) no tiene ningún permiso sobre estas tablas.
--    Solo el servidor, con la service role, lee y escribe. Así una política
--    agregada por error en el futuro tampoco abriría los datos.
-- 2) El historial registra también quién VIO cada lead, no solo quién lo cambió.
--
-- Cómo aplicarla: Supabase > SQL Editor > pega este archivo > Run.

revoke all on table public.leads, public.renovaciones, public.asesores,
                    public.panel_accesos, public.lead_eventos
  from anon, authenticated;

revoke all on sequence public.panel_accesos_id_seq, public.lead_eventos_id_seq
  from anon, authenticated;

-- Funciones de trigger: no se pueden llamar directo, pero sin permisos igual.
revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.lead_evento_creado() from public, anon, authenticated;

-- Nuevos tipos de evento: visto, abrió WhatsApp, llamó.
alter table public.lead_eventos drop constraint if exists lead_eventos_tipo_check;
alter table public.lead_eventos add constraint lead_eventos_tipo_check check (tipo in (
  'creado', 'asignado', 'reasignado', 'contactado', 'resultado',
  'seguimiento', 'nota', 'cotizado', 'ganado', 'perdido',
  'archivado', 'reabierto', 'visto', 'whatsapp', 'llamada'));

-- Para deduplicar "visto" rápido (un registro por persona y lead cada 30 min).
create index if not exists lead_eventos_vistas_idx
  on public.lead_eventos (lead_id, asesor_id, tipo, created_at desc);
