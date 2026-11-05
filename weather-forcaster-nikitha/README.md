# Nimbus Weather Forcaster

A responsive, scrollable weather dashboard built by Nikita using only HTML, CSS, and JavaScript.

## Project Summary

Nimbus is a lightweight weather web app that lets users search for city weather or use their current location. It uses Open-Meteo APIs for geocoding and forecast data, and includes a modern glassmorphism UI with a mobile-first responsive layout.

### Key features

- City search with improved fallback and spelling tolerance
- Recent search list for quick lookup
- Location detection via browser geolocation
- Current weather hero card with temperature, condition, and emoji icon
- Hourly scroll section for the next 24 hours
- 7-day forecast grid
- Weather highlights panel with feel-like temperature, humidity, wind, sunrise, sunset, and UV index
- Light/dark theme toggle
- Fully mobile responsive design with scroll-friendly sections and smooth transitions
- Error handling and loading state UX

## Files

- `nimbus-weather (1).html` — complete single-page app with embedded CSS and JavaScript

## Usage

1. Open `nimbus-weather (1).html` in a browser.
2. Enter a city name in the search field and press Enter or click the search button.
3. Optionally click the location icon to use your current GPS position.
4. Scroll through hourly and daily forecast sections.

## Notes

- The app uses Open-Meteo's free geocoding and forecast services.
- No build step is required; this is a single-file project.
- For best results, run from a web server or local file system in modern browsers.

## Development

- Modify the HTML file to update layout, sections, or styling.
- The JavaScript logic is embedded directly in the HTML and can be extended with new APIs or visual enhancements.

## Built by

Nikita
