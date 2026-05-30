# 季节商人交易（Season Quest）

`season_quest` 是历史遗留名称。

在当前版本中，它不再作为完整任务系统使用，而是用于向流浪商人添加季节限定交易。

玩家可以在特定节气期间，从流浪商人处使用指定物品交换季节相关奖励，例如温室核心精华。

------

# 文件路径

季节商人交易是 JSON 数据文件。

放置路径为：

```text
data/<命名空间>/eclipticseasons/season_quest
```

------

# 基本示例

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

上述配置会让流浪商人在春分至立夏期间有机会提供以下交易：

```text
48 Wheat + 16 Emeralds → 1 Spring Greenhouse Essence
```

------

# 字段说明

## start

交易开始出现的节气。

```json
"start": "spring_equinox"
```

当当前节气早于该值时，交易不会出现。

------

## end

交易结束出现的节气。

```json
"end": "beginning_of_summer"
```

当当前节气超过该值后，交易不会出现。

------

## need

交易所需物品。

```json
"need": [
  {
    "items": "minecraft:wheat",
    "count": 48
  }
]
```

`need` 会被转换为流浪商人的交易成本。

------

## 需求物品数量限制

虽然 `need` 是列表，但实际交易最多只会使用前两个物品：

- 第一个物品作为主交易成本
- 第二个物品作为附加交易成本

第三个及之后的物品不会参与实际交易。

因此建议只填写 1 到 2 个需求物品。

------

## 堆叠数量限制

交易成本会被转换为 Minecraft 原版村民交易成本。

因此，每个需求物品的 `count` 不应超过该物品的最大堆叠数量。

例如，小麦最大堆叠数量为 64，因此不应写成：

```json
{
  "items": "minecraft:wheat",
  "count": 640
}
```

应改为不超过最大堆叠数量的数值，例如：

```json
{
  "items": "minecraft:wheat",
  "count": 48
}
```

如果需要更高交易成本，可以使用两个需求物品，但每一项都仍然需要遵守对应物品的最大堆叠限制。

------

## award

交易奖励。

```json
"award": [
  {
    "id": "eclipticseasons:spring_greenhouse_essence",
    "Count": 1
  }
]
```

当前实现只会使用第一个奖励物品作为交易结果。

因此建议只填写一个奖励物品。

------

## max_count

交易最大使用次数。

```json
"max_count": 1
```

如果不填写，默认值为：

```text
1
```

------

# 出现机制

季节商人交易不是必定出现。

一项交易需要同时满足：

- 当前节气位于 `start` 与 `end` 指定的范围内
- 流浪商人生成交易时选中了该交易
- 随机概率检定成功

因此，即使当前节气符合条件，也不一定每次都能看到对应交易。

------

# 用途建议

该系统适合用于提供轻量级的季节限定兑换。

常见用途包括：

- 提供温室核心精华
- 提供季节限定材料
- 提供特殊资源兑换
- 为独立玩家提供非任务线获取方式

对于整合包作者，如果已经有完整的任务或经济系统，也可以改用其他方式提供这些物品，例如：

- FTB Quests
- Boss 掉落
- 服务器商店
- 自定义战利品表

------

# 注意事项

`season_quest` 是历史遗留名称。

当前版本中，它本质上是季节限定流浪商人交易表，而不是完整任务系统。

旧版任务显示相关字段已经不建议继续使用。新数据包只应编写当前交易转换实际读取的字段。