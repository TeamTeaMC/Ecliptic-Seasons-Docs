# Ecliptic Seasons documentation restructure

## Completed in this revision

- Reorganized navigation around four audiences: players, modpack/datapack authors, resource-pack authors, and issue reporters.
- Restored existing pages that were not reachable from the old navigation, including animal behavior, compatibility, weather regions, and humidity structures.
- Added bilingual version-support and maintenance-scope pages.
- Added bilingual troubleshooting pages and a reusable issue-report template.
- Added audience-based routing tables to both landing pages.
- Corrected site metadata and enabled useful Material navigation, search, and code-copy features.
- Reduced Read the Docs dependencies to the documentation engine that is actually used.
- Verified the site with a strict MkDocs build and checked all local Markdown links.
- Rewrote the bilingual configuration guide against the current six UI categories, simulation presets, snow behavior, and legacy greenhouse mode.
- Added bilingual simulation-level resource conditions with recipe, advancement, and loot-table examples.
- Added bilingual public API and event guidance, including integration paths that are now deprecated.
- Verified the second-pass additions against the uploaded current NeoForge source tree and generated resources dated 2026-08-21.
- Consolidated the data-pack and resource-pack reference from dozens of registry-oriented pages into ten bilingual, task-oriented pages.
- Prioritized crop compatibility, simulation-level gating, climate/weather integration, and seasonal visuals for modpack authors; moved audio and complex calendar/model systems behind concise advanced guidance.
- Removed superseded pages so site search cannot return conflicting legacy schemas.

## Recommended second phase

The technical pages were deliberately preserved in this revision to avoid changing data formats without checking them against the current mod source. The next pass should:

1. Split the long climate page into weather, temperature/humidity, snow, and biome-color pages.
2. Mark every remaining schema or legacy example with its applicable Minecraft and mod version.
3. Review legacy pages and remove or label formats that are no longer loaded.
4. Optimize the 15 MB `bfxes4.gif`, which currently accounts for most of the repository size.
