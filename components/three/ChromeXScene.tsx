"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import TexhXModel from "./TexhX3D";
import { StudioEnvironment } from "./StudioEnvironment";

function Tilting({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, dt) => {
    if (reduced) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.5 + x * 0.25, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.45 - y * 0.18, 3, dt);
  });
  return (
    <group ref={group} rotation={[0.45, -0.5, -0.12]}>
      <Float enabled={!reduced} speed={1.6} rotationIntensity={0.25} floatIntensity={0.4}>
        <TexhXModel finish="chrome" />
      </Float>
    </group>
  );
}

/** Polished chrome X for the "Let's build" card (its own small canvas). */
export default function ChromeXScene({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 32 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.NeutralToneMapping,
      }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[-2, -1.5, 1.5]} intensity={6} color="#C8FF00" />
      <directionalLight position={[3, 4, 3]} intensity={1.2} />
      <StudioEnvironment />
      <Tilting reduced={reduced} />
    </Canvas>
  );
}
