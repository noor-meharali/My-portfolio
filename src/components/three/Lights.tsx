/**
 * Minimal lighting rig for the hero's wireframe core. The wireframe
 * material is unlit (meshBasicMaterial), so this mostly matters if a
 * future model swap uses a lit material — kept small on purpose so it
 * never competes with the wireframe's own glow.
 */
export function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 4]} intensity={0.4} color="#22d3ee" />
    </>
  );
}
