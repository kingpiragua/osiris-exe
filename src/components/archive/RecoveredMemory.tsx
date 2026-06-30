"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ArchiveRecord from "@/components/archive/ArchiveRecord";
import MemoryPlayback from "@/components/archive/MemoryPlayback";
import { useBodyClass } from "@/hooks/useBodyClass";
import { archiveSound } from "@/lib/sound";
import { markBootSeen, markMemoryRecovered } from "@/lib/recovery";
import type { RecoveredMemory as RecoveredMemoryData } from "@/content/memories";

type Phase = "reading" | "toBlack" | "playing";

interface RecoveredMemoryProps {
  memory: RecoveredMemoryData;
}

/**
 * The recovery ritual for any recovered memory (/archive/[id]).
 *
 * The record comes online and the Archive waits; pressing Enter (or tapping, for
 * touch) fades the record into black for ~1s, a single CRT flick marks the cut,
 * and the placeholder playback is revealed. A fainter hum runs underneath so the
 * black has something to cut from. Esc returns to the archive at any time.
 */
export default function RecoveredMemory({ memory }: RecoveredMemoryProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("reading");
  const [armed, setArmed] = useState(false);
  const [flash, setFlash] = useState(false);

  // Inside a recovered memory, the DISK stays awake.
  useBodyClass("recovering", true);

  // Remember the visit, and carry a fainter hum into the memory.
  useEffect(() => {
    markMemoryRecovered(memory.id);
    markBootSeen();
    archiveSound.startHum(0.022);
    return () => archiveSound.silence(0.3);
  }, [memory.id]);

  // Esc returns to the archive at any time.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  // Once the record is online, Enter (or a tap) begins memory playback.
  useEffect(() => {
    if (phase !== "reading" || !armed) return;

    const begin = () => setPhase("toBlack");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") begin();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", begin);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", begin);
    };
  }, [phase, armed]);

  // Cut the hum to silence, hold on black ~1s, then flick + reveal playback.
  useEffect(() => {
    if (phase !== "toBlack") return;
    archiveSound.silence(0.4);
    const timer = setTimeout(() => {
      setPhase("playing");
      setFlash(true);
      archiveSound.flick();
    }, 1700);
    return () => clearTimeout(timer);
  }, [phase]);

  // Clear the one-shot CRT flick.
  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(false), 700);
    return () => clearTimeout(timer);
  }, [flash]);

  // Memory degradation drives the faint playback grain.
  const grainOpacity = Math.min(0.2, memory.degradation / 100);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-start px-4 pt-[14vh] pb-24 sm:px-8 sm:pt-[16vh]">
      {phase === "playing" ? (
        <>
          <MemoryPlayback panels={memory.panels} />
          <p
            className="crt-fade-in mt-16 text-[0.7rem] uppercase tracking-[0.35em] text-phosphor-dim sm:text-xs"
            style={{ animationDelay: "1800ms" }}
          >
            PRESS ESC TO RETURN TO ARCHIVE
          </p>
        </>
      ) : (
        <ArchiveRecord memory={memory} onReady={() => setArmed(true)} />
      )}

      {/* Memory degradation as faint texture during playback. */}
      {phase === "playing" && (
        <div
          aria-hidden="true"
          className="memory-grain pointer-events-none fixed inset-0 z-30"
          style={{ opacity: grainOpacity }}
        />
      )}

      {/* Cut to black — fades in, holds, fades out to reveal the memory. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-40 bg-black transition-opacity duration-700 ease-in-out ${
          phase === "toBlack" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* A single subtle CRT flick at the cut. */}
      {flash && (
        <div
          aria-hidden="true"
          className="crt-transition-flash pointer-events-none fixed inset-0 z-50 bg-black"
        />
      )}
    </div>
  );
}
