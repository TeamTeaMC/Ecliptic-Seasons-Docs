# 基础标签

标签是整合包兼容的第一选择。要向节气的标签追加内容，文件必须放在节气命名空间，例如：

`data/eclipticseasons/tags/block/crops/spring.json`

```json
{
  "replace": false,
  "values": ["example:tomato_crop"]
}
```

同一作物有方块和物品时，建议同时写入 `tags/block` 与 `tags/item` 的同名标签。

## 作物：最常用

| 目标 | 标签规则 |
|---|---|
| 适宜季节 | `eclipticseasons:crops/<季节组合>` |
| 适宜湿度 | `eclipticseasons:crops/<最低湿度>_<最高湿度>` |
| 不受季节影响 | `eclipticseasons:crops/unaffected_by_seasons` |
| 不受湿度影响 | `eclipticseasons:crops/unaffected_by_humidity` |
| 不被恶劣气候杀死 | 方块标签 `eclipticseasons:crops/not_killed_by_climate` |

季节名为 `spring`、`summer`、`autumn`、`winter`，组合示例有 `spring_summer`、`spring_autumn`、`summer_autumn_winter`；四季皆宜使用专门的 `all_seasons`，不是把四个名字串起来。湿度名为 `arid`、`dry`、`average`、`moist`、`humid`；范围示例为 `dry_moist`，单点示例为 `average_average`。

一个番茄适合春夏、湿度为普通到潮湿的完整最小数据包需要四个文件：

```text
data/eclipticseasons/tags/block/crops/spring_summer.json
data/eclipticseasons/tags/block/crops/average_moist.json
data/eclipticseasons/tags/item/crops/spring_summer.json
data/eclipticseasons/tags/item/crops/average_moist.json
```

四个文件都使用前文 JSON 格式，分别把 `example:tomato_crop` 或 `example:tomato` 加入 `values`。

## 群系

文件位于 `tags/worldgen/biome/`。

| 用途 | 标签 |
|---|---|
| 农业气候 | `eclipticseasons:agro/cold`、`agro/warm`、`agro/hot` |
| 降雨类型 | `rain/seasonal`、`rain/seasonal/cold`、`rain/seasonal/hot`、`rain/monsoonal`、`rain/rainless`、`rain/arid`、`rain/droughty`、`rain/soft`、`rain/rainy` |
| 季节颜色 | `color/stable`、`color/slightly`、`color/monsoonal`、`color/seasonal`、`color/seasonal/cold`、`color/seasonal/hot` |
| 特殊环境 | `is_small`、`extreme_cold` |

旧的根级 `arid`、`seasonal` 等群系标签已弃用；降雨分类应使用 `rain/...`。

## 动物与环境

| 注册表 | 标签 | 用途 |
|---|---|---|
| `entity_type` | `eclipticseasons:breed/<季节组合>` | 限制繁殖季节 |
| `entity_type` | `eclipticseasons:habit/day`、`habit/night`、`habit/all_time` | 活动时段 |
| `block` | `eclipticseasons:habitat/butterfly`、`habitat/firefly` | 栖息环境 |
| `block` | `eclipticseasons:snow_overlay_cannot_survive_on` | 禁止视觉覆雪附着 |
| `block` | `eclipticseasons:snow_layer_cannot_survive_in` | 禁止真实雪层占据 |
| `block` | `eclipticseasons:soft_heat_sources` | 温和热源 |
| `block` | `eclipticseasons:dark_grow_plants`、`natural_plants`、`volatile_plants`、`volatile` | 植物与环境判定 |
| `item` | `eclipticseasons:cooling_items` | 降温物品 |
| `item` | `eclipticseasons:heat_protective_helmets` | 防暑头盔 |
| `mob_effect` / `enchantment` | `eclipticseasons:heatstroke_resistant` | 抗中暑效果或附魔 |

需要改变概率、温度曲线或生长倍率时，再使用[农业内容](agriculture.md)或[气候与世界规则](climate_and_world.md)中的动态注册表。

??? example "源码里的可复制示例"
    以下位置均相对于源码根目录：

    - 全部作物季节标签：`src/generated/server_resources/data/eclipticseasons/tags/block/crops/`
    - 全部作物湿度标签：同一目录中的 `arid_arid.json` 至 `humid_humid.json`
    - 对应物品标签：`src/generated/server_resources/data/eclipticseasons/tags/item/crops/`
    - 动物繁殖季节：`src/generated/server_resources/data/eclipticseasons/tags/entity_type/breed/`
    - 动物活动时段：`src/generated/server_resources/data/eclipticseasons/tags/entity_type/habit/`
    - 群系分类：`src/generated/server_resources/data/eclipticseasons/tags/worldgen/biome/`
    - 中暑与环境标签：`src/generated/server_resources/data/eclipticseasons/tags/item/`、`tags/mob_effect/`、`tags/enchantment/` 与 `tags/block/`
