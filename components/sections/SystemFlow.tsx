"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import {
  CalendarCheck,
  ChartNoAxesColumn,
  Globe,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { process } from "@/content/site";

const icons: Record<string, LucideIcon> = {
  Website: Globe,
  Bookings: CalendarCheck,
  CRM: Users,
  Reviews: Star,
  "Weekly report": ChartNoAxesColumn,
};

const STEPS = process.flow;
const LAST = STEPS.length - 1;

// Timeline (seconds): fade in, then hop node to node, linger at the end.
const FADE = 0.35;
const HOLD = 0.55;
const TRAVEL = 0.75;
const END_HOLD = 1.6;

function buildTimeline() {
  const points: [number, number][] = [[0, 0]];
  let t = FADE + HOLD;
  points.push([t, 0]);
  for (let i = 1; i <= LAST; i++) {
    t += TRAVEL;
    points.push([t, i]);
    t += i === LAST ? END_HOLD : HOLD;
    points.push([t, i]);
  }
  const total = t + FADE;
  points.push([total, LAST]);
  return {
    total,
    values: points.map(([, v]) => v),
    times: points.map(([time]) => time / total),
  };
}

const TIMELINE = buildTimeline();

type Orientation = "vertical" | "horizontal";

/**
 * "One lead, start to finish": a glowing packet travels through the system
 * and lights each step as it arrives. Vertical timeline on phones,
 * horizontal rail from md up. Both share one timeline.
 */
