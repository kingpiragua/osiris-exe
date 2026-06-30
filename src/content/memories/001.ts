import type { RecoveredMemory } from "@/content/memories/types";

export const memory001: RecoveredMemory = {
  id: "001",
  title: "THE ARCHIVE",
  location: "HUMBOLDT PARK / DIVISION STREET",
  date: "UNKNOWN",
  status: "RECOVERED",
  recoveryType: "VISUAL MEMORY",
  signalQuality: 87,
  degradation: 13,
  note: ["This memory was not lost.", "It was waiting."],
  effects: {
    visualMode: "phosphor",
    image: true,
    finalReveal: "none",
  },
  panels: [
    {
      id: "PANEL 001",
      line: "Division Street remembers before anyone speaks.",
      image: "/memories/001/panel-001.jpeg",
      imageWidth: 1092,
      imageHeight: 720,
      alt: "The Paseo Boricua Puerto Rican flag arching over Division Street in Humboldt Park at dusk, wet pavement reflecting the streetlights.",
    },
  ],
};
