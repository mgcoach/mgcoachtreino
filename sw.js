// TRAIN.FUEL - Service Worker v1.4.0
const CACHE_NAME = 'trainfuel-v1-4-0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-152.png',
  './icon-167.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './favicon.png',
  // CDNs externos
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// Install — cacheia recursos críticos
self.addEventListener('install', event => {
  console.log('[TrainFuel SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[TrainFuel SW] Cacheando assets');
        // Cache individual com fallback (não falha se 1 url externa falhar)
        return Promise.all(
          ASSETS.map(url => 
            cache.add(url).catch(err => console.warn('[SW] Falhou ao cachear:', url, err))
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate — limpa caches antigos
self.addEventListener('activate', event => {
  console.log('[TrainFuel SW] Ativando...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[TrainFuel SW] Removendo cache antigo:', k);
          return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch — estratégia cache-first com fallback de rede
self.addEventListener('fetch', event => {
  // Só GET
  if (event.request.method !== 'GET') return;
  
  // Imagens dos exercícios (GitHub Raw): network-first com cache de fallback
  if (event.request.url.includes('raw.githubusercontent.com/yuhonas')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cacheia se sucesso
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Outros: cache-first
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Cacheia respostas válidas
          if (response.ok && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
      .catch(() => {
        // Fallback offline
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});
