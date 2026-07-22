import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Preloader: a cat mascot sits inside an animated progress ring that draws
 * itself while a mono counter ticks to 100, then the wordmark flashes and
 * the whole panel wipes up. GSAP drives the sequence with precise timing.
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
      {/* Cat Mascot Loader Visual */}
      <div className="relative mb-6 flex items-center justify-center" style={{ width: 130, height: 130 }}>
        {/* Ambient background glow */}
        <div
          className="absolute inset-[10%] rounded-full blur-2xl opacity-40 animate-pulse"
          style={{
            background:
              "radial-gradient(circle, var(--color-signal-violet) 0%, var(--color-signal-cyan) 65%, transparent 100%)",
          }}
        />

        {/* Floating animated cat head surrounded by progress track */}
        <motion.div
          className="relative z-10 h-full w-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 140 140" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="loader-cat-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-signal-violet)" />
                <stop offset="100%" stopColor="var(--color-signal-cyan)" />
              </linearGradient>
              <radialGradient id="loader-cat-highlight" cx="35%" cy="28%" r="60%">
                <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="loader-progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-signal-violet)" />
                <stop offset="100%" stopColor="var(--color-signal-cyan)" />
              </linearGradient>
              <filter id="cat-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer loading ring background track */}
            <circle
              cx="70"
              cy="70"
              r="64"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="2.5"
              fill="none"
            />

            {/* GSAP Progress Line around the cat */}
            <path
              ref={lineRef}
              d="M 70 6 A 64 64 0 1 1 69.9 6"
              stroke="url(#loader-progress-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#cat-glow)"
            />

            {/* Cat Mascot Graphic */}
            <g id="loader-cat-head">
              {/* Antenna orb */}
              <circle cx="70" cy="18" r="3.5" fill="var(--color-signal-cyan)" />

              {/* Ears */}
              <polygon points="34,50 50,22 60,45" fill="url(#loader-cat-body)" />
              <polygon points="106,50 90,22 80,45" fill="url(#loader-cat-body)" />
              <polygon points="38,48 50,27 57,44" fill="var(--color-signal-violet)" opacity="0.6" />
              <polygon points="102,48 90,27 83,44" fill="var(--color-signal-violet)" opacity="0.6" />

              {/* Head shape */}
              <path
                d="M 30 74 C 30 48, 110 48, 110 74 C 110 110, 30 110, 30 74 Z"
                fill="url(#loader-cat-body)"
              />
              <path
                d="M 30 74 C 30 48, 110 48, 110 74 C 110 110, 30 110, 30 74 Z"
                fill="url(#loader-cat-highlight)"
              />

              {/* Whiskers */}
              <g stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round">
                <line x1="22" y1="74" x2="40" y2="76" />
                <line x1="20" y1="83" x2="40" y2="81" />
                <line x1="118" y1="74" x2="100" y2="76" />
                <line x1="120" y1="83" x2="100" y2="81" />
              </g>

              {/* Eyes */}
              <ellipse cx="53" cy="71" rx="10" ry="8" fill="var(--color-void)" fillOpacity="0.9" />
              <ellipse cx="87" cy="71" rx="10" ry="8" fill="var(--color-void)" fillOpacity="0.9" />
              <circle cx="53" cy="71" r="4" fill="var(--color-signal-cyan)" />
              <circle cx="87" cy="71" r="4" fill="var(--color-signal-cyan)" />

              {/* Nose & Smile */}
              <polygon points="68,81 72,81 70,84" fill="white" opacity="0.8" />
              <path
                d="M 63 88 Q 66 94 70 90 Q 74 94 77 88"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Percentage Counter */}
      <motion.span className="mb-4 font-mono-tight text-sm font-semibold tracking-wider text-muted-2">
        {String(percent).padStart(3, "0")}%
      </motion.span>

      {/* Wordmark Text */}
      <div
        ref={wordRef}
        className="font-display text-sm tracking-[0.4em] text-muted uppercase opacity-0 translate-y-2"
      >
        Noor Ali — Front-End Developer
      </div>
    </div>
  );
}