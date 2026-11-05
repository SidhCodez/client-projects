/* ============================================================
   RecipeHub – app.js
   Shared utilities: nav, dark mode, toasts, localStorage, helpers
   ============================================================ */

'use strict';

const API = 'https://www.themealdb.com/api/json/v1/1/';

/* ── LocalStorage helpers ── */
const LS = {
  get:    k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set:    (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  remove: k => localStorage.removeItem(k),
};

/* ── Favorites ── */
const Favorites = {
  getAll() { return LS.get('rh_favorites') || []; },
  add(meal) {
    const favs = this.getAll();
    if (!favs.find(f => f.idMeal === meal.idMeal)) {
      favs.unshift(meal);
      LS.set('rh_favorites', favs);
      return true;
    }
    return false;
  },
  remove(id) {
    const favs = this.getAll().filter(f => f.idMeal !== id);
    LS.set('rh_favorites', favs);
  },
  has(id) { return this.getAll().some(f => f.idMeal === id); },
  toggle(meal) {
    if (this.has(meal.idMeal)) { this.remove(meal.idMeal); return false; }
    else { this.add(meal); return true; }
  },
};

/* ── Recently Viewed ── */
const RecentlyViewed = {
  MAX: 12,
  getAll() { return LS.get('rh_recent') || []; },
  add(meal) {
    let recent = this.getAll().filter(r => r.idMeal !== meal.idMeal);
    recent.unshift({ idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb, strCategory: meal.strCategory });
    if (recent.length > this.MAX) recent = recent.slice(0, this.MAX);
    LS.set('rh_recent', recent);
  },
  getAll() { return LS.get('rh_recent') || []; },
};

/* ── Custom Recipes (created by user) ── */
const CustomRecipes = {
  getAll() { return LS.get('rh_custom') || []; },
  add(recipe) {
    const all = this.getAll();
    recipe.idMeal = 'custom_' + Date.now();
    recipe.isCustom = true;
    all.unshift(recipe);
    LS.set('rh_custom', all);
    return recipe;
  },
  remove(id) {
    const all = this.getAll().filter(r => r.idMeal !== id);
    LS.set('rh_custom', all);
  },
  get(id) { return this.getAll().find(r => r.idMeal === id); },
};

/* ── Stats ── */
const Stats = {
  increment(key) {
    const s = LS.get('rh_stats') || {};
    s[key] = (s[key] || 0) + 1;
    LS.set('rh_stats', s);
  },
  get(key) { return (LS.get('rh_stats') || {})[key] || 0; },
};

/* ── Toast notification ── */
function toast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', info: '🔔' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;
  container.appendChild(el);

  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove());
  }, duration);
}

/* ── Debounce ── */
function debounce(fn, delay = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

/* ── Dark mode ── */
function initDarkMode() {
  const saved = LS.get('rh_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    updateThemeBtn(btn, saved);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      LS.set('rh_theme', next);
      document.querySelectorAll('.theme-toggle').forEach(b => updateThemeBtn(b, next));
    });
  });
}
function updateThemeBtn(btn, theme) {
  btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ── Navbar scroll + hamburger ── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Highlight active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── Scroll reveal ── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Lazy loading images ── */
function lazyLoad() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

/* ── Build recipe card HTML ── */
function buildCard(meal, customClass = '') {
  const isFav = Favorites.has(meal.idMeal);
  const thumb = meal.strMealThumb || 'https://via.placeholder.com/400x300?text=No+Image';
  const category = meal.strCategory || '';
  const area = meal.strArea || '';
  const isCustom = meal.isCustom ? '<span class="recipe-card__badge" style="background:var(--primary);color:#fff">✏️ Custom</span>' : `<span class="recipe-card__badge">${category}</span>`;

  return `
    <article class="recipe-card ${customClass}" data-id="${meal.idMeal}">
      <div class="recipe-card__img-wrap">
        <img src="${thumb}" alt="${meal.strMeal}" loading="lazy">
        ${isCustom}
        <button class="recipe-card__fav ${isFav ? 'active' : ''}"
                aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
                data-meal-id="${meal.idMeal}"
                data-meal='${JSON.stringify(meal).replace(/'/g, "&apos;")}'>
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="recipe-card__body">
        <h3 class="recipe-card__title">${meal.strMeal}</h3>
        <p class="recipe-card__meta">
          ${category ? `<span>🍽 ${category}</span>` : ''}
          ${category && area ? '<span class="sep">·</span>' : ''}
          ${area ? `<span>🌍 ${area}</span>` : ''}
        </p>
      </div>
      <div class="recipe-card__actions">
        <a href="recipe.html?id=${meal.idMeal}" class="btn btn-primary btn-sm" style="flex:1;justify-content:center">
          View Recipe
        </a>
      </div>
    </article>
  `;
}

/* ── Skeleton card HTML ── */
function buildSkeletonCard() {
  return `
    <div class="skeleton-card">
      <div class="sk-img skeleton"></div>
      <div class="sk-body">
        <div class="sk-line skeleton"></div>
        <div class="sk-line skeleton short"></div>
        <div class="sk-line skeleton shorter"></div>
      </div>
    </div>
  `;
}

/* ── Attach favorite button events ── */
function attachFavEvents(container) {
  container.querySelectorAll('.recipe-card__fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      let meal;
      try { meal = JSON.parse(btn.dataset.meal.replace(/&apos;/g, "'")); } catch { return; }
      const added = Favorites.toggle(meal);
      btn.classList.toggle('active', added);
      btn.textContent = added ? '❤️' : '🤍';
      btn.setAttribute('aria-label', added ? 'Remove from favorites' : 'Add to favorites');
      toast(added ? `Added "${meal.strMeal}" to favorites!` : `Removed "${meal.strMeal}" from favorites.`,
            added ? 'success' : 'info');
      // Update fav count stat
      document.querySelectorAll('[data-stat="favs"]').forEach(el => {
        el.textContent = Favorites.getAll().length;
      });
    });
  });
}

/* ── Fetch with error handling ── */
async function apiFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDarkMode();
  initReveal();
});
