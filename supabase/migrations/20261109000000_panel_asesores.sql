-- Panel de leads: equipo (asesores y admin).
--
-- Quién entra al panel y con qué rol lo decide ESTA tabla, no la cuenta de
-- Supabase Auth: una cuenta sin fila aquí no entra, y el rol nunca se toma de
-- user_metadata (el usuario puede editarlo). Se busca por correo.
--
-- Cómo aplicarla: Supabase > SQL Editor > pega este archivo > Run.
-- (o `supabase db push` con la CLI enlazada al proyecto)

create table if not exists public.asesores (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- Siempre en minúsculas y sin espacios (ver el check): así la búsqueda por
  -- correo de la sesión es exacta.
  email            text not null unique check (email = lower(btrim(email))),
  nombre           text not null,
  rol              text not null default 'asesor' check (rol in ('admin', 'asesor')),

  -- "activo" = recibe leads en la rotación. Para quitarle el acceso a alguien
  -- se borra su cuenta o se marca acceso = false.
  activo           boolean not null default true,
  acceso           boolean not null default true,

  -- Avisos de leads nuevos
  telegram_chat_id text,
  telefono         text
);

drop trigger if exists asesores_set_updated_at on public.asesores;
create trigger asesores_set_updated_at
  before update on public.asesores
  for each row execute function public.set_updated_at();

-- Solo el servidor (service role) lee y escribe.
alter table public.asesores enable row level security;

-- Registro de entradas al panel.
create table if not exists public.panel_accesos (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  asesor_id   uuid references public.asesores (id) on delete set null,
  email       text not null,
  evento      text not null check (evento in ('login', 'logout', 'login_fallido')),
  ip          text,
  user_agent  text
);

create index if not exists panel_accesos_created_at_idx on public.panel_accesos (created_at desc);

alter table public.panel_accesos enable row level security;
