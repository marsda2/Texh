"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Check, MapPin, Navigation, Phone, Star } from "lucide-react";
import type { Service } from "@/content/site";
import { EASE, ShowcaseFrame, useLoop } from "./shared";

const STEPS = [
  { title: "They find you", hint: "On Google Maps, from their phone." },
  { title: "They pick a service", hint: "Clear prices, no guessing." },
  { title: "They pick a time", hint: "Only the slots you have open." },
  { title: "They're booked", hint: "Confirmation by text, instantly." },
];

const INTERVAL = 3200;

/** A visitor books through a site we build, one phone screen per step. */
export function WebShowcase({ service }: { service: Service }) {
  const [hover, setHover] = useState(false);
  const { ref, step, setStep } = useLoop({
    count: STEPS.length,
    interval: INTERVAL,
    paused: hover,
  });
  const { eyebrow, title, body } = service.detail.showcase;

  return (
    <ShowcaseFrame
      eyebrow={eyebrow}
      title={title}
      body={body}
      className="bg-ink text-cream"
      copyExtra={
        <ol className="mt-8 flex flex-col gap-2">
          {STEPS.map((s, i) => {
            const on = i === step;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={on}
                  className={`relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                    on
                      ? "border-lime/40 bg-white/[0.07]"
                      : "border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`font-display text-[15px] font-extrabold ${on ? "text-lime" : "text-cream/35"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold">{s.title}</span>
                      <span
                        className={`block overflow-hidden text-[13px] text-cream/60 transition-all duration-300 ${on ? "mt-0.5 max-h-6 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        {s.hint}
                      </span>
                    </span>
                  </span>
                  {on && !hover && (
                    <motion.span
                      key={`bar-${step}`}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-lime"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      }
    >
      <div
        ref={ref}
        className="relative mx-auto flex max-w-[460px] justify-center py-4 md:py-0"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        {/* Glow under the phone */}
        <div className="absolute inset-x-[12%] bottom-0 h-[16%] rounded-[50%] bg-lime/30 blur-[40px]" />

        <motion.div
          className="relative w-[min(72vw,290px)] rounded-[44px] bg-[linear-gradient(140deg,#fafafa,#8d8d8d_18%,#f4f4f4_34%,#3b3b3b_56%,#cfcfcf_74%,#555)] p-[3px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
          animate={{ rotateZ: step === 3 ? 0 : -2 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="relative aspect-[9/18.2] overflow-hidden rounded-[41px] bg-white text-ink">
            {/* Notch */}
            <span className="absolute left-1/2 top-2 z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-ink" />
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="absolute inset-0 px-4 pb-4 pt-10"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {step === 0 && <FindScreen />}
                {step === 1 && <ServiceScreen />}
                {step === 2 && <TimeScreen />}
                {step === 3 && <BookedScreen />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating notification on the owner's side */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="chip"
              className="absolute -right-1 top-[18%] z-30 flex items-center gap-2 rounded-2xl bg-lime px-3.5 py-2.5 text-[13px] font-bold text-ink shadow-[0_0_40px_rgba(200,255,0,0.5)] md:-right-6"
              initial={{ opacity: 0, scale: 0.6, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 }}
            >
              <CalendarCheck className="size-4" strokeWidth={2.4} />
              New booking · Fri 3:00 pm
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ShowcaseFrame>
  );
}

function FindScreen() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2 text-[11px] text-ink/60">
        <MapPin className="size-3.5" strokeWidth={2} />
        barbershop near me
      </div>
      <div className="relative min-h-[22%] flex-1 overflow-hidden rounded-2xl bg-[#e9efe2]">
        <svg viewBox="0 0 200 110" className="absolute inset-0 size-full" fill="none">
          <path d="M-5 80 C40 60 70 95 120 70 S190 40 210 55" stroke="#fff" strokeWidth="9" />
          <path d="M60 -5 C70 30 55 60 80 115" stroke="#fff" strokeWidth="7" />
          <path d="M140 -5 C130 30 160 60 150 115" stroke="#fff" strokeWidth="6" />
        </svg>
        <span className="absolute left-[46%] top-[30%] grid size-8 place-items-center rounded-full bg-ink text-lime shadow-lg ring-4 ring-lime/50">
          <MapPin className="size-4" strokeWidth={2.4} />
        </span>
      </div>
      <div className="rounded-2xl border border-neutral-200 p-3">
        <p className="text-[14px] font-bold">Northside Barbers</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-ink/60">
          <Star className="size-3 fill-[#f5b301] text-[#f5b301]" />
          4.9 (128) · Open until 8 pm
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-semibold">
          <span className="flex items-center justify-center gap-1 rounded-full border border-neutral-200 py-2">
            <Phone className="size-3" strokeWidth={2.2} />
            Call
          </span>
          <span className="flex items-center justify-center gap-1 rounded-full border border-neutral-200 py-2">
            <Navigation className="size-3" strokeWidth={2.2} />
            Map
          </span>
          <motion.span
            className="flex items-center justify-center rounded-full bg-lime py-2"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
          >
            Book
          </motion.span>
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  ["Haircut", "$35", "30 min"],
  ["Beard trim", "$20", "15 min"],
  ["Cut + beard", "$50", "45 min"],
];

function ServiceScreen() {
  return (
    <div className="flex h-full flex-col">
      <p className="font-display text-[20px] font-extrabold tracking-[-0.03em]">Book a service</p>
      <p className="text-[11px] text-ink/50">Northside Barbers</p>
      <div className="mt-4 flex flex-col gap-2.5">
        {SERVICES.map(([name, price, time], i) => {
          const picked = i === 0;
          return (
            <motion.div
              key={name}
              className="flex items-center justify-between rounded-2xl border p-3.5"
              initial={false}
              animate={{
                borderColor: picked ? "#111" : "#e5e5e5",
                backgroundColor: picked ? "#c8ff00" : "#ffffff",
              }}
              transition={{ delay: picked ? 0.9 : 0, duration: 0.3 }}
            >
              <span>
                <span className="block text-[14px] font-bold">{name}</span>
                <span className="text-[11px] text-ink/55">{time}</span>
              </span>
              <span className="font-display text-[16px] font-extrabold">{price}</span>
            </motion.div>
          );
        })}
      </div>
      <motion.p
        className="mt-auto rounded-full bg-ink py-3 text-center text-[13px] font-semibold text-white"
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Continue
      </motion.p>
    </div>
  );
}

const SLOTS = ["10:00", "11:30", "1:00", "3:00", "4:30", "6:00"];

function TimeScreen() {
  return (
    <div className="flex h-full flex-col">
      <p className="font-display text-[20px] font-extrabold tracking-[-0.03em]">Pick a time</p>
      <div className="mt-3 flex gap-2 text-center text-[10px] font-semibold">
        {["Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <span
            key={d}
            className={`flex-1 rounded-xl py-2 ${i === 2 ? "bg-ink text-white" : "bg-neutral-100 text-ink/60"}`}
          >
            {d}
            <span className="block text-[14px] font-extrabold">{12 + i}</span>
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {SLOTS.map((t, i) => {
          const picked = i === 3;
          return (
            <motion.span
              key={t}
              className="rounded-xl border py-2.5 text-center text-[13px] font-semibold"
              initial={false}
              animate={{
                borderColor: picked ? "#111" : "#e5e5e5",
                backgroundColor: picked ? "#c8ff00" : "#ffffff",
              }}
              transition={{ delay: picked ? 0.9 : 0, duration: 0.3 }}
            >
              {t} {i < 2 ? "am" : "pm"}
            </motion.span>
          );
        })}
      </div>
      <p className="mt-auto rounded-full bg-ink py-3 text-center text-[13px] font-semibold text-white">
        Confirm booking
      </p>
    </div>
  );
}

function BookedScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="relative grid size-24 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-lime/50"
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        />
        <motion.span
          className="relative grid size-20 place-items-center rounded-full bg-lime"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
        >
          <Check className="size-9" strokeWidth={3.2} />
        </motion.span>
      </div>
      <p className="mt-5 font-display text-[24px] font-extrabold tracking-[-0.03em]">You&rsquo;re booked</p>
      <p className="mt-1 text-[13px] font-semibold">Fri 3:00 pm · Haircut</p>
      <p className="mt-4 rounded-full bg-neutral-100 px-3.5 py-1.5 text-[11px] text-ink/60">
        Confirmation sent by text
      </p>
    </div>
  );
}
