# 作物数据包生成器

生成作物适宜季节与湿度标签，并下载可放入世界的数据包 ZIP。适用于本 Wiki 所述的当前标签结构；旧版本请核对路径。

<div class="es-generator" data-es-datapack-generator data-language="zh">
<form>
  <label>作物方块 ID <input name="block" type="text" placeholder="example:tomato_crop" required></label>
  <label>作物物品 ID（可选） <input name="item" type="text" placeholder="example:tomato"></label>
  <label>目标版本 pack_format <input name="pack_format" type="number" min="1" max="9999" step="1" value="48" required></label>
  <p class="es-generator-help">默认 48 来自随附的本体源码；用于其他 Minecraft 版本时请按该版本修改。</p>
  <fieldset><legend>适宜季节</legend><label><input type="checkbox" name="season" value="spring" checked> 春</label>
<label><input type="checkbox" name="season" value="summer" checked> 夏</label>
<label><input type="checkbox" name="season" value="autumn" > 秋</label>
<label><input type="checkbox" name="season" value="winter" > 冬</label></fieldset>
  <fieldset><legend>适宜湿度范围</legend>
    <label>最低 <select name="humidity_low"><option value="arid" >干旱</option>
<option value="dry" >干燥</option>
<option value="average" selected>普通</option>
<option value="moist" >湿润</option>
<option value="humid" >潮湿</option></select></label>
    <label>最高 <select name="humidity_high"><option value="arid" >干旱</option>
<option value="dry" >干燥</option>
<option value="average">普通</option>
<option value="moist" selected >湿润</option>
<option value="humid" >潮湿</option></select></label>
  </fieldset>
  <button type="submit">下载数据包 ZIP</button>
  <p role="status" aria-live="polite"></p>
</form>
<details><summary>生成的文件</summary><pre></pre></details>
</div>

物品 ID 留空时只生成方块标签。选择的季节会组成一个标签名称，例如春夏为 spring_summer；湿度由最低与最高等级组成，例如 average_moist。生成器使用 required: false，目标模组未安装时不会因缺少注册对象而使标签失效。

!!! warning
    此工具只生成分类标签，不会修改生长倍率。更精细的参数参见农业内容。下载后请检查 pack.mcmeta 的 pack_format，并在目标版本的游戏中验证。 [农业内容](data/agriculture.md).
