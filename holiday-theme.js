/**
 * holiday-theme.js  (fixed)
 * ------------------------------------------------------------
 * Tự động phát hiện các dịp đặc biệt (Tết, sinh nhật, Halloween,
 * Giáng sinh, Năm mới) theo ngày hiện tại của máy người dùng và
 * áp theme (màu sắc, particle, nhạc nền, hiệu ứng đặc biệt) —
 * không cần chỉnh tay mỗi năm.
 *
 * FIX (v2):
 *  - Halloween: nhiều dơi hơn (35), nền tối âm u hơn, thêm fog overlay
 *  - Viền card: không còn viền đỏ cứng; border-spin dùng màu đúng theo dịp
 *  - Nhạc Tết ÂL: có nhạc riêng (tet.mp3) và ảnh bìa riêng (tet.svg)
 *  - Nhạc Tết DL và Tết ÂL hoàn toàn độc lập
 * ------------------------------------------------------------
 */
(function () {
  'use strict';

  /* ====================================================================
   * 1. BẢNG NGÀY TẾT NGUYÊN ĐÁN (DƯƠNG LỊCH) 2025–2035
   * ==================================================================== */
  const LUNAR_NEW_YEAR_DATES = {
    2025: '2025-01-29',
    2026: '2026-02-17',
    2027: '2027-02-06',
    2028: '2028-01-26',
    2029: '2029-02-13',
    2030: '2030-02-03',
    2031: '2031-01-23',
    2032: '2032-02-11',
    2033: '2033-01-31',
    2034: '2034-02-19',
    2035: '2035-02-08',
  };

  /* ====================================================================
   * 2. CẤU HÌNH TỪNG DỊP LỄ
   * ==================================================================== */
  const HOLIDAYS = [
    {
      id: 'tet',
      name: 'Tết Nguyên Đán',
      daysBefore: 3,
      daysAfter: 4,
      getRange(year) {
        const lunarStr = LUNAR_NEW_YEAR_DATES[year];
        if (!lunarStr) return null;
        return { anchor: new Date(lunarStr + 'T00:00:00') };
      },
      theme: {
        '--accent': '#ff3b30',
        '--accent-2': '#ffd166',
        '--border-glow': 'rgba(255, 59, 48, 0.45)',
        '--glow-avatar': '0 0 20px rgba(255, 59, 48, 0.6), 0 0 60px rgba(255, 209, 102, 0.25)',
      },
      // Màu gradient viền card theo dịp lễ
      cardBorderColors: ['#ff3b30', '#ffd166', '#ff3b30'],
      bodyClass: 'theme-tet',
      particleColor: '255, 200, 80',
      effect: 'fireworks',
      border: 'firecrackers',
      track: {
        title: 'Ngày Tết Quê Em — Thanh Ngoan',
        src: './audio/tet.mp3',
        cover: './anhaudio/tet.svg',
      },
    },
    {
      id: 'newyear',
      name: 'Năm Mới Dương Lịch',
      daysBefore: 1,
      daysAfter: 1,
      getRange(year) {
        return { anchor: new Date(year, 0, 1) };
      },
      theme: {
        '--accent': '#ffd700',
        '--accent-2': '#00b4d8',
        '--border-glow': 'rgba(255, 215, 0, 0.5)',
        '--glow-avatar': '0 0 20px rgba(255, 215, 0, 0.65), 0 0 60px rgba(0, 180, 216, 0.25)',
      },
      cardBorderColors: ['#ffd700', '#00b4d8', '#ffd700'],
      bodyClass: 'theme-newyear',
      particleColor: '255, 215, 80',
      effect: 'fireworks',
      border: 'firecrackers',
      track: {
        title: 'Happy New Year — ABBA',
        src: './audio/newyear.mp3',
        cover: './anhaudio/newyear.svg',
      },
    },
    {
      id: 'birthday',
      name: 'Sinh nhật',
      daysBefore: 1,
      daysAfter: 1,
      getRange(year) {
        return { anchor: new Date(year, 2, 9) }; // 9 tháng 3
      },
      theme: {
        '--accent': '#ff6fb5',
        '--accent-2': '#ffd700',
        '--border-glow': 'rgba(255, 111, 181, 0.45)',
        '--glow-avatar': '0 0 20px rgba(255, 111, 181, 0.6), 0 0 60px rgba(255, 215, 0, 0.25)',
      },
      cardBorderColors: ['#ff6fb5', '#ffd700', '#ff6fb5'],
      bodyClass: 'theme-birthday',
      particleColor: '255, 180, 220',
      effect: 'fireworks',
      border: 'rainbow',
      track: {
        title: 'Khúc Hát Mừng Sinh Nhật — Phan Đình Tùng',
        src: './audio/birthday.mp3',
        cover: './anhaudio/birthday.svg',
      },
    },
    {
      id: 'halloween',
      name: 'Halloween',
      daysBefore: 2,
      daysAfter: 1,
      getRange(year) {
        return { anchor: new Date(year, 9, 31) }; // 31 tháng 10
      },
      theme: {
        '--accent': '#ff7518',
        '--accent-2': '#7c2d92',
        '--bg': '#050208',                                    // nền tối âm u hơn
        '--surface': 'rgba(80, 20, 100, 0.18)',               // card tím đậm
        '--border': 'rgba(255, 117, 24, 0.18)',
        '--border-glow': 'rgba(255, 117, 24, 0.6)',
        '--glow-avatar': '0 0 24px rgba(255, 117, 24, 0.75), 0 0 80px rgba(124, 45, 146, 0.4)',
      },
      cardBorderColors: ['#ff7518', '#7c2d92', '#ff7518'],
      bodyClass: 'theme-halloween',
      particleColor: '255, 140, 40',
      effect: 'bats',
      border: 'bat',
      track: {
        title: 'This Is Halloween — The Citizens',
        src: './audio/halloween.mp3',
        cover: './anhaudio/halloween.svg',
      },
    },
    {
      id: 'christmas',
      name: 'Giáng sinh',
      daysBefore: 2,
      daysAfter: 1,
      getRange(year) {
        return { anchor: new Date(year, 11, 25) }; // 25 tháng 12
      },
      theme: {
        '--accent': '#e63946',
        '--accent-2': '#2a9d8f',
        '--border-glow': 'rgba(230, 57, 70, 0.45)',
        '--glow-avatar': '0 0 20px rgba(230, 57, 70, 0.6), 0 0 60px rgba(42, 157, 143, 0.25)',
      },
      cardBorderColors: ['#e63946', '#2a9d8f', '#e63946'],
      bodyClass: 'theme-christmas',
      particleColor: '255, 255, 255',
      effect: 'snow',
      border: 'christmas',
      track: {
        title: 'All I Want for Christmas Is You — Mariah Carey',
        src: './audio/christmas.mp3',
        cover: './anhaudio/christmas.svg',
      },
    },
  ];

  /* ====================================================================
   * 3. XÁC ĐỊNH DỊP NÀO ĐANG DIỄN RA HÔM NAY
   * ==================================================================== */
  function dayDiffInclusive(anchor, before, after) {
    const start = new Date(anchor);
    start.setDate(start.getDate() - before);
    start.setHours(0, 0, 0, 0);
    const end = new Date(anchor);
    end.setDate(end.getDate() + after);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  function findActiveHoliday(now) {
    const year = now.getFullYear();
    for (const holiday of HOLIDAYS) {
      for (const y of [year - 1, year, year + 1]) {
        const range = holiday.getRange(y);
        if (!range) continue;
        const { start, end } = dayDiffInclusive(range.anchor, holiday.daysBefore, holiday.daysAfter);
        if (now >= start && now <= end) {
          return holiday;
        }
      }
    }
    return null;
  }

  /* ====================================================================
   * 4. ÁP THEME MÀU SẮC + SỬA VIỀN CARD
   * ==================================================================== */
  function applyColorTheme(holiday) {
    const root = document.documentElement;
    Object.entries(holiday.theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    document.body.classList.add(holiday.bodyClass);
    document.body.dataset.holiday = holiday.id;
    window.__particleColor = holiday.particleColor;

    // --- FIX VIỀN CARD: inject style override để dùng màu đúng theo dịp ---
    if (holiday.cardBorderColors) {
      const [c1, c2, c3] = holiday.cardBorderColors;
      const styleId = 'holiday-border-override';
      let el = document.getElementById(styleId);
      if (!el) {
        el = document.createElement('style');
        el.id = styleId;
        document.head.appendChild(el);
      }
      el.textContent = `
        .card::before {
          background: linear-gradient(135deg, ${c1}, ${c2}, ${c3}) !important;
          background-size: 300% 300% !important;
          opacity: 0.5 !important;
        }
      `;
    }
  }

  /* ====================================================================
   * 5. CHỌN NHẠC RIÊNG CHO DỊP
   * ==================================================================== */
  function applyHolidayTrack(holiday) {
    if (!holiday.track) return;
    window.__holidayTrack = holiday.track;
  }

  /* ====================================================================
   * 6. GỢI Ý BORDER
   * ==================================================================== */
  function applyHolidayBorder(holiday) {
    if (!holiday.border) return;
    window.__holidayBorder = holiday.border;
  }

  /* ====================================================================
   * 7. HIỆU ỨNG ĐẶC BIỆT
   * ==================================================================== */
  function createFxCanvas() {
    let canvas = document.getElementById('holiday-fx-canvas');
    if (canvas) return canvas;
    canvas = document.createElement('canvas');
    canvas.id = 'holiday-fx-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
    document.body.appendChild(canvas);
    return canvas;
  }

  /* --- SNOW --- */
  function runSnowEffect() {
    const canvas = createFxCanvas();
    const ctx = canvas.getContext('2d');
    let W, H, flakes;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function init() {
      flakes = Array.from({ length: 90 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.8 + 0.4,
        drift: Math.random() * 0.6 - 0.3,
        alpha: Math.random() * 0.6 + 0.4,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      flakes.forEach((f) => {
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.alpha})`; ctx.fill();
        f.y += f.speedY; f.x += f.drift;
        if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
      });
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', () => { resize(); init(); });
    resize(); init(); draw();
  }

  /* --- BATS (Halloween – nhiều dơi hơn, tối hơn, có sương mù) --- */
  function runBatsEffect() {
    // Thêm fog overlay tối tăm cho Halloween
    let fog = document.getElementById('halloween-fog');
    if (!fog) {
      fog = document.createElement('div');
      fog.id = 'halloween-fog';
      fog.style.cssText = `
        position:fixed;inset:0;pointer-events:none;z-index:0;
        background: radial-gradient(ellipse at 50% 100%, rgba(50,0,70,0.55) 0%, transparent 70%),
                    radial-gradient(ellipse at 20% 80%, rgba(30,0,50,0.4) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 90%, rgba(30,0,50,0.4) 0%, transparent 50%);
      `;
      document.body.appendChild(fog);
    }

    const canvas = createFxCanvas();
    const ctx = canvas.getContext('2d');
    let W, H, bats, t = 0;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function init() {
      // 35 dơi thay vì 12
      bats = Array.from({ length: 35 }, () => ({
        x: Math.random() * W,
        baseY: Math.random() * H * 0.75 + H * 0.02,
        speed: (Math.random() * 1.2 + 0.3) * (Math.random() < 0.5 ? 1 : -1),
        size: Math.random() * 9 + 5,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.4 + 0.5,  // độ trong suốt thay đổi
      }));
    }
    function drawBat(x, y, size, wing, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(15, 5, 25, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-size, -size * wing, -size * 2.2, 0);
      ctx.quadraticCurveTo(-size, size * 0.3, 0, 0);
      ctx.quadraticCurveTo(size, size * 0.3, size * 2.2, 0);
      ctx.quadraticCurveTo(size, -size * wing, 0, 0);
      ctx.fill();
      // Mắt dơi
      ctx.fillStyle = `rgba(255, 80, 0, ${alpha * 0.9})`;
      ctx.beginPath(); ctx.arc(-size * 0.35, -size * 0.1, size * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(size * 0.35, -size * 0.1, size * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.04;
      bats.forEach((b) => {
        b.x += b.speed;
        if (b.speed > 0 && b.x > W + 40) b.x = -40;
        if (b.speed < 0 && b.x < -40) b.x = W + 40;
        const y = b.baseY + Math.sin(t + b.phase) * 22;
        const wing = 0.5 + Math.abs(Math.sin(t * 5 + b.phase)) * 0.7;
        drawBat(b.x, y, b.size, wing, b.alpha);
      });
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', () => { resize(); init(); });
    resize(); init(); draw();
  }

  /* --- FIREWORKS --- */
  function runFireworksEffect() {
    const canvas = createFxCanvas();
    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function spawnFirework() {
      const x = Math.random() * W * 0.8 + W * 0.1;
      const y = Math.random() * H * 0.4 + H * 0.1;
      const hue = Math.floor(Math.random() * 60);
      const count = 28;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 2.5 + 1.5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          alpha: 1, hue: hue + Math.random() * 30,
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles = particles.filter((p) => p.alpha > 0.02);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.alpha *= 0.96;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize(); draw();
    spawnFirework();
    setInterval(spawnFirework, 2200);
  }

  function applyHolidayEffect(holiday) {
    switch (holiday.effect) {
      case 'snow':      runSnowEffect();      break;
      case 'bats':      runBatsEffect();      break;
      case 'fireworks': runFireworksEffect(); break;
    }
  }

  /* ====================================================================
   * 8. KHỞI CHẠY
   * ==================================================================== */
  function init() {
    const now = new Date();
    const holiday = findActiveHoliday(now);
    if (!holiday) return;

    applyColorTheme(holiday);
    applyHolidayTrack(holiday);
    applyHolidayBorder(holiday);
    applyHolidayEffect(holiday);

    console.info(`[holiday-theme] 🎉 Đang áp theme: ${holiday.name}`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
