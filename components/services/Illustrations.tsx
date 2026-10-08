"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import {
  Bell,
  CalendarCheck,
  Check,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Search,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import type { CardTheme } from "@/content/site";

const ROOM = "https://images.unsplash.com/photo-1695527081827-fdbc4e77be9b";

type Props = { active: boolean; theme: CardTheme };

// Shared "pop to lime" behaviour for highlighted UI bits.
const pick: Variants = {
  off: { backgroundColor: "rgba(255,255,255,0.07)", color: "#f3efe7" },
  on: (d: number = 0) => ({
    backgroundColor: "#c8ff00",
    color: "#111111",
    transition: { delay: d, duration: 0.35 },
  }),
};

/**
 * Tilted glass device with a chrome bevel, a floor glow and a glossy sphere.
 * Everything inside is sized in `cqw` of the device.
 */
export function GlassDevice({
  theme,
  active,
  children,
}: Props & { children: ReactNode }) {
  const onLime = theme === "lime";
  return (
    <div className="@container relative aspect-[1.32] w-full">
      {/* Floor glow */}
      <div
        className="absolute inset-x-[10%] -bottom-[4%] h-[20%] rounded-[50%] blur-[22px]"
        style={{
          background: onLime
            ? "rgba(17,17,17,0.35)"
            : theme === "paper"
              ? "rgba(120,150,0,0.35)"
              : "rgba(200,255,0,0.45)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          transform:
            "perspective(1400px) rotateX(14deg) rotateY(-12deg) rotateZ(4deg)",
        }}
      >
        <div className="h-full w-full rounded-[7cqw] bg-[linear-gradient(140deg,#fafafa_0%,#8d8d8d_16%,#f4f4f4_32%,#3b3b3b_52%,#cfcfcf_70%,#555_86%,#ececec_100%)] p-[1.5cqw] shadow-[0_6cqw_10cqw_-5cqw_rgba(0,0,0,0.6)]">
          <div className="relative h-full w-full overflow-hidden rounded-[5.6cqw] bg-[linear-gradient(160deg,#1e1f1c,#0f100e)] shadow-[inset_0_0_0_0.4cqw_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-[1.2cqw] px-[4cqw] pt-[3.4cqw]">
              <span className="size-[2.2cqw] rounded-full bg-[#ff5f57]" />
              <span className="size-[2.2cqw] rounded-full bg-[#febc2e]" />
              <span className="size-[2.2cqw] rounded-full bg-[#28c840]" />
              <span className="ml-[3cqw] h-[3.4cqw] flex-1 rounded-full bg-white/[0.08]" />
            </div>
            {children}
            {/* Glass reflection */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.05)_100%)]" />
          </div>
        </div>
      </div>

      {/* Glossy sphere */}
      <motion.span
        className="absolute -right-[2%] bottom-[10%] size-[13cqw] rounded-full"
        style={{
          background: onLime
            ? "radial-gradient(circle at 32% 28%, #8a8a86 0%, #2b2c28 40%, #0b0b0a 100%)"
            : "radial-gradient(circle at 32% 28%, #f7ffd0 0%, #dcff45 20%, #b9ea00 52%, #5d7800 100%)",
          boxShadow: onLime
            ? "0 2cqw 4cqw rgba(0,0,0,0.45)"
            : "0 0 6cqw rgba(200,255,0,0.45), 0 2cqw 4cqw rgba(0,0,0,0.35)",
        }}
        animate={active ? { y: ["0%", "-14%", "0%"] } : { y: "0%" }}
        transition={
          active
            ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      />
    </div>
  );
}

