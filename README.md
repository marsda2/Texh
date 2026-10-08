# Texh Co. (plataforma)

Esta rama (`platform`) es la **plataforma** de Texh Co.: portal de clientes, generador de sitios, sitios de clientes en subdominios, tarjetas de contacto, cotizador y agendado de llamadas. Es una SPA de React + Vite con Supabase como backend.

La web de marketing de **texhco.com** es otra app (Next.js) que vive en la rama `main` de este repo y tiene su propio proyecto de Vercel.

## Dónde corre

| Host | Qué sirve | Proyecto de Vercel |
|---|---|---|
| `texhco.com`, `www.texhco.com` | Web de marketing (Next.js, rama `main`) | `texh` |
| `app.texhco.com` | Portal, generador, tarjetas (`/portal`, `/generator`, `/contact/:usuario`...) | proyecto de la plataforma (rama de producción: `platform`) |
| `*.texhco.com` | Sitio de cada cliente (`ClientSiteView`) | proyecto de la plataforma |

- Un dominio comodín solo puede estar en un proyecto de Vercel, por eso `*.texhco.com` y `app.texhco.com` van en el de la plataforma y `texhco.com` + `www` van explícitos en el de marketing.
- `src/lib/subdomain.js`: `getSubdomain()` decide si el host es un sitio de cliente. Los nombres de `RESERVED_SUBDOMAINS` (`app`, `www`, `api`, `admin`...) nunca son clientes; el generador también los evita al asignar subdominio.
- En `app.texhco.com` la home (`/`) redirige a `/portal` y `vercel.json` añade `X-Robots-Tag: noindex, nofollow`.
- En local: `http://app.localhost:5173` imita la plataforma y `http://sofia.localhost:5173` un sitio de cliente.

## Variables de entorno (Vercel, y `.env.local` en local)

| Variable | Uso |
|---|---|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Cliente de Supabase (frontend) |
| `META_ACCESS_TOKEN` | Secreto de `api/meta-capi.js` |
| `VITE_META_PIXEL_ID` | Pixel de Meta |
| `META_TEST_EVENT_CODE` | Opcional, para probar eventos |

`RESEND_API_KEY` vive en los secretos de Supabase, no aquí.

## Supabase Auth

Authentication > URL Configuration: **Site URL** `https://app.texhco.com` y en **Redirect URLs** añadir `https://app.texhco.com/**`. El registro (`/welcome`) pide `emailRedirectTo` = `/portal` en el host actual. Las sesiones se guardan por origen: quien estaba logueado en `texhco.com/portal` tiene que entrar una vez en `app.texhco.com`.

## Scripts

`npm run dev` (Vite), `npm run build`, `npm run preview`. `npm run dev` no sirve `api/` (Meta CAPI falla en silencio en local; usa `vercel dev` para probarlo).
