// Shared by the voice-note form (client) and /api/leads (server).

export type LeadKind = "voice" | "upload" | "text";

/** Recordings are capped so a note stays a note. */
export const MAX_RECORDING_SECONDS = 180;

/**
 * Upload cap. 4 MB keeps requests under typical serverless body limits
 * (Vercel: 4.5 MB). A 3-minute voice note is well below it. Raise this once
 * audio goes straight to Supabase Storage via signed upload URLs.
 */
export const MAX_AUDIO_BYTES = 4 * 1024 * 1024;

export const LIMITS = {
  name: 80,
  contact: 120,
  message: 2000,
} as const;

/** Form field names, so client and server can't drift apart. */
export const FIELDS = {
  kind: "kind",
  name: "name",
  contact: "contact",
  message: "message",
  audio: "audio",
  duration: "duration",
  source: "source",
  /** Honeypot: humans never see or fill it. */
  trap: "website",
} as const;

export function isAudioType(type: string) {
  return type.startsWith("audio/") || type === "video/webm" || type === "video/mp4";
}

export function looksLikeContact(value: string) {
  const v = value.trim();
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const phone = v.replace(/[^\d]/g, "").length >= 7;
  return email || phone;
}
