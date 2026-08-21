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

## Recommended second phase

The technical pages were deliberately preserved in this revision to avoid changing data formats without checking them against the current mod source. The next pass should:

1. Rewrite `configuration.md` around the current in-game configuration screen and `SeasonalSimulationLevel` presets.
2. Split the long climate page into weather, temperature/humidity, snow, and biome-color pages.
3. Add a public API section generated or verified against the current 26.1.2 source.
4. Add complete examples for recipe, advancement, loot, and seasonal simulation conditions.
5. Mark every schema or example with its applicable Minecraft and mod version.
6. Review legacy pages and remove or label formats that are no longer loaded.
7. Optimize the 15 MB `bfxes4.gif`, which currently accounts for most of the repository size.
