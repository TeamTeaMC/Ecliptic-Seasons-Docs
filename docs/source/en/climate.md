# Climate, weather, and snow

## Current weather model

Ecliptic Seasons no longer gives each biome an independent Local Weather state. The enabled built-in **Rain Together** data pack assigns `minecraft:plains` as the Overworld weather core, so plains calculates the shared weather result.

`biome_rain/better_plains.json` supplies the seasonal curve matched by plains, and that clear/rain result is assigned to the other Overworld biomes. Rain timing therefore does not follow the biome beneath the player. Each biome still uses its own temperature to render the shared precipitation as rain or snow and maintains its own snow depth.

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
