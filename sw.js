/* Service worker: simpan aplikasi untuk main tanpa internet */
const VERSION = 'cmq-v1.1.1';
const APP = [
  './', './index.html', './manifest.webmanifest', './css/style.css',
  './js/data.js', './js/papers.js', './js/sound.js', './js/avatar.js', './js/world.js', './js/quiz.js', './js/app.js',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png',
];
const FONT_CACHE = 'cmq-fonts';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Fon Google: simpan selepas kali pertama dimuat
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Fail aplikasi: cache dahulu, kemas kini di latar belakang
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const r = await net; if (r) return r;
    if (req.mode === 'navigate') return c.match('./index.html');
    return new Response('', { status: 504 });
  }));
});
