import { memory001 } from "@/content/memories/001";
import { memory002 } from "@/content/memories/002";
import type { RecoveredMemory } from "@/content/memories/types";

export type { RecoveredMemory, MemoryPanel } from "@/content/memories/types";

// The archive's recovered memories, keyed by id. Add new memories here.
const MEMORIES: Record<string, RecoveredMemory> = {
  [memory001.id]: memory001,
  [memory002.id]: memory002,
};

export function getMemory(id: string): RecoveredMemory | undefined {
  return MEMORIES[id];
}

export function allMemoryIds(): string[] {
  return Object.keys(MEMORIES);
}

export function allMemories(): RecoveredMemory[] {
  return Object.values(MEMORIES);
}

/** The id of the memory recovered after `id`, or undefined if it's the last. */
export function getNextMemoryId(id: string): string | undefined {
  const ids = allMemoryIds();
  const index = ids.indexOf(id);
  if (index === -1 || index === ids.length - 1) return undefined;
  return ids[index + 1];
}
