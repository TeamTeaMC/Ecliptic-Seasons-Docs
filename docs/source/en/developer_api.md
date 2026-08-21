# Developer API

## Stable entry point

Other mods should obtain the public API instance instead of depending on the `common` package or internal managers:

```java
EclipticSeasonsApi api = EclipticSeasonsApi.getInstance();

SolarTerm term = api.getSolarTerm(level);
Season globalSeason = api.getSeason(level);
Season localAgroSeason = api.getSeasonSignal(level, pos);
boolean snowingHere = api.isSnowAt(level, pos);
```

`getSeasonSignal(level, pos)` accounts for regional climate and is appropriate for agriculture. `getSeason(level)` returns the global season. Use `isSeasonEnabled(level)` when code may run in a dimension without the seasonal system.

## Common queries

| Need | Methods |
|---|---|
| Solar term, season, and sub-season | `getSolarTerm`, `getSeason`, `getSubSeason` |
| Dates and years | `getSolarDays`, `getSolarYear`, `getDayInTerm` |
| Weather at a position | `isRainAt`, `isSnowAt`, `isThunderAt` |
| Precipitation type | `getPrecipitationAt`, `getCurrentPrecipitationAt` |
| Base humidity | `getBaseHumidity` |
| Final humidity | `getAdjustedHumidity` (experimental) |
| Active simulation level | `getSeasonalSimulationLevel` |

`isDay`, `isNight`, `getNightTime`, `isNoon`, `isEvening`, and `isSnowySurfaceAt` are deprecated and should not be used in new integrations.

## Events

Current events are posted on `NeoForge.EVENT_BUS`:

```java
@SubscribeEvent
public static void onSolarTermChanged(SolarTermChangeEvent event) {
    SolarTerm before = event.getOldSolarTerm();
    SolarTerm after = event.getNewSolarTerm();
    Level level = event.getLevel();
}

@SubscribeEvent
public static void onPlantGrow(CanPlantGrowEvent event) {
    // TRUE forces growth, FALSE blocks it, and DEFAULT keeps normal handling.
    event.setResult(TriState.DEFAULT);
}
```

`RegisterAndModifyCropInfoEvent` is no longer supported; register crop data through data packs. `BeforeCheckSnowStatusEvent` has been deprecated since 0.13.3.

!!! note "Compatibility rule"
    The public API automatically respects configuration and may remain stable while internal classes change. Keep any cross-version adapter in one place and do not spread internal imports through integration code.
