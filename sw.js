// Service worker: menyimpan aplikasi agar bisa dibuka cepat dan tetap jalan saat sinyal lemah.
// Ubah nama CACHE (misal kpu-cover-v2) setiap kali template atau aset berubah.
const CACHE = 'kpu-cover-v3';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './logo-kpu.png',
  './Template%20Sampul.png',
  './Template%20Dokumentasi.png',
  './Template%20Story.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null))))  // satu file hilang tidak menggagalkan pemasangan
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Font dan layanan Gemini langsung ke jaringan
  if (url.origin !== self.location.origin) return;

  // Halaman utama: jaringan dulu, cadangan dari cache jika offline
  if (req.mode === 'navigate' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html', { ignoreSearch: true }))
    );
    return;
  }

  // Aset lain: dari cache dulu
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }))
  );
});
