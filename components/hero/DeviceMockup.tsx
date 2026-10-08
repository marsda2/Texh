"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  CalendarDays,
  Globe,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { TexhcoLogo } from "@/components/brand/TexhcoLogo";

const STOREFRONT = "https://images.unsplash.com/photo-1569096651661-820d0de8b4ab";

const TILT = { x: 7, y: -11, z: 3.5 };

/**
 * Dark-mode tablet with the light "process" window behind it and the
 * floating "New lead received" chip. Every size is in `cqw` of the wrapper, so
 * the whole composition scales as one piece.
 */
export function DeviceMockup({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  // Subtle pointer tilt on top of the resting pose.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, (v) => TILT.y + v * 4);
  const rotateX = useTransform(sy, (v) => TILT.x - v * 3);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set(-((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduced]);

  return (
    <div
      className={`@container relative aspect-[1/0.8] select-none ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transformPerspective: 1800,
          rotateX,
          rotateY,
          rotateZ: TILT.z,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 70, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <BackWindow />
        <Tablet />
        <LeadChip delay={1.5} />
      </motion.div>
    </div>
  );
}

function Tablet() {
  return (
    <div
      className="absolute left-[1cqw] top-0 w-[86cqw] rounded-[3.4cqw] bg-[#1a1a19] p-[0.9cqw] shadow-[0_4cqw_7cqw_-2cqw_rgba(17,17,17,0.45),0_1cqw_2cqw_rgba(17,17,17,0.18)] ring-1 ring-white/10"
      style={{ transform: "translateZ(30px)" }}
    >
      <div className="relative overflow-hidden rounded-[2.6cqw] bg-[linear-gradient(160deg,#1d1e1c_0%,#121311_55%,#0e0f0d_100%)]">
        {/* Window controls */}
        <div className="flex gap-[0.8cqw] px-[2.6cqw] pt-[2.2cqw]">
          <span className="size-[1.25cqw] rounded-full bg-[#ff5f57]" />
          <span className="size-[1.25cqw] rounded-full bg-[#febc2e]" />
          <span className="size-[1.25cqw] rounded-full bg-[#28c840]" />
        </div>

        {/* Site nav */}
        <div className="flex items-center justify-between px-[4.4cqw] pt-[2.4cqw]">
          <TexhcoLogo ink="#f3efe7" className="h-[2.3cqw] w-auto" />
          <div className="flex items-center gap-[3cqw] text-[1.25cqw] font-medium text-white/80">
            <span>Home</span>
            <span>Services</span>
            <span>Contact</span>
            <span className="ml-[0.6cqw] flex w-[2.6cqw] flex-col gap-[0.55cqw]">
              <span className="h-[0.18cqw] bg-white/80" />
              <span className="h-[0.18cqw] bg-white/80" />
            </span>
          </div>
        </div>

        {/* Site hero */}
        <div className="grid grid-cols-[1fr_1.42fr] items-center gap-[3.2cqw] px-[4.4cqw] pb-[3.6cqw] pt-[3.2cqw]">
          <div>
            <p className="font-display text-[3.55cqw] font-semibold leading-[1.12] tracking-[-0.015em] text-white">
              Local businesses run better with smarter software.
            </p>
            <p className="mt-[1.6cqw] text-[1.35cqw] text-white/70">
              Websites. Automation. Growth.
            </p>
            <span className="mt-[2.8cqw] inline-flex items-center gap-[0.8cqw] rounded-full bg-white px-[2.2cqw] py-[1.15cqw] text-[1.35cqw] font-semibold text-ink">
              Get started
              <ArrowUpRight className="size-[1.6cqw]" strokeWidth={2.2} />
            </span>
          </div>

          <div className="relative">
            <div className="relative aspect-[1.5] overflow-hidden rounded-[1.8cqw] bg-neutral-800">
              <Image
                src={STOREFRONT}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 767px) 40vw, 22vw"
                className="object-cover object-[50%_35%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.35))]" />
            </div>
            <div className="absolute -bottom-[1.4cqw] -right-[1.2cqw] w-[17cqw] rounded-[1.3cqw] bg-white/95 px-[1.6cqw] py-[1.25cqw] shadow-[0_1.5cqw_3cqw_-1cqw_rgba(0,0,0,0.4)]">
              <p className="flex items-center gap-[0.8cqw] text-[1.4cqw] font-semibold text-ink">
                <span className="size-[0.95cqw] rounded-full bg-lime ring-[0.3cqw] ring-lime/30" />
                Open
              </p>
              <p className="mt-[0.6cqw] text-[1.08cqw] leading-[1.35] text-ink/60">
                More customers.
                <br />
                Smoother operations.
              </p>
            </div>
          </div>
        </div>

        {/* Glass glare */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,transparent_32%,transparent_70%,rgba(255,255,255,0.04)_100%)]" />
      </div>
    </div>
  );
}

const steps: { label: string; Icon: LucideIcon }[] = [
  { label: "Website", Icon: Globe },
  { label: "Bookings", Icon: CalendarDays },
  { label: "CRM", Icon: Users },
];

function BackWindow() {
  return (
    <div
      className="absolute left-[3cqw] top-[5cqw] h-[73cqw] w-[93cqw] rounded-[3.4cqw] border border-white/80 bg-[linear-gradient(180deg,#fbfaf5_0%,#f1efe6_100%)] shadow-[0_5cqw_8cqw_-3cqw_rgba(40,38,30,0.35),inset_0_0_0_0.5cqw_rgba(255,255,255,0.6)]"
      style={{ transform: "translateZ(-30px)" }}
    >
      <div className="absolute right-[2.6cqw] top-[2.4cqw] flex gap-[0.7cqw]">
        <span className="size-[1.1cqw] rounded-full bg-neutral-300" />
        <span className="size-[1.1cqw] rounded-full bg-neutral-300" />
        <span className="size-[1.1cqw] rounded-full bg-neutral-300" />
      </div>

      <div className="absolute inset-x-[4cqw] bottom-[4cqw] flex items-start justify-between">
        {steps.map(({ label, Icon }, i) => (
          <div key={label} className="contents">
            {i > 0 && <Connector index={i} />}
            <div
              className="w-[22cqw] rounded-[1.8cqw] bg-white px-[2.2cqw] pb-[2.4cqw] pt-[2.2cqw] shadow-[0_1.5cqw_3cqw_-1.5cqw_rgba(40,38,30,0.3)] ring-1 ring-black/[0.03]"
              style={{ marginTop: `${i * 1.6}cqw` }}
            >
              <Icon className="size-[2.9cqw] text-ink" strokeWidth={1.6} />
              <p className="mt-[1.3cqw] text-[1.45cqw] font-semibold text-ink">
                {label}
              </p>
              <span className="mt-[1.1cqw] block h-[0.75cqw] w-[78%] rounded-full bg-neutral-200" />
              {i === 2 && (
                <span className="mt-[0.6cqw] block h-[0.75cqw] w-[55%] rounded-full bg-neutral-200" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector({ index }: { index: number }) {
  return (
    <div
      className="relative flex flex-1 items-center px-[0.4cqw]"
      style={{ marginTop: `${6.5 + (index - 0.5) * 1.6}cqw` }}
    >
      <Dot delay={index * 0.4} />
      <span className="h-[0.3cqw] flex-1 bg-ink" />
      <Dot delay={index * 0.4 + 0.2} />
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span className="relative grid size-[1.9cqw] place-items-center">
      <span
        className="absolute inset-0 animate-ping rounded-full bg-lime/60"
        style={{ animationDelay: `${delay}s`, animationDuration: "2.4s" }}
      />
      <span className="relative grid size-full place-items-center rounded-full bg-lime shadow-[0_0_1.2cqw_rgba(200,255,0,0.8)]">
        <span className="size-[0.75cqw] rounded-full bg-ink" />
      </span>
    </span>
  );
}

function LeadChip({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute left-[67cqw] top-[51.5cqw]"
      style={{ z: 60 }}
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 16 }}
    >
      <div className="relative flex items-center gap-[1.2cqw] rounded-[1.6cqw] bg-lime py-[1.1cqw] pl-[1.1cqw] pr-[2.2cqw] shadow-[0_0_3.5cqw_rgba(200,255,0,0.55),0_1.5cqw_3cqw_-1cqw_rgba(60,80,0,0.35)]">
        <span className="grid size-[3cqw] place-items-center rounded-[0.8cqw] bg-ink/90">
          <User className="size-[1.8cqw] text-lime" strokeWidth={2.4} />
        </span>
        <span className="whitespace-nowrap text-[1.55cqw] font-semibold text-ink">
          New lead received
        </span>
        {/* Spark lines */}
        <svg
          viewBox="0 0 24 24"
          className="absolute -right-[3.4cqw] -top-[3.2cqw] size-[4.4cqw] text-lime"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
        >
          <path d="M6 15 L3 21" />
          <path d="M12 12 L19 6" />
          <path d="M14 18 L21 17" />
        </svg>
      </div>
    </motion.div>
  );
}
