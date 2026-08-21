# Configuration guide

The current configuration screen is organized into General, Environment, Gameplay, Visual, Advanced, and All. The All page can search every registered setting, including detailed options that are not shown in the common categories.

!!! warning "Server rules are controlled by the server"
    Seasons, crops, weather, snow, and animal behavior are world or server rules. In multiplayer, local client settings cannot override the server configuration.

## Recommended settings

### Seasonal Simulation Level

The default is **Agriculture**. Higher levels include the effects of lower levels.

| Level | Purpose |
| --- | --- |
| Environment | Seasonal atmosphere, weather, and environmental presentation without gameplay restrictions |
| Ecology | Adds seasonal changes to natural blocks, vegetation, and ecological systems |
| Agriculture | Adds crop growth, humidity, greenhouse, and cultivation mechanics; this is the default |
| Survival | Fully enables seasonal animal, temperature, and survival-oriented gameplay |
| Custom | Allows individual crop, animal, temperature, and related settings to be adjusted instead of using a preset |

Selecting a preset updates the related agriculture, crop humidity, heatstroke, bee, breeding, and fishing toggles. Some world-level changes may require reopening the world before they are fully applied.

### Snow Behavior

| Mode | Seasonal rendered snow | Vanilla snow, ice, and melting |
| --- | --- | --- |
| Disabled | Off | Off |
| Render Only | On | Off |
| Vanilla Mechanics | Off | On |
| Render + Vanilla Mechanics | On | On |

Rendered seasonal snow primarily changes the scene without storing every visible patch as a world block. Vanilla mechanics can modify snow layers and ice in the world, so change them carefully in servers and long-lived saves.

### Legacy Greenhouse Mode

This uses the simplified greenhouse design of classic seasons mods: crops only require valid cover above them. When disabled, Ecliptic Seasons uses its full spatial greenhouse check.

## Categories

- **Environment:** season length, calendar offsets, daylight, and weather. `RainChanceMultiplier=100` preserves data-pack probability (default `120`), while thunder defaults to `80`; sleep clearing, desert precipitation, and snow speeds are also configurable. See [Climate, weather, and snow](climate.md).
- **Gameplay:** crop growth, humidity, bone meal, greenhouses, breeding, bees, fishing, and heatstroke.
- **Visual:** chunk-render refreshes, seasonal colors, flowers, snow layers, particles, and HUD options.
- **Advanced:** Serene Seasons, Distant Horizons, and Voxy integrations, plus debugging and experimental settings.

## Performance guidance

- `ForceChunkRenderUpdate` refreshes affected chunks when seasonal colors and snow change.
- `EnhancementChunkRenderUpdate` expands the refresh range. Enable it only when scenery updates too slowly and sufficient performance is available.
- A forced full seasonal LOD update in Distant Horizons may cause short stutters. Disable the forced update first rather than disabling the entire seasonal system.

## Restarts and save safety

The screen distinguishes client, startup, and world-level settings. A setting marked as requiring a restart may not fully apply to the current world immediately. Back up long-lived worlds before changing snow/ice behavior, valid dimensions, or datapack-related configuration.
