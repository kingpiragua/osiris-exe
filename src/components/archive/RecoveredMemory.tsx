"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ArchiveRecord from "@/components/archive/ArchiveRecord";
import MemoryPlayback from "@/components/archive/MemoryPlayback";
import { useBodyClass } from "@/hooks/useBodyClass";
import { archiveSound } from "@/lib/sound";
import { markBootSeen, markMemoryRecovered } from "@/lib/recovery";
import { markFragmentSeen } from "@/lib/archiveProgress";
import type { RecoveredMemory as RecoveredMemoryData } from "@/content/memories";

type Phase = "reading" | "toBlack" | "playing";

interface RecoveredMemoryProps {
  memory: RecoveredMemoryData;
  /**
   * The next memory's id, or null when there's no unlocked next fragment —
   * i.e. this is the end of the currently playable journey.
   */
  nextId?: string | null;
}

/**
 * The recovery ritual for any recovered memory (/archive/[id]).
 *
 * The record comes online and the Archive waits; pressing Enter (or tapping, for
 * touch) fades the record into black for ~1s, a single CRT flick marks the cut,
 * and the placeholder playback is revealed. A fainter hum runs underneath so the
 * black has something to cut from. Esc returns to the archive at any time.
 */
export default function RecoveredMemory({
  memory,
  nextId = null,
}: RecoveredMemoryProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("reading");
  const [armed, setArmed] = useState(false);
  const [flash, setFlash] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Inside a recovered memory, the DISK stays awake.
  useBodyClass("recovering", true);

  // Remember the visit, and carry a fainter hum into the memory.
  useEffect(() => {
    markMemoryRecovered(memory.id);
    markFragmentSeen(memory.id);
    markBootSeen();
    archiveSound.startHum(0.022);
    return () => archiveSound.silence(0.3);
  }, [memory.id]);

  // Esc returns to the archive at any time.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push("/archive");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  // Once the record is online, Enter (or a tap) begins memory playback.
  // Locked memories have no playback — only the record and a way back.
  useEffect(() => {
    if (phase !== "reading" || !armed || memory.locked) return;

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
  }, [phase, armed, memory.locked]);

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

  // Enter (or tap) recovers the next memory: fade to black, then navigate.
  useEffect(() => {
    if (phase !== "playing" || !canAdvance || !nextId || leaving) return;

    const advance = () => {
      setLeaving(true);
      archiveSound.silence(0.3);
      window.setTimeout(() => router.push(`/archive/${nextId}`), 800);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") advance();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", advance);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", advance);
    };
  }, [phase, canAdvance, nextId, leaving, router]);

  // End of the recovery journey: when the last playable fragment finishes and
  // there's no unlocked next, the archive plays the recovered signal (the
  // motion comic) on its own after a short beat. Esc still returns first.
  useEffect(() => {
    if (phase !== "playing" || !canAdvance || nextId || leaving) return;

    const timer = window.setTimeout(() => {
      setLeaving(true);
      archiveSound.silence(0.3);
      window.setTimeout(() => router.push("/comic"), 800);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [phase, canAdvance, nextId, leaving, router]);

  // Memory degradation drives the faint playback grain.
  const grainOpacity = Math.min(0.2, memory.degradation / 100);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-start px-4 pt-[14vh] pb-24 sm:px-8 sm:pt-[16vh]">
      {phase === "playing" ? (
        <>
          <MemoryPlayback
            memory={memory}
            onComplete={() => setCanAdvance(true)}
          />
          {canAdvance && (
            <div className="crt-fade-in mt-16 space-y-2">
              {nextId ? (
                <>
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-phosphor text-phosphor-glow sm:text-xs">
                    PRESS ENTER TO RECOVER NEXT MEMORY
                  </p>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-phosphor-dim">
                    PRESS ESC TO RETURN TO ARCHIVE
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-phosphor text-phosphor-glow sm:text-xs">
                    SIGNAL RECOVERED — PLAYING
                  </p>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-phosphor-dim">
                    PRESS ESC TO RETURN TO ARCHIVE
                  </p>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <ArchiveRecord memory={memory} onReady={() => setArmed(true)} />
          {memory.locked && armed && (
            <p className="crt-fade-in mt-10 text-[0.7rem] uppercase tracking-[0.35em] text-phosphor-dim sm:text-xs">
              PRESS ESC TO RETURN TO ARCHIVE
            </p>
          )}
        </>
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

      {/* Fade to black while recovering the next memory. */}
      {leaving && (
        <div
          aria-hidden="true"
          className="archive-fadeout pointer-events-none fixed inset-0 z-50 bg-black"
        />
      )}
    </div>
  );
}
