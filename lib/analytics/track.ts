"use client";

// Browser-side tracking. Every event goes to GA4 and to the Meta Pixel, and the
// same event is also sent server-side through /api/meta-capi with a shared
// event_id so Meta de-duplicates the two. Use these helpers, never fbq/gtag
// directly, or the de-duplication breaks.

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

type MetaEvent = "PageView" | "Lead" | "Contact" | "Schedule" | "ViewContent";

type EventData = Record<string, string | number | undefined> & {
  /** Sent to Meta only as a SHA-256 hash, by the server route. */
  $email?: string;
  $phone?: string;
};

const eventId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

const cookie = (name: string) => {
  const part = `; ${document.cookie}`.split(`; ${name}=`);
  return part.length === 2 ? part.pop()?.split(";").shift() : undefined;
};

export function sendGAEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") window.gtag?.("event", name, params);
}

function sendMeta(name: MetaEvent, prefix: string, data: EventData = {}) {
  if (typeof window === "undefined") return;
  const id = eventId(prefix);
  const { $email, $phone, ...custom } = data;

  window.fbq?.("track", name, custom, { eventID: id });

  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      eventName: name,
      eventId: id,
      eventSourceUrl: window.location.href,
      fbc: cookie("_fbc"),
      fbp: cookie("_fbp"),
      email: $email,
      phone: $phone,
      customData: custom,
    }),
  }).catch(() => {
    // Tracking must never break the page.
  });
}

export const trackPageView = () => sendMeta("PageView", "pv");

export const trackViewContent = (data?: EventData) =>
  sendMeta("ViewContent", "vc", data);

/** A real lead (form or voice note submitted). `source` names where from. */
export function trackLeadEvent(
  source: string,
  value = 100,
  contact?: { email?: string; phone?: string },
) {
  sendGAEvent("generate_lead", { currency: "USD", value, lead_source: source });
  sendMeta("Lead", "lead", {
    value,
    currency: "USD",
    content_name: source,
    $email: contact?.email,
    $phone: contact?.phone,
  });
}

/** Someone started a conversation (clicked a contact CTA, opened the form). */
export function trackContactEvent(source: string) {
  sendGAEvent("contact", { lead_source: source });
  sendMeta("Contact", "contact", { content_name: source });
}
