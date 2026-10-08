"use client";

import { Environment, Lightformer } from "@react-three/drei";

export function StudioEnvironment() {
  // Built from Lightformers instead of an HDRI preset: no runtime fetch from
  // a third-party CDN, and the chrome gets crisp studio-style highlights.
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#d9d6cc"]} />
      {/* Soft key from above */}
      <Lightformer
        form="rect"
        intensity={5}
        position={[0, 7, 1]}
        scale={[14, 4, 1]}
      />
      {/* Tall strips left/right — the long highlights along the tube */}
      <Lightformer
        form="rect"
        intensity={4}
        position={[-6, 0, 3]}
        scale={[1.5, 10, 1]}
      />
      <Lightformer
        form="rect"
        intensity={3}
        position={[6, 1, 3]}
        scale={[2.5, 10, 1]}
      />
      {/* Fill from the camera side */}
      <Lightformer
        form="rect"
        intensity={1.5}
        position={[0, 0, 9]}
        scale={[10, 3, 1]}
      />
      {/* Dark horizon band for chrome contrast */}
      <Lightformer
        form="rect"
        intensity={1}
        color="#151515"
        position={[0, -3, 6]}
        scale={[16, 2.5, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1}
        color="#2a2a2a"
        position={[0, -8, 0]}
        scale={[16, 6, 1]}
      />
      {/* Lime kicker */}
      <Lightformer
        form="circle"
        intensity={3}
        color="#C8FF00"
        position={[-5, -2, 4]}
        scale={2}
      />
    </Environment>
  );
}
