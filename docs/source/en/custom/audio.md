# Ambient sounds and music

## Seasonal ambience

Path: `assets/<namespace>/eclipticseasons/ambient/<name>.json`. These rules play short ambient sounds according to solar term, time, weather, and biome. The sound event must still be registered through vanilla `sounds.json`.

Ambient rules have many optional conditions. Copy one of the generated `spring.json`, `summer_day.json`, or `winter_wind.json` examples and remove restrictions you do not need. Players must enable the Natural Ambient Sounds client option.

## Background music

Path: `assets/<namespace>/eclipticseasons/background_music/<name>.json`.

```json
{
  "start": "lesser_heat",
  "end": "greater_heat",
  "music": {
    "default": {
      "sound": "example:music.late_summer",
      "min_delay": 2000,
      "max_delay": 25000,
      "replace_current_music": false
    }
  }
}
```

`start` and `end` define the active solar-term interval. `sound` is a registered sound event, not an `.ogg` path. Delays use game ticks. Filters for special days, day/night, rain, climate, and biomes are optional; copy only those fields from a generated example when needed.
