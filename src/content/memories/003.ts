import type { RecoveredMemory } from "@/content/memories/types";

// A teaser entry: the archive knows it exists, but it has not been recovered
// yet. Replace `locked` and add bootLines/panels/etc. to author it fully.
export const memory003: RecoveredMemory = {
  id: "003",
  slug: "pale-horse",
  title: "PALE HORSE",
  status: "PENDING",
  location: "UNKNOWN",
  degradation: 71,
  locked: true,
  note: ["This memory has not surfaced.", "The frequency is still forming."],
  panels: [],
};
