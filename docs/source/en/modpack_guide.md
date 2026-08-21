# Data packs and modpacks

Start from the integration goal, not from a list of registries.

| Priority | Goal | Page |
|---|---|---|
| Most common | Make new crops respect seasons or humidity | [Agricultural data](data/agriculture.md) |
| Most common | Gate recipes, advancements, or loot by simulation level | [Simulation-level conditions](data/simulation_conditions.md) |
| Common | Adjust biome temperature, dimension-wide weather, or snow | [Climate and world rules](data/climate_and_world.md) |
| Advanced | Replace agro-climate mappings, calendar phases, or special days | [Climate and world rules](data/climate_and_world.md) |

Dynamic-registry resources use `data/<your_namespace>/eclipticseasons/<type>/<name>.json`. Recipes, advancements, and loot tables use the current singular directories: `recipe`, `advancement`, and `loot_table`.

## Lowest-maintenance integration

1. Prefer tags over copied built-in JSON, such as `eclipticseasons:crops/<type>`.
2. Add custom curves in your namespace instead of replacing defaults.
3. Copy the closest generated example and remove irrelevant fields.
4. Check the log after `/reload`; re-enter the world for world-level registry changes.
5. Gate survival-only content with `seasonal_simulation_level`.

!!! warning "Version scope"
    This guide follows the uploaded current NeoForge source and resources generated on 2026-08-21. Do not backport these examples unchanged to 1.20.1.
