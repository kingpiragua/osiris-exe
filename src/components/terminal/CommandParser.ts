/**
 * Command system for the OSIRIS archive terminal.
 *
 * Pure logic, no React. v0.4 is intentionally a single journey: help, begin,
 * clear. Adding a command later is a one-line edit to COMMANDS.
 */

export type CommandOutput =
  | { type: "lines"; lines: string[] }
  | { type: "begin" }
  | { type: "clear" }
  | { type: "reset" }
  | { type: "navigate"; href: string };

interface CommandSpec {
  name: string;
  description: string;
  run: () => CommandOutput;
}

function helpOutput(): CommandOutput {
  const lines: string[] = ["OSIRIS.EXE", "", "AVAILABLE COMMANDS", ""];
  COMMANDS.forEach((command, i) => {
    lines.push(command.name, command.description);
    if (i < COMMANDS.length - 1) lines.push("");
  });
  return { type: "lines", lines };
}

// Ordered registry — also the order shown by `help`.
export const COMMANDS: CommandSpec[] = [
  {
    name: "begin",
    description: "Start Archive Recovery",
    run: () => ({ type: "begin" }),
  },
  {
    name: "archive",
    description: "Open the archive index",
    run: () => ({ type: "navigate", href: "/archive" }),
  },
  {
    name: "comic",
    description: "Play the recovered signal (motion comic)",
    run: () => ({ type: "navigate", href: "/comic" }),
  },
  {
    name: "help",
    description: "Show available commands",
    run: () => helpOutput(),
  },
  {
    name: "clear",
    description: "Clear terminal",
    run: () => ({ type: "clear" }),
  },
];

const COMMAND_MAP = new Map(COMMANDS.map((command) => [command.name, command]));

/**
 * Parses a raw input line. Returns null for empty input (nothing happens),
 * otherwise a CommandOutput the terminal can render or act on.
 */
export function parseCommand(raw: string): CommandOutput | null {
  const name = raw.trim().toLowerCase();
  if (!name) return null;

  // Hidden dev command: purge recovery state and reboot. Intentionally not in
  // COMMANDS, so `help` never lists it.
  if (name === "reset") return { type: "reset" };

  const command = COMMAND_MAP.get(name);
  if (command) return command.run();

  return { type: "lines", lines: ["UNKNOWN COMMAND", 'TYPE "help"'] };
}
