import ArchiveTerminal from "@/components/archive/ArchiveTerminal";
import CRTScreen from "@/components/crt/CRTScreen";

export const metadata = {
  title: "OSIRIS.EXE — Archive Terminal",
};

export default function ArchivePage() {
  return (
    <CRTScreen>
      <ArchiveTerminal />
    </CRTScreen>
  );
}
