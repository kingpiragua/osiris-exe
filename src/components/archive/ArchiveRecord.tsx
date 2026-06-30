"use client";

import { useMemo, useState } from "react";

import SignalQuality from "@/components/archive/SignalQuality";
import TypingText from "@/components/crt/TypingText";
import type { RecoveredMemory } from "@/content/memories";

type Block =
  | {
      kind: "text";
      text: string;
      className: string;
      speed: number;
      cursorPersist?: boolean;
    }
  | { kind: "signal"; value: number; className: string };

const LABEL =
  "mt-6 text-[0.65rem] uppercase tracking-[0.3em] text-phosphor-dim sm:text-xs";
const VALUE = "text-sm uppercase tracking-wide text-phosphor sm:text-base";
const NOTE = "text-base tracking-wide text-phosphor text-phosphor-glow sm:text-lg";

// The record's layout is fixed (part of the OSIRIS visual language); the values
// come from the memory's data, and fields render only when present.
function buildBlocks(memory: RecoveredMemory): Block[] {
  const label = (text: string): Block => ({
    kind: "text",
    text,
    className: LABEL,
    speed: 26,
  });
  const value = (text: string, extra = ""): Block => ({
    kind: "text",
    text,
    className: `${VALUE} ${extra}`.trim(),
    speed: 30,
  });

  const blocks: Block[] = [
    {
      kind: "text",
      text: `RECOVERED FRAGMENT ${memory.id}`,
      className: "text-[0.7rem] uppercase tracking-[0.5em] text-phosphor-dim sm:text-sm",
      speed: 50,
    },
    {
      kind: "text",
      text: "TITLE:",
      className: "mt-8 text-[0.65rem] uppercase tracking-[0.3em] text-phosphor-dim sm:text-xs",
      speed: 26,
    },
    {
      kind: "text",
      text: memory.title,
      className:
        "text-2xl font-bold uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-4xl",
      speed: 70,
    },
  ];

  if (memory.location) {
    blocks.push(label("LOCATION:"), value(memory.location, "break-words"));
  }
  if (memory.timestamp) {
    blocks.push(label("TIMESTAMP:"), value(memory.timestamp));
  } else if (memory.date) {
    blocks.push(label("DATE:"), value(memory.date));
  }

  blocks.push(label("STATUS:"), value(memory.status));

  if (typeof memory.signalQuality === "number") {
    blocks.push(label("SIGNAL QUALITY:"), {
      kind: "signal",
      value: memory.signalQuality,
      className: `${VALUE} text-phosphor text-phosphor-glow`,
    });
  }

  blocks.push(label("MEMORY DEGRADATION:"), value(`${memory.degradation}%`));

  if (memory.recoveryType) {
    blocks.push(label("RECOVERY TYPE:"), value(memory.recoveryType));
  }

  blocks.push(label("ARCHIVE NOTE:"));
  memory.note.forEach((line, i) => {
    blocks.push({
      kind: "text",
      text: line,
      className: i === 0 ? `mt-2 ${NOTE}` : NOTE,
      speed: 45,
    });
  });

  blocks.push({
    kind: "text",
    text: memory.locked
      ? "RECOVERY PENDING — SIGNAL NOT YET FORMED"
      : "PRESS ENTER TO BEGIN MEMORY PLAYBACK",
    className: memory.locked
      ? "mt-10 text-sm uppercase tracking-[0.3em] text-phosphor-dim sm:text-base"
      : "mt-10 text-sm uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-base",
    speed: 34,
    cursorPersist: true,
  });

  return blocks;
}

interface ArchiveRecordProps {
  memory: RecoveredMemory;
  /** Fires once the whole record (through the prompt) has finished typing. */
  onReady?: () => void;
}

/** Types a recovered memory's record, block by block. */
export default function ArchiveRecord({ memory, onReady }: ArchiveRecordProps) {
  const blocks = useMemo(() => buildBlocks(memory), [memory]);
  const [index, setIndex] = useState(0);

  return (
    <div className="flex w-full flex-col items-start gap-1">
      {blocks.map((block, i) => {
        if (i > index) return null;

        const advance = () => {
          if (i < blocks.length - 1) setIndex((prev) => Math.max(prev, i + 1));
          else onReady?.();
        };

        if (block.kind === "signal") {
          return (
            <SignalQuality
              key={i}
              value={block.value}
              className={block.className}
              onComplete={advance}
            />
          );
        }

        return (
          <TypingText
            key={i}
            text={block.text}
            speed={block.speed}
            startDelay={i === 0 ? 500 : 240}
            cursor={i === index}
            cursorPersist={block.cursorPersist}
            className={block.className}
            onComplete={advance}
          />
        );
      })}
    </div>
  );
}
