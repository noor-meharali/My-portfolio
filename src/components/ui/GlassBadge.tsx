import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassBadge({
  children,
  pulse = false,
  className,
}: {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono-tight text-[11px] uppercase text-muted",
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-pulse-slow absolute inline-flex h-full w-full rounded-full bg-signal-amber" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-amber" />
        </span>
      )}
      {children}
    </div>
  );
}
