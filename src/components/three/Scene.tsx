import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Lights } from "@/components/three/Lights";
import { Model } from "@/components/three/Model";

/**
 * Canvas/camera/renderer setup for the hero's 3D core. Kept separate
 * from Lights/Model so each can be swapped independently later (a
 * different primitive, more lights) without touching the canvas config.
 */
export function Scene() {
  return (
    <Canvas
      className="!absolute !inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Model />
      </Suspense>
    </Canvas>
  );
}
