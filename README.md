# 🦊 Fox · Profile Page

> Trang profile cá nhân phong cách Discord / dark-mode — được xây dựng hoàn toàn bằng HTML, CSS và JavaScript thuần.

---

## ✨ Tính năng

- **Intro overlay** — màn hình chào với hiệu ứng nhấp nháy, bấm vào để vào trang
- **Nhạc nền** — tự động phát khi bấm vào overlay, có nút toggle bật/tắt
- **Avatar decoration ngẫu nhiên** — mỗi lần tải trang, khung viền hoạt ảnh sẽ được chọn ngẫu nhiên
- **Hiệu ứng glitch** trên tên hiển thị
- **Typewriter bio** — dòng bio tự gõ và xóa xoay vòng
- **Particle background** — 150 hạt tím bay nhẹ trên nền
- **Badges** — Verified · Developer · Music · Vietnam
- **QR donate** — quét mã chuyển khoản, mọi ngân hàng
- **Mạng xã hội** — Facebook, TikTok, Discord, Email
- **Konami Code easter egg** — `↑ ↑ ↓ ↓ ← → ← → B A` để kích hoạt 🌈
- **Responsive** — hoạt động tốt trên cả mobile lẫn desktop
- **🎉 Theme dịp lễ tự động** — tự đổi màu sắc, particle, border avatar, nhạc nền & hiệu ứng đặc biệt theo lịch

---

## 📁 Cấu trúc file

```
📁 beta-main/
 ├── index.html                   # Giao diện chính
 ├── borders-loader.js            # Logic chọn ngẫu nhiên border
 ├── holiday-theme.js             # Tự động đổi theme theo ngày lễ
 ├── borders/
 │   ├── phoenix.png
 │   ├── sword.png
 │   ├── ramen.png
 │   ├── bat.png                  # Halloween
 │   ├── firecrackers.png         # Tết
 │   ├── rainbow.png              # Sinh nhật
 │   └── christmas.svg            # 🆕 Khung Giáng Sinh (Discord style)
 ├── anhaudio/
 │   ├── 1.jpg / 2.jpg / 3.jpg   # Cover nhạc thường
 │   ├── christmas.svg            # 🆕 Cover Giáng Sinh
 │   ├── newyear.svg              # 🆕 Cover Năm Mới
 │   ├── halloween.svg            # 🆕 Cover Halloween
 │   └── birthday.svg             # 🆕 Cover Sinh Nhật
 ├── audio/
 │   ├── Audio1.mp3 / Audio2.mp3 / Audio3.mp3  # Nhạc thường
 │   ├── christmas.mp3            # 🆕 All I Want for Christmas Is You — Mariah Carey
 │   ├── newyear.mp3              # 🆕 Happy New Year — ABBA
 │   ├── halloween.mp3            # 🆕 This Is Halloween — The Citizens
 │   └── birthday.mp3             # 🆕 Khúc Hát Mừng Sinh Nhật — Phan Đình Tùng
 ├── Avatar.jpg
 └── QRCode.jpg
```

---

## 🎉 Lịch dịp lễ & nhạc tương ứng

| Dịp lễ | Thời gian | Nhạc | Hiệu ứng | Border |
|---|---|---|---|---|
| 🎆 Năm Mới Dương Lịch | 31/12 – 01/01 | Happy New Year — ABBA | Pháo hoa | Firecrackers |
| 🧧 Tết Nguyên Đán | ±3 ngày quanh Mùng 1 | Playlist gốc | Pháo hoa | Firecrackers |
| 🎂 Sinh nhật (9/3) | 8–10/03 | Khúc Hát Mừng Sinh Nhật | Pháo hoa | Rainbow |
| 🎃 Halloween | 29–31/10 | This Is Halloween | Dơi bay | Bat |
| 🎄 Giáng Sinh | 23–26/12 | All I Want for Christmas Is You | Tuyết rơi | **Christmas** |

---

## 🛠️ Tuỳ chỉnh

- **Thêm năm Tết mới** (sau 2035): thêm dòng vào `LUNAR_NEW_YEAR_DATES` trong `holiday-theme.js`
- **Đổi nhạc cho dịp**: sửa object `track` của dịp đó, trỏ đến file trong `audio/` và cover trong `anhaudio/`
- **Thêm dịp lễ mới**: copy 1 object trong `HOLIDAYS`, đổi `id`, `getRange`, màu sắc theo ý

---

## 🛠️ Công nghệ

| Thành phần | Chi tiết |
|---|---|
| HTML / CSS / JS | Thuần, không framework |
| Font | Space Grotesk · JetBrains Mono |
| Icon | Font Awesome 6.5 |
| Avatar decoration | PNG/SVG local trong `borders/` |
| Hosting | GitHub Pages |

---

## 📬 Liên hệ

| | |
|---|---|
| Facebook | [facebook.com/march9thh](https://www.facebook.com/march9thh) |
| TikTok | [@foxloveai](https://www.tiktok.com/@foxloveai) |
| Discord | [Server Discord](https://discord.gg/UqKa6npGhZ) |
| Email | foxluvai93@gmail.com |

---

<p align="center">made by fox ♥ · foxluvai © 2026</p>
