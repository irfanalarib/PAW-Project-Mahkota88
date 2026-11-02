# PAW-Project-KopiMahkota88

Katalog digital **Kopi Mahkota 88** (project PAW TI-501, dikerjakan bertahap per pertemuan).
Stack: Node.js + Express.js, view engine EJS, Tailwind CSS (CDN), arsitektur MVC.

## Menjalankan

```bash
npm install
npm run dev     # development (auto-reload via nodemon)
npm start       # jalan biasa
```

Buka http://localhost:3000 (port dapat diubah lewat env `PORT`).

## Endpoint

| Method | URL           | Keterangan                    |
|--------|---------------|-------------------------------|
| GET    | `/`           | Halaman katalog (EJS)         |
| GET    | `/api/status` | Status aplikasi (JSON)        |
| GET    | `/api/produk` | Daftar produk (array JSON)    |

Setiap request dicatat di terminal oleh middleware logger
(waktu, metode, path, status, durasi).

## Struktur

```
config/        konfigurasi (port, nama app, versi)
models/        data produk (array statis)
middlewares/   logger request
controllers/   logika request & response
routes/        pemetaan URL ke controller
views/         template EJS (+ partials)
utils/         fungsi bantu (format Rupiah, timestamp)
app.js         entry point
package.json   dependency & script
```

## Roadmap (sesuai PRD)

Guest checkout + Order ID, redirect WhatsApp, widget AI (Gemini), dashboard admin, database.
