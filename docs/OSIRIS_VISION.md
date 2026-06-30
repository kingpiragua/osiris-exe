# OSIRIS.EXE — Vision

## What OSIRIS.EXE is

OSIRIS.EXE is the operating system of a fictional universe — an **ancient living
archive** that has survived attempts to erase it. It is not an app, a game, or a
dashboard. It is a place. When you open it, the archive is *waking up* and
*recovering memory*: oral histories, witness accounts, missing names, a lost
timeline rooted in Humboldt Park and the wider Puerto Rican diaspora.

The interface is a green-phosphor CRT terminal because the medium *is* the
message: a record that refuses to be deleted, rendered on hardware that remembers
its own ghosts.

## Core emotional experience

> The user should feel like they have **returned to a place they once belonged** —
> recovering forbidden history, not browsing a website.

The dominant feeling is **reverence**, then **recognition**. Slowness is sacred.
The pauses, the deliberate typing, and the quiet are the experience — not
obstacles to it. The payoff is intimate: *welcome back. you were never gone.*

## The DISK — visual signature

Every memorable system has one motif (HAL's red eye, the Pip-Boy's green,
MU/TH/UR, Blade Runner's amber CRTs). OSIRIS.EXE has **the DISK**.

It is the "O" in OSIRIS, the author's eye (**Disk Darián**), and the canon's
union of *enlightenment, memory, and recovery* — a single circle of phosphor.

Rules for the DISK:

- **Presence, not logo.** It is never stamped on the screen. It lives *in* the
  light: a faint, slowly breathing radial bloom behind the interface.
- **It answers to recovery.** Its halo ring (the circle's edge) is invisible at
  rest and rises into view only during recovery — when a memory is found and as
  the visitor enters it. The bloom warms and quickens in that moment.
- **It is centered and eternal.** The DISK is the system's eye, fixed at the
  center of the tube, beneath all content, on every screen.
- **Symbolic, not decorative.** If it ever reads as ornament, it is wrong.

Implementation: `components/effects/Disk.tsx` (z-0) + the `.disk*` / `.recovering`
rules in `globals.css`; the aura is raised via the `recovering` document class.

## Design pillars

1. **Sacred, not slick.** Calm, deliberate, reverent. Negative space is a
   feature. Silence is allowed.
2. **Memory, not loading.** Every status is archive language (RECOVERED, INTACT,
   FOUND, RECONSTRUCTED). Nothing "loads."
3. **Honest imperfection.** A real tube: gentle bloom, restrained scanlines,
   tiny phosphor flickers, occasional sync tear, slight barrel curvature, a faint
   shimmer. Imperfection signals *age and survival*, never decoration.
4. **Restraint.** Subtle over loud. One quiet glitch correction lands harder than
   constant motion.
5. **Legibility is reverence.** The history must always be readable. Effects never
   fight the text.
6. **Responsive everywhere.** The archive is whole on a phone and on a desktop.

## Things we never do

- ❌ No Matrix-style code rain.
- ❌ No hacker / "I'm in" aesthetic.
- ❌ No loud, fast, or flashy animation.
- ❌ No generic system/OS language (BIOS, POST, "Loading…", Windows references).
- ❌ No effect that harms readability.
- ❌ No content that asks to be *consumed* rather than *recovered*.

## Technical philosophy

- **Component-based and reusable.** Small, composable pieces:
  `CRTScreen`, `ScreenEffects`, `TypingText`, `ArchiveLog`, `GlitchText`,
  `BlinkingCursor`, `BootSequence`. Pages compose; they don't implement.
- **Effects are CSS-first.** Bloom, scanlines, vignette, flicker, sync tear,
  shimmer, and curvature live in `globals.css` as named `.crt-*` utilities, so the
  look is tuned in one place.
- **Timing is data.** Speeds, delays, and dramatic holds are explicit props —
  pacing is authored, not accidental.
- **Accessible by default.** Decorative layers are `aria-hidden`; everything
  honors `prefers-reduced-motion`; text stays real, selectable, and legible.
- **No backend, no external assets** for the core experience. The archive runs
  anywhere, online or offline.

## Development principle

> **Every new feature must deepen the feeling that the user is recovering memory
> rather than consuming content.**

Before adding anything, ask: *does this make the archive feel more alive, more
remembered, more sacred?* If it only adds features, motion, or noise, it does not
belong in OSIRIS.EXE.
