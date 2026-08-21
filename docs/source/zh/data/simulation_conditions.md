# 按模拟等级启用内容

节气提供 `eclipticseasons:seasonal_simulation_level` 条件，让同一个数据包随玩家选择的模拟等级启用不同内容。

等级从低到高依次为：`environment`、`ecology`、`agriculture`、`survival`。`custom` 是独立的自定义模式。当前等级会包含所有更低等级：例如 `survival` 条件下也会通过 `agriculture` 条件。

## 配方与进度

NeoForge 资源条件写在资源根对象的 `neoforge:conditions` 中：

```json
{
  "neoforge:conditions": [
    {
      "type": "eclipticseasons:seasonal_simulation_level",
      "level": "agriculture"
    }
  ],
  "type": "minecraft:crafting_shaped",
  "pattern": [" A ", " B ", " B "],
  "key": {
    "A": "minecraft:glass",
    "B": "minecraft:copper_ingot"
  },
  "result": {
    "id": "eclipticseasons:hyetometer"
  }
}
```

进度采用同样的 `neoforge:conditions` 写法。现代资源目录使用单数形式，例如 `data/<命名空间>/recipe/` 和 `data/<命名空间>/advancement/`。

## 战利品表

战利品条件放在对应池或条目的 `conditions` 数组中，此处字段名是 `condition`：

```json
{
  "condition": "eclipticseasons:seasonal_simulation_level",
  "level": "survival"
}
```

## 选择等级

| 内容类型 | 建议最低等级 |
|---|---|
| 视觉、节气与环境资源 | `environment` |
| 动物、生态互动 | `ecology` |
| 作物、温室、农业物品 | `agriculture` |
| 中暑等生存压力 | `survival` |

不要仅为区分版本使用此条件；版本兼容仍应通过独立数据包版本或加载器条件处理。
