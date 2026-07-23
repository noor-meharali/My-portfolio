/**
 * Slow-drifting mesh-gradient blobs (violet / cyan / amber) plus a faint
 * technical dot-grid over them and a bottom vignette back to void. This
 * is the "color" layer of Background — Particles and Noise sit on top.
 */
export function Gradient() {
  return (
    <>
      <div
        className="animate-mesh absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-signal-violet), transparent 70%)" }}
      />
      <div
        className="animate-mesh absolute top-1/3 -right-1/4 h-[60vh] w-[60vh] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-signal-cyan), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="animate-mesh absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full opacity-20 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--color-signal-amber), transparent 70%)", animationDelay: "-11s" }}
      />
      <div className="bg-grid-dots absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
    </>
  );
}
