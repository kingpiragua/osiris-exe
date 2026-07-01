"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import TerminalInput from "@/components/terminal/TerminalInput";
import { allMemories } from "@/content/memories";
import {
  ensureProgress,
  getProgress,
} from "@/lib/archiveProgress";

const ACT = { title: "ACT I — RECOVERY", subtitle: "The Archive wakes up." };

export default function ArchiveTerminal() {
  const router = useRouter();
  const fragments = allMemories();
  const recovered = fragments.filter((f) => !f.locked);

  const [seen, setSeen] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Initialize / load progress on mount (client only — avoids SSR mismatch).
  useEffect(() => {
    const highest = recovered.reduce((max, f) => Math.max(max, Number(f.id)), 0);
    ensureProgress(highest);
    const seenNow = getProgress().fragmentsSeen;
    const timer = window.setTimeout(() => setSeen(seenNow), 0);
    return () => window.clearTimeout(timer);
    // recovered is derived from static data; run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    inputRef.current?.focus();
  }, [output]);

  // Stats.
  const avgDegradation = recovered.length
    ? recovered.reduce((sum, f) => sum + f.degradation, 0) / recovered.length
    : 0;
  const integrity = Math.round(100 - avgDegradation);
  const signal =
    integrity >= 60 ? "STABLE" : integrity >= 35 ? "DEGRADED" : "FAINT";

  // Continue target: first recovered not seen, else the latest recovered.
  const continueTarget =
    recovered.find((f) => !seen.includes(f.id)) ??
    recovered[recovered.length - 1];

  const print = (...lines: string[]) =>
    setOutput((prev) => [...prev, ...lines]);

  const openFragment = (id: string) => {
    const fragment = fragments.find((f) => f.id === id);
    if (!fragment) {
      print(`UNKNOWN FRAGMENT ${id}`);
      return;
    }
    if (fragment.locked) {
      print("FRAGMENT LOCKED — RECOVERY INCOMPLETE");
      return;
    }
    router.push(`/archive/${id}`);
  };

  const handleSubmit = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    print(`> ${input}`);

    const [command, arg] = input.toLowerCase().split(/\s+/);

    switch (command) {
      case "help":
        print(
          "AVAILABLE COMMANDS",
          "open NNN   — recover a fragment",
          "continue   — resume recovery",
          "clear      — clear terminal output",
        );
        break;
      case "clear":
        setOutput([]);
        break;
      case "continue":
        if (continueTarget) openFragment(continueTarget.id);
        else print("NO FRAGMENTS AVAILABLE");
        break;
      case "open":
        if (!arg) print("USAGE: OPEN NNN");
        else openFragment(arg.padStart(3, "0"));
        break;
      default:
        print("UNKNOWN COMMAND", "TYPE HELP");
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-2xl px-4 pt-[10vh] pb-24 sm:px-8 sm:pt-[12vh] font-mono text-phosphor"
      onClick={() => inputRef.current?.focus()}
    >
      <p className="text-[0.7rem] uppercase tracking-[0.5em] text-phosphor-dim sm:text-sm">
        OSIRIS.EXE
      </p>
      <h1 className="text-xl font-bold uppercase tracking-[0.3em] text-phosphor-glow sm:text-3xl">
        ARCHIVE TERMINAL
      </h1>

      <div className="mt-6 space-y-1 text-xs tracking-wide text-phosphor-dim sm:text-sm">
        <p>
          Recovered Fragments:{" "}
          <span className="text-phosphor">{recovered.length}</span>
        </p>
        <p>
          Integrity: <span className="text-phosphor">{integrity}%</span>
        </p>
        <p>
          Signal Strength: <span className="text-phosphor">{signal}</span>
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm uppercase tracking-[0.35em] text-phosphor text-phosphor-glow sm:text-base">
          {ACT.title}
        </p>
        <p className="mt-1 text-xs tracking-wide text-phosphor-dim sm:text-sm">
          {ACT.subtitle}
        </p>
      </div>

      <ul className="mt-6 text-sm sm:text-base">
        {fragments.map((fragment) => {
          const isContinue =
            !fragment.locked && continueTarget?.id === fragment.id;
          const marker = isContinue ? ">" : " ";
          const tag = fragment.locked
            ? " [LOCKED]"
            : seen.includes(fragment.id)
              ? " [SEEN]"
              : "";
          const label = `${marker} ${fragment.id} ${fragment.title}${tag}`;

          if (fragment.locked) {
            return (
              <li
                key={fragment.id}
                className="cursor-not-allowed whitespace-pre py-0.5 text-phosphor-dim/40"
              >
                {label}
              </li>
            );
          }

          return (
            <li key={fragment.id}>
              <Link
                href={`/archive/${fragment.id}`}
                className="block whitespace-pre py-0.5 text-phosphor text-phosphor-glow transition-colors hover:bg-phosphor/[0.06]"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 space-y-1 text-[0.7rem] uppercase tracking-[0.3em] text-phosphor-dim sm:text-xs">
        <p>TYPE HELP</p>
        <p>TYPE OPEN 001</p>
        <p>TYPE CONTINUE</p>
      </div>

      {output.length > 0 && (
        <div className="mt-8 space-y-1 text-sm tracking-wide text-phosphor sm:text-base">
          {output.map((line, i) => (
            <p key={i} className="whitespace-pre-wrap break-words">
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="mt-6">
        <TerminalInput inputRef={inputRef} onSubmit={handleSubmit} />
      </div>
      <div ref={endRef} />
    </div>
  );
}
