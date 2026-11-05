/* ===== STATE ===== */
let currentIdea = {};
let allCompetitors = [];
let trendBarChart, trendLineChart;

/* ===== THEME ===== */
(function initTheme() {
  const t = localStorage.getItem('ideaproof-theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
  updateThemeIcon(t);
})();

document.getElementById('themeToggle').addEventListener('click', () => {
  const curr = document.documentElement.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ideaproof-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(t) {
  document.getElementById('themeToggle').innerHTML =
    t === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

/* ===== FORM ===== */
function scrollToForm() {
  document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
}

['startupName', 'ideaDesc'].forEach(id => {
  const el = document.getElementById(id);
  const countEl = document.getElementById(id === 'startupName' ? 'nameCount' : 'descCount');
  const max = el.maxLength;
  el.addEventListener('input', () => { countEl.textContent = `${el.value.length}/${max}`; });
});

function clearForm() {
  ['startupName', 'ideaDesc', 'targetAudience', 'region'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('industry').value = '';
  document.getElementById('nameCount').textContent = '0/60';
  document.getElementById('descCount').textContent = '0/500';
  document.getElementById('formError').classList.add('hidden');
}

/* ===== VALIDATION ===== */
function validate() {
  const name = document.getElementById('startupName').value.trim();
  const desc = document.getElementById('ideaDesc').value.trim();
  const ind = document.getElementById('industry').value;
  const aud = document.getElementById('targetAudience').value.trim();
  const reg = document.getElementById('region').value.trim();
  if (!name || !desc || !ind || !aud || !reg) {
    showError('Please fill in all required fields.');
    return false;
  }
  if (desc.length < 20) {
    showError('Please describe your idea in at least 20 characters.');
    return false;
  }
  return true;
}

function showError(msg) {
  const el = document.getElementById('formError');
  el.textContent = msg;
  el.classList.remove('hidden');
}

/* ===== LOADING STEPS ===== */
const STEPS = [
  'Understanding Idea',
  'Finding Competitors',
  'Market Analysis',
  'SWOT Generation',
  'Risk Assessment',
  'Revenue Strategy',
  'Final Validation'
];

async function animateSteps(onStep) {
  const list = document.getElementById('stepsList');
  list.innerHTML = STEPS.map((s, i) =>
    `<div class="step-item" id="step${i}"><i class="fa-regular fa-circle"></i> ${s}</div>`
  ).join('');

  for (let i = 0; i < STEPS.length; i++) {
    const el = document.getElementById(`step${i}`);
    el.classList.add('active');
    el.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin';
    document.getElementById('loadingSub').textContent = `${STEPS[i]}…`;
    await onStep(i);
    el.classList.remove('active');
    el.classList.add('done');
    el.querySelector('i').className = 'fa-solid fa-circle-check';
  }
}

/* ===== MAIN ANALYSIS ===== */
async function startAnalysis() {
  if (!validate()) return;

  currentIdea = {
    name: document.getElementById('startupName').value.trim(),
    desc: document.getElementById('ideaDesc').value.trim(),
    industry: document.getElementById('industry').value,
    audience: document.getElementById('targetAudience').value.trim(),
    region: document.getElementById('region').value.trim(),
    timestamp: new Date().toISOString()
  };

  document.getElementById('loadingOverlay').classList.remove('hidden');
  document.getElementById('resultsSection').classList.add('hidden');

  const data = {};

  await animateSteps(async (step) => {
    await delay(400 + Math.random() * 400);
    if (step === 0) {
      data.score = generateScore(currentIdea);
      data.usp = generateUSP(currentIdea);
    }
    if (step === 1) {
      data.competitors = await fetchCompetitors(currentIdea);
    }
    if (step === 2) {
      data.market = generateMarket(currentIdea);
      data.trends = generateTrends(currentIdea);
      data.signals = await fetchLiveSignals(currentIdea);
    }
    if (step === 3) {
      data.swot = generateSWOT(currentIdea);
    }
    if (step === 4) {
      data.risks = generateRisks(currentIdea);
    }
    if (step === 5) {
      data.revenue = generateRevenue(currentIdea);
      data.audience = generateAudience(currentIdea);
      data.canvas = generateCanvas(currentIdea);
    }
    if (step === 6) {
      data.improvements = generateImprovements(currentIdea);
    }
  });

  document.getElementById('loadingOverlay').classList.add('hidden');

  saveHistory(currentIdea, data.score.overall);
  renderResults(data);
  document.getElementById('resultsSection').classList.remove('hidden');
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

/* ===== SCORE ENGINE ===== */
function generateScore(idea) {
  const seed = hashStr(idea.name + idea.desc + idea.industry);
  const rand = seededRand(seed);

  // Weight factors
  const industryBonus = { 'AI / ML': 8, 'SaaS': 6, 'HealthTech': 5, 'FinTech': 5, 'EdTech': 4, 'E-Commerce': 2 };
  const bonus = (industryBonus[idea.industry] || 3);

  const cats = {
    'Market Need':       clamp(Math.round(rand() * 35 + 50 + bonus), 20, 99),
    'Innovation':        clamp(Math.round(rand() * 40 + 40 + bonus), 20, 99),
    'Scalability':       clamp(Math.round(rand() * 35 + 45 + bonus), 20, 99),
    'Competition':       clamp(Math.round(rand() * 40 + 35 + bonus), 20, 99),
    'Revenue Potential': clamp(Math.round(rand() * 35 + 48 + bonus), 20, 99),
  };
  const overall = Math.round(Object.values(cats).reduce((a, b) => a + b, 0) / 5);
  return { overall, cats };
}

/* ===== COMPETITOR FETCH ===== */
async function fetchCompetitors(idea) {
  const query = `${idea.industry} ${idea.name} startup`;
  let comps = [];

  // Try Wikipedia
  try {
    const r = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(idea.industry + ' company software')}&limit=5&format=json&origin=*`
    );
    const d = await r.json();
    if (d[1] && d[1].length) {
      comps = d[1].slice(0, 3).map((name, i) => ({
        name,
        desc: d[2][i] || `Leading company in the ${idea.industry} space.`,
        website: d[3][i] || `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`,
        strengths: pickN(COMP_STRENGTHS, 3, hashStr(name)),
        weaknesses: pickN(COMP_WEAKNESSES, 2, hashStr(name + '1')),
        position: POSITIONS[Math.abs(hashStr(name)) % POSITIONS.length],
        similarity: Math.round(50 + seededRand(hashStr(name))() * 40),
        source: 'wikipedia'
      }));
    }
  } catch {}

  // Try GitHub search for open-source competitors
  try {
    const r = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(idea.industry.toLowerCase() + '+' + idea.name.toLowerCase().split(' ')[0])}&sort=stars&per_page=3`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    const d = await r.json();
    if (d.items && d.items.length) {
      d.items.slice(0, 2).forEach(repo => {
        comps.push({
          name: repo.name,
          desc: repo.description || `Open-source project in the ${idea.industry} space.`,
          website: repo.html_url,
          strengths: ['Open-source', 'Community-driven', 'Free tier'],
          weaknesses: ['Limited support', 'Self-hosted complexity'],
          position: 'Niche',
          similarity: Math.round(30 + seededRand(hashStr(repo.name))() * 35),
          source: 'github'
        });
      });
    }
  } catch {}

  // Always pad with mock if <4
  const mockComps = getMockCompetitors(idea);
  while (comps.length < 4) {
    const m = mockComps[comps.length % mockComps.length];
    if (!comps.find(c => c.name === m.name)) comps.push(m);
    else break;
  }

  return comps.slice(0, 6);
}

/* ===== LIVE SIGNALS ===== */
async function fetchLiveSignals(idea) {
  const signals = [];

  // Hacker News
  try {
    const r = await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(idea.industry)}&tags=story&hitsPerPage=3`);
    const d = await r.json();
    if (d.hits) {
      d.hits.slice(0, 3).forEach(h => {
        signals.push({
          source: 'HN',
          text: h.title,
          url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
          type: 'hn'
        });
      });
    }
  } catch {}

  // Reddit
  try {
    const sub = REDDIT_SUBS[idea.industry] || 'startups';
    const r = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=3`, {
      headers: { Accept: 'application/json' }
    });
    const d = await r.json();
    if (d.data && d.data.children) {
      d.data.children.slice(0, 3).forEach(p => {
        const post = p.data;
        signals.push({
          source: 'Reddit',
          text: post.title,
          url: `https://reddit.com${post.permalink}`,
          type: 'reddit'
        });
      });
    }
  } catch {}

  // Fallback
  if (signals.length < 3) {
    MOCK_SIGNALS[idea.industry]?.forEach(s => signals.push(s));
  }

  return signals.slice(0, 6);
}

/* ===== GENERATORS ===== */
function generateUSP(idea) {
  const templates = [
    `${idea.name} empowers ${idea.audience} with an intelligent ${idea.industry} platform that eliminates friction and drives real outcomes.`,
    `Unlike generic tools, ${idea.name} delivers tailored ${idea.industry} solutions specifically designed for ${idea.audience} in ${idea.region}.`,
    `${idea.name} is the first AI-native ${idea.industry} product built from the ground up for ${idea.audience}—combining automation, analytics, and action in one seamless platform.`,
    `${idea.audience} deserve better ${idea.industry} tools. ${idea.name} makes that possible with minimal setup and maximum results.`,
    `${idea.name} brings enterprise-grade ${idea.industry} intelligence to ${idea.audience}—without the enterprise price tag.`,
  ];
  return templates[Math.abs(hashStr(idea.name)) % templates.length];
}

function generateMarket(idea) {
  const seed = hashStr(idea.industry);
  const r = seededRand(seed);
  const sizes = ['$2.1B', '$4.8B', '$8.3B', '$12B', '$22B', '$35B', '$67B'];
  const growths = ['14% CAGR', '18% CAGR', '22% CAGR', '31% CAGR', '9% CAGR'];
  const demands = ['High', 'Very High', 'Moderate', 'Growing'];
  const maturities = ['Emerging', 'Growth Stage', 'Mature', 'Early Stage'];
  return {
    demand: demands[Math.floor(r() * demands.length)],
    growth: growths[Math.floor(r() * growths.length)],
    maturity: maturities[Math.floor(r() * maturities.length)],
    size: sizes[Math.floor(r() * sizes.length)],
  };
}

function generateSWOT(idea) {
  const s = hashStr(idea.name + idea.industry);
  return {
    strengths: pickN(SWOT_DATA.strengths, 4, s),
    weaknesses: pickN(SWOT_DATA.weaknesses, 3, s + 1),
    opportunities: pickN(SWOT_DATA.opportunities, 4, s + 2),
    threats: pickN(SWOT_DATA.threats, 3, s + 3),
  };
}

function generateRisks(idea) {
  return [
    { name: 'Competition Risk', level: pickLevel(idea, 0), desc: 'Existing players may respond aggressively to new market entrants.' },
    { name: 'Technical Risk', level: pickLevel(idea, 1), desc: 'Building and scaling the core product may face unexpected complexity.' },
    { name: 'Financial Risk', level: pickLevel(idea, 2), desc: 'Runway constraints could limit growth before product-market fit is achieved.' },
    { name: 'Adoption Risk', level: pickLevel(idea, 3), desc: 'Target users may be slow to change existing habits or tools.' },
  ];
}

function pickLevel(idea, idx) {
  const levels = ['Low', 'Medium', 'High'];
  return levels[(Math.abs(hashStr(idea.name)) + idx * 7) % 3];
}

function generateRevenue(idea) {
  const seed = hashStr(idea.industry);
  const r = seededRand(seed);
  const all = [
    { name: 'Subscription', icon: '🔄', desc: 'Monthly/annual recurring revenue from users.', score: Math.round(r() * 30 + 60) },
    { name: 'Freemium', icon: '🆓', desc: 'Free tier converts to paid via premium features.', score: Math.round(r() * 30 + 55) },
    { name: 'Commission', icon: '💰', desc: 'Take a % of every transaction on the platform.', score: Math.round(r() * 40 + 40) },
    { name: 'Marketplace', icon: '🏪', desc: 'Connect buyers and sellers; earn on each deal.', score: Math.round(r() * 40 + 35) },
    { name: 'Enterprise Licensing', icon: '🏢', desc: 'Annual contracts with large organizations.', score: Math.round(r() * 35 + 50) },
    { name: 'Affiliate', icon: '🤝', desc: 'Earn referral fees from partner products.', score: Math.round(r() * 40 + 30) },
    { name: 'Advertising', icon: '📢', desc: 'Monetize audience reach via targeted ads.', score: Math.round(r() * 30 + 20) },
  ];
  all.sort((a, b) => b.score - a.score);
  all[0].recommended = true;
  return all;
}

function generateAudience(idea) {
  return [
    { type: 'Primary', name: idea.audience, detail: `Early power users who feel the pain point most acutely. Likely to champion the product and generate word-of-mouth in ${idea.region}.` },
    { type: 'Secondary', name: `Enterprise ${idea.industry} teams`, detail: `Larger organizations that will adopt once the product proves ROI at scale.` },
    { type: 'Early Adopters', name: `Tech-forward ${idea.audience.split(',')[0]}`, detail: 'First 100 users who value innovation over stability and will provide critical feedback.' },
  ];
}

function generateCanvas(idea) {
  return [
    { label: 'Value Proposition', content: `Helping ${idea.audience} solve key ${idea.industry} challenges through ${idea.name}'s core product.`, full: false },
    { label: 'Customer Segments', content: `${idea.audience} in ${idea.region}. SMBs and individuals in ${idea.industry}.`, full: false },
    { label: 'Revenue Streams', content: 'Subscription, Freemium upsell, Enterprise licensing.', full: false },
    { label: 'Channels', content: 'Product Hunt, LinkedIn, SEO, Partnerships, Content Marketing.', full: false },
    { label: 'Key Activities', content: `Product development, Customer success, Marketing, Community building.`, full: false },
    { label: 'Key Resources', content: 'Engineering team, AI infrastructure, Domain expertise, Customer data.', full: false },
    { label: 'Key Partners', content: `Cloud providers, ${idea.industry} associations, Distribution partners.`, full: false },
    { label: 'Cost Structure', content: 'Engineering salaries, Cloud hosting, Marketing & sales, Customer support.', full: false },
  ];
}

function generateTrends(idea) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seed = hashStr(idea.industry);
  const r = seededRand(seed);
  const base = Math.round(r() * 30 + 40);
  const line = months.map((_, i) => clamp(Math.round(base + i * (r() * 5 - 1) + (r() * 10 - 5)), 10, 100));
  const bar = ['Market Demand', 'Investor Interest', 'Job Postings', 'Media Coverage', 'Search Volume']
    .map(label => ({ label, value: Math.round(r() * 50 + 40) }));
  return { months, line, bar };
}

function generateImprovements(idea) {
  const pool = [
    `Narrow your initial target audience to a single niche within ${idea.audience} for faster traction.`,
    'Add a recurring revenue model early — monthly subscriptions reduce dependency on one-time sales.',
    `Build a waitlist page for ${idea.name} before the MVP — validate demand before writing code.`,
    `Partner with ${idea.industry} communities and influencers to reduce early CAC.`,
    'Publish a case study or use-case explainer to capture SEO traffic from your ICP.',
    'Offer a generous free trial (14-30 days) to reduce friction for first-time users.',
    `Consider a ${idea.region}-specific compliance or localization angle to build trust faster.`,
    'Build in-product referral mechanics from day one — word-of-mouth compounds fast.',
    'Track one north-star metric and align the entire team around it before scaling.',
    'Establish a customer advisory board of 5 early users to guide your roadmap.',
  ];
  const seed = hashStr(idea.name + idea.industry);
  return pickN(pool, 10, seed);
}

/* ===== RENDER ===== */
function renderResults(data) {
  document.getElementById('resultTitle').textContent = `${currentIdea.name} — Analysis`;
  renderScore(data.score);
  renderReadiness(data.score.overall);
  document.getElementById('uspText').textContent = data.usp;
  renderMarket(data.market);
  renderSWOT(data.swot);
  allCompetitors = data.competitors;
  renderCompetitors(allCompetitors);
  renderCompTable(allCompetitors);
  renderRevenue(data.revenue);
  renderAudience(data.audience);
  renderCanvas(data.canvas);
  renderRisks(data.risks);
  renderTrends(data.trends);
  renderImprovements(data.improvements);
  renderSignals(data.signals);
  initChat();
}

function renderScore(score) {
  // Animate gauge
  const path = document.getElementById('gaugeFill');
  const numEl = document.getElementById('gaugeNum');
  const totalLen = 283;
  let curr = 0;
  const target = score.overall;
  const interval = setInterval(() => {
    curr = Math.min(curr + 2, target);
    const frac = curr / 100;
    path.setAttribute('stroke-dasharray', `${frac * totalLen} ${totalLen}`);
    numEl.textContent = curr;

    const color = curr >= 75 ? '#10B981' : curr >= 55 ? '#4F46E5' : curr >= 40 ? '#F59E0B' : '#EF4444';
    path.setAttribute('stroke', color);

    if (curr >= target) {
      clearInterval(interval);
      const verdict = document.getElementById('scoreVerdict');
      if (target >= 75) { verdict.textContent = '🚀 Great potential'; verdict.className = 'score-verdict verdict-great'; }
      else if (target >= 55) { verdict.textContent = '👍 Solid idea'; verdict.className = 'score-verdict verdict-good'; }
      else if (target >= 40) { verdict.textContent = '⚠️ Needs refinement'; verdict.className = 'score-verdict verdict-ok'; }
      else { verdict.textContent = '⛔ Rethink required'; verdict.className = 'score-verdict verdict-low'; }
    }
  }, 18);

  // Score bars
  const barsEl = document.getElementById('scoreBars');
  barsEl.innerHTML = '';
  Object.entries(score.cats).forEach(([label, val]) => {
    const color = val >= 70 ? 'var(--success)' : val >= 50 ? 'var(--primary)' : 'var(--warning)';
    barsEl.innerHTML += `
      <div class="score-bar-row">
        <div class="score-bar-label"><span>${label}</span><span>${val}</span></div>
        <div class="bar-track"><div class="bar-fill" style="background:${color}" data-val="${val}"></div></div>
      </div>`;
  });
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(el => {
      el.style.width = el.dataset.val + '%';
    });
  }, 200);
}

