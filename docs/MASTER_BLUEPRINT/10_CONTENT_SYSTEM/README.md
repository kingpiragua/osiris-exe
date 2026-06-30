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

Template. Today content is largely in-component (e.g., the Memory 001 record).
This volume should define a data model to externalize it.

## Open Questions

- Format: TS modules, MDX, JSON, or a headless source.
- Schema for an "artifact" and for a "recovered memory" specifically.
- Asset pipeline and naming conventions.

## References

- [08 — Engine Architecture](../08_ENGINE_ARCHITECTURE/README.md)
- [11 — Archive System](../11_ARCHIVE_SYSTEM/README.md)
- [13 — Production Pipeline](../13_PRODUCTION_PIPELINE/README.md)

## Future Expansion

- Artifact schema spec; authoring guide; example entries.
