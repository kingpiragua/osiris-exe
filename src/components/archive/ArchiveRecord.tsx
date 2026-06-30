"use client";

import { useState } from "react";

import SignalQuality from "@/components/archive/SignalQuality";
import TypingText from "@/components/crt/TypingText";

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

// The recovered memory's record, typed in line by line.
const BLOCKS: Block[] = [
  {
    kind: "text",
    text: "RECOVERED MEMORY 001",
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
    text: "THE GESTURE",
    className:
      "text-2xl font-bold uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-4xl",
    speed: 70,
  },
  { kind: "text", text: "LOCATION:", className: LABEL, speed: 26 },
  {
    kind: "text",
    text: "HUMBOLDT PARK / DIVISION STREET",
    className: `${VALUE} break-words`,
    speed: 22,
  },
  { kind: "text", text: "DATE:", className: LABEL, speed: 26 },
  { kind: "text", text: "UNKNOWN", className: VALUE, speed: 32 },
  { kind: "text", text: "STATUS:", className: LABEL, speed: 26 },
  { kind: "text", text: "RECOVERED", className: VALUE, speed: 32 },
  { kind: "text", text: "SIGNAL QUALITY:", className: LABEL, speed: 26 },
  { kind: "signal", value: 87, className: `${VALUE} text-phosphor text-phosphor-glow` },
  { kind: "text", text: "MEMORY DEGRADATION:", className: LABEL, speed: 26 },
  { kind: "text", text: "13%", className: VALUE, speed: 32 },
  { kind: "text", text: "RECOVERY TYPE:", className: LABEL, speed: 26 },
  { kind: "text", text: "VISUAL MEMORY", className: VALUE, speed: 26 },
  { kind: "text", text: "ARCHIVE NOTE:", className: LABEL, speed: 26 },
  { kind: "text", text: "This memory was not lost.", className: `mt-2 ${NOTE}`, speed: 45 },
  { kind: "text", text: "It was waiting.", className: NOTE, speed: 45 },
  {
    kind: "text",
    text: "PRESS ENTER TO BEGIN MEMORY PLAYBACK",
    className:
      "mt-10 text-sm uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-base",
    speed: 34,
    cursorPersist: true,
  },
];

interface ArchiveRecordProps {
  /** Fires once the whole record (through the prompt) has finished typing. */
  onReady?: () => void;
}

/** Types the Recovered Memory 001 record, block by block. */
export default function ArchiveRecord({ onReady }: ArchiveRecordProps) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex w-full flex-col items-start gap-1">
      {BLOCKS.map((block, i) => {
        if (i > index) return null;

        const advance = () => {
          if (i < BLOCKS.length - 1) setIndex((prev) => Math.max(prev, i + 1));
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
