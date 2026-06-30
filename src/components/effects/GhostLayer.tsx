"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface GhostLayerProps {
  words: string[];
}

// Scattered, deterministic positions across the viewport (SSR-safe).
const POSITIONS = [
  { top: "8%", left: "4%" },
  { top: "16%", left: "62%" },
  { top: "30%", left: "12%" },
  { top: "44%", left: "72%" },
  { top: "56%", left: "6%" },
  { top: "68%", left: "52%" },
  { top: "13%", left: "33%" },
  { top: "82%", left: "22%" },
  { top: "50%", left: "40%" },
];

/**
 * Faint burn-in words drifting behind the interface. Portaled to <body> so it
 * lives OUTSIDE the shimmer's filtered subtree — otherwise the words would
 * re-rasterize every frame and drift janky. Sits at z-0 (behind the CRT shell,
 * above the black background), viewport-fixed, non-interactive.
 */
export default function GhostLayer({ words }: GhostLayerProps) {
  const [mounted, setMounted] = useState(false);

  // Mount-gate the portal (avoids SSR/hydration mismatch).
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!mounted || words.length === 0) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {words.map((word, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        return (
          <span
            key={i}
            className="ghost-word"
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${(i % 5) * 1.4}s`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>,
    document.body,
  );
}
