"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { TexhcoLogo } from "@/components/brand/TexhcoLogo";
import { useMediaQuery } from "@/lib/use-media-query";

export type WatermarkVariant = "ink" | "tonal" | "glass";
const VARIANTS: WatermarkVariant[] = ["ink", "tonal", "glass"];

/** Dev only: `?wm=ink|tonal|glass` overrides the variant to compare looks. */
function useDevVariant(): WatermarkVariant | null {
  const search = useSyncExternalStore(
    () => () => {},
    () => (process.env.NODE_ENV === "production" ? "" : window.location.search),
    () => "",
  );
  const v = new URLSearchParams(search).get("wm") as WatermarkVariant | null;
  return v && VARIANTS.includes(v) ? v : null;
}

/** Copies in the track; 3 keeps the viewport covered even on ultra-wide. */
const COPIES = 3;
/** Resting speed, in % of one copy per second (~25s per lap). */
const SPEED = 4;
/** Horizontal blur (stdDeviation, px) at rest and the extra at full boost. */
const BLUR_REST = 1;
const BLUR_BOOST = 2.5;
/** Slight even tracking so the word reads wide, like the reference. */
const TRACKING = [0, 18, 36, 54, 72, 90] as const;

/**
 * The giant "texhco" behind the hero, as an endless right-to-left loop.
 * A horizontal-only Gaussian blur (SVG filter) fakes motion blur; scrolling
 * speeds the loop up and the blur follows, then both settle back.
 *
 * Letter height comes from the `--wm` custom property set by the parent.
 *
 * Variants: `ink` (solid black), `tonal` (a shade off the background, so it
 * reads as texture), `glass` (frosted acrylic: light fill, bright edge,
 * soft shadow). `auto` = glass from md up, tonal on phones, where the
 * smaller glass letters get too faint.
 */
export function WatermarkMarquee({
  className = "",
  variant: variantProp = "auto",
}: {
  className?: string;
  variant?: WatermarkVariant | "auto";
}) {
  // null during SSR → tonal; the fade-in hides the swap on desktop.
  const desktop = useMediaQuery("(min-width: 768px)");
  const variant =
    useDevVariant() ??
    (variantProp === "auto" ? (desktop ? "glass" : "tonal") : variantProp);
  const uid = useId().replace(/:/g, "");
  const filterId = `wm-blur-${uid}`;
  const glassId = `wm-glass-${uid}`;
  const ref = useRef<HTMLDivElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const lastBlur = useRef(BLUR_REST);
  const inView = useInView(ref);
  const reduced = useReducedMotion();

  // Position within one lap: 0 → -100/COPIES (% of the whole track).
  const x = useMotionValue(0);
  const transform = useTransform(x, (v) => `translate3d(${v}%,0,0)`);

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 300,
  });

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return;

    // 0 at rest → 1 when scrolling fast.
    const v = velocity.get();
    const boost = Number.isFinite(v) ? Math.min(Math.abs(v) / 2500, 1) : 0;
    const dt = Math.min(delta, 100) / 1000; // ignore long stalls (tab switch)
    const lap = 100 / COPIES;
    const step = (SPEED * (1 + boost * 4) * dt) / COPIES;
    let next = x.get() - step;
    if (next <= -lap) next += lap;
    x.set(next);

    // Only touch the filter when the (quantised) amount actually changes.
    const blur = Math.round((BLUR_REST + boost * BLUR_BOOST) * 4) / 4;
    if (blur !== lastBlur.current && blurRef.current) {
      blurRef.current.setAttribute("stdDeviation", `${blur} 0`);
      lastBlur.current = blur;
    }
  });

  const fills: Record<WatermarkVariant, string> = {
    ink: "#111111",
    tonal: "#ebe6d8",
    glass: `url(#${glassId})`,
  };

  return (
    <div
      ref={ref}
      aria-hidden
      // Extra room below so the glass drop-shadow isn't clipped by overflow.
      className={`pointer-events-none -mb-[calc(var(--wm)*0.2)] overflow-hidden pb-[calc(var(--wm)*0.2)] ${className}`}
    >
      <svg width="0" height="0" className="absolute">
        <filter
          id={filterId}
          x="-2%"
          y="0"
          width="104%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur ref={blurRef} stdDeviation={`${BLUR_REST} 0`} />
        </filter>
        <linearGradient id={glassId} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f1ecdf" stopOpacity="0.7" />
        </linearGradient>
      </svg>

      <motion.div
        className="flex w-max will-change-transform"
        style={{
          transform,
          filter:
            variant === "glass"
              ? `url(#${filterId}) drop-shadow(0 14px 18px rgba(60,55,35,0.12)) drop-shadow(0 2px 2px rgba(60,55,35,0.08))`
              : `url(#${filterId})`,
        }}
      >
        {Array.from({ length: COPIES }, (_, i) => (
          <span key={i} className="shrink-0 pr-[calc(var(--wm)*0.42)]">
            <TexhcoLogo
              ink={fills[variant]}
              accent={fills[variant]}
              offsets={TRACKING}
              title=""
              aria-hidden
              className="block h-[var(--wm)] w-auto"
              {...(variant === "glass"
                ? { stroke: "rgba(255,255,255,0.95)", strokeWidth: 2.5 }
                : {})}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
