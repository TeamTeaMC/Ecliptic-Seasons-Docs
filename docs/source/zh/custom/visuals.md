# 季节视觉

节气的客户端 JSON 位于 `assets/<命名空间>/eclipticseasons/<类型>/`。文件名只要求唯一；真正目标写在 JSON 内。

## 群系颜色

路径：`biome_colors/<名称>.json`。

```json
{
  "biomes": "minecraft:snowy_plains",
  "foliage_colors": {
    "climate": "eclipticseasons:cold",
    "seasons": {
      "spring": { "color": -20561 },
      "summer": { "color": -16711936 },
      "autumn": { "color": -14336 },
      "winter": { "color": -16776961 },
      "none": { "color": -1 }
    }
  }
}
```

颜色是带符号的十进制 ARGB/RGB 整数。`biomes` 支持群系 ID 或标签；需要草色时使用对应的 grass 配置字段。

## 季节贴图

路径：目标贴图命名空间下的 `eclipticseasons/season_textures/<名称>.json`。

```json
{
  "target": "minecraft:block/oak_leaves",
  "biomes": "#eclipticseasons:rain/seasonal",
  "slices": [{
    "season": "spring",
    "transition_textures": [
      { "all": "minecraft:block/cherry_leaves" },
      { "all": "minecraft:block/spruce_leaves" }
    ]
  }]
}
```

`target` 是被替换的原贴图；`transition_textures` 按季节进度依次过渡。仅需一种贴图时保留一个条目即可。

## 落叶

路径：`particles/fallen_leaves/<名称>.json`。

```json
{
  "source": "custom",
  "block": { "blocks": "minecraft:pumpkin" },
  "location": { "biomes": "minecraft:plains" },
  "sprites": { "default": ["example:particle/leaf"] },
  "weights": { "default": 1 },
  "replace": false
}
```

`block` 选择粒子来源，`location` 限定群系，`sprites` 与 `weights` 决定候选纹理和权重。颜色可使用与群系颜色相同的季节映射。

## 覆雪与模型规则

- `snow_definitions/<名称>.json`：把方块映射到雪层模型，例如 `{ "blocks": "minecraft:cobblestone", "mid": "eclipticseasons:overlay_tiny" }`。
- `model_definitions/<名称>.json`：定义可由其他规则引用的模型组合。
- `season_definitions/<名称>.json`：按季节条件切换方块模型。

这三类字段组合较多。优先复制模组生成资源中与目标最接近的文件，只修改方块、模型和条件；不要复制无关条目。服务端方块覆雪行为还需要对应的数据包 `snow_definitions`。
