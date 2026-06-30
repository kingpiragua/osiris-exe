"use client";

import { useEffect, useRef, useState } from "react";

import TypingText from "@/components/crt/TypingText";

interface ArchiveLogProps {
  lines: readonly string[];
  /** Begin the log once true. Defaults to true. */
  start?: boolean;
  /** Milliseconds per character. */
  speed?: number;
  /** Pause before each subsequent line, in ms. */
  lineDelay?: number;
  /** Delay before the first line, in ms. */
  startDelay?: number;
  className?: string;
  lineClassName?: string;
  onComplete?: () => void;
  /** Reports recovery progress as each line completes. */
  onProgress?: (completed: number, total: number) => void;
}

/**
 * Types a list of lines one after another — the recovery rite. Each line is a
 * TypingText; only the active line carries a cursor. Calls onComplete when the
 * last line finishes.
 */
export default function ArchiveLog({
  lines,
  start = true,
  speed = 48,
  lineDelay = 460,
  startDelay = 0,
  className = "",
  lineClassName = "",
  onComplete,
  onProgress,
}: ArchiveLogProps) {
  const [active, setActive] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  return (
    <div className={className}>
      {lines.map((line, i) => {
        if (i > active) return null;

        return (
          <TypingText
            key={i}
            text={line}
            start={start && i <= active}
            speed={speed}
            startDelay={i === 0 ? startDelay : lineDelay}
            className={lineClassName}
            cursor={i === active}
            onComplete={() => {
              onProgressRef.current?.(i + 1, lines.length);
              if (i < lines.length - 1) {
                setActive((prev) => Math.max(prev, i + 1));
              } else {
                onCompleteRef.current?.();
              }
            }}
          />
        );
      })}
    </div>
  );
}
