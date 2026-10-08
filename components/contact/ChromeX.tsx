"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { TexhcoX } from "@/components/brand/TexhcoLogo";

const ChromeXScene = dynamic(() => import("@/components/three/ChromeXScene"), {
  ssr: false,
  // Flat silhouette while the 3D chunk loads.
  loading: () => (
    <TexhcoX fill="rgba(200,255,0,0.12)" className="absolute inset-[18%] h-auto w-[64%]" />
  ),
});

/** Mounts the chrome X only once it nears the viewport; pauses off-screen. */
export function ChromeX({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "300px" });
  const visible = useInView(ref);
  const reduced = useReducedMotion() ?? false;

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none ${className}`}>
      {near && <ChromeXScene active={visible} reduced={reduced} />}
    </div>
  );
}
