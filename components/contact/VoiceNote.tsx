"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Keyboard,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Square,
  Upload,
} from "lucide-react";
import { trackLeadEvent } from "@/lib/analytics/track";
import { letsBuild, site } from "@/content/site";
import {
  FIELDS,
  LIMITS,
  MAX_AUDIO_BYTES,
  MAX_RECORDING_SECONDS,
  isAudioType,
  looksLikeContact,
  type LeadKind,
} from "@/lib/leads/shared";
import { ChromeMic } from "./ChromeMic";
import { BARS, Waveform, type WaveformHandle } from "./Waveform";

const copy = letsBuild.recorder;

type Phase =
  | "idle"
  | "requesting"
  | "recording"
  | "review"
  | "text"
  | "details"
  | "sending"
  | "sent";

type Take = {
  kind: Exclude<LeadKind, "text">;
  blob: Blob;
  url: string;
  duration: number;
  fileName: string;
  peaks: number[] | null;
};

const fmt = (s: number) => {
  const t = Math.max(0, Math.floor(s));
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

function pickMimeType() {
  if (typeof MediaRecorder === "undefined") return "";
  return (
    ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"].find(
      (t) => MediaRecorder.isTypeSupported(t),
    ) ?? ""
  );
}

function extFor(type: string) {
  if (type.includes("mp4") || type.includes("m4a") || type.includes("aac")) return "m4a";
  if (type.includes("ogg")) return "ogg";
  if (type.includes("mpeg") || type.includes("mp3")) return "mp3";
  if (type.includes("wav")) return "wav";
  return "webm";
}

function getAudioContext() {
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return AC ? new AC() : null;
}

/** Decodes a clip into BARS normalised peaks (+ its real duration). */
async function analyse(blob: Blob) {
  const ctx = getAudioContext();
  if (!ctx) return null;
  try {
    const audio = await ctx.decodeAudioData(await blob.arrayBuffer());
    const data = audio.getChannelData(0);
    const size = Math.max(1, Math.floor(data.length / BARS));
    const raw = Array.from({ length: BARS }, (_, i) => {
      let peak = 0;
      for (let j = i * size; j < (i + 1) * size && j < data.length; j += 16) {
        peak = Math.max(peak, Math.abs(data[j]));
      }
      return peak;
    });
    const max = Math.max(...raw, 0.01);
    return {
      peaks: raw.map((p) => Math.max(0.1, Math.pow(p / max, 0.8))),
      duration: audio.duration,
    };
  } catch {
    return null;
  } finally {
    ctx.close().catch(() => {});
  }
}

/**
 * Voice-note lead capture: record (with a live waveform), listen back,
 * re-record, or upload a file / type instead — then leave a name and a way
 * to reach you. Posts multipart to /api/leads.
 */
