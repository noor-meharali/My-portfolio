import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// --- tuning constants -------------------------------------------------------
const HEAD_MAX_PAN = 6; // px the face is allowed to drift toward the cursor
const HEAD_MAX_ROTATE = 13; // deg — keeps the "look" readable, not cartoonish
const PUPIL_MAX_OFFSET = 3.4; // px pupils travel inside their socket
const NORMALIZE_RANGE = 420; // px of cursor offset that maps to full pan/rotate
const LERP_HEAD = 0.09; // slower, follows a beat behind the eyes
const LERP_EYES = 0.18; // eyes lead the head, like real gaze behaviour
const NEAR_ENTER_DIST = 170;
const NEAR_EXIT_DIST = 215;
const IDLE_TIMEOUT_MS = 8000;

/**
 * A small "Signal" AI-bot fixed in the bottom-right corner. Its antenna
 * tip pulses like the site's other signal-line motifs, tying it visually
 * to the cursor ring / preloader / hero constellation instead of feeling
 * bolted on.
 *
 * Transform ownership is split across three nested layers so GSAP and
 * Framer Motion never fight over the same element's `transform`:
 *   - `wrapperRef` (outer, fixed-position): untouched by either library —
 *     stays the stable reference point for the rAF loop's distance math.
 *   - the Framer `motion.div` inside it: opacity/scale entrance + the
 *     continuous idle float (translateY loop).
 *   - `leanRef` (GSAP-only): scroll lean, celebration pop, idle "stretch".
 * `faceRef` (the SVG head group) is written to directly in the rAF loop
 * for cursor tracking, and briefly handed to GSAP during curious-idle
 * look-around timelines (guarded so the two never write in the same tick).
 */
