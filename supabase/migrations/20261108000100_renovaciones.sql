-- Base de renovaciones: personas que ya tienen póliza con otra agencia y
-- quieren que les avisemos antes de que venza para comparar.
--
-- Un cron diario (/api/cron/renovaciones) manda a Telegram las que vencen en
-- los próximos 30 días y marca avisado_at para no repetirlas.
--
-- Cómo aplicarla: Supabase > SQL Editor > pega este archivo > Run.
-- Requiere haber corrido antes 20261108000000_leads.sql (usa set_updated_at).

create table if not exists public.renovaciones (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  -- Contacto
  nombre             text not null,
  telefono           text not null,

  -- Póliza actual
  ramo               text not null,          -- vehiculo | hogar | salud | pyme
  aseguradora_actual text,
  placa              text,                   -- solo autos, opcional
  fecha_vencimiento  date not null,

  -- Seguimiento comercial
  avisado_at         timestamptz,            -- cuándo se avisó al equipo (30 días antes)

  -- Atribución (primer toque)
  utm_source         text,
  utm_medium         text,
  utm_campaign       text,
  utm_content        text,
  utm_term           text,
  gclid              text,
  fbclid             text,
  landing_page       text,
  referrer           text,

  -- Habeas data (Ley 1581 de 2012)
  autorizacion_datos boolean not null default false,
  autorizacion_at    timestamptz,

  event_id           text
);

create index if not exists renovaciones_vencimiento_idx
  on public.renovaciones (fecha_vencimiento)
  where avisado_at is null;

drop trigger if exists renovaciones_set_updated_at on public.renovaciones;
create trigger renovaciones_set_updated_at
  before update on public.renovaciones
  for each row execute function public.set_updated_at();

-- Solo el servidor (service role) lee y escribe.
alter table public.renovaciones enable row level security;
