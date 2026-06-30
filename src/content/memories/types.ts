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
  /** Optional human-readable slug. */
  slug?: string;
  title: string;
  /** Free text, e.g. "HUMBOLDT PARK / DIVISION STREET". */
  location?: string;
  /** Free text, e.g. "UNKNOWN". */
  date?: string;
  /** Free text, e.g. "02:47:00". Shown as TIMESTAMP when present. */
  timestamp?: string;
  status: string;
  /** When true, the memory exists but cannot be played back yet (a teaser). */
  locked?: boolean;
  recoveryType?: string;
  /** Signal quality, 0–100. Renders the SIGNAL QUALITY meter when present. */
  signalQuality?: number;
  /** Memory degradation, 0–100 — drives playback grain. */
  degradation: number;
  /** Archive note, one entry per line. */
  note: string[];
  /** Playback panels (artwork optional — placeholder lines otherwise). */
  panels: MemoryPanel[];

  // --- Optional playback content ------------------------------------------
  /** Boot/recovery lines typed before the panels (e.g. "SIGNAL DETECTED..."). */
  bootLines?: string[];
  /** Faint burn-in words drifting behind the playback (the SIGNAL ghost field). */
  ghostWords?: string[];
  /** Lines typed after the last panel, before the final reveal. */
  afterLines?: string[];
  /** The final reveal line — rendered per `effects.finalReveal`. */
  finalLine?: string;

  /** Declares which playback capabilities this fragment composes. */
  effects?: MemoryEffects;
}

export interface MemoryEffects {
  /** Descriptive base mode (informational / future palette hooks). */
  visualMode?:
    | "terminal"
    | "phosphor"
    | "signal"
    | "eye"
    | "root"
    | "organic"
    | "glyph"
    | "dream";
  /** Type the bootLines before the panels. */
  bootSequence?: boolean;
  /** Corruption flashes between panels. */
  corruption?: boolean;
  /** Whether this fragment carries panel artwork (data flag; rendering keys off panel.image). */
  image?: boolean;
  /** Render the SIGNAL ghost burn-in field. */
  ghostWords?: boolean;
  /** Render the eye field. */
  eyeField?: boolean;
  /** Render the root/code field. */
  rootField?: boolean;
  /** Render the organic rings field. */
  organicField?: boolean;
  /** Final reveal treatment. "none" hides the finalLine entirely. */
  finalReveal?: "none" | "standard" | "osiris" | "root" | "remember";
  /** Future: ambient audio (not implemented yet). */
  ambientAudio?: boolean;
}
