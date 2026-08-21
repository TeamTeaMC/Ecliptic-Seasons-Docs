# Essential tags

Tags are the first choice for modpack compatibility. To append values to an Ecliptic Seasons tag, place the file in the mod namespace, for example:

`data/eclipticseasons/tags/block/crops/spring.json`

```json
{
  "replace": false,
  "values": ["example:tomato_crop"]
}
```

When a crop has both a block and an item, add both to matching files under `tags/block` and `tags/item`.

## Crops: highest priority

| Goal | Tag pattern |
|---|---|
| Suitable seasons | `eclipticseasons:crops/<season combination>` |
| Suitable humidity | `eclipticseasons:crops/<minimum>_<maximum>` |
| Ignore seasons | `eclipticseasons:crops/unaffected_by_seasons` |
| Ignore humidity | `eclipticseasons:crops/unaffected_by_humidity` |
| Survive hostile climate | Block tag `eclipticseasons:crops/not_killed_by_climate` |

Season combinations include `spring_summer`, `spring_autumn`, and `summer_autumn_winter`. Use the dedicated `all_seasons` tag for all four seasons instead of concatenating all four names. Humidity names are `arid`, `dry`, `average`, `moist`, and `humid`; `dry_moist` is a range while `average_average` is a single level.

A tomato suitable for spring–summer and average–moist humidity needs four minimal files:

```text
data/eclipticseasons/tags/block/crops/spring_summer.json
data/eclipticseasons/tags/block/crops/average_moist.json
data/eclipticseasons/tags/item/crops/spring_summer.json
data/eclipticseasons/tags/item/crops/average_moist.json
```

Use the JSON shown above in each file, adding either `example:tomato_crop` or `example:tomato` to `values`.

## Biomes

These files belong under `tags/worldgen/biome/`.

| Purpose | Tags |
|---|---|
| Agricultural climate | `eclipticseasons:agro/cold`, `agro/warm`, `agro/hot` |
| Rain class | `rain/seasonal`, `rain/seasonal/cold`, `rain/seasonal/hot`, `rain/monsoonal`, `rain/rainless`, `rain/arid`, `rain/droughty`, `rain/soft`, `rain/rainy` |
| Seasonal color | `color/stable`, `color/slightly`, `color/monsoonal`, `color/seasonal`, `color/seasonal/cold`, `color/seasonal/hot` |
| Special environment | `is_small`, `extreme_cold` |

Old root-level biome tags such as `arid` and `seasonal` are deprecated; use `rain/...` for rain classification.

## Animals and environment

| Registry | Tag | Purpose |
|---|---|---|
| `entity_type` | `eclipticseasons:breed/<season combination>` | Breeding seasons |
| `entity_type` | `eclipticseasons:habit/day`, `habit/night`, `habit/all_time` | Activity period |
| `block` | `eclipticseasons:habitat/butterfly`, `habitat/firefly` | Habitats |
| `block` | `eclipticseasons:snow_overlay_cannot_survive_on` | Prevent visual snow attachment |
| `block` | `eclipticseasons:snow_layer_cannot_survive_in` | Prevent real snow layers |
| `block` | `eclipticseasons:soft_heat_sources` | Mild heat sources |
| `block` | `eclipticseasons:dark_grow_plants`, `natural_plants`, `volatile_plants`, `volatile` | Plant and environment checks |
| `item` | `eclipticseasons:cooling_items` | Cooling items |
| `item` | `eclipticseasons:heat_protective_helmets` | Heat-protective helmets |
| `mob_effect` / `enchantment` | `eclipticseasons:heatstroke_resistant` | Heatstroke resistance |

Use the dynamic registries in [Agricultural data](agriculture.md) or [Climate and world rules](climate_and_world.md) only when you need probabilities, climate curves, or custom growth multipliers.

??? example "Copyable examples in the source tree"
    Paths are relative to the source root:

    - Crop season and humidity block tags: `src/generated/server_resources/data/eclipticseasons/tags/block/crops/`
    - Matching crop item tags: `src/generated/server_resources/data/eclipticseasons/tags/item/crops/`
    - Animal breeding seasons: `src/generated/server_resources/data/eclipticseasons/tags/entity_type/breed/`
    - Animal activity periods: `src/generated/server_resources/data/eclipticseasons/tags/entity_type/habit/`
    - Biome classes: `src/generated/server_resources/data/eclipticseasons/tags/worldgen/biome/`
    - Heatstroke and environment tags: the generated `tags/item/`, `tags/mob_effect/`, `tags/enchantment/`, and `tags/block/` directories
