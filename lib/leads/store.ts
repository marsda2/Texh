import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { LeadKind } from "./shared";

export type LeadRecord = {
  kind: LeadKind;
  name: string;
  contact: string;
  message: string | null;
  source: string;
  durationSeconds: number | null;
  audio: File | null;
  receivedAt: string;
};

export class LeadStoreNotConfigured extends Error {
  constructor() {
    super("Lead storage is not configured");
  }
}

/**
 * Leads go into the same Supabase project (and the same tables) as the old
 * texhco.com, so the existing Database Webhook -> `send-lead-email` Edge
 * Function -> Resend pipeline keeps emailing the team and the lead with no
 * changes:
 *
 *   voice / upload -> storage bucket `audio_uploads` + table `voice_leads`
 *   text           -> table `footer_leads`
 *
 * Env: it reuses the variables already in the Vercel project
 * (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, the same public-insert access the
 * old site used from the browser). SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY win
 * if they are set.
 */
function client() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const AUDIO_BUCKET = "audio_uploads";

function extensionFor(type: string) {
  if (type.includes("mp4")) return "mp4";
  if (type.includes("ogg")) return "ogg";
  if (type.includes("mpeg")) return "mp3";
  if (type.includes("wav")) return "wav";
  return "webm";
}

const slug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30) || "lead";

// `voice_leads` only needs (email, audio_url). If the table also has name /
// source / duration columns we fill them; if not, we fall back once and
// remember it so every later lead skips the failed attempt.
let voiceExtraColumns: boolean | null = null;

async function insertVoiceLead(
  supabase: NonNullable<ReturnType<typeof client>>,
  lead: LeadRecord,
  audioUrl: string,
) {
  const base = { email: lead.contact, audio_url: audioUrl };

  if (voiceExtraColumns !== false) {
    const { error } = await supabase.from("voice_leads").insert({
      ...base,
      name: lead.name,
      source: lead.source,
      duration_seconds: lead.durationSeconds,
    });
    if (!error) {
      voiceExtraColumns = true;
      return;
    }
    if (error.code !== "PGRST204" && !/column/i.test(error.message)) throw error;
    voiceExtraColumns = false;
  }

  const { error } = await supabase.from("voice_leads").insert(base);
  if (error) throw error;
}

export async function storeLead(lead: LeadRecord): Promise<{ stored: boolean }> {
  const supabase = client();

  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[leads] Supabase not configured, lead NOT stored (dev):", {
        ...lead,
        audio: lead.audio
          ? { name: lead.audio.name, type: lead.audio.type, bytes: lead.audio.size }
          : null,
      });
      return { stored: false };
    }
    throw new LeadStoreNotConfigured();
  }

  if (lead.kind === "text") {
    const isEmail = lead.contact.includes("@");
    const { error } = await supabase.from("footer_leads").insert({
      ...(isEmail ? { email: lead.contact } : { phone: lead.contact }),
      selected_service: lead.source,
      // The table has no name column, so the name travels in the message.
      message: `${lead.name}: ${lead.message ?? ""}`.trim(),
    });
    if (error) throw error;
    return { stored: true };
  }

  if (!lead.audio) throw new Error("voice lead without audio");

  // The name goes in the file name too, so it shows in the admin email's link
  // even when voice_leads has no name column.
  const path = `idea_${Date.now()}_${slug(lead.name)}.${extensionFor(lead.audio.type)}`;
  // MediaRecorder reports "audio/webm;codecs=opus". The old site uploaded plain
  // "audio/webm", so drop the parameters in case the bucket restricts MIME types.
  const contentType = lead.audio.type.split(";")[0] || "audio/webm";
  const { error: uploadError } = await supabase.storage
    .from(AUDIO_BUCKET)
    .upload(path, lead.audio, { contentType, upsert: false });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(path);
  await insertVoiceLead(supabase, lead, data.publicUrl);
  return { stored: true };
}
