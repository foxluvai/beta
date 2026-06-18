/**
 * holiday-theme.js
 * ------------------------------------------------------------
 * Tự động phát hiện các dịp đặc biệt (Tết, sinh nhật, Halloween,
 * Giáng sinh, Năm mới) theo ngày hiện tại của máy người dùng và
 * áp theme (màu sắc, particle, nhạc nền, hiệu ứng đặc biệt) —
 * không cần chỉnh tay mỗi năm.
 *
 * Cách thêm/sửa dịp lễ: chỉnh trong HOLIDAYS.
 * Cách thêm năm mới cho Tết: thêm vào LUNAR_NEW_YEAR_DATES.
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
      bodyClass: 'theme-tet',
      particleColor: '255, 200, 80',
      effect: 'fireworks',
      border: 'firecrackers',
      track: null, // Chưa có nhạc Tết riêng -> dùng playlist mặc định
    },
    {
      id: 'newyear',
      name: 'Năm Mới Dương Lịch',
      daysBefore: 1,
      daysAfter: 1, // 31/12 – 01/01
      getRange(year) {
        return { anchor: new Date(year, 0, 1) }; // tháng 1, ngày 1
      },
      theme: {
        '--accent': '#ffd700',
        '--accent-2': '#00b4d8',
        '--border-glow': 'rgba(255, 215, 0, 0.5)',
        '--glow-avatar': '0 0 20px rgba(255, 215, 0, 0.65), 0 0 60px rgba(0, 180, 216, 0.25)',
      },
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
        return { anchor: new Date(year, 2, 9) }; // tháng 3, ngày 9
      },
      theme: {
        '--accent': '#ff6fb5',
        '--accent-2': '#ffd700',
        '--border-glow': 'rgba(255, 111, 181, 0.45)',
        '--glow-avatar': '0 0 20px rgba(255, 111, 181, 0.6), 0 0 60px rgba(255, 215, 0, 0.25)',
      },
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
        return { anchor: new Date(year, 9, 31) }; // tháng 10, ngày 31
      },
      theme: {
        '--accent': '#ff7518',
        '--accent-2': '#7c2d92',
        '--border-glow': 'rgba(255, 117, 24, 0.45)',
        '--glow-avatar': '0 0 20px rgba(255, 117, 24, 0.6), 0 0 60px rgba(124, 45, 146, 0.25)',
      },
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
      daysAfter: 1, // 23-26/12
      getRange(year) {
        return { anchor: new Date(year, 11, 25) }; // tháng 12, ngày 25
      },
      theme: {
        '--accent': '#e63946',
        '--accent-2': '#2a9d8f',
        '--border-glow': 'rgba(230, 57, 70, 0.45)',
        '--glow-avatar': '0 0 20px rgba(230, 57, 70, 0.6), 0 0 60px rgba(42, 157, 143, 0.25)',
      },
      bodyClass: 'theme-christmas',
      particleColor: '255, 255, 255',
      effect: 'snow',
      border: 'christmas', // 🎄 Discord Christmas border
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
   * 4. ÁP THEME MÀU SẮC
   * ==================================================================== */
  function applyColorTheme(holiday) {
    const root = document.documentElement;
    Object.entries(holiday.theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    document.body.classList.add(holiday.bodyClass);
    document.body.dataset.holiday = holiday.id;
    window.__particleColor = holiday.particleColor;
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
   * 7. HIỆU ỨNG ĐẶC BIỆT: pháo hoa / tuyết rơi / dơi bay
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

  function runSnowEffect() {
    const canvas = createFxCanvas();
    const ctx = canvas.getContext('2d');
    let W, H, flakes;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    function init() {
      flakes = Array.from({ length: 90 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.8 + 0.4,
        drift: Math.random() * 0.6 - 0.3,
        alpha: Math.random() * 0.6 + 0.4,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      flakes.forEach((f) => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.alpha})`;
        ctx.fill();
        f.y += f.speedY;
        f.x += f.drift;
        if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
      });
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', () => { resize(); init(); });
    resize(); init(); draw();
  }

  function runBatsEffect() {
    const canvas = createFxCanvas();
    const ctx = canvas.getContext('2d');
    let W, H, bats, t = 0;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    function init() {
      bats = Array.from({ length: 12 }, () => ({
        x: Math.random() * W,
        baseY: Math.random() * H * 0.6,
        speed: Math.random() * 0.8 + 0.4,
        size: Math.random() * 6 + 6,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    function drawBat(x, y, size, wing) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = 'rgba(20, 10, 30, 0.85)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-size, -size * wing, -size * 2, 0);
      ctx.quadraticCurveTo(-size, size * 0.3, 0, 0);
      ctx.quadraticCurveTo(size, size * 0.3, size * 2, 0);
      ctx.quadraticCurveTo(size, -size * wing, 0, 0);
      ctx.fill();
      ctx.restore();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.05;
      bats.forEach((b) => {
        b.x += b.speed;
        if (b.x > W + 30) b.x = -30;
        const y = b.baseY + Math.sin(t + b.phase) * 20;
        const wing = 0.6 + Math.sin(t * 4 + b.phase) * 0.5;
        drawBat(b.x, y, b.size, wing);
      });
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', () => { resize(); init(); });
    resize(); init(); draw();
  }

  function runFireworksEffect() {
    const canvas = createFxCanvas();
    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
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
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          hue: hue + Math.random() * 30,
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles = particles.filter((p) => p.alpha > 0.02);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.03;
        p.alpha *= 0.96;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
        ctx.fill();
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
