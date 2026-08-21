# 气候与世界规则

动态注册表文件位于 `data/<命名空间>/eclipticseasons/<类型>/`。

| 类型 | 用途 | 需求程度 |
|---|---|---|
| `biome_climate_setting` | 修改群系随节气变化的温度、降水量等气候值 | 常用 |
| `weather_dimension` | 为维度指定统一天气所使用的核心群系 | 常用 |
| `biome_rain` | 定义核心群系在各节气的晴雨参数 | 进阶 |
| `agro_climate` | 把全局节气映射为地区农业季节 | 进阶 |
| `snow_term` | 指定群系允许降雪的节气区间 | 常用 |
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

下面是只调整雨水节气的最小示例：

```json
{
  "biomes": "#c:is_temperate/overworld",
  "weathers": {
    "solar_terms": {
      "rain_water": {
        "rain": {
          "min_inclusive": 16000,
          "max_inclusive": 24000,
          "type": "minecraft:uniform"
        },
        "rain_delay": {
          "min_inclusive": 32000,
          "max_inclusive": 50000,
          "type": "minecraft:uniform"
        },
        "thunder": {
          "min_inclusive": 6000,
          "max_inclusive": 12000,
          "type": "minecraft:uniform"
        },
        "rain_chance": 0.5,
        "thunder_chance": 0.32,
        "special_effect": "eclipticseasons:light_rain_snow",
        "snow_melt_speed": 0.85
      }
    }
  }
}
```

| 字段 | 含义 |
|---|---|
| `rain_chance` | 晴天计时结束后进入降雨的基础概率；还会乘群系降水量和配置倍率 |
| `rain` | 成功开始降雨后的基础持续时间范围 |
| `rain_delay` | 本次没有开始降雨时的下一次检查间隔 |
| `thunder_chance` | 降雨期间进入雷暴的基础概率 |
| `thunder` / `thunder_delay` | 雷暴持续时间和未触发时的间隔 |
| `special_effect` | 雨雪纹理、雾等天气表现引用 |
| `snow_accumulation_speed` / `snow_melt_speed` | 该天气曲线的积雪、融雪倍率 |
| `time_periods`、`weight` | 同一节气存在多个候选天气时，限制时段并设置抽取权重 |

时间字段使用刻值提供器，但运行时还会除以维度的 weather tick factor，所以它们是用于相对调节的基础值，不应当成最终精确持续刻数。

!!! tip "覆盖默认曲线"
    默认曲线 ID 是 `eclipticseasons:better_plains`。想完整替换主世界天气时，使用同 ID 覆盖并保留 24 个节气；只增加另一个能匹配平原的文件可能产生覆盖顺序问题。

## 群系降雪节气（`snow_term`）

`snow_term` 决定一个群系从哪个节气开始、到哪个节气结束可以下雪；它不是方块覆雪模型。文件位置为：

`data/<命名空间>/eclipticseasons/snow_term/<名称>.json`

```json
{
  "biomes": "minecraft:plains",
  "start": "heavy_snow",
  "end": "greater_cold"
}
```

`biomes` 可填写群系 ID 或 `#群系标签`；`start` 与 `end` 均包含在区间内，跨年区间也是有效的。`none` / `none` 表示不开放降雪窗口。

启用配置 `DynamicSnowTerm` 后，可按每年的温度偏移选择更短的备用窗口：

```json
{
  "biomes": "minecraft:sunflower_plains",
  "start": "heavy_snow",
  "end": "greater_cold",
  "events": [
    { "temp_offset": 0.1, "start": "none", "end": "none" }
  ]
}
```

运行时按 `events` 的书写顺序检查；首个满足 `temp_offset > 当年温度偏移` 的事件会替代基础区间。未启用 `DynamicSnowTerm` 或没有事件命中时，使用顶层 `start` / `end`。

??? example "源码示例位置"
    - 最小固定区间：`src/generated/server_resources/resourcepacks/example/data/eclipticseasons/eclipticseasons/snow_term/plain.json`
    - 带动态事件：同目录的 `sunflower_plains.json`
    - 完整冷、暖、热地区方案：`src/generated/server_resources/resourcepacks/Regional Snow Time/data/eclipticseasons/eclipticseasons/snow_term/agro/`

    `Regional Snow Time` 是最适合整合包作者复制后修改的完整范例；它分别以 `#eclipticseasons:agro/cold`、`warm`、`hot` 为目标，并提供多档 `temp_offset`。

## 覆雪方块（`snow_definitions`）

```json
{
  "blocks": "minecraft:sugar_cane",
  "flag": 1200,
  "offset": 1,
  "mid": "eclipticseasons:snowy/sugar_cane"
}
```

保存为 `snow_definitions/<名称>.json`。`mid` 指向资源包模型定义；新方块通常还需要客户端资源包规则。

`flag` 是互斥的模型模式编号，**不是可相加的位标志**。新数据通常使用以下模式：

| `flag` | 含义 | 典型用途 |
|---:|---|---|
| `1000` | 单个自定义覆雪模型；默认值 | 普通方块 |
| `1001` | 植物型单模型，保留着色器摇摆类别 | 花、作物、幼苗 |
| `1100` | 上部与下部使用两个模型 | 竹子等可穿雪的高方块；`mid` 为上部，`mid2` 为下部 |
| `1101` | 双模型的树叶版本，并自动视作可穿雪 | 特殊树叶 |
| `1200` | 忽略随机模型偏移的藤蔓型单模型 | 甘蔗、藤蔓状方块 |

源码还保留 `1` 方块、`2` 下半砖、`3` 楼梯、`301` 上楼梯、`4` 树叶、`5` 矮草、`501` 高草、`6` 耕地、`7` 藤蔓、`998` 自定义 AO、`999` 内置自定义模型等内部模式。它们依赖模组内置模型分派，新兼容包优先使用上表的 JSON 模式。

| 字段 | 含义 |
|---|---|
| `blocks` | 方块 ID 或 `#方块标签` |
| `properties` | 可选的方块状态筛选列表；全部条件都满足才使用该定义 |
| `properties[].name` | 方块状态属性名 |
| `properties[].matcher.value` | 精确匹配属性字符串值 |
| `properties[].matcher.minTime` / `maxTime` | 整数属性的闭区间；`ignore_min` / `ignore_max` 可忽略一端 |
| `properties[].reverse` | `true` 时反转这一条匹配结果 |
| `mid` / `mid2` | 客户端 `model_definitions` ID；双模型模式分别对应上部与下部 |
| `offset` | 传给模型选择逻辑的层级偏移；植物常用 `1` |
| `ignore_offset` | 忽略模型随机位置偏移 |
| `snow_passable` | 允许覆雪表现穿过/覆盖该方块的额外标记 |

??? example "覆雪数据与模型示例位置"
    - 甘蔗（`1200`）：`src/generated/server_resources/data/eclipticseasons/eclipticseasons/snow_definitions/snowy_sugar_cane.json`
    - 竹子双模型（`1100`）：同目录的 `snowy_bamboo.json`
    - 带状态筛选的浆果丛：同目录的 `snowy_sweet_berry_bush.json`
    - 花、作物和高株植物全集：`src/generated/server_resources/resourcepacks/extra_snow/data/eclipticseasons/eclipticseasons/snow_definitions/`
    - 与 `mid` 对应的客户端定义：`src/generated/resources/assets/eclipticseasons/eclipticseasons/model_definitions/snowy/`

    制作第三方兼容时，应同时复制一个服务端 `snow_definitions` 例子和它引用的客户端 `model_definitions` / `models` 资源，再替换方块与模型 ID。

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
