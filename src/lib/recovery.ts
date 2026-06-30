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
