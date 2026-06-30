"use client";

import TypingText from "@/components/crt/TypingText";

/**
 * Placeholder playback state for Recovered Memory 001 — no comic artwork yet.
 * The memory simply begins to speak: the line types in slowly and holds a
 * resting cursor, as though the Archive is remembering in real time.
 */
export default function MemoryPlayback() {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <p className="crt-fade-in text-xs uppercase tracking-[0.3em] text-phosphor-dim sm:text-sm">
        [ MEMORY PLAYBACK INITIALIZED ]
      </p>

      <p
        className="crt-fade-in text-[0.7rem] uppercase tracking-[0.45em] text-phosphor-dim sm:text-sm"
        style={{ animationDelay: "500ms" }}
      >
        PANEL 001
      </p>

      <TypingText
        text="Division Street remembers before anyone speaks."
        speed={55}
        startDelay={1100}
        cursorPersist
        className="text-lg leading-relaxed tracking-wide text-phosphor text-phosphor-glow sm:text-2xl"
      />
    </div>
  );
}
