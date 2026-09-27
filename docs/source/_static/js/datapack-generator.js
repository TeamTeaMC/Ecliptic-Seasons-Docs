(function () {
  'use strict';

  const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
  const HUMIDITIES = ['arid', 'dry', 'average', 'moist', 'humid'];
  const encoder = new TextEncoder();
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const validId = value => /^[a-z0-9_.-]+:[a-z0-9_./-]+$/.test(value) &&
    !value.split(':')[1].split('/').some(part => part === '.' || part === '..' || part === '');
  const json = value => JSON.stringify(value, null, 2) + '\n';
  const tag = id => json({ replace: false, values: [{ id, required: false }] });

  function buildFiles(options) {
    const { blockId, itemId, seasons, humidityLow, humidityHigh, packFormat } = options;
    if (!validId(blockId) || (itemId && !validId(itemId))) throw new Error('invalid_id');
    if (!Number.isInteger(packFormat) || packFormat < 1 || packFormat > 9999) throw new Error('invalid_format');
    const chosen = SEASONS.filter(season => seasons.includes(season));
    if (!chosen.length) throw new Error('no_season');
    if (!HUMIDITIES.includes(humidityLow) || !HUMIDITIES.includes(humidityHigh) ||
        HUMIDITIES.indexOf(humidityLow) > HUMIDITIES.indexOf(humidityHigh)) throw new Error('invalid_humidity');
    const tags = [chosen.length === 4 ? 'all_seasons' : chosen.join('_'), `${humidityLow}_${humidityHigh}`];
    const files = {
      'pack.mcmeta': json({ pack: { description: 'Ecliptic Seasons crop integration', pack_format: packFormat } })
    };
    for (const name of tags) {
      files[`data/eclipticseasons/tags/block/crops/${name}.json`] = tag(blockId);
      if (itemId) files[`data/eclipticseasons/tags/item/crops/${name}.json`] = tag(itemId);
    }
    return files;
  }

  function write16(bytes, offset, value) {
    bytes[offset] = value & 255;
    bytes[offset + 1] = (value >>> 8) & 255;
  }
  function write32(bytes, offset, value) {
    write16(bytes, offset, value);
    write16(bytes, offset + 2, value >>> 16);
  }
  function crc32(bytes) {
    let result = 0xffffffff;
    for (const byte of bytes) result = crcTable[(result ^ byte) & 255] ^ (result >>> 8);
    return (result ^ 0xffffffff) >>> 0;
  }
  function zipFiles(files) {
    const local = [], central = [];
    let offset = 0;
    for (const [path, contents] of Object.entries(files)) {
      const name = encoder.encode(path), data = encoder.encode(contents), crc = crc32(data);
      if (name.length > 65535) throw new Error('invalid_id');
      const header = new Uint8Array(30 + name.length);
      write32(header, 0, 0x04034b50);
      write16(header, 4, 20);
      write16(header, 6, 0x0800); // UTF-8 filenames
      write32(header, 14, crc);
      write32(header, 18, data.length);
      write32(header, 22, data.length);
      write16(header, 26, name.length);
      header.set(name, 30);
      local.push(header, data);
      const directory = new Uint8Array(46 + name.length);
      write32(directory, 0, 0x02014b50);
      write16(directory, 4, 20);
      write16(directory, 6, 20);
      write16(directory, 8, 0x0800);
      write32(directory, 16, crc);
      write32(directory, 20, data.length);
      write32(directory, 24, data.length);
      write16(directory, 28, name.length);
      write32(directory, 42, offset);
      directory.set(name, 46);
      central.push(directory);
      offset += header.length + data.length;
    }
    const centralSize = central.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    write32(end, 0, 0x06054b50);
    write16(end, 8, central.length);
    write16(end, 10, central.length);
    write32(end, 12, centralSize);
    write32(end, 16, offset);
    return new Blob([...local, ...central, end], { type: 'application/zip' });
  }

  const messages = {
    zh: {
      invalid_id: '方块或物品 ID 格式错误。请填写 namespace:path。',
      invalid_format: '请填写目标 Minecraft 版本使用的 pack_format 整数。',
      no_season: '至少选择一个适宜季节。',
      invalid_humidity: '湿度范围无效：最低湿度不能高于最高湿度。',
      ready: '已生成 {count} 个文件。请核对目标版本的 pack_format。'
    },
    en: {
      invalid_id: 'Invalid block or item ID. Use namespace:path.',
      invalid_format: 'Enter the pack_format integer for your target Minecraft version.',
      no_season: 'Select at least one growing season.',
      invalid_humidity: 'Invalid humidity range: minimum must not exceed maximum.',
      ready: 'Generated {count} files. Verify pack_format for your target version.'
    }
  };

  function initialize(root) {
    if (root.dataset.initialized) return;
    root.dataset.initialized = 'true';
    const form = root.querySelector('form');
    const status = root.querySelector('[role="status"]');
    const preview = root.querySelector('pre');
    const language = root.dataset.language === 'en' ? 'en' : 'zh';
    form.addEventListener('submit', event => {
      event.preventDefault();
      try {
        const fields = new FormData(form);
        const files = buildFiles({
          blockId: String(fields.get('block') || '').trim(),
          itemId: String(fields.get('item') || '').trim(),
          seasons: fields.getAll('season'),
          humidityLow: fields.get('humidity_low'),
          humidityHigh: fields.get('humidity_high'),
          packFormat: Number(fields.get('pack_format'))
        });
        const archive = zipFiles(files);
        const url = URL.createObjectURL(archive);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ecliptic-seasons-crop-integration.zip';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 60000);
        preview.textContent = Object.keys(files).join('\n');
        status.textContent = messages[language].ready.replace('{count}', Object.keys(files).length);
      } catch (error) {
        status.textContent = messages[language][error.message] || String(error);
      }
    });
  }

  function initAll() {
    document.querySelectorAll('[data-es-datapack-generator]').forEach(initialize);
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
    else initAll();
    if (typeof document$ !== 'undefined') document$.subscribe(initAll);
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { buildFiles, zipFiles };
})();
