import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSIRIS.EXE — Pale Horse Protocol",
};

/**
 * The motion comic — the recovered signal, played in full. The ARCHIVE 01
 * webtoon build is a self-contained static experience served from
 * /public/motion-comic; we mount it full-screen so it takes over the frame
 * once the terminal hands off (the `comic` command).
 */
export default function ComicPage() {
  return (
    <iframe
      src="/motion-comic/index.html"
      title="OSIRIS.EXE // Pale Horse Protocol — Motion Comic"
      className="fixed inset-0 h-full w-full border-0 bg-black"
    />
  );
}
