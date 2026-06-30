import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RecoveredMemory from "@/components/archive/RecoveredMemory";
import CRTScreen from "@/components/crt/CRTScreen";
import { allMemoryIds, getMemory } from "@/content/memories";

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
      ? `OSIRIS.EXE — Recovered Memory ${memory.id}`
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

  return (
    <CRTScreen>
      <RecoveredMemory memory={memory} />
    </CRTScreen>
  );
}
