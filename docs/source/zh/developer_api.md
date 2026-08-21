# 开发者 API

## 稳定入口

其他模组应从公共接口取得实例，不要直接依赖 `common` 包或内部管理器：

```java
EclipticSeasonsApi api = EclipticSeasonsApi.getInstance();

SolarTerm term = api.getSolarTerm(level);
Season globalSeason = api.getSeason(level);
Season localAgroSeason = api.getSeasonSignal(level, pos);
boolean snowingHere = api.isSnowAt(level, pos);
```

`getSeasonSignal(level, pos)` 会考虑区域气候，适合农业判定；`getSeason(level)` 返回全局季节。调用前可用 `isSeasonEnabled(level)` 判断当前维度是否启用了季节系统。

## 常用查询

| 需求 | 方法 |
|---|---|
| 节气、季节、子季节 | `getSolarTerm`、`getSeason`、`getSubSeason` |
| 日期与年份 | `getSolarDays`、`getSolarYear`、`getDayInTerm` |
| 当前地点天气 | `isRainAt`、`isSnowAt`、`isThunderAt` |
| 降水类型 | `getPrecipitationAt`、`getCurrentPrecipitationAt` |
| 基础湿度 | `getBaseHumidity` |
| 最终湿度 | `getAdjustedHumidity`（实验性） |
| 当前模拟等级 | `getSeasonalSimulationLevel` |

`isDay`、`isNight`、`getNightTime`、`isNoon`、`isEvening` 和 `isSnowySurfaceAt` 已弃用，新代码不要使用。

## 事件

当前可用事件发布在 `NeoForge.EVENT_BUS`：

```java
@SubscribeEvent
public static void onSolarTermChanged(SolarTermChangeEvent event) {
    SolarTerm before = event.getOldSolarTerm();
    SolarTerm after = event.getNewSolarTerm();
    Level level = event.getLevel();
}

@SubscribeEvent
public static void onPlantGrow(CanPlantGrowEvent event) {
    // TriState.TRUE 强制允许，FALSE 阻止，DEFAULT 交还默认逻辑。
    event.setResult(TriState.DEFAULT);
}
```

`RegisterAndModifyCropInfoEvent` 已不再支持；作物资料应通过数据包注册。`BeforeCheckSnowStatusEvent` 自 0.13.3 起弃用。

!!! note "兼容性原则"
    公共 API 会按配置自动选择正确实现，内部类则可能随版本变化。跨版本兼容层应集中封装，避免业务代码到处引用内部路径。
