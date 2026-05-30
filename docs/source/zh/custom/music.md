# 季节背景音乐

季节背景音乐是一种仅客户端生效的资源包数据，用于根据当前季节、节气、节日、时间和群系替换 Minecraft 原版背景音乐。

与季节环境音效不同，背景音乐不会持续循环播放环境声，而是用于控制 Minecraft 的音乐播放内容。

例如：

- 春季主题音乐
- 盛夏主题音乐
- 秋季主题音乐
- 圣诞节音乐
- 中秋节音乐

------

# 文件路径

季节背景音乐文件为 JSON 格式。

放置路径：

```text
assets/<namespace>/eclipticseasons/music
```

------

# 基本示例

下面是一个中秋节夜晚背景音乐示例：

```json
{
  "special_days": [
    "eclipticseasons:mid_autumn"
  ],
  "ignore_time": false,
  "day": false,
  "music": {
    "default": {
      "sound": "eclipticseasons:music.mid_autumn",
      "min_delay": 1000,
      "max_delay": 25000
    }
  }
}
```

该配置表示：

```text
中秋节
+
夜晚

→ 使用中秋主题背景音乐
```

------

# 匹配逻辑

系统会依次检查：

- 降水状态
- 季节或节气
- 特殊节日
- 时间条件
- 群系条件
- 排除群系

只有全部条件满足时，该音乐才会参与匹配。

如果多个音乐同时满足条件，则会根据优先级选择最终结果。

------

# 字段说明

## 季节与节气

### season

限制音乐出现的季节。

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

如果指定了 `season`，系统将直接按照季节判断。

------

### start / end

限制音乐出现的节气范围。

```json
"start": "spring_equinox",
"end": "grain_rain"
```

仅在未指定 `season` 且未指定 `special_days` 时生效。

适用于需要精确控制节气范围的音乐。

例如：

```json
{
  "start": "beginning_of_spring",
  "end": "insects_awakening"
}
```

------

# 特殊节日

## special_days

限制音乐仅在特定节日播放。

```json
{
  "special_days": [
    "eclipticseasons:christmas"
  ]
}
```

例如：

```json
{
  "special_days": [
    "eclipticseasons:christmas"
  ],
  "music": {
    "default": {
      "sound": "eclipticseasons:music.gacha_bells",
      "min_delay": 1000,
      "max_delay": 25000
    }
  }
}
```

表示：

```text
圣诞节期间
→ 播放圣诞主题音乐
```

当指定了 `special_days` 时，系统将优先检查节日条件。

------

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
白天和夜晚都会使用该音乐
```

------

## day

区分白天和夜晚。

```json
"day": false
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

------

## time_period

更精确的时间段控制。

```json
"time_period": "night"
```

支持：

```text
dawn
day
dusk
night
midnight
```

对应：

| 值       | 时间段 |
| -------- | ------ |
| dawn     | 早晨   |
| day      | 白天   |
| dusk     | 黄昏   |
| night    | 夜晚   |
| midnight | 午夜   |

如果设置了 `time_period`，系统将优先使用它，而不会再检查 `day`。

------

# 天气条件

## rain

是否匹配降水状态。

```json
"rain": true
```

默认值：

```text
false
```

匹配规则：

```text
rain=true
→ 仅降水时播放
rain=false
→ 仅非降水时播放
```

该字段是严格匹配条件。

------

# 群系条件

## biomes

限制音乐出现的群系。

单个群系：

```json
"biomes": "minecraft:forest"
```

群系标签：

```json
"biomes": "#minecraft:is_forest"
```

推荐使用群系标签管理多个群系。

------

## ignored_biomes

排除指定群系。

```json
"ignored_biomes": "#c:is_cave"
```

匹配后不会使用该音乐。

常用于排除：

- 洞穴
- 特殊维度
- 特殊群系

------

# 音乐定义

## music

背景音乐定义。

```json
{
  "music": {
    "default": {
      "sound": "example:music.spring",
      "min_delay": 2000,
      "max_delay": 25000,
      "replace_current_music": false
    }
  }
}
```

音乐定义支持三个部分：

```text
default
creative
underwater
```

分别对应：

- 普通背景音乐
- 创造模式音乐
- 水下音乐

如果未提供创造模式或水下音乐，将自动继承原版对应音乐。

------

## sound

音乐事件。

```json
"sound": "example:music.spring"
```

必填。

------

## min_delay

音乐之间的最短等待时间。

```json
"min_delay": 2000
```

单位为游戏刻（Ticks）。

------

## max_delay

音乐之间的最长等待时间。

```json
"max_delay": 25000
```

单位为游戏刻（Ticks）。

------

## replace_current_music

是否立即替换当前正在播放的音乐。

```json
"replace_current_music": false
```

默认值：

```text
false
```

通常建议保持默认值。

------

# 优先级

## priority

音乐优先级。

```json
"priority": 950
```

默认值：

```text
1000
```

当多个音乐规则同时满足条件时：

```text
priority 数值越小
优先级越高
```

例如：

```text
950 优先于 1000
```

推荐：

- 通用季节音乐使用默认值
- 节日音乐使用较小值
- 特殊群系音乐使用较小值

------

# 常见示例

## 春季音乐

```json
{
  "season": "spring",
  "music": {
    "default": {
      "sound": "example:music.spring",
      "min_delay": 2000,
      "max_delay": 25000
    }
  }
}
```

------

## 秋季音乐

```json
{
  "season": "autumn",
  "music": {
    "default": {
      "sound": "example:music.autumn",
      "min_delay": 2000,
      "max_delay": 25000
    }
  }
}
```

------

## 圣诞节音乐

```json
{
  "special_days": [
    "eclipticseasons:christmas"
  ],
  "priority": 900,
  "music": {
    "default": {
      "sound": "example:music.christmas",
      "min_delay": 1000,
      "max_delay": 25000
    }
  }
}
```

------

# 使用建议

推荐使用：

- 春夏秋冬四季主题音乐
- 节日专属音乐
- 特殊群系音乐

对于大多数资源包而言，仅使用以下字段即可满足需求：

```text
season
special_days
rain
biomes
ignored_biomes
music
priority
```

------

# 注意事项

- 该系统仅客户端生效。
- 会替换 Minecraft 原版背景音乐。
- `rain` 为严格匹配条件。
- `priority` 数值越小优先级越高。
- `special_days` 的优先级高于节气范围判断。
- 如果多个规则同时满足，系统会选择优先级最高（数值最小）的音乐。