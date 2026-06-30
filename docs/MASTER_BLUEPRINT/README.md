# OSIRIS.EXE — Master Blueprint

The single source of truth for the OSIRIS.EXE franchise. This blueprint is a
living system: it grows with the work, but its structure stays stable so anyone
can find — and trust — the canonical answer to a question.

## Project Vision

OSIRIS.EXE is the operating system of a fictional universe — an ancient living
archive that survived attempts to erase it. The visitor does not *browse*
content; they are granted permission to **recover memory**. The flagship form is
the recovered memory (a motion-comic chapter), delivered inside a sacred,
green-phosphor CRT interface where silence, slowness, and reverence are the
experience.

See the [Project Charter](00_PROJECT_CHARTER/README.md) for the full mission and
boundaries, and [Creative Direction](01_CREATIVE_DIRECTION/README.md) for the
emotional and design intent.

## Volumes

| # | Volume | Focus |
|---|--------|-------|
| 00 | [Project Charter](00_PROJECT_CHARTER/README.md) | Mission, boundaries, success |
| 01 | [Creative Direction](01_CREATIVE_DIRECTION/README.md) | Emotion, pillars, philosophy |
| 02 | [World Bible](02_WORLD_BIBLE/README.md) | The universe, places, rules |
| 03 | [Story Bible](03_STORY_BIBLE/README.md) | Narrative, timeline, arcs |
| 04 | [Character Bible](04_CHARACTER_BIBLE/README.md) | Cast, design rules, voices |
| 05 | [Visual Language](05_VISUAL_LANGUAGE/README.md) | Color, type, CRT, the DISK |
| 06 | [Sound Language](06_SOUND_LANGUAGE/README.md) | Hum, silence, flick, score |
| 07 | [UI/UX System](07_UI_UX_SYSTEM/README.md) | Interaction, ritual, terminal |
| 08 | [Engine Architecture](08_ENGINE_ARCHITECTURE/README.md) | App structure, tech |
| 09 | [Component Library](09_COMPONENT_LIBRARY/README.md) | Reusable building blocks |
| 10 | [Content System](10_CONTENT_SYSTEM/README.md) | Authoring & data model |
| 11 | [Archive System](11_ARCHIVE_SYSTEM/README.md) | Artifacts, memories, access |
| 12 | [Motion Comic Engine](12_MOTION_COMIC_ENGINE/README.md) | Playback of memories |
| 13 | [Production Pipeline](13_PRODUCTION_PIPELINE/README.md) | From idea to recovered |
| 14 | [Marketing](14_MARKETING/README.md) | Positioning, audience, launch |
| 15 | [Roadmap](15_ROADMAP/README.md) | Versions, milestones |
| 16 | [Future Expansion](16_FUTURE_EXPANSION/README.md) | What the world could become |

## Current Progress

- **Application:** `osiris-exe` v0.8 — boot rite → terminal → access ritual →
  recovered memories rendered from data via `/archive/[id]` (playback
  placeholder; no artwork yet). Procedural CRT sound, the DISK signature, and
  recovery persistence are in place.
- **Companion:** `osiris-motion-comic` — the original single-file motion comic
  and its `canon/` wiki (source of much World/Story/Character material).
- **Blueprint:** Charter and Creative Direction authored; remaining volumes are
  structured templates awaiting content.

## Last Updated

2026-06-30

## Development Philosophy

- **Every feature must deepen the feeling of recovering memory, not consuming
  content.** If it only adds features or noise, it does not belong.
- **One source of truth.** Decisions live here, in the relevant volume, not in
  scattered notes or commit messages.
- **Structure first, content over time.** The skeleton is complete now; the
  flesh is added deliberately, never as filler.
- **Restraint is a feature.** Silence, negative space, and slowness are design
  choices, not gaps.

## Related

- App design notes: [`../OSIRIS_VISION.md`](../OSIRIS_VISION.md)
- Canon material: `osiris-motion-comic/canon/` (separate repository)