function renderReadiness(score) {
  const stages = [
    { label: 'Idea Stage', icon: '💡', min: 0 },
    { label: 'MVP Stage', icon: '🔧', min: 40 },
    { label: 'Launch Stage', icon: '🚀', min: 60 },
    { label: 'Scale Stage', icon: '📈', min: 80 },
  ];
  const track = document.getElementById('readinessTrack');
  track.innerHTML = stages.map((s, i) => {
    const cls = score >= s.min ? (score >= (stages[i + 1]?.min || 101) ? 'done' : 'active') : '';
    return `<div class="readiness-stage ${cls}"><div class="readiness-icon">${s.icon}</div>${s.label}</div>`;
  }).join('');
}

function renderMarket(m) {
  const items = [
    { label: 'Market Demand', value: m.demand, desc: 'Current demand from your target users' },
    { label: 'Market Size', value: m.size, desc: 'Total addressable market estimate' },
    { label: 'Growth Potential', value: m.growth, desc: 'Projected annual growth rate' },
    { label: 'Industry Maturity', value: m.maturity, desc: 'Stage of the overall market' },
  ];
  document.getElementById('marketGrid').innerHTML = items.map(i =>
    `<div class="insight-card animate-in">
      <div class="insight-card-label">${i.label}</div>
      <div class="insight-card-value">${i.value}</div>
      <div class="insight-card-desc">${i.desc}</div>
    </div>`
  ).join('');
}

