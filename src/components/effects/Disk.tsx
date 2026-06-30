/**
 * THE DISK — the visual signature of OSIRIS.EXE.
 *
 * Symbolic, not decorative: the "O" in OSIRIS, the author's eye (Disk Darián),
 * memory and enlightenment as a single circle. It is always a faint, breathing
 * phosphor bloom behind the interface; during boot its arc completes as a
 * recovery indicator (--disk-progress, set on the document root), and during
 * recovery (the `.recovering` class) its halo ring rises into view.
 *
 * Sits at z-0, behind all content.
 */
export default function Disk() {
  return (
    <div
      aria-hidden="true"
      className="disk pointer-events-none fixed inset-0 z-0"
    >
      <div className="disk-bloom" />
      <div className="disk-progress" />
      <div className="disk-halo" />
    </div>
  );
}
