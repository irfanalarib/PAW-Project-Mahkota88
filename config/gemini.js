// Konfigurasi integrasi Google Gemini.
// API key HANYA dibaca dari .env di server, tidak pernah dikirim ke browser.
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('[Gemini] GEMINI_API_KEY belum diisi di .env, chat memakai mode mock (data katalog saja).');
}

// Client Gemini dibuat di sini. Bernilai null bila key kosong, agar server tetap bisa berjalan.
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Nama model utama (cek daftar model yang tersedia di Google AI Studio)
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

module.exports = {
  genAI,
  MODEL_NAME,

  apiKey,
  fallbackModel: process.env.GEMINI_FALLBACK_MODEL || '', // model cadangan (opsional)
  // Mode mock: jawaban dari data produk tanpa memanggil Gemini (untuk uji alur)
  useMock: process.env.GEMINI_MOCK === 'true' || !apiKey,
  // Jika semua percobaan Gemini gagal sementara (sibuk/timeout), jawab dari data katalog
  fallbackToMock: process.env.GEMINI_FALLBACK_MOCK !== 'false',

  maxMessageLength: 500, // batas panjang pesan pengguna (karakter)
  maxReplyLength: 2000, // batas panjang jawaban yang dikirim ke frontend
  maxProducts: 100, // batas produk yang dikirim sebagai konteks

  timeoutMs: 12000, // batas waktu per percobaan
  maxRetries: 2, // percobaan per model bila Gemini sibuk

  temperature: 0.3, // rendah agar jawaban konsisten dan tidak mengarang
  maxOutputTokens: 2048,
};