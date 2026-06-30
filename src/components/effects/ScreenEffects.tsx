/**
 * The decorative CRT overlay stack — green bloom, restrained scanlines, curved
 * tube darkening, and the edge vignette. Fixed to the viewport so the surface
 * stays put while the archive scrolls beneath it. Non-interactive and hidden
 * from assistive tech.
 */
export default function ScreenEffects() {
  return (
    <>
      <div
        aria-hidden="true"
        className="crt-bloom pointer-events-none fixed inset-0 z-20"
      />
      <div
        aria-hidden="true"
        className="crt-scanlines pointer-events-none fixed inset-0 z-20"
      />
      <div
        aria-hidden="true"
        className="crt-curve pointer-events-none fixed inset-0 z-30"
      />
      <div
        aria-hidden="true"
        className="crt-vignette pointer-events-none fixed inset-0 z-30"
      />
    </>
  );
}
