# 07 — UI/UX System

## Purpose

To define how the visitor interacts with the archive — the ritual grammar that
replaces conventional UI.

## Scope

Interaction model (typed/pressed/waited), the terminal, the access ritual,
prompts and hints, transitions/handoffs, accessibility, and reduced-motion.

## Principles

- The interface is a place that responds — no navbars, menus, buttons, or fake
  desktop.
- One active focus at a time (e.g., a single cursor).
- Guide without breaking tone (e.g., a ghost hint, not a menu).
- Accessible: keyboard support, visible instructions, reduced-motion respected.

## Current Status

Implemented: boot → terminal → access ritual; command grammar
(`help`/`begin`/`clear`, hidden `reset`); ghost prompt hint; Enter-to-recover;
Esc-to-return; reduced-motion support throughout.

## Open Questions

- Touch parity for "press Enter" moments as the world grows.
- Consistent return/navigation grammar across many artifacts.

## References

- [01 — Creative Direction](../01_CREATIVE_DIRECTION/README.md)
- [09 — Component Library](../09_COMPONENT_LIBRARY/README.md)
- [11 — Archive System](../11_ARCHIVE_SYSTEM/README.md)

## Future Expansion

- Interaction spec per ritual; accessibility checklist; command grammar
  reference.
