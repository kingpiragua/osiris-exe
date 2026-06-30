/**
 * Local persistence for the recovery state — no backend.
 *
 * Returning visitors skip the long boot (the archive remembers them), and
 * recovered memories are remembered so the world can acknowledge them later.
 * All access is guarded for SSR and private-mode storage failures.
 */

const BOOT_SEEN = "osiris.boot.seen";
const memoryKey = (id: string) => `osiris.memory.${id}`;

function read(key: string): boolean {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function write(key: string): void {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(key, "1");
  } catch {
    /* storage unavailable — degrade silently */
  }
}

export const hasSeenBoot = () => read(BOOT_SEEN);
export const markBootSeen = () => write(BOOT_SEEN);

export const hasRecoveredMemory = (id: string) => read(memoryKey(id));
export const markMemoryRecovered = (id: string) => write(memoryKey(id));

/** Purge all recovery state so the experience starts from the beginning. */
export function clearRecovery(): void {
  try {
    if (typeof window === "undefined") return;
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith("osiris."))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    /* storage unavailable — degrade silently */
  }
}
