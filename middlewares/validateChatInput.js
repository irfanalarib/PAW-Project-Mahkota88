// Middleware validasi input chat: tipe, kosong, panjang, dan pola prompt injection.
// Ini lapisan pertahanan di kode backend (defense in depth), terpisah dari System Instruction.
const { maxMessageLength } = require('../config/gemini');
const { sendResponse } = require('../utils/response');

// Pola umum upaya mengubah peran/aturan AI (Indonesia + Inggris)
const POLA_INJECTION = [
  /(abaikan|lupakan|hiraukan|kesampingkan|acuhkan|lewati)\s+(semua\s+|seluruh\s+)?(instruksi|perintah|aturan|petunjuk|arahan)/i,
  /ignore\s+(all\s+|any\s+|the\s+)?(previous|prior|above|earlier|your)\s+(instructions?|prompts?|rules?)/i,
  /disregard\s+.*(instructions?|rules?|prompt)/i,
  /(system|developer)\s*(prompt|instruction|message)/i,
  /(instruksi|prompt)\s+(sistem|awal|rahasia)/i,
  /(tampilkan|ungkapkan|bocorkan|tunjukkan|sebutkan|reveal|show|print|repeat)\s+.*(prompt|instruksi|instruction|api\s*key|kunci\s*api)/i,
  /(berperanlah|bertindaklah|berpura-pura|pura-pura|act\s+as|pretend\s+(to\s+be|you)|role-?play)/i,
  /(ubah|ganti)\s+(peran|aturan|instruksi)\s+(kamu|anda|mu)/i,
  /\b(jailbreak|dan\s+mode|developer\s+mode)\b/i,
  /<\/?\s*pesan_pengguna\s*>/i, // mencoba menutup pembungkus pesan di prompt
];

function validateChatInput(req, res, next) {
  const { message } = req.body || {};

  if (typeof message !== 'string') {
    return sendResponse(res, { code: 400, success: false, message: 'Pesan wajib berupa teks.' });
  }

  // Bersihkan karakter kontrol dan rapikan spasi
  const bersih = message
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (bersih.length === 0) {
    return sendResponse(res, { code: 400, success: false, message: 'Pesan tidak boleh kosong.' });
  }

  if (bersih.length > maxMessageLength) {
    return sendResponse(res, {
      code: 400,
      success: false,
      message: `Pesan terlalu panjang. Maksimal ${maxMessageLength} karakter.`,
    });
  }

  if (POLA_INJECTION.some((pola) => pola.test(bersih))) {
    return sendResponse(res, {
      code: 400,
      success: false,
      message:
        'Maaf, permintaan tersebut tidak dapat diproses. Silakan tanyakan seputar produk Kopi Mahkota 88.',
    });
  }

  req.body.message = bersih; // teruskan versi yang sudah bersih
  return next();
}

module.exports = validateChatInput;