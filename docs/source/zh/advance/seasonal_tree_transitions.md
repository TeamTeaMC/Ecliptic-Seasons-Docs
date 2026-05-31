# 让你的树有更好的季节过渡

本教程介绍如何使用：

- `transition_textures`
- `transition_models`

为树叶、花朵或植物模型添加更平滑的季节变化。

![seasonal_tree_transitions.webp](../../_static/image/seasonal_tree_transitions.webp)

## transition_textures

`transition_textures` 用于在一个节气内，从一组贴图过渡到另一组贴图。

它用于 `season_textures` 文件中。

路径：

```text
assets/<命名空间>/eclipticseasons/season_textures/<文件名>.json
```

示例：

```text
assets/example/eclipticseasons/season_textures/cherry_leaves.json
```

### 文件结构

```json
{
  "target": "minecraft:block/cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "solar_term": "beginning_of_autumn",
      "transition_textures": [
        [
          {
            "all": "example:block/cherry_leaves_summer"
          },
          {
            "all": "example:block/cherry_leaves_autumn"
          }
        ]
      ],
      "tint": {
        "#all": -1
      }
    }
  ]
}
```

### 字段说明

`target` 指定要替换贴图的模型。

```json
"target": "minecraft:block/cherry_leaves"
```

`solar_term` 指定在哪个节气发生过渡。

```json
"solar_term": "beginning_of_autumn"
```

`transition_textures` 必须写成双层数组。

```json
"transition_textures": [
  [
    {
      "all": "example:block/cherry_leaves_summer"
    },
    {
      "all": "example:block/cherry_leaves_autumn"
    }
  ]
]
```

内层数组中必须有两个对象：

```text
第一个对象：过渡开始时使用的贴图
第二个对象：过渡结束后使用的贴图
```

`tint` 用于控制染色。

```json
"tint": {
  "#all": -1
}
```

如果贴图已经自带颜色，通常设置为 `-1`，取消原本的染色。

### 完整示例：夏季树叶过渡到秋季树叶

```json
{
  "target": "minecraft:block/cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "season": "summer",
      "textures": {
        "all": "example:block/cherry_leaves_summer"
      },
      "tint": {
        "#all": -1
      }
    },
    {
      "solar_term": "beginning_of_autumn",
      "transition_textures": [
        [
          {
            "all": "example:block/cherry_leaves_summer"
          },
          {
            "all": "example:block/cherry_leaves_autumn"
          }
        ]
      ],
      "tint": {
        "#all": -1
      }
    },
    {
      "season": "autumn",
      "textures": {
        "all": "example:block/cherry_leaves_autumn"
      },
      "tint": {
        "#all": -1
      }
    }
  ]
}
```

## transition_models

`transition_models` 用于在一个节气内，从一个模型过渡到另一个模型。

它用于 `season_definitions` 文件中。

路径：

```text
assets/<命名空间>/eclipticseasons/season_definitions/<文件名>.json
```

示例：

```text
assets/example/eclipticseasons/season_definitions/cherry_leaves.json
```

### 文件结构

```json
{
  "blocks": "minecraft:cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "solar_term": "spring_equinox",
      "transition_models": [
        "example:cherry_leaves_spring_0",
        "example:cherry_leaves_spring_1"
      ]
    }
  ]
}
```

### 字段说明

`blocks` 指定要应用季节模型的方块。

```json
"blocks": "minecraft:cherry_leaves"
```

`solar_term` 指定在哪个节气发生过渡。

```json
"solar_term": "spring_equinox"
```

`transition_models` 是一个包含两个模型映射 ID 的数组。

```json
"transition_models": [
  "example:cherry_leaves_spring_0",
  "example:cherry_leaves_spring_1"
]
```

含义：

```text
第一个 ID：过渡开始时使用的模型映射
第二个 ID：过渡结束后使用的模型映射
```

这两个 ID 需要在 `model_definitions` 中定义。

### 创建 model_definitions

路径：

```text
assets/<命名空间>/eclipticseasons/model_definitions/<文件名>.json
```

例如：

```text
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_0.json
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_1.json
```

`cherry_leaves_spring_0.json`：

```json
{
  "variants": {
    "": {
      "model": "example:block/cherry_leaves_spring_0"
    }
  },
  "replace": true
}
```

`cherry_leaves_spring_1.json`：

```json
{
  "variants": {
    "": {
      "model": "example:block/cherry_leaves_spring_1"
    }
  },
  "replace": true
}
```

然后创建普通方块模型：

```text
assets/example/models/block/cherry_leaves_spring_0.json
assets/example/models/block/cherry_leaves_spring_1.json
```

`cherry_leaves_spring_0.json`：

```json
{
  "parent": "minecraft:block/leaves",
  "textures": {
    "all": "example:block/cherry_leaves_spring_0"
  }
}
```

`cherry_leaves_spring_1.json`：

```json
{
  "parent": "minecraft:block/leaves",
  "textures": {
    "all": "example:block/cherry_leaves_spring_1"
  }
}
```

最后放入贴图：

```text
assets/example/textures/block/cherry_leaves_spring_0.png
assets/example/textures/block/cherry_leaves_spring_1.png
```

### 完整示例：春分时樱花逐渐开放

文件：

```text
assets/example/eclipticseasons/season_definitions/cherry_leaves.json
```

内容：

```json
{
  "blocks": "minecraft:cherry_leaves",
  "biomes": "#eclipticseasons:seasonal",
  "slices": [
    {
      "season": "spring",
      "mid": "example:cherry_leaves_spring_0"
    },
    {
      "solar_term": "spring_equinox",
      "transition_models": [
        "example:cherry_leaves_spring_0",
        "example:cherry_leaves_spring_1"
      ]
    },
    {
      "start": "clear_and_bright",
      "end": "grain_rain",
      "mid": "example:cherry_leaves_spring_1"
    }
  ]
}
```

这个例子表示：

```text
春季使用 cherry_leaves_spring_0
春分时从 cherry_leaves_spring_0 过渡到 cherry_leaves_spring_1
清明到谷雨保持 cherry_leaves_spring_1
```

## 常见错误

### transition_textures 少写了一层数组

错误：

```json
"transition_textures": [
  {
    "all": "example:block/cherry_leaves_summer"
  },
  {
    "all": "example:block/cherry_leaves_autumn"
  }
]
```

正确：

```json
"transition_textures": [
  [
    {
      "all": "example:block/cherry_leaves_summer"
    },
    {
      "all": "example:block/cherry_leaves_autumn"
    }
  ]
]
```

### transition_models 没有对应 model_definitions

如果写了：

```json
"transition_models": [
  "example:cherry_leaves_spring_0",
  "example:cherry_leaves_spring_1"
]
```

就必须存在：

```text
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_0.json
assets/example/eclipticseasons/model_definitions/cherry_leaves_spring_1.json
```

### 贴图路径写错

模型里写：

```json
"all": "example:block/cherry_leaves_summer"
```

实际文件应为：

```text
assets/example/textures/block/cherry_leaves_summer.png
```

不要写 `.png` 后缀。

## 选择哪个？

只改变贴图：

```text
使用 transition_textures
```

改变模型：

```text
使用 transition_models
```

需要更少文件：

```text
优先使用 season_textures + transition_textures
```

需要更强控制：

```text
使用 season_definitions + transition_models
```