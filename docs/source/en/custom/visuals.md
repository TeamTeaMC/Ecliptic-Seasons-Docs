# Seasonal visuals

Client JSON files live under `assets/<namespace>/eclipticseasons/<type>/`. The filename only needs to be unique; the actual target is declared inside the JSON.

## Biome colors

Path: `biome_colors/<name>.json`.

```json
{
  "biomes": "minecraft:snowy_plains",
  "foliage_colors": {
    "climate": "eclipticseasons:cold",
    "seasons": {
      "spring": { "color": -20561 },
      "summer": { "color": -16711936 },
      "autumn": { "color": -14336 },
      "winter": { "color": -16776961 },
      "none": { "color": -1 }
    }
  }
}
```

Colors are signed decimal ARGB/RGB integers. `biomes` accepts a biome ID or tag; use the corresponding grass field when changing grass color.

## Seasonal textures

Place the file under the target texture namespace at `eclipticseasons/season_textures/<name>.json`.

```json
{
  "target": "minecraft:block/oak_leaves",
  "biomes": "#eclipticseasons:rain/seasonal",
  "slices": [{
    "season": "spring",
    "transition_textures": [
      { "all": "minecraft:block/cherry_leaves" },
      { "all": "minecraft:block/spruce_leaves" }
    ]
  }]
}
```

`target` is the original texture. `transition_textures` are selected in order as the season progresses; keep one entry when no intermediate transition is needed.

## Fallen leaves

Path: `particles/fallen_leaves/<name>.json`.

```json
{
  "source": "custom",
  "block": { "blocks": "minecraft:pumpkin" },
  "location": { "biomes": "minecraft:plains" },
  "sprites": { "default": ["example:particle/leaf"] },
  "weights": { "default": 1 },
  "replace": false
}
```

`block` selects particle sources, `location` restricts biomes, and `sprites` plus `weights` select textures. Colors may use the same seasonal mapping as biome colors.

## Snow and model rules

- `snow_definitions/<name>.json` maps blocks to a snow model, for example `{ "blocks": "minecraft:cobblestone", "mid": "eclipticseasons:overlay_tiny" }`.
- `model_definitions/<name>.json` defines model combinations referenced by other rules.
- `season_definitions/<name>.json` changes block models under seasonal conditions.

These formats have many optional combinations. Copy the closest generated resource and change only its block, model, and condition fields. Server-side snow behavior additionally requires the matching data-pack `snow_definitions` entry.