export function Mascot() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leanRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftFinRef = useRef<SVGGElement>(null);
  const rightFinRef = useRef<SVGGElement>(null);

  const mouse = useRef({ x: -9999, y: -9999 });
  const smoothed = useRef({ headX: 0, headY: 0, eyeX: 0, eyeY: 0 });
  const lastMoveAt = useRef(Date.now());
  const isCuriousPlaying = useRef(false);
  const wasNear = useRef(false);
  const rafId = useRef(0);

  const [isBlinking, setIsBlinking] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const isHappy = isNear || isHoveringInteractive;

  // --- respect reduced-motion preference --------------------------------
  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // --- global cursor + interactive-element tracking ----------------------
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      lastMoveAt.current = Date.now();
    };
    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHoveringInteractive(Boolean(target.closest("[data-cursor='link']")));
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  // --- subtle lean while scrolling, eased back automatically --------------
  useEffect(() => {
    if (!leanRef.current || reducedMotion) return;
    let lastY = window.scrollY;
    let decay: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      const lean = Math.max(-7, Math.min(7, delta * 0.4));
      gsap.to(leanRef.current, { rotate: lean, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      clearTimeout(decay);
      decay = setTimeout(() => {
        gsap.to(leanRef.current, { rotate: 0, duration: 0.6, ease: "power2.out" });
      }, 220);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(decay);
    };
  }, [reducedMotion]);

  // --- natural, randomly-timed blinking ------------------------------------
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 3000;
      timeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 130);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // --- one-shot wave the moment the cursor arrives nearby -----------------
  useEffect(() => {
    if (isNear && !wasNear.current) {
      [leftFinRef.current, rightFinRef.current].forEach((fin, i) => {
        if (!fin) return;
        gsap.fromTo(
          fin,
          { rotate: 0 },
          {
            keyframes: [
              { rotate: i === 0 ? -24 : 24, duration: 0.16 },
              { rotate: i === 0 ? 8 : -8, duration: 0.16 },
              { rotate: i === 0 ? -14 : 14, duration: 0.14 },
              { rotate: 0, duration: 0.2 },
            ],
            ease: "power1.inOut",
            delay: i * 0.05,
          },
        );
      });
    }
    wasNear.current = isNear;
  }, [isNear]);

  // --- curious idle behaviour when the cursor hasn't moved in a while ------
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      if (isCuriousPlaying.current) return;
      if (Date.now() - lastMoveAt.current < IDLE_TIMEOUT_MS) return;
      if (!faceRef.current || !leanRef.current) return;

      isCuriousPlaying.current = true;
      const face = faceRef.current;
      const lean = leanRef.current;
      const variant = Math.floor(Math.random() * 3);
      const tl = gsap.timeline({
        onComplete: () => {
          isCuriousPlaying.current = false;
          lastMoveAt.current = Date.now();
        },
      });

      if (variant === 0) {
        // look left, then right, settle center — "curious glance"
        tl.to(face, { rotate: -16, x: -5, duration: 0.55, ease: "power2.inOut" })
          .to(face, { rotate: 16, x: 5, duration: 1, ease: "power2.inOut" })
          .to(face, { rotate: 0, x: 0, y: 0, duration: 0.5, ease: "power2.inOut" });
      } else if (variant === 1) {
        // look up curiously, then settle — "hm, what's that?"
        tl.to(face, { rotate: 8, y: -5, duration: 0.45, ease: "power2.out" })
          .to(face, { rotate: -6, duration: 0.45, ease: "power2.inOut" })
          .to(face, { rotate: 0, y: 0, duration: 0.45, ease: "power2.inOut" });
      } else {
        // a little stretch/yawn, on the GSAP-owned lean layer
        tl.to(lean, { scaleY: 1.07, scaleX: 0.96, duration: 0.4, ease: "power1.out" }).to(lean, {
          scaleY: 1,
          scaleX: 1,
          duration: 0.55,
          ease: "elastic.out(1, 0.5)",
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // --- tiny celebration, fired on page/section transitions -----------------
  useEffect(() => {
    const handleCelebrate = () => {
      if (!leanRef.current) return;
      gsap.fromTo(
        leanRef.current,
        { rotate: 0, scale: 1 },
        {
          keyframes: [
            { rotate: -9, scale: 1.08, duration: 0.14 },
            { rotate: 9, duration: 0.14 },
            { rotate: -5, duration: 0.13 },
            { rotate: 0, scale: 1, duration: 0.25 },
          ],
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    };
    window.addEventListener("mascot:celebrate", handleCelebrate);
    return () => window.removeEventListener("mascot:celebrate", handleCelebrate);
  }, []);

  // --- the continuous cursor-tracking loop ----------------------------------
  useEffect(() => {
    if (faceRef.current) {
      Object.assign(faceRef.current.style, { transformBox: "fill-box", transformOrigin: "50% 55%" });
    }
    [leftPupilRef.current, rightPupilRef.current].forEach((el) => {
      if (el) Object.assign(el.style, { transformBox: "fill-box", transformOrigin: "50% 50%" });
    });

    const headLerp = reducedMotion ? 1 : LERP_HEAD;
    const eyeLerp = reducedMotion ? 1 : LERP_EYES;

    const tick = () => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mouse.current.x - centerX;
        const dy = mouse.current.y - centerY;
        const dist = Math.hypot(dx, dy);

        setIsNear((prev) => {
          if (!prev && dist < NEAR_ENTER_DIST) return true;
          if (prev && dist > NEAR_EXIT_DIST) return false;
          return prev;
        });

        const normX = Math.max(-1, Math.min(1, dx / NORMALIZE_RANGE));
        const normY = Math.max(-1, Math.min(1, dy / NORMALIZE_RANGE));

        const s = smoothed.current;
        s.headX += (normX * HEAD_MAX_PAN - s.headX) * headLerp;
        s.headY += (normY * HEAD_MAX_PAN * 0.6 - s.headY) * headLerp;
        s.eyeX += (normX * PUPIL_MAX_OFFSET - s.eyeX) * eyeLerp;
        s.eyeY += (normY * PUPIL_MAX_OFFSET - s.eyeY) * eyeLerp;

        if (faceRef.current && !isCuriousPlaying.current) {
          const rotate = (s.headX / HEAD_MAX_PAN) * HEAD_MAX_ROTATE;
          faceRef.current.style.transform = `translate(${s.headX}px, ${s.headY}px) rotate(${rotate}deg)`;
        }
        if (leftPupilRef.current) leftPupilRef.current.style.transform = `translate(${s.eyeX}px, ${s.eyeY}px)`;
        if (rightPupilRef.current) rightPupilRef.current.style.transform = `translate(${s.eyeX}px, ${s.eyeY}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed right-5 bottom-5 z-40 hidden sm:block md:right-8 md:bottom-8"
      style={{ width: 108, height: 124 }}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: reducedMotion ? 0 : [0, -7, 0],
        }}
        transition={{
          opacity: { delay: 2.1, duration: 0.6 },
          scale: { delay: 2.1, duration: 0.6, ease: "backOut" },
          y: reducedMotion ? { duration: 0 } : { delay: 2.4, duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* ambient glow, echoes the hero's signal-blob treatment */}
        <div
          className="absolute inset-[6%] -z-10 rounded-full blur-2xl transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, var(--color-signal-violet) 0%, var(--color-signal-cyan) 55%, transparent 75%)",
            opacity: isHappy ? 0.55 : 0.32,
          }}
        />

        <div ref={leanRef} className="h-full w-full">
          <motion.div
            animate={reducedMotion ? {} : { scale: [1, 1.025, 1] }}
            transition={reducedMotion ? {} : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <svg viewBox="0 0 140 150" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="mascot-body" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-signal-violet)" />
                  <stop offset="100%" stopColor="var(--color-signal-cyan)" />
                </linearGradient>
                <radialGradient id="mascot-highlight" cx="35%" cy="28%" r="60%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* antenna — pulses like the site's signal-line motif */}
              <line x1="70" y1="36" x2="70" y2="14" stroke="url(#mascot-body)" strokeWidth="2" strokeLinecap="round" />
              <motion.circle
                cx="70"
                cy="11"
                r="4"
                fill="var(--color-signal-cyan)"
                animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }}
                transition={reducedMotion ? {} : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* fins — small side "arms" used for the wave gesture */}
              <g ref={leftFinRef} style={{ transformBox: "fill-box", transformOrigin: "100% 30%" }}>
                <ellipse cx="16" cy="92" rx="9" ry="15" fill="url(#mascot-body)" opacity="0.85" />
              </g>
              <g ref={rightFinRef} style={{ transformBox: "fill-box", transformOrigin: "0% 30%" }}>
                <ellipse cx="124" cy="92" rx="9" ry="15" fill="url(#mascot-body)" opacity="0.85" />
              </g>

              {/* face — the only group that pans/rotates toward the cursor */}
              <g ref={faceRef}>
                <circle cx="70" cy="80" r="48" fill="url(#mascot-body)" />
                <circle cx="70" cy="80" r="48" fill="url(#mascot-highlight)" />
                <circle cx="70" cy="80" r="48" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />

                {/* eyes */}
                <g
                  style={{
                    transform: isBlinking ? "scaleY(0.08)" : "scaleY(1)",
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    transition: "transform 0.09s ease",
                  }}
                >
                  <circle cx="53" cy="76" r="11" fill="var(--color-void)" fillOpacity="0.9" />
                  <circle cx="87" cy="76" r="11" fill="var(--color-void)" fillOpacity="0.9" />
                  <circle
                    ref={leftPupilRef}
                    cx="53"
                    cy="76"
                    r="5"
                    fill={isHappy ? "var(--color-signal-cyan)" : "white"}
                    style={{
                      filter: isHappy ? "drop-shadow(0 0 4px var(--color-signal-cyan))" : "none",
                      transition: "fill 0.25s ease",
                    }}
                  />
                  <circle
                    ref={rightPupilRef}
                    cx="87"
                    cy="76"
                    r="5"
                    fill={isHappy ? "var(--color-signal-cyan)" : "white"}
                    style={{
                      filter: isHappy ? "drop-shadow(0 0 4px var(--color-signal-cyan))" : "none",
                      transition: "fill 0.25s ease",
                    }}
                  />
                </g>

                {/* blush — fades in when happy */}
                <circle
                  cx="38"
                  cy="92"
                  r="6"
                  fill="var(--color-signal-amber)"
                  opacity={isHappy ? 0.35 : 0}
                  style={{ transition: "opacity 0.3s ease" }}
                />
                <circle
                  cx="102"
                  cy="92"
                  r="6"
                  fill="var(--color-signal-amber)"
                  opacity={isHappy ? 0.35 : 0}
                  style={{ transition: "opacity 0.3s ease" }}
                />

                {/* mouth — neutral curve cross-fades to a bigger smile */}
                <path
                  d="M 58 100 Q 70 106 82 100"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity={isHappy ? 0 : 0.85}
                  style={{ transition: "opacity 0.25s ease" }}
                />
                <path
                  d="M 54 98 Q 70 114 86 98"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity={isHappy ? 0.95 : 0}
                  style={{ transition: "opacity 0.25s ease" }}
                />
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
