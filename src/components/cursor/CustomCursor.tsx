import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom animated cursor: a small solid dot with pixel-accurate tracking,
 * plus a lagging outer "signal ring" on a spring. The ring scales up and
 * fills on hover of anything interactive (data-cursor="link" / native
 * a/button), so the interaction feels acknowledged before the click.
 */
export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsTouch(!supportsHover);
    if (!supportsHover) return;

    const handleMove = (event: MouseEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };
    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHovering(Boolean(target.closest("a, button, [role='button'], [data-cursor='link']")));
    };
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dotX, dotY]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-ink"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
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
    </div>
  );
}
