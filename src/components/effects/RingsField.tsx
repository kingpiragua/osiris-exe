"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * The ancient backdrop for BEFORE THE WIRE (Memory 005): faint concentric rings
 * (tree rings / vinyl grooves / fingerprints) that evoke age and continuity,
 * warm phosphor fading toward amber at the edges, and a slow film grain — no
 * terminal, no eye, no glitch. Portaled to <body> so it stays behind the shell
 * and animates smoothly.
 */
export default function RingsField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div aria-hidden="true" className="memory-rings-field">
      <div className="memory-rings" />
      <div className="memory-rings-warm" />
      <div className="memory-rings-grain" />
    </div>,
    document.body,
  );
}
