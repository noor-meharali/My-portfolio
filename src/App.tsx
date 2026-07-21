import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/loaders/Loader";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { GradientBackground } from "@/components/effects/GradientBackground";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";

// Vite SPA equivalent of Next's app/layout.tsx: this is the single root
// tree, so "{children}" is just whatever section components sit inside
// <main> below. New sections (About, Skills, Projects...) get added there
// as they're built — Navbar/Footer already pick them up automatically via
// the shared `navItems` ids.
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>{isLoading && <Loader onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      <CustomCursor />
      <GradientBackground />
      <ParticlesBackground />

      <Navbar visible={!isLoading} />

      <main>
        <Hero />
      </main>

      <Footer />
    </>
  );
}

export default App;
