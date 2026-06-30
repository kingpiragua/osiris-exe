"use client";

import { useEffect, useRef, useState } from "react";

import BlinkingCursor from "@/components/crt/BlinkingCursor";

interface TypingTextProps {
  text: string;
  /** Begin typing once true. Defaults to true. */
  start?: boolean;
  /** Milliseconds per character. */
  speed?: number;
  /** Delay before the first character, in ms. */
  startDelay?: number;
  className?: string;
  /** Show the cursor while typing. */
  cursor?: boolean;
  /** Keep the cursor after typing completes. */
  cursorPersist?: boolean;
  onComplete?: () => void;
}

/**
 * Types a single line one character at a time. The reusable atom that
 * ArchiveLog and the terminal compose. Deliberately slow by default.
 */
export default function TypingText({
  text,
  start = true,
  speed = 52,
  startDelay = 0,
  className = "",
  cursor = true,
  cursorPersist = false,
  onComplete,
}: TypingTextProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // Hold onComplete in a ref so a new closure each render never restarts typing.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!start) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const step = () => {
      if (cancelled) return;
      i += 1;
      setCount(i);
      if (i < text.length) {
        timer = setTimeout(step, speed);
      } else {
        setDone(true);
        onCompleteRef.current?.();
      }
    };

    timer = setTimeout(() => {
      if (cancelled) return;
      setCount(0);
      setDone(false);
      step();
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [start, text, speed, startDelay]);

  const showCursor = start && cursor && (cursorPersist || !done);

  return (
    <p className={className}>
      {text.slice(0, count)}
      {showCursor && <BlinkingCursor />}
    </p>
  );
}
