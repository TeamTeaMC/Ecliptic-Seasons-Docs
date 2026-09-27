(function () {
  'use strict';
  const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
  const HUMIDITIES = ['arid', 'dry', 'average', 'moist', 'humid'];
  const validId = id => /^[a-z0-9_.-]+:[a-z0-9_./-]+$/.test(id) &&
    !id.split(':')[1].split('/').some(part => !part || part === '.' || part === '..');
  const json = value => JSON.stringify(value, null, 2) + '\n';
  const labels = {
    zh: { add: '添加作物', remove: '删除', block: '作物方块 ID', item: '对应物品 ID（可选）',
      seasons: '适宜季节', humidity: '湿度范围', low: '最低', high: '最高',
      seasonNames: ['春', '夏', '秋', '冬'], humidityNames: ['干旱', '干燥', '普通', '湿润', '潮湿'],
      jarReady: '已读取 {files} 个 JAR，找到 {blocks} 个方块名称和 {items} 个物品名称。搜索并点击结果即可添加作物。',
      loading: '正在读取 {name}…', search: '搜索方块中文名、英文名或 ID', noMatch: '没有匹配的方块。',
      jarError: '无法读取 {name}：{error}', tooLarge: '文件超过 100 MiB。',
      invalid_id: '第 {row} 行的方块或物品 ID 格式错误。',
      invalid_format: '请填写正确的 pack_format 整数。',
      no_season: '第 {row} 行至少选择一个季节。',
      invalid_humidity: '第 {row} 行的最低湿度高于最高湿度。',
      no_rows: '请至少添加一个作物。', ready: '已生成 {count} 个文件，包含 {rows} 个作物。' },
    en: { add: 'Add crop', remove: 'Remove', block: 'Crop block ID', item: 'Corresponding item ID (optional)',
      seasons: 'Growing seasons', humidity: 'Humidity range', low: 'Minimum', high: 'Maximum',
      seasonNames: ['Spring', 'Summer', 'Autumn', 'Winter'], humidityNames: ['Arid', 'Dry', 'Average', 'Moist', 'Humid'],
      jarReady: 'Read {files} JAR(s): {blocks} block names and {items} item names. Search and click a result to add a crop.',
      loading: 'Reading {name}…', search: 'Search block name or ID', noMatch: 'No matching blocks.',
      jarError: 'Could not read {name}: {error}', tooLarge: 'File exceeds 100 MiB.',
      invalid_id: 'Invalid block or item ID in row {row}.',
      invalid_format: 'Enter a valid pack_format integer.',
      no_season: 'Select at least one season in row {row}.',
      invalid_humidity: 'Minimum humidity exceeds maximum in row {row}.',
      no_rows: 'Add at least one crop.', ready: 'Generated {count} files for {rows} crop(s).' }
  };
  function format(message, values) { return message.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? ''); }
  function buildFiles(rows, packFormat) {
    if (!Number.isInteger(packFormat) || packFormat < 1 || packFormat > 9999) throw new Error('invalid_format');
    if (!rows.length) throw new Error('no_rows');
    const groups = new Map();
    rows.forEach((row, index) => {
      const blockId = row.blockId.trim(), itemId = (row.itemId || '').trim();
      const fail = code => { const error = new Error(code); error.row = index + 1; throw error; };
      if (!validId(blockId) || (itemId && !validId(itemId))) fail('invalid_id');
      const chosen = SEASONS.filter(name => row.seasons.includes(name));
      if (!chosen.length) fail('no_season');
      const low = HUMIDITIES.indexOf(row.humidityLow), high = HUMIDITIES.indexOf(row.humidityHigh);
      if (low < 0 || high < 0 || low > high) fail('invalid_humidity');
      const names = [chosen.length === 4 ? 'all_seasons' : chosen.join('_'), `${row.humidityLow}_${row.humidityHigh}`];
      for (const name of names) {
        for (const [type, id] of [['block', blockId], ['item', itemId]]) {
          if (!id) continue;
          const path = `data/eclipticseasons/tags/${type}/crops/${name}.json`;
          if (!groups.has(path)) groups.set(path, new Set());
          groups.get(path).add(id);
        }
      }
    });
    const files = { 'pack.mcmeta': json({ pack: { description: 'Ecliptic Seasons crop integration', pack_format: packFormat } }) };
    for (const [path, ids] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
      files[path] = json({ replace: false, values: [...ids].sort().map(id => ({ id, required: false })) });
    }
    return files;
  }
  // Language keys are hints, not a block registry. Require a matching blockstate for block suggestions.
  async function inspectJar(file) {
    if (file.size > 100 * 1024 * 1024) throw new Error('tooLarge');
    const jar = await JSZip.loadAsync(await file.arrayBuffer());
    const discovered = { block: new Map(), item: new Map() };
    const entries = Object.keys(jar.files);
    const blockstates = new Set(entries.filter(path => /^assets\/[^/]+\/blockstates\/.+\.json$/.test(path))
      .map(path => path.replace(/^assets\//, '').replace('/blockstates/', ':').replace(/\.json$/, '')));
    const langPaths = entries.filter(path => /^assets\/[^/]+\/lang\/(zh_cn|en_us)\.json$/.test(path));
    for (const path of langPaths) {
      const entry = jar.file(path);
      if (!entry || entry._data?.uncompressedSize > 2 * 1024 * 1024) continue;
      let data;
      try { data = JSON.parse(await entry.async('string')); } catch (_) { continue; }
      const language = path.endsWith('zh_cn.json') ? 'zh' : 'en';
      for (const [key, name] of Object.entries(data)) {
        const match = /^(block|item)\.([a-z0-9_.-]+)\.([a-z0-9_./-]+)$/.exec(key);
        if (!match || typeof name !== 'string' || name.includes('%')) continue;
        const kind = match[1], id = `${match[2]}:${match[3]}`;
        if (kind === 'block' && !blockstates.has(id)) continue;
        const record = discovered[kind].get(id) || { id, zh: '', en: '' };
        record[language] = name.replace(/§[0-9a-fklmnor]/gi, '');
        discovered[kind].set(id, record);
      }
    }
    return discovered;
  }
  function input(parent, type, placeholder, catalog, language) {
    const wrap = document.createElement('div');
    wrap.className = 'es-suggest';
    const field = document.createElement('input');
    field.type = 'text'; field.placeholder = placeholder; field.autocomplete = 'off';
    const options = document.createElement('div');
    options.className = 'es-suggest-options';
    options.setAttribute('role', 'listbox');
    function render() {
      options.replaceChildren();
      const query = field.value.trim().toLocaleLowerCase();
      if (!query || !catalog.size) return;
      let count = 0;
      for (const record of catalog.values()) {
        const label = `${record[language] || record.en || record.zh} ${record.id}`;
        if (!label.toLocaleLowerCase().includes(query)) continue;
        const option = document.createElement('button');
        option.type = 'button'; option.className = 'es-suggest-option';
        option.textContent = label;
        option.addEventListener('mousedown', event => event.preventDefault());
        option.addEventListener('click', () => { field.value = record.id; options.replaceChildren(); });
        options.append(option);
        if (++count >= 12) break;
      }
    }
    field.addEventListener('input', render);
    field.addEventListener('focus', render);
    field.addEventListener('blur', () => setTimeout(() => options.replaceChildren(), 150));
    wrap.append(field, options); parent.append(wrap);
    return field;
  }
  function addRow(root, catalogs, language, prefill) {
    const t = labels[language], row = document.createElement('section');
    row.className = 'es-crop-row';
    const heading = document.createElement('header');
    const title = document.createElement('strong');
    const remove = document.createElement('button');
    remove.type = 'button'; remove.textContent = t.remove;
    remove.addEventListener('click', () => row.remove());
    heading.append(title, remove); row.append(heading);
    for (const [kind, label] of [['block', t.block], ['item', t.item]]) {
      const fieldLabel = document.createElement('label');
      fieldLabel.textContent = label;
      const field = input(fieldLabel, kind, kind === 'block' ? 'example:tomato_crop' : 'example:tomato', catalogs[kind], language);
      field.dataset.kind = kind;
      if (kind === 'block' && prefill) field.value = prefill;
      row.append(fieldLabel);
    }
    const seasons = document.createElement('fieldset');
    const legend = document.createElement('legend'); legend.textContent = t.seasons; seasons.append(legend);
    SEASONS.forEach((season, index) => {
      const label = document.createElement('label'), checkbox = document.createElement('input');
      checkbox.type = 'checkbox'; checkbox.value = season; checkbox.name = 'season';
      checkbox.checked = index < 2;
      label.append(checkbox, document.createTextNode(' ' + t.seasonNames[index])); seasons.append(label);
    });
    row.append(seasons);
    const humidity = document.createElement('fieldset');
    const legendHumidity = document.createElement('legend'); legendHumidity.textContent = t.humidity;
    humidity.append(legendHumidity);
    for (const [bound, defaultIndex, text] of [['low', 2, t.low], ['high', 3, t.high]]) {
      const label = document.createElement('label'); label.textContent = text + ' ';
      const select = document.createElement('select'); select.dataset.bound = bound;
      HUMIDITIES.forEach((name, i) => {
        const option = document.createElement('option'); option.value = name;
        option.textContent = t.humidityNames[i]; option.selected = i === defaultIndex;
        select.append(option);
      });
      label.append(select); humidity.append(label);
    }
    row.append(humidity); root.append(row);
    title.textContent = `${root.children.length}`;
  }
  function init(root) {
    if (root.dataset.initialized) return;
    root.dataset.initialized = 'true';
    const loadingNotice = root.querySelector('[data-script-notice]');
    if (loadingNotice) loadingNotice.hidden = true;
    const language = root.dataset.language === 'en' ? 'en' : 'zh', t = labels[language];
    const catalogs = { block: new Map(), item: new Map() };
    const list = root.querySelector('[data-crop-list]'), status = root.querySelector('[data-generator-status]');
    const jarStatus = root.querySelector('[data-jar-status]');
    const catalogSearch = root.querySelector('[data-catalog-search]');
    const catalogResults = root.querySelector('[data-catalog-results]');
    const jarInput = root.querySelector('input[type="file"]');
    const drop = root.querySelector('[data-jar-drop]');
    addRow(list, catalogs, language);
    function showCatalog() {
      catalogResults.replaceChildren();
      const query = catalogSearch.value.trim().toLocaleLowerCase();
      if (!query) return;
      let matches = 0;
      for (const record of catalogs.block.values()) {
        const title = record[language] || record.en || record.zh || record.id;
        if (!`${title} ${record.zh} ${record.en} ${record.id}`.toLocaleLowerCase().includes(query)) continue;
        const result = document.createElement('button');
        result.type = 'button'; result.textContent = `${title} — ${record.id}`;
        result.addEventListener('click', () => {
          const empty = [...list.querySelectorAll('.es-crop-row')].find(row => !row.querySelector('[data-kind="block"]').value.trim());
          if (empty) empty.querySelector('[data-kind="block"]').value = record.id;
          else addRow(list, catalogs, language, record.id);
          const row = empty || list.lastElementChild;
          if (catalogs.item.has(record.id)) row.querySelector('[data-kind="item"]').value = record.id;
          catalogSearch.value = ''; catalogResults.replaceChildren();
          row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        catalogResults.append(result);
        if (++matches >= 30) break;
      }
      if (!matches) catalogResults.textContent = t.noMatch;
    }
    catalogSearch.addEventListener('input', showCatalog);
    root.querySelector('[data-add-crop]').addEventListener('click', () => addRow(list, catalogs, language));
    async function readJars(files) {
      let read = 0;
      for (const file of files) {
        if (!/\.jar$/i.test(file.name)) continue;
        jarStatus.textContent = format(t.loading, { name: file.name });
        await new Promise(resolve => setTimeout(resolve, 0));
        try {
          const found = await inspectJar(file);
          for (const kind of ['block', 'item']) for (const [id, record] of found[kind]) {
            catalogs[kind].set(id, { ...catalogs[kind].get(id), ...record });
          }
          read++;
        } catch (error) {
          jarStatus.textContent = format(t.jarError, { name: file.name, error: t[error.message] || error.message });
          return;
        }
      }
      jarStatus.textContent = format(t.jarReady, { files: read, blocks: catalogs.block.size, items: catalogs.item.size });
      catalogSearch.hidden = !catalogs.block.size;
      showCatalog();
    }
    jarInput.addEventListener('change', () => readJars(jarInput.files));
    drop.addEventListener('dragover', event => { event.preventDefault(); drop.classList.add('es-dragging'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('es-dragging'));
    drop.addEventListener('drop', event => {
      event.preventDefault(); drop.classList.remove('es-dragging'); readJars(event.dataTransfer.files);
    });
    root.querySelector('form').addEventListener('submit', async event => {
      event.preventDefault();
      try {
        const rows = [...list.querySelectorAll('.es-crop-row')].map(row => ({
          blockId: row.querySelector('[data-kind="block"]').value,
          itemId: row.querySelector('[data-kind="item"]').value,
          seasons: [...row.querySelectorAll('[name="season"]:checked')].map(input => input.value),
          humidityLow: row.querySelector('[data-bound="low"]').value,
          humidityHigh: row.querySelector('[data-bound="high"]').value
        }));
        const files = buildFiles(rows, Number(root.querySelector('[name="pack_format"]').value));
        const zip = new JSZip();
        for (const [path, content] of Object.entries(files)) zip.file(path, content);
        const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
        const url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = 'ecliptic-seasons-crop-integration.zip'; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 60000);
        root.querySelector('pre').textContent = Object.keys(files).join('\n');
        status.textContent = format(t.ready, { count: Object.keys(files).length, rows: rows.length });
      } catch (error) {
        status.textContent = format(t[error.message] || error.message, { row: error.row });
      }
    });
  }
  function initAll() { document.querySelectorAll('[data-es-datapack-generator]').forEach(init); }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
    else initAll();
    if (typeof document$ !== 'undefined') document$.subscribe(initAll);
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { buildFiles, inspectJar };
})();
