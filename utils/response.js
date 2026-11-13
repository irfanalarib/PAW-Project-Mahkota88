// Fungsi bantu untuk response API.

// Mengubah parameter :id menjadi angka bulat positif, atau null jika tidak valid.
function idValid(nilai) {
  const id = Number(nilai);
  return Number.isInteger(id) && id > 0 && id <= 2147483647 ? id : null;
}

// Mengirim response error yang konsisten.
function kirimError(res, err) {
  if (err && err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      pesan: 'Data tidak valid',
      detail: err.errors.map((e) => e.message),
    });
  }
  console.error(err);
  return res.status(500).json({ status: 'error', pesan: 'Terjadi kesalahan pada server' });
}

// Format response seragam untuk endpoint chat: { code, success, message, data }
function sendResponse(res, { code = 200, success = true, message = '', data = null }) {
  return res.status(code).json({ code, success, message, data });
}

module.exports = { idValid, kirimError, sendResponse };