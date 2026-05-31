# Make Your Trees Transition Smoothly Between Seasons

This tutorial explains how to use:

* `transition_textures`
* `transition_models`

to create smoother seasonal transitions for leaves, flowers, and plant models.

![seasonal\_tree\_transitions.webp](../../_static/image/seasonal_tree_transitions.webp)

## transition_textures

`transition_textures` allows textures to gradually transition from one appearance to another during a solar term.

It is used inside `season_textures` files.

Location:

```text
assets/<namespace>/eclipticseasons/season_textures/<file>.json
```

Example:

```text
assets/example/eclipticseasons/season_textures/cherry_leaves.json
```

## File Structure

```json
{
  "target": "minecraft:block/cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "solar_term": "beginning_of_autumn",
      "transition_textures": [
        [
          {
            "all": "example:block/cherry_leaves_summer"
          },
          {
            "all": "example:block/cherry_leaves_autumn"
          }
        ]
      ],
      "tint": {
        "#all": -1
      }
    }
  ]
}
```

## Field Reference

### target

Specifies the model whose textures will be replaced.

```json
"target": "minecraft:block/cherry_leaves"
```

### solar_term

Specifies the solar term during which the transition occurs.

```json
"solar_term": "beginning_of_autumn"
```

### transition_textures

Must be written as a nested array.

```json
"transition_textures": [
  [
    {
      "all": "example:block/cherry_leaves_summer"
    },
    {
      "all": "example:block/cherry_leaves_autumn"
    }
  ]
]
```

The inner array must contain exactly two texture definitions:

```text
First entry: texture used at the start of the transition
Second entry: texture used at the end of the transition
```

### tint

Controls tinting behavior.

```json
"tint": {
  "#all": -1
}
```

If your texture already contains the desired colors, `-1` is usually recommended to disable biome tinting.

## Complete Example: Summer Leaves Transitioning into Autumn Leaves

```json
{
  "target": "minecraft:block/cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "season": "summer",
      "textures": {
        "all": "example:block/cherry_leaves_summer"
      },
      "tint": {
        "#all": -1
      }
    },
    {
      "solar_term": "beginning_of_autumn",
      "transition_textures": [
        [
          {
            "all": "example:block/cherry_leaves_summer"
          },
          {
            "all": "example:block/cherry_leaves_autumn"
          }
        ]
      ],
      "tint": {
        "#all": -1
      }
    },
    {
      "season": "autumn",
      "textures": {
        "all": "example:block/cherry_leaves_autumn"
      },
      "tint": {
        "#all": -1
      }
    }
  ]
}
```

---

# transition_models

`transition_models` allows an entire model to transition into another model during a solar term.

It is used inside `season_definitions` files.

Location:

```text
assets/<namespace>/eclipticseasons/season_definitions/<file>.json
```

Example:

```text
assets/example/eclipticseasons/season_definitions/cherry_leaves.json
```

## File Structure

```json
{
  "blocks": "minecraft:cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "solar_term": "spring_equinox",
      "transition_models": [
        "example:cherry_leaves_spring_0",
        "example:cherry_leaves_spring_1"
      ]
    }
  ]
}
```

## Field Reference

### blocks

Specifies the block that will use seasonal models.

```json
"blocks": "minecraft:cherry_leaves"
```

### solar_term

Specifies the solar term during which the transition occurs.

```json
"solar_term": "spring_equinox"
```

### transition_models

An array containing two model definition IDs.

```json
"transition_models": [
  "example:cherry_leaves_spring_0",
  "example:cherry_leaves_spring_1"
]
```

Meaning:

```text
First ID: model definition used at the start of the transition
Second ID: model definition used at the end of the transition
```

Both IDs must be defined in `model_definitions`.

---

# Creating model_definitions

Location:

```text
assets/<namespace>/eclipticseasons/model_definitions/<file>.json
```

For example:

```text
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_0.json
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_1.json
```

`cherry_leaves_spring_0.json`

```json
{
  "variants": {
    "": {
      "model": "example:block/cherry_leaves_spring_0"
    }
  },
  "replace": true
}
```

`cherry_leaves_spring_1.json`

```json
{
  "variants": {
    "": {
      "model": "example:block/cherry_leaves_spring_1"
    }
  },
  "replace": true
}
```

Then create the corresponding block models:

```text
assets/example/models/block/cherry_leaves_spring_0.json
assets/example/models/block/cherry_leaves_spring_1.json
```

`cherry_leaves_spring_0.json`

```json
{
  "parent": "minecraft:block/leaves",
  "textures": {
    "all": "example:block/cherry_leaves_spring_0"
  }
}
```

`cherry_leaves_spring_1.json`

```json
{
  "parent": "minecraft:block/leaves",
  "textures": {
    "all": "example:block/cherry_leaves_spring_1"
  }
}
```

Finally, add the textures:

```text
assets/example/textures/block/cherry_leaves_spring_0.png
assets/example/textures/block/cherry_leaves_spring_1.png
```

---

# Complete Example: Cherry Blossoms Blooming During the Spring Equinox

File:

```text
assets/example/eclipticseasons/season_definitions/cherry_leaves.json
```

Contents:

```json
{
  "blocks": "minecraft:cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "season": "spring",
      "mid": "example:cherry_leaves_spring_0"
    },
    {
      "solar_term": "spring_equinox",
      "transition_models": [
        "example:cherry_leaves_spring_0",
        "example:cherry_leaves_spring_1"
      ]
    },
    {
      "start": "clear_and_bright",
      "end": "grain_rain",
      "mid": "example:cherry_leaves_spring_1"
    }
  ]
}
```

This example means:

```text
Spring uses cherry_leaves_spring_0
During the Spring Equinox, the model transitions from cherry_leaves_spring_0 to cherry_leaves_spring_1
From Clear and Bright to Grain Rain, cherry_leaves_spring_1 remains active
```

---

# Common Mistakes

## Missing the Extra Array Layer in transition_textures

Incorrect:

```json
"transition_textures": [
  {
    "all": "example:block/cherry_leaves_summer"
  },
  {
    "all": "example:block/cherry_leaves_autumn"
  }
]
```

Correct:

```json
"transition_textures": [
  [
    {
      "all": "example:block/cherry_leaves_summer"
    },
    {
      "all": "example:block/cherry_leaves_autumn"
    }
  ]
]
```

## Missing model_definitions for transition_models

If you write:

```json
"transition_models": [
  "example:cherry_leaves_spring_0",
  "example:cherry_leaves_spring_1"
]
```

you must also create:

```text
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_0.json
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_1.json
```

## Incorrect Texture Paths

If your model contains:

```json
"all": "example:block/cherry_leaves_summer"
```

the actual texture file must be:

```text
assets/example/textures/block/cherry_leaves_summer.png
```

Do not include the `.png` extension in model references.

---

# Which One Should I Use?

Only changing textures:

```text
Use transition_textures
```

Changing the entire model:

```text
Use transition_models
```

Want fewer files and easier maintenance:

```text
Prefer season_textures + transition_textures
```

Need maximum control over seasonal appearance:

```text
Use season_definitions + transition_models
```

One important note: resource packs should generally choose either `season_textures` or `season_definitions` for a particular seasonal asset. They are alternative approaches, not complementary systems that are meant to be used together on the same model. This is especially important for users migrating from simple texture replacement to full seasonal model definitions.
