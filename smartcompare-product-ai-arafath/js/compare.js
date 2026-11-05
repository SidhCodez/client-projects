/**
 * compare.js — SmartCompare AI
 * Main dashboard controller: scoring, mode weights, UI, localStorage.
 */

(() => {

  /* ── State ───────────────────────────────────── */
  let specA = null;
  let specB = null;
  let currentMode = 'general';

  /* ── Mode weight presets ─────────────────────── */
  const MODE_WEIGHTS = {
    general: {
      performance: 0.20,
      battery:     0.20,
      camera:      0.15,
      storage:     0.15,
      value:       0.20,
      rating:      0.10
    },
    student: {
      performance: 0.15,
      battery:     0.25,
      camera:      0.05,
      storage:     0.20,
      value:       0.30,
      rating:      0.05
    },
    gamer: {
      performance: 0.35,
      battery:     0.20,
      camera:      0.05,
      storage:     0.20,
      value:       0.10,
      rating:      0.10
    },
    professional: {
      performance: 0.30,
      battery:     0.20,
      camera:      0.10,
      storage:     0.25,
      value:       0.05,
      rating:      0.10
    },
    photographer: {
      performance: 0.10,
      battery:     0.15,
      camera:      0.40,
      storage:     0.20,
      value:       0.05,
      rating:      0.10
    }
  };

  /* ── Scoring engine ──────────────────────────── */
  function scoreSpec(spec, allSpecs) {
    // Normalize each raw metric to 0–100 against peers
    const norm = {};

    /* RAM: 4GB=30, 8GB=60, 12GB=80, 16GB=100 */
    norm.performance = spec.ram !== null
      ? Math.min(100, (spec.ram / 16) * 100)
      : 50;

    /* Battery: 3000mAh=40, 5000mAh=100 */
    norm.battery = spec.battery !== null
      ? clamp((spec.battery - 2000) / 40, 0, 100)
      : 50;

    /* Camera: 12MP=30, 50MP=75, 108MP=100 */
    norm.camera = spec.camera !== null
      ? clamp((spec.camera / 108) * 100, 10, 100)
      : 50;

    /* Storage: 64GB=30, 256GB=70, 512GB=90, 1TB+=100 */
    norm.storage = spec.storage !== null
      ? clamp((spec.storage / 512) * 100, 5, 100)
      : 50;

    /* Value: inverse of price normalized across both products */
    const prices = allSpecs.map(s => s.price).filter(p => p !== null);
    if (spec.price !== null && prices.length >= 2) {
      const maxP = Math.max(...prices);
      const minP = Math.min(...prices);
      const range = maxP - minP || 1;
      // Lower price = higher value score
      norm.value = clamp(100 - ((spec.price - minP) / range) * 100, 0, 100);
    } else if (spec.price !== null) {
      // Single price reference: invert against $1500 ceiling
      norm.value = clamp(100 - (spec.price / 1500) * 100, 0, 100);
    } else {
      norm.value = 50;
    }

    /* Rating: 1/5 = 20, 5/5 = 100 */
    norm.rating = spec.rating !== null
      ? clamp((spec.rating / 5) * 100, 0, 100)
      : 50;

    return norm; // each key: 0–100
  }

  function weightedTotal(normScores, mode) {
    const w = MODE_WEIGHTS[mode] || MODE_WEIGHTS.general;
    return Object.keys(w).reduce((sum, k) => sum + (normScores[k] ?? 50) * w[k], 0);
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  /* ── Ring animation ──────────────────────────── */
  function animateRing(ringId, valueElId, score) {
    const ring  = document.getElementById(ringId);
    const label = document.getElementById(valueElId);
    if (!ring || !label) return;

    const CIRC = 2 * Math.PI * 50; // r=50
    const target = (score / 100) * CIRC;
    ring.style.strokeDasharray = `${target} ${CIRC}`;

    // Count-up animation
    let current = 0;
    const step = score / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, score);
      label.textContent = Math.round(current);
      if (current >= score) clearInterval(timer);
    }, 16);
  }

  /* ── Spec table ──────────────────────────────── */
  function renderSpecTable(sA, sB, nameA, nameB) {
    const container = document.getElementById('spec-table');
    if (!container) return;

    const fields = [
      { label: 'Name',      keyA: sA.name,      keyB: sB.name,      type: 'str' },
      { label: 'Price',     keyA: sA.price,     keyB: sB.price,     type: 'num_low',  fmt: v => `$${v}` },
      { label: 'RAM',       keyA: sA.ram,        keyB: sB.ram,       type: 'num_high', fmt: v => `${v}GB` },
      { label: 'Storage',   keyA: sA.storage,    keyB: sB.storage,   type: 'num_high', fmt: v => v >= 1024 ? `${v/1024}TB` : `${v}GB` },
      { label: 'Battery',   keyA: sA.battery,    keyB: sB.battery,   type: 'num_high', fmt: v => `${v}mAh` },
      { label: 'Camera',    keyA: sA.camera,     keyB: sB.camera,    type: 'num_high', fmt: v => `${v}MP` },
      { label: 'Display',   keyA: sA.display,    keyB: sB.display,   type: 'num_high', fmt: v => `${v}"` },
      { label: 'Rating',    keyA: sA.rating,     keyB: sB.rating,    type: 'num_high', fmt: v => `${v}/5` },
      { label: 'Processor', keyA: sA.processor,  keyB: sB.processor, type: 'str' },
      { label: 'OS',        keyA: sA.os,         keyB: sB.os,        type: 'str' },
      { label: 'Weight',    keyA: sA.weight,     keyB: sB.weight,    type: 'num_low',  fmt: v => `${v}g` },
    ];

    const fmt = (f, v) => {
      if (v === null || v === undefined) return '—';
      return f.fmt ? f.fmt(v) : String(v);
    };

    const headerRow = `
      <div class="spec-row header">
        <div>Spec</div>
        <div>${escHtml(nameA)}</div>
        <div>${escHtml(nameB)}</div>
      </div>`;

    const rows = fields
      .filter(f => f.keyA !== null || f.keyB !== null)
      .map(f => {
        let classA = 'spec-val', classB = 'spec-val';
        if (f.type === 'num_high' && f.keyA !== null && f.keyB !== null) {
          if (f.keyA > f.keyB) classA += ' winner-cell';
          else if (f.keyB > f.keyA) classB += ' winner-cell';
        }
        if (f.type === 'num_low' && f.keyA !== null && f.keyB !== null) {
          if (f.keyA < f.keyB) classA += ' winner-cell';
          else if (f.keyB < f.keyA) classB += ' winner-cell';
        }
        return `
          <div class="spec-row">
            <div class="spec-key">${f.label}</div>
            <div class="${classA}">${fmt(f, f.keyA)}</div>
            <div class="${classB}">${fmt(f, f.keyB)}</div>
          </div>`;
      }).join('');

    container.innerHTML = headerRow + rows;
  }

  /* ── Score breakdown ─────────────────────────── */
  function renderBreakdown(scores, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const labels = {
      performance: 'Performance',
      battery:     'Battery',
      camera:      'Camera',
      storage:     'Storage',
      value:       'Value',
      rating:      'Rating'
    };

    el.innerHTML = Object.entries(labels).map(([k, label]) => `
      <div class="breakdown-row">
        <span class="bd-key">${label}</span>
        <span class="bd-val">${Math.round(scores[k] ?? 0)}</span>
      </div>`).join('');
  }

  /* ── Main compare function ───────────────────── */
  function runComparison() {
    if (!specA || !specB) return;

    const nA = specA.name || 'Product A';
    const nB = specB.name || 'Product B';

    // Score both against each other
    const rawA = scoreSpec(specA, [specA, specB]);
    const rawB = scoreSpec(specB, [specA, specB]);
    const totalA = Math.round(weightedTotal(rawA, currentMode));
    const totalB = Math.round(weightedTotal(rawB, currentMode));

    // Winner banner
    const winner = totalA >= totalB ? nA : nB;
    const winnerTotal = Math.max(totalA, totalB);
    document.getElementById('winner-name').textContent     = winner;
    document.getElementById('winner-score').textContent    = winnerTotal;
    document.getElementById('winner-mode-label').textContent = capitalize(currentMode);

    // Score cards
    document.getElementById('score-name-a').textContent = nA;
    document.getElementById('score-name-b').textContent = nB;

    // Ring animations (defer to let section become visible)
    requestAnimationFrame(() => {
      animateRing('ring-a', 'score-value-a', totalA);
      animateRing('ring-b', 'score-value-b', totalB);
    });

    // Winner card highlight
    document.getElementById('score-card-a').classList.toggle('winner', totalA >= totalB);
    document.getElementById('score-card-b').classList.toggle('winner', totalB > totalA);

    // Breakdowns
    renderBreakdown(rawA, 'breakdown-a');
    renderBreakdown(rawB, 'breakdown-b');

    // Charts
    CHARTS.renderAll(specA, specB, rawA, rawB, totalA, totalB, nA, nB);

    // Spec table
    renderSpecTable(specA, specB, nA, nB);

    // Recommendations
    RECOMMENDATION.render(specA, specB, currentMode, nA, nB);

    // Show results
    document.getElementById('results-section').classList.remove('hidden');
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Persist
    saveToHistory({ specA, specB, mode: currentMode, totalA, totalB });

    showToast(`Comparison complete — ${winner} wins for ${capitalize(currentMode)} mode`);
  }

  /* ── LocalStorage ────────────────────────────── */
  const STORAGE_KEY = 'smartcompare_history';

  function saveToHistory(entry) {
    const history = loadHistory();
    entry.timestamp = Date.now();
    entry.id = entry.timestamp;
    history.unshift(entry);
    // Keep last 20
    const trimmed = history.slice(0, 20);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn('LocalStorage write failed:', e);
    }
  }

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return []; }
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function renderHistoryModal() {
    const list    = document.getElementById('history-list');
    const history = loadHistory();

    if (!history.length) {
      list.innerHTML = '<p class="empty-state">No saved comparisons yet.</p>';
      return;
    }

    list.innerHTML = history.map(entry => `
      <div class="history-item" data-id="${entry.id}">
        <div class="history-item-names">
          ${escHtml(entry.specA?.name || 'Product A')}
          <span style="color:var(--text-muted)"> vs </span>
          ${escHtml(entry.specB?.name || 'Product B')}
        </div>
        <div class="history-item-meta">
          ${capitalize(entry.mode)} mode •
          ${entry.totalA} vs ${entry.totalB} •
          ${new Date(entry.timestamp).toLocaleDateString()}
        </div>
      </div>`).join('');

    // Click to restore
    list.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', () => {
        const id      = parseInt(el.dataset.id);
        const entry   = history.find(h => h.id === id);
        if (!entry) return;

        specA        = entry.specA;
        specB        = entry.specB;
        currentMode  = entry.mode || 'general';

        // Restore mode pill
        setModePill(currentMode);

        // Restore textarea hints
        document.getElementById('raw-a').value = formatSpecBack(specA);
        document.getElementById('raw-b').value = formatSpecBack(specB);
        PARSER.renderPreview(specA, 'preview-a');
        PARSER.renderPreview(specB, 'preview-b');
        updateCompareButton();

        document.getElementById('history-modal').classList.add('hidden');
        runComparison();
      });
    });
  }

  function formatSpecBack(spec) {
    if (!spec) return '';
    const lines = [spec.name || ''];
    if (spec.price)     lines.push(`Price: $${spec.price}`);
    if (spec.ram)       lines.push(`RAM: ${spec.ram}GB`);
    if (spec.storage)   lines.push(`Storage: ${spec.storage}GB`);
    if (spec.battery)   lines.push(`Battery: ${spec.battery}mAh`);
    if (spec.camera)    lines.push(`Camera: ${spec.camera}MP`);
    if (spec.display)   lines.push(`Display: ${spec.display}"`);
    if (spec.rating)    lines.push(`Rating: ${spec.rating}/5`);
    if (spec.processor) lines.push(`Processor: ${spec.processor}`);
    return lines.join('\n');
  }

  /* ── UI helpers ──────────────────────────────── */
  function updateCompareButton() {
    const btn = document.getElementById('btn-compare');
    const ready = specA && specB;
    btn.disabled = !ready;
  }

  function setModePill(mode) {
    document.querySelectorAll('.mode-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.mode === mode);
    });
    currentMode = mode;
  }

  function showToast(msg, duration = 3000) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.add('hidden'), duration);
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  }

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ── Event listeners ─────────────────────────── */
  function init() {

    // Parse buttons
    document.querySelectorAll('.parse-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target  = btn.dataset.target;
        const textarea = document.getElementById(`raw-${target}`);
        const text     = textarea.value.trim();
        if (!text) { showToast('Paste some spec text first'); return; }

        const spec = PARSER.parse(text);
        if (!spec) { showToast('Could not parse specs — try adding field labels like "RAM: 8GB"'); return; }

        if (target === 'a') specA = spec;
        else specB = spec;

        PARSER.renderPreview(spec, `preview-${target}`);
        btn.textContent  = '✓ Parsed';
        btn.classList.add('success');
        setTimeout(() => {
          btn.textContent = 'Parse Specs →';
          btn.classList.remove('success');
        }, 2000);

        updateCompareButton();
      });
    });

    // Clear buttons
    document.querySelectorAll('.clear-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        document.getElementById(`raw-${target}`).value = '';
        document.getElementById(`preview-${target}`).innerHTML = '';
        if (target === 'a') specA = null;
        else specB = null;
        updateCompareButton();
      });
    });

    // Compare button
    document.getElementById('btn-compare').addEventListener('click', () => {
      if (specA && specB) runComparison();
    });

    // Mode pills
    document.querySelectorAll('.mode-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        setModePill(pill.dataset.mode);
        // Re-run if results visible
        if (!document.getElementById('results-section').classList.contains('hidden')) {
          runComparison();
        }
      });
    });

    // History modal
    document.getElementById('btn-history').addEventListener('click', () => {
      renderHistoryModal();
      document.getElementById('history-modal').classList.remove('hidden');
    });
    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('history-modal').classList.add('hidden');
    });
    document.getElementById('history-modal').addEventListener('click', e => {
      if (e.target === e.currentTarget)
        document.getElementById('history-modal').classList.add('hidden');
    });
    document.getElementById('btn-clear-history').addEventListener('click', () => {
      clearHistory();
      renderHistoryModal();
      showToast('History cleared');
    });

    // PDF export
    document.getElementById('btn-export').addEventListener('click', async () => {
      if (!specA || !specB) { showToast('Run a comparison first'); return; }
      showToast('Generating PDF…');
      const rawA = scoreSpec(specA, [specA, specB]);
      const rawB = scoreSpec(specB, [specA, specB]);
      const tA   = Math.round(weightedTotal(rawA, currentMode));
      const tB   = Math.round(weightedTotal(rawB, currentMode));
      await PDF_EXPORT.exportReport(specA, specB, rawA, rawB, tA, tB, currentMode);
    });

    // Keyboard shortcut: Ctrl+Enter to compare
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 'Enter') {
        if (specA && specB) runComparison();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);

})();
