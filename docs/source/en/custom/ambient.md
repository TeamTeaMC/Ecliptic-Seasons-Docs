# Seasonal Ambient Sounds

Seasonal Ambient Sounds are a client-side resource pack feature that allows custom background ambience to be played based on the current season, time, weather, and biome.

The system is designed to enhance the atmosphere of the world with sounds such as spring birds, summer night insects, autumn winds, or winter storms.

Unlike real-time audio mixing mods, Seasonal Ambient Sounds focus on providing a stable ambient background layer.

---

# File Location

Ambient sound definitions are stored as JSON files.

Place them in:

```text
assets/<namespace>/eclipticseasons/ambient
```

---

# Basic Example

The following example plays a forest ambience during spring:

```json
{
  "sound": "eclipticseasons:ambient.spring_forest",
  "season": "spring",
  "biomes": "#minecraft:is_forest",
  "rain": false
}
```

This configuration means:

```text
Spring
+
Forest biomes
+
No precipitation

→ Play eclipticseasons:ambient.spring_forest
```

Since no time restrictions are defined, the sound can play during both day and night.

---

# Matching Logic

The system checks the following conditions:

* Indoor state
* Precipitation state
* Season or Solar Term
* Time restrictions
* Water state
* Biome restrictions
* Excluded biomes

A sound is only considered valid if all specified conditions match.

If multiple sounds match simultaneously, the one with the highest priority will be selected.

---

# Fields

## sound

The sound event to play.

```json
"sound": "eclipticseasons:ambient.spring_forest"
```

This field is required.

---

# Season and Solar Terms

## season

Restricts the sound to a specific season.

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

If `season` is specified, the system matches against the current season directly.

---

## start / end

Restricts the sound to a range of Solar Terms.

```json
"start": "spring_equinox",
"end": "grain_rain"
```

These fields are only used when `season` is not specified.

They are useful when finer control than the four seasons is required.

Example:

```json
{
  "sound": "example:early_spring_birds",
  "start": "beginning_of_spring",
  "end": "insects_awakening"
}
```

---

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
The sound can play during both day and night.
```

To make sounds depend on the time of day, set:

```json
"ignore_time": false
```

---

## day

Distinguishes between daytime and nighttime.

```json
"day": true
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

Example:

```json
{
  "sound": "example:night_crickets",
  "ignore_time": false,
  "day": false
}
```

This sound will only play at night.

---

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

---

# Weather and Environment

## rain

Matches the current precipitation state.

```json
"rain": true
```

Important:

```text
rain=true
```

means:

```text
Only play during precipitation.
```

While:

```json
"rain": false
```

means:

```text
Only play when there is no precipitation.
```

Default value:

```text
false
```

---

## indoor

Matches whether the player is indoors.

```json
"indoor": true
```

Matching behavior:

```text
true  → Indoors only
false → Outdoors only
```

Default value:

```text
false
```

---

## inwater

Matches whether the player is currently in water.

```json
"inwater": true
```

Matching behavior:

```text
true  → In water only
false → Not in water only
```

Default value:

```text
false
```

---

# Biome Restrictions

## biomes

Restricts the sound to specific biomes.

Single biome:

```json
"biomes": "minecraft:forest"
```

Biome tag:

```json
"biomes": "#minecraft:is_forest"
```

Biome tags are recommended when targeting multiple biomes.

If omitted or empty, no biome restriction is applied.

---

## ignored_biomes

Excludes specific biomes.

```json
"ignored_biomes": "#c:is_cave"
```

If the current biome matches this field, the sound will not play.

Common uses include:

* Cave biomes
* Special dimensions
* Custom exclusion zones

---

# Priority

## priority

Controls sound priority.

```json
"priority": 950
```

Default value:

```text
1000
```

When multiple sounds match simultaneously:

```text
Lower values have higher priority.
```

For example:

```text
950 takes priority over 1000
```

Recommended usage:

* Use the default value for general ambience.
* Use lower values for more specific weather, biome, or time-based sounds.

---

# Common Examples

## Summer Daytime Wind

```json
{
  "sound": "example:garden_wind",
  "season": "summer",
  "ignore_time": false,
  "day": true,
  "rain": false
}
```

---

## Summer Night Insects

```json
{
  "sound": "example:night_crickets",
  "season": "summer",
  "ignore_time": false,
  "day": false,
  "rain": false
}
```

---

## Winter Storm

```json
{
  "sound": "example:winter_wind",
  "season": "winter",
  "rain": true,
  "priority": 950
}
```

---

# Recommendations

For most resource packs, it is recommended to build a small set of stable ambient sounds, such as:

* Spring forest birds
* Summer daytime wind
* Summer nighttime insects
* Autumn wind and leaves
* Winter storms

Most use cases can be covered using only:

```text
sound
season
rain
biomes
ignored_biomes
ignore_time
day
priority
```

---

# Notes

* This system is client-side only.
* It does not modify weather, temperature, seasons, or gameplay mechanics.
* `rain`, `indoor`, and `inwater` are strict matching conditions.
* It is not recommended to use `season` together with `start` and `end`.
* Lower `priority` values have higher priority.
* When multiple rules match, the sound with the highest priority (lowest value) will be selected.
