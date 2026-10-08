"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import type { CardTheme, ServiceId } from "@/content/site";
import { GlassDevice, screens } from "./Illustrations";

/** The card illustration, played once it scrolls into view. */
export function ServiceVisual({
  id,
  theme,
}: {
  id: ServiceId;
  theme: CardTheme;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = useState(false);
  const Screen = screens[id];

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setActive(true), 350);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref}>
      <GlassDevice theme={theme} active={active}>
        <Screen theme={theme} active={active} />
      </GlassDevice>
    </div>
  );
}
