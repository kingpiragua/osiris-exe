"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BootSequence from "@/components/boot/BootSequence";
import Terminal from "@/components/terminal/Terminal";
import { useBodyClass } from "@/hooks/useBodyClass";
import { archiveSound } from "@/lib/sound";
import { hasSeenBoot, markBootSeen } from "@/lib/recovery";

/**
 * Orchestrates the experience: the boot rite runs, the archive holds its breath,
 * the screen flickers, and the waiting terminal fades in. Returning visitors
 * skip the boot entirely — the archive remembers them.
 */
export default function ArchiveSession() {
  const router = useRouter();
  const [returning, setReturning] = useState<boolean | null>(null);
  const [bootDone, setBootDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [flash, setFlash] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [recovering, setRecovering] = useState(false);

  // The DISK's halo rises once a memory is found, and stays through recovery.
  useBodyClass("recovering", recovering);

  // Decide on mount whether this is a returning visitor (post-hydration, so
  // there's no SSR mismatch).
  useEffect(() => {
    const root = document.documentElement;
    const timer = setTimeout(() => {
      if (hasSeenBoot()) {
        setReturning(true);
        setReady(true);
        root.style.setProperty("--disk-progress", "1");
      } else {
        setReturning(false);
        root.style.setProperty("--disk-progress", "0");
        root.classList.remove("disk-complete");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Ambient CRT hum through the session (best-effort under autoplay).
  useEffect(() => {
    archiveSound.startHum();
    return () => archiveSound.silence(0.2);
  }, []);

  // Tab title shifts from "Recovering Memory" (boot) to "Archive Ready".
  useEffect(() => {
    if (ready) document.title = "OSIRIS.EXE — Archive Ready";
  }, [ready]);

  const handleProgress = (value: number) => {
    document.documentElement.style.setProperty(
      "--disk-progress",
      value.toFixed(3),
    );
  };

  // Boot done = the large cursor has faded. Complete the DISK (pulse once),
  // remember the visitor, then after a brief pause flicker + reveal the prompt.
  const handleBootComplete = () => {
    const root = document.documentElement;
    root.style.setProperty("--disk-progress", "1");
    root.classList.add("disk-complete");
    markBootSeen();
    setBootDone(true);
  };

  useEffect(() => {
    if (!bootDone) return;

    let flashTimer: ReturnType<typeof setTimeout>;
    const handover = setTimeout(() => {
      setReady(true);
      setFlash(true);
      archiveSound.flick(); // the prompt comes alive after the silence
      flashTimer = setTimeout(() => setFlash(false), 800);
    }, 1000);

    return () => {
      clearTimeout(handover);
      clearTimeout(flashTimer);
    };
  }, [bootDone]);

  // Recovery confirmed: fade the screen out, then enter the archive.
  const handleRecover = () => {
    setLeaving(true);
    setTimeout(() => router.push("/archive/001"), 800);
  };

  // Wait until we know whether to boot — avoids a flash of boot for returners.
  if (returning === null) return null;

  return (
    <div className="mx-auto w-full max-w-xl px-4 sm:px-8">
      {/* Boot rite (first-time visitors only) — eases up when the prompt arrives. */}
      {!returning && (
        <div
          className={`flex flex-col items-start transition-[padding] duration-1000 ease-out ${
            ready
              ? "pt-[8vh] pb-8 sm:pt-[10vh]"
              : "min-h-screen pt-[16vh] pb-16 sm:pt-[20vh]"
          }`}
        >
          <BootSequence
            onComplete={handleBootComplete}
            onProgress={handleProgress}
            onSpeakingEnd={() => archiveSound.silence(0.5)}
          />
        </div>
      )}

      {/* The archive, waiting. */}
      {ready && (
        <div
          className={`crt-fade-in pb-[22vh] ${returning ? "pt-[16vh] sm:pt-[18vh]" : ""}`}
        >
          {returning && (
            <p className="mb-10 lowercase tracking-[0.3em] text-phosphor-dim text-xs sm:text-sm">
              the archive remembers you.
            </p>
          )}
          <Terminal onArm={() => setRecovering(true)} onRecover={handleRecover} />
        </div>
      )}

      {/* Subtle one-shot handover flicker. */}
      {flash && (
        <div
          aria-hidden="true"
          className="crt-transition-flash pointer-events-none fixed inset-0 z-40 bg-black"
        />
      )}

      {/* Fade to black as we enter the recovered memory. */}
      {leaving && (
        <div
          aria-hidden="true"
          className="archive-fadeout pointer-events-none fixed inset-0 z-50 bg-black"
        />
      )}
    </div>
  );
}
