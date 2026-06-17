const DATA_URL = 'https://raw.githubusercontent.com/foxluvai/profile/main/discord-borders.json'; 

const DECO_IMG_ID = 'avatar-deco';

const CDN_BASE   = 'https://cdn.discordapp.com/avatar-decoration-presets/';

const CDN_SUFFIX = '.png?size=240&passthrough=true';

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function toDecorationURL(hash) {
  return CDN_BASE + hash + CDN_SUFFIX;
}

async function loadRandomBorder() {
  const img = document.getElementById(DECO_IMG_ID);
  if (!img) {
    console.warn(`[borders-loader] Không tìm thấy element #${DECO_IMG_ID}`);
    return;
  }

  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.decorations) || data.decorations.length === 0) {
      throw new Error('File JSON không có mảng "decorations" hoặc mảng rỗng.');
    }

    const picked = pickRandom(data.decorations);

    img.src = toDecorationURL(picked.hash);
    img.alt = picked.name;

    console.log(`[borders-loader] Đang dùng: "${picked.name}" (id: ${picked.id})`);

  } catch (err) {
    console.error('[borders-loader] Không load được JSON, dùng fallback.', err);

    const FALLBACK = [
      { name: 'Pink Flowers', hash: 'a_e132d6014f2075d9fc2a8ece507ef5cf' },
      { name: 'Phoenix',      hash: 'a_0e839cd79500e7b68e2bbbed54790c28' },
      { name: 'Neon Purple',  hash: 'a_1b1df0ae8c2d34afd85da5c22a0d761a' },
    ];

    const fallbackPicked = pickRandom(FALLBACK);
    img.src = toDecorationURL(fallbackPicked.hash);
    img.alt = fallbackPicked.name;
  }
}

window.refreshBorder = loadRandomBorder;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadRandomBorder);
} else {
  loadRandomBorder();
}
