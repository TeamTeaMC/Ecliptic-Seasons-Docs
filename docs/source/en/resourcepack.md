# Resource-pack integration

Use a resource pack to add seasonal visuals to vanilla blocks or blocks from other mods. Ecliptic Seasons reads client rules from `assets/<namespace>/eclipticseasons/`. Rules can refer to textures included in your pack or to resources supplied by other mods. Paths and fields on this page follow the supplied current core source; validate them separately for each Minecraft version you support.

## Supported customizations

| Content | Rule directory | Purpose | Details |
| --- | --- | --- | --- |
| Grass and foliage colors | `biome_colors/` | Seasonal biome colors | [Seasonal visuals](custom/visuals.md#biome-colors) |
| Seasonal textures | `season_textures/` | Replace a texture by season | [Seasonal visuals](custom/visuals.md#seasonal-textures) |
| Fallen-leaf particles | `particles/fallen_leaves/` | Select source blocks, biomes, and sprites | [Seasonal visuals](custom/visuals.md#fallen-leaves) |
| Snow overlays | `snow_definitions/` | Select a snowy appearance for blocks | [Seasonal visuals](custom/visuals.md#snow-and-model-rules) |
| Ambient sounds and music | `ambient/`, `background_music/` | Play sounds under seasonal conditions | [Ambient sounds and music](custom/audio.md) |

Model rules also include `model_definitions/` and `season_definitions/`. For complex block models, start from the closest generated example included with the mod.

## Paths and namespaces

Rules generally live at `assets/<namespace>/eclipticseasons/<rule_directory>/<name>.json`. Keep these three namespaces and identifiers distinct:

| Item | Example | Meaning |
| --- | --- | --- |
| Rule file namespace | `assets/minecraft/eclipticseasons/season_textures/oak_leaves.json` | Namespace containing the rule |
| Original texture ID | `minecraft:block/oak_leaves` | Texture matched by `target` |
| Replacement texture ID | `my_pack:block/spring_oak_leaves` | Image supplied by your pack |

The replacement ID `my_pack:block/spring_oak_leaves` points to `assets/my_pack/textures/block/spring_oak_leaves.png`. Omit `textures/` and `.png` when referring to it in JSON.

## Example: seasonal oak-leaf texture

Create `assets/minecraft/eclipticseasons/season_textures/oak_leaves.json`:

```json
{
  "target": "minecraft:block/oak_leaves",
  "biomes": "#eclipticseasons:rain/seasonal",
  "slices": [
    {
      "season": "spring",
      "textures": {
        "all": "my_pack:block/spring_oak_leaves"
      }
    }
  ]
}
```

Add the image at `assets/my_pack/textures/block/spring_oak_leaves.png`. `target` identifies the original texture, `biomes` limits where the rule applies, and `slices` assigns replacement textures to seasons. For transitions between solar terms, use `transition_textures`; the generated `oak_leaves_3.json` shows an example.

!!! warning "Resource-pack priority"
    Two packs can provide a JSON file at the same path; resource-pack priority determines which file is read. Giving your rule a distinct filename avoids direct file replacement, but rules aimed at the same texture still need to be tested together in game.

## Validation and troubleshooting

1. Enable the pack with a compatible Ecliptic Seasons version. Its root must contain a `pack.mcmeta` suitable for the target Minecraft version.
2. Visit a biome matching `biomes`, select the specified season, and inspect the target block. Verify one rule before extending it.
3. If nothing changes, check `target`, the rule path, texture IDs, the PNG filename, and resource-loading errors in the log.
4. If snow visuals need server-side snow behavior, also consult [Climate and world rules](data/climate_and_world.md#snow-covered-blocks-snow_definitions). The resource-pack rule does not change server-side decisions.

## Official resource-pack examples

The [Ecliptic Seasons: Bundles source](https://github.com/TeamTeaMC/Ecliptic-Seasons-Bundles/tree/main/src/main/resources/resourcepacks) shows how complete integration packs organize rules and assets:

| Goal | Example directory | Inspect |
| --- | --- | --- |
| Seasonal biome colors and landscapes | `Ecliptic Seasons - Terralith` | Color rules under `assets/` |
| Snow-covered plants and ground | `Ecliptic Seasons - Biomes O' Plenty` | Snow models and assets under `assets/` |
| Special block models | `Ecliptic Seasons - Chipped` | Model integration under `assets/` |

For server-side snow behavior, inspect the same pack's `data/` directory as well. Bundles supplies real integrations; use the relevant rule chapter of this Wiki for field definitions.
