-- Leads del sitio vantrust.com.co
--
-- Cada lead nace "parcial" cuando la persona deja nombre + WhatsApp (paso 1)
-- y pasa a "completo" si llena los datos del ramo (paso 2). Así un lead a
-- medias ya se puede llamar.
--
-- Cómo aplicarla: Supabase > SQL Editor > pega este archivo > Run.
-- (o `supabase db push` si usas la CLI enlazada al proyecto)

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  estado           text not null default 'parcial'
                   check (estado in ('parcial', 'completo')),

  -- Contacto
  nombre           text not null,
  telefono         text not null,
  email            text,
  ciudad           text,

  -- Qué quiere asegurar
  tipo_seguro      text not null,
  placa            text,
  horario          text,
  mensaje          text,
  detalles         jsonb not null default '{}'::jsonb,
  fuente           text,

  -- Atribución (primer toque, guardado en el navegador)
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  utm_content      text,
  utm_term         text,
  gclid            text,
  fbclid           text,
  landing_page     text,
  referrer         text,

  -- Habeas data (Ley 1581 de 2012): prueba de la autorización
  autorizacion_datos boolean not null default false,
  autorizacion_at    timestamptz,

  -- Id compartido entre Meta Pixel y Conversions API
  event_id         text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_telefono_idx   on public.leads (telefono);
create index if not exists leads_campaign_idx   on public.leads (utm_campaign);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- Solo el servidor (service role) lee y escribe. RLS activado sin políticas =
-- la clave pública (anon) no puede ver ni tocar ningún lead.
alter table public.leads enable row level security;
