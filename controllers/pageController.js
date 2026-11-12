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

      // Daerah asal kopi (maksimal 3 daerah berbeda) untuk bagian "Discover Our Origin".
      const asalKopi = [];
      produk.forEach((p) => {
        if (p.asal && asalKopi.length < 3 && !asalKopi.some((a) => a.daerah === p.asal)) {
          asalKopi.push({ daerah: p.asal, nama: p.nama });
        }
      });

      res.render('index', {
        title: 'Home',
        produk,
        totalTersedia,
        totalProduk: produk.length,
        asalKopi,
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