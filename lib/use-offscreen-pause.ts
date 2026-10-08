"use client";

import { useEffect, type RefObject } from "react";

/**
 * Marks the element `data-offscreen` while it's out of view; globals.css
 * pauses every CSS animation inside it. Touches an attribute, not React
 * state, so nothing re-renders.
 */
export function useOffscreenPause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}
