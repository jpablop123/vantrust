-- Panel de leads: ventas, comisión y participación de la página.
--
-- Cada venta (la inicial y cada renovación) es una fila en `ventas`. La
-- comisión sale del % de la aseguradora para ese ramo (tabla comisiones_ramo)
-- y la participación de la página es un % de esa comisión (hoy 40 %), que se
-- congela en cada venta para que cambiarlo después no altere lo ya cerrado.
--
-- Cómo aplicarla: Supabase > SQL Editor > pega este archivo > Run.

-- Parámetros del panel
create table if not exists public.panel_config (
  clave       text primary key,
  valor       jsonb not null,
  updated_at  timestamptz not null default now()
);
insert into public.panel_config (clave, valor)
values ('participacion_pct', '40'::jsonb)
on conflict (clave) do nothing;

-- % de comisión que paga la aseguradora, por ramo (tipo_seguro del lead)
create table if not exists public.comisiones_ramo (
  ramo        text primary key,
  pct         numeric(5, 2) not null check (pct >= 0 and pct <= 100),
  updated_at  timestamptz not null default now(),
  updated_by  uuid references public.asesores (id) on delete set null
);

create table if not exists public.ventas (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  lead_id             uuid not null references public.leads (id) on delete restrict,
  tipo                text not null default 'nueva' check (tipo in ('nueva', 'renovacion')),
  ramo                text not null,
  aseguradora         text not null,
  prima               numeric(14, 2) not null check (prima > 0),
  fecha_venta         date not null default (now() at time zone 'America/Bogota')::date,
  registrado_por      uuid references public.asesores (id) on delete set null,

  -- null = el ramo todavía no tiene % configurado
  comision_pct        numeric(5, 2) check (comision_pct >= 0 and comision_pct <= 100),
  participacion_pct   numeric(5, 2) not null check (participacion_pct >= 0 and participacion_pct <= 100),
  comision_valor      numeric(14, 2)
                      generated always as (round(prima * comision_pct / 100)) stored,
  participacion_valor numeric(14, 2)
                      generated always as (round(round(prima * comision_pct / 100) * participacion_pct / 100)) stored,

  -- ¿Ya se pagó la participación?
  pagada              boolean not null default false,
  pagada_at           timestamptz,
  nota                text
);

create index if not exists ventas_fecha_idx on public.ventas (fecha_venta desc);
create index if not exists ventas_lead_idx on public.ventas (lead_id);

drop trigger if exists ventas_set_updated_at on public.ventas;
create trigger ventas_set_updated_at
  before update on public.ventas
  for each row execute function public.set_updated_at();

-- Historial: nuevo tipo de evento para renovaciones.
alter table public.lead_eventos drop constraint if exists lead_eventos_tipo_check;
alter table public.lead_eventos add constraint lead_eventos_tipo_check check (tipo in (
  'creado', 'asignado', 'reasignado', 'contactado', 'resultado',
  'seguimiento', 'nota', 'cotizado', 'ganado', 'perdido',
  'archivado', 'reabierto', 'visto', 'whatsapp', 'llamada', 'renovado'));

-- Solo el servidor (service role) lee y escribe.
alter table public.panel_config enable row level security;
alter table public.comisiones_ramo enable row level security;
alter table public.ventas enable row level security;
revoke all on table public.panel_config, public.comisiones_ramo, public.ventas from anon, authenticated;
