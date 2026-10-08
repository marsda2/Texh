"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { Lock } from "lucide-react";
import { ownership } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

/** The headline, with "renting" struck through by a lime line that draws itself. */
export function RentingTitle() {
  const [before, after] = ownership.title.split("renting");
  return (
    <h2 className="mt-4 font-display text-[clamp(2.3rem,10.5vw,3.2rem)] font-black leading-[0.96] tracking-[-0.045em] md:text-[clamp(3.2rem,5.2vw,5.2rem)]">
      {before}
      <span className="relative inline-block text-cream/45">
        renting
        <motion.span
          aria-hidden
          className="absolute -left-[2%] top-[54%] h-[0.11em] w-[104%] origin-left rounded-full bg-lime shadow-[0_0_24px_rgba(200,255,0,0.7)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
        />
      </span>
      {after}
    </h2>
  );
}

const STRIKE =
  "bg-no-repeat [background-image:linear-gradient(currentColor,currentColor)] [background-position:0_58%] [box-decoration-break:clone]";

/**
 * One card that plays the same little story for each app it replaces:
 *   1. the app's promise gets struck through,
 *   2. a lime eraser sweeps it away,
 *   3. a check circle draws itself and the Texh Co version appears.
 * It loops on its own while on screen, and the tabs jump to any of the three.
 */
export function SwapCard() {
  const rows = ownership.rows;
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState(0);
  // Bumped on a manual pick so the same row can replay and the timers restart.
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  const erase = useMotionValue(0);
  const clip = useMotionTemplate`inset(0 0 0 ${erase}%)`;
  const barLeft = useMotionTemplate`${erase}%`;

  useEffect(() => {
    if (reduced) {
      erase.set(100);
      return;
    }
    if (!inView) return;
    erase.set(0);
    const timers = [
      setTimeout(() => setPhase(0), 0),
      setTimeout(() => {
        setPhase(1);
        animate(erase, 100, { duration: 0.8, ease: [0.6, 0, 0.2, 1] });
      }, 1400),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setI((n) => (n + 1) % rows.length), 5800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [i, run, inView, reduced, erase, rows.length]);

  const row = rows[i];
  // Reduced motion: no story, just the finished state.
  const p = reduced ? 2 : phase;
  const pick = (n: number) => {
    setI(n);
    setRun((r) => r + 1);
  };

  return (
    <div ref={ref} className="w-full">
      {/* Tabs: which app are we replacing? */}
      <div role="tablist" className="flex gap-2">
        {rows.map((r, n) => {
          const on = n === i;
          return (
            <button
              key={r.short}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => pick(n)}
              className={`relative flex-1 overflow-hidden rounded-full border px-3 py-2.5 text-[13px] font-semibold transition-colors duration-300 md:text-[14px] ${
                on
                  ? "border-lime/50 bg-white/[0.08] text-cream"
                  : "border-white/10 text-cream/45 hover:text-cream/80"
              }`}
            >
              {r.short}
              {on && !reduced && (
                <motion.span
                  key={`${i}-${run}`}
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-lime"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 5.8, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {/* Rented: the app's promise, struck through and then erased */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#161714] px-5 pb-5 pt-4 md:px-7 md:pb-6 md:pt-5">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/40">
            <Lock className="size-3" strokeWidth={2.4} />
            Rented
          </span>

          <motion.div key={i} style={{ clipPath: clip }} className="mt-3">
            <p className="font-display text-[clamp(1.5rem,6.5vw,1.9rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-cream/60">
              <motion.span
                className={`${STRIKE} text-cream/70`}
                initial={{ backgroundSize: "0% 3px" }}
                animate={{ backgroundSize: "100% 3px" }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
              >
                {row.them}
              </motion.span>
            </p>
            <p className="mt-2 text-[15px] leading-snug text-cream/55">
              <motion.span
                className={`${STRIKE} text-cream/50`}
                initial={{ backgroundSize: "0% 2px" }}
                animate={{ backgroundSize: "100% 2px" }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
              >
                {row.themSays}
              </motion.span>
            </p>
          </motion.div>

          {/* What's left after the erase: two blank lines, like a wiped slate */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-5 top-[46px] flex flex-col gap-3 md:left-7 md:top-[50px]"
            animate={{ opacity: p >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-7 w-44 rounded-full bg-white/[0.06] md:w-60" />
            <span className="h-3.5 w-60 max-w-[70vw] rounded-full bg-white/[0.04] md:w-80" />
          </motion.div>

          {/* The eraser */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-3 top-9 w-[14px] -translate-x-1/2 rounded-full bg-lime shadow-[0_0_28px_rgba(200,255,0,0.9)]"
            style={{ left: barLeft }}
            animate={{ opacity: p === 1 ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          />
        </div>

        {/* Owned: a check circle draws itself, then the Texh Co version */}
        <div className="relative min-h-[112px] overflow-hidden rounded-[24px] border border-dashed border-lime/25 md:min-h-[120px]">
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center gap-4 bg-lime px-5 text-ink md:px-7"
            initial={false}
            animate={{ clipPath: p >= 2 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <svg viewBox="0 0 44 44" className="size-11 shrink-0 md:size-12" fill="none">
              <motion.circle
                cx="22"
                cy="22"
                r="19"
                stroke="#111"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: p >= 2 ? 1 : 0, opacity: p >= 2 ? 1 : 0 }}
                transition={{ duration: 0.55, ease, delay: p >= 2 ? 0.1 : 0 }}
              />
              <motion.path
                d="M13 23 L20 30 L32 15"
                stroke="#111"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: p >= 2 ? 1 : 0, opacity: p >= 2 ? 1 : 0 }}
                transition={{ duration: 0.35, ease, delay: p >= 2 ? 0.5 : 0 }}
              />
            </svg>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/60">
                Texh Co
              </p>
              <p className="mt-1 font-display text-[clamp(1.2rem,5vw,1.5rem)] font-extrabold leading-[1.15] tracking-[-0.025em]">
                {row.us}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-[14px] leading-snug text-cream/60">
        <span className="font-semibold text-cream">{ownership.leave}</span>
      </p>
    </div>
  );
}
