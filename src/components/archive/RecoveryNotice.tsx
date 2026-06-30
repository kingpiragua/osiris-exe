interface NoticeLine {
  text: string;
  className: string;
}

// The ceremonial response to `begin`.
const LINES: NoticeLine[] = [
  {
    text: "AUTHORIZATION ACCEPTED",
    className: "text-[0.7rem] uppercase tracking-[0.4em] text-phosphor-dim sm:text-sm",
  },
  {
    text: "RECOVERED FRAGMENT AVAILABLE",
    className: "text-sm uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-base",
  },
  {
    text: "RECOVERED FRAGMENT 001",
    className: "mt-4 text-[0.7rem] uppercase tracking-[0.45em] text-phosphor-dim sm:text-sm",
  },
  {
    text: "THE ARCHIVE",
    className: "text-2xl font-bold uppercase tracking-[0.35em] text-phosphor text-phosphor-glow sm:text-4xl",
  },
  {
    text: "PRESS ENTER TO RECOVER",
    className: "mt-6 text-sm uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-base",
  },
];

/** Rendered when the visitor runs `begin`. Lines fade in, one after another. */
export default function RecoveryNotice() {
  return (
    <div className="space-y-2 py-2">
      {LINES.map((line, i) => (
        <p
          key={i}
          className={`crt-fade-in ${line.className}`}
          style={{ animationDelay: `${i * 600}ms` }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}
