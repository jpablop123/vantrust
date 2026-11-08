-- Panel de leads: alerta y reasignación de leads sin atender.
--
-- Lo dispara cada minuto /api/cron/leads-sin-atender (ver docs/panel/README.md
-- para programarlo con pg_cron). Aquí solo van las columnas de control y la
-- función que reasigna de forma atómica.
--
-- Cómo aplicarla: Supabase > SQL Editor > pega este archivo > Run.

alter table public.leads
  add column if not exists alerta_admin_at timestamptz,
  add column if not exists reasignaciones_auto int not null default 0;

create index if not exists leads_sin_atender_idx
  on public.leads (etapa, asignado_at)
  where etapa = 'nuevo' and primer_contacto_at is null;

-- Pasa el lead al siguiente asesor activo por turno (nunca al que lo tenía).
-- Reinicia el reloj de la alerta y cuenta la reasignación automática.
create or replace function public.reasignar_sin_atender(p_lead uuid)
returns uuid language plpgsql as $$
declare
  v_actual  uuid;
  v_elegido uuid;
begin
  perform pg_advisory_xact_lock(hashtext('vantrust.asignar_lead'));

  select asignado_a into v_actual from public.leads where id = p_lead for update;
  if not found then return null; end if;

  with turno as (
    select id, row_number() over (order by created_at, id) as n
    from public.asesores
    where rol = 'asesor' and activo and acceso
  )
  select t.id into v_elegido from turno t
  where t.id is distinct from v_actual
    and t.n > coalesce((select n from turno where id = v_actual), 0)
  order by t.n limit 1;

  if v_elegido is null then
    with turno as (
      select id, row_number() over (order by created_at, id) as n
      from public.asesores
      where rol = 'asesor' and activo and acceso
    )
    select t.id into v_elegido from turno t
    where t.id is distinct from v_actual
    order by t.n limit 1;
  end if;

  if v_elegido is null then return null; end if; -- no hay otro asesor activo

  update public.leads
  set asignado_a = v_elegido,
      asignado_at = clock_timestamp(),
      alerta_admin_at = null,
      reasignaciones_auto = reasignaciones_auto + 1
  where id = p_lead;

  insert into public.lead_eventos (lead_id, asesor_id, tipo, detalle)
  values (p_lead, v_elegido, 'reasignado',
          jsonb_build_object('regla', 'sin_atender', 'de', v_actual, 'a', v_elegido));
  return v_elegido;
end $$;

revoke all on function public.reasignar_sin_atender(uuid) from public, anon, authenticated;