/* 01 — Web development: booking widget */
export function BookingScreen({ active }: Props) {
  const state = active ? "on" : "off";
  const days = [
    ["Mon", "12"],
    ["Tue", "13"],
    ["Wed", "14"],
    ["Thu", "15"],
  ];
  const times = ["9:00 AM", "11:00 AM", "2:00 PM"];
  return (
    <div className="absolute inset-x-0 bottom-0 top-[9cqw] grid grid-cols-[0.78fr_1.22fr] gap-[3.5cqw] p-[4cqw] pt-[3cqw]">
      <div className="relative overflow-hidden rounded-[3cqw] bg-neutral-700">
        <Image
          src={ROOM}
          alt=""
          fill
          sizes="(max-width: 767px) 30vw, 14vw"
          className="object-cover object-[30%_50%]"
        />
      </div>
      <div className="flex min-w-0 flex-col">
        <p className="text-[4.4cqw] font-semibold tracking-[-0.01em] text-white">
          Book a Service
        </p>
        <div className="mt-[3cqw] grid grid-cols-4 gap-[1.6cqw]">
          {days.map(([d, n], i) => (
            <motion.div
              key={d}
              className="rounded-[2.2cqw] py-[1.6cqw] text-center leading-tight"
              variants={i === 1 ? pick : undefined}
              initial="off"
              animate={state}
              custom={0.25}
              style={i === 1 ? undefined : { background: "rgba(255,255,255,0.07)", color: "#f3efe7" }}
            >
              <span className="block text-[2.4cqw] opacity-70">{d}</span>
              <span className="block text-[3.8cqw] font-semibold">{n}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.6cqw]">
          {times.map((t, i) => (
            <motion.div
              key={t}
              className="rounded-[2cqw] py-[1.8cqw] text-center text-[2.6cqw] font-medium"
              variants={i === 1 ? pick : undefined}
              initial="off"
              animate={state}
              custom={0.65}
              style={i === 1 ? undefined : { background: "rgba(255,255,255,0.07)", color: "#f3efe7" }}
            >
              {t}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-auto flex items-center justify-center gap-[1.6cqw] rounded-[2.6cqw] bg-lime py-[2.6cqw] text-[4.2cqw] font-bold text-ink shadow-[0_0_4cqw_rgba(200,255,0,0.45)]"
          initial={false}
          animate={active ? { scale: [0.92, 1.04, 1], opacity: 1 } : { scale: 0.92, opacity: 0.35 }}
          transition={{ delay: active ? 1.05 : 0, duration: 0.5 }}
        >
          <Check className="size-[4.4cqw]" strokeWidth={3} />
          Booked
        </motion.div>
      </div>
    </div>
  );
}

/* 02 — Custom software: owner panel */
export function PanelScreen({ active }: Props) {
  const rows = [
    ["Maria G.", "Kitchen remodel", "Paid"],
    ["Dan R.", "Roof repair", "Quote sent"],
    ["Ana P.", "Deep clean", "Scheduled"],
  ];
  const nav = [LayoutGrid, CalendarCheck, Users, Wallet];
  return (
    <div className="absolute inset-x-0 bottom-0 top-[9cqw] grid grid-cols-[8cqw_1fr] gap-[3cqw] p-[4cqw] pt-[3cqw] text-cream">
      <div className="flex flex-col items-center gap-[2.4cqw] rounded-[2.6cqw] bg-white/[0.05] py-[2.6cqw]">
        {nav.map((Icon, i) => (
          <span
            key={i}
            className={`grid size-[5cqw] place-items-center rounded-[1.4cqw] ${i === 0 ? "bg-lime text-ink" : "text-cream/60"}`}
          >
            <Icon className="size-[3cqw]" strokeWidth={2} />
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center justify-between">
          <p className="text-[4.2cqw] font-semibold">Owner panel</p>
          <span className="rounded-full bg-white/10 px-[2cqw] py-[0.8cqw] text-[2.3cqw]">
            Today
          </span>
        </div>
        <div className="mt-[2.6cqw] grid grid-cols-3 gap-[1.8cqw]">
          {[
            ["Jobs", "12"],
            ["Clients", "248"],
            ["Paid", "$4.2k"],
          ].map(([k, v], i) => (
            <div key={k} className="rounded-[2cqw] bg-white/[0.07] px-[2cqw] py-[1.8cqw]">
              <p className="text-[2.2cqw] text-cream/60">{k}</p>
              <p className={`text-[4cqw] font-bold ${i === 2 ? "text-lime" : ""}`}>{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-[2.4cqw] flex flex-col gap-[1.4cqw]">
          {rows.map(([name, job, status], i) => (
            <motion.div
              key={name}
              className="flex items-center gap-[2cqw] rounded-[1.8cqw] bg-white/[0.05] px-[2cqw] py-[1.5cqw]"
              initial={false}
              animate={active ? { opacity: 1, x: "0%" } : { opacity: 0.4, x: "4%" }}
              transition={{ delay: active ? 0.2 + i * 0.15 : 0, duration: 0.45 }}
            >
              <span className="grid size-[4.4cqw] shrink-0 place-items-center rounded-full bg-white/15 text-[2.2cqw] font-bold">
                {name[0]}
              </span>
              <span className="min-w-0 flex-1 truncate text-[2.6cqw]">
                <b className="font-semibold">{name}</b>{" "}
                <span className="text-cream/55">{job}</span>
              </span>
              <span
                className={`shrink-0 rounded-full px-[1.8cqw] py-[0.6cqw] text-[2.2cqw] font-semibold ${
                  i === 0 ? "bg-lime text-ink" : "bg-white/10 text-cream/80"
                }`}
              >
                {status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 03 — Automation: switches that run the follow-up */
export function AutomationScreen({ active }: Props) {
  const flows = [
    { Icon: CalendarCheck, title: "New booking", sub: "Fri · 11:00 AM" },
    { Icon: Bell, title: "Reminder SMS", sub: "24h before" },
    { Icon: Star, title: "Review request", sub: "2h after visit" },
  ];
  return (
    <div className="absolute inset-x-0 bottom-0 top-[9cqw] p-[4.5cqw] pt-[3cqw] text-cream">
      <div className="relative flex flex-col gap-[2.2cqw]">
        <span className="absolute bottom-[4cqw] left-[3.4cqw] top-[4cqw] w-[0.4cqw] bg-white/10" />
        <motion.span
          className="absolute left-[3.4cqw] top-[4cqw] w-[0.4cqw] origin-top bg-lime"
          style={{ bottom: "4cqw" }}
          initial={false}
          animate={{ scaleY: active ? 1 : 0 }}
          transition={{ duration: active ? 1.2 : 0, delay: active ? 0.2 : 0 }}
        />
        {flows.map(({ Icon, title, sub }, i) => (
          <div
            key={title}
            className="relative flex items-center gap-[3cqw] rounded-[2.6cqw] bg-white/[0.06] py-[1.8cqw] pl-[1.2cqw] pr-[2.6cqw]"
          >
            <span className="grid size-[5.6cqw] shrink-0 place-items-center rounded-full bg-ink ring-[0.4cqw] ring-white/15">
              <Icon className="size-[2.8cqw]" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[3.2cqw] font-semibold">{title}</span>
              <span className="block text-[2.4cqw] text-cream/55">{sub}</span>
            </span>
            {/* Toggle */}
            <motion.span
              className="relative h-[4.4cqw] w-[8cqw] shrink-0 rounded-full"
              initial={false}
              animate={{ backgroundColor: active ? "#c8ff00" : "rgba(255,255,255,0.15)" }}
              transition={{ delay: active ? 0.3 + i * 0.35 : 0, duration: 0.3 }}
            >
              <motion.span
                className="absolute top-[0.5cqw] size-[3.4cqw] rounded-full bg-white shadow"
                initial={false}
                animate={{ left: active ? "4.1cqw" : "0.5cqw", backgroundColor: active ? "#111111" : "#ffffff" }}
                transition={{ delay: active ? 0.3 + i * 0.35 : 0, duration: 0.3 }}
              />
            </motion.span>
          </div>
        ))}
      </div>
      <motion.div
        className="absolute bottom-[4cqw] right-[4.5cqw] flex items-center gap-[1.4cqw] rounded-[2.4cqw] rounded-br-[0.6cqw] bg-lime px-[2.4cqw] py-[1.4cqw] text-[2.6cqw] font-semibold text-ink shadow-[0_0_4cqw_rgba(200,255,0,0.4)]"
        initial={false}
        animate={active ? { opacity: 1, y: "0%", scale: 1 } : { opacity: 0, y: "30%", scale: 0.9 }}
        transition={{ delay: active ? 1.5 : 0, type: "spring", stiffness: 260, damping: 18 }}
      >
        <MessageSquare className="size-[3cqw]" strokeWidth={2.2} />
        Reminder sent
        <Check className="size-[3cqw]" strokeWidth={3} />
      </motion.div>
    </div>
  );
}

/* 04 — Digital growth: local search result + calls chart */
export function GrowthScreen({ active }: Props) {
  const bars = [0.32, 0.4, 0.38, 0.52, 0.6, 0.72, 0.92];
  return (
    <div className="absolute inset-x-0 bottom-0 top-[9cqw] grid grid-cols-[1.05fr_0.95fr] gap-[3cqw] p-[4cqw] pt-[3cqw] text-cream">
      <div className="flex min-w-0 flex-col gap-[2.2cqw]">
        <div className="flex items-center gap-[1.6cqw] rounded-full bg-white/[0.08] px-[2.4cqw] py-[1.6cqw] text-[2.6cqw] text-cream/80">
          <Search className="size-[2.8cqw]" strokeWidth={2.2} />
          barber near me
        </div>
        <motion.div
          className="rounded-[2.6cqw] bg-white/[0.07] p-[2.4cqw]"
          initial={false}
          animate={active ? { y: "0%", opacity: 1 } : { y: "8%", opacity: 0.5 }}
          transition={{ delay: active ? 0.25 : 0, duration: 0.5 }}
        >
          <div className="flex items-center justify-between gap-[1cqw]">
            <p className="truncate text-[3.2cqw] font-semibold">Your business</p>
            <span className="rounded-full bg-lime px-[1.6cqw] py-[0.4cqw] text-[2.2cqw] font-bold text-ink">
              #1
            </span>
          </div>
          <p className="mt-[1cqw] flex items-center gap-[0.6cqw] text-[2.4cqw] text-lime">
            {"★★★★★"}
            <span className="text-cream/60">4.9</span>
          </p>
          <p className="mt-[1cqw] flex items-center gap-[0.8cqw] text-[2.3cqw] text-cream/55">
            <MapPin className="size-[2.4cqw]" strokeWidth={2.2} />
            Open · closes 8 PM
          </p>
        </motion.div>
        <div className="flex gap-[1.4cqw]">
          {["Call", "Directions", "Book"].map((b, i) => (
            <span
              key={b}
              className={`rounded-full px-[2cqw] py-[1cqw] text-[2.3cqw] font-semibold ${i === 2 ? "bg-lime text-ink" : "bg-white/10"}`}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col rounded-[2.6cqw] bg-white/[0.05] p-[2.4cqw]">
        <p className="text-[2.4cqw] text-cream/60">Calls from Google</p>
        <div className="mt-[2cqw] flex flex-1 items-end gap-[1.2cqw]">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 origin-bottom rounded-t-[1cqw] ${i === bars.length - 1 ? "bg-lime shadow-[0_0_3cqw_rgba(200,255,0,0.5)]" : "bg-white/20"}`}
              style={{ height: `${h * 100}%` }}
              initial={false}
              animate={{ scaleY: active ? 1 : 0.15 }}
              transition={{ delay: active ? 0.2 + i * 0.08 : 0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const screens = {
  web: BookingScreen,
  software: PanelScreen,
  automation: AutomationScreen,
  growth: GrowthScreen,
} as const;
