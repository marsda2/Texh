"use client";

import { useState, type AnimationEvent } from "react";
import { CalendarDays, Check, Send } from "lucide-react";

const BOOKINGS = [
  {
    initials: "JL",
    name: "Jamie Lee",
    action: "Booked a consultation",
    when: "Tomorrow, 11:00 AM",
    what: "15-minute consultation",
    source: "Website booking",
  },
  {
    initials: "MR",
    name: "Marco Ruiz",
    action: "Requested a quote",
    when: "Thursday, 9:30 AM",
    what: "On-site estimate",
    source: "Website form",
  },
  {
    initials: "SP",
    name: "Sofia Patel",
    action: "Booked a haircut",
    when: "Friday, 2:00 PM",
    what: "Cut & style, 45 min",
    source: "Website booking",
  },
] as const;

/** Muted grey bar shown while the card waits for the next booking. */
function Bar({ className, anim }: { className: string; anim: string }) {
  return (
    <span
      className={`la-${anim} absolute rounded-full bg-ink/[0.07] opacity-0 ${className}`}
    />
  );
}

/**
 * Glass "Live activity" card that replaces the old device mockup. A 9s CSS
 * loop tells one small story (booking → confirmed → confirmation sent →
 * record updated → fade → next booking); the keyframes live in globals.css
 * under "Live activity". Sizes are `cqw` of the wrapper so the card scales as
 * one piece, and the wrapper keeps the old box so the 3D layer stays anchored.
 */
