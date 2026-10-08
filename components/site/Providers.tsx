"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Honour the OS "reduce motion" setting everywhere without branching the
 * markup (branching on it during render breaks hydration).
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
