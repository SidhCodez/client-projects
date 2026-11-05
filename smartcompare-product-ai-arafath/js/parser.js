/**
 * parser.js — SmartCompare AI
 * Parses raw spec text into a normalized ProductSpec object.
 * Strategy: regex patterns per field with fuzzy fallbacks.
 */

const PARSER = (() => {

  /* ── Schema ──────────────────────────────────────── */
  const EMPTY_SPEC = () => ({
    name: null,
    price: null,          // USD numeric
    ram: null,            // GB numeric
    storage: null,        // GB numeric
    battery: null,        // mAh numeric
    camera: null,         // MP numeric (main lens)
    display: null,        // inches numeric
    rating: null,         // 0–5 numeric
    processor: null,      // string
    os: null,             // string
    weight: null,         // grams numeric
    raw: {}               // all extracted k/v pairs
  });

  /* ── Extraction helpers ──────────────────────────── */

  function extractNumber(text, patterns) {
    for (const p of patterns) {
      const m = text.match(p);
      if (m) return parseFloat(m[1].replace(/,/g, ''));
    }
    return null;
  }

  function extractString(text, patterns) {
    for (const p of patterns) {
      const m = text.match(p);
      if (m) return m[1].trim();
    }
    return null;
  }

  /* ── Field-specific extractors ───────────────────── */

  function parseName(text) {
    // First non-empty line that isn't a key:value pair
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (!line.includes(':') && line.length > 2 && line.length < 80) {
        return line.replace(/^[-*•]\s*/, '');
      }
    }
    // Fallback: look for explicit name: field
    return extractString(text, [
      /(?:^|\n)\s*(?:product\s*)?name\s*[:=]\s*(.+)/i,
      /(?:^|\n)\s*model\s*[:=]\s*(.+)/i
    ]) || lines[0] || 'Unknown Product';
  }

  function parsePrice(text) {
    return extractNumber(text, [
      /price\s*[:=]?\s*\$?\s*([\d,]+(?:\.\d{1,2})?)/i,
      /\$\s*([\d,]+(?:\.\d{1,2})?)/,
      /(?:USD|usd)\s*([\d,]+(?:\.\d{1,2})?)/,
      /(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d{1,2})?)/i,
      /cost(?:s)?\s*[:=]?\s*\$?\s*([\d,]+)/i
    ]);
  }

  function parseRAM(text) {
    return extractNumber(text, [
      /ram\s*[:=]?\s*([\d.]+)\s*GB/i,
      /(\d+)\s*GB\s+RAM/i,
      /memory\s*[:=]?\s*([\d.]+)\s*GB/i,
      /(\d+)\s*GB\s+(?:LPDDR\d?|DDR\d?)/i
    ]);
  }

  function parseStorage(text) {
    // Prefer internal/base storage, skip RAM hits
    const lines = text.split('\n');
    for (const line of lines) {
      if (/storage|internal|disk|ssd|rom/i.test(line)) {
        const m = line.match(/([\d.]+)\s*(TB|GB)/i);
        if (m) {
          const v = parseFloat(m[1]);
          return m[2].toUpperCase() === 'TB' ? v * 1024 : v;
        }
      }
    }
    // Fallback: find TB/GB values that aren't RAM
    const tbMatch = text.match(/([\d.]+)\s*TB\s+(?:storage|internal|ssd)/i);
    if (tbMatch) return parseFloat(tbMatch[1]) * 1024;
    return extractNumber(text, [
      /storage\s*[:=]?\s*([\d.]+)\s*(?:GB|TB)/i,
      /(?:internal|built-?in)\s*(?:storage|memory)\s*[:=]?\s*([\d.]+)/i
    ]);
  }

  function parseBattery(text) {
    return extractNumber(text, [
      /battery\s*[:=]?\s*([\d,]+)\s*m[Aa][Hh]/i,
      /([\d,]+)\s*m[Aa][Hh]/i,
      /battery\s*capacity\s*[:=]?\s*([\d,]+)/i
    ]);
  }

  function parseCamera(text) {
    // Extract main camera MP
    return extractNumber(text, [
      /(\d+)\s*MP\s+main/i,
      /main\s*(?:camera)?\s*[:=]?\s*(\d+)\s*MP/i,
      /primary\s*(?:camera)?\s*[:=]?\s*(\d+)\s*MP/i,
      /camera\s*[:=]?\s*(\d+)\s*MP/i,
      /(\d+)\s*MP\s+(?:rear|back)/i,
      /(\d+)\s*megapixel/i
    ]);
  }

  function parseDisplay(text) {
    return extractNumber(text, [
      /(\d+(?:\.\d+)?)["\s]*[-–]?\s*inch/i,
      /display\s*[:=]?\s*(\d+(?:\.\d+)?)/i,
      /screen\s*(?:size)?\s*[:=]?\s*(\d+(?:\.\d+)?)/i,
      /(\d+(?:\.\d+)?)\s*″/i
    ]);
  }

  function parseRating(text) {
    const m = text.match(/(\d+(?:\.\d+)?)\s*\/\s*5/i)
           || text.match(/rating\s*[:=]?\s*(\d+(?:\.\d+)?)/i)
           || text.match(/score\s*[:=]?\s*(\d+(?:\.\d+)?)/i)
           || text.match(/(\d+(?:\.\d+)?)\s*stars?/i);
    if (m) {
      const v = parseFloat(m[1]);
      // Normalize to 0-5 scale
      return v > 5 ? v / 2 : v;
    }
    return null;
  }

  function parseProcessor(text) {
    return extractString(text, [
      /(?:processor|chip|cpu|soc)\s*[:=]\s*(.+)/i,
      /(Snapdragon\s[\d\w\s]+)/i,
      /(Apple\s+[A-Z]\d+\s*(?:Bionic|Pro)?)/i,
      /(MediaTek\s+\w+\s*[\d\w]*)/i,
      /(Dimensity\s+\d+\w*)/i,
      /(Exynos\s+\d+\w*)/i,
      /(Intel\s+Core\s+\w+[-\s]\d+\w*)/i,
      /(AMD\s+Ryzen\s+[\d\w\s]+)/i
    ]);
  }

  function parseOS(text) {
    return extractString(text, [
      /(?:os|operating system)\s*[:=]\s*(.+)/i,
      /(Android\s+\d+[\.\d]*)/i,
      /(iOS\s+\d+[\.\d]*)/i,
      /(Windows\s+\d+[^\n,]+)/i,
      /(macOS\s+\w+)/i,
      /(iPadOS\s+\d+)/i
    ]);
  }

  function parseWeight(text) {
    return extractNumber(text, [
      /weight\s*[:=]?\s*([\d.]+)\s*g(?:rams?)?(?!\s*[a-z])/i,
      /([\d.]+)\s*grams?/i,
      /(?:weighs?|mass)\s*[:=]?\s*([\d.]+)/i
    ]);
  }

  /* ── Key-value sweeper ───────────────────────────── */
  function sweepKeyValues(text) {
    const raw = {};
    const lines = text.split('\n');
    for (const line of lines) {
      const m = line.match(/^\s*([^:]{1,40})\s*:\s*(.+)$/);
      if (m) {
        const key = m[1].trim().toLowerCase().replace(/\s+/g, '_');
        raw[key] = m[2].trim();
      }
    }
    return raw;
  }

  /* ── Main parse function ─────────────────────────── */
  function parse(text) {
    if (!text || text.trim().length < 5) return null;

    const spec = EMPTY_SPEC();
    spec.name      = parseName(text);
    spec.price     = parsePrice(text);
    spec.ram       = parseRAM(text);
    spec.storage   = parseStorage(text);
    spec.battery   = parseBattery(text);
    spec.camera    = parseCamera(text);
    spec.display   = parseDisplay(text);
    spec.rating    = parseRating(text);
    spec.processor = parseProcessor(text);
    spec.os        = parseOS(text);
    spec.weight    = parseWeight(text);
    spec.raw       = sweepKeyValues(text);

    return spec;
  }

  /* ── Preview tags ────────────────────────────────── */
  function renderPreview(spec, containerId) {
    const el = document.getElementById(containerId);
    if (!el || !spec) return;

    const fields = [
      { key: 'name',      icon: '📱', label: 'Name',      fmt: v => v },
      { key: 'price',     icon: '💰', label: 'Price',     fmt: v => `$${v}` },
      { key: 'ram',       icon: '🧠', label: 'RAM',       fmt: v => `${v}GB` },
      { key: 'storage',   icon: '💾', label: 'Storage',   fmt: v => v >= 1024 ? `${v/1024}TB` : `${v}GB` },
      { key: 'battery',   icon: '🔋', label: 'Battery',   fmt: v => `${v}mAh` },
      { key: 'camera',    icon: '📸', label: 'Camera',    fmt: v => `${v}MP` },
      { key: 'display',   icon: '📺', label: 'Display',   fmt: v => `${v}"` },
      { key: 'rating',    icon: '⭐', label: 'Rating',    fmt: v => `${v}/5` },
      { key: 'processor', icon: '⚙️',  label: 'CPU',       fmt: v => v.substring(0,22) + (v.length>22?'…':'') },
    ];

    const tags = fields
      .filter(f => spec[f.key] !== null && spec[f.key] !== undefined)
      .map(f => `
        <span class="parsed-tag">
          ${f.icon}
          <span class="tag-key">${f.label}:</span>
          ${f.fmt(spec[f.key])}
        </span>`)
      .join('');

    el.innerHTML = tags || '<span style="color:var(--text-muted);font-size:12px;">No fields detected — try adding labels like "RAM: 8GB"</span>';
  }

  return { parse, renderPreview };
})();
