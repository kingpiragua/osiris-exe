# 09 — Component Library

## Purpose

To catalog the reusable building blocks of OSIRIS.EXE so they are discovered and
reused rather than reinvented.

## Scope

Each component's role, props/API, usage, and constraints. Spans CRT primitives,
effects, boot, terminal, and archive components.

## Principles

- Reuse before rebuild.
- Components are presentational and composable; logic is injected (props/
  callbacks) to keep them route-agnostic.
- Document the API and the intent, not just the code.

## Current Status

Template. Implemented components to catalog: `CRTScreen`, `ScreenEffects`,
`Disk`, `TypingText`, `BlinkingCursor`, `FadingCursor` (crt/effects); boot
(`BootSequence`, `ArchiveLog`, `GlitchText`); terminal (`Terminal`,
`TerminalInput`, `TerminalOutput`, `CommandParser`); archive (`ArchiveRecord`,
`MemoryPlayback`, `SignalQuality`, `RecoveryNotice`, `RecoveredMemory001`).

## Open Questions

- Which components are stable "library" vs. experimental.
- A lightweight component preview/gallery without adding chrome to the app.

## References

- [05 — Visual Language](../05_VISUAL_LANGUAGE/README.md)
- [07 — UI/UX System](../07_UI_UX_SYSTEM/README.md)
- [08 — Engine Architecture](../08_ENGINE_ARCHITECTURE/README.md)

## Future Expansion

- One entry per component (props table, usage, do/don't); versioning notes.
