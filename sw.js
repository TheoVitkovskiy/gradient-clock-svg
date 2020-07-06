const cacheName = 'fruit-timer-v1';
const staticAssets = [
  './',
  './index.html',
  './style.css',
  './js/index.js',
  './js/config.js',
  './js/helpers.js',
  './js/fruit.js',
  './vendor/url-search-params-polyfill.js',
  './sounds/Tea-bell-sound-effect.mp3',
  './fonts/Lato-Bold.ttf',
  './fonts/Lato-Thin.ttf',
  './fonts/Lato-Black.ttf',
  './fonts/Lato-Light.ttf',
  './img/break.svg',
  './img/containerBckgrApples.svg',
  './img/containerBckgrFlies.svg',
  './img/containerBckgrAnim.svg',
  './img/containerBckgApplesPoly.svg',
  './img/return_key.svg',
  './img/faviconGreen144x144.png'
];
async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}
self.addEventListener('install', async (e) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
})

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  }
}) 
