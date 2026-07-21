import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { socialLinks } from "@/data/profile";
import type { Theme } from "@/hooks/useTheme";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  theme: Theme;
  onToggleTheme: () => void;
}

/**
 * Full-screen glass drawer for < lg viewports. Locks body scroll while
 * open, closes on backdrop click or Escape, and mirrors the desktop
 * Navbar's active-link + theme-toggle state so both stay in sync.
 */
export function MobileMenu({ isOpen, onClose, activeId, theme, onToggleTheme }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] bg-void/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="glass ml-auto flex h-full w-[82%] max-w-sm flex-col px-8 py-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-tight text-xs text-muted uppercase">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                data-cursor="link"
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={onClose}
                  data-cursor="link"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                  className={`py-2 font-display text-2xl font-medium ${
                    activeId === item.id ? "text-gradient-signal" : "text-ink"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
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
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle color theme"
                data-cursor="link"
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink"
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
