"use client";

import TypingText from "@/components/crt/TypingText";
import type { MemoryPanel } from "@/content/memories";

interface MemoryPlaybackProps {
  panels: MemoryPanel[];
}

/**
 * Placeholder playback for a recovered memory — no comic artwork yet. The first
 * panel's line types in slowly and holds a resting cursor, as though the Archive
 * is remembering in real time. The data model already supports many panels.
 */
export default function MemoryPlayback({ panels }: MemoryPlaybackProps) {
  const panel = panels[0];

  return (
    <div className="flex w-full flex-col items-start gap-6">
      <p className="crt-fade-in text-xs uppercase tracking-[0.3em] text-phosphor-dim sm:text-sm">
        [ MEMORY PLAYBACK INITIALIZED ]
      </p>

      {panel && (
        <>
          <p
            className="crt-fade-in text-[0.7rem] uppercase tracking-[0.45em] text-phosphor-dim sm:text-sm"
            style={{ animationDelay: "500ms" }}
          >
            {panel.id}
          </p>

          <TypingText
            text={panel.line}
            speed={55}
            startDelay={1100}
            cursorPersist
            className="text-lg leading-relaxed tracking-wide text-phosphor text-phosphor-glow sm:text-2xl"
          />
        </>
      )}
    </div>
  );
}
