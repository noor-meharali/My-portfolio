import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

export type CursorVariant = "default" | "hover" | "press";

/**
 * Owns the custom cursor's raw state: live pointer position (as Framer
 * motion values, so consumers can animate off them without re-rendering
 * on every mousemove), hover detection over anything interactive, press
 * state, and a touch/no-fine-pointer check.
 *
 * Logic flow: mouse position -> state -> animation — the mousemove/over/
 * down/up listeners update motion values + a little React state here;
 * Cursor.tsx and CursorGlow.tsx turn that into motion.
 */
export function useCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsTouch(!supportsFinePointer);
    if (!supportsFinePointer) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
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
  }, [x, y]);

  const variant: CursorVariant = isPressed ? "press" : isHovering ? "hover" : "default";
  // Scale factor consumers can apply to the dot — presses pinch it in
  // slightly, giving click feedback before anything else happens.
  const dotScale = isPressed ? 0.7 : 1;

  return { x, y, isHovering, isPressed, isTouch, variant, dotScale };
}
