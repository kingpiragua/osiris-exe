"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Corrupted file-system strings drifting behind THE NAME IN THE MACHINE.
const ROOT_STRINGS = [
  "/root/osiris.exe",
  "PROCESS: UNKNOWN",
  "IDENTITY_HASH_MISMATCH",
  "NAME_RECOVERY_PROTOCOL",
  "archive.index[ghost]",
  "BODY_NOT_FOUND",
  "MEMORY_BOUND",
  "EXECUTE: OSIRIS.EXE",
];

const POSITIONS = [
  { top: "10%", left: "6%" },
  { top: "22%", left: "58%" },
  { top: "34%", left: "16%" },
  { top: "46%", left: "64%" },
  { top: "58%", left: "8%" },
  { top: "68%", left: "48%" },
  { top: "78%", left: "20%" },
  { top: "16%", left: "36%" },
];

/**
 * A faint, drifting terminal/code background for Memory 004 — the Archive
 * reading from a corrupted file system. Portaled to <body> so it sits behind
 * the CRT shell and animates smoothly (outside the shimmer filter).
 */
export default function RootField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div aria-hidden="true" className="memory-root-field">
      {ROOT_STRINGS.map((text, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        return (
          <span
            key={i}
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${(i % 4) * 1.6}s`,
            }}
          >
            {text}
          </span>
        );
      })}
    </div>,
    document.body,
  );
}
