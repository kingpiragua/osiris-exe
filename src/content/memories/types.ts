/**
 * Data model for recovered memories. The engine renders these; adding a memory
 * means adding a data file, not new components.
 */

export interface MemoryPanel {
  /** Display id, e.g. "PANEL 001". */
  id: string;
  /** The line the memory speaks. */
  line: string;
  /** Optional panel artwork (path under /public). Rendered with CRT treatment. */
  image?: string;
  /** Intrinsic image dimensions, for layout without reflow. */
  imageWidth?: number;
  imageHeight?: number;
  /** Accessible description of the artwork. */
  alt?: string;
}

export interface RecoveredMemory {
  /** Stable id used in the route /archive/[id]. */
  id: string;
  title: string;
  location: string;
  /** Free text, e.g. "UNKNOWN". */
  date: string;
  status: string;
  recoveryType: string;
  /** Signal quality, 0–100. */
  signalQuality: number;
  /** Memory degradation, 0–100 — drives playback grain. */
  degradation: number;
  /** Archive note, one entry per line. */
  note: string[];
  /** Playback panels (no artwork yet — placeholder lines). */
  panels: MemoryPanel[];
}
