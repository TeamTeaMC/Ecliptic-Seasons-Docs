# Climate and world rules

Dynamic-registry files live under `data/<namespace>/eclipticseasons/<type>/`.

| Type | Purpose | Demand |
|---|---|---|
| `biome_climate_setting` | Change seasonal biome temperature, downfall, and related values | Common |
| `weather_dimension` | Select the core biome that drives a dimension's shared weather | Common |
| `biome_rain` | Define seasonal clear/rain parameters for the core biome | Advanced |
| `agro_climate` | Map global terms to regional agricultural seasons | Advanced |
| `snow_definitions` | Connect new blocks to snow-covered models | Common |
| `season_cycle` / `season_phase` | Customize calendar phases | Advanced |
| `special_days` | Define named dates | Optional |

## Biome climate

```json
{
  "downfall_changes": {
    "solar_terms": {
      "beginning_of_summer": 0.2,
      "greater_heat": 0.533
    }
  },
  "biomes": "#c:is_savanna"
}
```

Save this under `biome_climate_setting/<name>.json`. Include only the climate properties and solar terms that need changes.

## Dimension-wide weather

Weather is no longer simulated independently per biome. The mod always registers and enables the built-in **Rain Together** pack. Its `data/rain_together/eclipticseasons/weather_dimension/plains.json` contains:

```json
{
  "core": "minecraft:plains",
  "dimension": "minecraft:overworld"
}
```

This makes plains the Overworld weather core. Plains matches `biome_rain/better_plains.json`; the resulting seasonal weather is then assigned to the other Overworld biomes.

Custom rules use the same `weather_dimension/<name>.json` path. Rules for another season-enabled dimension should select a core biome that exists there and has suitable climate behavior.

`biome_rain/<name>.json` can still define seasonal rain chance, duration, delay, thunder, and snow-melt multipliers. Under the current model, treat it as **dimension-wide parameters selected through the core biome**, not as Local Weather.

## Snow-covered blocks

```json
{
  "blocks": "minecraft:sugar_cane",
  "flag": 1200,
  "offset": 1,
  "mid": "eclipticseasons:snowy/sugar_cane"
}
```

Save it under `snow_definitions/<name>.json`. `mid` refers to a resource-pack model definition; a new block normally needs the matching client rule as well.

## Special days

```json
{
  "start": 0.7,
  "end": 0.85,
  "term": "winter_solstice",
  "title": { "translate": "special_days.example.new_year" }
}
```

For complex `agro_climate`, `season_cycle`, or `season_phase` rules, copy and reduce the closest current generated resource.

!!! warning "Local Weather is no longer supported"
    `hasLocalWeather` always returns `false`. Do not describe `biome_rain` as independent rain per biome; together with `weather_dimension`, it configures core-biome-driven weather shared by a dimension.
