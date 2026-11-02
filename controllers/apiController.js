// Controller API: mengirim response dalam format JSON.
const config = require('../config');
const ProdukModel = require('../models/produkModel');
const { timestamp } = require('../utils/format');

const ApiController = {
  // GET /api/status
  status(req, res) {
    res.json({
      status: 'aktif',
      aplikasi: config.appName,
      versi: config.version,
      lingkungan: config.env,
      uptimeDetik: Math.round(process.uptime()),
      waktu: timestamp(),
    });
  },

  // GET /api/produk
  produk(req, res) {
    res.json(ProdukModel.getAll());
  },
};

module.exports = ApiController;
