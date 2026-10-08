"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import TexhXModel from "./TexhX3D";
import { ChromeArchModel } from "./ChromeArch3D";
import { CodeKeycapModel } from "./CodeKeycap3D";
import { SoftShadow } from "./SoftShadow";
import { StudioEnvironment } from "./StudioEnvironment";

/** Device mockup box, in CSS px relative to the canvas' top-left corner. */
export type Anchor = { x: number; y: number; w: number };

type Placement = {
  /** Offset from the device's centre, in multiples of the device width. */
  dx: number;
  dy: number;
  /** Visual size, in multiples of the device width. */
  size: number;
  rotation: [number, number, number];
  /** Scroll parallax: px of drift per px scrolled. */
  drift: number;
  delay: number;
  float: { speed: number; rotation: number; float: number };
  shadow?: { y: number; w: number; h: number; opacity: number };
};

type Layout = {
  x: Placement;
  arch: Placement;
  key?: Placement;
};

const DESKTOP: Layout = {
  x: {
    dx: -1.16,
    dy: 0.26,
    size: 0.5,
    rotation: [-0.3, -0.38, -0.06],
    drift: 0.12,
    delay: 0.35,
    float: { speed: 2, rotation: 0.3, float: 0.5 },
    shadow: { y: -0.74, w: 1.15, h: 0.26, opacity: 0.45 },
  },
  arch: {
    dx: 0.8,
    dy: -0.32,
    size: 0.42,
    rotation: [0.35, -0.45, -0.3],
    drift: -0.08,
    delay: 0.5,
    float: { speed: 2.4, rotation: 0.4, float: 0.6 },
  },
  key: {
    dx: 0.86,
    dy: 0.27,
    size: 0.32,
    rotation: [0.32, -0.5, 0.05],
    drift: 0.06,
    delay: 0.65,
    float: { speed: 2, rotation: 0.3, float: 0.5 },
    shadow: { y: -0.8, w: 1.25, h: 0.26, opacity: 0.4 },
  },
};

const MOBILE: Layout = {
  x: {
    dx: -0.42,
    dy: 0.4,
    size: 0.28,
    rotation: [-0.3, -0.38, -0.06],
    drift: 0.08,
    delay: 0.35,
    float: { speed: 2, rotation: 0.3, float: 0.5 },
    shadow: { y: -0.72, w: 1.1, h: 0.24, opacity: 0.4 },
  },
  arch: {
    dx: 0.44,
    dy: -0.43,
    size: 0.22,
    rotation: [0.35, -0.45, -0.3],
    drift: -0.05,
    delay: 0.5,
    float: { speed: 2.4, rotation: 0.4, float: 0.6 },
  },
};

/** Pointer (-1…1) and scroll (px), written by passive listeners. */
type Pointer = { x: number; y: number; scroll: number };

const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

function FloatingObject({
  anchor,
  placement,
  pointer,
  reducedMotion,
  children,
}: {
  anchor: Anchor;
  placement: Placement;
  pointer: React.RefObject<Pointer>;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  const outer = useRef<THREE.Group>(null!);
  const tilt = useRef<THREE.Group>(null!);
  const progress = useRef(reducedMotion ? 1 : 0);
  const elapsed = useRef(0);
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);

  // CSS px → world units on the z = 0 plane.
  const k = viewport.width / size.width;
  const baseX = (anchor.x + placement.dx * anchor.w - size.width / 2) * k;
  const baseY = -(anchor.y + placement.dy * anchor.w - size.height / 2) * k;
  const scale = placement.size * anchor.w * k;

  useFrame((_, dt) => {
    const delta = Math.min(dt, 1 / 30);
    elapsed.current += delta;

    if (progress.current < 1 && elapsed.current > placement.delay) {
      progress.current = Math.min(1, progress.current + delta * 1.4);
    }
    const s = scale * Math.max(0.0001, easeOutBack(progress.current));
    outer.current.scale.setScalar(s);

    const p = reducedMotion ? { x: 0, y: 0 } : pointer.current;
    // Never read window.scrollY here: inside a frame it forces a full layout.
    const scrollY = pointer.current.scroll;
    const targetX = baseX + p.x * 0.06 * scale;
    const targetY = baseY + p.y * 0.04 * scale + scrollY * placement.drift * k;
    outer.current.position.x = THREE.MathUtils.damp(
      outer.current.position.x,
      targetX,
      4,
      delta,
    );
    outer.current.position.y = THREE.MathUtils.damp(
      outer.current.position.y,
      targetY,
      4,
      delta,
    );

    tilt.current.rotation.y = THREE.MathUtils.damp(
      tilt.current.rotation.y,
      p.x * 0.35,
      3,
      delta,
    );
    tilt.current.rotation.x = THREE.MathUtils.damp(
      tilt.current.rotation.x,
      -p.y * 0.25,
      3,
      delta,
    );
  });

  const sh = placement.shadow;

  return (
    <group ref={outer} position={[baseX, baseY, 0]} scale={0.0001}>
      <group ref={tilt}>
        <Float
          enabled={!reducedMotion}
          speed={placement.float.speed}
          rotationIntensity={placement.float.rotation}
          floatIntensity={placement.float.float}
        >
          <group rotation={placement.rotation}>{children}</group>
        </Float>
      </group>
      {sh && (
        <SoftShadow
          position={[0, sh.y, -0.8]}
          scale={[sh.w, sh.h]}
          opacity={sh.opacity}
        />
      )}
    </group>
  );
}

function usePointer() {
  const pointer = useRef<Pointer>({ x: 0, y: 0, scroll: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      pointer.current.scroll = window.scrollY;
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return pointer;
}

export type Hero3DSceneProps = {
  anchor: Anchor;
  isMobile?: boolean;
  /** Pauses rendering while the hero is off-screen. */
  active?: boolean;
  reducedMotion?: boolean;
  onReady?: () => void;
};

export default function Hero3DScene({
  anchor,
  isMobile = false,
  active = true,
  reducedMotion = false,
  onReady,
}: Hero3DSceneProps) {
  const pointer = usePointer();
  const [dpr, setDpr] = useState(1.5);
  const layout = isMobile ? MOBILE : DESKTOP;

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 38 }}
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.NeutralToneMapping,
      }}
      onCreated={() => onReady?.()}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      />

      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 8, 6]} intensity={1.4} />
      <directionalLight position={[-6, -4, -2]} intensity={0.35} color="#D4FF00" />
      <StudioEnvironment />

      {/* 1. Neon X — lower left */}
      <FloatingObject
        anchor={anchor}
        placement={layout.x}
        pointer={pointer}
        reducedMotion={reducedMotion}
      >
        <TexhXModel />
      </FloatingObject>

      {/* 2. Chrome arch — upper right */}
      <FloatingObject
        anchor={anchor}
        placement={layout.arch}
        pointer={pointer}
        reducedMotion={reducedMotion}
      >
        <ChromeArchModel />
      </FloatingObject>

      {/* 3. Code keycap — lower right, desktop only */}
      {layout.key && (
        <FloatingObject
          anchor={anchor}
          placement={layout.key}
          pointer={pointer}
          reducedMotion={reducedMotion}
        >
          <CodeKeycapModel />
        </FloatingObject>
      )}
    </Canvas>
  );
}
