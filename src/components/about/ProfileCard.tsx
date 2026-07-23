import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { aboutInfo } from "@/data/about";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { profile } from "@/data/profile";

const TILT_RANGE = 10; // deg — kept subtle so it reads as premium, not gimmicky

/**
 * The About section's visual anchor: a glassmorphism card with a
 * slow-rotating gradient border, ambient glow, gentle float, and a mouse
 * tilt effect (rotateX/rotateY driven by cursor position within the
 * card, eased back to flat on leave).
 */
export function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(false);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 20 });
  // Subtle glare that follows the tilt, sold by a radial highlight.
  const glareX = useTransform(rotateY, [-TILT_RANGE, TILT_RANGE], [20, 80]);
  const glareY = useTransform(rotateX, [-TILT_RANGE, TILT_RANGE], [80, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * TILT_RANGE * 2);
    rotateXRaw.set(-py * TILT_RANGE * 2);
  };

  const handleMouseLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="animate-float-slow relative mx-auto w-full max-w-xs"
      style={{ perspective: 900 }}
    >
      {/* ambient glow behind the card */}
      <div
        className="absolute inset-[6%] -z-10 rounded-[2rem] opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-signal-violet) 0%, var(--color-signal-cyan) 60%, transparent 80%)" }}
        aria-hidden="true"
      />

      {/* animated gradient border */}
      <div className="animate-spin-slow absolute -inset-[2px] rounded-[1.75rem] opacity-80" aria-hidden="true">
        <div
          className="h-full w-full rounded-[1.75rem]"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-signal-violet), var(--color-signal-cyan), var(--color-signal-amber), var(--color-signal-violet))",
          }}
        />
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass relative overflow-hidden rounded-[1.7rem] px-7 py-9 text-center shadow-2xl shadow-black/40"
      >
        {/* glare that tracks the tilt */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 55%)`,
            ),
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full ring-2 ring-white/15">
          {imgFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-signal-violet to-signal-cyan font-display text-3xl font-semibold text-void">
              {initials}
            </div>
          ) : (
            <img
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover"
              onError={() => setImgFailed(true)}
            />
          )}
        </div>

        <h3 className="font-display text-xl font-semibold text-ink">{profile.name}</h3>
        <p className="mt-1 font-mono-tight text-xs text-signal-cyan uppercase">{profile.role}</p>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {profile.location}
        </p>

        <div className="mt-5 flex justify-center">
          <GlassBadge pulse>{aboutInfo.availability}</GlassBadge>
        </div>
      </motion.div>
    </motion.div>
  );
}
