"use client";

import { motion } from "motion/react";
import { ArrowDown, Check, FileSpreadsheet, MessageCircle, NotebookPen } from "lucide-react";
import type { Service } from "@/content/site";
import { Counter, EASE, ShowcaseFrame, useLoop } from "./shared";

const OLD_TOOLS = [
  { label: "Spreadsheet", Icon: FileSpreadsheet },
  { label: "WhatsApp group", Icon: MessageCircle },
  { label: "Notebook", Icon: NotebookPen },
];

const JOBS = [
  { who: "Maria G.", what: "Leak repair", amount: 180 },
  { who: "Tom’s Deli", what: "AC service", amount: 240 },
  { who: "J. Alvarez", what: "Panel upgrade", amount: 620 },
  { who: "Lena P.", what: "Water heater", amount: 390 },
];

const STAGES = ["Quote sent", "Booked", "On the way", "Paid"];
const STAGE_STYLE = [
  "bg-neutral-100 text-ink/70",
  "bg-ink text-white",
  "bg-[#fff3c4] text-ink",
  "bg-lime text-ink",
];

/** A day of work moving through one owner panel. */
export function SoftwareShowcase({ service }: { service: Service }) {
  // One tick per 1.2s. Job i starts moving at tick 2i and takes 3 steps to get paid.
  const { ref, step: t } = useLoop({ count: 14, interval: 1200 });
  const { eyebrow, title, body } = service.detail.showcase;

  const stages = JOBS.map((_, i) => Math.min(3, Math.max(0, t - i * 2)));
  const open = stages.filter((s) => s === 0).length;
  const active = stages.filter((s) => s === 1 || s === 2).length;
  const paid = 1240 + JOBS.reduce((sum, j, i) => sum + (stages[i] === 3 ? j.amount : 0), 0);

  return (
    <ShowcaseFrame
      eyebrow={eyebrow}
      title={title}
      body={body}
      className="bg-lime text-ink"
      copyExtra={
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] opacity-60">
            What it replaces
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OLD_TOOLS.map(({ label, Icon }, i) => (
              <li
                key={label}
                className="relative inline-flex items-center gap-2 rounded-full bg-ink/10 px-3.5 py-2 text-[13px] font-semibold"
              >
                <Icon className="size-4" strokeWidth={2} />
                {label}
                <motion.span
                  aria-hidden
                  className="absolute inset-x-2 top-1/2 h-[2px] origin-left rounded-full bg-ink"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.25, ease: EASE }}
                />
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-2 text-[14px] font-bold">
            <ArrowDown className="size-4" strokeWidth={2.4} />
            One panel, built around how you work.
          </p>
        </div>
      }
    >
      <div ref={ref} className="mx-auto w-full max-w-[560px]">
        <motion.div
          className="rounded-[28px] bg-white p-4 shadow-[0_40px_70px_-30px_rgba(40,60,0,0.6)] md:p-6"
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/45">
                Owner panel
              </p>
              <p className="font-display text-[22px] font-extrabold tracking-[-0.03em]">Today</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-semibold">
              <span className="size-1.5 animate-pulse rounded-full bg-[#28c840]" />
              Live
            </span>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2.5 md:gap-3">
            <Stat label="Open quotes" value={open} />
            <Stat label="In progress" value={active} />
            <Stat label="Paid this week" value={paid} prefix="$" dark />
          </div>

          {/* Jobs */}
          <ul className="mt-4 flex flex-col gap-2">
            {JOBS.map((job, i) => {
              const stage = stages[i];
              return (
                <motion.li
                  key={job.who}
                  layout
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 px-3.5 py-3"
                  animate={{
                    backgroundColor: stage === 3 ? "#f6ffd0" : "#ffffff",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-[12px] font-bold">
                    {job.who
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-bold">{job.who}</span>
                    <span className="block truncate text-[12px] text-ink/55">
                      {job.what} · ${job.amount}
                    </span>
                  </span>
                  <span
                    key={stage}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors duration-300 ${STAGE_STYLE[stage]}`}
                  >
                    {stage === 3 ? (
                      <Check className="size-3" strokeWidth={3} />
                    ) : stage === 2 ? (
                      <span className="size-1.5 animate-pulse rounded-full bg-ink" />
                    ) : null}
                    {STAGES[stage]}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </ShowcaseFrame>
  );
}

function Stat({
  label,
  value,
  prefix,
  dark,
}: {
  label: string;
  value: number;
  prefix?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-3 py-3 md:px-4 ${dark ? "bg-ink text-white" : "bg-neutral-100"}`}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-[0.12em] md:text-[11px] ${dark ? "text-lime" : "text-ink/50"}`}>
        {label}
      </p>
      <Counter
        value={value}
        prefix={prefix}
        className="mt-1 block font-display text-[22px] font-extrabold leading-none tracking-[-0.03em] md:text-[26px]"
      />
    </div>
  );
}
