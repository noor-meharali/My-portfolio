import { lazy, Suspense } from "react";
import { motion, type MotionValue } from "framer-motion";
import { FloatingTechIcons } from "@/components/hero/FloatingTechIcons";

// Three.js + fiber are heavy — split into their own chunk so the initial
// paint (headline, CTAs) never waits on the 3D scene to download/parse.
const Scene = lazy(() => import("@/components/three/Scene").then((m) => ({ default: m.Scene })));

interface Hero3DProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

/**
 * Hero's right-hand visual column: ambient glow, the lazy-loaded 3D
 * wireframe core, and the floating tech-stack chips orbiting it.
 */
export function Hero3D({ mouseX, mouseY }: Hero3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
      className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
    >
      <div
        className="absolute inset-[12%] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-signal-violet) 0%, transparent 65%)" }}
      />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <FloatingTechIcons mouseX={mouseX} mouseY={mouseY} />
    </motion.div>
  );
}
