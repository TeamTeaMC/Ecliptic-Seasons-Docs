# 农业内容

农业数据位于 `data/<命名空间>/eclipticseasons/`。通常只需要下面三类。

## 作物生长

路径：`crop/<名称>.json`。`apply_target` 选择方块，`climate` 选择农业气候区，`season` 或 `humidity` 给出各状态的生长倍率。

```json
{
  "humidity": {
    "dry": { "grow_chance": 0.95, "fertile_chance": 0.95 },
    "average": { "grow_chance": 1.025, "fertile_chance": 1.025 },
    "moist": { "grow_chance": 0.95, "fertile_chance": 0.95 }
  },
  "climate": "#eclipticseasons:all",
  "parent": [],
  "apply_target": { "blocks": "#example:crops" }
}
```

- `grow_chance`：自然生长倍率。
- `fertile_chance`：催熟相关倍率。
- `blocks` 可填写单个方块 ID 或方块标签。
- 想复用内置曲线时，直接把作物加入 `eclipticseasons:crops/<类型>` 方块标签，比复制 JSON 更稳。

## 湿度调节方块

路径：`humidity_control/<名称>.json`。

```json
{
  "ingredient": { "ingredient": "minecraft:wet_sponge", "count": 1 },
  "result": { "id": "minecraft:sponge" },
  "range": 5,
  "level": 1,
  "checks": [{
    "offset": [0, -1, 0],
    "block": { "blocks": "#eclipticseasons:soft_heat_sources" }
  }],
  "infinity": true
}
```

`range` 是影响范围，`level` 是湿度改变量；`checks` 描述启用结构，`result` 描述工作后的物品结果。旧 `wetter` 格式仍在注册表中，但新内容优先使用 `humidity_control`。

## 季节任务

路径：`season_quest/<名称>.json`。

```json
{
  "start": "spring_equinox",
  "end": "beginning_of_summer",
  "need": [{ "items": "minecraft:wheat", "count": 192 }],
  "award": [{ "id": "eclipticseasons:spring_greenhouse_essence" }],
  "tittle": { "translate": "season_quest.example.spring" },
  "climate": "#eclipticseasons:all",
  "weight": 10,
  "glowing": true,
  "color": 43520
}
```

源码字段目前拼写为 `tittle`，不要擅自改成 `title`。
