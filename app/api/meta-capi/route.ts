import crypto from "node:crypto";

// Meta Conversions API, server side. The browser Pixel and this route send the
// same event with the same event_id, so Meta counts it once but keeps the
// attribution that ad blockers would otherwise lose.
//
// Env (already set in the Vercel project): META_ACCESS_TOKEN (secret),
// VITE_META_PIXEL_ID or META_PIXEL_ID, and optionally META_TEST_EVENT_CODE.

const GRAPH_VERSION = "v22.0";
const EVENTS = new Set(["PageView", "Lead", "Contact", "Schedule", "ViewContent"]);

const sha256 = (value: string) =>
  crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

/** Same-origin calls only: the old endpoint accepted any origin (CORS *). */
function originAllowed(request: Request) {
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return false;
  let host: string;
  try {
    host = new URL(source).hostname;
  } catch {
    return false;
  }
  if (host === "texhco.com" || host.endsWith(".texhco.com")) return true;
  // Preview deployments and local dev are fine; production traffic isn't from them.
  if (host.endsWith(".vercel.app") || host === "localhost") return true;
  return false;
}

// Best-effort limiter (per server instance). Enough to stop casual abuse of
// the access token; use Vercel Firewall rules for anything stricter.
const hits = new Map<string, { count: number; reset: number }>();
function limited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 40;
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  const pixelId =
    process.env.VITE_META_PIXEL_ID ||
    process.env.META_PIXEL_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_ACCESS_TOKEN;
  if (!pixelId || !token) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: {
    eventName?: string;
    eventId?: string;
    eventSourceUrl?: string;
    email?: string;
    phone?: string;
    fbc?: string;
    fbp?: string;
    customData?: Record<string, unknown>;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.eventName || !EVENTS.has(body.eventName)) {
    return Response.json({ error: "invalid_event" }, { status: 400 });
  }

  const userData: Record<string, unknown> = {
    client_user_agent: request.headers.get("user-agent") ?? undefined,
    client_ip_address: ip === "unknown" ? undefined : ip,
  };
  if (body.fbc) userData.fbc = body.fbc;
  if (body.fbp) userData.fbp = body.fbp;
  // Meta only ever sees hashes of email and phone.
  if (body.email) userData.em = [sha256(body.email)];
  const phone = body.phone?.replace(/\D/g, "");
  if (phone) userData.ph = [sha256(phone)];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: body.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: body.eventId,
        event_source_url: body.eventSourceUrl,
        user_data: userData,
        custom_data: body.customData ?? {},
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      console.error("[meta-capi]", res.status, await res.text());
      return Response.json({ error: "meta_error" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[meta-capi]", error);
    return Response.json({ error: "internal" }, { status: 500 });
  }
}
