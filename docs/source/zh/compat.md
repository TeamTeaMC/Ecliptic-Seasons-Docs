# 兼容性

本页只列当前源码中能找到明确入口的兼容。未列出不等于不兼容，只表示节气没有为其提供可验证的专用代码。

## 玩家最需要关注

| 模组或系统 | 当前源码中的处理 | 注意事项 |
|---|---|---|
| Sodium | 季节颜色混合、覆雪模型与区块渲染接入 | 渲染异常时先同时更新双方版本 |
| Iris | 覆雪表面着色、冰水识别和渲染上下文接入 | 兼容选项只在检测到 Iris 时出现 |
| Distant Horizons | LOD 季节颜色、覆雪与冻结水体更新 | 兼容 Mixin 要求 DH `3.0.0-b` 或更高；强制刷新全部 LOD 可能造成明显卡顿 |
| Voxy | LOD 导入、模型、纹理与季节更新接入 | 当前配置项仍标注为测试功能，不建议整合包默认强制开启自动刷新 |
| Fabric Renderer Indigo | 方块模型与覆雪渲染接入 | 主要用于 Fabric 渲染路径 |
| CTM / Continuity | 读取 CTM 资源并识别 Continuity | 复杂覆雪模型仍应在目标组合中实机检查 |

## 信息与配方界面

| 模组 | 提供的信息 |
|---|---|
| Jade | 作物生长、动物繁殖、温室核心与炼药锅信息 |
| The One Probe | 作物、动物、温室核心与炼药锅信息 |
| JEI | 湿度调节、季节任务及相关配方分类 |
| KubeJS | 通过专用插件类提供脚本接入 |

作物诊断是否显示在 Jade 或 TOP 中，由 `Compat.ShowCropGrowthInfoInProbe` 控制。

## 数据兼容

节气可以读取使用 Serene Seasons 作物标签的内容，并可按季节标签自动推导湿度。相关选项包括：

- `SereneSeasonsCropTag`
- `SereneSeasonsCropTagIgnoreSapling`
- `SereneSeasonCropTagBasedHumidity`
- `ModsWithoutSereneSeasonBasedHumidity`

新数据包仍建议直接使用节气的作物数据，因为它能同时表达季节、湿度和农业气候区。

## 如何判断能否加入整合包

1. 在目标 Minecraft、加载器和模组版本组合中测试，而不是依据旧版本兼容记录。
2. 检查树叶颜色、覆雪方块、着色器和远景 LOD 四个最容易冲突的场景。
3. 若只有作物不受控制，优先补标签或数据包，不要立即要求 Java 兼容层。
4. 报告问题时附模组列表、版本、日志，以及关闭 Sodium/Iris/DH/Voxy 后的对照结果。

!!! warning "不再声明的旧兼容"
    当前源码没有 JourneyMap、Cold Sweat、Legendary Survival Overhaul、Snowy Spirit、Haunted Harvest、InControl、Dynamic Trees 或 OptiFine 的专用入口。本页不保证也不否定它们能共同运行。
