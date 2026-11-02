const express = require('express');
const ApiController = require('../controllers/apiController');

const router = express.Router();

router.get('/status', ApiController.status);
router.get('/produk', ApiController.produk);

module.exports = router;
