import type { Metadata } from "next";

import ArchiveSession from "@/components/ArchiveSession";
import CRTScreen from "@/components/crt/CRTScreen";

export const metadata: Metadata = {
  title: "OSIRIS.EXE — Recovering Memory",
};

export default function Home() {
  return (
    <CRTScreen>
      <ArchiveSession />
    </CRTScreen>
  );
}
