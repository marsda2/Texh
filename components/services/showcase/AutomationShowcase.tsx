"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  Bell,
  CalendarCheck,
  Heart,
  MessageSquareText,
  Moon,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/site";
import { Counter, EASE, ShowcaseFrame } from "./shared";

type Auto = {
  id: string;
  name: string;
  when: string;
  Icon: LucideIcon;
  /** The message this automation sends, and what you lose without it. */
  thread: { from: "client" | "biz"; text: string }[];
  missed: string;
};

// In the order they happen to one client.
const AUTOS: Auto[] = [
  {
    id: "after",
    name: "After-hours reply",
    when: "11:01 pm",
    Icon: Moon,
    thread: [
      { from: "client", text: "Do you have anything Saturday?" },
      { from: "biz", text: "Yes! Sat 11:00 am is open. Want it?" },
    ],
    missed: "The DM waits until morning. The client books elsewhere.",
  },
  {
    id: "confirm",
    name: "Booking confirmation",
    when: "Instant",
    Icon: CalendarCheck,
    thread: [{ from: "biz", text: "You’re booked: Sat 11:00 am at Northside. See you then!" }],
    missed: "No confirmation. The client wonders if it worked.",
  },
  {
    id: "remind",
    name: "Reminder",
    when: "Day before",
    Icon: Bell,
    thread: [{ from: "biz", text: "Reminder: tomorrow at 11:00 am. Reply 1 to confirm." }],
    missed: "No reminder. Higher chance of a no-show.",
  },
  {
    id: "review",
    name: "Review request",
    when: "After the visit",
    Icon: MessageSquareText,
    thread: [{ from: "biz", text: "Thanks for coming in! Mind leaving a quick Google review? ★★★★★" }],
    missed: "No ask. Happy clients never leave a review.",
  },
  {
    id: "winback",
    name: "Win-back",
    when: "6 weeks later",
    Icon: Heart,
    thread: [{ from: "biz", text: "It’s been a while! Want your usual spot this week?" }],
    missed: "Nobody checks in. The client drifts away.",
  },
];

/** Switch automations on and off and watch the client's thread change. */
export function AutomationShowcase({ service }: { service: Service }) {
  const [on, setOn] = useState<Record<string, boolean>>(
    Object.fromEntries(AUTOS.map((a) => [a.id, true])),
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { eyebrow, title, body } = service.detail.showcase;

  const sent = AUTOS.filter((a) => on[a.id]).reduce(
    (n, a) => n + a.thread.filter((m) => m.from === "biz").length,
    0,
  );

  return (
    <ShowcaseFrame
      eyebrow={eyebrow}
      title={title}
      body={body}
      className="bg-[#fbfaf5] text-ink ring-1 ring-black/[0.06]"
      copyExtra={
        <ul className="mt-8 flex flex-col gap-2">
          {AUTOS.map((a) => {
            const active = on[a.id];
            return (
              <li key={a.id}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => setOn((s) => ({ ...s, [a.id]: !s[a.id] }))}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                    active ? "border-ink/15 bg-white" : "border-dashed border-ink/20 bg-transparent"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      active ? "bg-ink text-lime" : "bg-ink/10 text-ink/40"
                    }`}
                  >
                    <a.Icon className="size-4" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[15px] font-semibold transition-opacity ${active ? "" : "opacity-50"}`}>
                      {a.name}
                    </span>
                    <span className="block text-[12px] text-ink/50">{a.when}</span>
                  </span>
                  {/* Switch */}
                  <span
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                      active ? "bg-lime shadow-[0_0_16px_rgba(200,255,0,0.6)]" : "bg-ink/15"
                    }`}
                  >
                    <motion.span
                      className="absolute left-1 top-1 size-5 rounded-full bg-ink"
                      animate={{ x: active ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      }
    >
      <div ref={ref} className="relative mx-auto w-full max-w-[400px]">
        <div className="absolute inset-x-[10%] -bottom-3 h-[12%] rounded-[50%] bg-lime/50 blur-[30px]" />
        <div className="relative rounded-[40px] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex h-[520px] flex-col overflow-hidden rounded-[32px] bg-[#f2efe6] md:h-[560px]">
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-black/5 bg-white px-4 pb-3 pt-4">
              <span className="grid size-9 place-items-center rounded-full bg-ink font-display text-[13px] font-extrabold text-lime">
                N
              </span>
              <span className="flex-1">
                <span className="block text-[14px] font-bold leading-tight">Northside Barbers</span>
                <span className="block text-[11px] text-ink/50">Messages sent for you</span>
              </span>
              <span className="rounded-full bg-lime px-2.5 py-1 text-[12px] font-extrabold">
                <Counter value={sent} />
              </span>
            </div>

            {/* Thread */}
            <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-4 pt-3">
              <AnimatePresence initial={false} mode="popLayout">
                {inView &&
                  AUTOS.map((a, ai) =>
                    on[a.id] ? (
                      <motion.div
                        key={`${a.id}-on`}
                        layout
                        className="flex flex-col gap-1.5"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, height: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: ai * 0.12 }}
                      >
                        <span className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/35">
                          {a.when}
                        </span>
                        {a.thread.map((m) => (
                          <span
                            key={m.text}
                            className={`max-w-[84%] rounded-2xl px-3.5 py-2 text-[12.5px] leading-snug ${
                              m.from === "biz"
                                ? "self-end rounded-br-md bg-ink text-white"
                                : "self-start rounded-bl-md bg-white text-ink"
                            }`}
                          >
                            {m.text}
                          </span>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`${a.id}-off`}
                        layout
                        className="rounded-xl border border-dashed border-[#d9534f]/40 bg-[#d9534f]/[0.07] px-3 py-2 text-center text-[11.5px] font-medium leading-snug text-[#a63a36]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        {a.missed}
                      </motion.div>
                    ),
                  )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-[12px] font-medium text-ink/50">
          Try the switches. This is a live demo.
        </p>
      </div>
    </ShowcaseFrame>
  );
}
