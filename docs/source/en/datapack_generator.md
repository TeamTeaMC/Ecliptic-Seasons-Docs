# Crop data-pack generator

Create seasonal and humidity tags for multiple crops. Drop local mod JARs to search for blocks and items by localized name or registry ID, or type IDs directly. Each crop can have its own settings; all rows are merged into one data pack.

<div class="es-generator" data-es-datapack-generator data-language="en">
<form>
  <div data-jar-drop class="es-jar-drop"><label>Drop one or more mod JARs here, or choose files<input type="file" accept=".jar,application/java-archive" multiple></label></div>
  <p data-jar-status role="status" aria-live="polite"></p>
  <label>Search loaded blocks <input data-catalog-search type="search" placeholder="For example: Barley / biomesoplenty:barley" hidden></label>
  <div data-catalog-results class="es-catalog-results"></div>
  <p class="es-generator-help">JARs are read locally in your browser and are never uploaded. Block suggestions intersect language entries with blockstate files; names help search, but check the final registry IDs. Blocks without language entries can still be entered manually.</p>
  <label>Target-version pack_format <input name="pack_format" type="number" min="1" max="9999" step="1" value="48" required></label>
  <div data-crop-list></div>
  <button type="button" data-add-crop>Add crop</button>
  <button type="submit">Download data-pack ZIP</button>
  <p role="status" aria-live="polite"></p>
</form>
<details><summary>Generated files</summary><pre></pre></details>
</div>

Crops in the same tag are merged and deduplicated. The item ID is optional; supplying it also creates item tags.

!!! warning
    The default 48 comes from the supplied core source. Change pack_format for other game versions and validate in the target game. This tool generates classification tags only; for custom growth multipliers see [Agricultural data](data/agriculture.md).
