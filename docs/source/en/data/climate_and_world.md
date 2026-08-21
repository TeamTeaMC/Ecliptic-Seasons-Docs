# Climate and world rules

These files live under `data/<namespace>/eclipticseasons/<type>/`. Start with the type closest to your goal; a pack rarely needs to override every system.

| Type | Purpose |
|---|---|
| `agro_climate` | Map global solar terms to regional agricultural seasons |
| `biome_climate_setting` | Change biome temperature, downfall, and related climate values |
| `biome_rain` | Configure local-weather duration, delay, chance, and effects |
| `season_cycle` / `season_phase` | Customize calendar display and phases |
| `snow_definitions` | Connect blocks to snow-covered model definitions |
| `special_days` | Display named days within a yearly interval |

## Biome climate

Minimal `biome_climate_setting/savanna.json`:

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

## Local weather

`biome_rain/<name>.json` stores weather parameters by solar term:

```json
{
  "biomes": "#c:is_temperate/overworld",
  "weathers": {
    "solar_terms": {
      "rain_water": {
        "rain": { "min_inclusive": 16000, "max_inclusive": 24000, "type": "minecraft:uniform" },
        "rain_delay": { "min_inclusive": 32000, "max_inclusive": 50000, "type": "minecraft:uniform" },
        "rain_chance": 0.5,
        "thunder_chance": 0.32,
        "special_effect": "eclipticseasons:light_rain_snow",
        "snow_melt_speed": 0.85
      }
    }
  }
}
```

Durations use game ticks. Define only the terms you need instead of copying the complete default table.

## Snow-covered blocks

Server data in `snow_definitions/<name>.json` links a block to a resource-pack model definition:

```json
{
  "blocks": "minecraft:sugar_cane",
  "flag": 1200,
  "offset": 1,
  "mid": "eclipticseasons:snowy/sugar_cane"
}
```

## Special days

```json
{
  "start": 0.7,
  "end": 0.85,
  "term": "winter_solstice",
  "title": { "translate": "special_days.example.new_year" }
}
```

`start` and `end` are relative positions within the selected solar term. For complex `agro_climate` or `season_phase` files, copy the closest generated example and remove unused entries rather than recreating all 24 terms.
