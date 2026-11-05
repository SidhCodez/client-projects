// main.js — Roadmap Generator core logic
import { DOMAINS, fetchRoadmap, toMarkdown, toJSON, MOCK_MODE } from "./data.js";

// ─── State ───────────────────────────────────────────────────────────────────
let state = {
  selectedDomain: null,
  roadmap: null,
  progress: {}, // milestoneId → bool
  mockMode: MOCK_MODE,
  exportFormat: "markdown",
};

// ─── DOM refs ────────────────────────────────────────────────────────────────
const domainGrid = document.getElementById("domain-grid");
const roadmapView = document.getElementById("roadmap-view");
const roadmapTitle = document.getElementById("roadmap-title");
const roadmapMeta = document.getElementById("roadmap-meta");
const roadmapSections = document.getElementById("roadmap-sections");
const exportBtn = document.getElementById("export-btn");
const exportFormat = document.getElementById("export-format");
const exportOutput = document.getElementById("export-output");
const copyBtn = document.getElementById("copy-btn");
const backBtn = document.getElementById("back-btn");
const modeToggle = document.getElementById("mode-toggle");
const modeLabel = document.getElementById("mode-label");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const loadingState = document.getElementById("loading-state");
const exportPanel = document.getElementById("export-panel");
const toastEl = document.getElementById("toast");

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  renderDomainGrid();
  bindGlobalEvents();
  updateModeLabel();
}

// ─── Domain Grid ─────────────────────────────────────────────────────────────
function renderDomainGrid() {
  domainGrid.innerHTML = DOMAINS.map(d => `
    <button class="domain-card" data-id="${d.id}" aria-label="Generate roadmap for ${d.label}">
      <span class="domain-icon" aria-hidden="true">${d.icon}</span>
      <span class="domain-label">${d.label}</span>
      <span class="domain-arrow">→</span>
    </button>
  `).join("");

  domainGrid.querySelectorAll(".domain-card").forEach(card => {
    card.addEventListener("click", () => selectDomain(card.dataset.id));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") selectDomain(card.dataset.id);
    });
  });
}

// ─── Select Domain ───────────────────────────────────────────────────────────
async function selectDomain(domainId) {
  state.selectedDomain = domainId;

  // Show loading
  document.getElementById("hero").classList.add("hidden");
  loadingState.classList.remove("hidden");
  roadmapView.classList.add("hidden");

  const roadmap = await fetchRoadmap(domainId);

  loadingState.classList.add("hidden");

  if (!roadmap) {
    alert("Roadmap not found for this domain.");
    document.getElementById("hero").classList.remove("hidden");
    return;
  }

  state.roadmap = roadmap;
  // Load persisted progress from localStorage
  const saved = localStorage.getItem(`progress-${domainId}`);
  state.progress = saved ? JSON.parse(saved) : {};

  renderRoadmap();
  roadmapView.classList.remove("hidden");
  roadmapView.scrollIntoView({ behavior: "smooth" });
}

// ─── Render Roadmap ───────────────────────────────────────────────────────────
function renderRoadmap() {
  const { roadmap, selectedDomain } = state;
  const domain = DOMAINS.find(d => d.id === selectedDomain);

  roadmapTitle.textContent = `${domain.icon} ${roadmap.title}`;
  roadmapMeta.textContent = `${roadmap.description} · ~${roadmap.estimatedWeeks} weeks`;

  roadmapSections.innerHTML = roadmap.sections.map(section => `
    <section class="roadmap-section" id="section-${section.id}" aria-label="${section.title}">
      <div class="section-header">
        <div class="phase-badge">Phase ${section.phase}</div>
        <h3 class="section-title">${section.title}</h3>
      </div>
      <div class="milestones">
        ${section.milestones.map(m => renderMilestone(m)).join("")}
      </div>
    </section>
  `).join("");

  // Attach milestone toggle
  roadmapSections.querySelectorAll(".milestone").forEach(el => {
    el.addEventListener("click", () => toggleMilestone(el.dataset.id));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") toggleMilestone(el.dataset.id);
    });
  });

  updateProgress();
}

