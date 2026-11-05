// ===================== DATA MODEL =====================
const CATEGORIES = {
  expense: [
    { id:'food', label:'🍜 Food', color:'#f87171' },
    { id:'transport', label:'🚌 Transport', color:'#60a5fa' },
    { id:'shopping', label:'🛍 Shopping', color:'#a78bfa' },
    { id:'bills', label:'🧾 Bills', color:'#fbbf24' },
    { id:'entertainment', label:'🎬 Entertainment', color:'#f472b6' },
    { id:'health', label:'❤️ Health', color:'#34d399' },
    { id:'education', label:'📚 Education', color:'#22d3ee' },
    { id:'other', label:'📦 Other', color:'#94a3b8' },
  ],
  income: [
    { id:'salary', label:'💼 Salary', color:'#22d3a0' },
    { id:'freelance', label:'💻 Freelance', color:'#7c6dfa' },
    { id:'gifts', label:'🎁 Gifts', color:'#fb923c' },
    { id:'investments', label:'📈 Investments', color:'#a3e635' },
    { id:'other_in', label:'💰 Other', color:'#94a3b8' },
  ]
};
const ALL_CATS = [...CATEGORIES.expense, ...CATEGORIES.income];
function getCat(id) { return ALL_CATS.find(c => c.id === id) || {label: id, color:'#94a3b8'}; }

const ACHIEVEMENTS = [
  { id:'first', label:'First Transaction', icon:'🎯', check: (txs) => txs.length >= 1 },
  { id:'ten', label:'10 Transactions', icon:'📊', check: (txs) => txs.length >= 10 },
  { id:'fifty', label:'50 Transactions', icon:'🏆', check: (txs) => txs.length >= 50 },
  { id:'save10k', label:'Saved ₹10,000', icon:'💰', check: (txs, stats) => stats.totalSavings >= 10000 },
  { id:'save50k', label:'Saved ₹50,000', icon:'🤑', check: (txs, stats) => stats.totalSavings >= 50000 },
  { id:'budget_set', label:'Budget Planner', icon:'🎯', check: (txs, s, budgets) => Object.keys(budgets).length >= 1 },
  { id:'streak7', label:'7-Day Streak', icon:'🔥', check: (txs) => calcStreak(txs) >= 7 },
  { id:'allcat', label:'All Categories Used', icon:'🌈', check: (txs) => {
    const used = new Set(txs.map(t=>t.category));
    return CATEGORIES.expense.every(c => used.has(c.id));
  }},
];

// ===================== STATE =====================
let state = {
  transactions: [],
  budgets: {},
  editId: null,
  currentType: 'expense',
  calMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
};
let charts = {};

// ===================== STORAGE =====================
function save() {
  localStorage.setItem('kharcha_tx', JSON.stringify(state.transactions));
  localStorage.setItem('kharcha_budgets', JSON.stringify(state.budgets));
}
function load() {
  try {
    state.transactions = JSON.parse(localStorage.getItem('kharcha_tx') || '[]');
    state.budgets = JSON.parse(localStorage.getItem('kharcha_budgets') || '{}');
  } catch(e) { state.transactions = []; state.budgets = {}; }
}

// ===================== UTILITIES =====================
function escHtml(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}
function fmt(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN', {maximumFractionDigits:2});
}
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});
}
function thisMonth(tx) {
  const now = new Date();
  const d = new Date(tx.date);
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}
function uuid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function showNotif(msg, type='success') {
  const bar = document.getElementById('notif-bar');
  const el = document.createElement('div');
  el.className = `notif ${type}`;
  el.textContent = msg;
  bar.appendChild(el);
  setTimeout(() => { if(el.parentNode) el.parentNode.removeChild(el); }, 3500);
}

// ===================== STATS =====================
function getStats() {
  const txs = state.transactions;
  const totalIncome = txs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount, 0);
  const totalExpense = txs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount, 0);
  const totalSavings = totalIncome - totalExpense;
  const monthlyExpense = txs.filter(t=>t.type==='expense' && thisMonth(t)).reduce((s,t)=>s+t.amount, 0);
  return { totalIncome, totalExpense, totalSavings, balance: totalSavings, monthlyExpense };
}

// ===================== NAVIGATION =====================
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => { n.classList.remove('active'); n.removeAttribute('aria-current'); });
  document.querySelectorAll('.bottom-nav-item[data-bnav]').forEach(n => n.classList.remove('active'));
  const pageEl = document.getElementById('page-'+page);
  if(pageEl) pageEl.classList.add('active');
  document.querySelectorAll(`[data-page="${page}"]`).forEach(n => { n.classList.add('active'); n.setAttribute('aria-current','page'); });
  const bnav = document.querySelector(`.bottom-nav-item[data-bnav="${page}"]`);
  if(bnav) bnav.classList.add('active');
  if(page==='dashboard') refreshDashboard();
  if(page==='analytics') refreshAnalytics();
  if(page==='insights') refreshInsights();
  if(page==='calendar') renderCalendar();
  if(page==='budgets') renderBudgets();
  if(page==='goals') renderGoals();
  window.scrollTo(0,0);
}