export function SystemFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();

  const progress = useMotionValue(0); // 0 → LAST, in steps
  const fade = useMotionValue(0); // packet + trail visibility

  useEffect(() => {
    if (reduced) {
      progress.set(LAST);
      fade.set(1);
      return;
    }
    if (!inView) return;

    const { total, values, times } = TIMELINE;
    const controls: AnimationPlaybackControls[] = [
      animate(progress, values, {
        duration: total,
        times,
        ease: "easeInOut",
        repeat: Infinity,
      }),
      animate(fade, [0, 1, 1, 0], {
        duration: total,
        times: [0, FADE / total, (total - FADE) / total, 1],
        ease: "linear",
        repeat: Infinity,
      }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [inView, reduced, progress, fade]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[24px] bg-ink px-5 pb-4 pt-5 text-cream md:px-8 md:pb-7 md:pt-6"
    >
      {/* Soft lime haze that follows the packet on desktop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgba(200,255,0,0.08),transparent_70%)]" />

      <div className="relative flex items-center justify-between gap-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-cream/55 md:tracking-[0.35em]">
          One lead, start to finish
        </p>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-cream/80">
          <span className="relative grid size-2 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
            <span className="relative size-2 rounded-full bg-lime" />
          </span>
          Live
        </span>
      </div>

      <Track
        orientation="vertical"
        progress={progress}
        fade={fade}
        className="mt-4 md:hidden"
      />
      <Track
        orientation="horizontal"
        progress={progress}
        fade={fade}
        className="mt-7 hidden md:block"
      />
    </div>
  );
}

function Track({
  orientation,
  progress,
  fade,
  className = "",
}: {
  orientation: Orientation;
  progress: MotionValue<number>;
  fade: MotionValue<number>;
  className?: string;
}) {
  const vertical = orientation === "vertical";
  const p = useTransform(progress, (v) => v / LAST);
  const fillScale = useTransform(() => p.get() * fade.get());

  return (
    <div className={`relative ${className}`}>
      {/* Rail between the first and last node centres */}
      <div
        aria-hidden
        className={
          vertical
            ? "absolute bottom-[34px] left-5 top-[34px]"
            : "absolute left-[10%] right-[10%] top-6"
        }
      >
        <span
          className={
            vertical
              ? "absolute inset-y-0 -left-px w-[2px] rounded-full bg-white/12"
              : "absolute inset-x-0 -top-px h-[2px] rounded-full bg-white/12"
          }
        />
        <motion.span
          className={
            vertical
              ? "absolute inset-y-0 -left-px w-[2px] origin-top rounded-full bg-gradient-to-b from-lime/30 to-lime"
              : "absolute inset-x-0 -top-px h-[2px] origin-left rounded-full bg-gradient-to-r from-lime/30 to-lime"
          }
          style={vertical ? { scaleY: fillScale } : { scaleX: fillScale }}
        />
        <Packet vertical={vertical} progress={progress} fade={fade} />
      </div>

      <ol
        className={
          vertical ? "relative flex flex-col" : "relative grid grid-cols-5"
        }
      >
        {STEPS.map((step, i) => (
          <Node
            key={step.label}
            index={i}
            vertical={vertical}
            label={step.label}
            event={step.event}
            progress={progress}
            fade={fade}
          />
        ))}
      </ol>
    </div>
  );
}

function Packet({
  vertical,
  progress,
  fade,
}: {
  vertical: boolean;
  progress: MotionValue<number>;
  fade: MotionValue<number>;
}) {
  const pos = useTransform(progress, (v) => `${(v / LAST) * 100}%`);
  // The comet tail only shows while the packet is between two nodes.
  const tail = useTransform(progress, (v) =>
    Math.min(1, Math.sin(Math.PI * (v % 1)) * 1.8),
  );
  const tailScale = useTransform(tail, [0, 1], [0.2, 1]);
  return (
    <motion.span
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={
        vertical
          ? { top: pos, left: 0, opacity: fade }
          : { left: pos, top: 0, opacity: fade }
      }
    >
      {/* Comet tail */}
      <motion.span
        className={
          vertical
            ? "absolute bottom-1/2 left-1/2 h-14 w-[3px] -translate-x-1/2 origin-bottom rounded-full bg-gradient-to-b from-transparent to-lime"
            : "absolute right-1/2 top-1/2 h-[3px] w-24 -translate-y-1/2 origin-right rounded-full bg-gradient-to-r from-transparent to-lime"
        }
        style={
          vertical
            ? { opacity: tail, scaleY: tailScale }
            : { opacity: tail, scaleX: tailScale }
        }
      />
      <span className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/25 blur-[6px]" />
      <span className="relative block size-3 rounded-full bg-lime shadow-[0_0_12px_rgba(200,255,0,0.95)] ring-2 ring-ink" />
    </motion.span>
  );
}

function Node({
  index,
  vertical,
  label,
  event,
  progress,
  fade,
}: {
  index: number;
  vertical: boolean;
  label: string;
  event: string;
  progress: MotionValue<number>;
  fade: MotionValue<number>;
}) {
  const Icon = icons[label] ?? Globe;
  // 0 → 1 as the packet arrives (last quarter of its trip), dims on reset.
  const lit = useTransform(() => {
    const a = Math.min(Math.max((progress.get() - index + 0.25) / 0.25, 0), 1);
    return a * fade.get();
  });
  const scale = useTransform(lit, [0, 1], [1, 1.08]);
  const labelOpacity = useTransform(lit, [0, 1], [0.55, 1]);
  const eventColor = useTransform(
    lit,
    [0, 1],
    ["rgba(243,239,231,0.32)", "rgba(200,255,0,0.95)"],
  );

  return (
    <li
      className={
        vertical
          ? "flex h-[68px] items-center gap-4"
          : "flex flex-col items-center gap-3 px-2 text-center"
      }
    >
      <motion.span
        className={`relative grid shrink-0 place-items-center rounded-full border border-white/15 bg-ink ${
          vertical ? "size-10" : "size-12"
        }`}
        style={{ scale }}
      >
        <Icon
          className={vertical ? "size-[18px]" : "size-5"}
          strokeWidth={1.7}
        />
        {/* Lit state: lime disc with a dark icon */}
        <motion.span
          className="absolute -inset-px grid place-items-center rounded-full bg-lime text-ink shadow-[0_0_24px_rgba(200,255,0,0.55)]"
          style={{ opacity: lit }}
        >
          <Icon
            className={vertical ? "size-[18px]" : "size-5"}
            strokeWidth={2}
          />
        </motion.span>
      </motion.span>

      <div className="min-w-0">
        <motion.p
          className="text-[15px] font-semibold leading-tight"
          style={{ opacity: labelOpacity }}
        >
          {label}
        </motion.p>
        <motion.p
          className="mt-1 truncate text-[12.5px] md:whitespace-normal"
          style={{ color: eventColor }}
        >
          {event}
        </motion.p>
      </div>
    </li>
  );
}
