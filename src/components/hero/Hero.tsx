import { lazy, Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, useMotionValue } from "framer-motion";
import { ArrowDown, Download, MessageSquare, FolderGit2 } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TypewriterRole } from "@/components/hero/TypewriterRole";
import { FloatingTechIcons } from "@/components/hero/FloatingTechIcons";

// Three.js + fiber are heavy — split into their own chunk so the initial
// paint (headline, CTAs) never waits on the 3D scene to download/parse.
const HeroScene3D = lazy(() =>
  import("@/components/hero/HeroScene3D").then((m) => ({ default: m.HeroScene3D })),
);

const HEADLINE_LINES = ["Building immersive digital", "experiences with modern web technologies."];

interface HeroProps {
  /** Fires once the entrance timeline finishes, so App can reveal the navbar in sync. */
  onIntroComplete?: () => void;
}

export function Hero({ onIntroComplete }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-28 pb-16 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text column */}
        <div>
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

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" variant="primary">
              <FolderGit2 className="h-4 w-4" /> View Projects
            </MagneticButton>
            <MagneticButton href={profile.resumeHref} variant="ghost" download target="_blank">
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <MessageSquare className="h-4 w-4" /> Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-12 flex items-center gap-5"
          >
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-cursor="link"
                className="text-muted transition-colors duration-300 hover:text-signal-cyan"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scene column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
        >
          <div
            className="absolute inset-[12%] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-signal-violet) 0%, transparent 65%)" }}
          />
          <Suspense fallback={null}>
            <HeroScene3D />
          </Suspense>
          <FloatingTechIcons mouseX={mouseX} mouseY={mouseY} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        data-cursor="link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono-tight text-[10px] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
