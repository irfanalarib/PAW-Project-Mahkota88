// Mengisi data awal ke tabel produk. Jalankan: npm run seed
// Aman dijalankan berulang: dilewati jika tabel sudah berisi data.
// Catatan: data contoh, sesuaikan dengan produk asli Kopi Mahkota 88.
require('dotenv').config();
const sequelize = require('../config/database');
const ProdukModel = require('../models/produkModel');

const dataAwal = [
  { nama: 'Gayo Aceh Natural', asal: 'Aceh Tengah', roast: 'Medium',
    notes: ['Cokelat', 'Rempah', 'Body tebal'], harga: 85000, berat: '200 gr', stok: 24 },
  { nama: 'Toraja Sapan Honey', asal: 'Tana Toraja, Sulawesi', roast: 'Medium',
    notes: ['Karamel', 'Buah merah', 'Manis lembut'], harga: 90000, berat: '200 gr', stok: 15 },
  { nama: 'Kintamani Bali Washed', asal: 'Kintamani, Bali', roast: 'Light',
    notes: ['Jeruk', 'Floral', 'Asam segar'], harga: 95000, berat: '200 gr', stok: 8 },
  { nama: 'Flores Bajawa', asal: 'Bajawa, Flores', roast: 'Medium-Dark',
    notes: ['Tembakau', 'Dark chocolate', 'Earthy'], harga: 88000, berat: '200 gr', stok: 12 },
  { nama: 'Java Preanger', asal: 'Jawa Barat', roast: 'Medium',
    notes: ['Kacang', 'Karamel', 'Seimbang'], harga: 80000, berat: '200 gr', stok: 30 },
  { nama: 'Mandailing Sumatra', asal: 'Sumatera Utara', roast: 'Medium-Dark',
    notes: ['Herbal', 'Cokelat', 'Body tebal'], harga: 92000, berat: '200 gr', stok: 18 },
  { nama: 'Wamena Papua', asal: 'Wamena, Papua', roast: 'Medium',
    notes: ['Bersih', 'Manis', 'Floral'], harga: 98000, berat: '200 gr', stok: 10 },
  { nama: 'Robusta Temanggung', asal: 'Temanggung, Jawa Tengah', roast: 'Dark',
    notes: ['Pahit mantap', 'Cokelat gelap', 'Kafein tinggi'], harga: 60000, berat: '200 gr', stok: 0 },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    if ((await ProdukModel.countAll()) > 0) {
      console.log('Tabel produk sudah berisi data, seed dilewati.');
    } else {
      await ProdukModel.bulkCreate(dataAwal);
      console.log(`Seed berhasil: ${dataAwal.length} produk ditambahkan.`);
    }
    await sequelize.close();
  } catch (err) {
    console.error('Gagal seed:', err.message);
    process.exit(1);
  }
}

seed();