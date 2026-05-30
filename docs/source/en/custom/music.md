# Seasonal Background Music

Seasonal Background Music is a client-side resource pack feature that allows Minecraft's default background music to be replaced based on the current season, Solar Term, special day, time, weather, or biome.

Unlike Seasonal Ambient Sounds, which provide continuous environmental ambience, Seasonal Background Music controls the music tracks played by Minecraft itself.

Examples include:

- Spring theme music
- Summer theme music
- Autumn theme music
- Christmas music
- Mid-Autumn Festival music

------

# File Location

Background music definitions are stored as JSON files.

Place them in:

```text
assets/<namespace>/eclipticseasons/music
```

------

# Basic Example

The following example plays a special music track during Mid-Autumn Festival nights:

```json
{
  "special_days": [
    "eclipticseasons:mid_autumn"
  ],
  "ignore_time": false,
  "day": false,
  "music": {
    "default": {
      "sound": "eclipticseasons:music.mid_autumn",
      "min_delay": 1000,
      "max_delay": 25000
    }
  }
}
```

This configuration means:

```text
Mid-Autumn Festival
+
Nighttime

→ Use the Mid-Autumn music track
```

------

# Matching Logic

The system checks:

- Precipitation state
- Season or Solar Term
- Special days
- Time conditions
- Biome restrictions
- Excluded biomes

A music rule is only considered valid if all specified conditions match.

If multiple rules match at the same time, the rule with the highest priority will be selected.

------

# Fields

## Season and Solar Terms

### season

Restricts music to a specific season.

```json
"season": "spring"
```

Available values:

```text
spring
summer
autumn
winter
```

If `season` is specified, music will be matched directly against the current season.

------

### start / end

Restricts music to a range of Solar Terms.

```json
"start": "spring_equinox",
"end": "grain_rain"
```

These fields are only used when neither `season` nor `special_days` is specified.

They are useful when more precise control than the four seasons is required.

Example:

```json
{
  "start": "beginning_of_spring",
  "end": "insects_awakening"
}
```

------

# Special Days

## special_days

Restricts music to specific special days.

```json
{
  "special_days": [
    "eclipticseasons:christmas"
  ]
}
```

Example:

```json
{
  "special_days": [
    "eclipticseasons:christmas"
  ],
  "music": {
    "default": {
      "sound": "eclipticseasons:music.gacha_bells",
      "min_delay": 1000,
      "max_delay": 25000
    }
  }
}
```

This means:

```text
Christmas

→ Play Christmas-themed music
```

Special day rules are evaluated before Solar Term range checks.

------

# Time Control

## ignore_time

Whether time restrictions should be ignored.

```json
"ignore_time": true
```

Default value:

```text
true
```

When enabled:

```text
The music can be used during both day and night.
```

To make music depend on the time of day:

```json
"ignore_time": false
```

------

## day

Distinguishes between daytime and nighttime.

```json
"day": false
```

This field is only used when:

```json
"ignore_time": false
```

Values:

```text
true  = daytime
false = nighttime
```

------

## time_period

Provides more precise time control.

```json
"time_period": "night"
```

Available values:

```text
dawn
day
dusk
night
midnight
```

Meaning:

| Value    | Description |
| -------- | ----------- |
| dawn     | Dawn        |
| day      | Daytime     |
| dusk     | Dusk        |
| night    | Night       |
| midnight | Midnight    |

If `time_period` is specified, it takes precedence over `day`.

------

# Weather Conditions

## rain

Matches the current precipitation state.

```json
"rain": true
```

Default value:

```text
false
```

Matching behavior:

```text
rain=true
→ Only during precipitation
rain=false
→ Only when there is no precipitation
```

This is a strict matching condition.

------

# Biome Restrictions

## biomes

Restricts music to specific biomes.

Single biome:

```json
"biomes": "minecraft:forest"
```

Biome tag:

```json
"biomes": "#minecraft:is_forest"
```

Biome tags are recommended when targeting multiple biomes.

------

## ignored_biomes

Excludes specific biomes.

```json
"ignored_biomes": "#c:is_cave"
```

If the current biome matches this field, the music will not be used.

Common uses include:

- Cave biomes
- Special dimensions
- Custom exclusion zones

------

# Music Definition

## music

Defines the background music.

```json
{
  "music": {
    "default": {
      "sound": "example:music.spring",
      "min_delay": 2000,
      "max_delay": 25000,
      "replace_current_music": false
    }
  }
}
```

The music definition supports three categories:

```text
default
creative
underwater
```

These correspond to:

- Normal gameplay music
- Creative Mode music
- Underwater music

If Creative or Underwater music is not provided, Minecraft's original music for those situations will be preserved.

------

## sound

The music track to play.

```json
"sound": "example:music.spring"
```

Required.

------

## min_delay

Minimum delay before the music can play again.

```json
"min_delay": 2000
```

Measured in game ticks.

------

## max_delay

Maximum delay before the music can play again.

```json
"max_delay": 25000
```

Measured in game ticks.

------

## replace_current_music

Whether the music should immediately replace the currently playing track.

```json
"replace_current_music": false
```

Default value:

```text
false
```

The default behavior is recommended for most cases.

------

# Priority

## priority

Controls rule priority.

```json
"priority": 950
```

Default value:

```text
1000
```

When multiple rules match simultaneously:

```text
Lower values have higher priority.
```

For example:

```text
950 takes priority over 1000
```

Recommended usage:

- Use the default value for general seasonal music.
- Use lower values for special day music.
- Use lower values for highly specific biome-based music.

------

# Common Examples

## Spring Music

```json
{
  "season": "spring",
  "music": {
    "default": {
      "sound": "example:music.spring",
      "min_delay": 2000,
      "max_delay": 25000
    }
  }
}
```

------

## Autumn Music

```json
{
  "season": "autumn",
  "music": {
    "default": {
      "sound": "example:music.autumn",
      "min_delay": 2000,
      "max_delay": 25000
    }
  }
}
```

------

## Christmas Music

```json
{
  "special_days": [
    "eclipticseasons:christmas"
  ],
  "priority": 900,
  "music": {
    "default": {
      "sound": "example:music.christmas",
      "min_delay": 1000,
      "max_delay": 25000
    }
  }
}
```

------

# Recommendations

Recommended use cases include:

- Seasonal theme music
- Holiday music
- Biome-specific music
- Event-based music

For most resource packs, the following fields are sufficient:

```text
season
special_days
rain
biomes
ignored_biomes
music
priority
```

------

# Notes

- This system is client-side only.
- It replaces Minecraft's default background music.
- `rain` is a strict matching condition.
- Lower `priority` values have higher priority.
- `special_days` take precedence over Solar Term range checks.
- If multiple rules match, the rule with the highest priority (lowest value) will be selected.