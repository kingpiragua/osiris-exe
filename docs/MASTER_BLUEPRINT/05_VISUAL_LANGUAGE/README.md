# 05 — Visual Language

## Purpose

To define the OSIRIS.EXE visual system — color, type, CRT treatment, motion, and
the DISK signature — so every screen looks unmistakably part of the world.

## Scope

Palette, typography, CRT effects (bloom, scanlines, vignette, curvature,
flicker, sync tear, shimmer), the DISK, layout/negative-space rules, and motion
restraint. Implementation lives in the Component Library and code.

## Principles

- Phosphor green on black; restrained glow; generous negative space.
- Imperfection signals age and survival — never spectacle.
- The DISK is presence, not logo.
- Legibility always wins over effect.

## Current Status

Implemented in the app and summarized in [`../../OSIRIS_VISION.md`](../../OSIRIS_VISION.md)
(palette `#7DFFB0`, `.crt-*` utilities, the DISK). This volume should formalize
those into a referenceable spec.

## Open Questions

- Exact tokens (spacing, type scale) to canonize as the design system.
- Degradation-as-texture guidelines per artifact type.

## References

- [01 — Creative Direction](../01_CREATIVE_DIRECTION/README.md)
- [06 — Sound Language](../06_SOUND_LANGUAGE/README.md)
- [09 — Component Library](../09_COMPONENT_LIBRARY/README.md)
- [`../../OSIRIS_VISION.md`](../../OSIRIS_VISION.md)

## Future Expansion

- Subfolders: `color/`, `typography/`, `crt-effects/`, `the-disk/`, `motion/`.
- Token reference and do/don't visual examples.
