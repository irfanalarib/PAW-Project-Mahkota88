require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

(async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const daftar = [process.env.GEMINI_MODEL, process.env.GEMINI_FALLBACK_MODEL].filter(Boolean);

  for (const nama of daftar) {
    try {
      const model = genAI.getGenerativeModel({ model: nama });
      const mulai = Date.now();
      const hasil = await model.generateContent('Balas dengan satu kata: halo');
      console.log(`OK    ${nama} (${Date.now() - mulai} ms): ${hasil.response.text().trim()}`);
    } catch (e) {
      console.log(`GAGAL ${nama}: status=${e.status} | ${e.message}`);
    }
  }
})();