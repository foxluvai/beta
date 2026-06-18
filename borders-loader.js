const DECO_IMG_ID = 'avatar-deco';
const BORDERS_DIR = 'borders/';

const LOCAL_BORDERS = [
  { name: 'Phoenix',      file: 'phoenix.png' },
  { name: 'Sword',        file: 'sword.png' },
  { name: 'Ramen',        file: 'ramen.png' },
  { name: 'Bat',          file: 'bat.png' },
  { name: 'Firecrackers', file: 'firecrackers.png' },
  { name: 'Rainbow',      file: 'rainbow.png' },
  { name: 'Christmas',    file: 'christmas.svg' },  // 🎄 Discord Christmas border
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function loadRandomBorder() {
  const img = document.getElementById(DECO_IMG_ID);
  if (!img) {
    console.warn(`[borders-loader] Không tìm thấy element #${DECO_IMG_ID}`);
    return;
  }

  // Nếu đang trong dịp lễ đặc biệt (xem holiday-theme.js) và dịp đó có
  // gợi ý border riêng, ưu tiên dùng border đó thay vì chọn ngẫu nhiên.
  let picked = pickRandom(LOCAL_BORDERS);
  if (window.__holidayBorder) {
    const match = LOCAL_BORDERS.find(
      (b) => b.file.replace(/\.(png|svg)$/, '') === window.__holidayBorder
    );
    if (match) picked = match;
  }

  img.src = BORDERS_DIR + picked.file;
  img.alt = picked.name;

  console.log(`[borders-loader] Đang dùng khung: "${picked.name}" → ${img.src}`);
}

window.refreshBorder = loadRandomBorder;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadRandomBorder);
} else {
  loadRandomBorder();
}
