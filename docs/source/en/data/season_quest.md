# Seasonal Trades (Season Quest)

`season_quest` is a legacy name.

In current versions of Ecliptic Seasons, it is no longer used as a full quest system. Instead, it is used to add season-limited trades to the Wandering Trader.

Players can exchange specific items for seasonal rewards during certain Solar Terms, such as Greenhouse Essences and other season-related resources.

---

# File Location

Seasonal trades are defined as JSON files.

Place them in:

```text
data/<namespace>/eclipticseasons/season_quest
```

---

# Basic Example

```json
{
  "start": "spring_equinox",
  "end": "beginning_of_summer",
  "need": [
    {
      "items": "minecraft:wheat",
      "count": 48
    },
    {
      "items": "minecraft:emerald",
      "count": 16
    }
  ],
  "award": [
    {
      "id": "eclipticseasons:spring_greenhouse_essence",
      "Count": 1
    }
  ],
  "max_count": 1
}
```

This example allows the Wandering Trader to occasionally offer the following trade between the Spring Equinox and Beginning of Summer:

```text
48 Wheat + 16 Emeralds → 1 Spring Greenhouse Essence
```

---

# Fields

## start

The Solar Term when the trade becomes available.

```json
"start": "spring_equinox"
```

The trade will not appear before this Solar Term.

---

## end

The Solar Term when the trade expires.

```json
"end": "beginning_of_summer"
```

The trade will no longer appear after this Solar Term.

---

## need

The items required for the trade.

```json
"need": [
  {
    "items": "minecraft:wheat",
    "count": 48
  }
]
```

These entries are converted into Wandering Trader trade costs.

---

## Trade Cost Limit

Although `need` is defined as a list, only the first two entries can be used.

* The first entry becomes the primary trade cost.
* The second entry becomes the optional secondary trade cost.
* Any additional entries are ignored.

For this reason, it is recommended to use only one or two cost items.

---

## Stack Size Limit

Trade costs are converted into vanilla villager trade costs.

Because of this, the `count` value for each cost item should not exceed that item's maximum stack size.

For example, wheat stacks to 64 and should not be written as:

```json
{
  "items": "minecraft:wheat",
  "count": 640
}
```

Instead:

```json
{
  "items": "minecraft:wheat",
  "count": 48
}
```

If a higher cost is required, use two cost items instead. Each entry must still respect its own maximum stack size.

---

## award

The reward item.

```json
"award": [
  {
    "id": "eclipticseasons:spring_greenhouse_essence",
    "Count": 1
  }
]
```

Only the first reward entry is currently used as the trade result.

It is therefore recommended to define a single reward item.

---

## max_count

The maximum number of times the trade can be used.

```json
"max_count": 1
```

Default value:

```text
1
```

---

# Availability

A seasonal trade is not guaranteed to appear.

A trade must satisfy all of the following conditions:

* The current Solar Term is between `start` and `end`
* The Wandering Trader selects the trade during generation
* The random chance check succeeds

As a result, a valid trade may not appear every time a Wandering Trader spawns.

---

# Recommended Uses

This system is best suited for lightweight seasonal exchanges.

Common examples include:

* Greenhouse Essence acquisition
* Seasonal crafting materials
* Limited-time seasonal rewards
* Alternative progression paths for single-player worlds

For modpacks with dedicated progression systems, consider using:

* FTB Quests
* Boss drops
* Server shops
* Custom loot tables

instead.

---

# Notes

`season_quest` is a legacy name.

In current versions, it functions as a seasonal Wandering Trader trade table rather than a full quest system.

Legacy quest-related fields are no longer recommended for new datapacks. New definitions should focus only on the fields that are actively used by the trade conversion system.
