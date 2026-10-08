"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Looping band of the service's own keywords. The list is doubled so -50% is seamless. */
export function KeywordBand({ words }: { words: string[] }) {
  const list = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-4 text-cream md:py-6" aria-hidden>
      <div className="marquee-x flex w-max items-center whitespace-nowrap [animation-duration:48s]">
        {list.map((w, i) => (
          <span
            key={i}
            className="flex items-center font-display text-[clamp(1.4rem,5vw,2.4rem)] font-black uppercase leading-none tracking-[-0.03em]"
          >
            {w}
            <span className="mx-6 text-[0.6em] text-lime md:mx-9">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** "What changes": the old way struck through, the new way lit up. */
export function ShiftList({
  items,
}: {
  items: readonly { before: string; after: string }[];
}) {
  return (
    <ul className="mt-10 flex flex-col gap-3 md:mt-14 md:gap-4">
      {items.map((item, i) => (
        <motion.li
          key={item.before}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.8, delay: i * 0.08, ease }}
          className="group grid items-center gap-4 rounded-[26px] border border-line bg-paper p-6 transition-colors duration-500 hover:border-ink/25 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:p-9"
        >
          <p className="font-display text-[clamp(1.2rem,5vw,1.5rem)] font-bold leading-snug tracking-[-0.02em] text-ink/40 md:text-[clamp(1.3rem,1.9vw,1.75rem)]">
            {/* Per-line strike-through that draws itself, even when the text wraps */}
            <motion.span
              className="bg-no-repeat [background-image:linear-gradient(rgba(17,17,17,0.5),rgba(17,17,17,0.5))] [background-position:0_58%] [box-decoration-break:clone]"
              initial={{ backgroundSize: "0% 3px" }}
              whileInView={{ backgroundSize: "100% 3px" }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.08, ease }}
            >
              {item.before}
            </motion.span>
          </p>

          <span className="grid size-11 place-items-center rounded-full bg-lime text-ink shadow-[0_0_24px_rgba(200,255,0,0.45)] transition-transform duration-500 group-hover:translate-x-1 max-md:rotate-90 md:size-12">
            <ArrowRight className="size-5" strokeWidth={2.4} />
          </span>

          <p className="flex items-start gap-3 font-display text-[clamp(1.2rem,5vw,1.5rem)] font-extrabold leading-snug tracking-[-0.025em] md:text-[clamp(1.3rem,1.9vw,1.75rem)]">
            <Check className="mt-1.5 size-5 shrink-0" strokeWidth={3} />
            {item.after}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}

/** Three steps on a line that draws itself as you scroll. */
export function Timeline({
  steps,
}: {
  steps: readonly { when: string; title: string; body: string }[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const n = v > 0.9 ? 3 : v > 0.5 ? 2 : v > 0.08 ? 1 : 0;
    setReached((r) => (r === n ? r : n));
  });

  return (
    <ol ref={ref} className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
      {/* Track + drawn line: vertical on phones, horizontal from md up */}
      <span className="absolute bottom-6 left-[15px] top-4 w-[2px] rounded-full bg-ink/10 md:hidden" />
      <motion.span
        className="absolute bottom-6 left-[15px] top-4 w-[2px] origin-top rounded-full bg-ink md:hidden"
        style={{ scaleY: progress }}
      />
      <span className="absolute left-0 right-0 top-[15px] hidden h-[2px] rounded-full bg-ink/10 md:block" />
      <motion.span
        className="absolute left-0 right-0 top-[15px] hidden h-[2px] origin-left rounded-full bg-ink md:block"
        style={{ scaleX: progress }}
      />

      {steps.map((step, i) => {
        const on = reached > i;
        return (
          <li key={step.title} className="relative pl-12 md:pl-0 md:pt-14">
            <motion.span
              className="absolute left-0 top-0 grid size-8 place-items-center rounded-full border-2 border-ink font-display text-[12px] font-extrabold"
              animate={{
                backgroundColor: on ? "#c8ff00" : "#faf7ef",
                scale: on ? [1, 1.25, 1] : 1,
                boxShadow: on ? "0 0 22px rgba(200,255,0,0.8)" : "0 0 0 rgba(200,255,0,0)",
              }}
              transition={{ duration: 0.5 }}
            >
              {i + 1}
            </motion.span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55">
              {step.when}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.5rem,6vw,1.75rem)] font-extrabold leading-tight tracking-[-0.035em]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[380px] text-[15px] leading-relaxed text-muted">
              {step.body}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
