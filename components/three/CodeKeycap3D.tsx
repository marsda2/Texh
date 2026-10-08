"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  roundedRect,
  roundedRectPath,
  shapesFromPathData,
} from "./svg-shapes";

// Layers from public/brand/code-keycap-front.svg (256×256 viewBox, centre 128).
const CODE_LEFT =
  "M 99.1589 100.7991 L 79.1589 124.7991 A 5 5 0 0 0 80.4275 132.2875 L 100.4275 144.2875 A 5 5 0 0 0 105.5725 135.7125 L 90.5784 126.7161 L 106.8411 107.2009 A 5 5 0 0 0 99.1589 100.7991 Z";
const CODE_DIVIDER =
  "M 130 89 A 5 5 0 0 1 135 94 V 162 A 5 5 0 0 1 130 167 A 5 5 0 0 1 125 162 V 94 A 5 5 0 0 1 130 89 Z";

const UNIT = 1 / 200; // body is 200 units wide → ~1 world unit

// Body extrusion: the bevel is pulled inside the outline, so the front cap
// is the outline inset by BEVEL.
const DEPTH = 64;
const BEVEL = 14;
const FRONT = DEPTH + BEVEL; // z of the body's front cap

function centred(geo: THREE.BufferGeometry) {
  geo.translate(-128, -128, 0);
  return geo;
}

/** Smoked keycap with a recessed face and an emissive `< | >` glyph. */
export function CodeKeycapModel() {
  const geo = useMemo(() => {
    const body = centred(
      new THREE.ExtrudeGeometry(roundedRect(28, 28, 200, 200, 36), {
        depth: DEPTH,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: BEVEL,
        bevelSize: BEVEL,
        bevelOffset: -BEVEL,
        bevelSegments: 6,
      }),
    );

    // Light rim framing the face (sits on the body's front cap).
    const rimShape = roundedRect(42, 42, 172, 172, 24);
    rimShape.holes.push(roundedRectPath(52, 52, 152, 152, 16));
    const rim = centred(
      new THREE.ExtrudeGeometry(rimShape, {
        depth: 3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1.5,
        bevelSize: 1.5,
        bevelOffset: -1.5,
        bevelSegments: 3,
      }),
    );

    const face = centred(
      new THREE.ExtrudeGeometry(roundedRect(53, 53, 150, 150, 15), {
        depth: 1.5,
        curveSegments: 12,
        bevelEnabled: false,
      }),
    );

    const glyphOpts: THREE.ExtrudeGeometryOptions = {
      depth: 5,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 1.5,
      bevelSize: 1.2,
      bevelOffset: -1.2,
      bevelSegments: 3,
    };
    const chevron = centred(
      new THREE.ExtrudeGeometry(shapesFromPathData([CODE_LEFT]), glyphOpts),
    );
    const divider = centred(
      new THREE.ExtrudeGeometry(shapesFromPathData([CODE_DIVIDER]), glyphOpts),
    );

    return { body, rim, face, chevron, divider };
  }, []);

  const neon = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C8FF00",
        emissive: "#C8FF00",
        emissiveIntensity: 1.5,
        roughness: 0.25,
        toneMapped: false,
      }),
    [],
  );

  return (
    // Flip SVG's y-down space and centre the stack on z.
    <group scale={[UNIT, -UNIT, UNIT]} position={[0, 0, -(FRONT / 2) * UNIT]}>
      <mesh geometry={geo.body}>
        <meshPhysicalMaterial
          color="#3a3b35"
          roughness={0.32}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.2}
        />
      </mesh>

      <mesh geometry={geo.rim} position={[0, 0, FRONT - 1]}>
        <meshStandardMaterial
          color="#999A94"
          roughness={0.35}
          metalness={0.55}
        />
      </mesh>

      <mesh geometry={geo.face} position={[0, 0, FRONT - 0.5]}>
        <meshPhysicalMaterial
          color="#1F201E"
          roughness={0.25}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      <group position={[0, 0, FRONT + 1]}>
        <mesh geometry={geo.chevron} material={neon} />
        <mesh geometry={geo.divider} material={neon} position={[-2, 0, 0]} />
        {/* Right chevron = left one mirrored around the keycap's centre. */}
        <mesh geometry={geo.chevron} material={neon} scale={[-1, 1, 1]} />
      </group>
    </group>
  );
}
