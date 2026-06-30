"use client";

import { useEffect, useRef, useState } from "react";

import TerminalInput from "@/components/terminal/TerminalInput";
import TerminalOutput from "@/components/terminal/TerminalOutput";
import {
  parseCommand,
  type CommandOutput,
} from "@/components/terminal/CommandParser";
import { clearRecovery } from "@/lib/recovery";

type HistoryEntry =
  | { id: number; kind: "input"; text: string }
  | { id: number; kind: "output"; output: CommandOutput };

interface TerminalProps {
  /**
   * Called when the visitor confirms recovery (presses Enter after `begin`).
   * Navigation lives with the caller, so the terminal stays reusable.
   */
  onRecover?: () => void;
  /** Called when `begin` arms the terminal (recovered memory found). */
  onArm?: () => void;
}

/**
 * The interactive archive terminal. Holds command history in local state,
 * delegates parsing to CommandParser, and auto-scrolls to the waiting prompt.
 * After `begin`, the next Enter triggers onRecover. No backend — all local.
 */
export default function Terminal({ onRecover, onArm }: TerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [armed, setArmed] = useState(false);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (raw: string) => {
    // Once armed by `begin`, a bare Enter recovers the memory.
    if (armed && !raw.trim()) {
      onRecover?.();
      return;
    }
    if (!raw.trim()) return;

    const result = parseCommand(raw);

    if (result?.type === "clear") {
      setHistory([]);
      setArmed(false);
      return;
    }

    // Hidden: purge recovery state, then reboot from the beginning.
    if (result?.type === "reset") {
      clearRecovery();
      setHistory((prev) => [
        ...prev,
        { id: nextId.current++, kind: "input", text: raw },
        {
          id: nextId.current++,
          kind: "output",
          output: {
            type: "lines",
            lines: ["PURGING RECOVERED STATE...", "REBOOTING ARCHIVE..."],
          },
        },
      ]);
      window.setTimeout(() => window.location.reload(), 1100);
      return;
    }

    setHistory((prev) => {
      const next: HistoryEntry[] = [
        ...prev,
        { id: nextId.current++, kind: "input", text: raw },
      ];
      if (result) {
        next.push({ id: nextId.current++, kind: "output", output: result });
      }
      return next;
    });

    if (result?.type === "begin") {
      setArmed(true);
      onArm?.();
    }
  };

  // Keep the waiting prompt in view as the archive responds.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    inputRef.current?.focus();
  }, [history]);

  return (
    <div className="space-y-3" onClick={() => inputRef.current?.focus()}>
      {history.map((entry) =>
        entry.kind === "input" ? (
          <p
            key={entry.id}
            className="flex gap-2 text-sm tracking-wide text-phosphor sm:text-base"
          >
            <span className="select-none text-phosphor-dim">&gt;</span>
            <span className="whitespace-pre-wrap break-words">{entry.text}</span>
          </p>
        ) : (
          <TerminalOutput key={entry.id} output={entry.output} />
        ),
      )}

      <TerminalInput inputRef={inputRef} onSubmit={handleSubmit} />
      <div ref={endRef} />
    </div>
  );
}
