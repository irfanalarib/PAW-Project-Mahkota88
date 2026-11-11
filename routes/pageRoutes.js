const express = require('express');
const PageController = require('../controllers/pageController');

const router = express.Router();

router.get('/', PageController.home);
router.get('/admin/produk', PageController.adminProduk);

module.exports = router;