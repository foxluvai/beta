const DECO_IMG_ID = 'avatar-deco';
const BORDERS_DIR = 'borders/';

// ── Tĩnh (PNG) ───────────────────────────────────────────────────────────────
const STATIC_BORDERS = [
  { name: 'Phoenix',      file: 'phoenix.png',      type: 'static' },
  { name: 'Sword',        file: 'sword.png',         type: 'static' },
  { name: 'Ramen',        file: 'ramen.png',         type: 'static' },
  { name: 'Bat',          file: 'bat.png',           type: 'static' },
  { name: 'Firecrackers', file: 'firecrackers.png',  type: 'static' },
  { name: 'Rainbow',      file: 'rainbow.png',       type: 'static' },
];

// ── Động (Animated GIF) ───────────────────────────────────────────────────────
const ANIMATED_BORDERS = [
  { name: 'Fire',         file: 'fire_animated.gif',          type: 'animated' },
  { name: 'Neon',         file: 'neon_animated.gif',          type: 'animated' },
  { name: 'Galaxy',       file: 'galaxy_animated.gif',        type: 'animated' },
  { name: 'Holographic',  file: 'holographic_animated.gif',   type: 'animated' },
  { name: 'Lightning',    file: 'lightning_animated.gif',     type: 'animated' },
];

const ALL_BORDERS = [...STATIC_BORDERS, ...ANIMATED_BORDERS];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Load a specific border by name (case-insensitive).
 * Example: window.setBorder('Fire')
 */
window.setBorder = function(name) {
  const found = ALL_BORDERS.find(b => b.name.toLowerCase() === name.toLowerCase());
  if (!found) {
    console.warn(`[borders-loader] Không tìm thấy khung: "${name}"`);
    console.info('[borders-loader] Các khung có sẵn:', ALL_BORDERS.map(b => b.name).join(', '));
    return;
  }
  applyBorder(found);
};

/**
 * Cycle to the next border in the list.
 * Example: window.nextBorder()
 */
let _currentIndex = -1;
window.nextBorder = function() {
  _currentIndex = (_currentIndex + 1) % ALL_BORDERS.length;
  applyBorder(ALL_BORDERS[_currentIndex]);
};

/**
 * Refresh with a new random border.
 * Example: window.refreshBorder()
 */
window.refreshBorder = function() {
  applyBorder(pickRandom(ALL_BORDERS));
};

/**
 * Get list of all borders.
 */
window.listBorders = function() {
  console.table(ALL_BORDERS);
  return ALL_BORDERS.map(b => `${b.name} (${b.type})`);
};

function applyBorder(border) {
  const img = document.getElementById(DECO_IMG_ID);
  if (!img) {
    console.warn(`[borders-loader] Không tìm thấy element #${DECO_IMG_ID}`);
    return;
  }

  const url = BORDERS_DIR + border.file;
  img.src   = url;
  img.alt   = border.name;

  // Subtle fade-in when switching
  img.style.transition = 'opacity 0.4s ease';
  img.style.opacity    = '0';
  img.onload = () => { img.style.opacity = '1'; };

  console.log(`[borders-loader] Khung: "${border.name}" · ${border.type} · ${url}`);
}

// ── Init ──────────────────────────────────────────────────────────────────────
function loadRandomBorder() {
  // Ưu tiên animated border (60% xác suất)
  const pool = Math.random() < 0.6 ? ANIMATED_BORDERS : STATIC_BORDERS;
  applyBorder(pickRandom(pool));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadRandomBorder);
} else {
  loadRandomBorder();
}
