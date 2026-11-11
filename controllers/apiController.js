// Controller API: menerima request, memanggil Model, lalu mengirim JSON.
const config = require('../config');
const ProdukModel = require('../models/produkModel');
const { timestamp } = require('../utils/format');
const { idValid, kirimError } = require('../utils/response');
const { ambilDataProduk } = require('../utils/produkInput');

const idSalah = { status: 'error', pesan: 'ID harus berupa angka bulat positif' };
const tidakAda = { status: 'error', pesan: 'Produk tidak ditemukan' };

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
  async produk(req, res) {
    try {
      res.json(await ProdukModel.getAll());
    } catch (err) {
      kirimError(res, err);
    }
  },

  // GET /api/produk/:id
  async detail(req, res) {
    const id = idValid(req.params.id);
    if (!id) return res.status(400).json(idSalah);

    try {
      const produk = await ProdukModel.getById(id);
      if (!produk) return res.status(404).json(tidakAda);
      return res.json(produk);
    } catch (err) {
      return kirimError(res, err);
    }
  },

  // POST /api/produk
  async tambah(req, res) {
    try {
      const baru = await ProdukModel.create(ambilDataProduk(req.body));
      res.status(201).json({ status: 'sukses', pesan: 'Produk berhasil ditambahkan', data: baru });
    } catch (err) {
      kirimError(res, err);
    }
  },

  // PUT /api/produk/:id
  async ubah(req, res) {
    const id = idValid(req.params.id);
    if (!id) return res.status(400).json(idSalah);

    const data = ambilDataProduk(req.body);
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ status: 'error', pesan: 'Tidak ada data untuk diperbarui' });
    }

    try {
      const produk = await ProdukModel.update(id, data);
      if (!produk) return res.status(404).json(tidakAda);
      return res.json({ status: 'sukses', pesan: 'Produk berhasil diperbarui', data: produk });
    } catch (err) {
      return kirimError(res, err);
    }
  },

  // DELETE /api/produk/:id
  async hapus(req, res) {
    const id = idValid(req.params.id);
    if (!id) return res.status(400).json(idSalah);

    try {
      const dihapus = await ProdukModel.remove(id);
      if (!dihapus) return res.status(404).json(tidakAda);
      return res.json({ status: 'sukses', pesan: 'Produk berhasil dihapus', data: dihapus });
    } catch (err) {
      return kirimError(res, err);
    }
  },
};

module.exports = ApiController;