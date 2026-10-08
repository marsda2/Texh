"use client";

import { motion } from "motion/react";
import { Check, MapPin, Search, Star } from "lucide-react";
import type { Service } from "@/content/site";
import { Counter, EASE, ShowcaseFrame, useLoop } from "./shared";

const OTHERS = ["Cutz & Co", "Main St Barbers"];

const CHECKS = ["Profile completed", "Service pages live", "Review requests on"];

// Sample numbers per stage (0 to 4). Stage 4 holds the final state.
const REVIEWS = [31, 52, 78, 96, 96];
const CALLS = [18, 26, 34, 44, 44];
const DIRECTIONS = [22, 30, 41, 57, 57];
const BOOKINGS = [6, 9, 12, 17, 17];
const SOURCES = [
  { label: "Maps", color: "#c8ff00", pct: [48, 54, 60, 64, 64] },
  { label: "Search", color: "#8fb800", pct: [30, 28, 26, 24, 24] },
  { label: "Social", color: "#4d5a1a", pct: [22, 18, 14, 12, 12] },
];

/** A small business climbing the local map pack, with the report that proves it. */
export function GrowthShowcase({ service }: { service: Service }) {
  const { ref, step: s } = useLoop({ count: 5, interval: 2300 });
  const { eyebrow, title, body } = service.detail.showcase;

  const rank = s === 0 ? 3 : s === 1 ? 2 : 1;
  // Rows in display order: you start third, then overtake the others one by one.
  const order =
    rank === 3
      ? [OTHERS[0], OTHERS[1], "You"]
      : rank === 2
        ? [OTHERS[0], "You", OTHERS[1]]
        : ["You", OTHERS[0], OTHERS[1]];

  return (
    <ShowcaseFrame
      eyebrow={eyebrow}
      title={title}
      body={body}
      className="bg-[radial-gradient(120%_80%_at_80%_0%,#2b2f1f_0%,#181916_55%)] text-cream"
      copyExtra={
        <ul className="mt-8 flex flex-col gap-2.5">
          {CHECKS.map((c, i) => {
            const done = s > i;
            return (
              <li key={c} className="flex items-center gap-3 text-[15px] font-semibold">
                <motion.span
                  className="grid size-7 place-items-center rounded-full border border-white/20"
                  animate={{
                    backgroundColor: done ? "#c8ff00" : "rgba(255,255,255,0)",
                    color: done ? "#111" : "rgba(255,255,255,0.3)",
                    scale: done ? [1, 1.25, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </motion.span>
                <span className={done ? "text-cream" : "text-cream/45"}>{c}</span>
              </li>
            );
          })}
        </ul>
      }
    >
      <div ref={ref} className="grid gap-4 sm:grid-cols-2">
        {/* Map pack */}
        <div className="overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3 text-[12px] font-medium text-ink/60">
            <Search className="size-3.5" strokeWidth={2.2} />
            barber near me
            <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-ink/60" />
          </div>

          {/* Map */}
          <div className="relative h-[130px] overflow-hidden bg-[#e9efe2]">
            <svg viewBox="0 0 300 130" className="absolute inset-0 size-full" fill="none">
              <path d="M-5 95 C60 70 100 110 170 80 S270 50 310 70" stroke="#fff" strokeWidth="10" />
              <path d="M90 -5 C105 40 80 80 110 135" stroke="#fff" strokeWidth="8" />
              <path d="M210 -5 C195 40 230 80 215 135" stroke="#fff" strokeWidth="7" />
            </svg>
            <Pin x="18%" y="38%" muted />
            <Pin x="76%" y="30%" muted />
            <motion.span
              className="absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-[12px] font-extrabold text-lime shadow-lg"
              initial={{ left: "38%", top: "62%", width: 30, height: 30 }}
              animate={{
                left: rank === 1 ? "50%" : rank === 2 ? "56%" : "38%",
                top: rank === 1 ? "46%" : "62%",
                width: rank === 1 ? 40 : 30,
                height: rank === 1 ? 40 : 30,
                boxShadow:
                  rank === 1
                    ? "0 0 0 6px rgba(200,255,0,0.55), 0 0 30px rgba(200,255,0,0.8)"
                    : "0 0 0 0 rgba(200,255,0,0)",
              }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {rank}
            </motion.span>
          </div>

          {/* Results */}
          <ul className="flex flex-col p-2">
            {order.map((name) => {
              const you = name === "You";
              return (
                <motion.li
                  key={name}
                  layout
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${you ? "bg-lime/50 ring-1 ring-ink/80" : ""}`}
                >
                  <MapPin className="size-4 shrink-0" strokeWidth={2} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold">
                      {you ? "Northside Barbers" : name}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-ink/55">
                      <Star className="size-3 fill-[#f5b301] text-[#f5b301]" />
                      {you ? (
                        <>
                          {rank === 3 ? "4.4" : rank === 2 ? "4.7" : "4.9"} (
                          <Counter value={REVIEWS[s]} />)
                        </>
                      ) : (
                        <>4.6 (60)</>
                      )}
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Weekly report */}
        <div className="flex flex-col rounded-[28px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm md:p-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-[18px] font-extrabold tracking-[-0.02em]">Weekly report</p>
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">
              Sample
            </span>
          </div>

          <ul className="mt-4 flex flex-col gap-3">
            <Metric label="Calls" value={CALLS[s]} tone={0} />
            <Metric label="Directions" value={DIRECTIONS[s]} tone={1} />
            <Metric label="Bookings" value={BOOKINGS[s]} tone={2} />
          </ul>

          <div className="mt-auto pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/50">
              Where they came from
            </p>
            <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-white/10">
              {SOURCES.map((src) => (
                <motion.span
                  key={src.label}
                  className="h-full"
                  style={{ backgroundColor: src.color }}
                  animate={{ width: `${src.pct[s]}%` }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              ))}
            </div>
            <ul className="mt-2 flex gap-4 text-[11px] text-cream/65">
              {SOURCES.map((src) => (
                <li key={src.label} className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ backgroundColor: src.color }} />
                  {src.label} {src.pct[s]}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ShowcaseFrame>
  );
}

/** A competitor on the map: a plain dot. */
function Pin({ x, y }: { x: string; y: string; muted?: boolean }) {
  return (
    <span
      className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink/50 shadow"
      style={{ left: x, top: y }}
    />
  );
}

// A rising sparkline per metric. They draw themselves once.
const SPARKS = [
  "M0 22 L14 20 L28 21 L42 14 L56 16 L70 8 L84 4",
  "M0 24 L14 21 L28 22 L42 16 L56 12 L70 9 L84 3",
  "M0 25 L14 24 L28 20 L42 18 L56 12 L70 7 L84 2",
];

function Metric({ label, value, tone }: { label: string; value: number; tone: number }) {
  return (
    <li className="flex items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cream/55">{label}</p>
        <Counter
          value={value}
          className="font-display text-[30px] font-black leading-none tracking-[-0.04em]"
        />
      </div>
      <svg viewBox="0 0 84 28" className="h-8 w-24" fill="none">
        <motion.path
          d={SPARKS[tone]}
          stroke="#c8ff00"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE, delay: tone * 0.2 }}
        />
      </svg>
    </li>
  );
}
