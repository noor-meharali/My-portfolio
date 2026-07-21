import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import type { Mesh } from "three";
import { useNormalizedMouse } from "@/hooks/useMousePosition";

/**
 * The "developer workspace" reads here as a wireframe icosahedron — a
 * single faceted core the tech chips orbit around — slowly self-rotating
 * and tilting toward the cursor for a subtle parallax depth cue. Kept to
 * one primitive so it stays a quiet supporting element, not a showpiece.
 */
function WireframeCore() {
  const meshRef = useRef<Mesh>(null);
  const mouse = useNormalizedMouse();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.x += (mouse.y * 0.25 - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (mouse.x * 0.35 - meshRef.current.rotation.y) * 0.01;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.6, 1]}>
      <meshBasicMaterial color="#7c5cfc" wireframe transparent opacity={0.55} />
    </Icosahedron>
  );
}

export function HeroScene3D() {
  return (
    <Canvas
      className="!absolute !inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <WireframeCore />
      </Suspense>
    </Canvas>
  );
}
