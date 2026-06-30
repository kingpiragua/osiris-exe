"use client";

import { useEffect, useState, type RefObject } from "react";

import BlinkingCursor from "@/components/crt/BlinkingCursor";

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  /** Shared ref so the Terminal can refocus on click. */
  inputRef: RefObject<HTMLInputElement | null>;
}

/**
 * The waiting prompt: a `>` and a quiet, block-cursor input line. The native
 * caret is hidden; a BlinkingCursor trails the typed text for the ceremonial
 * feel. The real <input> sits transparently on top to capture keystrokes.
 */
export default function TerminalInput({ onSubmit, inputRef }: TerminalInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-baseline gap-2 text-sm tracking-wide text-phosphor text-phosphor-glow sm:text-base"
    >
      <span className="select-none text-phosphor-dim">&gt;</span>
      <span className="relative inline-flex min-w-[1ch] items-baseline">
        <span className="whitespace-pre">{value}</span>
        <BlinkingCursor irregular className="text-[0.7em] text-phosphor-dim" />
        {value.length === 0 && (
          <span
            aria-hidden="true"
            className="pointer-events-none ml-3 select-none whitespace-pre text-phosphor-dim opacity-50"
          >
            type &quot;help&quot;
          </span>
        )}
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </span>
    </form>
  );
}
