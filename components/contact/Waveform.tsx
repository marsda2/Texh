"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";
import { useOffscreenPause } from "@/lib/use-offscreen-pause";

export const BARS = 45;
const CENTER = (BARS - 1) / 2;

export type WaveformHandle = {
  /** Live levels (0–1) for every bar. */
  setLevels: (levels: ArrayLike<number>) => void;
  /** Playback progress 0–1: bars before the playhead turn lime. */
  setProgress: (p: number) => void;
};

/**
 * Idle shape: a soft symmetric hump, louder in the middle. Rounded so the
 * server-rendered styles match the client byte for byte (hydration).
 */
const idleShape = Array.from({ length: BARS }, (_, i) => {
  const d = Math.abs(i - CENTER) / CENTER;
  const h = 0.18 + 0.55 * Math.pow(1 - d, 1.6) * (0.6 + 0.4 * Math.abs(Math.sin(i * 1.7)));
  return Math.round(h * 1000) / 1000;
});

/**
 * Symmetric bar waveform. `mode`:
 * - idle: breathing CSS animation, lime core
 * - live: heights pushed via `setLevels` every frame (no React re-render)
 * - static: fixed `peaks`, lime up to the playhead
 */
export function Waveform({
  mode,
  peaks,
  ref,
  className = "",
}: {
  mode: "idle" | "live" | "static";
  peaks?: number[] | null;
  ref?: Ref<WaveformHandle>;
  className?: string;
}) {
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  useOffscreenPause(root);

  useImperativeHandle(ref, () => ({
    setLevels(levels) {
      for (let i = 0; i < BARS; i++) {
        const el = bars.current[i];
        if (el) el.style.transform = `scaleY(${Math.max(0.08, Math.min(1, levels[i] ?? 0))})`;
      }
    },
    setProgress(p) {
      const cut = Math.round(p * BARS);
      for (let i = 0; i < BARS; i++) {
        bars.current[i]?.toggleAttribute("data-played", i < cut);
      }
    },
  }));

  // A new clip or mode starts with nothing played.
  useEffect(() => {
    bars.current.forEach((el) => el?.removeAttribute("data-played"));
  }, [mode, peaks]);

  const heights = mode === "static" && peaks?.length === BARS ? peaks : idleShape;

  return (
    <div
      ref={root}
      aria-hidden
      data-mode={mode}
      className={`group/wave flex h-14 items-center justify-center gap-[3px] md:h-16 ${className}`}
    >
      {heights.map((h, i) => {
        const core = Math.abs(i - CENTER) <= 4;
        return (
          // Wrapper holds the bar's height (idle shape, live level or peak)…
          <span
            key={i}
            ref={(el) => {
              bars.current[i] = el;
            }}
            className="group/bar block h-full w-[3px] origin-center"
            style={{ transform: `scaleY(${mode === "live" ? 0.08 : h.toFixed(3)})` }}
          >
            {/* …the inner bar does the colour and the idle breathing. */}
            <span
              className={[
                "block h-full w-full origin-center rounded-full transition-colors duration-200",
                "group-data-[mode=idle]/wave:animate-[wave_1.8s_ease-in-out_infinite]",
                core
                  ? "group-data-[mode=idle]/wave:bg-lime"
                  : "group-data-[mode=idle]/wave:bg-white/35",
                "group-data-[mode=live]/wave:bg-lime",
                "group-data-[mode=static]/wave:bg-white/30 group-data-[played]/bar:!bg-lime",
              ].join(" ")}
              style={{ animationDelay: `${((i % 9) * -0.2).toFixed(1)}s` }}
            />
          </span>
        );
      })}
    </div>
  );
}
