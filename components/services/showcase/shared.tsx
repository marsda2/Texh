"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Steps through 0..count-1 on a timer, but only while the demo is on screen.
 * Reduced motion: parks on the last step (the finished state).
 */
export function useLoop({
  count,
  interval,
  paused = false,
  amount = 0.3,
}: {
  count: number;
  interval: number;
  paused?: boolean;
  amount?: number;
}): {
  ref: RefObject<HTMLDivElement | null>;
  step: number;
  setStep: (n: number) => void;
  inView: boolean;
} {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  // Bumped on a manual jump so the timer restarts from zero.
  const [resets, setResets] = useState(0);

  useEffect(() => {
    if (reduced || !inView || paused) return;
    const id = setInterval(() => setStep((s) => (s + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval, paused, reduced, inView, resets]);

  const jump = (n: number) => {
    setStep(n);
    setResets((r) => r + 1);
  };

  return { ref, step: reduced ? count - 1 : step, setStep: jump, inView };
}

/** A number that eases to its new value instead of jumping. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`);
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.8, ease: EASE });
    return () => controls.stop();
  }, [mv, value]);
  return <motion.span className={className}>{text}</motion.span>;
}

/**
 * The themed stage every demo sits in: copy on one side, the live demo on the
 * other, stacked on phones.
 */
export function ShowcaseFrame({
  eyebrow,
  title,
  body,
  copyExtra,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  body: string;
  copyExtra?: ReactNode;
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] p-6 md:rounded-[44px] md:p-12 lg:p-16 ${className}`}
    >
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] opacity-70">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,9vw,3rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(2.6rem,3.9vw,4rem)]">
            {title}
          </h2>
          <p className="mt-5 max-w-[460px] text-[16px] leading-relaxed opacity-75 md:text-[17px]">
            {body}
          </p>
          {copyExtra}
        </div>
        <div className="md:col-span-7">{children}</div>
      </div>
    </div>
  );
}
