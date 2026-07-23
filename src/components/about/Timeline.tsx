import { motion } from "framer-motion";
import { timelineMilestones, type MilestoneStatus } from "@/data/timeline";
import { cn } from "@/lib/utils";

const NODE_STYLES: Record<MilestoneStatus, string> = {
  complete: "border-signal-cyan bg-signal-cyan",
  current: "border-signal-violet bg-signal-violet",
  upcoming: "border-muted-2 bg-transparent",
};

const LABEL_STYLES: Record<MilestoneStatus, string> = {
  complete: "text-ink",
  current: "text-ink",
  upcoming: "text-muted",
};

/**
 * Animated vertical timeline for the Developer Journey. Each milestone
 * fades/slides in as it scrolls into view (Framer's whileInView, no
 * custom IntersectionObserver needed), connected by a gradient signal
 * line — the same motif used elsewhere in the site.
 */
export function Timeline() {
  return (
    <ol className="relative border-l border-white/10 pl-8">
      <div
        className="absolute top-0 -left-px h-full w-px"
        style={{ background: "linear-gradient(180deg, var(--color-signal-violet), var(--color-signal-cyan), transparent)" }}
        aria-hidden="true"
      />

      {timelineMilestones.map((milestone, i) => (
        <motion.li
          key={milestone.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
          className="relative mb-6 last:mb-0"
        >
          <span
            className={cn(
              "absolute top-1.5 -left-[2.35rem] h-3 w-3 rounded-full border-2",
              NODE_STYLES[milestone.status],
              milestone.status === "current" && "animate-pulse-slow",
            )}
            aria-hidden="true"
          />
          <p className={cn("text-sm leading-relaxed sm:text-base", LABEL_STYLES[milestone.status])}>
            {milestone.label}
            {milestone.status === "current" && (
              <span className="ml-2 font-mono-tight text-[10px] text-signal-violet uppercase">now</span>
            )}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
