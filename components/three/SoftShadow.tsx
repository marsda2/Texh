"use client";

import { useMemo } from "react";
import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

function shadowTexture() {
  if (cached) return cached;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(40,38,30,0.55)");
  g.addColorStop(0.45, "rgba(40,38,30,0.22)");
  g.addColorStop(1, "rgba(40,38,30,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  cached = new THREE.CanvasTexture(canvas);
  return cached;
}

/**
 * Cheap blurred ground shadow (a gradient sprite on a plane). Much lighter
 * than real shadow maps and reads the same on the flat cream background.
 */
export function SoftShadow({
  position,
  scale,
  opacity = 0.5,
}: {
  position: [number, number, number];
  scale: [number, number];
  opacity?: number;
}) {
  const map = useMemo(() => shadowTexture(), []);
  return (
    <mesh position={position} scale={[scale[0], scale[1], 1]} renderOrder={-1}>
      <planeGeometry />
      <meshBasicMaterial
        map={map}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
