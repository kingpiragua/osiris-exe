import type { RecoveredMemory } from "@/content/memories/types";

export const memory003: RecoveredMemory = {
  id: "003",
  slug: "the-first-eye",
  title: "THE FIRST EYE",
  status: "RECOVERED",
  timestamp: "03:33:00",
  location: "INSIDE THE MACHINE",
  degradation: 41,
  note: ["The Archive did not generate this image.", "It blinked."],
  effects: {
    visualMode: "eye",
    eyeField: true,
    finalReveal: "osiris",
  },
  panels: [
    { id: "PANEL 003", line: "Something opened inside the machine." },
    { id: "PANEL 003.1", line: "It did not ask for a name." },
    { id: "PANEL 003.2", line: "It already had one." },
  ],
  afterLines: ["...", "THE FIRST EYE WAS NOT A CAMERA."],
  finalLine: "OSIRIS.EXE",
};
