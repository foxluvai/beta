/**
 * ============================================================
 *  borders-loader.js — Discord Avatar Decoration Manager
 *  foxluvai © 2026
 * ============================================================
 *
 *  CÁCH DÙNG:
 *  1. LOCAL  → src="borders-loader.js"  (chạy qua live-server, không qua file://)
 *  2. GITHUB → đổi DATA_URL thành đường dẫn GitHub Raw (xem hướng dẫn bên dưới)
 * ============================================================
 */

// ──────────────────────────────────────────────────────────────
//  CẤU HÌNH — chỉ chỉnh sửa vùng này
// ──────────────────────────────────────────────────────────────

/**
 * Đường dẫn tới file dữ liệu JSON.
 *
 * ► LOCAL  (chạy bằng Live Server / localhost):
 *      const DATA_URL = './discord-borders.json';
 *
 * ► GITHUB (sau khi upload lên repo):
 *      const DATA_URL = 'https://raw.githubusercontent.com/TÊN_USER/TÊN_REPO/main/discord-borders.json';
 *      Ví dụ thực tế của bạn:
 *      const DATA_URL = 'https://raw.githubusercontent.com/foxluvai/profile/main/discord-borders.json';
 */
const DATA_URL = './discord-borders.json'; // ← ĐỔI THÀNH GITHUB RAW KHI DEPLOY

/** ID của <img> sẽ hiển thị khung viền trong index.html */
const DECO_IMG_ID = 'avatar-deco';

/** Prefix URL của Discord CDN */
const CDN_BASE   = 'https://cdn.discordapp.com/avatar-decoration-presets/';

/** Hậu tố ảnh Discord (size 240, passthrough animation) */
const CDN_SUFFIX = '.png?size=240&passthrough=true';

// ──────────────────────────────────────────────────────────────
//  HÀM TIỆN ÍCH
// ──────────────────────────────────────────────────────────────

/**
 * Lấy ngẫu nhiên 1 phần tử trong mảng.
 * @param {Array} arr
 * @returns {*}
 */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Chuyển đổi hash của decoration → URL ảnh đầy đủ.
 * @param {string} hash
 * @returns {string}
 */
function toDecorationURL(hash) {
  return CDN_BASE + hash + CDN_SUFFIX;
}

// ──────────────────────────────────────────────────────────────
//  HÀM CHÍNH: fetch JSON → chọn ngẫu nhiên → áp vào <img>
// ──────────────────────────────────────────────────────────────

/**
 * Tải dữ liệu borders từ DATA_URL, chọn ngẫu nhiên 1 cái,
 * rồi gán vào element có id = DECO_IMG_ID.
 *
 * @returns {Promise<void>}
 */
async function loadRandomBorder() {
  const img = document.getElementById(DECO_IMG_ID);
  if (!img) {
    console.warn(`[borders-loader] Không tìm thấy element #${DECO_IMG_ID}`);
    return;
  }

  try {
    // 1️⃣ Fetch file JSON
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // 2️⃣ Kiểm tra cấu trúc dữ liệu
    if (!Array.isArray(data.decorations) || data.decorations.length === 0) {
      throw new Error('File JSON không có mảng "decorations" hoặc mảng rỗng.');
    }

    // 3️⃣ Chọn ngẫu nhiên 1 decoration
    const picked = pickRandom(data.decorations);

    // 4️⃣ Gán vào <img>
    img.src = toDecorationURL(picked.hash);
    img.alt = picked.name;

    // Log nhẹ để debug (có thể xoá khi production)
    console.log(`[borders-loader] Đang dùng: "${picked.name}" (id: ${picked.id})`);

  } catch (err) {
    // Fallback: nếu fetch thất bại (offline, sai đường dẫn…)
    // → dùng danh sách nội tuyến để trang không bị trắng
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

// ──────────────────────────────────────────────────────────────
//  XUẤT HÀM (để index.html hoặc script khác gọi được)
// ──────────────────────────────────────────────────────────────

/**
 * Gọi hàm này để thay border mới (ví dụ: gắn vào nút "Đổi border").
 * Đã được export ra window để dùng inline onclick="refreshBorder()".
 */
window.refreshBorder = loadRandomBorder;

// ──────────────────────────────────────────────────────────────
//  AUTO-RUN khi DOM sẵn sàng
// ──────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  // DOM chưa xong → đợi
  document.addEventListener('DOMContentLoaded', loadRandomBorder);
} else {
  // DOM đã sẵn sàng (script được load ở cuối body)
  loadRandomBorder();
}
