"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A large abstract phosphor eye that opens behind THE FIRST EYE (Memory 003).
 * Portaled to <body> so it lives outside the shimmer's filtered subtree and
 * blinks smoothly. Viewport-fixed, faint, behind the CRT shell, non-interactive.
 */
export default function EyeField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div aria-hidden="true" className="memory-eye-field">
      <div className="memory-eye" />
    </div>,
    document.body,
  );
}
