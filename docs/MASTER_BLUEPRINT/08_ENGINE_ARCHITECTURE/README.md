# 08 — Engine Architecture

## Purpose

To document how the `osiris-exe` application is built, so the system stays
coherent, performant, and expandable.

## Scope

Tech stack, app/routing structure, folder organization, state model, rendering
strategy (SSR/CSR), performance, and build/deploy. Not visual/UI specifics.

## Principles

- Component-based and reusable; pages compose, they don't implement.
- Clean separation: `crt/`, `effects/`, `boot/`, `terminal/`, `archive/`,
  `lib/`, `hooks/`.
- Expandable by design — adding a memory shouldn't require a redesign.
- Accessible and reduced-motion-aware by default.

## Current Status

Implemented: Next.js (App Router) + TypeScript + Tailwind. Procedural sound in
`lib/`, persistence in `lib/recovery.ts`, shared hooks in `hooks/`. Routes: `/`
(boot+terminal), `/archive/001`.

## Open Questions

- Routing pattern as memories multiply (`/archive/[id]` dynamic route).
- Where the content/data model lives (see Content System).
- Deployment target and hosting.

## References

- [09 — Component Library](../09_COMPONENT_LIBRARY/README.md)
- [10 — Content System](../10_CONTENT_SYSTEM/README.md)
- [12 — Motion Comic Engine](../12_MOTION_COMIC_ENGINE/README.md)

## Future Expansion

- Architecture diagrams; module boundaries; performance budget.
