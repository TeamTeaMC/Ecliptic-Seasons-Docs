# Dimension Weather Parameters (Biome Rain)

`biome_rain` is the datapack system used by Ecliptic Seasons to define seasonal weather behavior.

Although the registry is still named `biome_rain`, it no longer represents fully independent weather for every biome.

In current versions, weather is ultimately written into Minecraft's dimension-level weather data, meaning that all locations within the same dimension share the same weather state.

```text
One Dimension
=
One Weather State
```

This design greatly improves compatibility with vanilla mechanics and other mods that rely on Minecraft's built-in weather system.

---

# Current Weather Model

Biome weather definitions are still used as weather parameter sources.

The system reads weather parameters from biome weather entries, but the final result affects dimension-wide weather:

* Rain
* Thunderstorms
* Clear weather duration
* Rain duration
* Thunder duration

Because of this, `biome_rain` should now be understood as:

```text
Dimension Weather Parameters
```

rather than a per-biome weather simulation system.

---

# Plains Weather Template

The Overworld weather system uses the weather definition associated with:

```text
minecraft:plains
```

as an important source of weather parameters.

Therefore, when creating custom weather datapacks, you should always ensure that a valid weather definition exists for:

```text
minecraft:plains
```

Do not define weather only for custom biomes while ignoring plains, otherwise weather generation may not behave as expected.

---

# File Location

Biome Rain definitions are JSON files.

Place them in:

```text
data/<namespace>/eclipticseasons/biome_rain
```

---

# Basic Example

```json
{
  "biomes": "minecraft:plains",
  "weathers": {
    "seasons": {
      "spring": {
        "rain_chance": 0.45,
        "thunder_chance": 0.1
      },
      "summer": {
        "rain_chance": 0.65,
        "thunder_chance": 0.4
      },
      "autumn": {
        "rain_chance": 0.35,
        "thunder_chance": 0.0
      },
      "winter": {
        "rain_chance": 0.4,
        "thunder_chance": 0.0
      }
    }
  }
}
```

This configuration provides seasonal weather parameters for plains biomes.

---

# biomes

Defines which biomes are associated with this weather parameter set.

Single biome:

```json
"biomes": "minecraft:plains"
```

Biome tag:

```json
"biomes": "#c:is_temperate/overworld"
```

Unlike older versions, this field should not be interpreted as:

```text
Each biome has its own independent weather
```

Instead it indicates which biomes may use or provide this weather definition.

For Overworld weather, it is strongly recommended that one definition includes:

```text
minecraft:plains
```

---

# Weather Mapping

`weathers` uses the SolarTermValueMap system.

Supported mapping levels:

```text
default
seasons
sub_seasons
solar_terms
```

---

## default

Provides a single weather definition for all Solar Terms.

```json
{
  "weathers": {
    "default": {
      "rain_chance": 0.4,
      "thunder_chance": 0.0
    }
  }
}
```

Suitable for simple weather setups.

---

## seasons

Defines weather by season.

```json
{
  "weathers": {
    "seasons": {
      "spring": {
        "rain_chance": 0.5
      },
      "summer": {
        "rain_chance": 0.7
      },
      "autumn": {
        "rain_chance": 0.3
      },
      "winter": {
        "rain_chance": 0.4
      }
    }
  }
}
```

This is the recommended approach for most datapacks.

---

## sub_seasons

Defines weather using seasonal phases.

Each season is divided into three sub-seasons:

```text
early_spring
mid_spring
late_spring

early_summer
mid_summer
late_summer

early_autumn
mid_autumn
late_autumn

early_winter
mid_winter
late_winter
```

Example:

```json
{
  "weathers": {
    "sub_seasons": {
      "early_spring": {
        "rain_chance": 0.35
      },
      "mid_spring": {
        "rain_chance": 0.55
      },
      "late_spring": {
        "rain_chance": 0.75
      }
    }
  }
}
```

This allows smoother seasonal transitions.

---

## solar_terms

Defines weather for individual Solar Terms.

```json
{
  "weathers": {
    "solar_terms": {
      "rain_water": {
        "rain_chance": 0.55
      },
      "grain_rain": {
        "rain_chance": 0.8
      }
    }
  }
}
```

