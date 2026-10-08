"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { services, servicesIntro } from "@/content/site";
import { ServiceCard } from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const N = services.length;
/** Duration of one card change, in seconds. */
const STEP_DURATION = 0.85;
/** Input silence that marks the start of a new gesture (ms). */
const QUIET_MS = 220;
/** Scroll that keeps the deck pinned after release, so re-entry is detected. */
const PIN_HOLD = 120;
/** Back cards: how much smaller each slot gets. */
const SLOT_SCALE = 0.05;
/** Leaving card: tilt in degrees. */
const EXIT_TILT = -2;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (e0: number, e1: number, v: number) => {
  const t = clamp01((v - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/**
 * "Services" as a deck of cards. When the deck reaches the top it pins and
 * page scrolling pauses: every gesture (wheel roll, trackpad swipe, finger
 * swipe, arrow key) moves exactly one card, and momentum from the same gesture
 * is ignored — so nobody flies past all four by accident. Each change pulls
 * the top card up and away (slight tilt, fades at the end) while the next one
 * rises from behind, grows from ~0.95 to 1 and straightens. Going past the
 * last card (or back before the first) hands scrolling back to the page.
 *
 * Mobile pins only the deck + its nav (the heading scrolls away);
 * desktop pins the whole two-column block. Reduced motion: no pinning, the
 * tabs switch cards.
 */
export function ServicesDeck() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const contents = useRef<(HTMLDivElement | null)[]>([]);
  const peeks = useRef<(HTMLDivElement | null)[]>([]);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const state = useRef({ pos: 0 });
  /** Set while the scroll-driven deck is live; lets the tabs drive it. */
  const controller = useRef<{ jump: (i: number) => void } | null>(null);
  const activeRef = useRef(0);
  const peekPx = useRef(0);
  const [active, setActive] = useState(0);

  /** Lays out every card for a continuous position (0 … N-1). */
  const render = useCallback((pos: number) => {
    // Cached: reading computed styles every frame forces style recalcs.
    if (!peekPx.current) {
      peekPx.current =
        parseFloat(getComputedStyle(deckRef.current!).getPropertyValue("--peek")) || 36;
    }
    const peek = peekPx.current;

    for (let i = 0; i < N; i++) {
      const card = cards.current[i];
      const content = contents.current[i];
      const edge = peeks.current[i];
      if (!card || !content || !edge) continue;
      const d = i - pos;

      if (d < 0) {
        // Leaving: slide up, tilt, fade out at the end of the move.
        const t = clamp01(-d);
        card.style.transform = `translate3d(0, ${-t * 112}%, 0) rotate(${EXIT_TILT * t}deg)`;
        card.style.opacity = String(1 - smooth(0.55, 1, t));
        content.style.opacity = "1";
        edge.style.opacity = "0";
      } else {
        // Waiting (d ≥ 1) or arriving (0 < d < 1).
        const y = d * peek;
        const s = 1 - d * SLOT_SCALE;
        card.style.transform = `translate3d(0, ${y}px, 0) scale(${s})`;
        card.style.opacity = String(clamp01(3 - d));
        content.style.opacity = String(1 - smooth(0, 0.55, d));
        edge.style.opacity = String(smooth(0.3, 0.7, d));
      }
    }

    bars.current.forEach((bar, i) => {
      if (bar) bar.style.transform = `scaleX(${i === 0 ? 1 : clamp01(pos - i + 1)})`;
    });

    const idx = Math.round(pos);
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, []);

  /** Tween the deck to card `i` (no scrolling involved). */
  const animateTo = useCallback(
    (i: number, onComplete?: () => void) => {
      gsap.to(state.current, {
        pos: i,
        duration: STEP_DURATION,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => render(state.current.pos),
        onComplete,
      });
    },
    [render],
  );

  useGSAP(
    () => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as Record<string, boolean>;
          peekPx.current = 0; // --peek differs per breakpoint
          render(state.current.pos);
          // Reduced motion: no pinning — the tabs switch cards instead.
          if (reduce) return;

          const pinEl = desktop ? gridRef.current! : stageRef.current!;
          let engaged = false;
          let animating = false;
          let savedScroll = 0;

          // Gesture bookkeeping: a gesture is a burst of input separated from
          // the previous one by QUIET_MS of silence (or a new touch).
          let gesture = 0;
          let consumed = 0;
          let lastInput = 0;
          const onInput = (e: Event) => {
            const now = performance.now();
            if (e.type === "touchstart" || now - lastInput > QUIET_MS) gesture++;
            lastInput = now;
          };
          const inputOpts = { capture: true, passive: true } as const;
          window.addEventListener("wheel", onInput, inputOpts);
          window.addEventListener("touchstart", onInput, inputOpts);
          window.addEventListener("touchmove", onInput, inputOpts);

          // Freezes the page while the deck is engaged (also blocks keys and
          // scrollbar dragging from moving the page underneath).
          const freeze = ScrollTrigger.observe({
            type: "wheel,scroll",
            preventDefault: true,
            allowClicks: true,
            onEnable: (self) => {
              savedScroll = self.scrollY();
            },
            onChangeY: (self) => {
              self.scrollY(savedScroll);
            },
          });
          freeze.disable();

          const step = (dir: 1 | -1) => {
            if (!engaged || animating || consumed === gesture) return;
            consumed = gesture;
            const target = Math.round(state.current.pos) + dir;
            if (target < 0 || target > N - 1) {
              release(dir);
              return;
            }
            animating = true;
            animateTo(target, () => {
              animating = false;
            });
          };

          // Reads swipe/wheel intent (finger up = next card).
          const intent = ScrollTrigger.observe({
            type: "wheel,touch",
            wheelSpeed: -1,
            tolerance: 24,
            preventDefault: true,
            allowClicks: true,
            onUp: () => step(1),
            onDown: () => step(-1),
          });
          intent.disable();

          const onKey = (e: KeyboardEvent) => {
            if (e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
            const next = ["ArrowDown", "PageDown", " "].includes(e.key);
            const prev = ["ArrowUp", "PageUp"].includes(e.key);
            if (!next && !prev) return;
            // Let Space keep activating focused buttons/links.
            const el = e.target as HTMLElement | null;
            if (e.key === " " && el?.closest("a,button,input,textarea,select")) return;
            e.preventDefault();
            gesture++; // every key press is its own gesture
            step(next ? 1 : -1);
          };

          // Callbacks below receive the trigger as `self`: ScrollTrigger may
          // fire onEnter while it is still being created (page already
          // scrolled on load / hot reload), before `st` is assigned.
          const st: ScrollTrigger = ScrollTrigger.create({
            trigger: pinEl,
            pin: pinEl,
            start: desktop ? "top top" : "top top+=12",
            end: `+=${PIN_HOLD}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onEnter: (self) => engage(self),
            onEnterBack: (self) => engage(self),
            // Resize / rotation while engaged: re-anchor the frozen scroll.
            onRefresh: (self) => {
              if (!engaged) return;
              savedScroll = self.start + 1;
              self.scroll(self.start + 1);
            },
          });

          function engage(trigger: ScrollTrigger, fromScroll = true) {
            if (engaged) return;
            if (fromScroll) {
              // A fast flick can overshoot the short pinned range — catch it.
              // A long jump (anchor link, scrollbar drag) means the visitor
              // is headed elsewhere — let it through.
              const y = trigger.scroll();
              const overshoot = Math.max(trigger.start - y, y - trigger.end, 0);
              if (overshoot > window.innerHeight * 0.75) return;
            }
            engaged = true;
            // Whatever gesture brought us here is spent: the deck stays on
            // the current card until the user makes a new one.
            consumed = gesture;
            // Park just inside the range: ScrollTrigger treats exactly
            // `start` as outside, which would misfire onEnter on release.
            trigger.scroll(trigger.start + 1);
            freeze.enable();
            intent.enable();
            window.addEventListener("keydown", onKey);
          }

          function release(dir: 1 | -1) {
            engaged = false;
            // Step just outside the pinned range so coming back re-engages.
            // Point the freeze at the new spot first: a scroll callback that
            // is already queued would otherwise yank the page back.
            const target = dir > 0 ? st.end + 1 : st.start - 1;
            savedScroll = target;
            st.scroll(target);
            freeze.disable();
            intent.disable();
            window.removeEventListener("keydown", onKey);
          }

          controller.current = {
            jump: (i) => {
              if (!engaged) engage(st, false);
              if (Math.round(state.current.pos) === i && !animating) return;
              animating = true;
              animateTo(i, () => {
                animating = false;
              });
            },
          };

          return () => {
            controller.current = null;
            window.removeEventListener("wheel", onInput, inputOpts);
            window.removeEventListener("touchstart", onInput, inputOpts);
            window.removeEventListener("touchmove", onInput, inputOpts);
            window.removeEventListener("keydown", onKey);
            freeze.kill();
            intent.kill();
          };
        },
      );
    },
    { scope: sectionRef },
  );

  const goTo = (i: number) => {
    if (controller.current) controller.current.jump(i);
    else animateTo(i);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-0 border-t border-line bg-paper"
    >
      <div
        ref={gridRef}
        className="mx-auto max-w-[1440px] px-4 pt-16 md:grid md:min-h-svh md:grid-cols-12 md:items-center md:gap-10 md:px-10 md:py-10 lg:px-[4.5rem]"
      >
        {/* Heading (scrolls away on mobile, stays with the deck on desktop) */}
        <div className="px-3 md:col-span-5 md:px-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-ink/60">
            {servicesIntro.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,10.5vw,3rem)] font-black leading-[0.98] tracking-[-0.045em] md:text-[clamp(2.6rem,3.7vw,4rem)]">
            {servicesIntro.title[0]}
            <br />
            {servicesIntro.title[1]}
          </h2>
          <p className="mt-3 text-[clamp(1.15rem,4.6vw,1.4rem)] font-medium text-ink/50 md:mt-5 md:text-[22px]">
            {servicesIntro.subtitle}
          </p>
          <p className="mt-6 hidden max-w-[420px] text-[15px] leading-relaxed text-muted md:block">
            {servicesIntro.body}
          </p>

          {/* Desktop service index */}
          <ul className="mt-10 hidden flex-col border-t border-line md:flex">
            {services.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active === i ? "true" : undefined}
                  className={`group flex w-full items-center gap-5 border-b border-line py-3.5 text-left transition-colors ${
                    active === i ? "text-ink" : "text-ink/40 hover:text-ink/70"
                  }`}
                >
                  <span className="font-display text-[15px] font-extrabold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[17px] font-semibold">
                    {s.label}
                  </span>
                  <span
                    className={`size-2.5 rounded-full transition-all duration-300 ${
                      active === i
                        ? "scale-100 bg-lime shadow-[0_0_10px_rgba(200,255,0,0.9)]"
                        : "scale-50 bg-ink/20"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Pinned on mobile: deck + progress + tabs */}
        <div
          ref={stageRef}
          className="pb-8 pt-6 [--card-h:clamp(430px,calc(100svh-240px),620px)] [--peek:34px] md:col-span-7 md:py-0 md:[--card-h:clamp(440px,calc(100svh-200px),600px)] md:[--peek:42px]"
        >
          <div
            ref={deckRef}
            className="relative h-[calc(var(--card-h)+var(--peek)*2)]"
          >
            {services.map((s, i) => (
              <ServiceCard
                key={s.id}
                service={s}
                index={i}
                total={N}
                active={active === i}
                cardRef={(el) => {
                  cards.current[i] = el;
                }}
                contentRef={(el) => {
                  contents.current[i] = el;
                }}
                peekRef={(el) => {
                  peeks.current[i] = el;
                }}
              />
            ))}
          </div>

          {/* Progress */}
          <div className="mx-auto mt-5 flex max-w-[260px] gap-2 md:mx-0 md:mt-6 md:max-w-none">
            {services.map((s, i) => (
              <span
                key={s.id}
                className="h-[6px] flex-1 overflow-hidden rounded-full bg-ink/10"
              >
                <span
                  ref={(el) => {
                    bars.current[i] = el;
                  }}
                  className="block h-full origin-left rounded-full bg-lime"
                  style={{ transform: `scaleX(${i === 0 ? 1 : 0})` }}
                />
              </span>
            ))}
          </div>

          {/* Mobile tabs */}
          <div className="mt-4 flex items-center justify-between md:hidden">
            {services.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                {i > 0 && <span className="h-5 w-px bg-ink/15" />}
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active === i ? "true" : undefined}
                  className={`mx-auto rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                    active === i ? "bg-lime text-ink" : "text-ink/45"
                  }`}
                >
                  {s.short}
                </button>
              </div>
            ))}
          </div>

          <p className="mt-3 flex flex-col items-center text-[9px] font-medium uppercase tracking-[0.45em] text-ink/45 md:mt-4 md:flex-row md:justify-end md:gap-2 md:text-[10px]">
            {active === N - 1 ? "Keep scrolling" : "Swipe or scroll for next"}
            <ChevronDown className="mt-0.5 size-4 animate-bounce md:mt-0" strokeWidth={1.5} />
          </p>
        </div>
      </div>
    </section>
  );
}
