import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

/**
 * Lightweight canvas particle field: soft floating dots that drift and
 * very gently steer away from the cursor, giving the page ambient life
 * without the cost of a full physics/3D particle system. Renders as an
 * absolutely-positioned layer inside Background's fixed container.
 */
export function Particles({ density = 55 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let animationId: number;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const count = Math.min(density, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.4 + 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 0.4;
          p.y -= (dy / dist) * 0.4;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(236, 238, 251, 0.35)";
        ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };
    const handleResize = () => init();

    init();
    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(draw);
    } else {
      draw();
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70" aria-hidden="true" />;
}
