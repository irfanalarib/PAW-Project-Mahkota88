// Konfigurasi aplikasi. Nilai dapat diubah lewat environment variable.
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  appName: process.env.APP_NAME || 'Kopi Mahkota 88',
  tagline: 'Kopi pilihan nusantara, pesan tanpa ribet.',
  version: '1.0.0',
};
