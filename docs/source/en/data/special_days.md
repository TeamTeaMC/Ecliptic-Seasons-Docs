# Special Days

Special Days are datapack-defined events that mark specific periods within a Solar Term.

They can be used for:

- Displaying holiday titles
- Displaying holiday notifications
- Triggering seasonal background music
- Providing conditions for other systems

Unlike real-world calendars, Special Days are not tied to specific dates.

Instead, they are based on the current Solar Term and its progression.

------

# File Location

Special Days are defined as JSON files.

Place them in:

```text
data/<namespace>/eclipticseasons/special_days
```

------

# Basic Example

The following example defines a Mid-Autumn Festival:

```json
{
  "term": "white_dew",
  "start": 0.7,
  "end": 1.0,
  "title": {
    "translate": "special_days.eclipticseasons.mid_autumn"
  },
  "alternation": {
    "translate": "special_days.eclipticseasons.mid_autumn.alternation"
  }
}
```

This configuration means:

```text
From 70% progress through White Dew
Until the end of White Dew

→ The current date is considered Mid-Autumn Festival
```

------

# Fields

## term

The Solar Term associated with the holiday.

```json
"term": "white_dew"
```

This field is required.

A Special Day can only become active when the current Solar Term matches the specified value.

------

## start

The starting progress within the Solar Term.

```json
"start": 0.7
```

Range:

```text
0.0 ~ 1.0
```

Meaning:

```text
0.0 = Beginning of the Solar Term
1.0 = End of the Solar Term
```

Example:

```json
"start": 0.25
```

means the holiday begins when the Solar Term reaches 25% progress.

Default value:

```text
0.0
```

------

## end

The ending progress within the Solar Term.

```json
"end": 1.0
```

Range:

```text
0.0 ~ 1.0
```

When `lasting_days` is `0`, the holiday remains active between `start` and `end`.

Default value:

```text
0.0
```

------

## lasting_days

Defines a fixed duration in game days.

```json
"lasting_days": 2
```

Default value:

```text
0
```

When greater than `0`, the holiday starts at `start` and lasts for the specified number of in-game days.

In this mode, `end` is ignored.

Example:

```json
{
  "term": "winter_solstice",
  "start": 0.25,
  "lasting_days": 2,
  "title": {
    "translate": "special_days.example.winter_festival"
  }
}
```

This means:

```text
Start when Winter Solstice reaches 25% progress
Continue for 2 in-game days
```

------

## title

The holiday title.

```json
"title": {
  "translate": "special_days.eclipticseasons.mid_autumn"
}
```

This field is required.

Translation keys are recommended.

------

## alternation

The holiday notification text.

```json
"alternation": {
  "translate": "special_days.eclipticseasons.mid_autumn.alternation"
}
```

This field is optional.

If omitted, no notification text will be displayed.

------

# start/end vs lasting_days

Special Days can be defined in two different ways.

## Using start and end

Suitable for holidays that occupy a percentage of a Solar Term.

```json
{
  "term": "white_dew",
  "start": 0.7,
  "end": 1.0,
  "title": {
    "translate": "special_days.example.mid_autumn"
  }
}
```

The duration automatically scales with the length of the Solar Term.

Longer Solar Terms result in longer holiday durations.

------

## Using lasting_days

Suitable for holidays that should last a fixed number of in-game days.

```json
{
  "term": "winter_solstice",
  "start": 0.25,
  "lasting_days": 2,
  "title": {
    "translate": "special_days.example.christmas"
  }
}
```

The duration remains fixed regardless of Solar Term length.

------

# Built-in Examples

Ecliptic Seasons includes several built-in Special Days:

- Spring Festival
- Flower Festival
- Spring Outing
- Easter
- Chinese Valentine's Day
- Mid-Autumn Festival
- Christmas
- New Year

These holidays are all based on Solar Term progression rather than real-world dates.

------

# Integration with Background Music

Special Days can be referenced by Seasonal Background Music.

Example:

```json
{
  "special_days": [
    "eclipticseasons:mid_autumn"
  ],
  "music": {
    "default": {
      "sound": "eclipticseasons:music.mid_autumn",
      "min_delay": 1000,
      "max_delay": 25000
    }
  }
}
```

This means:

```text
When Mid-Autumn Festival is active
→ Use the Mid-Autumn music track
```

The same approach can be used by other datapack systems that support Special Day conditions.

------

# Notes

- Special Days are based on Solar Terms rather than real-world dates.
- `term` is required.
- `start` and `end` use Solar Term progress values between `0.0` and `1.0`.
- When `lasting_days` is greater than `0`, the system uses a fixed duration and ignores `end`.
- Special Days primarily provide a holiday marker that can be referenced by other systems such as music, notifications, or custom datapack content.