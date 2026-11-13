
const express = require('express');

const ApiController = require('../controllers/apiController');
const chatRoutes = require('./chat.routes');

const router = express.Router();

// Status aplikasi
router.get('/status', ApiController.status);

// CRUD produk yang sudah ada
router.get('/produk', ApiController.produk);
router.get('/produk/:id', ApiController.detail);
router.post('/produk', ApiController.tambah);
router.put('/produk/:id', ApiController.ubah);
router.delete('/produk/:id', ApiController.hapus);

// Integrasi AI Chat Assistant
router.use('/chat', chatRoutes);

module.exports = router;