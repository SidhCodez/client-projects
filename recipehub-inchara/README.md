# RecipeHub

A responsive, static recipe discovery web app built with HTML, CSS, and JavaScript.

## Overview

RecipeHub lets users search recipes by name, category, and ingredients using TheMealDB API. Users can also save favorites, create and store custom recipes, view recipe details, and browse curated categories.

## Key Features

- Search recipes by name with live suggestions
- Search recipes by ingredient list
- Browse trending recipes and category filters
- Random recipe discovery
- Save and manage favorite recipes in local storage
- Create and store custom recipes locally
- View recipe details with ingredients, instructions, and related content
- Recent views history
- Dark/light theme toggle
- Mobile-friendly navigation and UI

## Pages

- `index.html` — Home page with search, category filters, trending recipes, ingredient search, random recipe, and recently viewed.
- `favorites.html` — Saved favorites list with search and clear-all support.
- `create.html` — Custom recipe builder and local storage management.
- `recipe.html` — Recipe detail page for API meals and custom recipes.
- `about.html` — App information page.

## App Architecture

### JavaScript modules and flows

- `js/app.js`
  - Shared utility functions for local storage, favorites, custom recipes, stats, toast notifications, debounce, dark mode, navbar, reveal animations, lazy loading, and recipe card rendering.
  - `Favorites`, `RecentlyViewed`, `CustomRecipes`, and `Stats` manage persisted state.
  - `apiFetch()` wraps fetch calls and standardizes error handling.

### Home page flows

- `loadTrending()` — loads a mixed batch of API recipes and custom recipes for the homepage.
- `loadCategoryPills()` — fetches category pills from TheMealDB and allows filtering.
- `filterByCategory(cat)` — loads recipes by selected category.
- `searchRecipes(query)` — searches meals by query and combines API results with custom local recipes.
- Ingredient search — fetches by first ingredient, then optionally filters results by additional ingredients.
- Random recipe discovery — loads a random meal and adds it to recently viewed.

### Create page flows

- Custom recipes are created with name, category, area, image, ingredients, and instructions.
- Recipes are saved to local storage as `rh_custom` with a generated custom `idMeal`.
- Ingredients are stored as structured rows and also serialized into `strIngredientN` and `strMeasureN` for compatibility.

### Favorites page flows

- Favorite recipes are stored in local storage as `rh_favorites`.
- Users can remove individual favorites or clear all favorites.
- A search field filters saved favorites locally.

### Recipe details page flows

- Loads recipe details by ID from query string.
- Displays ingredient list, numbered steps, video embeds when available, and recipe metadata.
- Allows saving/removing favorites from the detail view.

## Local Storage Keys

- `rh_favorites` — list of saved favorite recipes
- `rh_recent` — recently viewed recipe metadata
- `rh_custom` — saved custom recipes
- `rh_stats` — view counts and analytics
- `rh_theme` — theme selection (`light` or `dark`)

## Dependencies

- TheMealDB API: `https://www.themealdb.com/api/json/v1/1/`
- No build tools required. Works as a static site.

## How to Run

- Open `index.html` in a browser.
- Ensure the browser allows network requests to `www.themealdb.com`.
- No server is required for basic functionality.

## File Structure

- `index.html` — main search/browse page
- `favorites.html` — saved favorites interface
- `create.html` — custom recipe creation page
- `recipe.html` — detailed recipe view page
- `about.html` — static about page
- `css/style.css` — global styling and responsive rules
- `js/app.js` — shared JavaScript logic and utilities
- `assets/images/` — static image assets

## Notes

- The search uses TheMealDB's `search.php?s=` endpoint.
- Ingredient search uses `filter.php?i=` and additional client-side filtering for multi-ingredient queries.
- Category filtering uses `filter.php?c=`.
- Random recipes use `random.php`.
- The app gracefully handles empty results with friendly empty states.
- The UI includes toast notifications and reveal animations for improved interactivity.

## Future Improvements

- Add proper routing or single-page navigation
- Support API error states more clearly
- Add pagination for large result sets
- Improve custom recipe editing
- Add user authentication for cross-device persistence
