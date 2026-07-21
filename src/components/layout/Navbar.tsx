import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { profile } from "@/data/profile";
import { navItems } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const SECTION_IDS = navItems.map((item) => item.id);

/**
 * Fixed glass navbar: logo, section links with an active-link indicator,
 * a theme toggle, and a hamburger that opens MobileMenu below lg. Native
 * anchors + `scroll-behavior: smooth` (global) + `scroll-margin-top` (on
 * each section) handle the smooth-scroll + navbar-offset for free — no
 * scroll JS needed here.
 */
export function Navbar({ visible }: { visible: boolean }) {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);
  const { theme, toggleTheme } = useTheme();

  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 right-0 left-0 z-50 px-6 py-5 md:px-12 lg:px-20"
      >
        <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3">
          <a href="#home" data-cursor="link" className="font-display text-lg font-semibold tracking-tight text-ink">
            {initials}
            <span className="text-signal-cyan">.</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-cursor="link"
                className={cn(
                  "relative rounded-full px-4 py-2 font-mono-tight text-xs uppercase transition-colors duration-300",
                  activeId === item.id ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-signal-violet/20 to-signal-cyan/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              data-cursor="link"
              className="glass flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-ink"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex"
                >
                  {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <MagneticButton href="#contact" variant="ghost" className="hidden px-5 py-2 text-xs sm:inline-flex">
              Let&apos;s talk
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              data-cursor="link"
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setMobileOpen(false)}
        activeId={activeId}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </>
  );
}
