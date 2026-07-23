import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { TypewriterRole } from "@/components/hero/TypewriterRole";

const HEADLINE_LINES = ["Building immersive digital", "experiences with modern web technologies."];

interface HeroTextProps {
  /** Fires once the line-reveal entrance finishes. */
  onIntroComplete?: () => void;
}

/**
 * Hero's left-column copy: availability badge, the big line-reveal
 * heading, the typing role descriptor, and the intro paragraph. Owns its
 * own GSAP entrance timeline (scoped to its own root ref) so it stays
 * self-contained now that it's split out of Hero.tsx.
 */
export function HeroText({ onIntroComplete }: HeroTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, onComplete: onIntroComplete });
      if (prefersReducedMotion) {
        gsap.set(lineRefs.current, { yPercent: 0, opacity: 1 });
        onIntroComplete?.();
        return;
      }
      tl.fromTo(
        lineRefs.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.12 },
      );
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <GlassBadge pulse>{profile.availability}</GlassBadge>
      </motion.div>

      <h1 className="mt-7 font-display text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
        {HEADLINE_LINES.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <span
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="block"
            >
              {i === HEADLINE_LINES.length - 1 ? (
                <>
                  experiences with{" "}
                  <span className="text-gradient-signal">modern web technologies.</span>
                </>
              ) : (
                line
              )}
            </span>
          </span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="mt-6 flex flex-wrap items-center gap-3 font-mono-tight text-sm text-muted"
      >
        <span className="text-signal-cyan">{"//"}</span>
        <TypewriterRole words={profile.roleVariants} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.7 }}
        className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
      >
        {profile.intro}
      </motion.p>
    </div>
  );
}