export function VoiceNote({ source = "home" }: { source?: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [take, setTake] = useState<Take | null>(null);
  const [message, setMessage] = useState("");
  const [detailsFrom, setDetailsFrom] = useState<"audio" | "text">("audio");
  const [playing, setPlaying] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [devNotStored, setDevNotStored] = useState(false);

  const wave = useRef<WaveformHandle>(null);
  const micWrap = useRef<HTMLDivElement>(null);
  const audioEl = useRef<HTMLAudioElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const rec = useRef<{
    stream: MediaStream;
    recorder: MediaRecorder;
    ctx: AudioContext | null;
    /** Held on purpose: Chrome silences a source node that gets collected. */
    source: MediaStreamAudioSourceNode | null;
    raf: number;
    startedAt: number;
    history: number[];
  } | null>(null);

  // Release the microphone / object URLs if the section unmounts.
  useEffect(
    () => () => {
      teardownRecording();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const takeUrl = take?.url;
  useEffect(
    () => () => {
      if (takeUrl) URL.revokeObjectURL(takeUrl);
    },
    [takeUrl],
  );

  function setLevel(v: number) {
    micWrap.current?.style.setProperty("--lvl", v.toFixed(3));
  }

  function teardownRecording() {
    const r = rec.current;
    if (!r) return;
    cancelAnimationFrame(r.raf);
    r.source?.disconnect();
    r.stream.getTracks().forEach((t) => t.stop());
    r.ctx?.close().catch(() => {});
    rec.current = null;
    setLevel(0);
  }

  async function startRecording() {
    setNotice(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setNotice("Recording isn’t supported in this browser. Upload a file or type instead.");
      return;
    }
    setPhase("requesting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch (e) {
      const denied = e instanceof DOMException && e.name === "NotAllowedError";
      setNotice(
        denied
          ? "Microphone access is blocked. Allow it in your browser, or upload a file / type instead."
          : "We couldn’t find a microphone. Upload a file or type instead.",
      );
      setPhase("idle");
      return;
    }

    const mimeType = pickMimeType();
    const recorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType, audioBitsPerSecond: 64000 } : undefined,
    );
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    recorder.onstop = () => {
      const r = rec.current;
      const duration = r ? (performance.now() - r.startedAt) / 1000 : 0;
      const history = r?.history ?? [];
      teardownRecording();
      const type = recorder.mimeType || mimeType || "audio/webm";
      const blob = new Blob(chunks, { type });
      void loadTake(blob, "voice", `voice-note.${extFor(type)}`, duration, history);
    };

    // Live analyser for the waveform + mic glow.
    const ctx = getAudioContext();
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    if (ctx) {
      void ctx.resume().catch(() => {});
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;
      source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      // Keep the graph pulled without making any sound.
      const mute = ctx.createGain();
      mute.gain.value = 0;
      analyser.connect(mute).connect(ctx.destination);
    }
    const freq = new Uint8Array(analyser?.frequencyBinCount ?? 0);
    const levels = new Float32Array(BARS);
    const center = (BARS - 1) / 2;

    rec.current = {
      stream,
      recorder,
      ctx,
      source,
      raf: 0,
      startedAt: performance.now(),
      history: [],
    };
    recorder.start(250);
    setElapsed(0);
    setPhase("recording");

    let lastSecond = -1;
    let lastSample = 0;
    const tick = () => {
      const r = rec.current;
      if (!r) return;
      const t = (performance.now() - r.startedAt) / 1000;

      let overall = 0;
      if (analyser) {
        analyser.getByteFrequencyData(freq);
        for (let i = 0; i < BARS; i++) {
          // Centre bars read the low-mid voice range; edges read higher.
          const d = Math.abs(i - center) / center;
          const bin = 2 + Math.round(d * 34);
          const v = (freq[bin] * 0.6 + freq[bin + 1] * 0.25 + freq[Math.max(1, bin - 1)] * 0.15) / 255;
          levels[i] = Math.pow(v, 1.35) * (1 - d * 0.3);
          overall += v;
        }
        overall /= BARS;
      }
      wave.current?.setLevels(levels);
      setLevel(Math.min(1, overall * 1.8));

      if (t - lastSample > 0.1) {
        r.history.push(overall);
        lastSample = t;
      }
      const s = Math.floor(t);
      if (s !== lastSecond) {
        lastSecond = s;
        setElapsed(t);
      }
      if (t >= MAX_RECORDING_SECONDS) {
        stopRecording();
        return;
      }
      r.raf = requestAnimationFrame(tick);
    };
    rec.current.raf = requestAnimationFrame(tick);
  }

  function stopRecording() {
    const r = rec.current;
    if (r && r.recorder.state !== "inactive") r.recorder.stop();
  }

  async function loadTake(
    blob: Blob,
    kind: Take["kind"],
    fileName: string,
    knownDuration = 0,
    history: number[] = [],
  ) {
    const url = URL.createObjectURL(blob);
    // Rough peaks from the live levels right away; refine after decoding.
    const fromHistory =
      history.length >= 4
        ? Array.from({ length: BARS }, (_, i) => {
            const v = history[Math.floor((i / BARS) * history.length)] ?? 0;
            return Math.max(0.1, Math.min(1, v * 2.2));
          })
        : null;
    setTake({ kind, blob, url, duration: knownDuration, fileName, peaks: fromHistory });
    setElapsed(0);
    setPlaying(false);
    setPhase("review");

    const decoded = await analyse(blob);
    if (decoded) {
      setTake((prev) =>
        prev && prev.url === url
          ? {
              ...prev,
              peaks: decoded.peaks,
              duration: prev.duration || decoded.duration,
            }
          : prev,
      );
    }
  }

  function onFile(file: File | undefined) {
    setNotice(null);
    if (!file) return;
    if (!isAudioType(file.type)) {
      setNotice("That file isn’t audio. Try an .m4a, .mp3, .wav or .webm.");
      return;
    }
    if (file.size > MAX_AUDIO_BYTES) {
      setNotice(
        `That file is over ${Math.round(MAX_AUDIO_BYTES / 1024 / 1024)} MB. Try a shorter clip, or record a note here.`,
      );
      return;
    }
    void loadTake(file, "upload", file.name);
  }

  function discardTake() {
    audioEl.current?.pause();
    setTake(null);
    setPlaying(false);
    setElapsed(0);
    setPhase("idle");
  }

  function togglePlay() {
    const a = audioEl.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  }

  // Playback → playhead on the waveform.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const loop = () => {
      const a = audioEl.current;
      if (a && take) {
        const d = take.duration || (Number.isFinite(a.duration) ? a.duration : 0);
        wave.current?.setProgress(d ? a.currentTime / d : 0);
        setElapsed(a.currentTime);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, take]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSendError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get(FIELDS.name) ?? "").trim();
    const contact = String(form.get(FIELDS.contact) ?? "").trim();
    if (!name) return setSendError("Add your name so we know who to reply to.");
    if (!looksLikeContact(contact)) {
      return setSendError("Add a phone number or email we can reach you on.");
    }

    const kind: LeadKind = detailsFrom === "text" ? "text" : (take?.kind ?? "voice");
    form.set(FIELDS.kind, kind);
    form.set(FIELDS.source, source);
    if (kind === "text") {
      form.set(FIELDS.message, message.trim());
    } else if (take) {
      form.set(FIELDS.audio, new File([take.blob], take.fileName, { type: take.blob.type }));
      if (take.duration) form.set(FIELDS.duration, String(Math.round(take.duration)));
    }

    setPhase("sending");
    try {
      const res = await fetch("/api/leads", { method: "POST", body: form });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; stored?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "send_failed");
      setDevNotStored(data.stored === false && process.env.NODE_ENV !== "production");
      // Same event names and values as the old site: voice_lead = 200, form = 150.
      const isEmail = contact.includes("@");
      trackLeadEvent(kind === "text" ? "text_lead" : "voice_lead", kind === "text" ? 150 : 200, {
        email: isEmail ? contact : undefined,
        phone: isEmail ? undefined : contact,
      });
      setPhase("sent");
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setSendError(
        code === "audio_too_large"
          ? "That recording is too large to send. Try a shorter one."
          : `We couldn’t send this right now. Please email us at ${site.email}.`,
      );
      setPhase("details");
    }
  }

  const recording = phase === "recording";
  const status =
    phase === "recording"
      ? { label: "Recording", dot: "bg-[#ff4d4d] animate-pulse" }
      : phase === "requesting"
        ? { label: "Allow mic", dot: "bg-white/50 animate-pulse" }
        : phase === "review"
          ? { label: take?.kind === "upload" ? "Uploaded" : "Recorded", dot: "bg-lime" }
          : phase === "sent"
            ? { label: "Sent", dot: "bg-lime" }
            : phase === "sending"
              ? { label: "Sending", dot: "bg-lime animate-pulse" }
              : { label: "Ready", dot: "bg-lime" };
  const label =
    phase === "text" ? "Your message" : phase === "details" || phase === "sending" ? "Almost done" : copy.label;

  const showMic = ["idle", "requesting", "recording", "review"].includes(phase);

  return (
    <div>
      <div
        id="voice-note"
        className="relative scroll-mt-24 overflow-hidden rounded-[30px] bg-ink px-5 pb-6 pt-6 text-cream shadow-[0_40px_80px_-40px_rgba(17,17,17,0.6)] ring-lime/60 transition-shadow duration-500 target:ring-4 md:rounded-[36px] md:px-10 md:pb-9 md:pt-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-[22%] mx-auto h-[45%] w-[70%] rounded-full bg-lime/[0.06] blur-3xl" />

        <div className="relative flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-cream/85 md:text-[11px]">
            {label}
          </p>
          <p className="flex items-center gap-2 text-[14px] text-cream/90" aria-live="polite">
            <span className={`size-2.5 rounded-full ${status.dot}`} />
            {status.label}
          </p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {showMic && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col items-center"
            >
              <div ref={micWrap} className="mt-4 h-36 w-32 md:mt-6 md:h-44 md:w-40">
                <ChromeMic className="h-full w-full" />
              </div>

              <Waveform
                ref={wave}
                mode={recording ? "live" : phase === "review" ? "static" : "idle"}
                peaks={take?.peaks}
                className="mt-4 w-full max-w-[420px]"
              />

              <p className="mt-3 text-[18px] font-medium tabular-nums tracking-[0.12em] text-cream/90">
                {phase === "review" && take
                  ? `${fmt(elapsed)} / ${fmt(take.duration)}`
                  : fmt(elapsed)}
              </p>
              <p className="mt-2 text-center text-[15px] text-cream/75">
                {recording
                  ? copy.recordingHint
                  : phase === "review"
                    ? take?.kind === "upload"
                      ? take.fileName
                      : copy.reviewHint
                    : copy.idleHint}
              </p>

              {phase === "review" && take ? (
                <>
                  <audio
                    ref={audioEl}
                    src={take.url}
                    preload="metadata"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => {
                      setPlaying(false);
                      wave.current?.setProgress(1);
                    }}
                    className="hidden"
                  />
                  <div className="mt-5 flex w-full items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={playing ? "Pause" : "Play your note"}
                      className="grid size-14 shrink-0 place-items-center rounded-full border border-white/20 transition-colors hover:border-lime hover:text-lime"
                    >
                      {playing ? (
                        <Pause className="size-5" strokeWidth={2} />
                      ) : (
                        <Play className="ml-0.5 size-5" strokeWidth={2} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        audioEl.current?.pause();
                        setDetailsFrom("audio");
                        setPhase("details");
                      }}
                      className="group inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[17px] font-bold text-ink transition-transform hover:-translate-y-0.5"
                    >
                      Use this note
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={take.kind === "upload" ? () => fileInput.current?.click() : discardTake}
                    className="mt-4 inline-flex items-center gap-2 text-[14px] text-cream/70 hover:text-cream"
                  >
                    <RotateCcw className="size-4" strokeWidth={2} />
                    {take.kind === "upload" ? "Choose another file" : "Re-record"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={recording ? stopRecording : startRecording}
                    disabled={phase === "requesting"}
                    className={`group mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full px-6 font-display text-[19px] font-extrabold tracking-[-0.02em] transition-all disabled:opacity-60 md:h-16 md:text-[21px] ${
                      recording
                        ? "bg-cream text-ink"
                        : "bg-lime text-ink shadow-[0_0_40px_-8px_rgba(200,255,0,0.6)] hover:-translate-y-0.5"
                    }`}
                  >
                    {recording ? (
                      <Square className="size-5 fill-current" strokeWidth={2} />
                    ) : (
                      <Mic className="size-6" strokeWidth={2.2} />
                    )}
                    {recording ? copy.stop : copy.record}
                  </button>
                  <p className="mt-4 text-center text-[14px] text-cream/60">
                    {recording
                      ? `Up to ${MAX_RECORDING_SECONDS / 60} minutes.`
                      : copy.belowIdle}
                  </p>
                </>
              )}

              {notice && (
                <p role="alert" className="mt-4 rounded-2xl bg-white/[0.06] px-4 py-3 text-center text-[14px] text-cream/85">
                  {notice}
                </p>
              )}
            </motion.div>
          )}

          {phase === "text" && (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative mt-5"
            >
              <label htmlFor="lead-message" className="sr-only">
                What do you need?
              </label>
              <textarea
                id="lead-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={LIMITS.message}
                rows={7}
                placeholder={copy.textPlaceholder}
                className="w-full resize-none rounded-[22px] border border-white/15 bg-white/[0.04] p-5 text-[16px] leading-relaxed text-cream placeholder:text-cream/35 focus:border-lime focus:outline-none"
              />
              <div className="mt-1 text-right text-[12px] text-cream/40">
                {message.length}/{LIMITS.message}
              </div>
              <button
                type="button"
                disabled={message.trim().length < 5}
                onClick={() => {
                  setDetailsFrom("text");
                  setPhase("details");
                }}
                className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-lime text-[17px] font-bold text-ink transition-opacity disabled:opacity-40"
              >
                Continue
                <ArrowRight className="size-5" strokeWidth={2.2} />
              </button>
            </motion.div>
          )}

          {(phase === "details" || phase === "sending") && (
            <motion.form
              key="details"
              onSubmit={submit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative mt-5 flex flex-col gap-3"
              noValidate
            >
              <p className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-4 py-3 text-[14px] text-cream/80">
                <Check className="size-4 shrink-0 text-lime" strokeWidth={2.6} />
                {detailsFrom === "text"
                  ? "Message ready."
                  : `${take?.kind === "upload" ? "Audio" : "Voice note"} ready${take?.duration ? ` · ${fmt(take.duration)}` : ""}.`}{" "}
                Where should we reply?
              </p>
              <label className="sr-only" htmlFor="lead-name">Your name</label>
              <input
                id="lead-name"
                name={FIELDS.name}
                autoComplete="name"
                maxLength={LIMITS.name}
                placeholder="Your name"
                className="h-14 rounded-[18px] border border-white/15 bg-white/[0.04] px-5 text-[16px] text-cream placeholder:text-cream/40 focus:border-lime focus:outline-none"
              />
              <label className="sr-only" htmlFor="lead-contact">Phone or email</label>
              <input
                id="lead-contact"
                name={FIELDS.contact}
                autoComplete="email"
                inputMode="email"
                maxLength={LIMITS.contact}
                placeholder="Phone or email"
                className="h-14 rounded-[18px] border border-white/15 bg-white/[0.04] px-5 text-[16px] text-cream placeholder:text-cream/40 focus:border-lime focus:outline-none"
              />
              {/* Honeypot */}
              <input
                name={FIELDS.trap}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              {sendError && (
                <p role="alert" className="text-[14px] text-[#ff8a8a]">
                  {sendError}
                </p>
              )}
              <p className="text-[12px] leading-snug text-cream/50">
                By sending this you agree to our{" "}
                <a href="/terms" target="_blank" rel="noopener" className="underline hover:text-cream">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener" className="underline hover:text-cream">
                  Privacy Policy
                </a>
                , and to be contacted about your request by phone, text or email.
              </p>
              <button
                type="submit"
                disabled={phase === "sending"}
                className="mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-lime text-[17px] font-bold text-ink transition-opacity disabled:opacity-60"
              >
                {phase === "sending" ? "Sending…" : "Send to Texh Co"}
                {phase !== "sending" && <ArrowRight className="size-5" strokeWidth={2.2} />}
              </button>
              <button
                type="button"
                onClick={() => setPhase(detailsFrom === "text" ? "text" : "review")}
                className="inline-flex items-center justify-center gap-2 py-2 text-[14px] text-cream/60 hover:text-cream"
              >
                <ArrowLeft className="size-4" strokeWidth={2} />
                Back
              </button>
            </motion.form>
          )}

          {phase === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex flex-col items-center py-10 text-center"
            >
              <span className="grid size-16 place-items-center rounded-full bg-lime text-ink shadow-[0_0_40px_rgba(200,255,0,0.5)]">
                <Check className="size-8" strokeWidth={3} />
              </span>
              <p className="mt-6 font-display text-[28px] font-black tracking-[-0.03em]">
                Thanks!
              </p>
              <p className="mt-2 max-w-[300px] text-[16px] text-cream/75">{copy.success}</p>
              {devNotStored && (
                <p className="mt-4 rounded-xl bg-white/[0.06] px-3 py-2 text-[12px] text-cream/50">
                  Dev mode: received but not stored. Connect Supabase in lib/leads/store.ts.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Alternatives */}
      {phase !== "sent" && phase !== "sending" && phase !== "details" && (
        <div className="mt-5 flex items-center justify-between gap-4 px-1">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={recording}
            className="inline-flex h-12 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-ink/20 px-5 text-[15px] font-semibold text-ink transition-colors hover:border-ink disabled:opacity-40 md:h-14 md:gap-3 md:px-6 md:text-[16px]"
          >
            <Upload className="size-5" strokeWidth={2} />
            {copy.upload}
          </button>
          <button
            type="button"
            disabled={recording}
            onClick={() => {
              setNotice(null);
              if (phase === "text") setPhase(take ? "review" : "idle");
              else setPhase("text");
            }}
            className="link-underline inline-flex items-center gap-2 whitespace-nowrap text-[15px] font-medium text-ink disabled:opacity-40 md:text-[16px]"
          >
            {phase === "text" ? (
              <>
                <Mic className="size-4" strokeWidth={2} />
                {copy.voice}
              </>
            ) : (
              <>
                <Keyboard className="hidden size-4 md:block" strokeWidth={2} />
                {copy.typing}
              </>
            )}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => {
              onFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      )}
    </div>
  );
}
