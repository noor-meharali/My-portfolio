import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks raw viewport mouse position. Returns null until the pointer
 * actually moves so consumers can skip parallax math before first move.
 */
export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}

/**
 * Mouse position normalized to -1..1 on each axis, relative to the
 * viewport center. Useful for parallax / depth effects.
 */
export function useNormalizedMouse() {
  const [normalized, setNormalized] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setNormalized({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return normalized;
}
