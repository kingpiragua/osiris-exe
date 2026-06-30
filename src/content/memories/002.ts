import type { RecoveredMemory } from "@/content/memories/types";

export const memory002: RecoveredMemory = {
  id: "002",
  slug: "signal",
  title: "SIGNAL",
  status: "RECOVERED",
  timestamp: "02:47:00",
  location: "UNKNOWN / CRT SOURCE",
  degradation: 27,
  note: ["The signal did not arrive.", "It was always underneath."],
  bootLines: [
    "SIGNAL DETECTED...",
    "READING SECTOR 002...",
    "CRC MISMATCH",
    "RETRY",
    "LOCKING FREQ—",
    "ERROR",
    "LOCKING FREQUENCY...",
    "██████████████████",
    "██ SIGNAL ACQUIRED ██",
  ],
  ghostWords: [
    "SIGNAL LOST",
    "1973",
    "DIVISION",
    "OSIRIS",
    "HORUS",
    "REPEAT",
    "NO CARRIER",
    "WAKE UP",
    "MEMORY EXISTS",
  ],
  panels: [
    {
      id: "PANEL 002",
      line: "The screen speaks in a language older than electricity.",
    },
    {
      id: "PANEL 002.1",
      line: "Every dead channel is a door.",
    },
    {
      id: "PANEL 002.2",
      line: "Something behind the static remembers your name.",
    },
  ],
  afterLines: ["...", "It remembers before you do."],
  finalLine: "THE SIGNAL REMEMBERS.",
};