function renderSWOT(swot) {
  const cfg = [
    { key: 'strengths', cls: 'swot-s', icon: '💪', label: 'Strengths', color: '#065F46' },
    { key: 'weaknesses', cls: 'swot-w', icon: '⚠️', label: 'Weaknesses', color: '#991B1B' },
    { key: 'opportunities', cls: 'swot-o', icon: '🌱', label: 'Opportunities', color: '#1E40AF' },
    { key: 'threats', cls: 'swot-t', icon: '⚡', label: 'Threats', color: '#92400E' },
  ];
  document.getElementById('swotGrid').innerHTML = cfg.map(c =>
    `<div class="swot-card ${c.cls}">
      <div class="swot-header" style="color:${c.color}">${c.icon} ${c.label}</div>
      <ul class="swot-items">${swot[c.key].map(i => `<li>${i}</li>`).join('')}</ul>
    </div>`
  ).join('');
}

function renderCompetitors(comps) {
  const grid = document.getElementById('compGrid');
  grid.innerHTML = comps.map(c => `
    <div class="comp-card animate-in" data-name="${c.name}" data-pos="${c.position}">
      <div class="comp-name">${c.name}</div>
      <div class="comp-desc">${c.desc}</div>
      <span class="comp-tag tag-pos">${c.position}</span>
      ${c.source === 'github' ? '<span class="comp-tag tag-est">Open Source</span>' : '<span class="comp-tag tag-est">Established</span>'}
      <div class="comp-strengths-wrap"><strong>Strengths:</strong> ${c.strengths.join(', ')}</div>
      <a class="comp-link" href="${c.website}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Visit</a>
    </div>
  `).join('');
}

