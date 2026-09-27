# Crop data-pack generator

Create season and humidity tags for a crop, then download a data-pack ZIP for your world. This tool uses the tag layout described in this Wiki; verify paths for older versions.

<div class="es-generator" data-es-datapack-generator data-language="en">
<form>
  <label>Crop block ID <input name="block" type="text" placeholder="example:tomato_crop" required></label>
  <label>Crop item ID (optional) <input name="item" type="text" placeholder="example:tomato"></label>
  <label>Target-version pack_format <input name="pack_format" type="number" min="1" max="9999" step="1" value="48" required></label>
  <p class="es-generator-help">The default 48 comes from the supplied core source. Change it when targeting another Minecraft version.</p>
  <fieldset><legend>Growing seasons</legend><label><input type="checkbox" name="season" value="spring" checked> Spring</label>
<label><input type="checkbox" name="season" value="summer" checked> Summer</label>
<label><input type="checkbox" name="season" value="autumn" > Autumn</label>
<label><input type="checkbox" name="season" value="winter" > Winter</label></fieldset>
  <fieldset><legend>Allowed humidity range</legend>
    <label>Minimum <select name="humidity_low"><option value="arid" >Arid</option>
<option value="dry" >Dry</option>
<option value="average" selected>Average</option>
<option value="moist" >Moist</option>
<option value="humid" >Humid</option></select></label>
    <label>Maximum <select name="humidity_high"><option value="arid" >Arid</option>
<option value="dry" >Dry</option>
<option value="average">Average</option>
<option value="moist" selected >Moist</option>
<option value="humid" >Humid</option></select></label>
  </fieldset>
  <button type="submit">Download data-pack ZIP</button>
  <p role="status" aria-live="polite"></p>
</form>
<details><summary>Generated files</summary><pre></pre></details>
</div>

Leave the item ID empty to generate block tags only. Selected seasons form a tag name, such as spring_summer; the humidity bounds form a name such as average_moist. The generator uses required: false so an absent target mod does not invalidate the tag.

!!! warning
    This tool produces category tags only; it does not change growth multipliers. See Agricultural data for custom parameters. Check pack_format in pack.mcmeta and validate the result in your target game version. [Agricultural data](data/agriculture.md).
