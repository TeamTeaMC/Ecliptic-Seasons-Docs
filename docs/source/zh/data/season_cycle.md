# 自定义日历显示

本章节介绍如何自定义 Ecliptic Seasons 中的日历显示与节气提示文本。

该功能主要用于实现特殊地区的季节表现，例如：

* 雨季 / 旱季
* 永秋
* 长冬
* 自定义地区季节名称

> 注意：
>
> 本功能仅影响日历界面和节气提示的显示内容。
>
> 它不会改变实际的季节推进、天气、温度、作物生长、降雪判定或其他游戏机制。

---

# 基本概念

自定义日历显示由两部分组成：

* 季节阶段（Season Phase）
* 季节映射（Season Cycle）

通常需要同时使用。

## 季节阶段（Season Phase）

季节阶段用于定义一个可显示的阶段。

例如：

* 湿季
* 旱季
* 永秋
* 长冬

它决定了：

* 显示名称
* 图标
* 颜色
* 字体图标
* 所属季节

## 季节映射（Season Cycle）

季节映射用于指定：

> 某个群系在当前节气下应该显示哪个季节阶段。

例如热带季风地区：

* 部分时间显示旱季
* 部分时间显示雨季
* 部分时间显示湿季

玩家看到的日历和节气提示会发生变化，但实际气候系统不会受到影响。

---

# 创建季节阶段

季节阶段文件放置于：

```text
data/<命名空间>/eclipticseasons/season_phase
```

示例：

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

该文件定义了一个名为 `wet` 的季节阶段。

---

# 本地化文本

`name` 字段需要对应的语言文件支持。

例如：

```json
{
  "info.eclipticseasons.environment.season_phase.wet": "湿季",
  "info.eclipticseasons.environment.season_phase.pattern.wet": "%s（全年）",
  "info.eclipticseasons.environment.season_phase.alternation.wet": "水汽沉沉，湿热难耐。"
}
```

其中：

| 键名               | 作用     |
| ---------------- | ------ |
| season_phase.wet | 阶段名称   |
| pattern.wet      | 日历显示格式 |
| alternation.wet  | 节气提示文本 |

---

# 图标设置

最简单的方式是直接提供独立图标：

```json
{
  "icon": {
    "texture": "eclipticseasons:season_phase/wet_middle"
  }
}
```

推荐使用独立的 30×30 图标。

---

如果需要使用图集，可以指定：

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

这种方式适用于多个阶段共用一张图集。

---

# 创建季节映射

季节映射文件放置于：

```text
data/<命名空间>/eclipticseasons/season_cycle
```

默认情况下该功能不会启用，需要在配置中手动开启。

季节映射用于指定：

> 某些群系在特定节气时应该显示哪个季节阶段。

示例：

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

上述示例会让 `#eclipticseasons:monsoonal` 标签中的群系显示自定义的雨季与旱季循环。

---

# biomes 字段

`biomes` 使用 HolderSet 格式。

支持单个群系：

```json
"biomes": "minecraft:savanna"
```

也支持群系标签：

```json
"biomes": "#eclipticseasons:monsoonal"
```

当多个群系共享同一种显示逻辑时，推荐使用标签。

---

# phases 字段

`phases` 使用 SolarTermMap 结构。

支持以下三种映射方式：

* solar_terms
* seasons
* default

---

## 按节气映射

适用于需要精确控制每一个节气显示效果的情况。

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

---

## 按季节映射

适用于整个季节统一显示的情况。

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

---

## 默认映射

当没有找到更具体规则时使用。

```json
{
  "phases": {
    "default": "eclipticseasons:wet"
  }
}
```

---

# 常见用途

## 雨季与旱季

适用于热带或季风地区。

玩家看到的将不再是春夏秋冬，而是湿季、雨季和旱季。

---

## 永秋地区

适用于特殊维度或幻想风格群系。

无论当前节气为何，日历始终显示秋季阶段。

---

## 自定义地区季节名称

不同地区可以拥有不同的显示名称。

例如：

* 温带地区显示二十四节气
* 热带地区显示雨季与旱季

从而实现不同地区的文化或气候表现。

---

# 注意事项

本功能仅用于修改显示内容。

不会影响：

* 实际节气推进
* 天气概率
* 温度计算
* 降雪逻辑
* 作物生长
* 温室系统
* 湿度系统

如果需要修改实际游戏行为，请使用对应的数据包配置或气候系统配置。

季节阶段与季节映射仅负责玩家看到的日历和节气提示内容。
