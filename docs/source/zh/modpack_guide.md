# 数据包：先让一个作物参与季节系统

本章面向整合包作者。先完成一个可以验证的作物适配，再按需要修改生长曲线、群系气候或天气。以下路径与示例以随附的当前本体源码为准；旧版 Minecraft 的数据目录和字段可能不同。

[作物数据包生成器](datapack_generator.md)

## 先分清两种文件

| 要做什么 | 放在哪里 | 什么时候用 |
| --- | --- | --- |
| 把已有方块加入节气的分类 | `data/eclipticseasons/tags/block/...` | 适配作物、群系和环境时先用标签 |
| 定义一条独立规则 | `data/<你的命名空间>/eclipticseasons/<类型>/...` | 需要调整生长倍率、气候曲线等参数时使用 |

标签的命名空间是 `eclipticseasons`，因为你要向节气现有标签添加成员。独立规则可以使用整合包自己的命名空间，例如 `my_pack`，避免覆盖本体文件。

## 实做：把番茄作物设为春夏适宜

假设方块 ID 为 `example:tomato_crop`。在数据包中新建 `data/eclipticseasons/tags/block/crops/spring_summer.json`：

```json
{
  "replace": false,
  "values": ["example:tomato_crop"]
}
```

这里填写的是作物方块 ID，不是番茄物品 ID。`replace: false` 表示在已有标签上追加成员。请先核对实际方块 ID。

需要给物品相关功能提供相同分类时，还可以创建 `data/eclipticseasons/tags/item/crops/spring_summer.json`，把 `values` 改为对应物品 ID，例如 `example:tomato`。方块与物品可能使用不同 ID。

将数据包装入世界后执行 `/reload`，在春夏和秋冬分别用生长检测计查看该作物。若仍无变化，先检查路径中的 `block`、方块 ID 和日志里的数据包错误，再检查游戏内季节模拟等级与农业设置。

## 接下来按目标选择

| 目标 | 阅读 |
| --- | --- |
| 设置作物湿度、群系分类、动物繁殖季节 | [基础标签](data/tags.md) |
| 自定义生长倍率、湿度调节方块或季节任务 | [农业内容](data/agriculture.md) |
| 调整群系气候、天气、降雪和日历 | [气候与世界规则](data/climate_and_world.md) |
| 让配方、进度或战利品随模拟等级启用 | [模拟等级条件](data/simulation_conditions.md) |
| 改变叶色、贴图、模型、落叶或音效 | [资源包入门](resourcepack.md) |

## 修改规则时的顺序

1. 先查[基础标签](data/tags.md)，判断能否只追加标签。
2. 需要不同参数时，从本体生成资源里找同类型 JSON，复制到自己的命名空间，只改目标和必要字段。
3. 一次只适配一个方块或群系，执行 `/reload` 并检查日志及游戏内结果。
4. 确认有效后再扩大到标签。涉及世界级动态注册表的改动，重新进入世界验证。

!!! note "数据包与资源包会配合使用"
    方块的覆雪判定与覆雪模型属于不同侧的规则。要适配完整雪景，请同时阅读[气候与世界规则](data/climate_and_world.md)及[季节视觉](custom/visuals.md)。

## 官方适配实例

[Ecliptic Seasons: Bundles 源码](https://github.com/TeamTeaMC/Ecliptic-Seasons-Bundles/tree/main/src/main/resources/resourcepacks) 收录了可直接对照目录结构的完整适配包：

| 需求 | 参考目录 | 重点查看 |
| --- | --- | --- |
| 给其他模组作物添加季节标签 | `Ecliptic Seasons DataPack - Bountiful Fares` | `data/eclipticseasons/tags/block/crops/` |
| 同时适配作物与覆雪 | `Ecliptic Seasons - Biomes O' Plenty` | `data/` 下的作物和覆雪规则 |
| 给复杂方块增加覆雪判定 | `Ecliptic Seasons - Quark` | `data/es_x_quark/eclipticseasons/snow_definitions/` |

这些是实际适配工程，复制时应替换目标模组 ID，并核对 `pack.mcmeta` 与目标游戏版本。
