# Custom Calendar Display

This page explains how to customize the calendar display and Solar Term notification text in Ecliptic Seasons.

This system is mainly used for special biome displays, such as wet/dry seasons, permanent autumn, or custom regional season names.

> This only changes what is displayed in the calendar and Solar Term notifications.
>
> It does not change the actual season, weather, temperature, crop growth, snow behavior, or any other gameplay logic.

---

# Overview

Custom calendar display is controlled by two data types:

* `season_phase`
* `season_cycle`

They are usually used together.

## Season Phase

A `season_phase` defines a displayable season phase.

For example:

* Wet Season
* Dry Season
* Permanent Autumn
* Long Winter

It controls display data such as:

* Name
* Color
* Icon
* Font icon
* Related season category

## Season Cycle

A `season_cycle` maps the current Solar Term to a `season_phase` for specific biomes.

For example, a monsoonal biome can display:

* Dry Season during part of the year
* Rainy Season during another part of the year
* Wet Season during the humid period

Again, this only changes the display result. It does not modify the actual climate simulation.

---

# Defining a Season Phase

Season phase files are placed in:

```text
data/<namespace>/eclipticseasons/season_phase
```

Example:

```json
{
  "color": "green",
  "icon": {
    "texture": "eclipticseasons:season_phase/wet_middle"
  },
  "font": {
    "id": "eclipticseasons:monsoon_icons",
    "label": "h"
  },
  "season": "summer",
  "name": "eclipticseasons:wet"
}
```

This defines a display phase named `wet`.

The `name` field requires language entries.

Example:

```json
{
  "info.eclipticseasons.environment.season_phase.wet": "Wet Season",
  "info.eclipticseasons.environment.season_phase.pattern.wet": "%s (All Year)",
  "info.eclipticseasons.environment.season_phase.alternation.wet": "The air is heavy with moisture."
}
```

---

# Icon Settings

You can provide a separate icon texture directly:

```json
{
  "icon": {
    "texture": "eclipticseasons:season_phase/wet_middle"
  }
}
```

You can also use a shared icon sheet:

```json
{
  "icon": {
    "i": 1,
    "j": 3,
    "texture": "eclipticseasons:font/seasons_icons",
    "width": 180,
    "height": 120,
    "size": 30
  }
}
```

For most datapacks, using a separate 30×30 icon texture is recommended. It is simpler and avoids extra atlas parameters.

---

# Defining a Season Cycle

Season cycle files are placed in:

```text
data/<namespace>/eclipticseasons/season_cycle
```

Season cycles are disabled by default. You need to enable the related setting before they take effect.

A season cycle defines which `season_phase` should be displayed for certain biomes during each Solar Term.

Example:

```json
{
  "biomes": "#eclipticseasons:monsoonal",
  "phases": {
    "solar_terms": {
      "beginning_of_spring": "eclipticseasons:dry_middle",
      "rain_water": "eclipticseasons:dry_middle",
      "insects_awakening": "eclipticseasons:dry_end",
      "spring_equinox": "eclipticseasons:dry_end",
      "fresh_green": "eclipticseasons:dry_end",
      "grain_rain": "eclipticseasons:dry_end",

      "beginning_of_summer": "eclipticseasons:rain_start",
      "lesser_fullness": "eclipticseasons:rain_middle",
      "grain_in_ear": "eclipticseasons:rain_middle",
      "summer_solstice": "eclipticseasons:rain_end",
      "lesser_heat": "eclipticseasons:rain_end",
      "greater_heat": "eclipticseasons:rain_end",

      "beginning_of_autumn": "eclipticseasons:rain_end",
      "end_of_heat": "eclipticseasons:wet_start",
      "white_dew": "eclipticseasons:wet_start",
      "autumnal_equinox": "eclipticseasons:wet_middle",
      "cold_dew": "eclipticseasons:wet_middle",
      "first_frost": "eclipticseasons:wet_end",

      "beginning_of_winter": "eclipticseasons:dry_start",
      "light_snow": "eclipticseasons:dry_start",
      "heavy_snow": "eclipticseasons:dry_start",
      "winter_solstice": "eclipticseasons:dry_start",
      "lesser_cold": "eclipticseasons:dry_middle",
      "greater_cold": "eclipticseasons:dry_middle"
    }
  }
}
```

In this example, all biomes in the `#eclipticseasons:monsoonal` biome tag use a custom wet/dry seasonal display.

---

# Biome Field

The `biomes` field is a biome holder set.

It can use:

A single biome:

```json
"biomes": "minecraft:savanna"
```

A biome tag:

```json
"biomes": "#eclipticseasons:monsoonal"
```

Using biome tags is recommended when multiple biomes should share the same calendar display.

---

# Phase Mapping

The `phases` field uses a Solar Term map structure.

It can define mappings by:

* `solar_terms`
* `seasons`
* `default`

## Mapping by Solar Term

Use this when you need precise control over each Solar Term.

```json
{
  "phases": {
    "solar_terms": {
      "beginning_of_spring": "eclipticseasons:dry_middle",
      "rain_water": "eclipticseasons:dry_middle"
    }
  }
}
```

## Mapping by Season

Use this when a whole season should share the same display phase.

```json
{
  "phases": {
    "seasons": {
      "spring": "eclipticseasons:wet",
      "summer": "eclipticseasons:wet",
      "autumn": "eclipticseasons:dry",
      "winter": "eclipticseasons:dry"
    }
  }
}
```

## Default Mapping

Use this when no specific Solar Term or season mapping is provided.

```json
{
  "phases": {
    "default": "eclipticseasons:wet"
  }
}
```

---

# Common Use Cases

## Wet and Dry Seasons

Useful for tropical or monsoonal regions.

The calendar can display Wet Season, Rainy Season, or Dry Season instead of the standard spring/summer/autumn/winter cycle.

## Permanent Autumn

Useful for fantasy biomes or special dimensions.

The calendar and Solar Term notification can always display an autumn-like phase.

## Regional Calendar Names

Useful for modpacks that want different regions to use different seasonal naming systems.

For example, temperate biomes can use normal Solar Terms, while tropical biomes use wet/dry season names.

---

# Important Notes

This system is display-only.

It does not change:

* Actual Solar Term progression
* Weather probability
* Snowfall logic
* Crop growth rules
* Temperature calculation
* Greenhouse behavior
* Humidity behavior

If you want to change gameplay behavior, use the corresponding climate, crop, biome, or datapack configuration instead.

Use `season_phase` and `season_cycle` only when you want to change what the player sees in the calendar or Solar Term notifications.
