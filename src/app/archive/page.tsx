import ArchiveIndex from "@/components/archive/ArchiveIndex";
import CRTScreen from "@/components/crt/CRTScreen";

export const metadata = {
  title: "OSIRIS.EXE — Archive",
};

export default function ArchivePage() {
  return (
    <CRTScreen>
      <ArchiveIndex />
    </CRTScreen>
  );
}
