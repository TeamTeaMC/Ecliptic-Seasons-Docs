# Data-pack integration

Use data packs to add crop, biome, animal, climate, and snow behavior to a modpack. This page starts with the smallest crop integration and links to the rules for more advanced changes. Paths and fields follow the supplied current core source; check each Minecraft version you intend to support.

[Crop data-pack generator](datapack_generator.md)

## Tags and standalone rules

| Goal | Location | Use |
| --- | --- | --- |
| Add blocks or other entries to an existing category | `data/eclipticseasons/tags/block/...` | Start here for most integrations |
| Define a rule with custom parameters | `data/<your_namespace>/eclipticseasons/<type>/...` | Use for crop multipliers, climate curves, and similar behavior |

Put additions to an Ecliptic Seasons tag in the `eclipticseasons` namespace. Put independent rules in your own namespace, such as `my_pack`, to avoid replacing built-in files.

## Example: a spring and summer tomato crop

Assume the crop block ID is `example:tomato_crop`. Create `data/eclipticseasons/tags/block/crops/spring_summer.json`:

```json
{
  "replace": false,
  "values": ["example:tomato_crop"]
}
```

Use the crop **block ID**, not the harvested tomato item ID. `replace: false` adds it to the existing tag. Check the actual block ID of the mod being integrated.

Where item-related features also need this classification, add `data/eclipticseasons/tags/item/crops/spring_summer.json` and use the corresponding item ID, such as `example:tomato`. The block and item IDs may differ.

Load the pack into a world, run `/reload`, and inspect the crop with a Growth Detector in spring or summer and again in autumn or winter. If there is no change, check the `block` directory, block ID, data-pack errors in the log, and the seasonal simulation and farming settings.

## Further integrations

| Goal | Guide |
| --- | --- |
| Crop humidity, biome classification, animal breeding seasons | [Essential tags](data/tags.md) |
| Growth multipliers, humidity-control blocks, seasonal quests | [Agricultural data](data/agriculture.md) |
| Biome climate, weather, snowfall, calendars | [Climate and world rules](data/climate_and_world.md) |
| Recipes, advancements, and loot gated by simulation level | [Simulation-level conditions](data/simulation_conditions.md) |
| Foliage, textures, models, particles, and sound | [Resource-pack integration](resourcepack.md) |

## Working with custom rules

1. Check [essential tags](data/tags.md) before defining a standalone rule.
2. Copy the closest JSON from the mod's generated resources into your namespace. Change the target and fields needed for your integration.
3. Integrate one block or biome first. Run `/reload` and check the log and in-game result.
4. Extend the verified rule to tags. Re-enter the world when testing world-level dynamic-registry changes.

!!! note "Snow uses both kinds of pack"
    Server-side snow decisions and client-side snow models are separate. For a complete block integration, consult [Climate and world rules](data/climate_and_world.md) and [Seasonal visuals](custom/visuals.md).

## Official integration examples

The [Ecliptic Seasons: Bundles source](https://github.com/TeamTeaMC/Ecliptic-Seasons-Bundles/tree/main/src/main/resources/resourcepacks) contains complete cross-mod integration packs with their original folder layout:

| Goal | Example directory | Inspect |
| --- | --- | --- |
| Add seasonal tags for another mod's crops | `Ecliptic Seasons DataPack - Bountiful Fares` | `data/eclipticseasons/tags/block/crops/` |
| Integrate crops and snow-covered blocks | `Ecliptic Seasons - Biomes O' Plenty` | Crop and snow rules under `data/` |
| Define snow behavior for complex blocks | `Ecliptic Seasons - Quark` | `data/es_x_quark/eclipticseasons/snow_definitions/` |

Replace target mod IDs when adapting an example, and check `pack.mcmeta` against the Minecraft version in your pack.
