# Texh Co

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · React Three Fiber + drei.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Hero layers

| z | What | File |
|---|------|------|
| 0 | Giant `texhco` watermark, endless loop with horizontal motion blur (speeds up with scroll) | `components/hero/WatermarkMarquee.tsx` |
| 10 | Tablet mockup + light process window + "New lead received" chip (all sized in `cqw`) | `components/hero/DeviceMockup.tsx` |
| 20 | One WebGL canvas with the three 3D objects | `components/hero/HeroCanvas.tsx` → `components/three/Hero3DScene.tsx` |
| 30 | Header, H1, CTAs, services strip | `components/hero/Hero.tsx` |

### 3D objects (`components/three/`)

- `TexhX3D.tsx` — bevelled extrusion of `public/brand/texhco-x.svg` (bevel kept inside the outline so the slits stay open).
- `ChromeArch3D.tsx` — `TubeGeometry` along the 250° arc from `chrome-arch-front.svg`, rounded caps, lime band.
- `CodeKeycap3D.tsx` — body / rim / face / `< | >` glyph layers from `code-keycap-front.svg`; the keycap is desktop-only.
- `Hero3DScene.tsx` — placements are expressed relative to the device mockup's box (`DESKTOP` / `MOBILE` tables), so the objects stay glued to it at any viewport. Includes float, pointer parallax, scroll drift, pop-in, soft blob shadows, `PerformanceMonitor` DPR and a paused render loop when the hero is off-screen.
- Reflections come from a Lightformer studio environment (no HDRI download from a third-party CDN at runtime).

## Services deck (`components/services/`)

- `ServicesDeck.tsx` — GSAP ScrollTrigger pin + Observer. When the deck reaches the top, page scrolling pauses and **each gesture moves exactly one card** (wheel roll, trackpad swipe, finger swipe, arrow keys); momentum from the same gesture is ignored. Past the last card (or before the first) scrolling is handed back to the page. Long jumps (anchor links) pass straight through. The card layout itself is one continuous position (0 → 3): the top card slides up, tilts ~2° and fades; the next rises from behind, grows from 0.95 to 1. Reduced motion: no pinning, tabs switch cards.
  Tuning: `STEP_DURATION`, `QUIET_MS` (silence that starts a new gesture), `EXIT_TILT`, `SLOT_SCALE`.
- `ServiceCard.tsx` + `theme.ts` — card layout and the four themes (ink, lime, paper, graphite).
- `Illustrations.tsx` — glass device with chrome bevel and sphere, plus one animated screen per service.
- "Learn more" → `app/services/[slug]/page.tsx` (statically generated for the 4 services; content in `services[].detail`).

## Let's build — voice-note leads (`components/contact/`)

- `LetsBuild.tsx` — the closing section (`#contact`): free-audit card with a 3D chrome X (`ChromeX.tsx`, its own small canvas, mounted only near the viewport) + "Tell us what you need".
- `VoiceNote.tsx` — record with `MediaRecorder` (max 3 min) and a live Web Audio waveform + mic glow, listen back, re-record, upload an audio file (≤ 4 MB) or type instead, then name + phone/email. Posts multipart to `/api/leads`.
- `app/api/leads/route.ts` — validation + honeypot, then `lib/leads/store.ts`, which writes to the **same Supabase project the old texhco.com used**: voice notes go to the `audio_uploads` bucket + `voice_leads`, typed messages to `footer_leads`. Inserting a row fires the existing Database Webhook, which calls the `send-lead-email` Edge Function and sends the emails through Resend. No email code lives in this app.
- Field names/limits shared by client and server: `lib/leads/shared.ts`. When moving audio to Supabase, prefer signed upload URLs (client → Storage directly) and raise `MAX_AUDIO_BYTES`.

## Content

All copy lives in `content/site.ts`.

## Integrations (all reuse what the old site already had)

| What | Where | Env (names already in the Vercel project) |
|---|---|---|
| Leads → Supabase → Resend emails | `lib/leads/store.ts` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (or `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`) |
| Google Analytics 4 | `components/site/Analytics.tsx` | `NEXT_PUBLIC_GA_ID` (default `G-GF2P833R0D`) |
| Meta Pixel (browser) | `components/site/Analytics.tsx` | `VITE_META_PIXEL_ID` (mapped in `next.config.ts`) |
| Meta Conversions API (server) | `app/api/meta-capi/route.ts` | `META_ACCESS_TOKEN`, `VITE_META_PIXEL_ID`, optional `META_TEST_EVENT_CODE` |
| Vercel Speed Insights | `components/site/Analytics.tsx` | none |

- Tracking only runs in production builds. Use the helpers in `lib/analytics/track.ts` (`trackLeadEvent`, `trackContactEvent`), never `fbq`/`gtag` directly: they send the browser event and the server event with one shared `event_id` so Meta de-duplicates them.
- The CAPI route only accepts calls from texhco.com, `*.vercel.app` and localhost, whitelists the event names and rate-limits per IP (the old endpoint was open to any origin).
- SEO: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, JSON-LD in `app/layout.tsx`, `public/llms.txt`. Old URLs redirect in `next.config.ts` (`/services/premium-web-design` and friends, `/about`, `/audit`, `/estimator`).
- Legal: `/privacy` and `/terms` (text from the old site; the terms still list mobile apps and social media).

## Deploy

`vercel.json` pins the framework to Next.js, so it builds even if the Vercel project was created as Vite. Preview deployments need the same env vars as Production (set them for the "Preview" environment too). The old site's other pieces (client portal `/portal`, site generator and `*.texhco.com` client sites, contact cards, quiz) are **not** part of this app.

## Before launch

- `work` uses each project's own screenshots and assets (see `public/work/`); check you can show them.
- `services[].detail.showcase` demos use sample numbers, labelled as samples.

Motion respects the OS "reduce motion" setting (`components/site/Providers.tsx`).
