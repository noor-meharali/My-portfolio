import { Gradient } from "@/components/effects/Gradient";
import { Particles } from "@/components/effects/Particles";
import { Noise } from "@/components/effects/Noise";

/**
 * Single fixed, full-viewport layer behind every section: animated
 * gradient blobs, the particle field, and a noise texture on top, over a
 * near-black void base. Mounted once near the root of App.tsx so it sits
 * behind the Navbar/Hero/Footer/etc. stacking-wise (-z-10) without any of
 * them needing to know it's there.
 */
export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
      <Gradient />
      <Particles />
      <Noise />
    </div>
  );
}
