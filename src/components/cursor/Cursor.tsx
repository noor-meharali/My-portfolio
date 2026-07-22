import { motion } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";
import { CursorGlow } from "@/components/cursor/CursorGlow";

/**
 * Custom animated cursor: a small solid dot pinned exactly to the pointer,
 * plus the lagging CursorGlow ring. All the tracking/hover-detection state
 * lives in useCursor so the dot and glow stay perfectly in sync without
 * duplicate listeners.
 */
export function Cursor() {
  const { x, y, isHovering, isPressed, isTouch, dotScale } = useCursor();

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-ink"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: dotScale }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      <CursorGlow x={x} y={y} isHovering={isHovering} isPressed={isPressed} />
    </div>
  );
}
