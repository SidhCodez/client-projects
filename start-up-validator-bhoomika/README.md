# IdeaProof — Startup Idea Validator
### Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [Tech Stack & Dependencies](#3-tech-stack--dependencies)
4. [How to Run](#4-how-to-run)
5. [Application Flow (Step by Step)](#5-application-flow-step-by-step)
6. [Feature Breakdown](#6-feature-breakdown)
7. [API Integrations](#7-api-integrations)
8. [Score Engine — How It Works](#8-score-engine--how-it-works)
9. [Data Generation System](#9-data-generation-system)
10. [UI & Design System](#10-ui--design-system)
11. [Dark Mode](#11-dark-mode)
12. [LocalStorage & History](#12-localstorage--history)
13. [PDF Export](#13-pdf-export)
14. [AI Chat Advisor](#14-ai-chat-advisor)
15. [Responsive Design](#15-responsive-design)
16. [Component Reference (HTML)](#16-component-reference-html)
17. [JavaScript Function Reference](#17-javascript-function-reference)
18. [CSS Architecture](#18-css-architecture)
19. [Known Limitations](#19-known-limitations)
20. [Future Improvements](#20-future-improvements)

---

## 1. Project Overview

**IdeaProof** is a fully frontend-only startup idea validation platform built as a college mini-project. No backend, no server, no database — everything runs in the browser.

**What it does:**  
User enters their startup idea → app fetches real-time data from free public APIs → generates a multi-dimensional analysis report including validation scores, SWOT analysis, competitor profiles, revenue models, risk assessment, and actionable improvement suggestions.

**Key design goals:**
- Zero signup / zero cost to run
- All outputs are unique per idea (deterministic seeded randomness — same input always gives same output, different input gives different output)
- Real API data where available, smart fallback mock data when APIs fail
- Professional SaaS-quality UI with dark mode, animations, PDF export

**Project name:** IdeaProof  
**Type:** Frontend-only Single Page Application (SPA)  
**Language:** HTML5 + CSS3 + Vanilla JavaScript  
**Total lines of code:** ~1,851 (259 HTML · 595 CSS · 997 JS)  
**Total file size:** ~77KB uncompressed

---

## 2. File Structure

```
startup-validator/
├── index.html      # Full application markup (259 lines)
├── style.css       # Complete stylesheet with dark mode (595 lines)
├── app.js          # All logic, API calls, generators (997 lines)
└── README.md       # This file
```

Single-page application — one HTML file, one CSS file, one JS file. No build step. No npm. No bundler.

---

## 3. Tech Stack & Dependencies

All dependencies loaded from CDN — no installation required.

| Library | Version | Purpose | CDN |
|---------|---------|---------|-----|
| Chart.js | Latest | Bar + Line trend charts | jsdelivr.net |
| jsPDF | 2.5.1 | PDF report export | cdnjs.cloudflare.com |
| Font Awesome | 6.5.0 | Icons throughout UI | cdnjs.cloudflare.com |
| Google Inter | Variable | Typography | fonts.googleapis.com |

**No other frameworks.** No React, Vue, jQuery, Bootstrap, Tailwind, or build tools.

---

## 4. How to Run

**Step 1:** Download and unzip `startup-validator.zip`

**Step 2:** Open `index.html` directly in any modern browser  
(Chrome, Firefox, Edge, Safari — all supported)

```
Double-click index.html   →   App opens instantly
```

**No web server required** for basic use. However, if browser blocks cross-origin API requests locally (rare), serve with:

```bash
# Python (if installed)
python -m http.server 8000

# Then open: http://localhost:8000
```

**Internet connection required** for:
- Google Fonts (Inter typeface)
- Font Awesome icons
- Chart.js library
- jsPDF library
- Wikipedia API calls
- GitHub API calls
- Hacker News API calls
- Reddit JSON API calls

All APIs have fallback mock data if they fail or are offline.

---

## 5. Application Flow (Step by Step)

### Step 1 — Page Load
- Theme preference loaded from `localStorage` (light or dark)
- Navbar rendered with History button + theme toggle
- Hero section displayed with CTA button

### Step 2 — User Fills Form
Fields:
- **Startup Name** — max 60 chars, live counter
- **Industry** — dropdown, 13 options
- **Idea Description** — textarea, max 500 chars, live counter, min 20 chars required
- **Target Audience** — text input, max 100 chars
- **Region / Country** — text input, max 60 chars

Validation runs on submit:
- All 5 fields required
- Description must be ≥ 20 characters
- Error message shown inline if validation fails

### Step 3 — Analysis Starts
On "Analyze Idea" click:
1. Form validated
2. `currentIdea` object built from form values + timestamp
3. Loading overlay shown (full-screen modal)
4. 7-step animated progress sequence begins

### Step 4 — 7 Loading Steps Execute
Each step runs sequentially with a 400–800ms delay (realistic feel):

| Step # | Step Label | What Runs |
|--------|-----------|-----------|
| 0 | Understanding Idea | `generateScore()` + `generateUSP()` |
| 1 | Finding Competitors | `fetchCompetitors()` → Wikipedia + GitHub APIs |
| 2 | Market Analysis | `generateMarket()` + `generateTrends()` + `fetchLiveSignals()` → HN + Reddit |
| 3 | SWOT Generation | `generateSWOT()` |
| 4 | Risk Assessment | `generateRisks()` |
| 5 | Revenue Strategy | `generateRevenue()` + `generateAudience()` + `generateCanvas()` |
| 6 | Final Validation | `generateImprovements()` |

Each step icon cycles: ○ (pending) → spinning (active) → ✓ (done)

### Step 5 — Results Rendered
Loading overlay hides. Results section reveals with all cards. Page auto-scrolls to results.

Analysis saved to `localStorage` history automatically.

### Step 6 — User Interacts with Results
- Chat with AI advisor
- Search/sort competitors
- Export PDF report
- View history of past analyses
- Click "New Idea" to reset

---

## 6. Feature Breakdown

### 6.1 Validation Score
**What:** Overall score 0–100 + 5 category subscores.

**How score is calculated:**
- Input string hashed → deterministic seed → seeded random number generator
- Industry bonus applied (AI/ML +8, SaaS +6, HealthTech +5, etc.)
- Each category: `clamp(rand()*range + base + bonus, 20, 99)`
- Overall = average of 5 categories

**5 categories scored:**
1. Market Need (base 50, range 35)
2. Innovation (base 40, range 40)
3. Scalability (base 45, range 35)
4. Competition (base 35, range 40)
5. Revenue Potential (base 48, range 35)

**Display:**
- SVG arc gauge animates from 0 to final score (18ms interval)
- Gauge color: green ≥75, blue ≥55, amber ≥40, red below
- Verdict badge: 🚀 Great / 👍 Solid / ⚠️ Needs refinement / ⛔ Rethink
- 5 animated progress bars with color coding

---

### 6.2 Startup Readiness Meter
4-stage track showing current idea maturity:

| Stage | Icon | Unlocks at Score |
|-------|------|-----------------|
| Idea Stage | 💡 | 0+ |
| MVP Stage | 🔧 | 40+ |
| Launch Stage | 🚀 | 60+ |
| Scale Stage | 📈 | 80+ |

Completed stages = green. Current stage = blue/primary. Future stages = grey.

---

### 6.3 Unique Selling Proposition (USP)
Auto-generated sentence from a pool of 5 templates.  
Template selected by `hashStr(idea.name) % 5`.  
Variables injected: `{name}`, `{audience}`, `{industry}`, `{region}`.

Displayed as a highlighted card with indigo background.

---

### 6.4 Market Opportunity
4 insight cards generated from industry-seeded random:
- **Market Demand** — High / Very High / Moderate / Growing
- **Market Size** — $2.1B to $67B (7 options)
- **Growth Potential** — 9% to 31% CAGR (5 options)
- **Industry Maturity** — Emerging / Growth Stage / Mature / Early Stage

---

### 6.5 SWOT Analysis
Interactive 4-card grid (Strengths / Weaknesses / Opportunities / Threats).

Each quadrant picks N items from a pre-written pool using the seeded RNG:
- Strengths: 4 from pool of 8
- Weaknesses: 3 from pool of 6
- Opportunities: 4 from pool of 7
- Threats: 3 from pool of 5

Color coding: green (S), red (W), blue (O), amber (T).  
Cards lift on hover.

---

### 6.6 Competitor Analysis — Cards
**Data sources (tried in order):**
1. Wikipedia OpenSearch API — searches `{industry} company software`
2. GitHub Search API — searches `{industry} {startup_first_word}` repos by stars
3. Industry-specific mock data (SaaS / EdTech / FinTech / AI ML mapped)
4. Generic fallback mock (4 named placeholders)

**Minimum 4 competitors always shown, up to 6.**

Each card shows:
- Name + description
- Market position badge
- Source badge (Established / Open Source)
- Top 2–3 strengths
- Link to website

**Search:** Live filter by name/description/position (client-side, instant)  
**Sort:** By name A–Z or by market position A–Z

---

### 6.7 Competitor Comparison Table
Same competitor data in sortable table format.

Columns:
- Competitor name (bold)
- Top 2 strengths
- Top 2 weaknesses
- Market position
- Similarity % badge (red ≥70%, amber ≥50%, green <50%)

---

### 6.8 Revenue Model Suggestions
7 models always generated and ranked by fit score:

| Model | Icon | Description |
|-------|------|-------------|
| Subscription | 🔄 | Monthly/annual recurring |
| Freemium | 🆓 | Free tier → paid upgrade |
| Commission | 💰 | % per transaction |
| Marketplace | 🏪 | Connect buyers/sellers |
| Enterprise Licensing | 🏢 | Annual B2B contracts |
| Affiliate | 🤝 | Referral fees |
| Advertising | 📢 | Audience monetization |

Top-ranked model gets "Top Pick" badge + highlighted border.  
Fit score shown per model (seeded random 20–90).

---

### 6.9 Target Audience Analysis
3 audience cards:
- **Primary** — from user's input, with regional context
- **Secondary** — enterprise adaptation of the industry
- **Early Adopters** — tech-forward first segment with feedback framing

---

### 6.10 Business Model Canvas
8-section canvas grid (3 columns layout):
1. Value Proposition
2. Customer Segments
3. Revenue Streams
4. Channels
5. Key Activities
6. Key Resources
7. Key Partners
8. Cost Structure

All populated dynamically using idea inputs as variables.

---

### 6.11 Trend Analysis — Charts
Two Chart.js charts side by side:

**Bar Chart — Market Signals:**  
5 bars: Market Demand, Investor Interest, Job Postings, Media Coverage, Search Volume  
Values: seeded random 40–90

**Line Chart — 12-Month Interest Trend:**  
Jan–Dec, starts at seeded base value, rises with slight noise  
Filled area under curve, tension 0.4 for smoothness

Both charts respect dark mode (grid/text colors swap on theme change).

---

### 6.12 Risk Assessment
4 risk cards always generated:

| Risk | Description |
|------|-------------|
| Competition Risk | Incumbent response |
| Technical Risk | Build/scale complexity |
| Financial Risk | Runway constraints |
| Adoption Risk | User habit change |

Level (Low/Medium/High) picked via `(hashStr(name) + idx*7) % 3`.  
Visual meter bar: Low=30%, Medium=60%, High=90%.  
Color: green (Low), amber (Medium), red (High).

---

### 6.13 Improvement Suggestions
10 actionable suggestions picked from pool of 10 using seeded RNG.  
Pool is idea-aware — injects `{audience}`, `{industry}`, `{region}`, `{name}` into templates.  
Displayed as numbered list with indigo number badges.

---

### 6.14 Live Industry Signals
Real-time content from:

**Hacker News API (Algolia):**
```
GET https://hn.algolia.com/api/v1/search?query={industry}&tags=story&hitsPerPage=3
```
Returns top HN stories matching the industry keyword.

**Reddit JSON API:**
```
GET https://www.reddit.com/r/{subreddit}/hot.json?limit=3
```
Industry → subreddit mapping:
- EdTech → r/edtech
- FinTech → r/fintech
- SaaS → r/SaaS
- AI/ML → r/MachineLearning
- E-Commerce → r/ecommerce
- CleanTech → r/sustainability
- Gaming → r/gamedev
- HRTech → r/humanresources

Up to 6 signals shown total. Each links to original post. Falls back to curated mock signals per industry if API fails.

---

### 6.15 AI Chat Advisor
Mini chat UI with conversation history.

**On open:** Greeting message with startup name injected.

**Quick question buttons:**
- "How can I improve this idea?"
- "Best revenue model?"
- "Biggest risks?"
- "Go-to-market strategy?"

**API flow:**
1. Try Groq API (`mixtral-8x7b-32768` model, system prompt with idea context)
2. If Groq fails (no key / rate limit) → smart mock responses

**Mock response logic:** Keyword matching on user message:
- `improve / better` → niche focus advice
- `revenue / money / monetize` → freemium model suggestion
- `risk` → adoption risk warning with mitigation
- `go-to-market / launch / gtm` → Product Hunt + community strategy
- `compet / differentiat` → UX differentiation advice
- Default → general trust-building advice

All responses inject `{name}`, `{industry}`, `{audience}`, `{region}` dynamically.

Enter key submits message. Typing indicator shown while response generates.

---

## 7. API Integrations

### Wikipedia OpenSearch API
```
URL: https://en.wikipedia.org/w/api.php
Params: action=opensearch, search={query}, limit=5, format=json, origin=*
Auth: None required
Purpose: Competitor names + descriptions
```

### GitHub Search API
```
URL: https://api.github.com/search/repositories
Params: q={industry}+{name}, sort=stars, per_page=3
Auth: None (rate limit: 10 req/min unauthenticated)
Headers: Accept: application/vnd.github.v3+json
Purpose: Open-source competitor projects
```

### Hacker News API (via Algolia)
```
URL: https://hn.algolia.com/api/v1/search
Params: query={industry}, tags=story, hitsPerPage=3
Auth: None required
Purpose: Live industry discussion signals
```

### Reddit JSON API
```
URL: https://www.reddit.com/r/{subreddit}/hot.json
Params: limit=3
Auth: None (public JSON endpoint)
Purpose: Community pain points and market sentiment
```

### Groq API (Optional — Chat Only)
```
URL: https://api.groq.com/openai/v1/chat/completions
Model: mixtral-8x7b-32768
Auth: Bearer token (placeholder in code — replace with real key)
Purpose: AI advisor chat responses
```
> Note: Groq key is not included. Chat falls back to smart mock responses if no key. To enable real AI chat, replace `gsk_placeholder` in `app.js` line ~`getAIAdvisorResponse()` with your actual Groq API key (free at console.groq.com).

### Fallback System
Every API call wrapped in `try/catch`. On any failure:
- Competitors → `getMockCompetitors(idea)` — industry-specific named competitors
- Signals → `MOCK_SIGNALS[industry]` — curated signal pool per industry
- Chat → `generateMockAdvisorResponse()` — keyword-matched smart responses

---

## 8. Score Engine — How It Works

The score engine produces **deterministic** outputs. Same startup name + description + industry = identical scores every time. Different input = different scores.

### Hash Function
```javascript
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
```
Java-style 31-multiplier polynomial hash. Produces stable integer from any string.

### Seeded Random Number Generator
```javascript
function seededRand(seed) {
  let s = Math.abs(seed) || 1;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
```
Linear congruential generator (LCG) — Park-Miller constants. Returns float 0–1. Reproducible from same seed.

### Score Formula
```
seed = hash(name + description + industry)
rand = seededRand(seed)
bonus = industryBonus[industry]  // AI/ML=8, SaaS=6, etc.

MarketNeed       = clamp(rand()*35 + 50 + bonus, 20, 99)
Innovation       = clamp(rand()*40 + 40 + bonus, 20, 99)
Scalability      = clamp(rand()*35 + 45 + bonus, 20, 99)
Competition      = clamp(rand()*40 + 35 + bonus, 20, 99)
RevenuePotential = clamp(rand()*35 + 48 + bonus, 20, 99)

Overall = average(all 5 categories)
```

Minimum score per category: 20. Maximum: 99. Never returns 0 or 100 (more realistic).

---

## 9. Data Generation System

### `pickN(array, n, seed)` — Core Utility
Shuffles array using seeded RNG, picks first N items. Guarantees:
- Always N items returned (if array is large enough)
- Same seed → same picks every time
- Different seed → different picks

Used by: SWOT generation, improvement suggestions, competitor strengths/weaknesses.

### All Generators
| Function | Returns | Seeded? |
|----------|---------|---------|
| `generateScore(idea)` | `{overall, cats}` | ✅ |
| `generateUSP(idea)` | string | ✅ (template index) |
| `generateMarket(idea)` | `{demand, size, growth, maturity}` | ✅ |
| `generateSWOT(idea)` | `{strengths[], weaknesses[], opportunities[], threats[]}` | ✅ |
| `generateRisks(idea)` | array of 4 risk objects | ✅ |
| `generateRevenue(idea)` | array of 7 model objects (sorted) | ✅ |
| `generateAudience(idea)` | array of 3 persona objects | Static template |
| `generateCanvas(idea)` | array of 8 canvas sections | Static template |
| `generateTrends(idea)` | `{months, line[], bar[]}` | ✅ |
| `generateImprovements(idea)` | array of 10 strings | ✅ |
| `generateUSP(idea)` | string | ✅ |

---

## 10. UI & Design System

### Color Palette
| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--bg` | #F8F9FB | #0F1117 |
| `--surface` | #FFFFFF | #1A1D27 |
| `--primary` | #4F46E5 | #4F46E5 |
| `--primary-light` | #EEF2FF | #1E1B4B |
| `--border` | #E5E7EB | #2A2D3A |
| `--text` | #111827 | #F1F3F9 |
| `--text-soft` | #6B7280 | #8B8FA8 |
| `--success` | #10B981 | same |
| `--warning` | #F59E0B | same |
| `--danger` | #EF4444 | same |

All colors are CSS custom properties on `:root` and `[data-theme="dark"]`. Switching theme = toggling `data-theme` attribute on `<html>`.

### Typography
- Font: Inter (Google Fonts), weights 300/400/500/600/700
- Base size: 15px
- Scale: 10px labels → 11px meta → 12px small → 13px body-sm → 14px body → 15px base → 16px sub → 17px large → 18px card-title → 22px section → 28–44px hero (fluid clamp)

### Spacing
- Border radius: 14px cards (`--radius`), 8px inputs/badges (`--radius-sm`)
- Card padding: 24px
- Section spacing: 16–32px
- Container max-width: 900px, centered, 20px side padding

### Animations
| Animation | Trigger | Implementation |
|-----------|---------|---------------|
| Fade-in | New element appears | `.animate-in` → `fadeIn` keyframe |
| Card hover lift | Mouse over card | `transform: translateY(-2px)` |
| Score gauge count-up | Results render | `setInterval` incrementing stroke-dasharray |
| Progress bar fill | Results render | CSS `width` transition 1s cubic-bezier |
| Loading spinner | Analysis running | CSS `spin` keyframe |
| Step icon change | Each step completes | classList swap + Font Awesome icon change |
| Skeleton shimmer | (Class available) | `shimmer` keyframe gradient sweep |

### Shadows
- Default card: `0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`
- Hover / elevated: `0 4px 24px rgba(0,0,0,0.08)`
- Dark mode multiplied: opacity 0.3 / 0.4

---

## 11. Dark Mode

**Implementation:**
1. On page load, read `localStorage.getItem('ideaproof-theme')` → default `'light'`
2. Set `document.documentElement.setAttribute('data-theme', value)`
3. CSS `[data-theme="dark"]` block overrides all `--variable` values
4. Toggle button icon: moon (light mode) → sun (dark mode)
5. On toggle: flip attribute, save to localStorage, update icon

Chart.js charts are re-rendered with dark-appropriate grid/text colors when results load. Charts do not auto-update if theme is toggled after render (limitation — see section 19).

---

## 12. LocalStorage & History

**Key:** `ideaproof-history`  
**Format:** JSON array, max 20 entries (oldest trimmed automatically)

Each entry object:
```json
{
  "id": 1234567890,
  "name": "PathForge",
  "industry": "EdTech",
  "score": 72,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "idea": {
    "name": "PathForge",
    "desc": "...",
    "industry": "EdTech",
    "audience": "...",
    "region": "...",
    "timestamp": "..."
  }
}
```

**History Modal features:**
- Lists all past analyses (name, industry, score, date)
- "View" button → re-runs all generators with same idea (deterministic = identical results)
- Delete button → removes entry from localStorage, refreshes list
- Empty state shown if no history

**Theme key:** `ideaproof-theme` → `'light'` or `'dark'`

No other data persisted. No server communication. No cookies.

---

## 13. PDF Export

**Library:** jsPDF 2.5.1 (UMD build from cdnjs)  
**Format:** A4, portrait, pt units

**PDF Contents:**
1. Header bar (indigo #4F46E5) with app name
2. Startup name (18pt bold)
3. Meta line: industry, region, generated date (10pt grey)
4. Horizontal rule
5. Validation Score section — overall + all 5 categories
6. Rule
7. USP section
8. Rule
9. SWOT Analysis — all 4 quadrants, bulleted
10. Rule
11. Risk Assessment — 4 risks with level + description
12. Rule
13. 10 Improvement Suggestions — numbered

**Features:**
- Auto page-break when `y > pageHeight - 60`
- File named: `{StartupName}-IdeaProof-Report.pdf`
- All data re-generated from `currentIdea` at export time (deterministic → matches screen)

**Limitation:** Charts not included in PDF (canvas-to-image conversion not implemented).

---

## 14. AI Chat Advisor

### Architecture
```
User types message
  → sendChat() called
  → User bubble appended to chat window
  → "Thinking…" typing indicator shown
  → getAIAdvisorResponse(question) called
    → Try Groq API (POST to api.groq.com)
      → Success: extract content[0].text
      → Fail (no key / error): generateMockAdvisorResponse()
  → Typing indicator removed
  → AI bubble appended
  → Chat window scrolled to bottom
```

### System Prompt (sent to Groq)
```
You are a startup advisor. Context: {name, industry, desc, audience, region}.
Give concise, actionable advice in 2-3 sentences.
```

### Quick Questions
4 pre-set buttons that fill the input and auto-submit:
- "How can I improve this idea?"
- "Best revenue model?"
- "Biggest risks?"
- "Go-to-market strategy?"

### Mock Response Matching
| Keyword in question | Response topic |
|--------------------|----------------|
| improve, better | Niche focus + early user involvement |
| revenue, money, monetize | Freemium → subscription path with pricing |
| risk | Adoption risk mitigation via onboarding |
| go-to-market, launch, gtm | Product Hunt + community + influencer |
| compet, differentiat | UX depth > feature breadth strategy |
| (default) | Trust-building + first 10 customers |

---

## 15. Responsive Design

**Approach:** Mobile-first CSS with `max-width` breakpoints.

### Breakpoints

**≤ 700px (Mobile):**
- Score grid: 2 columns → 1 column stacked
- SWOT grid: 2 columns → 1 column
- Market insight grid: 2 columns → 1 column
- Charts grid: 2 columns → 1 column
- Business canvas: 3 columns → 1 column
- Form grid: 2 columns → 1 column
- Results header: row → column stacked
- Hero padding reduced

**≤ 420px (Small mobile):**
- Readiness track: 4 columns → 1 column
- Revenue grid: auto-fill → 1 column
- Audience grid: auto-fill → 1 column

**Competitor grid:** `repeat(auto-fill, minmax(240px, 1fr))` — auto-responsive, no breakpoint needed.  
**Revenue grid:** `repeat(auto-fill, minmax(180px, 1fr))` — auto-responsive.  
**Navbar:** Stays horizontal, wraps gracefully on very small screens.

---

## 16. Component Reference (HTML)

| Element ID | Type | Purpose |
|-----------|------|---------|
| `#hero` | `<section>` | Landing hero with CTA |
| `#formSection` | `<section>` | Idea input form |
| `#ideaForm` | `<div>` | Form card container |
| `#startupName` | `<input>` | Startup name field |
| `#industry` | `<select>` | Industry dropdown |
| `#ideaDesc` | `<textarea>` | Idea description |
| `#targetAudience` | `<input>` | Target audience field |
| `#region` | `<input>` | Region/country field |
| `#nameCount` | `<span>` | Live char counter for name |
| `#descCount` | `<span>` | Live char counter for desc |
| `#analyzeBtn` | `<button>` | Submit analysis trigger |
| `#formError` | `<div>` | Inline error display |
| `#loadingOverlay` | `<div>` | Full-screen loading modal |
| `#stepsList` | `<div>` | 7 animated loading steps |
| `#loadingSub` | `<p>` | Current step subtitle |
| `#resultsSection` | `<section>` | Full results area |
| `#resultTitle` | `<h2>` | Dynamic title with startup name |
| `#gaugeFill` | `<path>` (SVG) | Animated score arc |
| `#gaugeNum` | `<text>` (SVG) | Animated score number |
| `#scoreVerdict` | `<div>` | Score verdict badge |
| `#scoreBars` | `<div>` | 5 category score bars |
| `#readinessTrack` | `<div>` | 4-stage readiness grid |
| `#uspText` | `<p>` | USP sentence |
| `#marketGrid` | `<div>` | 4 market insight cards |
| `#swotGrid` | `<div>` | 4 SWOT cards |
| `#compSearch` | `<input>` | Competitor search filter |
| `#compSort` | `<select>` | Competitor sort dropdown |
| `#compGrid` | `<div>` | Competitor cards grid |
| `#compTable` | `<table>` | Competitor comparison table |
| `#compTableBody` | `<tbody>` | Table rows (dynamic) |
| `#revenueGrid` | `<div>` | 7 revenue model cards |
| `#audienceGrid` | `<div>` | 3 audience persona cards |
| `#canvasGrid` | `<div>` | 8 business canvas sections |
| `#riskGrid` | `<div>` | 4 risk cards |
| `#trendBar` | `<canvas>` | Chart.js bar chart |
| `#trendLine` | `<canvas>` | Chart.js line chart |
| `#improvList` | `<div>` | 10 improvement suggestions |
| `#liveSignals` | `<div>` | HN + Reddit live links |
| `#chatWindow` | `<div>` | Chat message history |
| `#quickQs` | `<div>` | Quick question buttons |
| `#chatInput` | `<input>` | Chat message input |
| `#historyModal` | `<div>` | History modal overlay |
| `#historyList` | `<div>` | History entries list |
| `#themeToggle` | `<button>` | Dark/light mode switch |
| `#historyBtn` | `<button>` | Open history modal |

---

## 17. JavaScript Function Reference

### Core Flow
| Function | Description |
|----------|-------------|
| `startAnalysis()` | Main entry point — validates, builds idea object, runs steps |
| `animateSteps(onStep)` | Async iterator over 7 loading steps with UI animation |
| `renderResults(data)` | Calls all render functions with generated data |
| `resetToForm()` | Hides results, scrolls to form |
| `scrollToForm()` | Smooth scroll hero CTA → form |

### Generators
| Function | Returns |
|----------|---------|
| `generateScore(idea)` | `{overall: number, cats: object}` |
| `generateUSP(idea)` | string |
| `generateMarket(idea)` | `{demand, size, growth, maturity}` |
| `generateSWOT(idea)` | `{strengths[], weaknesses[], opportunities[], threats[]}` |
| `generateRisks(idea)` | array[4] of `{name, level, desc}` |
| `generateRevenue(idea)` | array[7] of `{name, icon, desc, score, recommended?}` |
| `generateAudience(idea)` | array[3] of `{type, name, detail}` |
| `generateCanvas(idea)` | array[8] of `{label, content, full}` |
| `generateTrends(idea)` | `{months[], line[], bar[]}` |
| `generateImprovements(idea)` | array[10] of strings |

### API Fetchers
| Function | APIs Used | Returns |
|----------|-----------|---------|
| `fetchCompetitors(idea)` | Wikipedia + GitHub | array of competitor objects |
| `fetchLiveSignals(idea)` | HN Algolia + Reddit | array of signal objects |
| `getAIAdvisorResponse(q)` | Groq (optional) | string response |

### Renderers
| Function | Renders Into |
|----------|-------------|
| `renderScore(score)` | `#gaugeFill`, `#gaugeNum`, `#scoreBars`, `#scoreVerdict` |
| `renderReadiness(score)` | `#readinessTrack` |
| `renderMarket(market)` | `#marketGrid` |
| `renderSWOT(swot)` | `#swotGrid` |
| `renderCompetitors(comps)` | `#compGrid` |
| `renderCompTable(comps)` | `#compTableBody` |
| `renderRevenue(models)` | `#revenueGrid` |
| `renderAudience(aud)` | `#audienceGrid` |
| `renderCanvas(canvas)` | `#canvasGrid` |
| `renderRisks(risks)` | `#riskGrid` |
| `renderTrends(trends)` | `#trendBar`, `#trendLine` |
| `renderImprovements(list)` | `#improvList` |
| `renderSignals(signals)` | `#liveSignals` |

### Competitor Interaction
| Function | Trigger |
|----------|---------|
| `filterCompetitors()` | `#compSearch` oninput |
| `sortCompetitors()` | `#compSort` onchange |

### Chat
| Function | Description |
|----------|-------------|
| `initChat()` | Set greeting + quick question buttons |
| `sendChat()` | Read input → append user bubble → get response → append AI bubble |
| `sendQuickQ(el, q)` | Fill input with preset → sendChat() |
| `generateMockAdvisorResponse(q, idea)` | Keyword-matched mock responses |

### History
| Function | Description |
|----------|-------------|
| `saveHistory(idea, score)` | Prepend to localStorage array (max 20) |
| `openHistory()` | Build and show modal with all entries |
| `closeHistory()` | Hide modal |
| `loadHistory(id)` | Find entry → re-render results from stored idea |
| `deleteHistory(id)` | Filter out entry → refresh modal |

### Utilities
| Function | Description |
|----------|-------------|
| `validate()` | Check all form fields, show errors |
| `showError(msg)` | Display inline form error |
| `clearForm()` | Reset all form fields and counters |
| `exportPDF()` | Build and download jsPDF report |
| `delay(ms)` | Promise-based setTimeout wrapper |
| `clamp(v, min, max)` | Constrain number to range |
| `hashStr(s)` | Deterministic integer hash from string |
| `seededRand(seed)` | LCG random function factory |
| `pickN(arr, n, seed)` | Pick N unique items from array using seeded RNG |
| `getMockCompetitors(idea)` | Industry-specific mock competitor list |
| `updateThemeIcon(t)` | Swap moon/sun icon on theme toggle |

---

## 18. CSS Architecture

**No classes system / no utility framework.** All CSS is component-specific.

### Structure of `style.css`
```
Variables (CSS custom props)        — lines 1–20
Dark mode variable overrides        — lines 22–32
Reset & base styles                 — lines 34–42
Scrollbar styling                   — lines 44–48
Utility classes (.container, .card) — lines 50–65
Navbar                              — lines 67–81
Button variants (primary/ghost/icon)— lines 83–108
Hero section                        — lines 110–130
Section / section labels            — lines 132–141
Form & fields                       — lines 143–183
Loading overlay & steps             — lines 185–225
Results header                      — lines 227–232
Score gauge & bars                  — lines 234–278
Readiness stages                    — lines 280–298
USP card                            — lines 300–310
Market insight cards                — lines 312–325
SWOT grid                           — lines 327–352
Competitor cards & controls         — lines 354–404
Competitor comparison table         — lines 406–430
Revenue model cards                 — lines 432–455
Audience cards                      — lines 457–470
Business canvas grid                — lines 472–487
Risk cards                          — lines 489–513
Charts grid                         — lines 515–520
Improvement list                    — lines 522–535
Live signals list                   — lines 537–558
Chat UI                             — lines 560–603
History modal                       — lines 605–635
Footer                              — lines 637–644
Animations (keyframes)              — lines 646–651
Responsive breakpoints (≤700, ≤420) — lines 653–690
Skeleton shimmer                    — lines 692–697
```

### CSS Variable Usage
Every color, background, border, and shadow references a CSS variable. Zero hardcoded hex colors outside `:root` and `[data-theme="dark"]`. This makes dark mode work with a single attribute toggle.

### Specificity Strategy
- Element styles: `body`, `img`, `button`, `input`
- Component prefix: `.card`, `.navbar`, `.form-card`, `.swot-card`, `.comp-card` etc.
- State suffix: `.active`, `.done`, `.hidden`, `.recommended`, `.full`
- No IDs in CSS (IDs only in JS selectors)
- No `!important` except `.hidden { display: none !important }`

---

## 19. Known Limitations

1. **Charts don't update on theme toggle after render.** Charts are initialized once with current theme colors. Toggling dark/light after results load won't recolor charts until next analysis.

2. **Groq chat requires API key.** Without a real Groq key, chat falls back to mock responses. To enable real AI chat, replace `gsk_placeholder` in `getAIAdvisorResponse()`.

3. **GitHub API rate limit.** Unauthenticated GitHub API allows 10 requests/minute. Heavy usage may hit limits → falls back to mock competitors automatically.

4. **Reddit API CORS.** Reddit's `.json` endpoint works in most browsers but some environments block it. Falls back to mock signals.

5. **PDF has no charts.** Canvas elements (Chart.js) require `html2canvas` or similar to include in PDF. Not implemented — PDF shows text sections only.

6. **No real market size data.** Market size and CAGR figures are seeded-random from realistic ranges, not fetched from real market research APIs (those require paid keys).

7. **SWOT + improvements are from pre-written pools.** Not generated by AI — selected from curated arrays. Adding a real AI call here would significantly improve quality.

8. **No offline support.** No service worker / PWA manifest. App requires internet for CDN scripts.

---

## 20. Future Improvements

| Priority | Improvement |
|----------|-------------|
| High | Add Groq/OpenRouter API key input in settings panel so users can enable real AI |
| High | Canvas-to-image for PDF export (include trend charts) |
| High | Service worker for offline support (cache CDN assets) |
| Medium | Real market size data via World Bank / Statista free tiers |
| Medium | Chart theme update on dark mode toggle (destroy + reinitialize) |
| Medium | Export to Google Slides / PPTX via SheetJS |
| Medium | Share analysis via URL (encode idea object in URL hash) |
| Low | Animation on results section scroll-into-view (IntersectionObserver) |
| Low | Competitor website favicon fetching |
| Low | Multi-language support (i18n strings object) |
| Low | Print stylesheet for clean browser print |

---

## Quick Reference Card

```
Project:     IdeaProof — Startup Idea Validator
Type:        Frontend-only SPA
Files:       3 (HTML + CSS + JS)
Lines:       1,851 total
Size:        ~77KB uncompressed
Run:         Open index.html in browser
No install:  Zero npm, zero build step
APIs:        Wikipedia, GitHub, Hacker News, Reddit (all free)
AI chat:     Groq (needs key) → falls back to smart mock
Storage:     localStorage only (theme + history, max 20)
PDF:         jsPDF, auto-paginated, named {StartupName}-IdeaProof-Report.pdf
Dark mode:   CSS variable swap via [data-theme] attribute
Responsive:  Mobile-first, breakpoints at 700px and 420px
Score:       Deterministic — same idea = same score every time
```

---

*IdeaProof — Built as a college mini-project. All analysis is for educational purposes.*