export function LiveActivityCard({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const b = BOOKINGS[i];

  // Swap the data while the card is faded out, right as the loop restarts.
  const onLoop = (e: AnimationEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).dataset.laLoop !== undefined) {
      setI((n) => (n + 1) % BOOKINGS.length);
    }
  };

  return (
    <div
      className={`@container relative aspect-[1/0.7] select-none ${className}`}
      aria-hidden
    >
      {/* CSS entrance (globals.css "Hero entrance"): visible without JS. */}
      <div
        className="hero-card absolute inset-0"
        style={{ "--delay": "0.25s" } as React.CSSProperties}
      >
        {/* What the glass refracts: a lime orb, a graphite orb and a ring. */}
        <span className="absolute -right-[7cqw] -top-[9cqw] size-[32cqw] rounded-full bg-[radial-gradient(circle_at_35%_30%,#e6ff5c,#c8ff00_60%,#a9d900)] shadow-[0_0_8cqw_rgba(200,255,0,0.45)]" />
        <span className="absolute -bottom-[3cqw] -left-[9cqw] size-[22cqw] rounded-full bg-[radial-gradient(circle_at_35%_30%,#3a3b37,#161715_70%)]" />
        <span className="absolute -bottom-[3cqw] right-[3cqw] size-[14cqw] rounded-full border-[0.5cqw] border-ink/15" />

        <div
          className="la absolute left-1/2 top-1/2 w-[98cqw] -translate-x-1/2 -translate-y-1/2 rounded-[5cqw] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.62),rgba(255,255,255,0.26))] px-[4.6cqw] pb-[4.2cqw] pt-[3.6cqw] shadow-[0_5cqw_9cqw_-3cqw_rgba(40,38,30,0.3),inset_0_0.25cqw_0_rgba(255,255,255,0.95),inset_0_-0.4cqw_1.2cqw_rgba(255,255,255,0.4)] backdrop-blur-xl backdrop-saturate-150"
          onAnimationIteration={onLoop}
        >
          {/* Header: static, only the dot breathes. */}
          <div className="flex items-center justify-between border-b border-ink/10 pb-[2.4cqw]">
            <span className="text-[2.3cqw] font-medium uppercase tracking-[0.2em] text-ink/60">
              Live activity
            </span>
            <span className="flex items-center gap-[1.3cqw] text-[2.6cqw] font-semibold text-ink">
              <span className="relative grid size-[2.1cqw] place-items-center">
                <span className="la-pulse absolute inset-0 rounded-full bg-lime" />
                <span className="relative size-full rounded-full bg-lime shadow-[0_0_1.4cqw_rgba(200,255,0,0.9)]" />
              </span>
              Live
            </span>
          </div>

          {/* Person */}
          <div className="relative mt-[2.8cqw] flex items-center gap-[2.4cqw]">
            <div className="relative size-[8.6cqw] shrink-0">
              <span className="la-skel-a absolute inset-0 rounded-full bg-ink/[0.06] opacity-0" />
              <span
                data-la-loop
                className="la-person grid size-full place-items-center rounded-full bg-lime/25 font-display text-[2.9cqw] font-medium text-ink/80 ring-1 ring-white/70"
              >
                {b.initials}
              </span>
            </div>
            <div className="relative min-w-0 flex-1">
              <Bar anim="skel-a" className="left-0 top-[0.8cqw] h-[3cqw] w-[26cqw]" />
              <Bar anim="skel-a" className="left-0 top-[5.1cqw] h-[2.2cqw] w-[34cqw]" />
              <div className="la-person">
                <p className="font-display text-[4cqw] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                  {b.name}
                </p>
                <p className="mt-[0.5cqw] text-[2.8cqw] leading-[1.2] text-ink/60">
                  {b.action}
                </p>
              </div>
            </div>
            <span className="la-person text-[2.8cqw] text-ink/55">Just now</span>
          </div>

          {/* Booking */}
          <div className="relative mt-[2.8cqw] flex items-center gap-[2.4cqw] rounded-[3.2cqw] border border-white/80 bg-white/45 p-[2.6cqw] shadow-[inset_0_0.2cqw_0_rgba(255,255,255,0.8)]">
            <span className="relative grid size-[8.6cqw] shrink-0 place-items-center rounded-[2.2cqw] bg-white/70">
              <CalendarDays
                className="la-booking size-[4.1cqw] text-ink"
                strokeWidth={1.6}
              />
            </span>
            <div className="relative min-w-0 flex-1">
              <Bar anim="skel-a" className="left-0 top-[0.8cqw] h-[3cqw] w-[30cqw]" />
              <Bar anim="skel-a" className="left-0 top-[5.1cqw] h-[2.2cqw] w-[24cqw]" />
              <div className="la-booking">
                <p className="font-display text-[4cqw] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                  {b.when}
                </p>
                <p className="mt-[0.5cqw] text-[2.8cqw] leading-[1.2] text-ink/60">
                  {b.what}
                </p>
              </div>
            </div>
            <span className="la-booking">
              <span className="la-confirm block rounded-[2.4cqw] bg-lime/50 px-[3cqw] py-[1.8cqw] text-[2.9cqw] font-medium text-ink">
                Confirmed
              </span>
            </span>
          </div>

          {/* Confirmation sent */}
          <div className="relative">
            <span className="absolute left-[6.9cqw] top-0 h-[5cqw] w-[0.45cqw] -translate-x-1/2 rounded-full bg-ink/10" />
            <span className="la-line absolute left-[6.9cqw] top-0 h-[5cqw] w-[0.45cqw] -translate-x-1/2 origin-top rounded-full bg-lime shadow-[0_0_1cqw_rgba(200,255,0,0.8)]" />

            <div className="flex items-center gap-[3.4cqw] pt-[5cqw]">
              <span className="relative ml-[4.2cqw] grid size-[5.4cqw] shrink-0 place-items-center rounded-full border-[0.35cqw] border-ink/10">
                <span className="la-node absolute -inset-[0.35cqw] grid place-items-center rounded-full bg-lime shadow-[0_0_1.6cqw_rgba(200,255,0,0.7)]">
                  <Check className="size-[2.9cqw] text-ink" strokeWidth={3.2} />
                </span>
              </span>

              <div className="relative flex h-[7.9cqw] min-w-0 flex-1 items-center justify-between rounded-[3cqw] border border-white/80 bg-white/45 px-[3.6cqw] shadow-[inset_0_0.2cqw_0_rgba(255,255,255,0.8)]">
                <Bar anim="skel-b" className="left-[3.6cqw] top-[2.9cqw] h-[2.2cqw] w-[36cqw]" />
                <span className="la-conf text-[2.9cqw] font-semibold text-ink">
                  Confirmation sent automatically
                </span>
                <Send
                  className="la-plane size-[3.4cqw] text-ink/50"
                  strokeWidth={1.6}
                />
              </div>
            </div>
          </div>

          {/* Pipeline footnote */}
          <div className="relative mt-[2.4cqw] flex h-[3cqw] items-center gap-[1.4cqw] text-[2.3cqw] text-ink/60">
            <span className="la-booking">{b.source}</span>
            <span className="relative h-[2cqw] w-[3.6cqw] overflow-hidden">
              <svg
                viewBox="0 0 36 20"
                className="la-arrow absolute inset-0 size-full"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 10 H32 M25 3 L33 10 L25 17" />
              </svg>
              <span className="la-glint absolute left-0 top-1/2 size-[1.1cqw] -translate-y-1/2 rounded-full bg-lime opacity-0 shadow-[0_0_1.2cqw_0.3cqw_rgba(200,255,0,0.9)]" />
            </span>
            <span className="relative">
              <Bar anim="skel-c" className="left-0 top-[0.4cqw] h-[2cqw] w-[23cqw]" />
              <span className="la-record">Customer record updated</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
