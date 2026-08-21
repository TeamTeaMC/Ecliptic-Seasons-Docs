# 环境音与音乐

## 季节环境音

路径：`assets/<命名空间>/eclipticseasons/ambient/<名称>.json`。它根据节气、时间、天气和群系播放短环境音。音效本身仍需在原版 `sounds.json` 中注册。

环境音条件很多，建议复制内置的 `spring.json`、`summer_day.json` 或 `winter_wind.json` 之一，再删除不需要的限制。没有配置“自然环境音”客户端选项时，这类资源不会播放。

## 背景音乐

路径：`assets/<命名空间>/eclipticseasons/background_music/<名称>.json`。

```json
{
  "start": "lesser_heat",
  "end": "greater_heat",
  "music": {
    "default": {
      "sound": "example:music.late_summer",
      "min_delay": 2000,
      "max_delay": 25000,
      "replace_current_music": false
    }
  }
}
```

- `start`、`end`：生效的节气区间。
- `sound`：已注册的声音事件，而不是 `.ogg` 文件路径。
- `min_delay`、`max_delay`：两次播放之间的游戏刻范围。
- 还可按特殊日期、昼夜、降雨、气候和群系筛选；只有需要时再从生成示例中加入相应字段。
