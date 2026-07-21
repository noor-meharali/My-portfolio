import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface UseMagneticOptions {
  /** How far the element is allowed to drift toward the cursor, in px. */
  strength?: number;
}

/**
 * Magnetic hover effect: the bound element eases toward the cursor while
 * hovered, and springs back to rest on leave. Attach `ref` + spread
 * `handlers` onto the target element, then use `style` on a motion.* tag.
 */
export function useMagnetic({ strength = 24 }: UseMagneticOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handlers = {
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      x.set((relX / rect.width) * strength);
      y.set((relY / rect.height) * strength);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  };

  return { ref, style: { x: springX, y: springY }, handlers };
}
