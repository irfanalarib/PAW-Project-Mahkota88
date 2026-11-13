// Controller chat: menerima request, memanggil service, lalu mengirim response.
const { askGemini } = require('../services/gemini.service');
const { sendResponse } = require('../utils/response');

async function chat(req, res) {
  try {
    const reply = await askGemini(req.body.message);
    return sendResponse(res, { message: 'Berhasil dapat balasan', data: { reply } });
  } catch (err) {
    const dikenal = err && err.name === 'ChatError';
    if (!dikenal) console.error('[Chat] Error tak terduga:', err);
    return sendResponse(res, {
      code: dikenal ? err.status : 500,
      success: false,
      message: dikenal ? err.message : 'Gagal menghubungi AI, coba lagi nanti',
    });
  }
}

module.exports = { chat };