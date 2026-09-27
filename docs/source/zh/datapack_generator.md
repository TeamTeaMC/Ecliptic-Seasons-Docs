# 作物数据包生成器

批量制作作物适宜季节与湿度标签。拖入目标模组的本地 JAR 后，可以按中文名称、英文名称或注册 ID 搜索方块与物品；也可以直接输入 ID。每个作物可独立设置规则，下载时会合并到一个数据包。

<div class="es-generator" data-es-datapack-generator data-language="zh">
<form>
  <div data-jar-drop class="es-jar-drop"><label>拖入一个或多个模组 JAR，或点击选择文件<input type="file" accept=".jar,application/java-archive" multiple></label></div>
  <p data-jar-status role="status" aria-live="polite"></p>
  <label>搜索已读取的方块 <input data-catalog-search type="search" placeholder="例如：大麦 / Barley / biomesoplenty:barley" hidden></label>
  <div data-catalog-results class="es-catalog-results"></div>
  <p class="es-generator-help">JAR 仅在你的浏览器中读取，不会上传。候选方块来自语言文件与方块状态文件的交集；名称只帮助检索，最终请核对注册 ID。缺少语言条目的方块仍可手动输入。</p>
  <label>目标版本 pack_format <input name="pack_format" type="number" min="1" max="9999" step="1" value="48" required></label>
  <div data-crop-list></div>
  <button type="button" data-add-crop>添加作物</button>
  <button type="submit">下载数据包 ZIP</button>
  <p role="status" aria-live="polite"></p>
</form>
<details><summary>生成的文件</summary><pre></pre></details>
</div>

同一标签中的多个作物会合并去重。物品 ID 可留空；有物品 ID 时会同时生成物品标签。

!!! warning
    默认值 48 取自随附的本体源码。用于其他游戏版本时，请修改 pack_format 并在目标游戏中验证。工具只生成分类标签；自定义生长倍率参见 [农业内容](data/agriculture.md).
