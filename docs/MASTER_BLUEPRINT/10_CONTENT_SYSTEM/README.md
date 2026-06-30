# 10 — Content System

## Purpose

To define how content (records, recovered memories, and other artifacts) is
authored, structured, and loaded — so the world can grow without code rewrites.

## Scope

The data model for artifacts, authoring format, file/asset organization, and the
contract between content and the engine. Not the narrative itself (Story Bible).

## Principles

- Content is data; the engine renders it. Adding a memory edits data, not code.
- One schema, many artifact types (memory, report, transmission, audio, image).
- Authoring favors clarity and longevity over cleverness.

## Current Status

v0.8 — recovered memories are externalized to data. `src/content/memories/`
holds a typed `RecoveredMemory` model (`types.ts`), one file per memory
(`001.ts`), and a registry (`index.ts`). `ArchiveRecord` and `MemoryPlayback`
render from data; `/archive/[id]` resolves any memory. Adding a memory = add a
data file + register it. Non-memory artifacts and an asset pipeline are still
open.

## Open Questions

- Format for non-memory artifacts (reports, transmissions, audio).
- Whether to move from TS modules to MDX/JSON/headless as volume grows.
- Asset pipeline and naming conventions (esp. for panel artwork).

## References

- [08 — Engine Architecture](../08_ENGINE_ARCHITECTURE/README.md)
- [11 — Archive System](../11_ARCHIVE_SYSTEM/README.md)
- [13 — Production Pipeline](../13_PRODUCTION_PIPELINE/README.md)

## Future Expansion

- Artifact schema spec; authoring guide; example entries.
