const CACHE='flightways-dp-v1.3';
const ASSETS=[
  './',
  './index.html',
  './manifest.webmanifest',
  './flightways-columbus-logo.png',
  './dp-icon-192.png',
  './dp-icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
