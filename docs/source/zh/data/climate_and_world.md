# 气候与世界规则

这些文件都位于 `data/<命名空间>/eclipticseasons/<类型>/`。从最接近目标的一类开始，不必同时覆盖全部系统。

| 类型 | 主要用途 |
|---|---|
| `agro_climate` | 把全局节气映射为地区农业季节 |
| `biome_climate_setting` | 修改群系随节气变化的温度、降水等气候值 |
| `biome_rain` | 设置局部天气的持续时间、间隔、概率与效果 |
| `season_cycle` / `season_phase` | 自定义日历显示与阶段 |
| `snow_definitions` | 为方块配置覆雪模型引用 |
| `special_days` | 在一年中的指定区间显示特殊日期 |

## 修改群系气候

`biome_climate_setting/savanna.json` 的最小形式：

```json
{
  "downfall_changes": {
    "solar_terms": {
      "beginning_of_summer": 0.2,
      "greater_heat": 0.533
    }
  },
  "biomes": "#c:is_savanna"
}
```

## 修改局部天气

`biome_rain/<名称>.json` 以 `solar_terms` 为键保存每个节气的天气参数：

```json
{
  "biomes": "#c:is_temperate/overworld",
  "weathers": {
    "solar_terms": {
      "rain_water": {
        "rain": { "min_inclusive": 16000, "max_inclusive": 24000, "type": "minecraft:uniform" },
        "rain_delay": { "min_inclusive": 32000, "max_inclusive": 50000, "type": "minecraft:uniform" },
        "rain_chance": 0.5,
        "thunder_chance": 0.32,
        "special_effect": "eclipticseasons:light_rain_snow",
        "snow_melt_speed": 0.85
      }
    }
  }
}
```

时间单位为游戏刻。只写需要改变的节气，避免复制整份默认表。

## 覆雪方块

服务端数据 `snow_definitions/<名称>.json` 决定方块与模型定义的关联：

```json
{
  "blocks": "minecraft:sugar_cane",
  "flag": 1200,
  "offset": 1,
  "mid": "eclipticseasons:snowy/sugar_cane"
}
```

`mid` 指向资源包中的模型定义。仅改视觉时不要覆盖这里。

## 特殊日期

```json
{
  "start": 0.7,
  "end": 0.85,
  "term": "winter_solstice",
  "title": { "translate": "special_days.example.new_year" }
}
```

`start`、`end` 是指定节气内部的相对区间。复杂的农业气候映射和 `season_phase` 建议从模组生成资源复制一个最接近的文件后删减，而不是手写 24 节气全集。
