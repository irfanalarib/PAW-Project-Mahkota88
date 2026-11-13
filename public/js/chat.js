// Frontend chat Asisten AI: mengirim pertanyaan ke POST /api/chat memakai Fetch API.
(function () {
  var toggle = document.getElementById('chat-toggle');
  var panel = document.getElementById('chat-panel');
  var tutup = document.getElementById('chat-close');
  var log = document.getElementById('chat-log');
  var form = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');
  var kirim = document.getElementById('chat-kirim');
  var saran = document.getElementById('chat-saran');
  if (!toggle || !panel || !log || !form || !input || !kirim || !saran) return;

  var sedangKirim = false;

  var KELAS = {
    user: 'ml-auto max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-sage px-3 py-2 text-ivory',
    ai: 'mr-auto max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm bg-ivory px-3 py-2 shadow-sm ring-1 ring-brown/10',
    error: 'mr-auto max-w-[85%] break-words rounded-2xl rounded-bl-sm bg-red-50 px-3 py-2 text-red-700 ring-1 ring-red-200',
  };

  // Teks dimasukkan lewat textContent (bukan innerHTML) agar aman dari XSS
  function tambahPesan(teks, jenis) {
    var el = document.createElement('div');
    el.className = KELAS[jenis];
    el.textContent = teks;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  // Indikator loading: tiga titik yang melompat
  function tampilLoading() {
    var el = document.createElement('div');
    el.className = KELAS.ai + ' flex items-center gap-1';
    el.setAttribute('aria-label', 'Asisten sedang mengetik');
    for (var i = 0; i < 3; i++) {
      var titik = document.createElement('span');
      titik.className = 'inline-block h-2 w-2 animate-bounce rounded-full bg-sage';
      titik.style.animationDelay = i * 0.15 + 's';
      el.appendChild(titik);
    }
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function atur(terbuka) {
    panel.classList.toggle('hidden', !terbuka);
    panel.classList.toggle('flex', terbuka);
    toggle.setAttribute('aria-expanded', String(terbuka));
    if (terbuka) input.focus();
  }

  async function kirimPesan(teks) {
    teks = (teks || '').trim();
    if (!teks || sedangKirim) return;

    sedangKirim = true;
    kirim.disabled = true;
    input.disabled = true;
    saran.classList.add('hidden');
    tambahPesan(teks, 'user');
    input.value = '';
    var loading = tampilLoading();

    // Batas 60 detik karena backend dapat mencoba ulang beberapa kali bila Gemini sibuk
    var ctrl = new AbortController();
    var batas = setTimeout(function () { ctrl.abort(); }, 60000);

    try {
      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: teks }),
        signal: ctrl.signal,
      });
      var data = await res.json().catch(function () { return null; });

      loading.remove();
      if (res.ok && data && data.success && data.data && data.data.reply) {
        tambahPesan(data.data.reply, 'ai');
      } else {
        tambahPesan((data && data.message) || 'Terjadi kesalahan. Silakan coba lagi.', 'error');
      }
    } catch (err) {
      loading.remove();
      tambahPesan(
        err && err.name === 'AbortError'
          ? 'Permintaan terlalu lama. Silakan coba lagi.'
          : 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        'error'
      );
    } finally {
      clearTimeout(batas);
      sedangKirim = false;
      kirim.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  toggle.addEventListener('click', function () { atur(panel.classList.contains('hidden')); });
  tutup.addEventListener('click', function () { atur(false); toggle.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.classList.contains('hidden')) atur(false);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); kirimPesan(input.value); });
  saran.addEventListener('click', function (e) {
    var tombol = e.target.closest('[data-saran]');
    if (tombol) kirimPesan(tombol.dataset.saran);
  });

  tambahPesan('Halo! Saya Asisten Mahkota. Ada yang ingin Anda ketahui tentang kopi kami?', 'ai');
})();