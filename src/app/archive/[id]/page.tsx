import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RecoveredMemory from "@/components/archive/RecoveredMemory";
import CRTScreen from "@/components/crt/CRTScreen";
import { allMemoryIds, getMemory, getNextMemoryId } from "@/content/memories";

export function generateStaticParams() {
  return allMemoryIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const memory = getMemory(id);
  return {
    title: memory
      ? `OSIRIS.EXE — Recovered Fragment ${memory.id}`
      : "OSIRIS.EXE — Archive",
  };
}

export default async function MemoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const memory = getMemory(id);
  if (!memory) notFound();

  // Only offer "recover next" when the next fragment is unlocked. When there's
  // no unlocked next, this is the end of the playable journey — the signal plays.
  const candidate = getNextMemoryId(id);
  const next = candidate ? getMemory(candidate) : undefined;
  const nextId = next && !next.locked ? next.id : null;

  return (
    <CRTScreen>
      <RecoveredMemory memory={memory} nextId={nextId} />
    </CRTScreen>
  );
}
