// Service Worker - URLを変えずに最新版反映しやすくする
const CACHE_NAME = 'puni-adventure-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/images/desert-stage3-bg.png',
  './assets/images/boss-tretton.png',
  './assets/images/boss-arena-bg.png',
  // プニ用（voice/ 直下）— 差し替え後にオフラインでも取り込めるよう明示
  './assets/audio/voice/jump.wav',
  './assets/audio/voice/star.wav',
  './assets/audio/voice/life-up.wav',
  './assets/audio/voice/enemy-hit.wav',
  './assets/audio/voice/fall.wav',
  './assets/audio/voice/enemy-defeat.wav',
  './assets/audio/voice/clear.wav',
  './assets/audio/voice/puni/attack.wav',
  './assets/audio/voice/lunamon/jump.wav',
  './assets/audio/voice/lunamon/star.wav',
  './assets/audio/voice/lunamon/life-up.wav',
  './assets/audio/voice/lunamon/enemy-hit.wav',
  './assets/audio/voice/lunamon/fall.wav',
  './assets/audio/voice/lunamon/enemy-defeat.wav',
  './assets/audio/voice/lunamon/clear.wav',
  './assets/audio/voice/lunamon/attack.wav',
  './assets/audio/bgm/README.txt',
  './assets/audio/bgm/boss.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate' || request.destination === 'document';
  const isHtml = request.headers.get('accept')?.includes('text/html');

  // HTMLは常に network-first にして古い画面を出しにくくする
  if (isNavigation || isHtml) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // 静的アセットは cache-first + background refresh
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return networkResponse;
        })
        .catch(() => null);

      return cached || networkFetch;
    })
  );
});
