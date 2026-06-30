/**
 * Command system for the OSIRIS archive terminal.
 *
 * Pure logic, no React. v0.4 is intentionally a single journey: help, begin,
 * clear. Adding a command later is a one-line edit to COMMANDS.
 */

export type CommandOutput =
  | { type: "lines"; lines: string[] }
  | { type: "begin" }
  | { type: "clear" };

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

  const command = COMMAND_MAP.get(name);
  if (command) return command.run();

  return { type: "lines", lines: ["UNKNOWN COMMAND", 'TYPE "help"'] };
}
