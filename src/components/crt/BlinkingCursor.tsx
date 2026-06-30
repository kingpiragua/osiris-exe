interface BlinkingCursorProps {
  className?: string;
  /** Irregular timing for a more alive, less mechanical blink. */
  irregular?: boolean;
}

/** A blinking block cursor that scales with the surrounding font size. */
export default function BlinkingCursor({
  className = "",
  irregular = false,
}: BlinkingCursorProps) {
  return (
    <span
      aria-hidden="true"
      className={`${irregular ? "cursor-blink-irregular" : "cursor-blink"} ml-0.5 inline-block translate-y-[0.05em] ${className}`}
    >
      █
    </span>
  );
}
