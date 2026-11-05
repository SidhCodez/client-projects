# SmartCompare AI

SmartCompare AI is a browser-based product comparison platform for raw specification text. Paste specs for two products, parse and normalize key fields automatically, then compare them with weighted scores, visual charts, and AI-style recommendation output.

---

## Key Features

- Frontend-only comparison dashboard using static HTML/CSS/JS
- Raw spec parsing for product name, price, RAM, storage, battery, camera, display, rating, processor, OS, and weight
- Five comparison modes: General, Student, Gamer, Professional, Photographer
- Weighted score engine that adapts scores to the selected mode
- Radar, bar, and price-vs-score charts using Chart.js
- PDF export with jsPDF + html2canvas
- Local history storage in browser `localStorage`
- Side-by-side spec table and AI-style strengths/weaknesses/recommendations

---

## Live Pages

- `index.html` – Landing page with product overview and dashboard entry
- `compare.html` – Main product comparison dashboard

---

## Usage

1. Open `index.html` in a browser.
2. Click `Open Dashboard →` or open `compare.html` directly.
3. Paste raw specs into Product A and Product B panels.
4. Click `Parse Specs →` for each product.
5. Click `Compare Products` to generate results.
6. Select a mode from the top pill bar to update scores for different use cases.
7. Use `Export PDF` to download a comparison report.
8. Click `History` to restore older comparisons.

---

## How It Works

- `parser.js` extracts structured data from pasted raw text using regex patterns.
- `compare.js` converts parsed specs into normalized metric scores and applies mode weights.
- `charts.js` renders radar, bar, and bubble charts.
- `recommendation.js` generates strengths, weaknesses, and use cases based on parsed specs.
- `pdf.js` exports a styled PDF report with key comparison tables and chart snapshots.

---

## Comparison Modes and Weights

- `general` – balanced performance across all fields
- `student` – higher value and battery weighting
- `gamer` – heavier performance weighting
- `professional` – storage and performance focused
- `photographer` – camera-weighted scoring with battery support

---

## File Structure

- `index.html` – landing page
- `compare.html` – product comparison dashboard
- `css/style.css` – visual styles and UI layout
- `js/parser.js` – raw spec parsing logic
- `js/compare.js` – comparison control, scoring, history, UI behavior
- `js/charts.js` – Chart.js rendering logic
- `js/recommendation.js` – strengths/weaknesses/use-case generation
- `js/pdf.js` – report export using jsPDF and html2canvas

---

## Dependencies

Loaded via CDN in `compare.html`:

- `Chart.js` for charts
- `jsPDF` for PDF generation
- `html2canvas` for chart capture during export

---

## Notes

- This app runs entirely in the browser; no server or backend is required.
- Comparison history is persisted locally and limited to the last 20 entries.
- If parsing fails, adding explicit labels like `RAM: 8GB` improves detection.

---

## Development

1. Clone or copy the repo.
2. Open the project folder in a browser or static server.
3. Edit `css/style.css` and JavaScript files as needed.

---

## License

Use freely for personal or demo purposes.
