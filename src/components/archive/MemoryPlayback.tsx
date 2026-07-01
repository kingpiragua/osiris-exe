"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import EyeField from "@/components/effects/EyeField";
import GhostLayer from "@/components/effects/GhostLayer";
import RingsField from "@/components/effects/RingsField";
import RootField from "@/components/effects/RootField";
import TypingText from "@/components/crt/TypingText";
import type { MemoryPanel, RecoveredMemory } from "@/content/memories";

interface MemoryPlaybackProps {
  memory: RecoveredMemory;
  /** Fires once the final step has finished. */
  onComplete?: () => void;
}

type Step =
  | { kind: "boot"; text: string }
  | { kind: "panel"; panel: MemoryPanel }
  | { kind: "static" }
  | { kind: "after"; text: string; first: boolean }
  | { kind: "final"; text: string };

function buildSteps(memory: RecoveredMemory): Step[] {
  const fx = memory.effects ?? {};
  const steps: Step[] = [];

  if (fx.bootSequence) {
    (memory.bootLines ?? []).forEach((text) => steps.push({ kind: "boot", text }));
  }

  memory.panels.forEach((panel, i) => {
    if (fx.corruption && i > 0) steps.push({ kind: "static" });
    steps.push({ kind: "panel", panel });
  });

  (memory.afterLines ?? []).forEach((text, i) =>
    steps.push({ kind: "after", text, first: i === 0 }),
  );

  if (memory.finalLine && fx.finalReveal !== "none") {
    steps.push({ kind: "final", text: memory.finalLine });
  }

  return steps;
}

// Final-reveal class per effects.finalReveal.
function finalRevealClass(reveal: string | undefined): string {
  switch (reveal) {
    case "osiris":
      return "memory-eye-final mt-6 font-bold uppercase text-phosphor";
    case "root":
      return "memory-root-final mt-6 font-bold uppercase text-phosphor";
    case "remember":
      return "memory-remember-final mt-8 self-center text-center font-bold uppercase text-phosphor";
    default:
      return "memory-final-quiet mt-8 self-center text-center font-bold uppercase text-phosphor";
  }
}

// Quick corruption flash shown between panels.
const CORRUPTION_LINES = [
  "▓▒░▓▒░▓▒░▓▒░",
  "000101010101",
  "NO CARRIER",
  "HORUS",
  "1973",
];

/**
 * Plays a recovered memory as an ordered sequence of steps. A plain memory is
 * just its panels (one image panel for 001, or several text panels). A SIGNAL
 * memory (002) gains boot/recovery lines, static dividers between panels, an
 * after-beat, and a slow bright final reveal — plus drifting burn-in words.
 * All derived from data; Memory 001's path is unchanged.
 */
export default function MemoryPlayback({ memory, onComplete }: MemoryPlaybackProps) {
  const fx = memory.effects ?? {};
  // On the GitHub Pages subpath build, next/image doesn't prefix client-side
  // image src with basePath, so panel art 404s. Prepend it ourselves (empty in
  // dev, "/osiris-exe" in the Pages build).
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const steps = useMemo(() => buildSteps(memory), [memory]);
  const [index, setIndex] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Corruption flashes carry no typed text, so advance them on a fast timer.
  useEffect(() => {
    if (steps[index]?.kind !== "static") return;
    const timer = setTimeout(() => {
      if (index < steps.length - 1) setIndex((prev) => Math.max(prev, index + 1));
      else onCompleteRef.current?.();
    }, 220);
    return () => clearTimeout(timer);
  }, [index, steps]);

  const advance = (i: number) => {
    if (i < steps.length - 1) setIndex((prev) => Math.max(prev, i + 1));
    else onCompleteRef.current?.();
  };

  return (
    <div className="relative w-full">
      {fx.ghostWords && memory.ghostWords && (
        <GhostLayer words={memory.ghostWords} />
      )}
      {fx.eyeField && <EyeField />}
      {fx.rootField && <RootField />}
      {fx.organicField && <RingsField />}

      <div className="relative z-10 flex w-full flex-col items-start gap-7">
        <p className="crt-fade-in text-xs uppercase tracking-[0.3em] text-phosphor-dim sm:text-sm">
          [ MEMORY PLAYBACK INITIALIZED ]
        </p>

        {steps.map((step, i) => {
          if (i > index) return null;
          const isLast = i === steps.length - 1;

          if (step.kind === "static") {
            // Only present while active — a fast flash, then it's gone.
            if (i !== index) return null;
            return (
              <div
                key={i}
                aria-hidden="true"
                className="signal-corruption whitespace-pre leading-tight"
              >
                {CORRUPTION_LINES.map((line, k) => (
                  <span key={k} className="block">
                    {line}
                  </span>
                ))}
              </div>
            );
          }

          if (step.kind === "boot") {
            return (
              <TypingText
                key={i}
                text={step.text}
                speed={30}
                startDelay={400}
                cursor={i === index}
                className="whitespace-pre text-xs uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-sm"
                onComplete={() => advance(i)}
              />
            );
          }

          if (step.kind === "after") {
            return (
              <TypingText
                key={i}
                text={step.text}
                speed={60}
                startDelay={step.first ? 2200 : 600}
                cursor={i === index}
                className="text-base tracking-wide text-phosphor text-phosphor-glow sm:text-lg"
                onComplete={() => advance(i)}
              />
            );
          }

          if (step.kind === "final") {
            return (
              <TypingText
                key={i}
                text={step.text}
                speed={150}
                startDelay={1500}
                cursor={i === index}
                cursorPersist={isLast}
                className={finalRevealClass(fx.finalReveal)}
                onComplete={() => advance(i)}
              />
            );
          }

          // panel
          const { panel } = step;
          const lineDelay = panel.image ? 3600 : 500;

          return (
            // Panel id (panel.id) is kept in data but intentionally not
            // rendered — keeps recovered fragments cinematic.
            <div key={i} className="flex w-full flex-col items-start gap-6">
              {panel.image && (
                <div className="flex w-full justify-center">
                  <figure
                    className="crt-fade-in memory-boot-glitch relative w-[92vw] max-w-5xl overflow-hidden border border-phosphor-dim/30 bg-black"
                    style={{ animationDelay: "500ms" }}
                  >
                    <Image
                      src={`${basePath}${panel.image}`}
                      alt={panel.alt ?? ""}
                      width={panel.imageWidth ?? 1092}
                      height={panel.imageHeight ?? 720}
                      className="memory-image block h-auto w-full"
                    />
                    <span
                      aria-hidden="true"
                      className="memory-static pointer-events-none absolute inset-0"
                    />
                    <span
                      aria-hidden="true"
                      className="memory-glitch-bars pointer-events-none absolute inset-0"
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
                </div>
              )}

              <TypingText
                text={panel.line}
                speed={55}
                startDelay={lineDelay}
                cursor={i === index}
                cursorPersist={isLast}
                className="text-lg leading-relaxed tracking-wide text-phosphor text-phosphor-glow sm:text-2xl"
                onComplete={() => advance(i)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
