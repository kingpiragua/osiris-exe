# 06 — Sound Language

## Purpose

To define how OSIRIS.EXE sounds — and, just as importantly, when it goes silent.

## Scope

The CRT hum, electronic noise bed, the phosphor flick, silence as an instrument,
future score/ambience, and autoplay handling. Implementation lives in code
(`src/lib/sound.ts`).

## Principles

- Sound is procedural and asset-light where possible; it serves atmosphere.
- **Silence is designed.** The hum cuts before key moments so they land.
- Subtle, low, never startling. Respect the visitor's environment.

## Current Status

Implemented: procedural hum + noise during boot, a clean cut to silence at the
end of narration, and a phosphor flick at the prompt. Autoplay requires a first
gesture (best-effort).

## Open Questions

- Whether to add a minimal "wake the archive" entry for guaranteed audio.
- A mute affordance that doesn't introduce chrome.
- Score/ambience inside recovered memories.

## References

- [01 — Creative Direction](../01_CREATIVE_DIRECTION/README.md) (Silence)
- [07 — UI/UX System](../07_UI_UX_SYSTEM/README.md)
- [12 — Motion Comic Engine](../12_MOTION_COMIC_ENGINE/README.md)

## Future Expansion

- Sound map per ritual beat; per-memory ambience guidelines.
