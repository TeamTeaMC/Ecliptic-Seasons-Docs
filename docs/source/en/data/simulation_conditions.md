# Simulation-level conditions

Ecliptic Seasons provides the `eclipticseasons:seasonal_simulation_level` condition so one data pack can enable content according to the player's selected simulation level.

The ordered levels are `environment`, `ecology`, `agriculture`, and `survival`. `custom` is a separate custom mode. A higher preset includes every lower level: for example, a `survival` setup also satisfies an `agriculture` condition.

## Recipes and advancements

Put the NeoForge resource condition in the resource root:

```json
{
  "neoforge:conditions": [
    {
      "type": "eclipticseasons:seasonal_simulation_level",
      "level": "agriculture"
    }
  ],
  "type": "minecraft:crafting_shaped",
  "pattern": [" A ", " B ", " B "],
  "key": {
    "A": "minecraft:glass",
    "B": "minecraft:copper_ingot"
  },
  "result": {
    "id": "eclipticseasons:hyetometer"
  }
}
```

Advancements use the same `neoforge:conditions` form. Current resource directories are singular, such as `data/<namespace>/recipe/` and `data/<namespace>/advancement/`.

## Loot tables

Inside a loot pool or entry's `conditions` array, use `condition` instead of `type`:

```json
{
  "condition": "eclipticseasons:seasonal_simulation_level",
  "level": "survival"
}
```

## Choosing a level

| Content | Suggested minimum |
|---|---|
| Visual, calendar, and environmental resources | `environment` |
| Animals and ecological interactions | `ecology` |
| Crops, greenhouses, and agricultural items | `agriculture` |
| Survival pressure such as heatstroke | `survival` |

Do not use this condition as a game-version test. Maintain loader or game-version compatibility separately.
