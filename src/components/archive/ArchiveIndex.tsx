import Link from "next/link";

import { allMemories } from "@/content/memories";

// Acts group the fragments in the index. (All current fragments are Act I.)
const ACTS = [
  { id: 1, title: "ACT I — RECOVERY", subtitle: "The Archive wakes up." },
];

export default function ArchiveIndex() {
  const fragments = allMemories();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-[12vh] pb-24 sm:px-8 sm:pt-[14vh]">
      <p className="text-[0.7rem] uppercase tracking-[0.5em] text-phosphor-dim sm:text-sm">
        OSIRIS.EXE
      </p>
      <h1 className="mt-2 text-2xl font-bold uppercase tracking-[0.3em] text-phosphor text-phosphor-glow sm:text-4xl">
        ARCHIVE INDEX
      </h1>

      {ACTS.map((act) => {
        const inAct = fragments.filter((f) => (f.act ?? 1) === act.id);
        if (inAct.length === 0) return null;

        return (
          <section key={act.id} className="mt-12">
            <p className="text-sm uppercase tracking-[0.35em] text-phosphor text-phosphor-glow sm:text-base">
              {act.title}
            </p>
            <p className="mt-1 text-xs tracking-wide text-phosphor-dim sm:text-sm">
              {act.subtitle}
            </p>

            <ul className="mt-6">
              {inAct.map((fragment) => {
                const locked = Boolean(fragment.locked);

                const row = (
                  <div className="flex items-baseline gap-4 border-b border-phosphor-dim/15 py-3">
                    <span className="w-10 shrink-0 tabular-nums text-sm text-phosphor-dim">
                      {fragment.id}
                    </span>
                    <span className="flex-1">
                      <span className="block uppercase tracking-[0.2em] text-phosphor text-phosphor-glow sm:text-lg">
                        {fragment.title}
                      </span>
                      {fragment.sequenceRole && (
                        <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.3em] text-phosphor-dim">
                          {fragment.sequenceRole}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.25em] text-phosphor-dim sm:text-xs">
                      {fragment.status}
                    </span>
                    <span className="w-4 shrink-0 text-phosphor opacity-0 transition-opacity group-hover:opacity-100">
                      ›
                    </span>
                  </div>
                );

                if (locked) {
                  return (
                    <li
                      key={fragment.id}
                      className="cursor-not-allowed opacity-35"
                    >
                      {row}
                    </li>
                  );
                }

                return (
                  <li key={fragment.id}>
                    <Link
                      href={`/archive/${fragment.id}`}
                      className="group block transition-colors hover:bg-phosphor/[0.04]"
                    >
                      {row}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <p className="mt-16 text-[0.7rem] uppercase tracking-[0.35em] text-phosphor-dim sm:text-xs">
        SELECT A FRAGMENT TO BEGIN RECOVERY
      </p>
    </div>
  );
}
