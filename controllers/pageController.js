// Controller halaman: menyiapkan data dari model lalu merender view EJS.
const ProdukModel = require('../models/produkModel');

const PageController = {
  home(req, res) {
    res.render('index', {
      title: 'Beranda',
      produk: ProdukModel.getAll(),
      totalTersedia: ProdukModel.countTersedia(),
    });
  },
};

module.exports = PageController;
