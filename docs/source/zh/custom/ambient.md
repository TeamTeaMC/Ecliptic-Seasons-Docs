# 季节环境音效

季节环境音效是一种仅客户端生效的资源包数据，用于根据当前季节、时间、天气和群系播放环境背景音。

该系统主要用于增强世界氛围，例如春季森林鸟鸣、夏季夜晚虫鸣、秋季风声或冬季风雪声。

与实时混音类音效模组不同，季节环境音效更偏向于持续的背景氛围补充。

---

# 文件路径

季节环境音效文件为 JSON 格式。

放置路径：

```text
assets/<命名空间>/eclipticseasons/ambient
```

---

# 基本示例

下面是一个春季森林环境音效示例：

```json
{
  "sound": "eclipticseasons:ambient.spring_forest",
  "season": "spring",
  "biomes": "#minecraft:is_forest",
  "rain": false
}
```

该配置表示：

```text
春季
+
森林群系
+
非降水天气

→ 播放 eclipticseasons:ambient.spring_forest
```

由于没有设置时间条件，因此白天和夜晚都会播放。

---

# 匹配逻辑

系统会依次检查：

* 室内状态
* 降水状态
* 季节或节气
* 时间条件
* 水中状态
* 群系条件
* 排除群系

只有全部条件满足时，该音效才会参与匹配。

如果多个音效同时满足条件，则会根据优先级选择最终播放的音效。

---

# 字段说明

## sound

需要播放的声音事件。

```json
"sound": "eclipticseasons:ambient.spring_forest"
```

该字段必填。

---

# 季节与节气

## season

限制音效出现的季节。

```json
"season": "spring"
```

可用值：

```text
spring
summer
autumn
winter
```

如果指定了 `season`，系统将直接按季节判断。

---

## start / end

限制音效出现的节气范围。

```json
"start": "spring_equinox",
"end": "grain_rain"
```

仅在未指定 `season` 时生效。

适用于需要精确控制节气范围的环境音。

例如：

```json
{
  "sound": "example:early_spring_birds",
  "start": "beginning_of_spring",
  "end": "insects_awakening"
}
```

---

# 时间控制

## ignore_time

是否忽略时间条件。

```json
"ignore_time": true
```

默认值：

```text
true
```

当为 `true` 时：

```text
白天和夜晚都会播放
```

如果希望根据时间变化播放不同音效，需要设置：

```json
"ignore_time": false
```

---

## day

用于区分白天和夜晚。

```json
"day": true
```

仅在：

```json
"ignore_time": false
```

时生效。

含义：

```text
true  = 白天
false = 夜晚
```

例如：

```json
{
  "sound": "example:night_crickets",
  "ignore_time": false,
  "day": false
}
```

表示仅夜晚播放。

---

## time_period

用于指定更精确的时间段。

```json
"time_period": "night"
```

可用值：

```text
dawn
day
dusk
night
midnight
```

对应：

| 值        | 时间段 |
| -------- | --- |
| dawn     | 早晨  |
| day      | 白天  |
| dusk     | 黄昏  |
| night    | 夜晚  |
| midnight | 午夜  |

如果指定了 `time_period`，系统将优先使用它，而不会再检查 `day`。

---

# 天气与环境

## rain

是否匹配降水状态。

```json
"rain": true
```

注意：

```text
rain=true
```

表示：

```text
仅在降水时播放
```

而：

```json
"rain": false
```

表示：

```text
仅在非降水时播放
```

默认值：

```text
false
```

---

## indoor

是否匹配室内状态。

```json
"indoor": true
```

匹配规则：

```text
true  → 仅室内
false → 仅室外
```

默认值：

```text
false
```

---

## inwater

是否匹配玩家处于水中的状态。

```json
"inwater": true
```

匹配规则：

```text
true  → 仅水中
false → 仅非水中
```

默认值：

```text
false
```

---

# 群系条件

## biomes

限制音效出现的群系。

单个群系：

```json
"biomes": "minecraft:forest"
```

群系标签：

```json
"biomes": "#minecraft:is_forest"
```

推荐使用群系标签管理多个群系。

如果为空，则不限制群系。

---

## ignored_biomes

排除指定群系。

```json
"ignored_biomes": "#c:is_cave"
```

匹配后不会播放该音效。

通常用于排除：

* 洞穴
* 特殊维度
* 特殊群系

---

# 优先级

## priority

音效优先级。

```json
"priority": 950
```

默认值：

```text
1000
```

当多个音效同时满足条件时：

```text
priority 数值越小
优先级越高
```

例如：

```text
950 优先于 1000
```

推荐：

* 通用背景音使用默认值
* 更具体的天气音效使用较小值
* 更具体的群系音效使用较小值

---

# 常见示例

## 夏季白天微风

```json
{
  "sound": "example:garden_wind",
  "season": "summer",
  "ignore_time": false,
  "day": true,
  "rain": false
}
```

---

## 夏季夜晚虫鸣

```json
{
  "sound": "example:night_crickets",
  "season": "summer",
  "ignore_time": false,
  "day": false,
  "rain": false
}
```

---

## 冬季风雪声

```json
{
  "sound": "example:winter_wind",
  "season": "winter",
  "rain": true,
  "priority": 950
}
```

---

# 使用建议

建议优先构建稳定的背景环境音。

例如：

* 春季森林鸟鸣
* 夏季白天风声
* 夏季夜晚虫鸣
* 秋季落叶与风声
* 冬季风雪声

对于大多数资源包而言，仅使用以下字段即可满足需求：

```text
sound
season
rain
biomes
ignored_biomes
ignore_time
day
priority
```

---

# 注意事项

* 该系统仅客户端生效。
* 不会改变天气、温度或季节逻辑。
* `rain`、`indoor`、`inwater` 均为严格匹配条件。
* `season` 与 `start/end` 不建议同时使用。
* `priority` 数值越小，优先级越高。
* 当多个规则同时满足时，系统会选择优先级最高（数值最小）的音效播放。
