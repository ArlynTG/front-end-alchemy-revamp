
// Service worker for caching assets and improving offline capabilities
const CACHE_NAME = 'tobeys-tutor-cache-v2';
const BUILD_TIMESTAMP = new Date().toISOString();

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing new version:', BUILD_TIMESTAMP);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating new version');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip API calls
  if (event.request.url.includes('/api/')) return;
  
  // Handle JavaScript module imports differently to avoid caching issues
  if (event.request.url.includes('.js') && 
      (event.request.destination === 'script' || 
       event.request.mode === 'cors')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For other assets, try network first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache non-success responses
        if (!response || response.status !== 200) {
          return response;
        }
        
        // Clone the response since it can only be consumed once
        const responseToCache = response.clone();
        
        // Add new responses to cache
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Fallback for HTML pages
            if (event.request.url.indexOf('.html') > -1 || 
                event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
