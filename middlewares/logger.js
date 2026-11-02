// Middleware logger: mencatat metode, path, status response, dan waktu request
// ke terminal setelah response selesai dikirim (supaya status code sudah diketahui).
const { timestamp } = require('../utils/format');

const RESET = '\x1b[0m';

function warnaStatus(status) {
  if (status >= 500) return '\x1b[31m'; // merah
  if (status >= 400) return '\x1b[33m'; // kuning
  if (status >= 300) return '\x1b[36m'; // cyan
  return '\x1b[32m'; // hijau
}

function requestLogger(req, res, next) {
  const mulai = process.hrtime.bigint();

  res.on('finish', () => {
    const durasiMs = Number(process.hrtime.bigint() - mulai) / 1e6;
    const status = res.statusCode;
    console.log(
      `[${timestamp()}] ${req.method} ${req.originalUrl} ` +
        `${warnaStatus(status)}${status}${RESET} ${durasiMs.toFixed(1)}ms`
    );
  });

  next(); // wajib: lanjutkan ke middleware/route berikutnya
}

module.exports = requestLogger;
