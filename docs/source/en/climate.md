# Climate, weather, and snow

## Current weather model

Ecliptic Seasons no longer gives each biome an independent Local Weather state. The enabled built-in **Rain Together** data pack assigns `minecraft:plains` as the Overworld weather core, so plains calculates the shared weather result.

`biome_rain/better_plains.json` supplies the seasonal curve matched by plains, and that clear/rain result is assigned to the other Overworld biomes. Rain timing therefore does not follow the biome beneath the player. Each biome still uses its own temperature to render the shared precipitation as rain or snow and maintains its own snow depth.

## Changing rain frequency

Players and server owners can use **Environment → Weather** in the configuration screen:

| Setting | Default | Effect |
|---|---:|---|
| `UseSolarWeather` | `true` | Uses seasonal weather scheduling. When disabled, vanilla global clear/rain scheduling remains, while seasonal precipitation and snow logic may still operate |
| `RainChanceMultiplier` | `120` | Overall rain-chance percentage. `100` keeps data-pack values, `50` halves them, `200` doubles them, and `0` prevents Ecliptic Seasons from randomly starting rain |
| `ThunderChanceMultiplier` | `80` | Thunder-chance percentage, calculated in the same way |
| `NoRainInDeserts` | `false` | Keeps biomes without natural precipitation free of rain and snow when enabled |
| `ClearAfterSleep` | `true` | Clears current weather after sleeping |
| `SnowAccumulationSpeedMultiplier` | `1.0` | Atmospheric snow-cover accumulation speed |
| `SnowMeltSpeedMultiplier` | `1.0` | Snow-cover recession speed |

The rain-start weight is approximately `solar-term rain_chance × current downfall × RainChanceMultiplier / 100`. A single multiplier therefore preserves seasonal differences.

Use configuration multipliers when the whole pack should be wetter or drier. Use a data pack only when individual solar terms need different curves.

## Biome climate

Base temperature, downfall, elevation, and the current solar term influence:

- temperature and precipitation type;
- base humidity used by crops;
- snow periods, accumulation, and melting;
- seasonal grass and foliage colors.

Agriculture also uses a regional season signal, so cold and hot regions may not follow the global agricultural season exactly.

## Humidity

Humidity levels are `ARID`, `DRY`, `AVERAGE`, `MOIST`, and `HUMID`. Base humidity comes from biome, season, and elevation. Greenhouses or humidity-control blocks may further modify the final value at a crop position.

Use the configuration screen's debug information when checking temperature, humidity, or snow instead of relying on a large fixed biome table.

## Snow

Snow cover depends on current temperature, the biome's snow period, global precipitation, and accumulated snow depth. Snow Behavior selects rendered cover, vanilla snow, both systems, or neither.

!!! note
    The public `hasLocalWeather` check always returns `false`. `biome_rain` now supplies seasonal weather parameters for the core biome; it does not represent independent weather for every biome.
