// TRAIN.FUEL — Service Worker v2.10.5
// Migração base64 → arquivos: pré-cache AGRESSIVO dos 50 GIFs no primeiro load
// pra manter UX idêntica ao base64 (zero buffering em rede ruim).

const CACHE_NAME = 'trainfuel-v2-10-5';

// Shell da aplicação (carregado on demand, mas cacheado também)
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json'
];

// 50 GIFs de exercícios — pré-cacheados em background no primeiro load
const GIFS = Array.from({ length: 50 }, (_, i) => {
  const n = String(i + 1).padStart(3, '0');
  return `./gifs/exercicio-${n}.gif`;
});

// ============ INSTALL ============
// Cacheia o shell SINCRONAMENTE (rápido — KB).
// Os GIFs são baixados em background, sem bloquear o waitUntil.
self.addEventListener('install', (event) => {
  console.log('[SW v2.10.5] install — cacheando shell');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ============ ACTIVATE ============
// Limpa caches antigos e dispara pré-cache dos GIFs em background.
self.addEventListener('activate', (event) => {
  console.log('[SW v2.10.5] activate — limpando caches antigos');
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names
        .filter(n => n !== CACHE_NAME)
        .map(n => {
          console.log('[SW] removendo cache antigo:', n);
          return caches.delete(n);
        })
    )).then(() => self.clients.claim())
     .then(() => precacheGifsInBackground())
  );
});

// ============ PRÉ-CACHE AGRESSIVO DOS GIFS ============
// Roda em background, não bloqueia ativação.
// Baixa em chunks de 6 pra não saturar a conexão.
async function precacheGifsInBackground() {
  try {
    const cache = await caches.open(CACHE_NAME);
    console.log(`[SW v2.10.5] iniciando pré-cache de ${GIFS.length} GIFs em background`);
    
    const CHUNK_SIZE = 6;
    let done = 0;
    
    for (let i = 0; i < GIFS.length; i += CHUNK_SIZE) {
      const chunk = GIFS.slice(i, i + CHUNK_SIZE);
      await Promise.all(chunk.map(async (url) => {
        try {
          const cached = await cache.match(url);
          if (cached) { done++; return; }
          const resp = await fetch(url, { cache: 'no-cache' });
          if (resp.ok) {
            await cache.put(url, resp);
            done++;
          }
        } catch (err) {
          console.warn('[SW] falha ao cachear', url, err.message);
        }
      }));
    }
    
    console.log(`[SW v2.10.5] pré-cache concluído: ${done}/${GIFS.length} GIFs`);
  } catch (err) {
    console.error('[SW] erro no pré-cache:', err);
  }
}

// ============ FETCH ============
// Estratégia:
//  - GIFs (/gifs/*): cache-first (depois de pré-cache, sempre instantâneo)
//  - Resto (HTML/JSON/etc): network-first com fallback pra cache
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Só intercepta same-origin (não toca em chamadas pro free-exercise-db etc)
  if (url.origin !== self.location.origin) return;
  
  // GIFs: cache-first
  if (url.pathname.includes('/gifs/') && url.pathname.endsWith('.gif')) {
    event.respondWith(cacheFirst(event.request));
    return;
  }
  
  // Resto: network-first
  event.respondWith(networkFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const resp = await fetch(request);
    if (resp.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, resp.clone());
    }
    return resp;
  } catch (err) {
    // Sem rede e sem cache — devolve 404
    return new Response('GIF não disponível offline', { status: 404 });
  }
}

async function networkFirst(request) {
  try {
    const resp = await fetch(request);
    if (resp.ok && request.method === 'GET') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, resp.clone());
    }
    return resp;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw err;
  }
}
