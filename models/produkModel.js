// Model produk: data statis (array) untuk Week 7. Database tidak diwajibkan.
// Catatan: harga per kemasan (lihat field "berat"). Silakan sesuaikan dengan produk asli.
const dataProduk = [
  {
    id: 1,
    nama: 'Gayo Aceh Natural',
    jenis: 'Arabika',
    asal: 'Aceh Tengah',
    roast: 'Medium',
    notes: ['Cokelat', 'Rempah', 'Body tebal'],
    harga: 85000,
    berat: '200 gr',
    stok: 24,
  },
  {
    id: 2,
    nama: 'Toraja Sapan Honey',
    jenis: 'Arabika',
    asal: 'Tana Toraja',
    roast: 'Medium',
    notes: ['Karamel', 'Buah merah', 'Manis lembut'],
    harga: 90000,
    berat: '200 gr',
    stok: 15,
  },
  {
    id: 3,
    nama: 'Kintamani Bali Washed',
    jenis: 'Arabika',
    asal: 'Kintamani, Bali',
    roast: 'Light',
    notes: ['Jeruk', 'Floral', 'Asam segar'],
    harga: 95000,
    berat: '200 gr',
    stok: 8,
  },
  {
    id: 4,
    nama: 'Flores Bajawa',
    jenis: 'Arabika',
    asal: 'Bajawa, Flores',
    roast: 'Medium-Dark',
    notes: ['Tembakau', 'Dark chocolate', 'Earthy'],
    harga: 88000,
    berat: '200 gr',
    stok: 12,
  },
  {
    id: 5,
    nama: 'Java Preanger',
    jenis: 'Arabika',
    asal: 'Jawa Barat',
    roast: 'Medium',
    notes: ['Kacang', 'Karamel', 'Seimbang'],
    harga: 80000,
    berat: '200 gr',
    stok: 30,
  },
  {
    id: 6,
    nama: 'Robusta Temanggung',
    jenis: 'Robusta',
    asal: 'Temanggung',
    roast: 'Dark',
    notes: ['Pahit mantap', 'Cokelat gelap', 'Kafein tinggi'],
    harga: 60000,
    berat: '200 gr',
    stok: 0,
  },
];

// Tambahkan field turunan "tersedia" agar siap dipakai view dan API.
function withStatus(produk) {
  return { ...produk, tersedia: produk.stok > 0 };
}

const ProdukModel = {
  getAll() {
    return dataProduk.map(withStatus);
  },

  getById(id) {
    const found = dataProduk.find((p) => p.id === Number(id));
    return found ? withStatus(found) : null;
  },

  countTersedia() {
    return dataProduk.filter((p) => p.stok > 0).length;
  },
};

module.exports = ProdukModel;
