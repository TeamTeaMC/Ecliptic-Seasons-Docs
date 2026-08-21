# 资源包制作入门

| 优先级 | 目标 | 页面 |
|---|---|---|
| 最常用 | 调整树叶、草地等季节颜色 | [季节视觉](custom/visuals.md) |
| 常用 | 给其他模组方块增加覆雪或季节贴图 | [季节视觉](custom/visuals.md) |
| 常用 | 自定义落叶粒子 | [季节视觉](custom/visuals.md) |
| 可选氛围 | 增加季节环境音或背景音乐 | [环境音与音乐](custom/audio.md) |

客户端规则统一位于 `assets/<你的命名空间>/eclipticseasons/<类型>/<名称>.json`。覆盖 `minecraft` 贴图时，规则文件放在 `assets/minecraft/eclipticseasons/`；自有素材仍放在你的命名空间。

先用单个群系或方块验证，再扩展到标签。覆雪若不只是外观变化，还需要对应的数据包条目参与服务器判定。
