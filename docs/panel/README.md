# Panel de leads: puesta en marcha

El panel vive en `/panel` (rama `feat/panel-leads`). Usa Supabase para dos cosas: la base de datos de leads y el login del equipo.

## 1. Proyecto de Supabase

1. Crea el proyecto en [supabase.com](https://supabase.com). La región más cercana a Colombia es `us-east-1`.
2. En **SQL Editor**, pega y ejecuta en orden los archivos de `supabase/migrations/`:
   1. `20261108000000_leads.sql`
   2. `20261108000100_renovaciones.sql`
   3. `20261109000000_panel_asesores.sql`
   4. `20261109000100_panel_cola.sql` (etapas, asignación por turnos e historial)
   5. `20261109000200_panel_accesos_leads.sql` (cierra la API pública y registra quién ve cada lead)
   6. `20261109000400_panel_sin_atender.sql` (alerta y reasignación de leads sin atender)

   Las siguientes partes del panel agregan más migraciones; se aplican igual.
3. En **Authentication > Sign In / Providers**, deja activo "Email" y **desactiva "Allow new users to sign up"**. Las cuentas solo las crea el admin.
4. En **Authentication > URL Configuration**:
   - Site URL: `https://vantrust.com.co`.
   - Redirect URLs: agrega `https://vantrust.com.co/panel/auth/callback` y, para los previews, `https://*-jpablop123s-projects.vercel.app/panel/auth/callback`.
5. En **Authentication > Emails > Reset password**, reemplaza la plantilla por la versión en español de abajo.

## 2. Variables en Vercel

En **Project Settings > Environment Variables** (Production y Preview):

| Variable | Dónde sale |
|---|---|
| `SUPABASE_URL` | Project Settings > API > Project URL |
| `SUPABASE_ANON_KEY` | Project Settings > API > `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings > API > `service_role` (secreta) |

Con esto, además, los leads del sitio empiezan a guardarse en la base de datos. Hoy solo llegan por Telegram y correo.

## 3. Primer admin

Con las tres variables en un `.env.local`:

```bash
node --env-file=.env.local scripts/panel-crear-miembro.mjs tu@correo.com "Tu Nombre" admin
```

El script muestra una contraseña temporal una sola vez. Después se cambia en `/panel/restablecer`. Los asesores se crean igual, con `asesor` en vez de `admin`; desde la parte 3, también desde el panel.

## Asignación y avisos

- Cada lead nuevo del sitio se asigna por turnos entre los asesores con `rol = asesor`, `activo = true` y `acceso = true`. Los admin no entran en la rotación. Si el mismo teléfono ya tuvo asesor, vuelve con él. Lo hace la función `asignar_lead` de la base de datos, con un candado para que dos leads simultáneos no se crucen.
- Si el asesor tiene `telegram_chat_id`, el bot le escribe por privado cuando le llega un lead. Para obtener su chat id, el asesor le escribe al bot y se consulta `https://api.telegram.org/bot<TOKEN>/getUpdates`. El aviso al grupo sigue igual.
- Sin asesores activos, el lead queda sin asignar y el admin lo ve en "Todos los leads".

## Leads sin atender

- Un lead está "atendido" cuando el asesor asignado abrió WhatsApp, llamó o registró un contacto desde el panel.
- A los **5 minutos** sin atender, Telegram a los admin con chat configurado (si ninguno tiene, al grupo del equipo).
- A la **hora**, se reasigna al siguiente asesor por turno y se avisa al nuevo asesor y al admin. El reloj vuelve a empezar. Como máximo se reasigna 2 veces; después queda en manos del admin.
- El reloj solo corre en horario laboral: lunes a viernes de 8:00 a 19:00, hora de Colombia (`HORARIO` en `src/lib/panel/sin-atender.ts`).
- Lo ejecuta `GET /api/cron/leads-sin-atender` cada minuto, con el encabezado `Authorization: Bearer <CRON_SECRET>`.

### Programarlo cada minuto (Supabase pg_cron)

Vercel solo permite crons diarios en el plan gratis, así que el disparo cada minuto lo hace Supabase:

1. En Vercel, define `CRON_SECRET` (Production y Preview), un texto largo al azar.
2. En Supabase: **Database > Extensions**, activa `pg_cron` y `pg_net`.
3. En **SQL Editor**, con tu dominio y el mismo secreto:

```sql
select vault.create_secret('EL_MISMO_CRON_SECRET', 'vantrust_cron_secret');

select cron.schedule('vantrust-leads-sin-atender', '* * * * *', $$
  select net.http_get(
    url := 'https://vantrust.com.co/api/cron/leads-sin-atender',
    headers := jsonb_build_object(
      'Authorization',
      'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'vantrust_cron_secret')
    )
  );
$$);
```

Para pausarlo: `select cron.unschedule('vantrust-leads-sin-atender');`

## Seguridad de la base (RLS)

- Todas las tablas tienen RLS activado y ninguna política. Además, los roles `anon` y `authenticated` no tienen permisos sobre ellas. Por la API pública de Supabase nadie lee ni escribe nada, ni sin sesión ni con la sesión de un asesor. Solo el servidor del sitio, con la service role, accede a los datos.
- Un asesor ve sus leads únicamente a través del panel, que verifica en el servidor que el lead sea suyo.
- Para comprobarlo en cualquier proyecto, con la anon key, que no es secreta:

  ```bash
  SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/panel-verificar-rls.mjs
  # opcional, con la sesión de un asesor real:
  SUPABASE_URL=... SUPABASE_ANON_KEY=... PRUEBA_EMAIL=asesor@... PRUEBA_CLAVE=... node scripts/panel-verificar-rls.mjs
  ```

## Cómo se decide quién entra

- Hace falta una cuenta en Supabase Auth **y** una fila en la tabla `asesores` con `acceso = true`. Sin fila, la persona ve "Tu cuenta no tiene acceso".
- El rol (`admin` o `asesor`) sale de esa tabla. Nunca se toma de los datos de la cuenta, porque el usuario puede editarlos.
- `src/proxy.ts` solo redirige al login a quien no tiene sesión. Cada página y cada API del panel vuelven a verificar el miembro en el servidor (`src/lib/panel/sesion.ts`).
- Cada entrada, salida e intento fallido queda en `panel_accesos`.

## Probar en local

```bash
supabase start   # usa los puertos 56420-56429 (ver supabase/config.toml)
supabase status -o env   # URL y claves locales para .env.local
```

Los correos locales (por ejemplo, restablecer contraseña) llegan a Mailpit: http://127.0.0.1:56424.

## Plantilla "Reset password" en español

Asunto: `Crea tu nueva contraseña del panel VanTrust`

```html
<h2>Crea tu nueva contraseña</h2>
<p>Pediste cambiar la contraseña del panel de VanTrust.</p>
<p><a href="{{ .ConfirmationURL }}">Crear contraseña nueva</a></p>
<p>Si no fuiste tú, ignora este correo: tu contraseña sigue igual.</p>
```