This provides the highest level of control.

---

# Mapping Priority

When multiple mappings are defined simultaneously, the system combines them using the following priority order:

```text
solar_terms
>
sub_seasons
>
seasons
>
default
```

For example:

```json
{
  "default": {...},
  "seasons": {...},
  "sub_seasons": {...},
  "solar_terms": {...}
}
```

The most specific matching entry will be used.

---

# Weather Fields

## rain_chance

Controls the probability of rain.

```json
"rain_chance": 0.5
```

Higher values increase the chance of rainfall.

---

## thunder_chance

Controls the probability of thunderstorms.

```json
"thunder_chance": 0.2
```

Default:

```text
0.0
```

Higher values increase thunderstorm frequency.

---

## rain

Rain duration distribution.

```json
"rain": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 12000,
    "max_inclusive": 24000
  }
}
```

Measured in game ticks.

---

## rain_delay

Delay between rain events.

```json
"rain_delay": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 24000,
    "max_inclusive": 72000
  }
}
```

Measured in game ticks.

---

## thunder

Thunderstorm duration.

```json
"thunder": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 6000,
    "max_inclusive": 12000
  }
}
```

Measured in game ticks.

---

## thunder_delay

Delay between thunderstorms.

```json
"thunder_delay": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 48000,
    "max_inclusive": 96000
  }
}
```

Measured in game ticks.

---

## special_effect

Defines a custom weather effect.

```json
"special_effect": "eclipticseasons:light_rain_snow"
```

Can be used for:

* Snowstorms
* Fog
* Mixed precipitation
* Custom weather visuals

---

## snow_accumulation_speed

Snow accumulation speed multiplier.

```json
"snow_accumulation_speed": 0.85
```

Default:

```text
1.0
```

Lower values accumulate snow more slowly.

---

## snow_melt_speed

Snow melting speed multiplier.

```json
"snow_melt_speed": 1.2
```

Default:

```text
1.0
```

Higher values melt snow faster.

---

# Weather Effects

Custom weather effects are defined in:

```text
data/<namespace>/eclipticseasons/biome_rain_effect
```

Examples include:

* Fog
* Snowstorms
* Composite weather effects

---

# Biome Rain Tags

Biome rain tags are still available and can be found in the datapack tag folder.

Common tags include:

```text
eclipticseasons:rain/rainless
eclipticseasons:rain/monsoonal
eclipticseasons:rain/seasonal
eclipticseasons:rain/seasonal/hot
eclipticseasons:rain/seasonal/cold
eclipticseasons:rain/arid
eclipticseasons:rain/droughty
eclipticseasons:rain/soft
eclipticseasons:rain/rainy
```

Their primary purpose is now climate classification and humidity adjustment rather than independent biome weather.

In particular:

* `rain/rainless` marks rainless biomes.
* `rain/monsoonal` marks monsoon climates with distinct wet and dry seasons.
* Other tags mainly influence humidity calculations and climate behavior.

---

# Deserts and Badlands

By default, vanilla rainless biomes remain rainless.

This includes:

```text
Deserts
Badlands
```

As a result, these biomes generally do not receive rainfall unless explicitly modified by datapacks.

---

# Small Biomes

```text
eclipticseasons:is_small
```

is a special tag used internally for very small biomes.

Most datapack authors do not need to use it.

---

# Recommendations

For most datapacks, adjusting the following fields is sufficient:

```text
rain_chance
thunder_chance
rain
rain_delay
special_effect
snow_accumulation_speed
snow_melt_speed
```

And always ensure that:

```text
minecraft:plains
```

has a valid weather definition.

The recommended design philosophy is:

```text
Shared Dimension Weather
+
Seasonal Weather Parameters
+
Optional Special Effects
```

which provides the best compatibility while preserving seasonal weather variation.

---

# Notes

* Independent biome weather is no longer used.
* All locations within a dimension share the same weather state.
* `biome_rain` acts as a weather parameter source.
* Overworld weather definitions should always include `minecraft:plains`.
* Rainfall still affects humidity calculations.
* Vanilla rainless biomes remain rainless by default.
* For most packs, modifying tags and probabilities is preferable to creating complex weather tables.
