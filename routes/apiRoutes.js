const express = require('express');
const ApiController = require('../controllers/apiController');

const router = express.Router();

router.get('/status', ApiController.status);

// CRUD produk
router.get('/produk', ApiController.produk);
router.get('/produk/:id', ApiController.detail);
router.post('/produk', ApiController.tambah);
router.put('/produk/:id', ApiController.ubah);
router.delete('/produk/:id', ApiController.hapus);

module.exports = router;