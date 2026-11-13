const express = require('express');
const validateChatInput = require('../middlewares/validateChatInput');
const { chat } = require('../controllers/chat.controller');

const router = express.Router();

// Endpoint publik (dipasang di app.js pada /api/chat): validasi dulu, baru diproses controller
router.post('/', validateChatInput, chat);

module.exports = router;