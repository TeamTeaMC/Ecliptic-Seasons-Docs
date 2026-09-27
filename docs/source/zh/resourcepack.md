# 资源包适配指南

本页介绍如何用资源包为原版或其他模组添加季节外观。节气从 `assets/<命名空间>/eclipticseasons/` 读取客户端规则；规则可以引用同一个资源包中的图片，也可以引用已有模组的资源。这里的路径和字段按随附的当前本体源码编写。制作跨版本整合包时，请分别验证各目标版本。

## 可适配的内容

| 内容 | 规则目录 | 用途 | 详细说明 |
| --- | --- | --- | --- |
| 草色、叶色 | `biome_colors/` | 指定群系的季节颜色 | [季节视觉](custom/visuals.md#群系颜色) |
| 季节贴图 | `season_textures/` | 按季节替换指定贴图 | [季节视觉](custom/visuals.md#季节贴图) |
| 落叶粒子 | `particles/fallen_leaves/` | 指定来源方块、群系和粒子图片 | [季节视觉](custom/visuals.md#落叶) |
| 覆雪模型 | `snow_definitions/` | 为方块选择覆雪外观 | [季节视觉](custom/visuals.md#覆雪与模型规则) |
| 环境音、音乐 | `ambient/`、`background_music/` | 按时间和环境播放声音 | [环境音与音乐](custom/audio.md) |

模型规则还包括 `model_definitions/` 和 `season_definitions/`。这些规则适合需要自定义方块模型的资源包；字段组合请从本体生成资源中选择最接近的实例。

## 资源路径与命名空间

规则文件一般放在 `assets/<命名空间>/eclipticseasons/<规则目录>/<文件名>.json`。需要区分三种命名空间：

| 名称 | 示例 | 含义 |
| --- | --- | --- |
| 规则文件所在命名空间 | `assets/minecraft/eclipticseasons/season_textures/oak_leaves.json` | 这份规则属于哪个资源命名空间 |
| 原贴图 ID | `minecraft:block/oak_leaves` | `target` 要匹配的贴图 |
| 替换贴图 ID | `my_pack:block/spring_oak_leaves` | 资源包提供的新图片 |

替换贴图 ID `my_pack:block/spring_oak_leaves` 对应 `assets/my_pack/textures/block/spring_oak_leaves.png`。JSON 中引用贴图时不带 `textures/` 和 `.png`。

## 季节贴图示例：橡树叶

保存为 `assets/minecraft/eclipticseasons/season_textures/oak_leaves.json`：

```json
{
  "target": "minecraft:block/oak_leaves",
  "biomes": "#eclipticseasons:rain/seasonal",
  "slices": [
    {
      "season": "spring",
      "textures": {
        "all": "my_pack:block/spring_oak_leaves"
      }
    }
  ]
}
```

把图片放在 `assets/my_pack/textures/block/spring_oak_leaves.png`。`target` 指明原贴图；`biomes` 限定生效群系；`slices` 指定节气所属季节及替换图片。需要在节气之间过渡时，使用 `transition_textures`；本体生成资源中的 `oak_leaves_3.json` 提供了实例。

!!! warning "与其他资源包的覆盖关系"
    如果两个资源包提供同路径的 JSON，最终读取的内容取决于资源包优先级。给自己的规则另取文件名可以减少文件覆盖，但若规则都指向同一贴图，仍要在游戏中检查最终效果。

## 验证与排错

1. 安装目标版本的节气并启用资源包。资源包根目录需有适配该 Minecraft 版本的 `pack.mcmeta`。
2. 在满足 `biomes` 条件的群系切换到对应季节，检查目标方块。先验证一条规则，再批量适配。
3. 没有效果时，检查 `target`、规则路径、贴图 ID、图片文件名以及游戏日志中的资源加载错误。
4. 覆雪外观需要和服务端覆雪规则配合时，继续阅读[气候与世界规则](data/climate_and_world.md#覆雪方块snow_definitions)。资源包规则本身不负责改变服务端判定。

## 官方资源包实例

[Ecliptic Seasons: Bundles 源码](https://github.com/TeamTeaMC/Ecliptic-Seasons-Bundles/tree/main/src/main/resources/resourcepacks) 中的实例包同时展示规则文件与配套素材的组织方式：

| 需求 | 参考目录 | 重点查看 |
| --- | --- | --- |
| 群系色彩与景观 | `Ecliptic Seasons - Terralith` | `assets/` 下的季节颜色规则 |
| 植物和草地覆雪 | `Ecliptic Seasons - Biomes O' Plenty` | `assets/` 下的覆雪模型和资源 |
| 特殊方块模型 | `Ecliptic Seasons - Chipped` | `assets/` 下的模型适配 |

需要同时改变覆雪判定时，也查看同一实例包的 `data/`。Bundles 是实际项目实例；字段含义仍以本 Wiki 的相应规则章节为准。
