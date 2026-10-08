"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import type { Anchor } from "@/components/three/Hero3DScene";
import { useMediaQuery } from "@/lib/use-media-query";

const Hero3DScene = dynamic(() => import("@/components/three/Hero3DScene"), {
  ssr: false,
});

/**
 * Full-bleed WebGL layer (z-20) over the hero. It tracks the device mockup's
 * layout box so the 3D objects stay glued to it at every viewport size.
 */
export function HeroCanvas({
  anchorRef,
}: {
  anchorRef: RefObject<HTMLElement | null>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const wrap = wrapRef.current;
    const target = anchorRef.current;
    if (!wrap || !target) return;

    const measure = () => {
      const a = target.getBoundingClientRect();
      const b = wrap.getBoundingClientRect();
      setAnchor({
        x: a.left - b.left + a.width / 2,
        y: a.top - b.top + a.height / 2,
        w: target.offsetWidth,
      });
    };

    measure();
    // Web fonts can nudge the layout without resizing either element.
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    ro.observe(target);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [anchorRef]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0 }}
    >
      {anchor && isMobile !== null && (
        <Hero3DScene
          anchor={anchor}
          isMobile={isMobile}
          active={inView}
          reducedMotion={reducedMotion}
          onReady={() => setReady(true)}
        />
      )}
    </div>
  );
}
