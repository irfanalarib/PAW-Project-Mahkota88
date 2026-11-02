// Entry point aplikasi: menyiapkan Express, view engine, middleware, dan routes.
const path = require('path');
const express = require('express');

const config = require('./config');
const requestLogger = require('./middlewares/logger');
const pageRoutes = require('./routes/pageRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { formatRupiah } = require('./utils/format');

const app = express();

// View engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Variabel yang tersedia di semua view
app.locals.config = config;
app.locals.formatRupiah = formatRupiah;

// Middleware (urutan penting: logger paling awal agar semua request tercatat)
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', pageRoutes);
app.use('/api', apiRoutes);

// 404: JSON untuk path /api, halaman EJS untuk lainnya
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ status: 'error', pesan: 'Endpoint tidak ditemukan' });
  }
  res.status(404).render('404', { title: 'Halaman tidak ditemukan' });
});

// Penanganan error umum
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (req.path.startsWith('/api')) {
    return res.status(500).json({ status: 'error', pesan: 'Terjadi kesalahan pada server' });
  }
  res.status(500).render('404', { title: 'Terjadi kesalahan' });
});

// Jalankan server hanya jika file ini dieksekusi langsung
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
  });
}

module.exports = app;
