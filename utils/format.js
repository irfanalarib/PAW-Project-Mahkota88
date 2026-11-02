// Fungsi bantu yang dipakai ulang di berbagai bagian aplikasi.

// 85000 -> "Rp 85.000"
function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

// Timestamp ISO untuk log dan response API.
function timestamp() {
  return new Date().toISOString();
}

module.exports = { formatRupiah, timestamp };
