# InsightFlow AI

A standalone frontend analytics dashboard for CSV files. InsightFlow AI lets users upload sales data, visualize metrics, generate AI-style business insights, and export reports — all inside a single `insightflow.html` file.

## Project Overview

- **Project file:** `insightflow.html`
- **Sample dataset:** `sample-sales-data.csv`
- **Purpose:** Parse CSV data, compute KPIs, render charts, generate insights, and produce export-ready PDF/CSV reports.
- **Architecture:** Pure client-side HTML, CSS, and JavaScript. No backend required.

## Key Features

- Drag & drop or browse CSV upload
- Demo dataset available in-app
- Automatic CSV schema detection
- Numeric, categorical, and date column analysis
- KPI summary cards for revenue, profit, quantity, and data quality
- Interactive charts powered by Chart.js
- Generated business insights:
  - findings
  - opportunities
  - risks
  - recommendations
- Data table with search, pagination, and sorting
- Data quality report with missing value and duplicate row metrics
- Export filtered results to CSV
- Generate PDF business report using jsPDF and html2canvas

## How to Use

1. Open `insightflow.html` in a browser.
2. Upload your CSV file using the drag & drop zone or `Browse File` button.
3. Alternatively, click `View Demo` to load the built-in sales dataset.
4. Review dashboard sections:
   - Data Overview
   - Key Performance Indicators
   - Visual Analytics
   - AI Business Insights
   - Business Analyst Report
   - Data Explorer
   - Data Quality Report
5. Use the export buttons to download CSV or PDF output.

## Recommended CSV Format

For best results, InsightFlow AI expects a sales-style dataset with columns like:

`Date, Order ID, Customer Name, Product, Category, Region, Quantity, Unit Price, Revenue, Cost, Profit`

Example rows:

```csv
2026-01-05,ORD001,Rahul Sharma,Laptop,Electronics,South,2,50000,100000,80000,20000
2026-01-07,ORD002,Priya Singh,Mobile,Electronics,North,3,25000,75000,60000,15000
2026-01-10,ORD003,Amit Kumar,Headphones,Accessories,West,5,2000,10000,7000,3000
```

### Notes

- The app supports other CSV shapes as well, and attempts to auto-detect date, numeric, categorical, and text fields.
- CSV parsing uses `PapaParse` for robust file handling.
- Charts are rendered with `Chart.js`.
- PDF export uses `jsPDF`.

## Included Files

- `insightflow.html` — complete single-file app containing HTML, CSS, and JavaScript logic.
- `sample-sales-data.csv` — example dataset with sales records for quick testing.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Chart.js
- PapaParse
- jsPDF
- html2canvas

## Running Locally

No build tools or server are required.

1. Open `insightflow.html` in a modern browser.
2. If the app is blocked by browser security for local file access, serve the folder using a simple local static server such as:
   - `python -m http.server 8000`
   - `npx http-server`
3. Navigate to `http://localhost:8000/insightflow.html`.

## Tips

- Use the provided `sample-sales-data.csv` to test the dashboard quickly.
- Keep date values in ISO format like `YYYY-MM-DD` for best time-series results.
- If your file uses different headers, InsightFlow AI will still try to detect common sales fields automatically.

## License

This project is provided as-is for prototyping and demo purposes.
