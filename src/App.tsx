import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/loaders/Loader";
import { Cursor } from "@/components/cursor/Cursor";
import { GradientBackground } from "@/components/effects/GradientBackground";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { Mascot } from "@/components/mascot/Mascot";

// Vite SPA equivalent of Next's app/layout.tsx: this is the single root
// tree, so "{children}" is just whatever section components sit inside
// <main> below. New sections (About, Skills, Projects...) get added there
// as they're built — Navbar/Footer already pick them up automatically via
// the shared `navItems` ids.
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    // Lets the mascot play its tiny celebration once the page is ready;
    // any future route/section transition can dispatch the same event.
    window.dispatchEvent(new Event("mascot:celebrate"));
  };

  return (
    <>
      <AnimatePresence>{isLoading && <Loader onComplete={handleLoaderComplete} />}</AnimatePresence>

      <Cursor />
      <GradientBackground />
      <ParticlesBackground />

      <Navbar visible={!isLoading} />
      <Mascot />

      <main>
        <Hero />
      </main>

      <Footer />
    </>
  );
}

export default App;
