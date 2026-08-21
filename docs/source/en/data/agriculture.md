# Agricultural data

Agricultural files live under `data/<namespace>/eclipticseasons/`. Most packs only need these three types.

## Crop growth

Path: `crop/<name>.json`. `apply_target` selects blocks, `climate` selects an agro-climate, and `season` or `humidity` defines growth multipliers.

```json
{
  "humidity": {
    "dry": { "grow_chance": 0.95, "fertile_chance": 0.95 },
    "average": { "grow_chance": 1.025, "fertile_chance": 1.025 },
    "moist": { "grow_chance": 0.95, "fertile_chance": 0.95 }
  },
  "climate": "#eclipticseasons:all",
  "parent": [],
  "apply_target": { "blocks": "#example:crops" }
}
```

`grow_chance` controls natural growth and `fertile_chance` controls fertilization. `blocks` accepts a block ID or tag. When an existing curve is suitable, adding crops to an `eclipticseasons:crops/<type>` block tag is safer than copying its JSON.

## Humidity controls

Path: `humidity_control/<name>.json`.

```json
{
  "ingredient": { "ingredient": "minecraft:wet_sponge", "count": 1 },
  "result": { "id": "minecraft:sponge" },
  "range": 5,
  "level": 1,
  "checks": [{ "offset": [0, -1, 0], "block": { "blocks": "#eclipticseasons:soft_heat_sources" } }],
  "infinity": true
}
```

`range` is the affected radius, `level` is the humidity change, and `checks` describes the activating structure. The old `wetter` registry still exists, but new content should prefer `humidity_control`.

## Seasonal quests

Path: `season_quest/<name>.json`.

```json
{
  "start": "spring_equinox",
  "end": "beginning_of_summer",
  "need": [{ "items": "minecraft:wheat", "count": 192 }],
  "award": [{ "id": "eclipticseasons:spring_greenhouse_essence" }],
  "tittle": { "translate": "season_quest.example.spring" },
  "climate": "#eclipticseasons:all",
  "weight": 10,
  "glowing": true,
  "color": 43520
}
```

The source currently spells the field `tittle`; do not change it to `title`.