document.querySelectorAll('.nav-item[data-page]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.page));
  el.addEventListener('keypress', e => { if(e.key==='Enter'||e.key===' ') navigate(el.dataset.page); });
});
document.querySelectorAll('.bottom-nav-item[data-bnav]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.bnav));
});
document.querySelectorAll('[data-drawer-page]').forEach(el => {
  el.addEventListener('click', () => { navigate(el.dataset.drawerPage); closeDrawer(); });
  el.addEventListener('keypress', e => { if(e.key==='Enter'||e.key===' ') { navigate(el.dataset.drawerPage); closeDrawer(); } });
});

// ===================== MODAL HELPERS =====================
function openModal(id) {
  document.getElementById(id).classList.add('open');
  const firstInput = document.querySelector(`#${id} input, #${id} select`);
  if(firstInput) setTimeout(() => firstInput.focus(), 100);
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
document.querySelectorAll('.overlay').forEach(ov => {
  ov.addEventListener('click', e => { if(e.target === ov) closeModal(ov.id); });
});
document.addEventListener('keydown', e => {
  if(e.key==='Escape') document.querySelectorAll('.overlay.open').forEach(o=>closeModal(o.id));
});

// ===================== TYPE TOGGLE =====================
function setType(type) {
  state.currentType = type;
  document.getElementById('toggle-income').className = type==='income' ? 'active income' : '';
  document.getElementById('toggle-expense').className = type==='expense' ? 'active expense' : '';
  populateCategorySelect(type);
}
function populateCategorySelect(type) {
  const sel = document.getElementById('f-category');
  sel.innerHTML = CATEGORIES[type].map(c=>`<option value="${c.id}">${c.label}</option>`).join('');
}

// ===================== ADD / EDIT MODAL =====================
function openAddModal() {
  state.editId = null;
  document.getElementById('modal-title').textContent = 'Add Transaction';
  document.getElementById('save-btn').textContent = 'Save';
  document.getElementById('f-title').value = '';
  document.getElementById('f-amount').value = '';
  document.getElementById('f-date').value = new Date().toISOString().slice(0,10);
  document.getElementById('f-notes').value = '';
  document.getElementById('f-method').value = 'UPI';
  document.getElementById('f-recurring').value = '';
  clearReceipt();
  setType('expense');
  openModal('tx-modal');
}
function openEditModal(id) {
  const tx = state.transactions.find(t=>t.id===id);
  if(!tx) return;
  state.editId = id;
  document.getElementById('modal-title').textContent = 'Edit Transaction';
  document.getElementById('save-btn').textContent = 'Update';
  setType(tx.type);
  document.getElementById('f-title').value = tx.title;
  document.getElementById('f-amount').value = tx.amount;
  document.getElementById('f-date').value = tx.date;
  document.getElementById('f-notes').value = tx.notes || '';
  document.getElementById('f-method').value = tx.method || 'Cash';
  document.getElementById('f-recurring').value = tx.recurring || '';
  document.getElementById('f-category').value = tx.category;
  openModal('tx-modal');
}

function saveTransaction() {
  const title = document.getElementById('f-title').value.trim();
  const amount = parseFloat(document.getElementById('f-amount').value);
  const category = document.getElementById('f-category').value;
  const date = document.getElementById('f-date').value;
  const method = document.getElementById('f-method').value;
  const notes = document.getElementById('f-notes').value.trim();
  const recurring = document.getElementById('f-recurring').value;
  if(!title) { showNotif('Title is required','error'); return; }
  if(!amount || amount <= 0) { showNotif('Enter valid amount','error'); return; }
  if(!date) { showNotif('Date is required','error'); return; }
  const tx = { id: state.editId || uuid(), type: state.currentType, title, amount, category, date, method, notes, recurring };
  if(state.editId) {
    const idx = state.transactions.findIndex(t=>t.id===state.editId);
    state.transactions[idx] = tx;
    showNotif('Transaction updated ✓');
  } else {
    state.transactions.unshift(tx);
    showNotif('Transaction added ✓');
    checkBudgetAlerts(tx);
  }
  save();
  closeModal('tx-modal');
  renderTransactions();
  refreshDashboard();
}

function deleteTransaction(id) {
  confirmAction(`Delete this transaction?`, () => {
    state.transactions = state.transactions.filter(t=>t.id!==id);
    save();
    renderTransactions();
    refreshDashboard();
    showNotif('Transaction deleted','warn');
  });
}

function confirmBulkClear() {
  confirmAction(`⚠️ This will permanently delete ALL ${state.transactions.length} transactions. This cannot be undone.`, () => {
    state.transactions = [];
    save();
    renderTransactions();
    refreshDashboard();
    showNotif('All transactions cleared','warn');
  }, 'Delete all');
}

function confirmAction(msg, cb, btnText='Delete') {
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-ok-btn').textContent = btnText;
  const btn = document.getElementById('confirm-ok-btn');
  btn.onclick = () => { cb(); closeModal('confirm-modal'); };
  openModal('confirm-modal');
}

// ===================== RENDER TRANSACTIONS =====================
function populateFilterCats() {
  const sel = document.getElementById('filter-cat');
  sel.innerHTML = '<option value="">All categories</option>' +
    ALL_CATS.map(c=>`<option value="${c.id}">${c.label}</option>`).join('');
}

function getFiltered() {
  let txs = [...state.transactions];
  const search = document.getElementById('search-input')?.value.toLowerCase() || '';
  const type = document.getElementById('filter-type')?.value || '';
  const cat = document.getElementById('filter-cat')?.value || '';
  const method = document.getElementById('filter-method')?.value || '';
  const from = document.getElementById('filter-from')?.value || '';
  const to = document.getElementById('filter-to')?.value || '';
  const sort = document.getElementById('sort-by')?.value || 'latest';

  if(search) txs = txs.filter(t => t.title.toLowerCase().includes(search) || (t.notes||'').toLowerCase().includes(search));
  if(type) txs = txs.filter(t => t.type === type);
  if(cat) txs = txs.filter(t => t.category === cat);
  if(method) txs = txs.filter(t => t.method === method);
  if(from) txs = txs.filter(t => t.date >= from);
  if(to) txs = txs.filter(t => t.date <= to);

  if(sort==='latest') txs.sort((a,b)=>b.date.localeCompare(a.date));
  else if(sort==='oldest') txs.sort((a,b)=>a.date.localeCompare(b.date));
  else if(sort==='highest') txs.sort((a,b)=>b.amount-a.amount);
  else if(sort==='lowest') txs.sort((a,b)=>a.amount-b.amount);
  return txs;
}

function renderTransactions(limit=null) {
  const txs = limit ? getFiltered().slice(0, limit) : getFiltered();
  const containerId = limit ? 'recent-tx' : 'tx-list';
  const container = document.getElementById(containerId);
  if(!container) return;
  if(!txs.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">💸</div><p>No transactions found</p></div>`;
    return;
  }
  container.innerHTML = `
  <table class="tx-table" role="table" aria-label="Transactions">
    <thead>
      <tr>
        <th>Title</th>
        <th class="hide-mobile">Category</th>
        <th class="hide-mobile">Method</th>
        <th>Date</th>
        <th>Amount</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${txs.map(tx => {
        const cat = getCat(tx.category);
        return `<tr class="tx-row" role="row">
          <td>
            <span style="font-weight:600;font-size:14px">${escHtml(tx.title)}</span>
            ${tx.recurring ? `<span class="recurring-badge">${escHtml(tx.recurring)}</span>` : ''}
            ${tx.notes ? `<div style="font-size:11px;color:var(--text3);margin-top:2px">${escHtml(tx.notes)}</div>` : ''}
          </td>
          <td class="hide-mobile">
            <span class="cat-badge" style="background:${cat.color}20;color:${cat.color}">${escHtml(cat.label)}</span>
          </td>
          <td class="hide-mobile" style="font-size:12px;color:var(--text3)">${escHtml(tx.method||'—')}</td>
          <td style="font-size:12px;color:var(--text3)">${fmtDate(tx.date)}</td>
          <td class="amount-cell ${tx.type}">${tx.type==='income'?'+':'−'}${fmt(tx.amount)}</td>
          <td>
            <div class="tx-actions">
              <button class="icon-btn" onclick="openEditModal('${tx.id}')" aria-label="Edit transaction ${escHtml(tx.title)}">✎</button>
              <button class="icon-btn delete" onclick="deleteTransaction('${tx.id}')" aria-label="Delete transaction ${escHtml(tx.title)}">✕</button>
            </div>
          </td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>`;
}

function clearFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('filter-type').value = '';
  document.getElementById('filter-cat').value = '';
  document.getElementById('filter-method').value = '';
  document.getElementById('filter-from').value = '';
  document.getElementById('filter-to').value = '';
  document.getElementById('sort-by').value = 'latest';
  renderTransactions();
}

// ===================== DASHBOARD =====================
function refreshDashboard() {
  const stats = getStats();
  const rate = stats.totalIncome > 0 ? ((stats.totalSavings / stats.totalIncome) * 100).toFixed(1) : 0;
  document.getElementById('stat-balance').textContent = fmt(stats.balance);
  document.getElementById('stat-income').textContent = fmt(stats.totalIncome);
  document.getElementById('stat-expense').textContent = fmt(stats.totalExpense);
  document.getElementById('stat-savings').textContent = fmt(stats.totalSavings);
  document.getElementById('stat-savings-rate').textContent = rate + '% rate';
  document.getElementById('stat-monthly').textContent = fmt(stats.monthlyExpense);
  document.getElementById('dash-date').textContent = new Date().toLocaleDateString('en-IN', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  renderCharts();
  renderTransactions(5);
}

// ===================== CHARTS =====================
function destroyChart(id) {
  if(charts[id]) { charts[id].destroy(); delete charts[id]; }
}
function chartDefaults() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    textColor: isDark ? '#a0a0b5' : '#50506a',
    gridColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
  };
}
function getLast6Months() {
  const months = [];
  for(let i=5;i>=0;i--) {
    const d = new Date();
    d.setMonth(d.getMonth()-i);
    months.push({month:d.getMonth(), year:d.getFullYear(), label:d.toLocaleDateString('en-IN',{month:'short'})});
  }
  return months;
}

function renderCharts() {
  const {textColor, gridColor} = chartDefaults();
  const expenseByCat = {};
  CATEGORIES.expense.forEach(c => expenseByCat[c.id] = 0);
  state.transactions.filter(t=>t.type==='expense').forEach(t => {
    if(expenseByCat[t.category]!==undefined) expenseByCat[t.category] += t.amount;
    else expenseByCat['other'] = (expenseByCat['other']||0) + t.amount;
  });
  const catData = CATEGORIES.expense.filter(c=>expenseByCat[c.id]>0);

  destroyChart('pie');
  if(catData.length) {
    charts['pie'] = new Chart(document.getElementById('chart-pie'), {
      type:'doughnut',
      data: { labels: catData.map(c=>c.label), datasets:[{ data: catData.map(c=>expenseByCat[c.id]), backgroundColor: catData.map(c=>c.color+'cc'), borderWidth:2, borderColor:'transparent' }] },
      options: { plugins:{ legend:{ position:'right', labels:{ color:textColor, font:{size:11}, boxWidth:12 } } }, cutout:'65%' }
    });
  }

  const months6 = getLast6Months();
  const incomeByMonth = months6.map(m => state.transactions.filter(t=>t.type==='income'&&new Date(t.date).getMonth()===m.month&&new Date(t.date).getFullYear()===m.year).reduce((s,t)=>s+t.amount,0));
  const expByMonth = months6.map(m => state.transactions.filter(t=>t.type==='expense'&&new Date(t.date).getMonth()===m.month&&new Date(t.date).getFullYear()===m.year).reduce((s,t)=>s+t.amount,0));

  destroyChart('bar');
  charts['bar'] = new Chart(document.getElementById('chart-bar'), {
    type:'bar',
    data: { labels: months6.map(m=>m.label), datasets:[
      { label:'Income', data:incomeByMonth, backgroundColor:'rgba(34,211,160,0.7)', borderRadius:4 },
      { label:'Expense', data:expByMonth, backgroundColor:'rgba(248,113,113,0.7)', borderRadius:4 },
    ]},
    options: { plugins:{legend:{labels:{color:textColor,font:{size:11}}}}, scales:{ x:{ticks:{color:textColor},grid:{color:gridColor}}, y:{ticks:{color:textColor},grid:{color:gridColor}} } }
  });

  destroyChart('trend');
  charts['trend'] = new Chart(document.getElementById('chart-trend'), {
    type:'line',
    data: { labels: months6.map(m=>m.label), datasets:[
      { label:'Expense', data:expByMonth, borderColor:'#f87171', backgroundColor:'rgba(248,113,113,0.1)', tension:0.4, fill:true, pointBackgroundColor:'#f87171' }
    ]},
    options: { plugins:{legend:{labels:{color:textColor,font:{size:11}}}}, scales:{ x:{ticks:{color:textColor},grid:{color:gridColor}}, y:{ticks:{color:textColor},grid:{color:gridColor}} } }
  });

  const now = new Date();
  const weekDays = [];
  for(let i=6;i>=0;i--) {
    const d = new Date(now); d.setDate(d.getDate()-i);
    weekDays.push(d);
  }
  const weekData = weekDays.map(d => state.transactions.filter(t=>t.type==='expense'&&t.date===d.toISOString().slice(0,10)).reduce((s,t)=>s+t.amount,0));

  destroyChart('weekly');
  charts['weekly'] = new Chart(document.getElementById('chart-weekly'), {
    type:'bar',
    data: { labels: weekDays.map(d=>d.toLocaleDateString('en-IN',{weekday:'short'})), datasets:[{ label:'Spending', data:weekData, backgroundColor:'rgba(124,109,250,0.7)', borderRadius:4 }]},
    options: { plugins:{legend:{labels:{color:textColor,font:{size:11}}}}, scales:{ x:{ticks:{color:textColor},grid:{color:gridColor}}, y:{ticks:{color:textColor},grid:{color:gridColor}} } }
  });
}

function refreshAnalytics() {
  const {textColor, gridColor} = chartDefaults();
  const expenseByCat = {};
  CATEGORIES.expense.forEach(c => expenseByCat[c.id] = 0);
  state.transactions.filter(t=>t.type==='expense').forEach(t => {
    if(expenseByCat[t.category]!==undefined) expenseByCat[t.category] += t.amount;
  });
  const catData = CATEGORIES.expense.filter(c=>expenseByCat[c.id]>0);

  destroyChart('pie2');
  if(catData.length) {
    charts['pie2'] = new Chart(document.getElementById('chart-pie2'), {
      type:'pie',
      data: { labels: catData.map(c=>c.label), datasets:[{ data: catData.map(c=>expenseByCat[c.id]), backgroundColor: catData.map(c=>c.color+'cc'), borderWidth:2, borderColor:'transparent' }] },
      options: { plugins:{ legend:{ position:'right', labels:{ color:textColor, font:{size:11}, boxWidth:12 } } } }
    });
  }

  const months6 = getLast6Months();
  const expByMonth = months6.map(m => state.transactions.filter(t=>t.type==='expense'&&new Date(t.date).getMonth()===m.month&&new Date(t.date).getFullYear()===m.year).reduce((s,t)=>s+t.amount,0));
  const incByMonth = months6.map(m => state.transactions.filter(t=>t.type==='income'&&new Date(t.date).getMonth()===m.month&&new Date(t.date).getFullYear()===m.year).reduce((s,t)=>s+t.amount,0));

  destroyChart('trend2');
  charts['trend2'] = new Chart(document.getElementById('chart-trend2'), {
    type:'line',
    data: { labels: months6.map(m=>m.label), datasets:[
      { label:'Expense', data:expByMonth, borderColor:'#f87171', backgroundColor:'rgba(248,113,113,0.1)', tension:0.4, fill:true },
      { label:'Income', data:incByMonth, borderColor:'#22d3a0', backgroundColor:'rgba(34,211,160,0.1)', tension:0.4, fill:true },
    ]},
    options: { plugins:{legend:{labels:{color:textColor,font:{size:11}}}}, scales:{ x:{ticks:{color:textColor},grid:{color:gridColor}}, y:{ticks:{color:textColor},grid:{color:gridColor}} } }
  });

  destroyChart('bar2');
  charts['bar2'] = new Chart(document.getElementById('chart-bar2'), {
    type:'bar',
    data: { labels: months6.map(m=>m.label), datasets:[
      { label:'Income', data:incByMonth, backgroundColor:'rgba(34,211,160,0.7)', borderRadius:4 },
      { label:'Expense', data:expByMonth, backgroundColor:'rgba(248,113,113,0.7)', borderRadius:4 },
    ]},
    options: { plugins:{legend:{labels:{color:textColor,font:{size:11}}}}, scales:{ x:{ticks:{color:textColor},grid:{color:gridColor}}, y:{ticks:{color:textColor},grid:{color:gridColor}} } }
  });

  destroyChart('hbar');
  charts['hbar'] = new Chart(document.getElementById('chart-hbar'), {
    type:'bar',
    data: { labels: CATEGORIES.expense.map(c=>c.label), datasets:[{ label:'Total', data: CATEGORIES.expense.map(c=>expenseByCat[c.id]||0), backgroundColor: CATEGORIES.expense.map(c=>c.color+'cc'), borderRadius:4 }]},
    options: { indexAxis:'y', plugins:{legend:{display:false}}, scales:{ x:{ticks:{color:textColor},grid:{color:gridColor}}, y:{ticks:{color:textColor, font:{size:11}},grid:{color:gridColor}} } }
  });
}

// ===================== BUDGETS =====================
function openBudgetModal() {
  const sel = document.getElementById('b-category');
  sel.innerHTML = CATEGORIES.expense.map(c=>`<option value="${c.id}">${c.label}</option>`).join('');
  document.getElementById('b-amount').value = '';
  openModal('budget-modal');
}
function saveBudget() {
  const cat = document.getElementById('b-category').value;
  const amount = parseFloat(document.getElementById('b-amount').value);
  if(!amount || amount <= 0) { showNotif('Enter valid amount','error'); return; }
  state.budgets[cat] = amount;
  save();
  closeModal('budget-modal');
  renderBudgets();
  showNotif('Budget saved ✓');
}
function renderBudgets() {
  const grid = document.getElementById('budget-grid');
  const cats = CATEGORIES.expense;
  grid.innerHTML = cats.map(cat => {
    const limit = state.budgets[cat.id] || 0;
    const spent = state.transactions.filter(t=>t.type==='expense'&&t.category===cat.id&&thisMonth(t)).reduce((s,t)=>s+t.amount,0);
    const pct = limit > 0 ? Math.min((spent/limit)*100, 100) : 0;
    const over = limit > 0 && spent > limit;
    const warn = limit > 0 && !over && pct >= 80;
    const color = over ? 'var(--red)' : warn ? 'var(--amber)' : 'var(--accent)';
    return `<div class="budget-card">
      <div class="budget-card-header">
        <div class="budget-name">
          <span style="font-size:18px">${cat.label.split(' ')[0]}</span>
          ${cat.label.split(' ').slice(1).join(' ')}
        </div>
        <div class="budget-amounts" style="font-size:12px">${fmt(spent)} / ${limit ? fmt(limit) : '—'}</div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
      ${over ? `<div class="budget-over">⚠ Exceeded by ${fmt(spent-limit)}</div>` : ''}
      ${warn && !over ? `<div class="budget-warn">⚡ ${Math.round(pct)}% used</div>` : ''}
      ${!limit ? `<button class="btn btn-ghost btn-sm" onclick="openBudgetModal()" style="margin-top:6px;font-size:11px">Set limit</button>` : ''}
    </div>`;
  }).join('');
}

function checkBudgetAlerts(tx) {
  if(tx.type !== 'expense') return;
  const limit = state.budgets[tx.category];
  if(!limit) return;
  const spent = state.transactions.filter(t=>t.type==='expense'&&t.category===tx.category&&thisMonth(t)).reduce((s,t)=>s+t.amount,0);
  const cat = getCat(tx.category);
  if(spent > limit) showNotif(`⚠ You exceeded ${cat.label} budget by ${fmt(spent-limit)}`, 'warn');
  else if(spent/limit >= 0.8) showNotif(`⚡ ${cat.label} budget 80% used`, 'warn');
}

// ===================== INSIGHTS =====================
function refreshInsights() {
  const txs = state.transactions;
  const expenses = txs.filter(t=>t.type==='expense');
  const income = txs.filter(t=>t.type==='income');
  const totalInc = income.reduce((s,t)=>s+t.amount,0);
  const totalExp = expenses.reduce((s,t)=>s+t.amount,0);
  const savings = totalInc - totalExp;
  const savingsRate = totalInc > 0 ? ((savings/totalInc)*100).toFixed(1) : 0;

  const catTotals = {};
  expenses.forEach(t => { catTotals[t.category] = (catTotals[t.category]||0) + t.amount; });
  const topCat = Object.entries(catTotals).sort((a,b)=>b[1]-a[1])[0];

  const days = [...new Set(expenses.map(t=>t.date))];
  const avgDaily = days.length ? (totalExp / days.length).toFixed(0) : 0;

  const cards = document.getElementById('insight-cards');
  cards.innerHTML = `
    <div class="insight-card"><div class="insight-label">Savings Rate</div><div class="insight-val" style="color:var(--green)">${savingsRate}%</div><div class="insight-note">Of total income saved</div></div>
    <div class="insight-card"><div class="insight-label">Avg Daily Spend</div><div class="insight-val" style="color:var(--amber)">${fmt(avgDaily)}</div><div class="insight-note">Based on active days</div></div>
    <div class="insight-card"><div class="insight-label">Top Category</div><div class="insight-val" style="color:var(--red);font-size:16px">${topCat ? getCat(topCat[0]).label : '—'}</div><div class="insight-note">${topCat ? fmt(topCat[1]) + ' total' : 'No expenses yet'}</div></div>
    <div class="insight-card"><div class="insight-label">Total Transactions</div><div class="insight-val">${txs.length}</div><div class="insight-note">${income.length} income, ${expenses.length} expense</div></div>
  `;

  const smart = document.getElementById('smart-insights');
  const insights = [];
  if(totalExp > 0 && catTotals['food']) {
    const foodPct = ((catTotals['food']/totalExp)*100).toFixed(0);
    insights.push(`You spent <strong>${foodPct}%</strong> of expenses on 🍜 Food — ${foodPct > 40 ? 'consider meal planning' : 'great balance'}.`);
  }
  if(savings < 0) insights.push(`Your expenses exceed income by <strong>${fmt(Math.abs(savings))}</strong>. Review your spending.`);
  if(savingsRate >= 30) insights.push(`🏆 Excellent! You're saving <strong>${savingsRate}%</strong> of income — above the recommended 20%.`);
  const monthlyExp = expenses.filter(t=>thisMonth(t)).reduce((s,t)=>s+t.amount,0);
  if(monthlyExp > 0) insights.push(`This month's spending: <strong>${fmt(monthlyExp)}</strong>.`);
  if(!insights.length) insights.push('Add more transactions to unlock smart insights!');

  smart.innerHTML = insights.map(i=>`<div class="smart-card">${i}</div>`).join('');
}

// ===================== CALENDAR =====================
function changeMonth(d) {
  state.calMonth += d;
  if(state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  if(state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  renderCalendar();
}
function renderCalendar() {
  const {calMonth, calYear} = state;
  const label = new Date(calYear, calMonth).toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  document.getElementById('cal-month-label').textContent = label;
  const grid = document.getElementById('cal-grid');
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date().toISOString().slice(0,10);
  let html = days.map(d=>`<div class="cal-header">${d}</div>`).join('');
  const first = new Date(calYear, calMonth, 1).getDay();
  for(let i=0;i<first;i++) html += `<div></div>`;
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  for(let d=1;d<=daysInMonth;d++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayExp = state.transactions.filter(t=>t.date===dateStr&&t.type==='expense').reduce((s,t)=>s+t.amount,0);
    const dayInc = state.transactions.filter(t=>t.date===dateStr&&t.type==='income').reduce((s,t)=>s+t.amount,0);
    const isToday = dateStr === today;
    html += `<div class="cal-day${isToday?' today':''}">
      <div class="cal-day-num">${d}</div>
      ${dayExp ? `<div class="cal-dot">−${fmt(dayExp)}</div>` : ''}
      ${dayInc ? `<div class="cal-dot income-dot">+${fmt(dayInc)}</div>` : ''}
    </div>`;
  }
  grid.innerHTML = html;
}

// ===================== STREAK & GOALS =====================
function calcStreak(txs) {
  const dates = [...new Set(txs.map(t=>t.date))].sort().reverse();
  if(!dates.length) return 0;
  let streak = 0;
  const today = new Date();
  for(let i=0;i<dates.length;i++) {
    const d = new Date(dates[i]);
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    if(d.toISOString().slice(0,10) !== expected.toISOString().slice(0,10)) break;
    streak++;
  }
  return streak;
}
function renderGoals() {
  const streak = calcStreak(state.transactions);
  document.getElementById('streak-num').textContent = streak;
  const stats = getStats();
  const grid = document.getElementById('badge-grid');
  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const earned = a.check(state.transactions, stats, state.budgets);
    return `<div class="badge${earned?' earned':''}">
      <span>${a.icon}</span> ${a.label}${earned?'':'🔒'}
    </div>`;
  }).join('');
}

// ===================== VOICE INPUT =====================
let recognition = null;
let isListening = false;
function toggleVoice() {
  if(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    showNotif('Voice not supported in this browser','error');
    return;
  }
  if(isListening) {
    recognition.stop();
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = 'en-IN';
  recognition.interimResults = true;
  recognition.onstart = () => {
    isListening = true;
    document.getElementById('voice-btn').classList.add('listening');
    document.getElementById('voice-transcript').textContent = 'Listening…';
  };
  recognition.onresult = (e) => {
    const t = Array.from(e.results).map(r=>r[0].transcript).join('');
    document.getElementById('voice-transcript').textContent = t;
    if(e.results[e.results.length-1].isFinal) parseVoiceInput(t);
  };
  recognition.onend = () => {
    isListening = false;
    document.getElementById('voice-btn').classList.remove('listening');
  };
  recognition.onerror = (e) => {
    isListening = false;
    document.getElementById('voice-btn').classList.remove('listening');
    showNotif('Voice error: '+e.error,'error');
  };
  recognition.start();
}
function parseVoiceInput(text) {
  const lower = text.toLowerCase();
  let amount = null;
  const amountMatch = lower.match(/(\d[\d,]*(?:\.\d+)?)\s*(?:rupees?|rs\.?|₹)?/);
  if(amountMatch) amount = parseFloat(amountMatch[1].replace(',',''));

  let type = lower.includes('receiv')||lower.includes('salary')||lower.includes('earn')||lower.includes('got') ? 'income' : 'expense';
  let category = 'other';
  if(lower.includes('food')||lower.includes('eat')||lower.includes('lunch')||lower.includes('dinner')||lower.includes('restaurant')) category='food';
  else if(lower.includes('transport')||lower.includes('auto')||lower.includes('bus')||lower.includes('cab')||lower.includes('uber')) category='transport';
  else if(lower.includes('shop')||lower.includes('cloth')||lower.includes('amazon')) category='shopping';
  else if(lower.includes('bill')||lower.includes('electric')||lower.includes('wifi')||lower.includes('internet')) category='bills';
  else if(lower.includes('entertain')||lower.includes('movie')||lower.includes('netflix')) category='entertainment';
  else if(lower.includes('health')||lower.includes('medicine')||lower.includes('doctor')) category='health';
  else if(lower.includes('education')||lower.includes('book')||lower.includes('course')) category='education';
  else if(lower.includes('salary')) { type='income'; category='salary'; }
  else if(lower.includes('freelance')) { type='income'; category='freelance'; }

  if(amount) {
    const tx = { id:uuid(), type, title: text.slice(0,40), amount, category, date: new Date().toISOString().slice(0,10), method:'Cash', notes: text, recurring:'' };
    state.transactions.unshift(tx);
    save();
    refreshDashboard();
    document.getElementById('voice-result').textContent = `✓ Added: ${type} ₹${amount} (${getCat(category).label})`;
    showNotif(`Voice: Added ₹${amount} ${type}`,'success');
  } else {
    document.getElementById('voice-result').textContent = 'Could not parse amount. Try again.';
  }
}

// ===================== RECEIPT =====================
function previewReceipt(e) {
  const file = e.target.files[0];
  if(!file) return;
  document.getElementById('receipt-upload-area').style.display='none';
  document.getElementById('receipt-preview').style.display='flex';
  document.getElementById('receipt-name').textContent = file.name;
}
function clearReceipt() {
  document.getElementById('receipt-input').value = '';
  document.getElementById('receipt-upload-area').style.display='block';
  document.getElementById('receipt-preview').style.display='none';
}

// ===================== EXPORT / IMPORT =====================
function exportJSON() {
  const data = { transactions: state.transactions, budgets: state.budgets, exportedAt: new Date().toISOString() };
  download('pennypilot-backup.json', JSON.stringify(data, null, 2), 'application/json');
  showNotif('JSON exported ✓');
}
function exportCSV() {
  const rows = [['ID','Type','Title','Amount','Category','Date','Method','Notes','Recurring']];
  state.transactions.forEach(t => rows.push([t.id, t.type, t.title, t.amount, t.category, t.date, t.method||'', t.notes||'', t.recurring||'']));
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  download('pennypilot-transactions.csv', csv, 'text/csv');
  showNotif('CSV exported ✓');
}
function exportPDF() {
  const stats = getStats();
  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><head><title>PennyPilot Report</title><style>body{font-family:sans-serif;padding:32px;color:#111}h1{color:#5b4ef0}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;font-size:12px}th{background:#f5f5f5}.stat{display:inline-block;margin:8px;padding:12px 20px;background:#f5f5f5;border-radius:8px}</style></head><body>
    <h1>PennyPilot — Financial Report</h1>
    <p>Generated: ${new Date().toLocaleString('en-IN')}</p>
    <h2>Summary</h2>
    <div><span class="stat">Balance: ₹${stats.balance.toLocaleString('en-IN')}</span><span class="stat">Income: ₹${stats.totalIncome.toLocaleString('en-IN')}</span><span class="stat">Expense: ₹${stats.totalExpense.toLocaleString('en-IN')}</span></div>
    <h2>Transactions</h2>
    <table><tr><th>Date</th><th>Title</th><th>Type</th><th>Amount</th><th>Category</th><th>Method</th></tr>
    ${state.transactions.slice(0,100).map(t=>`<tr><td>${t.date}</td><td>${escHtml(t.title)}</td><td>${t.type}</td><td>₹${t.amount.toLocaleString('en-IN')}</td><td>${getCat(t.category).label}</td><td>${t.method||''}</td></tr>`).join('')}
    </table></body></html>`);
  w.document.close();
  setTimeout(()=>w.print(),500);
  showNotif('PDF print dialog opened ✓');
}
function download(name, content, mime) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content],{type:mime}));
  a.download = name;
  a.click();
}
function importJSON(e) {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if(!Array.isArray(data.transactions)) throw new Error('Invalid format');
      confirmAction(`Import ${data.transactions.length} transactions? This will REPLACE current data.`, () => {
        state.transactions = data.transactions;
        state.budgets = data.budgets || {};
        save();
        refreshDashboard();
        showNotif(`Imported ${data.transactions.length} transactions ✓`);
      }, 'Import');
    } catch(err) { showNotif('Import failed: invalid JSON','error'); }
  };
  reader.readAsText(file);
}

// ===================== THEME =====================
function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? '' : 'light');
  const icon = isLight ? '☀' : '☾';
  const label = isLight ? 'Light mode' : 'Dark mode';
  const ti = document.getElementById('theme-icon'); if(ti) ti.textContent = icon;
  const tim = document.getElementById('theme-icon-m'); if(tim) tim.textContent = icon;
  const tl = document.getElementById('theme-label'); if(tl) tl.textContent = label;
  localStorage.setItem('kharcha_theme', isLight ? 'dark' : 'light');
  setTimeout(() => { Object.keys(charts).forEach(k => { if(charts[k]) charts[k].destroy(); delete charts[k]; }); renderCharts(); }, 100);
}

// ===================== SEED DEMO DATA =====================
function seedDemo() {
  const now = new Date();
  const ago = (d) => { const x=new Date(now); x.setDate(x.getDate()-d); return x.toISOString().slice(0,10); };
  state.transactions = [
    {id:uuid(),type:'income',title:'Monthly Salary',amount:75000,category:'salary',date:ago(1),method:'Net Banking',notes:'',recurring:'monthly'},
    {id:uuid(),type:'expense',title:'Zomato order',amount:450,category:'food',date:ago(0),method:'UPI',notes:''},
    {id:uuid(),type:'expense',title:'Metro pass',amount:600,category:'transport',date:ago(2),method:'Card',notes:''},
    {id:uuid(),type:'expense',title:'Netflix',amount:649,category:'entertainment',date:ago(3),method:'Card',notes:'',recurring:'monthly'},
    {id:uuid(),type:'expense',title:'Electricity bill',amount:1200,category:'bills',date:ago(5),method:'UPI',notes:''},
    {id:uuid(),type:'expense',title:'Groceries',amount:2800,category:'food',date:ago(7),method:'Cash',notes:''},
    {id:uuid(),type:'income',title:'Freelance project',amount:15000,category:'freelance',date:ago(8),method:'UPI',notes:''},
    {id:uuid(),type:'expense',title:'Amazon order',amount:3200,category:'shopping',date:ago(10),method:'Card',notes:''},
    {id:uuid(),type:'expense',title:'Doctor visit',amount:800,category:'health',date:ago(12),method:'Cash',notes:''},
    {id:uuid(),type:'expense',title:'Udemy course',amount:499,category:'education',date:ago(14),method:'Card',notes:''},
    {id:uuid(),type:'expense',title:'Gym membership',amount:1500,category:'health',date:ago(15),method:'UPI',notes:'',recurring:'monthly'},
    {id:uuid(),type:'income',title:'Salary',amount:75000,category:'salary',date:ago(32),method:'Net Banking',notes:'',recurring:'monthly'},
    {id:uuid(),type:'expense',title:'Rent',amount:18000,category:'bills',date:ago(33),method:'Net Banking',notes:'',recurring:'monthly'},
    {id:uuid(),type:'expense',title:'Food delivery',amount:850,category:'food',date:ago(35),method:'UPI',notes:''},
    {id:uuid(),type:'expense',title:'Auto rides',amount:650,category:'transport',date:ago(38),method:'Cash',notes:''},
    {id:uuid(),type:'income',title:'Gift from family',amount:5000,category:'gifts',date:ago(45),method:'Cash',notes:''},
    {id:uuid(),type:'expense',title:'Movie tickets',amount:700,category:'entertainment',date:ago(50),method:'Card',notes:''},
    {id:uuid(),type:'expense',title:'Supermarket',amount:3500,category:'food',date:ago(60),method:'UPI',notes:''},
    {id:uuid(),type:'income',title:'Salary',amount:75000,category:'salary',date:ago(62),method:'Net Banking',notes:'',recurring:'monthly'},
    {id:uuid(),type:'expense',title:'Clothing',amount:4200,category:'shopping',date:ago(65),method:'Card',notes:''},
  ];
  state.budgets = { food: 8000, transport: 2000, entertainment: 2000, bills: 22000, shopping: 5000 };
  save();
}

// ===================== DRAWER =====================
function toggleDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const isOpen = drawer.classList.contains('open');
  if(isOpen) closeDrawer(); else openDrawer();
}
function openDrawer() {
  document.getElementById('mobile-drawer').classList.add('open');
  document.getElementById('hamburger-btn').setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  document.getElementById('mobile-drawer').classList.remove('open');
  document.getElementById('hamburger-btn').setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeDrawer(); });

// ===================== INIT =====================
function init() {
  load();
  const theme = localStorage.getItem('kharcha_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
  const _icon = theme==='light' ? '☾' : '☀';
  const _ti = document.getElementById('theme-icon'); if(_ti) _ti.textContent = _icon;
  const _tim = document.getElementById('theme-icon-m'); if(_tim) _tim.textContent = _icon;
  const _tl = document.getElementById('theme-label'); if(_tl) _tl.textContent = theme==='light' ? 'Dark mode' : 'Light mode';

  if(!state.transactions.length) seedDemo();

  populateFilterCats();
  setType('expense');
  refreshDashboard();

  const budCatSel = document.getElementById('b-category');
  budCatSel.innerHTML = CATEGORIES.expense.map(c=>`<option value="${c.id}">${c.label}</option>`).join('');
}

init();
