# 特殊节日（Special Days）

特殊节日是一种数据包定义，用于在指定节气的某一段时间内标记特殊日期。

它可以用于：

- 显示节日标题
- 显示节日提示文本
- 触发节日背景音乐
- 被其他系统作为条件引用

需要注意的是，特殊节日并不直接绑定现实日期。

它们基于游戏内节气和当前节气进度计算。

------

# 文件路径

特殊节日是 JSON 数据文件。

放置路径：

```text
data/<命名空间>/eclipticseasons/special_days
```

------

# 基本示例

下面是一个中秋节示例：

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

该配置表示：

```text
白露节气进行到 70% 后
直到白露节气结束前

→ 当前时间被视为中秋节
```

------

# 字段说明

## term

节日所属的节气。

```json
"term": "white_dew"
```

该字段必填。

只有当前节气与 `term` 相同时，该节日才可能生效。

------

## start

节日在当前节气中的开始进度。

```json
"start": 0.7
```

取值范围：

```text
0.0 ~ 1.0
```

含义：

```text
0.0 = 当前节气开始
1.0 = 当前节气结束
```

例如：

```json
"start": 0.25
```

表示从该节气进行到 25% 时开始。

默认值：

```text
0.0
```

------

## end

节日在当前节气中的结束进度。

```json
"end": 1.0
```

取值范围：

```text
0.0 ~ 1.0
```

当 `lasting_days` 为 `0` 时，系统使用 `start` 与 `end` 判断节日范围。

默认值：

```text
0.0
```

------

## lasting_days

节日持续的游戏天数。

```json
"lasting_days": 2
```

默认值：

```text
0
```

当 `lasting_days` 大于 `0` 时，系统会从 `start` 指定的位置开始，持续指定天数。

此时判断逻辑不再依赖 `end`。

例如：

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

表示：

```text
冬至节气进行到 25% 后开始
持续 2 个游戏日
```

------

## title

节日标题。

```json
"title": {
  "translate": "special_days.eclipticseasons.mid_autumn"
}
```

该字段必填。

通常使用翻译键。

------

## alternation

节日提示文本。

```json
"alternation": {
  "translate": "special_days.eclipticseasons.mid_autumn.alternation"
}
```

该字段可选。

如果不填写，则为空文本。

------

# start / end 与 lasting_days 的区别

特殊节日有两种定义方式。

## 使用 start / end

适合定义占据节气某一段比例的节日。

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

这种方式会随着节气长度变化自动缩放。

例如节气长度越长，节日持续时间也越长。

------

## 使用 lasting_days

适合定义固定持续天数的节日。

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

这种方式不会按节气比例缩放，而是持续固定游戏日数。

------

# 默认节日示例

Ecliptic Seasons 默认提供了一些特殊节日，例如：

- Spring Festival
- Flower Festival
- Spring Outing
- Easter
- Chinese Valentine's Day
- Mid-Autumn Festival
- Christmas
- New Year

这些节日都基于节气进度，而不是现实世界日期。

------

# 与背景音乐联动

特殊节日可以被季节背景音乐引用。

例如：

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

该配置表示：

```text
当当前时间处于中秋节时
→ 使用中秋主题背景音乐
```

------

# 注意事项

- 特殊节日基于游戏内节气计算。
- 它不直接使用现实日期。
- `term` 是必填字段。
- `start` 和 `end` 使用当前节气进度，范围为 `0.0 ~ 1.0`。
- 当 `lasting_days` 大于 `0` 时，会使用固定持续天数判断，而不是使用 `end`。
- 特殊节日本身主要提供标记和显示，具体效果通常由其他系统引用。