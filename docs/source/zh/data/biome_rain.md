# 维度天气参数（Biome Rain）

`biome_rain` 是 Ecliptic Seasons 用于定义季节天气行为的数据包系统。

虽然注册表名称仍然叫做 `biome_rain`，但它已经不再表示“每个生物群系拥有完全独立的天气”。

在当前版本中，天气最终会写入 Minecraft 的**维度级天气数据**，因此同一维度中的所有位置共享同一个天气状态。

```text
一个维度
=
一种天气状态
```

这种设计大幅提升了与原版机制以及依赖 Minecraft 原生天气系统模组的兼容性。

------

# 当前天气模型

生物群系天气定义仍然作为天气参数来源存在。

系统会读取各个天气定义中的参数，但最终结果会作用于整个维度：

- 降雨
- 雷暴
- 晴天天气持续时间
- 雨天天气持续时间
- 雷暴持续时间

因此，现在应当将 `biome_rain` 理解为：

```text
维度天气参数
```

而不是：

```text
每个生物群系独立模拟天气
```

------

# 平原天气模板

主世界天气系统会使用：

```text
minecraft:plains
```

对应的天气定义作为重要的参数来源。

因此，制作天气数据包时，应始终确保存在：

```text
minecraft:plains
```

对应的有效天气定义。

不要只为自定义生物群系定义天气而忽略平原，否则天气生成可能出现异常行为。

------

# 文件位置

Biome Rain 配置文件为 JSON 文件。

放置路径：

```text
data/<namespace>/eclipticseasons/biome_rain
```

------

# 基础示例

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

该配置为平原提供了按季节变化的天气参数。

------

# biomes

用于指定哪些生物群系关联到该天气参数集。

单个生物群系：

```json
"biomes": "minecraft:plains"
```

生物群系标签：

```json
"biomes": "#c:is_temperate/overworld"
```

与旧版本不同，这个字段不应理解为：

```text
每个生物群系拥有独立天气
```

而应理解为：

```text
哪些生物群系使用或提供该天气定义
```

对于主世界天气系统，强烈建议至少有一个定义包含：

```text
minecraft:plains
```

------

# 天气映射

`weathers` 使用 SolarTermValueMap（节气映射系统）。

支持四种层级：

```text
default
seasons
sub_seasons
solar_terms
```

------

## default

所有节气共享同一套天气参数。

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

适合简单天气配置。

------

## seasons

按季节定义天气。

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

这是大多数数据包推荐的方式。

------

## sub_seasons

按子季节定义天气。

每个季节划分为三个阶段：

```text
early_spring  初春
mid_spring    仲春
late_spring   暮春

early_summer  初夏
mid_summer    仲夏
late_summer   暮夏

early_autumn  初秋
mid_autumn    仲秋
late_autumn   暮秋

early_winter  初冬
mid_winter    仲冬
late_winter   暮冬
```

示例：

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

可以实现更加平滑的季节过渡。

------

## solar_terms

按具体节气定义天气。

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

提供最高精度的控制能力。

------

# 映射优先级

同时定义多个层级时，优先级如下：

```text
solar_terms
>
sub_seasons
>
seasons
>
default
```

即：

```text
节气
>
子季节
>
季节
>
默认值
```

系统会自动选择最具体的匹配项。

------

# 天气参数

## rain_chance

降雨概率。

```json
"rain_chance": 0.5
```

数值越大，下雨越频繁。

------

## thunder_chance

雷暴概率。

```json
"thunder_chance": 0.2
```

默认值：

```text
0.0
```

数值越大，雷暴越频繁。

------

## rain

降雨持续时间。

```json
"rain": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 12000,
    "max_inclusive": 24000
  }
}
```

单位：游戏刻（tick）。

------

## rain_delay

两次降雨之间的间隔。

```json
"rain_delay": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 24000,
    "max_inclusive": 72000
  }
}
```

单位：tick。

------

## thunder

雷暴持续时间。

```json
"thunder": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 6000,
    "max_inclusive": 12000
  }
}
```

单位：tick。

------

## thunder_delay

两次雷暴之间的间隔。

```json
"thunder_delay": {
  "type": "minecraft:uniform",
  "value": {
    "min_inclusive": 48000,
    "max_inclusive": 96000
  }
}
```

单位：tick。

------

## special_effect

自定义天气效果。

```json
"special_effect": "eclipticseasons:light_rain_snow"
```

可用于：

- 暴风雪
- 雾天
- 雨夹雪
- 自定义天气视觉效果

------

## snow_accumulation_speed

积雪速度倍率。

```json
"snow_accumulation_speed": 0.85
```

默认：

```text
1.0
```

数值越小，积雪越慢。

------

## snow_melt_speed

融雪速度倍率。

```json
"snow_melt_speed": 1.2
```

默认：

```text
1.0
```

数值越大，融雪越快。

------

# 天气特效

自定义天气特效定义位置：

```text
data/<namespace>/eclipticseasons/biome_rain_effect
```

例如：

- 雾天
- 暴风雪
- 复合天气效果

------

# Biome Rain 标签

仍然支持天气标签系统。

常见标签：

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

其主要作用已经从：

```text
独立生物群系天气
```

转变为：

```text
气候分类
+
湿度修正
```

其中：

- `rain/rainless`：无雨气候
- `rain/monsoonal`：季风气候（明显旱季与雨季）
- 其他标签主要参与湿度与气候计算

------

# 沙漠与恶地

默认情况下，原版无雨生物群系仍保持无雨。

包括：

```text
Deserts（沙漠）
Badlands（恶地）
```

除非数据包显式修改，否则这些地区不会降雨。

------

# 小型生物群系

```text
eclipticseasons:is_small
```

是内部使用的特殊标签。

用于标记面积非常小的生物群系。

大多数数据包作者无需使用。

------

# 推荐配置方式

对于大多数数据包，仅调整以下参数即可：

```text
rain_chance
thunder_chance
rain
rain_delay
special_effect
snow_accumulation_speed
snow_melt_speed
```

同时确保：

```text
minecraft:plains
```

拥有有效天气定义。

推荐设计理念：

```text
共享维度天气
+
季节性天气参数
+
可选特殊效果
```

这样既能保留季节变化，又能获得最佳兼容性。

------

# 注意事项

- 不再使用独立生物群系天气系统。
- 同一维度内所有位置共享天气状态。
- `biome_rain` 现在只是天气参数来源。
- 主世界天气定义应始终包含 `minecraft:plains`。
- 降雨仍然会参与湿度计算。
- 原版无雨生物群系默认保持无雨。
- 对于大多数数据包，调整标签与概率通常比编写复杂天气表更合适。