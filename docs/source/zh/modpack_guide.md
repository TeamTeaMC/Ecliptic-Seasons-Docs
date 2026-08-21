# 数据包与整合包入门

不要从“有哪些注册表”开始，先按整合包需求选择入口。

| 优先级 | 你的目标 | 去哪里 |
|---|---|---|
| 最常用 | 让新作物受季节或湿度影响 | [农业内容](data/agriculture.md) |
| 最常用 | 让配方、进度或战利品随模拟等级启用 | [模拟等级条件](data/simulation_conditions.md) |
| 常用 | 调整某类群系的温度、降雨或积雪 | [气候与世界规则](data/climate_and_world.md) |
| 进阶 | 自定义农业气候映射、日历阶段或特殊日期 | [气候与世界规则](data/climate_and_world.md) |

## 目录约定

动态注册表资源使用 `data/<你的命名空间>/eclipticseasons/<类型>/<名称>.json`。配方、进度和战利品表使用当前 Minecraft 的单数目录：`recipe`、`advancement`、`loot_table`。

## 最省维护的做法

1. 能用标签就不要复制内置 JSON，例如把作物加入 `eclipticseasons:crops/<类型>`。
2. 必须覆盖曲线时，只写自己的命名空间，避免替换默认文件。
3. 复制生成资源中最接近的示例，然后删除无关字段。
4. `/reload` 后检查日志；世界级注册表变化建议重新进世界验证。
5. 只有生存玩法才需要的内容，用 `seasonal_simulation_level` 条件门控。

!!! warning "版本范围"
    本章按上传的当前 NeoForge 源码与 2026-08-21 生成资源重写。不要把示例原样回移到 1.20.1。
