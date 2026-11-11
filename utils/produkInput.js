// Merapikan body request menjadi field produk yang diizinkan (whitelist).
const TEKS = ['nama', 'asal', 'roast', 'berat'];
const ANGKA = ['harga', 'stok'];

function ambilDataProduk(body) {
  const sumber = body || {};
  const data = {};

  TEKS.forEach((k) => {
    if (sumber[k] !== undefined && sumber[k] !== null) data[k] = String(sumber[k]).trim();
  });

  // Gambar opsional: string kosong dianggap "tidak ada gambar" (disimpan sebagai NULL).
  if (sumber.gambar !== undefined) {
    const gambar = sumber.gambar === null ? '' : String(sumber.gambar).trim();
    data.gambar = gambar === '' ? null : gambar;
  }

  ANGKA.forEach((k) => {
    if (sumber[k] !== undefined && sumber[k] !== null && sumber[k] !== '') {
      data[k] = Number(sumber[k]);
    }
  });

  if (sumber.notes !== undefined) {
    const daftar = Array.isArray(sumber.notes) ? sumber.notes : String(sumber.notes).split(',');
    data.notes = daftar.map((n) => String(n).trim()).filter(Boolean);
  }

  return data;
}

module.exports = { ambilDataProduk };