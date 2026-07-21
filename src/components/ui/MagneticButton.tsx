import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  download?: boolean;
  target?: string;
}

/**
 * Buttons that gently drift toward the cursor on hover (magnetic effect),
 * then spring back on leave. `variant="primary"` carries the signal
 * gradient; `variant="ghost"` is a glass outline for secondary actions.
 */
export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  download,
  target,
}: MagneticButtonProps) {
  const { ref, style, handlers } = useMagnetic({ strength: 18 });

  const base =
    "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300";
  const variants = {
    primary:
      "bg-gradient-to-r from-signal-violet to-signal-cyan text-void shadow-[0_0_30px_-8px_var(--color-signal-violet)] hover:shadow-[0_0_44px_-6px_var(--color-signal-cyan)]",
    ghost: "glass text-ink hover:border-signal-cyan/50",
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref as never}
      href={href}
      onClick={onClick}
      download={download}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      data-cursor="link"
      style={style}
      {...handlers}
      whileTap={{ scale: 0.96 }}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </Tag>
  );
}
