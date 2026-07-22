import { motion, useSpring, type MotionValue } from "framer-motion";

interface CursorGlowProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isHovering: boolean;
  isPressed: boolean;
}

/**
 * The outer "signal ring" — trails the dot on its own spring (so it
 * visibly lags a beat behind), then grows and fills when hovering
 * anything interactive so the interaction feels acknowledged before
 * the click lands.
 */
export function CursorGlow({ x, y, isHovering, isPressed }: CursorGlowProps) {
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border"
      style={{
        x: ringX,
        y: ringY,
        translateX: "-50%",
        translateY: "-50%",
        borderColor: "color-mix(in srgb, var(--color-signal-cyan) 70%, transparent)",
      }}
      animate={{
        width: isHovering ? 56 : 32,
        height: isHovering ? 56 : 32,
        scale: isPressed ? 0.85 : 1,
        backgroundColor: isHovering
          ? "color-mix(in srgb, var(--color-signal-violet) 16%, transparent)"
          : "transparent",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    />
  );
}