function filterCompetitors() {
  const q = document.getElementById('compSearch').value.toLowerCase();
  const filtered = allCompetitors.filter(c =>
    c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.position.toLowerCase().includes(q)
  );
  renderCompetitors(filtered);
}

function sortCompetitors() {
  const by = document.getElementById('compSort').value;
  const sorted = [...allCompetitors].sort((a, b) => a[by]?.localeCompare?.(b[by]) || 0);
  renderCompetitors(sorted);
}

function renderCompTable(comps) {
  document.getElementById('compTableBody').innerHTML = comps.map(c => {
    const simCls = c.similarity >= 70 ? 'sim-high' : c.similarity >= 50 ? 'sim-mid' : 'sim-low';
    return `<tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.strengths.slice(0, 2).join(', ')}</td>
      <td>${c.weaknesses.slice(0, 2).join(', ')}</td>
      <td>${c.position}</td>
      <td><span class="similarity-badge ${simCls}">${c.similarity}%</span></td>
    </tr>`;
  }).join('');
}

function renderRevenue(models) {
  document.getElementById('revenueGrid').innerHTML = models.map(m =>
    `<div class="revenue-card ${m.recommended ? 'recommended' : ''}">
      <div class="revenue-icon">${m.icon}</div>
      <div class="revenue-name">${m.name}${m.recommended ? '<span class="rec-badge">Top Pick</span>' : ''}</div>
      <div class="revenue-desc">${m.desc}</div>
      <div class="revenue-score">Fit score: ${m.score}/100</div>
    </div>`
  ).join('');
}

