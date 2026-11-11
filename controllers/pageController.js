// Controller halaman: mengambil data dari Model lalu merender view EJS.
const ProdukModel = require('../models/produkModel');

const PageController = {
  // GET /
  async home(req, res, next) {
    try {
      const [produk, totalTersedia] = await Promise.all([
        ProdukModel.getAll(),
        ProdukModel.countTersedia(),
      ]);

      res.render('index', {
        title: 'Beranda',
        produk,
        totalTersedia,
        totalProduk: produk.length,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/produk
  async adminProduk(req, res, next) {
    try {
      res.render('admin/produk', {
        title: 'Kelola Katalog',
        produk: await ProdukModel.getAll(),
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = PageController;