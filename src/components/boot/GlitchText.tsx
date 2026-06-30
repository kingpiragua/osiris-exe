"use client";

import { useEffect, useRef, useState } from "react";

import BlinkingCursor from "@/components/crt/BlinkingCursor";

interface GlitchTextProps {
  text: string;
  /** Begin the reveal once true. Defaults to true. */
  start?: boolean;
  className?: string;
  /** Frame interval in ms (also re-randomizes the glitch glyphs). */
  frameMs?: number;
  /** Frames an unresolved character glitches before settling. */
  framesPerChar?: number;
  cursorPersist?: boolean;
  onComplete?: () => void;
}

const GLITCH_GLYPHS = "█▓▒░#".split("");

function randomGlyph() {
  return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveals text as a quiet glitch correction: unsettled characters flicker as
 * phosphor blocks, then resolve left to right — e.g. WEL█OME → WELCOME →
 * WELCOME BACK. Respects reduced-motion (reveals plainly).
 */
export default function GlitchText({
  text,
  start = true,
  className = "",
  frameMs = 55,
  framesPerChar = 3,
  cursorPersist = true,
  onComplete,
}: GlitchTextProps) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!start) return;

    let cancelled = false;

    // Reduced motion: settle immediately, no scramble.
    if (prefersReducedMotion()) {
      const t = setTimeout(() => {
        if (cancelled) return;
        setShown(text);
        setDone(true);
        onCompleteRef.current?.();
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }

    let settled = 0;
    let frame = 0;

    const id = setInterval(() => {
      if (cancelled) return;
      frame += 1;
      if (frame % framesPerChar === 0 && settled < text.length) {
        settled += 1;
      }
      let out = "";
      for (let i = 0; i < text.length; i += 1) {
        out += i < settled || text[i] === " " ? text[i] : randomGlyph();
      }
      setShown(out);
      if (settled >= text.length) {
        clearInterval(id);
        setDone(true);
        onCompleteRef.current?.();
      }
    }, frameMs);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [start, text, frameMs, framesPerChar]);

  return (
    <p className={className}>
      {shown}
      {start && (cursorPersist || !done) && <BlinkingCursor />}
    </p>
  );
}