function renderAudience(aud) {
  document.getElementById('audienceGrid').innerHTML = aud.map(a =>
    `<div class="audience-card animate-in">
      <div class="audience-type">${a.type}</div>
      <div class="audience-name">${a.name}</div>
      <div class="audience-detail">${a.detail}</div>
    </div>`
  ).join('');
}

function renderCanvas(canvas) {
  document.getElementById('canvasGrid').innerHTML = canvas.map(c =>
    `<div class="canvas-item ${c.full ? 'full' : ''}">
      <div class="canvas-label">${c.label}</div>
      <div class="canvas-content">${c.content}</div>
    </div>`
  ).join('');
}

function renderRisks(risks) {
  document.getElementById('riskGrid').innerHTML = risks.map(r => {
    const lvlCls = r.level === 'Low' ? 'risk-low' : r.level === 'Medium' ? 'risk-medium' : 'risk-high';
    const meterW = r.level === 'Low' ? '30%' : r.level === 'Medium' ? '60%' : '90%';
    return `<div class="risk-card ${lvlCls}">
      <div class="risk-label">${r.level} Risk</div>
      <div class="risk-name">${r.name}</div>
      <div class="risk-desc">${r.desc}</div>
      <div class="risk-meter" style="width:${meterW}"></div>
    </div>`;
  }).join('');
}

function renderTrends(trends) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? '#2A2D3A' : '#E5E7EB';
  const textColor = isDark ? '#8B8FA8' : '#6B7280';

  if (trendBarChart) trendBarChart.destroy();
  if (trendLineChart) trendLineChart.destroy();

  trendBarChart = new Chart(document.getElementById('trendBar'), {
    type: 'bar',
    data: {
      labels: trends.bar.map(b => b.label),
      datasets: [{ label: 'Score', data: trends.bar.map(b => b.value), backgroundColor: '#4F46E5', borderRadius: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { ticks: { color: textColor }, grid: { color: gridColor }, max: 100 }
      }
    }
  });

  trendLineChart = new Chart(document.getElementById('trendLine'), {
    type: 'line',
    data: {
      labels: trends.months,
      datasets: [{ label: 'Interest', data: trends.line, borderColor: '#4F46E5', backgroundColor: 'rgba(79,70,229,0.08)', fill: true, tension: 0.4, pointRadius: 3 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { ticks: { color: textColor }, grid: { color: gridColor }, max: 100 }
      }
    }
  });
}

function renderImprovements(list) {
  document.getElementById('improvList').innerHTML = list.map((text, i) =>
    `<div class="improv-item animate-in">
      <div class="improv-num">${i + 1}</div>
      <div class="improv-text">${text}</div>
    </div>`
  ).join('');
}

function renderSignals(signals) {
  const el = document.getElementById('liveSignals');
  if (!signals || signals.length === 0) {
    el.innerHTML = '<p style="color:var(--text-soft);font-size:13px">No live signals found — check back later.</p>';
    return;
  }
  el.innerHTML = signals.map(s =>
    `<a class="signal-item" href="${s.url}" target="_blank" rel="noopener">
      <span class="signal-source sig-${s.type}">${s.source}</span>
      <span class="signal-text">${s.text}</span>
      <i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--text-soft);font-size:11px;flex-shrink:0"></i>
    </a>`
  ).join('');
}

/* ===== CHAT ===== */
const QUICK_QUESTIONS = [
  'How can I improve this idea?',
  'Best revenue model?',
  'Biggest risks?',
  'Go-to-market strategy?',
];

function initChat() {
  const win = document.getElementById('chatWindow');
  win.innerHTML = `<div class="chat-bubble bubble-ai">Hi! I'm your AI Startup Advisor for <strong>${currentIdea.name}</strong>. Ask me anything about your idea, market, risks, or strategy.</div>`;

  document.getElementById('quickQs').innerHTML = QUICK_QUESTIONS.map(q =>
    `<button class="quick-q" onclick="sendQuickQ(this,'${q.replace(/'/g, "\\'")}')">${q}</button>`
  ).join('');
}

function sendQuickQ(el, q) {
  document.getElementById('chatInput').value = q;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const q = input.value.trim();
  if (!q) return;
  input.value = '';

  const win = document.getElementById('chatWindow');
  win.innerHTML += `<div class="chat-bubble bubble-user">${q}</div>`;
  win.innerHTML += `<div class="chat-bubble bubble-ai bubble-typing" id="typing">Thinking…</div>`;
  win.scrollTop = win.scrollHeight;

  const answer = await getAIAdvisorResponse(q);
  document.getElementById('typing').remove();
  win.innerHTML += `<div class="chat-bubble bubble-ai animate-in">${answer}</div>`;
  win.scrollTop = win.scrollHeight;
}

async function getAIAdvisorResponse(question) {
  const context = `Startup: ${currentIdea.name}. Industry: ${currentIdea.industry}. Description: ${currentIdea.desc}. Target: ${currentIdea.audience}. Region: ${currentIdea.region}.`;

  // Try Groq first (free)
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer gsk_placeholder' },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          { role: 'system', content: `You are a startup advisor. Context: ${context}. Give concise, actionable advice in 2-3 sentences.` },
          { role: 'user', content: question }
        ],
        max_tokens: 200
      })
    });
    if (r.ok) {
      const d = await r.json();
      return d.choices?.[0]?.message?.content || '';
    }
  } catch {}

  // Fallback: smart mock responses
  return generateMockAdvisorResponse(question, currentIdea);
}

