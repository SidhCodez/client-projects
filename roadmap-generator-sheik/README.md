# PathForge — Tech Roadmap Generator

> Inspired by roadmap.sh. Frontend-only. No backend. No API keys.

## Color Palette

| Variable | Hex | Role |
|----------|-----|------|
| `--cream` | `#EFF6EE` | Page background, card surfaces |
| `--olive` | `#91AE27` | Primary accent, CTAs, progress |
| `--navy` | `#043565` | Nav, section headers, text contrast |

> **Note:** Third hex assumed as `#043565` (deep navy). Update `--navy` in `styles.css` if you meant a different code.

## Files

```
roadmap-generator/
├── index.html   — App shell, semantic HTML, accessibility attributes
├── main.js      — UI logic, state, event handling (ES module)
├── data.js      — Roadmap data, mock/API fetch, Markdown + JSON export helpers
├── styles.css   — Full responsive stylesheet using CSS variables
└── README.md
```

## Run Locally

No build step needed. Just serve over HTTP (ES modules require it):

```bash
# Option 1: Python (built-in)
cd roadmap-generator
python -m http.server 3000
# → open http://localhost:3000

# Option 2: Node.js (npx)
npx serve .
# → open the URL shown

# Option 3: VS Code Live Server
# Right-click index.html → Open with Live Server
```

> **Do NOT open index.html directly** as `file://` — ES module imports fail without a server.

## Features

- **8 tech domains:** Frontend, Backend, DevOps, Data Science, Cloud, Mobile, AI/ML, Cybersecurity
- **Structured sections** with phase grouping and milestone types (concept / skill / tool / milestone)
- **Progress tracking** — click milestones to mark done; saved to `localStorage` per domain
- **Export** — Markdown or JSON with one click, copyable to clipboard
- **Mock/Live toggle** — roadmap.sh has no public JSON API; mock mode is default. Toggle tries live fetch; gracefully falls back to mock if unavailable
- **Accessible** — ARIA roles, keyboard nav (Tab, Enter/Space to select, Escape to go back), focus rings, reduced-motion support
- **Responsive** — works on mobile (320px+) through desktop

## API Note

roadmap.sh does not expose a public REST/JSON API. The live mode toggle demonstrates the pattern (fetches `https://roadmap.sh/api/v1/roadmap/:id`) and silently falls back to mock data if unavailable. To wire up a real API, replace `fetchRoadmap()` in `data.js`.

## Customization

- Add domains: extend `DOMAINS` array and `ROADMAPS` object in `data.js`
- Change palette: update CSS variables in `:root` in `styles.css`
- Persist to cloud: swap `localStorage` calls in `main.js` for your DB of choice
