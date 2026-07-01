import { memory001 } from "@/content/memories/001";
import { memory002 } from "@/content/memories/002";
import { memory003 } from "@/content/memories/003";
import { memory004 } from "@/content/memories/004";
import { memory005 } from "@/content/memories/005";
import { memory006 } from "@/content/memories/006";
import { memory007 } from "@/content/memories/007";
import { memory008 } from "@/content/memories/008";
import { memory009 } from "@/content/memories/009";
import { memory010 } from "@/content/memories/010";
import type { RecoveredMemory } from "@/content/memories/types";

export type { RecoveredMemory, MemoryPanel } from "@/content/memories/types";

// The archive's recovered memories, keyed by id. Add new memories here.
const MEMORIES: Record<string, RecoveredMemory> = {
  [memory001.id]: memory001,
  [memory002.id]: memory002,
  [memory003.id]: memory003,
  [memory004.id]: memory004,
  [memory005.id]: memory005,
  [memory006.id]: memory006,
  [memory007.id]: memory007,
  [memory008.id]: memory008,
  [memory009.id]: memory009,
  [memory010.id]: memory010,
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
