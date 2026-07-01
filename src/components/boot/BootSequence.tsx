"use client";

import { useEffect, useRef, useState } from "react";

import ArchiveLog from "@/components/boot/ArchiveLog";
import GlitchText from "@/components/boot/GlitchText";
import FadingCursor from "@/components/crt/FadingCursor";
import TypingText from "@/components/crt/TypingText";

// The place the user is returning to.
const HEADER_LINES = ["OSIRIS.EXE", "ARCHIVE : HUMBOLDT-01"] as const;

// The recovery rite — erased memory brought back online, one act at a time.
// Kept short so the boot stays a beat, not a wait, before the archive opens.
const LOG_LINES = [
  "RECOVERING MEMORY ................ RECOVERED",
  "REASSEMBLING TIMELINE ............. STABLE",
  "CHECKING CULTURAL INTEGRITY ....... INTACT",
  "RESTORING LOST TIMELINE ........... RECONSTRUCTED",
] as const;

// The Archive recognizing the visitor — typed naturally on one line.
const FINAL_SENTENCE = "you were never gone.";

const FINAL_CLASS =
  "mt-12 lowercase tracking-wide text-lg text-phosphor text-phosphor-glow sm:text-2xl";

const HEADER_CLASS =
  "text-[0.7rem] uppercase tracking-[0.45em] text-phosphor-dim sm:text-sm";
const LOG_CLASS =
  "whitespace-pre text-[0.6rem] uppercase tracking-wide text-phosphor text-phosphor-glow sm:text-base";
const WELCOME_CLASS =
  "mt-12 text-3xl font-bold uppercase tracking-[0.35em] text-phosphor text-phosphor-glow sm:text-5xl";

// Recovery-arc checkpoints (0..1) reported to the DISK.
const PROGRESS_HEADER = 0.12;
const PROGRESS_LOG_SPAN = 0.73; // log fills 0.12 → 0.85
const PROGRESS_WELCOME = 0.92;

// Boot phases, advanced as each stage reports completion.
const Phase = {
  Header: 0,
  Log: 1,
  Welcome: 2,
  Final: 3,
  Done: 4,
} as const;

interface BootSequenceProps {
  /** Fires once the rite is complete and the large cursor has faded out. */
  onComplete?: () => void;
  /** Reports recovery progress (0..1) for the DISK arc. */
  onProgress?: (value: number) => void;
  /** Fires when the final sentence finishes typing (the Archive stops speaking). */
  onSpeakingEnd?: () => void;
}

export default function BootSequence({
  onComplete,
  onProgress,
  onSpeakingEnd,
}: BootSequenceProps) {
  const [phase, setPhase] = useState<number>(Phase.Header);
  const bump = (next: number) => setPhase((prev) => Math.max(prev, next));

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);
  const emitProgress = (value: number) => onProgressRef.current?.(value);

  // Boot is truly done only once the large cursor has blinked out.
  useEffect(() => {
    if (phase >= Phase.Done) onCompleteRef.current?.();
  }, [phase]);

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <ArchiveLog
        lines={HEADER_LINES}
        speed={40}
        lineDelay={300}
        startDelay={600}
        className="space-y-1"
        lineClassName={HEADER_CLASS}
        onComplete={() => {
          emitProgress(PROGRESS_HEADER);
          bump(Phase.Log);
        }}
      />

      {phase >= Phase.Log && (
        <ArchiveLog
          lines={LOG_LINES}
          speed={34}
          lineDelay={300}
          startDelay={450}
          className="mt-10 space-y-1"
          lineClassName={LOG_CLASS}
          onProgress={(done, total) =>
            emitProgress(PROGRESS_HEADER + (done / total) * PROGRESS_LOG_SPAN)
          }
          onComplete={() => window.setTimeout(() => bump(Phase.Welcome), 700)}
        />
      )}

      {phase >= Phase.Welcome && (
        <GlitchText
          text="WELCOME BACK."
          cursorPersist={false}
          className={WELCOME_CLASS}
          onComplete={() => {
            emitProgress(PROGRESS_WELCOME);
            window.setTimeout(() => bump(Phase.Final), 500);
          }}
        />
      )}

      {phase >= Phase.Final && (
        <FinalReveal
          sentence={FINAL_SENTENCE}
          onSpeakingEnd={onSpeakingEnd}
          onComplete={() => bump(Phase.Done)}
        />
      )}
    </div>
  );
}

interface FinalRevealProps {
  sentence: string;
  onSpeakingEnd?: () => void;
  onComplete?: () => void;
}

/**
 * Types the closing sentence on one line, then leaves the single large boot
 * cursor blinking a few times before it fades out. The fade fires onComplete —
 * so there is never a second cursor and the handoff is exact.
 */
function FinalReveal({ sentence, onSpeakingEnd, onComplete }: FinalRevealProps) {
  const [typed, setTyped] = useState(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const onSpeakingEndRef = useRef(onSpeakingEnd);
  useEffect(() => {
    onSpeakingEndRef.current = onSpeakingEnd;
  }, [onSpeakingEnd]);

  // While typing: TypingText shows its own cursor. Once typed, we swap to the
  // static line + the large FadingCursor — so only one cursor is ever active.
  if (!typed) {
    return (
      <TypingText
        text={sentence}
        speed={60}
        startDelay={500}
        cursor
        className={FINAL_CLASS}
        onComplete={() => {
          setTyped(true);
          onSpeakingEndRef.current?.();
        }}
      />
    );
  }

  return (
    <p className={FINAL_CLASS}>
      {sentence}
      <FadingCursor onFadeEnd={() => onCompleteRef.current?.()} />
    </p>
  );
}
