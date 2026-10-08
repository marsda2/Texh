"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { LETTER_X } from "@/components/brand/logo-paths";
import { shapesFromPathData } from "./svg-shapes";

// The mark is ~270 SVG units wide; normalise it to ~1 world unit.
const UNIT = 1 / 270;

/**
 * Bevelled extrusion of public/brand/texhco-x.svg — brand lime by default,
 * or polished chrome.
 */
export default function TexhXModel({
  finish = "lime",
}: {
  finish?: "lime" | "chrome";
}) {
  const geometry = useMemo(() => {
    const shapes = shapesFromPathData(LETTER_X);
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 44,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 8,
      bevelSize: 5,
      // Keep the bevel inside the outline so the slits between the three
      // pieces stay open instead of fusing together.
      bevelOffset: -5,
      bevelSegments: 5,
    });
    geo.center();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} scale={[UNIT, -UNIT, UNIT]}>
      {finish === "chrome" ? (
        <meshStandardMaterial
          color="#ececec"
          metalness={1}
          roughness={0.1}
          envMapIntensity={1.6}
        />
      ) : (
        <meshStandardMaterial
          color="#C8FF00"
          roughness={0.28}
          metalness={0.05}
          emissive="#3D4F00"
          emissiveIntensity={0.3}
          envMapIntensity={0.9}
        />
      )}
    </mesh>
  );
}
