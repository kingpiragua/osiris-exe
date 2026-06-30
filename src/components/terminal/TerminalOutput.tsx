import RecoveryNotice from "@/components/archive/RecoveryNotice";
import type { CommandOutput } from "@/components/terminal/CommandParser";

interface TerminalOutputProps {
  output: CommandOutput;
}

/**
 * Renders one command result. Text lines fade in, staggered, so the archive
 * feels like it is writing back slowly. `begin` renders the RecoveryNotice.
 * `clear` is handled by the Terminal and never reaches here.
 */
export default function TerminalOutput({ output }: TerminalOutputProps) {
  if (output.type === "begin") {
    return <RecoveryNotice />;
  }

  if (output.type === "lines") {
    return (
      <div className="space-y-1 py-1">
        {output.lines.map((line, i) => (
          <p
            key={i}
            className="crt-fade-in whitespace-pre-wrap break-words text-sm leading-relaxed tracking-wide text-phosphor text-phosphor-glow sm:text-base"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {line === "" ? " " : line}
          </p>
        ))}
      </div>
    );
  }

  return null;
}
