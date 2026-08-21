# Climate and world rules

Dynamic-registry files live under `data/<namespace>/eclipticseasons/<type>/`.

| Type | Purpose | Demand |
|---|---|---|
| `biome_climate_setting` | Change seasonal biome temperature, downfall, and related values | Common |
| `weather_dimension` | Select the core biome that drives a dimension's shared weather | Common |
| `biome_rain` | Define seasonal clear/rain parameters for the core biome | Advanced |
| `agro_climate` | Map global terms to regional agricultural seasons | Advanced |
| `snow_term` | Set the solar-term interval in which a biome may receive snow | Common |
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

Minimal example changing the Rain Water solar term:

```json
{
  "biomes": "#c:is_temperate/overworld",
  "weathers": {
    "solar_terms": {
      "rain_water": {
        "rain": { "min_inclusive": 16000, "max_inclusive": 24000, "type": "minecraft:uniform" },
        "rain_delay": { "min_inclusive": 32000, "max_inclusive": 50000, "type": "minecraft:uniform" },
        "thunder": { "min_inclusive": 6000, "max_inclusive": 12000, "type": "minecraft:uniform" },
        "rain_chance": 0.5,
        "thunder_chance": 0.32,
        "special_effect": "eclipticseasons:light_rain_snow",
        "snow_melt_speed": 0.85
      }
    }
  }
}
```

| Field | Meaning |
|---|---|
| `rain_chance` | Base chance to start rain after clear time expires; also multiplied by downfall and the configuration multiplier |
| `rain` | Base duration provider after rain starts |
| `rain_delay` | Delay until the next check when rain does not start |
| `thunder_chance` | Base chance to enter thunder while raining |
| `thunder` / `thunder_delay` | Thunder duration and retry delay |
| `special_effect` | Weather visuals such as rain/snow textures or fog |
| `snow_accumulation_speed` / `snow_melt_speed` | Snow accumulation and melting multipliers for this weather |
| `time_periods`, `weight` | Time filters and selection weight when a term has multiple candidate weather entries |

Time fields are tick-value providers, but runtime divides them by the dimension weather tick factor. Treat them as relative tuning inputs rather than exact final durations.

!!! tip "Replacing the default curve"
    The default curve ID is `eclipticseasons:better_plains`. Override that ID and retain all 24 terms when replacing the complete Overworld curve; adding another file that also matches plains can create ordering ambiguity.

## Biome snowfall interval (`snow_term`)

`snow_term` controls when a biome may receive snow; it does not define a block's snow model. Save files under `data/<namespace>/eclipticseasons/snow_term/<name>.json`.

```json
{
  "biomes": "minecraft:plains",
  "start": "heavy_snow",
  "end": "greater_cold"
}
```

`biomes` accepts a biome ID or `#biome tag`. Both endpoints are inclusive, and intervals may cross the year boundary. `none` / `none` disables the snowfall window.

With `DynamicSnowTerm` enabled, yearly temperature offset can select an alternate interval:

```json
{
  "biomes": "minecraft:sunflower_plains",
  "start": "heavy_snow",
  "end": "greater_cold",
  "events": [
    { "temp_offset": 0.1, "start": "none", "end": "none" }
  ]
}
```

Events are checked in file order. The first event for which `temp_offset > current yearly temperature offset` replaces the base interval. Without `DynamicSnowTerm`, or when none matches, the top-level interval is used.

??? example "Examples in the source tree"
    - Minimal fixed interval: `src/generated/server_resources/resourcepacks/example/data/eclipticseasons/eclipticseasons/snow_term/plain.json`
    - Dynamic event: `sunflower_plains.json` in the same directory
    - Complete cold/warm/hot regional rules: `src/generated/server_resources/resourcepacks/Regional Snow Time/data/eclipticseasons/eclipticseasons/snow_term/agro/`

    `Regional Snow Time` is the best complete template for pack authors. It targets the `#eclipticseasons:agro/cold`, `warm`, and `hot` tags and supplies several `temp_offset` thresholds.

## Snow-covered blocks (`snow_definitions`)

```json
{
  "blocks": "minecraft:sugar_cane",
  "flag": 1200,
  "offset": 1,
  "mid": "eclipticseasons:snowy/sugar_cane"
}
```

Save it under `snow_definitions/<name>.json`. `mid` refers to a resource-pack model definition; a new block normally needs the matching client rule as well.

`flag` is an exclusive model-mode number, **not a bit field and not additive**.

| `flag` | Meaning | Typical use |
|---:|---|---|
| `1000` | One custom snow model; default | Ordinary blocks |
| `1001` | Plant model preserving the shader-sway category | Flowers, crops, saplings |
| `1100` | Separate upper and lower models | Tall/passable blocks; `mid` is upper and `mid2` lower |
| `1101` | Two-model leaves variant, automatically snow-passable | Special leaves |
| `1200` | Vine-like single model that ignores random model offset | Sugar cane and vine-like blocks |

The source also retains internal modes `1` block, `2` lower slab, `3` stairs, `301` upper stairs, `4` leaves, `5` short grass, `501` tall grass, `6` farmland, `7` vine, `998` custom AO, and `999` built-in custom model. They depend on built-in model dispatch; new compatibility packs should prefer the JSON modes above.

| Field | Meaning |
|---|---|
| `blocks` | Block ID or `#block tag` |
| `properties` | Optional state filters; every tester must pass |
| `properties[].name` | Block-state property name |
| `properties[].matcher.value` | Exact string value |
| `properties[].matcher.minTime` / `maxTime` | Inclusive integer range; `ignore_min` / `ignore_max` removes an endpoint |
| `properties[].reverse` | Invert this tester when `true` |
| `mid` / `mid2` | Client `model_definitions` IDs; upper/lower in two-model modes |
| `offset` | Level offset passed to model selection; plants commonly use `1` |
| `ignore_offset` | Ignore random model-position offset |
| `snow_passable` | Extra marker allowing snow rendering through/across the block |

??? example "Snow data and model examples"
    - Sugar cane (`1200`): `src/generated/server_resources/data/eclipticseasons/eclipticseasons/snow_definitions/snowy_sugar_cane.json`
    - Two-model bamboo (`1100`): `snowy_bamboo.json` in the same directory
    - State-filtered berry bush: `snowy_sweet_berry_bush.json` in the same directory
    - Full flower, crop, and tall-plant collection: `src/generated/server_resources/resourcepacks/extra_snow/data/eclipticseasons/eclipticseasons/snow_definitions/`
    - Client definitions referenced by `mid`: `src/generated/resources/assets/eclipticseasons/eclipticseasons/model_definitions/snowy/`

    For third-party compatibility, copy both a server-side `snow_definitions` example and its client-side `model_definitions` / `models` resources, then replace the block and model IDs.

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
