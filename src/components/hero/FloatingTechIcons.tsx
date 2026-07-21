import { useMemo } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { techStack } from "@/data/profile";

interface ChipPosition {
  id: string;
  top: string;
  left: string;
  depth: number;
  delay: number;
}

// Hand-placed orbit positions (percent of the scene box) so the constellation
// reads as deliberate rather than randomly scattered.
const POSITIONS: Omit<ChipPosition, "id">[] = [
  { top: "8%", left: "18%", depth: 1.4, delay: 0 },
  { top: "6%", left: "70%", depth: 1.1, delay: 0.4 },
  { top: "40%", left: "4%", depth: 0.9, delay: 0.8 },
  { top: "38%", left: "88%", depth: 1.3, delay: 1.2 },
  { top: "78%", left: "22%", depth: 1.0, delay: 1.6 },
  { top: "82%", left: "68%", depth: 0.8, delay: 2.0 },
];

interface FloatingTechIconsProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function FloatingTechIcons({ mouseX, mouseY }: FloatingTechIconsProps) {
  const chips = useMemo(
    () => techStack.map((tech, i) => ({ ...tech, ...POSITIONS[i % POSITIONS.length] })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
        <defs>
          <linearGradient id="signal-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-signal-violet)" />
            <stop offset="100%" stopColor="var(--color-signal-cyan)" />
          </linearGradient>
        </defs>
        {chips.map((chip, i) => (
          <line
            key={chip.id}
            x1="50%"
            y1="50%"
            x2={chip.left}
            y2={chip.top}
            stroke="url(#signal-line)"
            strokeWidth="1"
            strokeDasharray="3 5"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.15;0.6;0.15"
              dur="4s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>

      {chips.map((chip) => (
        <TechChip key={chip.id} chip={chip} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}

function TechChip({
  chip,
  mouseX,
  mouseY,
}: {
  chip: (typeof techStack)[number] & ChipPosition;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const Icon = chip.icon;
  const x = useSpring(useTransform(mouseX, (v) => v * 18 * chip.depth), {
    stiffness: 120,
    damping: 18,
  });
  const y = useSpring(useTransform(mouseY, (v) => v * 18 * chip.depth), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <motion.div
      className="animate-float pointer-events-auto absolute"
      style={{ top: chip.top, left: chip.left, x, y, animationDelay: `${chip.delay}s` }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1 + chip.delay * 0.15, duration: 0.6, ease: "backOut" }}
      whileHover={{ scale: 1.15 }}
    >
      <div
        className="glass flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-black/40 md:h-14 md:w-14"
        title={chip.label}
      >
        <Icon className="h-5 w-5 text-ink md:h-6 md:w-6" />
      </div>
    </motion.div>
  );
}