function generateMockAdvisorResponse(q, idea) {
  const lower = q.toLowerCase();
  if (lower.includes('improve') || lower.includes('better')) {
    return `Focus ${idea.name} on a single high-pain-point use case for ${idea.audience} first — nail that before expanding. Build a public roadmap and involve early users in feature decisions to drive retention.`;
  }
  if (lower.includes('revenue') || lower.includes('money') || lower.includes('monetize')) {
    return `For ${idea.industry}, a freemium-to-subscription model works best. Offer core features free, then gate power features behind a $9–29/month plan. Add an enterprise tier once you hit 100+ paying users.`;
  }
  if (lower.includes('risk')) {
    return `Your biggest risk is user adoption — ${idea.audience} often stick to existing tools. Mitigate with a frictionless onboarding (under 2 minutes to value), a compelling free tier, and case studies from early customers.`;
  }
  if (lower.includes('go-to-market') || lower.includes('launch') || lower.includes('gtm')) {
    return `Launch ${idea.name} on Product Hunt and relevant ${idea.industry} communities simultaneously. Target ${idea.region} first where regulatory friction is lower. Partner with 2-3 micro-influencers in your niche for amplification.`;
  }
  if (lower.includes('compet') || lower.includes('differentiat')) {
    return `Differentiate ${idea.name} through superior UX and a narrower, deeper feature set rather than trying to match incumbents feature-for-feature. Own one specific workflow better than anyone else.`;
  }
  return `For ${idea.name} in the ${idea.industry} space, focus on building trust with ${idea.audience} through transparent pricing, strong onboarding, and consistent communication. The fastest path to growth is making your first 10 customers wildly successful.`;
}

/* ===== HISTORY ===== */
function saveHistory(idea, score) {
  const key = 'ideaproof-history';
  const hist = JSON.parse(localStorage.getItem(key) || '[]');
  hist.unshift({ id: Date.now(), name: idea.name, industry: idea.industry, score, timestamp: idea.timestamp, idea });
  localStorage.setItem(key, JSON.stringify(hist.slice(0, 20)));
}

document.getElementById('historyBtn').addEventListener('click', openHistory);

function openHistory() {
  const hist = JSON.parse(localStorage.getItem('ideaproof-history') || '[]');
  const list = document.getElementById('historyList');
  if (hist.length === 0) {
    list.innerHTML = '<div class="history-empty">No analyses yet. Validate your first idea!</div>';
  } else {
    list.innerHTML = hist.map(h => `
      <div class="history-item">
        <div>
          <div class="history-name">${h.name}</div>
          <div class="history-meta">${h.industry} · Score: ${h.score} · ${new Date(h.timestamp).toLocaleDateString()}</div>
        </div>
        <div class="history-actions">
          <button class="btn-ghost" style="padding:5px 12px;font-size:12px" onclick="loadHistory(${h.id})">View</button>
          <button class="icon-btn" onclick="deleteHistory(${h.id})" title="Delete"><i class="fa-solid fa-trash" style="font-size:12px"></i></button>
        </div>
      </div>`
    ).join('');
  }
  document.getElementById('historyModal').classList.remove('hidden');
}

function closeHistory() {
  document.getElementById('historyModal').classList.add('hidden');
}

function deleteHistory(id) {
  const hist = JSON.parse(localStorage.getItem('ideaproof-history') || '[]');
  localStorage.setItem('ideaproof-history', JSON.stringify(hist.filter(h => h.id !== id)));
  openHistory();
}

