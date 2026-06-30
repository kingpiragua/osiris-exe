"use client";

interface FadingCursorProps {
  className?: string;
  /** Fires once the cursor has blinked a few times and faded out. */
  onFadeEnd?: () => void;
}

/**
 * The large boot cursor. Blinks ~3 times, then fades out completely (held at
 * opacity 0). When the fade animation ends it calls onFadeEnd, which the boot
 * uses to hand control to the terminal — guaranteeing only one active cursor.
 */
export default function FadingCursor({
  className = "",
  onFadeEnd,
}: FadingCursorProps) {
  return (
    <span
      aria-hidden="true"
      className={`cursor-blink-out inline-block translate-y-[0.05em] ${className}`}
      onAnimationEnd={onFadeEnd}
    >
      █
    </span>
  );
}
