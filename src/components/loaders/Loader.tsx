import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Preloader: a signal line draws itself across the screen while a mono
 * counter ticks to 100, then the wordmark flashes and the whole panel
 * wipes up. GSAP drives the timeline since it's a single linear sequence
 * with precise timing — the exact case GSAP timelines are built for.
 */
export function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const lineRef = useRef<SVGPathElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = { value: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete,
    });

    if (prefersReducedMotion) {
      setPercent(100);
      tl.to(panelRef.current, { autoAlpha: 0, duration: 0.4, delay: 0.3 });
      return;
    }

    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
    }

    tl.to(counter, {
      value: 100,
      duration: 1.6,
      onUpdate: () => setPercent(Math.floor(counter.value)),
    })
      .to(lineRef.current, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, "<")
      .to(wordRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .to({}, { duration: 0.35 })
      .to(panelRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-void"
    >
      <div
        ref={wordRef}
        className="mb-6 font-display text-sm tracking-[0.4em] text-muted uppercase opacity-0 translate-y-2"
      >
        Noor Ali — Front-End Developer
      </div>
      <svg width="220" height="2" viewBox="0 0 220 2" className="mb-4 overflow-visible">
        <path ref={lineRef} d="M0 1 H220" stroke="url(#loader-gradient)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-signal-violet)" />
            <stop offset="100%" stopColor="var(--color-signal-cyan)" />
          </linearGradient>
        </defs>
      </svg>
      <motion.span className="font-mono-tight text-xs text-muted-2">
        {String(percent).padStart(3, "0")}%
      </motion.span>
    </div>
  );
}
