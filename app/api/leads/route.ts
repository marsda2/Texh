import {
  FIELDS,
  LIMITS,
  MAX_AUDIO_BYTES,
  MAX_RECORDING_SECONDS,
  isAudioType,
  looksLikeContact,
  type LeadKind,
} from "@/lib/leads/shared";
import { LeadStoreNotConfigured, storeLead } from "@/lib/leads/store";

const KINDS: LeadKind[] = ["voice", "upload", "text"];

function bad(error: string, status = 400) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("invalid_form");
  }

  // Bots fill every field; people never see this one.
  if (String(form.get(FIELDS.trap) ?? "").trim()) {
    return Response.json({ ok: true, stored: false });
  }

  const kind = String(form.get(FIELDS.kind) ?? "") as LeadKind;
  const name = String(form.get(FIELDS.name) ?? "").trim();
  const contact = String(form.get(FIELDS.contact) ?? "").trim();
  const message = String(form.get(FIELDS.message) ?? "").trim();
  const source = String(form.get(FIELDS.source) ?? "home").slice(0, 60);
  const rawDuration = Number(form.get(FIELDS.duration));
  const audioField = form.get(FIELDS.audio);
  const audio = audioField instanceof File && audioField.size > 0 ? audioField : null;

  if (!KINDS.includes(kind)) return bad("invalid_kind");
  if (!name || name.length > LIMITS.name) return bad("invalid_name");
  if (!looksLikeContact(contact) || contact.length > LIMITS.contact) {
    return bad("invalid_contact");
  }
  if (message.length > LIMITS.message) return bad("message_too_long");

  if (kind === "text") {
    if (!message) return bad("missing_message");
  } else {
    if (!audio) return bad("missing_audio");
    if (!isAudioType(audio.type)) return bad("invalid_audio_type");
    if (audio.size > MAX_AUDIO_BYTES) return bad("audio_too_large", 413);
  }

  const durationSeconds =
    Number.isFinite(rawDuration) && rawDuration > 0
      ? Math.min(Math.round(rawDuration), MAX_RECORDING_SECONDS * 4)
      : null;

  try {
    const result = await storeLead({
      kind,
      name,
      contact,
      message: message || null,
      source,
      durationSeconds,
      audio: kind === "text" ? null : audio,
      receivedAt: new Date().toISOString(),
    });
    return Response.json({ ok: true, stored: result.stored });
  } catch (error) {
    if (error instanceof LeadStoreNotConfigured) {
      return bad("not_configured", 503);
    }
    console.error("[leads] store failed", error);
    return bad("store_failed", 500);
  }
}
