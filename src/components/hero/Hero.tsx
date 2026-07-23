import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HeroText } from "@/components/hero/HeroText";
import { HeroButtons } from "@/components/hero/HeroButtons";
import { Hero3D } from "@/components/hero/Hero3D";

/**
 * Hero section shell: lays out HeroText + HeroButtons in the left column
 * and Hero3D in the right, and owns the single mousemove listener that
 * both the 3D scene and the floating tech chips read parallax from.
 */
export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-28 pb-16 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <HeroText />
          <HeroButtons />
        </div>

        <Hero3D mouseX={mouseX} mouseY={mouseY} />
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
