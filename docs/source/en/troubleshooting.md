# Troubleshooting and issue reports

Use this page to determine whether a problem comes from Ecliptic Seasons, configuration, a resource pack, or another mod integration.

## Quick checks

1. Confirm that Minecraft, the mod loader, Ecliptic Seasons, and required dependencies target matching versions.
2. Reproduce with the newest stable Ecliptic Seasons release available for that Minecraft version.
3. Temporarily remove shaders, resource packs, and nonessential rendering mods.
4. Test whether the problem also occurs in a new world.
5. Keep `logs/latest.log` and the crash report. A launcher screenshot is not a substitute for the log.

!!! warning "Back up the world first"
    Back up the world before testing issues involving saves, world generation, block replacement, or datapack changes.

## Crash or startup failure

Provide the Minecraft and loader versions, the complete Ecliptic Seasons file name, `latest.log`, the crash report, and the smallest mod list that reproduces the problem.

## Unexpected seasons, weather, or crop behavior

Check the simulation level and related feature toggles, current biome and solar term, and whether the modpack overrides crop or climate data. Include the position, solar term, biome ID, affected crop or block ID, and relevant configuration in the report.

## Snow, foliage color, or distant-rendering problems

State the exact Sodium, Embeddium, Iris, Oculus, Distant Horizons, or Voxy version; whether shaders and biome blending are enabled; and whether the problem disappears without third-party rendering mods.

## Report template

```text
Minecraft version:
Loader and version:
Full Ecliptic Seasons version:
Single-player or server:
Category: crash / logic / rendering / performance / compatibility
Steps to reproduce:
Expected result:
Actual result:
Reproducible with a minimal mod set:
Log or crash-report link:
```

See [Compatibility](compat.md) for integrations and [Frequently asked questions](question.md) for gameplay and command explanations.
