// Entry point aplikasi: menyiapkan Express, view engine, middleware, routes, dan database.
require('dotenv').config(); // harus paling atas agar .env terbaca oleh config

const path = require('path');
const express = require('express');

const config = require('./config');
const sequelize = require('./config/database');
require('./models/produkModel'); // mendaftarkan model sebelum sync
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
app.use(express.static(path.join(__dirname, 'public')));

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

// Penanganan error umum (termasuk JSON body yang rusak -> 400)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error(err);

  if (req.path.startsWith('/api')) {
    const pesan = status === 400 ? 'Format request tidak valid' : 'Terjadi kesalahan pada server';
    return res.status(status).json({ status: 'error', pesan });
  }
  res.status(status).render('404', { title: 'Terjadi kesalahan' });
});

// Hubungkan database, sinkronkan tabel, lalu jalankan server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi database PostgreSQL berhasil');

    await sequelize.sync(); // membuat tabel jika belum ada
    console.log('Sinkronisasi tabel selesai');

    app.listen(config.port, () => {
      console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Gagal menyalakan server:', err.message);
    process.exit(1);
  }
}

// Jalankan hanya jika file ini dieksekusi langsung
if (require.main === module) {
  start();
}

module.exports = app;