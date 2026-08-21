# 气候与世界规则

动态注册表文件位于 `data/<命名空间>/eclipticseasons/<类型>/`。

| 类型 | 用途 | 需求程度 |
|---|---|---|
| `biome_climate_setting` | 修改群系随节气变化的温度、降水量等气候值 | 常用 |
| `weather_dimension` | 为维度指定统一天气所使用的核心群系 | 常用 |
| `biome_rain` | 定义核心群系在各节气的晴雨参数 | 进阶 |
| `agro_climate` | 把全局节气映射为地区农业季节 | 进阶 |
| `snow_definitions` | 让新方块引用覆雪模型 | 常用 |
| `season_cycle` / `season_phase` | 自定义日历阶段 | 进阶 |
| `special_days` | 定义特殊日期 | 可选 |

## 群系气候

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

保存为 `biome_climate_setting/<名称>.json`。只填写需要改变的气候属性和节气。

## 维度统一天气

当前天气不是按群系独立运行。模组始终注册并默认启用内置 **Rain Together** 数据包，其中的 `data/rain_together/eclipticseasons/weather_dimension/plains.json` 为：

```json
{
  "core": "minecraft:plains",
  "dimension": "minecraft:overworld"
}
```

这个文件把平原设为主世界的天气核心。平原匹配 `biome_rain/better_plains.json` 后得到节气天气曲线，其结果会赋给主世界其他群系。

自定义规则同样保存为 `weather_dimension/<名称>.json`。若为其他启用季节的维度增加规则，应选择该维度确实存在且气候行为合适的核心群系。

`biome_rain/<名称>.json` 仍可定义节气降雨概率、持续时间、间隔、雷暴和融雪倍率，但在当前模型中应把它理解为**核心群系的全维度天气参数**，而不是局部天气配置。

## 覆雪方块

```json
{
  "blocks": "minecraft:sugar_cane",
  "flag": 1200,
  "offset": 1,
  "mid": "eclipticseasons:snowy/sugar_cane"
}
```

保存为 `snow_definitions/<名称>.json`。`mid` 指向资源包模型定义；新方块通常还需要客户端资源包规则。

## 特殊日期

```json
{
  "start": 0.7,
  "end": 0.85,
  "term": "winter_solstice",
  "title": { "translate": "special_days.example.new_year" }
}
```

复杂的 `agro_climate`、`season_cycle` 和 `season_phase` 应从当前生成资源复制最接近的例子并删减。

!!! warning "不再支持 Local Weather"
    `hasLocalWeather` 固定为 `false`。不要把 `biome_rain` 写成“每个群系独立下雨”；它与 `weather_dimension` 共同控制核心群系驱动的维度统一天气。
