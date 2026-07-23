/**
 * Film-grain noise texture, blended over the gradient so the near-black
 * void reads as material rather than a flat digital fill. Purely
 * decorative — same inline SVG data-URI as before, just its own file.
 */
export function Noise() {
  return <div className="noise-overlay absolute inset-0" aria-hidden="true" />;
}
