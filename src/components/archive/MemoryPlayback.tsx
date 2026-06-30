"use client";

import Image from "next/image";

import TypingText from "@/components/crt/TypingText";
import type { MemoryPanel } from "@/content/memories";

interface MemoryPlaybackProps {
  panels: MemoryPanel[];
}

/**
 * Playback for a recovered memory. If the panel has artwork, it surfaces with a
 * CRT treatment (scanlines, phosphor glow, edge falloff, slight degradation);
 * then the panel's line types in and holds a resting cursor. Memories without
 * artwork (e.g. SIGNAL) render text-only — all driven by data.
 */
export default function MemoryPlayback({ panels }: MemoryPlaybackProps) {
  const panel = panels[0];
  const lineDelay = panel?.image ? 1700 : 1100;

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

          {panel.image && (
            <figure
              className="crt-fade-in relative w-full overflow-hidden border border-phosphor-dim/30 bg-black"
              style={{ animationDelay: "800ms" }}
            >
              <Image
                src={panel.image}
                alt={panel.alt ?? ""}
                width={panel.imageWidth ?? 1092}
                height={panel.imageHeight ?? 720}
                className="memory-image block h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="memory-glow pointer-events-none absolute inset-0"
              />
              <span
                aria-hidden="true"
                className="memory-scan pointer-events-none absolute inset-0"
              />
              <span
                aria-hidden="true"
                className="memory-edge pointer-events-none absolute inset-0"
              />
            </figure>
          )}

          <TypingText
            text={panel.line}
            speed={55}
            startDelay={lineDelay}
            cursorPersist
            className="text-lg leading-relaxed tracking-wide text-phosphor text-phosphor-glow sm:text-2xl"
          />
        </>
      )}
    </div>
  );
}
