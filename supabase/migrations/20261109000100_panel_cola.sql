-- Panel de leads, parte 2: seguimiento comercial, asignación e historial.
--
-- `estado` (parcial/completo) sigue diciendo si la persona llenó el paso 2 del
-- formulario. El avance comercial va en `etapa`, aparte.
--
-- Cómo aplicarla: Supabase > SQL Editor > pega este archivo > Run.

-- ── Seguimiento comercial en leads ─────────────────────────────────────────
alter table public.leads
  add column if not exists etapa text not null default 'nuevo'
    check (etapa in ('nuevo', 'contactado', 'cotizado', 'ganado', 'perdido', 'archivado')),
  add column if not exists asignado_a uuid references public.asesores (id) on delete set null,
  add column if not exists asignado_at timestamptz,
  add column if not exists primer_contacto_at timestamptz,
  add column if not exists ultimo_contacto_at timestamptz,
  add column if not exists resultado_contacto text
    check (resultado_contacto in ('interesado', 'no_contesto', 'lo_va_a_pensar', 'precio_alto', 'ya_tiene', 'otro')),
  add column if not exists proximo_seguimiento timestamptz,
  add column if not exists nota_seguimiento text,
  add column if not exists prima_valor numeric(14, 2) check (prima_valor is null or prima_valor >= 0),
  add column if not exists aseguradora_cierre text,
  add column if not exists cerrado_at timestamptz,
  add column if not exists motivo_perdida text
    check (motivo_perdida in ('precio', 'ya_tiene', 'no_contesta', 'no_califica', 'no_le_interesa', 'otro')),
  -- Últimos 10 dígitos: agrupa a la misma persona aunque escriba "+57 300…".
  add column if not exists telefono_norm text
    generated always as (right(regexp_replace(telefono, '\D', '', 'g'), 10)) stored;

create index if not exists leads_cola_idx on public.leads (asignado_a, etapa, created_at desc);
create index if not exists leads_telefono_norm_idx on public.leads (telefono_norm);
create index if not exists leads_seguimiento_idx on public.leads (proximo_seguimiento)
  where proximo_seguimiento is not null;

-- ── Historial ──────────────────────────────────────────────────────────────
create table if not exists public.lead_eventos (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  lead_id     uuid not null references public.leads (id) on delete cascade,
  asesor_id   uuid references public.asesores (id) on delete set null,
  tipo        text not null check (tipo in (
                'creado', 'asignado', 'reasignado', 'contactado', 'resultado',
                'seguimiento', 'nota', 'cotizado', 'ganado', 'perdido',
                'archivado', 'reabierto')),
  nota        text,
  detalle     jsonb not null default '{}'::jsonb
);

create index if not exists lead_eventos_lead_idx on public.lead_eventos (lead_id, created_at desc);

alter table public.lead_eventos enable row level security;

-- Todo lead nuevo deja su primer evento.
create or replace function public.lead_evento_creado()
returns trigger language plpgsql as $$
begin
  insert into public.lead_eventos (lead_id, tipo, detalle)
  values (new.id, 'creado', jsonb_build_object('fuente', new.fuente, 'tipo_seguro', new.tipo_seguro));
  return new;
end $$;

drop trigger if exists leads_evento_creado on public.leads;
create trigger leads_evento_creado
  after insert on public.leads
  for each row execute function public.lead_evento_creado();

-- ── Asignación por turnos ──────────────────────────────────────────────────
-- 1) Si la misma persona (teléfono) ya tuvo asesor activo, vuelve con él.
-- 2) Si no, al siguiente asesor activo después del último que recibió un lead.
-- El candado evita que dos leads simultáneos se asignen con el mismo turno.
-- Los admin no entran en la rotación.
create or replace function public.asignar_lead(p_lead uuid)
returns uuid language plpgsql as $$
declare
  v_tel       text;
  v_actual    uuid;
  v_previo    uuid;
  v_ultimo    uuid;
  v_elegido   uuid;
begin
  perform pg_advisory_xact_lock(hashtext('vantrust.asignar_lead'));

  select telefono_norm, asignado_a into v_tel, v_actual
  from public.leads where id = p_lead for update;
  if not found then return null; end if;
  if v_actual is not null then return v_actual; end if;

  select l.asignado_a into v_previo
  from public.leads l
  join public.asesores a on a.id = l.asignado_a
  where l.telefono_norm = v_tel and l.id <> p_lead
    and a.rol = 'asesor' and a.activo and a.acceso
  order by l.created_at desc
  limit 1;

  if v_previo is not null then
    v_elegido := v_previo;
  else
    select asignado_a into v_ultimo
    from public.leads
    where asignado_a is not null and id <> p_lead
    order by asignado_at desc nulls last
    limit 1;

    with turno as (
      select id, row_number() over (order by created_at, id) as n
      from public.asesores
      where rol = 'asesor' and activo and acceso
    )
    select id into v_elegido from turno
    where n > coalesce((select n from turno where id = v_ultimo), 0)
    order by n limit 1;

    if v_elegido is null then
      with turno as (
        select id, row_number() over (order by created_at, id) as n
        from public.asesores
        where rol = 'asesor' and activo and acceso
      )
      select id into v_elegido from turno order by n limit 1;
    end if;
  end if;

  if v_elegido is null then return null; end if; -- nadie activo: queda sin asignar

  update public.leads set asignado_a = v_elegido, asignado_at = clock_timestamp() where id = p_lead;
  insert into public.lead_eventos (lead_id, asesor_id, tipo, detalle)
  values (p_lead, v_elegido, 'asignado',
          jsonb_build_object('regla', case when v_previo is not null then 'mismo_cliente' else 'turno' end));
  return v_elegido;
end $$;

-- Solo el servidor (service role) puede asignar.
revoke all on function public.asignar_lead(uuid) from public, anon, authenticated;