function renderMilestone(m) {
  const done = !!state.progress[m.id];
  const typeIcon = { concept: "📖", skill: "💪", tool: "🔧", milestone: "🏆" }[m.type] || "•";
  return `
    <div class="milestone ${done ? "done" : ""}" 
         data-id="${m.id}" 
         role="checkbox" 
         aria-checked="${done}" 
         tabindex="0"
         aria-label="${m.title}, ${done ? "completed" : "not completed"}">
      <div class="milestone-check" aria-hidden="true">${done ? "✓" : ""}</div>
      <div class="milestone-content">
        <div class="milestone-header">
          <span class="milestone-type" title="${m.type}">${typeIcon}</span>
          <span class="milestone-title">${m.title}</span>
          <span class="milestone-weeks">${m.weeks}w</span>
        </div>
        ${m.resources.length ? `
          <div class="milestone-resources">
            ${m.resources.map(r => `<span class="resource-tag">${r}</span>`).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

// ─── Toggle Milestone ─────────────────────────────────────────────────────────
function toggleMilestone(id) {
  state.progress[id] = !state.progress[id];
  localStorage.setItem(`progress-${state.selectedDomain}`, JSON.stringify(state.progress));

  const el = roadmapSections.querySelector(`[data-id="${id}"]`);
  const done = state.progress[id];
  el.classList.toggle("done", done);
  el.setAttribute("aria-checked", done);
  el.querySelector(".milestone-check").textContent = done ? "✓" : "";
  el.querySelector(".milestone-title").textContent; // force repaint

  updateProgress();
}

// ─── Progress ─────────────────────────────────────────────────────────────────
function updateProgress() {
  const allMilestones = state.roadmap.sections.flatMap(s => s.milestones);
  const total = allMilestones.length;
  const done = allMilestones.filter(m => state.progress[m.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  progressBar.style.width = `${pct}%`;
  progressBar.setAttribute("aria-valuenow", pct);
  progressText.textContent = `${done} / ${total} completed (${pct}%)`;
}

// ─── Export ───────────────────────────────────────────────────────────────────
function handleExport() {
  const fmt = exportFormat.value;
  const content = fmt === "markdown"
    ? toMarkdown(state.selectedDomain, state.roadmap)
    : toJSON(state.selectedDomain, state.roadmap);

  exportOutput.value = content;
  exportPanel.classList.remove("hidden");
  exportOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function handleCopy() {
  const text = exportOutput.value;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard!");
  }).catch(() => {
    exportOutput.select();
    document.execCommand("copy");
    showToast("Copied!");
  });
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2200);
}

// ─── Back ─────────────────────────────────────────────────────────────────────
function handleBack() {
  roadmapView.classList.add("hidden");
  exportPanel.classList.add("hidden");
  exportOutput.value = "";
  document.getElementById("hero").classList.remove("hidden");
  state.selectedDomain = null;
  state.roadmap = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── Mode Toggle ──────────────────────────────────────────────────────────────
function updateModeLabel() {
  modeLabel.textContent = state.mockMode ? "Mock Mode" : "Live Mode";
  modeToggle.setAttribute("aria-checked", state.mockMode);
}

// ─── Bind Events ──────────────────────────────────────────────────────────────
function bindGlobalEvents() {
  backBtn.addEventListener("click", handleBack);
  exportBtn.addEventListener("click", handleExport);
  copyBtn.addEventListener("click", handleCopy);

  modeToggle.addEventListener("click", () => {
    state.mockMode = !state.mockMode;
    updateModeLabel();
    showToast(state.mockMode ? "Switched to mock mode" : "Switched to live mode (will fallback to mock if API unavailable)");
  });

  // Keyboard shortcut: Escape to go back
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !roadmapView.classList.contains("hidden")) handleBack();
  });
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
init();