function loadHistory(id) {
  const hist = JSON.parse(localStorage.getItem('ideaproof-history') || '[]');
  const entry = hist.find(h => h.id === id);
  if (!entry) return;
  closeHistory();
  currentIdea = entry.idea;
  // Re-run generation with same seed (deterministic)
  const data = {
    score: generateScore(currentIdea),
    usp: generateUSP(currentIdea),
    competitors: getMockCompetitors(currentIdea),
    market: generateMarket(currentIdea),
    trends: generateTrends(currentIdea),
    signals: MOCK_SIGNALS[currentIdea.industry] || [],
    swot: generateSWOT(currentIdea),
    risks: generateRisks(currentIdea),
    revenue: generateRevenue(currentIdea),
    audience: generateAudience(currentIdea),
    canvas: generateCanvas(currentIdea),
    improvements: generateImprovements(currentIdea),
  };
  allCompetitors = data.competitors;
  renderResults(data);
  document.getElementById('resultsSection').classList.remove('hidden');
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

/* ===== PDF EXPORT ===== */
async function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = margin;

  function addText(text, size, bold, color) {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(...(color || [17, 24, 39]));
    const lines = doc.splitTextToSize(String(text), W - margin * 2);
    lines.forEach(line => {
      if (y > doc.internal.pageSize.getHeight() - 60) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += size * 1.5;
    });
    y += 4;
  }

  function rule() {
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, y, W - margin, y);
    y += 12;
  }

  const score = generateScore(currentIdea);

  // Header
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, W, 56, 'F');
  doc.setFontSize(22); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
  doc.text('IdeaProof — Startup Validation Report', margin, 36);
  y = 80;

  addText(currentIdea.name, 18, true, [17, 24, 39]);
  addText(`Industry: ${currentIdea.industry}  ·  Region: ${currentIdea.region}  ·  Generated: ${new Date().toLocaleDateString()}`, 10, false, [107, 114, 128]);
  rule();

  addText('VALIDATION SCORE', 11, true, [79, 70, 229]);
  addText(`Overall: ${score.overall}/100`, 16, true);
  Object.entries(score.cats).forEach(([k, v]) => addText(`${k}: ${v}/100`, 11, false, [55, 65, 81]));
  rule();

  addText('UNIQUE SELLING PROPOSITION', 11, true, [79, 70, 229]);
  addText(generateUSP(currentIdea), 12);
  rule();

  addText('SWOT ANALYSIS', 11, true, [79, 70, 229]);
  const swot = generateSWOT(currentIdea);
  ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(k => {
    addText(k.toUpperCase(), 10, true, [107, 114, 128]);
    swot[k].forEach(i => addText(`• ${i}`, 11));
    y += 4;
  });
  rule();

  addText('RISK ASSESSMENT', 11, true, [79, 70, 229]);
  generateRisks(currentIdea).forEach(r => addText(`${r.name}: ${r.level} — ${r.desc}`, 11));
  rule();

  addText('IMPROVEMENT SUGGESTIONS', 11, true, [79, 70, 229]);
  generateImprovements(currentIdea).forEach((s, i) => addText(`${i + 1}. ${s}`, 11));

  doc.save(`${currentIdea.name.replace(/\s+/g, '-')}-IdeaProof-Report.pdf`);
}

/* ===== UTILS ===== */
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
function seededRand(seed) {
  let s = Math.abs(seed) || 1;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}
