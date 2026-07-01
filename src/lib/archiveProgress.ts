/**
 * Local progress state for the Archive Terminal — no backend.
 * SSR/private-mode safe (all access guarded).
 */

const KEY = "osiris.archive.progress";
const ARCHIVE_VERSION = "0.9";

export interface ArchiveProgress {
  highestRecovered: number;
  fragmentsSeen: string[];
  firstLaunch: string;
  archiveVersion: string;
}

function read(): ArchiveProgress | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ArchiveProgress) : null;
  } catch {
    return null;
  }
}

function write(progress: ArchiveProgress): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    /* storage unavailable — degrade silently */
  }
}

function fresh(highestRecovered: number): ArchiveProgress {
  return {
    highestRecovered,
    fragmentsSeen: [],
    firstLaunch: new Date().toISOString(),
    archiveVersion: ARCHIVE_VERSION,
  };
}

/** Read progress, or a default object if none exists yet (not persisted). */
export function getProgress(): ArchiveProgress {
  return read() ?? fresh(0);
}

/** Initialize progress on first /archive load; keep highestRecovered current. */
export function ensureProgress(highestRecovered: number): ArchiveProgress {
  const existing = read();
  if (existing) {
    if (highestRecovered > existing.highestRecovered) {
      existing.highestRecovered = highestRecovered;
      write(existing);
    }
    return existing;
  }
  const created = fresh(highestRecovered);
  write(created);
  return created;
}

/** Mark a fragment as seen (called when visiting /archive/[id]). */
export function markFragmentSeen(id: string): void {
  const progress = read() ?? fresh(0);
  if (!progress.fragmentsSeen.includes(id)) {
    progress.fragmentsSeen.push(id);
    write(progress);
  }
}
