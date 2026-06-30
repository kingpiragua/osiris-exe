import { memory001 } from "@/content/memories/001";
import type { RecoveredMemory } from "@/content/memories/types";

export type { RecoveredMemory, MemoryPanel } from "@/content/memories/types";

// The archive's recovered memories, keyed by id. Add new memories here.
const MEMORIES: Record<string, RecoveredMemory> = {
  [memory001.id]: memory001,
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
