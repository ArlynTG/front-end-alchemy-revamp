
// Service worker for caching assets and improving offline capabilities
const CACHE_NAME = 'tobeys-tutor-cache-v4'; // Increment version to ensure clean update
const PREVIOUS_CACHE_NAME = 'tobeys-tutor-cache-v3'; // Keep track of previous cache for rollback
const BUILD_TIMESTAMP = new Date().toISOString();
const VERSION = '1.2.0'; // For tracking versions

// Assets to cache on install - critical path resources
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  // Add other critical static assets
];

// Additional assets to cache after install
const SECONDARY_ASSETS = [
  // CSS files
  // Font files
  // Common images
];

// Log function for easier debugging and maintenance
const log = (message) => {
  console.log(`[ServiceWorker ${VERSION}] ${message}`);
};

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  log(`Installing new version: ${BUILD_TIMESTAMP}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        log('Caching critical static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        log('Installation complete, waiting to activate');
        return self.skipWaiting(); // Force the waiting service worker to become active
      })
      .catch(error => {
        log(`Installation failed: ${error}`);
        // Still continue to activate, just with incomplete cache
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
  log('Activating new service worker version');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Don't delete the previous cache immediately to allow for rollback
          if (cacheName !== CACHE_NAME && cacheName !== PREVIOUS_CACHE_NAME) {
            log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // After two weeks, clean up the previous cache version
      setTimeout(() => {
        caches.delete(PREVIOUS_CACHE_NAME)
          .then(() => log(`Deleted rollback cache ${PREVIOUS_CACHE_NAME} after delay`));
      }, 14 * 24 * 60 * 60 * 1000);
      
      log('Claiming clients');
      return self.clients.claim(); // Take control of all clients/pages
    })
  );
  
  // After activation, cache secondary assets in the background
  self.clients.matchAll().then(clients => {
    if (clients.length > 0) {
      // Only cache secondary resources if there are active clients
      caches.open(CACHE_NAME).then(cache => {
        cache.addAll(SECONDARY_ASSETS)
          .then(() => log('Background caching of secondary assets complete'))
          .catch(error => log(`Background caching error: ${error}`));
      });
    }
  });
});

// Helper function to determine if request should use cache-first strategy
const shouldUseCacheFirst = (request) => {
  const url = new URL(request.url);
  
  // Static assets should be cache-first
  if (STATIC_ASSETS.some(asset => request.url.endsWith(asset))) {
    return true;
  }
  
  // Cache-first for common file extensions that rarely change
  if (/\.(woff2|png|jpg|jpeg|svg|webp|ico)$/i.test(url.pathname)) {
    return true;
  }
  
  return false;
};

// Helper function to determine if this is an HTML request
const isHtmlRequest = (request) => {
  const url = new URL(request.url);
  return request.mode === 'navigate' || 
         url.pathname.endsWith('.html') || 
         url.pathname === '/' ||
         (request.headers.get('accept') && request.headers.get('accept').includes('text/html'));
};

// Helper function to add cache-busting parameter to a request
const addCacheBustToRequest = (request) => {
  const url = new URL(request.url);
  url.searchParams.set('cache-bust', Date.now().toString());
  return new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    mode: request.mode,
    credentials: request.credentials,
    redirect: request.redirect
  });
};

// Fetch event with improved strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip API calls
  if (event.request.url.includes('/api/')) return;
  
  // Skip third-party requests
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // For HTML requests, use network-first with cache fallback
  if (isHtmlRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response since it can only be consumed once
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Fallback to index.html for SPA routing
              return caches.match('/index.html');
            });
        })
    );
    return;
  }
  
  // Handle JavaScript and CSS with network-first to ensure updates
  if (event.request.url.includes('.js') || event.request.url.includes('.css')) {
    event.respondWith(
      fetch(addCacheBustToRequest(event.request))
        .then(response => {
          // Clone the response since it can only be consumed once
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => {
              // Store the original request URL in cache, not the cache-busted one
              cache.put(event.request, responseToCache);
            });
          }
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For static assets, use cache-first strategy
  if (shouldUseCacheFirst(event.request)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Return cached response immediately
            
            // Refresh cache in the background (stale-while-revalidate pattern)
            fetch(event.request)
              .then(networkResponse => {
                if (networkResponse && networkResponse.ok) {
                  caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse);
                  });
                }
              })
              .catch(() => {
                // Ignore network errors when refreshing cache
              });
              
            return cachedResponse;
          }
          
          // If not in cache, get from network and cache
          return fetch(event.request)
            .then(response => {
              if (!response || !response.ok) {
                return response;
              }
              
              // Cache the new response
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
              
              return response;
            });
        })
    );
    return;
  }
  
  // For other resources, use network-first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache non-success responses
        if (!response || !response.ok) {
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
            if (isHtmlRequest(event.request)) {
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
  if (!event.data) return;
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'VERSION':
      // Allow clients to request the current version
      event.ports[0].postMessage({
        version: VERSION,
        buildTimestamp: BUILD_TIMESTAMP
      });
      break;
    case 'CLEAR_CACHE':
      // Completely clear the cache when requested
      caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
      }).then(() => {
        log('Cache cleared successfully');
        // Notify the client that cache was cleared
        if (event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      });
      break;
    case 'ROLLBACK':
      // Handle rollback request
      log('Rollback requested');
      // Swap cache names for rollback
      const tempCacheName = CACHE_NAME;
      CACHE_NAME = PREVIOUS_CACHE_NAME;
      PREVIOUS_CACHE_NAME = tempCacheName;
      self.skipWaiting();
      break;
    default:
      // Unknown message
      break;
  }
});
