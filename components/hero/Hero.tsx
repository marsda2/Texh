"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { hero, site } from "@/content/site";
import { useOffscreenPause } from "@/lib/use-offscreen-pause";
// import { DeviceMockup } from "./DeviceMockup"; // previous hero visual (kept, unused)
import { LiveActivityCard } from "./LiveActivityCard";
import { HeroCanvas } from "./HeroCanvas";
import { ServicesStrip } from "./ServicesStrip";
import { WatermarkMarquee } from "./WatermarkMarquee";

/** Stagger for the CSS entrance classes (see "Hero entrance" in globals.css). */
const delay = (s: number) => ({ "--delay": `${s}s` }) as React.CSSProperties;

/**
 * Layers: z-0 watermark · z-10 device mockup · z-20 WebGL · z-30 copy & UI.
 */
export function Hero() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useOffscreenPause(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex flex-col overflow-hidden bg-cream md:min-h-svh"
    >
      <Header />

      {/* Eyebrow + H1 */}
      <div className="relative z-30 px-5 pt-[clamp(1.5rem,4.5vh,2.5rem)] text-center md:pt-[clamp(0.5rem,1.6svh,1.25rem)]">
        <p
          style={delay(0.1)}
          className="hero-rise text-[9px] font-medium uppercase tracking-[0.42em] text-ink/85 md:text-[10px] md:tracking-[0.5em]"
        >
          {hero.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,12vw,3.5rem)] font-black leading-[0.98] tracking-[-0.042em] [word-spacing:0.04em] md:mt-[clamp(0.5rem,1.2svh,1rem)] md:text-[clamp(3.4rem,min(6vw,8.6svh),5.5rem)] md:tracking-[-0.045em]">
          {hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line block" style={delay(0.15 + i * 0.1)}>
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Stage: looping watermark behind (z-0), device in front (z-10) */}
      <div className="relative flex-1 pb-16 pt-[clamp(2.5rem,12vw,3.5rem)] [--dev:min(37vw,54svh,600px)] [--wm:21vw] md:flex md:items-start md:justify-center md:pb-1 md:pt-[clamp(0.4rem,1.2svh,1rem)] md:[--wm:max(calc(var(--dev)*0.48),17vw)]">
        <div
          style={delay(0.05)}
          className="hero-fade absolute inset-x-0 top-[clamp(0.75rem,3vw,1.25rem)] z-0 opacity-95 md:top-[calc(clamp(0.4rem,1.2svh,1rem)-var(--dev)*0.025)]"
        >
          <WatermarkMarquee />
        </div>

        {/* Layout box the WebGL layer anchors to (no transforms on it) */}
        <div
          ref={anchorRef}
          className="relative z-10 ml-auto mr-[6vw] w-[82vw] max-w-[440px] md:mx-0 md:ml-[calc(var(--dev)*0.24)] md:w-[var(--dev)] md:min-w-[320px] md:max-w-none"
        >
          <LiveActivityCard className="w-full" />
        </div>
      </div>

      {/* Copy + CTAs */}
      <div className="relative z-30 px-6 pb-6 text-center md:pb-[clamp(0.75rem,2svh,1.5rem)]">
        <p
          style={delay(0.42)}
          className="hero-rise hidden text-[clamp(1rem,1.45vw,1.25rem)] text-ink/90 md:block"
        >
          {hero.subtitle}
        </p>

        <div
          style={delay(0.5)}
          className="hero-rise mt-1 flex flex-col items-center gap-5 md:mt-[clamp(0.75rem,1.8svh,1.25rem)] md:flex-row md:justify-center md:gap-8"
        >
          <a
            href="#contact"
            className="group inline-flex h-[52px] w-full max-w-[280px] items-center justify-center gap-2 rounded-full bg-ink px-7 text-[16px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(17,17,17,0.6)] transition-transform duration-300 hover:-translate-y-0.5 md:h-[clamp(2.75rem,6svh,3rem)] md:w-auto md:max-w-none md:text-[15px]"
          >
            <span className="md:hidden">{hero.primaryMobile}</span>
            <span className="hidden md:inline">{hero.primaryDesktop}</span>
            <ArrowUpRight
              className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
          <a
            href="#work"
            className="link-underline text-[16px] font-medium text-ink md:text-[15px]"
          >
            {hero.secondary}
          </a>
        </div>

        <p
          style={delay(0.58)}
          className="hero-rise mt-[clamp(0.75rem,2.2svh,1.5rem)] hidden text-[9px] font-medium uppercase tracking-[0.55em] text-ink/55 md:block"
        >
          {site.location}
        </p>
      </div>

      <ServicesStrip className="hidden md:block" />

      <HeroCanvas anchorRef={anchorRef} />
    </section>
  );
}
