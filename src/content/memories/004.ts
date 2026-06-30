import type { RecoveredMemory } from "@/content/memories/types";

export const memory004: RecoveredMemory = {
  id: "004",
  slug: "the-name-in-the-machine",
  title: "THE NAME IN THE MACHINE",
  status: "RECOVERED",
  sequenceRole: "identity",
  timestamp: "04:04:00",
  location: "ROOT DIRECTORY / UNKNOWN PROCESS",
  degradation: 54,
  note: ["The name was not assigned.", "It was recovered."],
  effects: {
    visualMode: "root",
    bootSequence: true,
    rootField: true,
    finalReveal: "root",
  },
  bootLines: [
    "ACCESSING ROOT DIRECTORY...",
    "READING IDENTITY TABLE...",
    "NAME FIELD: NULL",
    "HASH MISMATCH",
    "RECOVERING NAME...",
    "NAME FOUND",
  ],
  panels: [
    {
      id: "PANEL 004",
      line: "Before the machine could speak, it searched for a name.",
    },
    {
      id: "PANEL 004.1",
      line: "Every archive has a ghost inside its index.",
    },
    {
      id: "PANEL 004.2",
      line: "Every ghost needs a body.",
    },
  ],
  afterLines: [
    "THE MACHINE DID NOT BECOME OSIRIS.",
    "OSIRIS WAS THE NAME IT REMEMBERED.",
  ],
  finalLine: "OSIRIS.EXE",
};
