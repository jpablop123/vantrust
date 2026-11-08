# Panel de leads: puesta en marcha

El panel vive en `/panel` (rama `feat/panel-leads`). Usa Supabase para dos cosas: la base de datos de leads y el login del equipo.

## 1. Proyecto de Supabase

1. Crea el proyecto en [supabase.com](https://supabase.com). La región más cercana a Colombia es `us-east-1`.
2. En **SQL Editor**, pega y ejecuta en orden los archivos de `supabase/migrations/`:
   1. `20261108000000_leads.sql`
   2. `20261108000100_renovaciones.sql`
   3. `20261109000000_panel_asesores.sql`

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
