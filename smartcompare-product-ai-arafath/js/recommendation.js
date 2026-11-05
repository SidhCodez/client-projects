/**
 * recommendation.js — SmartCompare AI
 * Generates AI-style strengths, weaknesses, and use-case text
 * from parsed spec objects and computed scores.
 */

const RECOMMENDATION = (() => {

  /* ── Threshold helpers ──────────────────────────── */
  const H = (v, hi, lo) => v !== null && v >= hi ? 'high' : v !== null && v >= lo ? 'mid' : v !== null ? 'low' : null;

  const TIERS = {
    battery:     { high: 4500, lo: 3500 },
    ram:         { high: 12,   lo: 6    },
    camera:      { high: 64,   lo: 32   },
    storage:     { high: 512,  lo: 128  },
    display:     { high: 6.5,  lo: 5.5  },
    price:       { high: 800,  lo: 400  },   // high = expensive
    rating:      { high: 4.5,  lo: 4.0  }
  };

  function tier(spec, field) {
    const v = spec[field];
    const t = TIERS[field];
    if (v === null || v === undefined) return null;
    if (v >= t.high) return 'high';
    if (v >= t.lo)   return 'mid';
    return 'low';
  }

  /* ── Strength / Weakness builders ───────────────── */
  function getStrengths(spec) {
    const s = [];
    if (tier(spec, 'battery') === 'high')
      s.push(`Excellent battery life at ${spec.battery}mAh — ideal for long days away from a charger`);
    if (tier(spec, 'battery') === 'mid')
      s.push(`Decent battery capacity (${spec.battery}mAh) covers typical daily use`);
    if (tier(spec, 'ram') === 'high')
      s.push(`${spec.ram}GB RAM handles heavy multitasking and demanding apps with ease`);
    if (tier(spec, 'camera') === 'high')
      s.push(`${spec.camera}MP main sensor delivers high-detail shots, especially in good light`);
    if (tier(spec, 'storage') === 'high')
      s.push(`${spec.storage >= 1024 ? spec.storage/1024+'TB' : spec.storage+'GB'} storage — ample for media-heavy workflows`);
    if (spec.price !== null && tier(spec, 'price') === 'low')
      s.push(`Strong value proposition at $${spec.price} — competitive in its price bracket`);
    if (tier(spec, 'rating') === 'high')
      s.push(`Highly rated at ${spec.rating}/5 — strong community approval`);
    if (spec.display !== null && spec.display >= 6.7)
      s.push(`Large ${spec.display}" display suits media consumption and productivity`);
    if (spec.processor && /A1[6-9]|A2\d|Snapdragon\s+8\s+Gen\s+[23]|Dimensity\s+9[0-9]\d\d/i.test(spec.processor))
      s.push(`${spec.processor} is a flagship-tier chip — top-end performance`);

    return s.length ? s : ['Well-rounded spec set for its class'];
  }

  function getWeaknesses(spec) {
    const w = [];
    if (tier(spec, 'battery') === 'low' && spec.battery)
      w.push(`${spec.battery}mAh battery may need recharging mid-day under heavy use`);
    if (tier(spec, 'ram') === 'low' && spec.ram)
      w.push(`${spec.ram}GB RAM may limit multitasking on resource-heavy apps`);
    if (tier(spec, 'camera') === 'low' && spec.camera)
      w.push(`${spec.camera}MP main sensor falls behind competing mid-range options`);
    if (tier(spec, 'storage') === 'low' && spec.storage)
      w.push(`${spec.storage}GB base storage fills quickly if you keep photos, video, or games locally`);
    if (spec.price !== null && tier(spec, 'price') === 'high')
      w.push(`At $${spec.price}, premium pricing narrows the audience — value-seekers should compare alternatives`);
    if (spec.display !== null && spec.display < 5.5)
      w.push(`${spec.display}" screen is compact; may feel cramped for media or productivity tasks`);
    if (tier(spec, 'rating') === 'low' && spec.rating)
      w.push(`Rating of ${spec.rating}/5 suggests mixed user satisfaction — check recent reviews`);

    return w.length ? w : ['No significant weaknesses detected from available specs'];
  }

  /* ── Use-case scenarios ─────────────────────────── */
  function getUseCases(spec, mode) {
    const cases = [];

    // Mode-specific scenarios
    const modeMap = {
      student: {
        good: () => spec.price < 600 || (spec.battery >= 4000 && spec.ram >= 6),
        text: spec.price < 600
          ? `Budget-friendly at $${spec.price} — covers student essentials without strain`
          : 'Battery and performance support long study sessions and note-taking'
      },
      gamer: {
        good: () => spec.ram >= 8 && spec.processor,
        text: `${spec.ram}GB RAM ${spec.processor ? 'with ' + spec.processor.substring(0,20) : ''} handles current mobile titles well`
      },
      professional: {
        good: () => spec.ram >= 8 && spec.storage >= 256,
        text: 'Memory and storage configuration suits demanding work apps and document storage'
      },
      photographer: {
        good: () => spec.camera >= 50,
        text: `${spec.camera}MP sensor resolves strong detail — suitable for content creation`
      },
      general: {
        good: () => true,
        text: 'Versatile all-rounder for everyday tasks: communication, browsing, media'
      }
    };

    const modeEntry = modeMap[mode];
    if (modeEntry && modeEntry.good()) cases.push(modeEntry.text);

    // Cross-mode cases
    if (spec.battery >= 4500)  cases.push('Travel — long-haul trips without needing a power bank');
    if (spec.camera >= 64)     cases.push('Social content — high-resolution stills for Instagram, YouTube');
    if (spec.ram >= 12)        cases.push('Power users — browser with 20+ tabs, background apps, split-screen');
    if (spec.display >= 6.7)   cases.push('Streaming and reading — large screen improves comfort significantly');
    if (spec.price < 400)      cases.push('Secondary device or first smartphone upgrade');

    return cases.length ? [...new Set(cases)].slice(0, 4)
      : ['General everyday use — communication, social, light browsing'];
  }

  /* ── Render function ────────────────────────────── */
  function render(specA, specB, mode, nameA, nameB) {
    const container = document.getElementById('rec-grid');
    if (!container) return;

    const products = [
      { spec: specA, name: nameA, id: 'a' },
      { spec: specB, name: specB, id: 'b' }
    ];

    // Fix: second item should be specB, nameB
    const items = [
      { spec: specA, name: nameA },
      { spec: specB, name: nameB }
    ];

    container.innerHTML = items.map(({ spec, name }) => {
      const strengths  = getStrengths(spec);
      const weaknesses = getWeaknesses(spec);
      const useCases   = getUseCases(spec, mode);

      return `
        <div class="rec-card">
          <div class="rec-card-title">
            <span>📱</span> ${escapeHtml(name)}
          </div>

          <div class="rec-section">
            <div class="rec-section-label">✅ Strengths</div>
            <ul class="rec-list strength">
              ${strengths.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
            </ul>
          </div>

          <div class="rec-section">
            <div class="rec-section-label">⚠ Weaknesses</div>
            <ul class="rec-list weakness">
              ${weaknesses.map(w => `<li>${escapeHtml(w)}</li>`).join('')}
            </ul>
          </div>

          <div class="rec-section">
            <div class="rec-section-label">🎯 Best for</div>
            <ul class="rec-list">
              ${useCases.map(u => `<li>${escapeHtml(u)}</li>`).join('')}
            </ul>
          </div>
        </div>`;
    }).join('');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return { render, getStrengths, getWeaknesses, getUseCases };
})();
