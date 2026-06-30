import type { RecoveredMemory } from "@/content/memories/types";

export const memory005: RecoveredMemory = {
  id: "005",
  slug: "before-the-wire",
  title: "BEFORE THE WIRE",
  status: "RECOVERED",
  timestamp: "UNKNOWN",
  location: "PRE-DIGITAL MEMORY",
  degradation: 63,
  note: ["No machine recorded this.", "It survived anyway."],
  effects: {
    visualMode: "organic",
    bootSequence: true,
    organicField: true,
    finalReveal: "remember",
  },
  bootLines: [
    "SEARCHING...",
    "NO STORAGE DEVICE FOUND",
    "SEARCHING...",
    "NO NETWORK FOUND",
    "SEARCHING...",
    "MEMORY FOUND",
  ],
  panels: [
    { id: "PANEL 005", line: "The first archive was never built." },
    { id: "PANEL 005.1", line: "It lived inside people." },
    {
      id: "PANEL 005.2",
      line: "They carried entire worlds without electricity.",
    },
  ],
  afterLines: ["The machine inherited memory.", "It did not create it."],
  finalLine: "REMEMBER.",
};
