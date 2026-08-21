# Compatibility

This page lists only integrations with a verifiable entry point in the current source. An unlisted mod is not necessarily incompatible; it simply has no source-verified dedicated integration here.

## Player-facing integrations

| Mod or system | Current source integration | Notes |
|---|---|---|
| Sodium | Seasonal color blending, snow models, and chunk rendering | Update both mods before reporting rendering issues |
| Iris | Snow-surface shading, frozen-water identification, and render-context hooks | Compatibility options appear only when Iris is detected |
| Distant Horizons | Seasonal LOD color, snow, frozen water, and refresh handling | Compatibility mixins require DH `3.0.0-b` or newer; forcing all LOD refreshes can cause severe stalls |
| Voxy | LOD import, models, textures, and seasonal update hooks | Current configuration labels these controls as tests; modpacks should not force automatic refresh by default |
| Fabric Renderer Indigo | Block-model and snow rendering hooks | Used by the Fabric rendering path |
| CTM / Continuity | CTM resource loading and Continuity detection | Test complex snow-covered models in the exact target combination |

## Information and recipe interfaces

| Mod | Integration |
|---|---|
| Jade | Crop growth, animal breeding, greenhouse core, and cauldron information |
| The One Probe | Crop, animal, greenhouse core, and cauldron information |
| JEI | Humidity-control, seasonal-quest, and related recipe categories |
| KubeJS | Script integration through a dedicated plugin class |

`Compat.ShowCropGrowthInfoInProbe` controls crop diagnostics in Jade and TOP.

## Data compatibility

Ecliptic Seasons can consume crop tags used by Serene Seasons and optionally derive humidity from those season tags. The relevant settings are:

- `SereneSeasonsCropTag`
- `SereneSeasonsCropTagIgnoreSapling`
- `SereneSeasonCropTagBasedHumidity`
- `ModsWithoutSereneSeasonBasedHumidity`

New data packs should still prefer native Ecliptic Seasons crop data because it can represent season, humidity, and agro-climate together.

## Modpack verification

1. Test the exact Minecraft, loader, and mod versions instead of relying on legacy compatibility claims.
2. Check foliage colors, snow-covered models, shaders, and distant LODs—the four highest-risk rendering paths.
3. If only crops are unaffected, add tags or data before requesting a Java compatibility layer.
4. Reports should include the mod list, versions, logs, and comparison results with Sodium, Iris, DH, or Voxy disabled.

!!! warning "Legacy claims removed"
    The current source has no dedicated entry point for JourneyMap, Cold Sweat, Legendary Survival Overhaul, Snowy Spirit, Haunted Harvest, InControl, Dynamic Trees, or OptiFine. This page neither guarantees nor denies that they can run together.
