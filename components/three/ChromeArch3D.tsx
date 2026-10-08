"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Proportions from public/brand/chrome-arch-front.svg:
// centerline radius 80, tube radius 20, 250° sweep with rounded ends.
const R = 0.4;
const TUBE = R * 0.3; // SVG is 20/80; a touch thicker reads better in 3D
const START = THREE.MathUtils.degToRad(-35);
const SWEEP = THREE.MathUtils.degToRad(250);
// The silhouette's bounding box sits above the arc centre; shift it so the
// object floats around its visual middle.
const Y_OFFSET = -(R + TUBE - (Math.sin(-START) * R + TUBE)) / 2;

class ArchCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }

  getPoint(t: number, target = new THREE.Vector3()) {
    const a = START + SWEEP * t;
    return target.set(Math.cos(a) * R, Math.sin(a) * R, 0);
  }
}

function pointAt(angle: number) {
  return new THREE.Vector3(Math.cos(angle) * R, Math.sin(angle) * R, 0);
}

/** Polished chrome horseshoe with a lime band near its left end. */
export function ChromeArchModel() {
  const { tube, cap, band, ends, bandPose } = useMemo(() => {
    const tube = new THREE.TubeGeometry(new ArchCurve(), 160, TUBE, 48, false);
    const cap = new THREE.SphereGeometry(TUBE, 48, 32);
    const band = new THREE.TorusGeometry(TUBE * 1.04, TUBE * 0.16, 16, 64);

    const bandAngle = START + SWEEP * 0.9;
    const tangent = new THREE.Vector3(
      -Math.sin(bandAngle),
      Math.cos(bandAngle),
      0,
    );
    const bandPose = {
      position: pointAt(bandAngle),
      quaternion: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        tangent,
      ),
    };

    return {
      tube,
      cap,
      band,
      ends: [pointAt(START), pointAt(START + SWEEP)],
      bandPose,
    };
  }, []);

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#EAEAEA",
        metalness: 1,
        roughness: 0.07,
        envMapIntensity: 1.6,
      }),
    [],
  );

  return (
    <group position={[0, Y_OFFSET, 0]}>
      <mesh geometry={tube} material={chrome} />
      {ends.map((p, i) => (
        <mesh key={i} geometry={cap} material={chrome} position={p} />
      ))}
      <mesh
        geometry={band}
        position={bandPose.position}
        quaternion={bandPose.quaternion}
      >
        <meshStandardMaterial
          color="#C8FF00"
          emissive="#C8FF00"
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