function pickN(arr, n, seed) {
  const r = seededRand(Math.abs(seed));
  const copy = [...arr];
  const result = [];
  while (result.length < n && copy.length) {
    const idx = Math.floor(r() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

function resetToForm() {
  document.getElementById('resultsSection').classList.add('hidden');
  document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
}

/* ===== STATIC DATA ===== */
const POSITIONS = ['Leader', 'Challenger', 'Niche', 'Emerging', 'Follower'];
const COMP_STRENGTHS = ['Strong brand', 'Large user base', 'Network effects', 'Deep integrations', 'Enterprise sales', 'Superior UX', 'AI capabilities', 'Low pricing', 'Open-source community', 'First-mover advantage'];
const COMP_WEAKNESSES = ['High pricing', 'Poor mobile UX', 'Legacy tech stack', 'Slow innovation', 'Weak support', 'No free tier', 'Vendor lock-in', 'Steep learning curve'];

const SWOT_DATA = {
  strengths: [
    'First-mover advantage in target niche', 'AI-powered core differentiates from legacy tools',
    'Low marginal cost to scale digitally', 'Strong founder-market fit',
    'Existing network in target audience', 'Fast time-to-value for users',
    'Flexible pricing model', 'No legacy codebase constraints'
  ],
  weaknesses: [
    'Limited initial brand awareness', 'Small team bandwidth constraints',
    'Dependency on third-party APIs', 'Unproven at enterprise scale',
    'High customer acquisition cost early on', 'Limited funding runway'
  ],
  opportunities: [
    'Underserved SMB market in target region', 'Growing demand for AI automation',
    'Regulatory tailwinds in target industry', 'Partnership opportunities with incumbents',
    'International expansion potential', 'Adjacent market expansion',
    'Rising API economy enables rapid integration'
  ],
  threats: [
    'Well-funded incumbents may copy the idea', 'Market saturation risk over 2-3 years',
    'Regulatory changes could increase compliance costs', 'Economic slowdown reducing SaaS spend',
    'Open-source alternatives reducing willingness to pay'
  ]
};

const REDDIT_SUBS = {
  'EdTech': 'edtech', 'FinTech': 'fintech', 'HealthTech': 'healthtech',
  'SaaS': 'SaaS', 'AI / ML': 'MachineLearning', 'E-Commerce': 'ecommerce',
  'CleanTech': 'sustainability', 'Gaming': 'gamedev', 'HRTech': 'humanresources',
};

const MOCK_SIGNALS = {
  'SaaS': [
    { source: 'HN', text: 'How we grew from 0 to $1M ARR with zero paid marketing', url: 'https://news.ycombinator.com', type: 'hn' },
    { source: 'Reddit', text: 'What SaaS tools are you actually paying for in 2024?', url: 'https://reddit.com/r/SaaS', type: 'reddit' },
    { source: 'HN', text: 'The best SaaS products solve one problem extremely well', url: 'https://news.ycombinator.com', type: 'hn' },
  ],
  'AI / ML': [
    { source: 'HN', text: 'AI startups are eating the software industry faster than expected', url: 'https://news.ycombinator.com', type: 'hn' },
    { source: 'Reddit', text: 'Which AI tools are you actually shipping with?', url: 'https://reddit.com/r/MachineLearning', type: 'reddit' },
  ],
  'EdTech': [
    { source: 'Reddit', text: 'Why do most EdTech platforms fail to retain learners?', url: 'https://reddit.com/r/edtech', type: 'reddit' },
    { source: 'HN', text: 'The future of education is AI-personalized, async, and social', url: 'https://news.ycombinator.com', type: 'hn' },
  ],
};

function getMockCompetitors(idea) {
  const MOCK = {
    'SaaS': [
      { name: 'Notion', desc: 'All-in-one workspace for notes, docs, and databases.', website: 'https://notion.so', strengths: ['Strong brand', 'Flexible'], weaknesses: ['Steep learning curve', 'Can be slow'], position: 'Leader', similarity: 55 },
      { name: 'Airtable', desc: 'No-code database and workflow platform.', website: 'https://airtable.com', strengths: ['Enterprise sales', 'APIs'], weaknesses: ['High pricing', 'Complex'], position: 'Challenger', similarity: 48 },
      { name: 'Monday.com', desc: 'Work management and project tracking platform.', website: 'https://monday.com', strengths: ['UI/UX', 'Marketing'], weaknesses: ['Expensive at scale'], position: 'Leader', similarity: 42 },
      { name: 'Linear', desc: 'Issue tracking built for modern engineering teams.', website: 'https://linear.app', strengths: ['Speed', 'Design'], weaknesses: ['Niche focus'], position: 'Niche', similarity: 35 },
    ],
    'EdTech': [
      { name: 'Coursera', desc: 'Online learning platform with university-grade courses.', website: 'https://coursera.org', strengths: ['Brand', 'Content library'], weaknesses: ['Low completion rates', 'Expensive'], position: 'Leader', similarity: 50 },
      { name: 'Udemy', desc: 'Marketplace for online video courses.', website: 'https://udemy.com', strengths: ['Price', 'Volume'], weaknesses: ['Quality inconsistency'], position: 'Leader', similarity: 44 },
      { name: 'Skillshare', desc: 'Creative and professional skills courses.', website: 'https://skillshare.com', strengths: ['Community', 'Creative focus'], weaknesses: ['Niche'], position: 'Challenger', similarity: 36 },
    ],
    'FinTech': [
      { name: 'Stripe', desc: 'Global payments and financial infrastructure.', website: 'https://stripe.com', strengths: ['Developer experience', 'Ecosystem'], weaknesses: ['Complex pricing', 'B2B focus'], position: 'Leader', similarity: 40 },
      { name: 'Plaid', desc: 'Financial data connectivity API.', website: 'https://plaid.com', strengths: ['Data access', 'Integrations'], weaknesses: ['Privacy concerns'], position: 'Leader', similarity: 45 },
      { name: 'Brex', desc: 'Corporate cards and spend management.', website: 'https://brex.com', strengths: ['Startup-friendly', 'Speed'], weaknesses: ['US-focused'], position: 'Challenger', similarity: 38 },
    ],
    'AI / ML': [
      { name: 'OpenAI', desc: 'AI research company and API provider.', website: 'https://openai.com', strengths: ['Technology lead', 'Developer adoption'], weaknesses: ['Expensive', 'Dependency risk'], position: 'Leader', similarity: 35 },
      { name: 'Hugging Face', desc: 'Open-source AI model hub and platform.', website: 'https://huggingface.co', strengths: ['Community', 'Open models'], weaknesses: ['Enterprise support'], position: 'Challenger', similarity: 42 },
      { name: 'Cohere', desc: 'Enterprise NLP API platform.', website: 'https://cohere.com', strengths: ['Enterprise-grade', 'Customization'], weaknesses: ['Brand awareness'], position: 'Emerging', similarity: 38 },
    ],
  };

  const fallback = [
    { name: 'Incumbent Alpha', desc: `Established player in the ${idea.industry} space with broad feature coverage.`, website: '#', strengths: ['Brand recognition', 'Large user base'], weaknesses: ['Legacy UI', 'Slow updates'], position: 'Leader', similarity: 60 },
    { name: 'StartupBeta', desc: `Fast-growing challenger targeting similar ${idea.audience}.`, website: '#', strengths: ['Agile team', 'Modern stack'], weaknesses: ['Limited funding', 'Small team'], position: 'Emerging', similarity: 72 },
    { name: 'NicheGamma', desc: `Specialized tool for a subset of the ${idea.industry} market.`, website: '#', strengths: ['Deep features', 'Loyal users'], weaknesses: ['Narrow market', 'No mobile app'], position: 'Niche', similarity: 45 },
    { name: 'Enterprise Delta', desc: `Enterprise-focused solution in ${idea.industry} with long sales cycles.`, website: '#', strengths: ['Enterprise contracts', 'Security'], weaknesses: ['Too expensive for SMBs', 'Complex setup'], position: 'Leader', similarity: 30 },
  ];

  const base = MOCK[idea.industry] || fallback;
  return base.map(c => ({ ...c, source: 'mock' }));
}
