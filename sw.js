
// Service worker for caching assets and improving offline capabilities
// Configuration
const CONFIG = {
  CACHE_NAME: 'tobeys-tutor-cache-v4', 
  PREVIOUS_CACHE_NAME: 'tobeys-tutor-cache-v3',
  BUILD_TIMESTAMP: new Date().toISOString(),
  VERSION: '1.2.0',
};

// Assets module
const ASSETS = {
  // Critical assets to cache on install
  STATIC: [
    '/',
    '/index.html',
    '/favicon.ico',
    // Add other critical static assets
  ],
  
  // Additional assets to cache after install
  SECONDARY: [
    // CSS files
    // Font files
    // Common images
  ]
};

// Logger module for easier debugging
const Logger = {
  log: (message) => {
    console.log(`[ServiceWorker ${CONFIG.VERSION}] ${message}`);
  }
};

// Cache operations module
const CacheUtils = {
  // Store assets in cache
  cacheAssets: async (cacheName, assets) => {
    try {
      const cache = await caches.open(cacheName);
      Logger.log(`Caching ${assets.length} assets to ${cacheName}`);
      return cache.addAll(assets);
    } catch (error) {
      Logger.log(`Failed to cache assets: ${error}`);
      throw error;
    }
  },
  
  // Clean up old caches
  deleteOldCaches: async () => {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map((cacheName) => {
        // Don't delete the current or previous cache immediately to allow for rollback
        if (cacheName !== CONFIG.CACHE_NAME && cacheName !== CONFIG.PREVIOUS_CACHE_NAME) {
          Logger.log(`Deleting old cache: ${cacheName}`);
          return caches.delete(cacheName);
        }
      })
    );
  },
  
  // Remove previous cache after delay (for potential rollback)
  schedulePreviousCacheCleanup: () => {
    // After two weeks, clean up the previous cache version
    setTimeout(() => {
      caches.delete(CONFIG.PREVIOUS_CACHE_NAME)
        .then(() => Logger.log(`Deleted rollback cache ${CONFIG.PREVIOUS_CACHE_NAME} after delay`));
    }, 14 * 24 * 60 * 60 * 1000);
  }
};

// Request handling module
const RequestUtils = {
  // Determine if request should use cache-first strategy
  shouldUseCacheFirst: (request) => {
    const url = new URL(request.url);
    
    // Static assets should be cache-first
    if (ASSETS.STATIC.some(asset => request.url.endsWith(asset))) {
      return true;
    }
    
    // Cache-first for common file extensions that rarely change
    if (/\.(woff2|png|jpg|jpeg|svg|webp|ico)$/i.test(url.pathname)) {
      return true;
    }
    
    return false;
  },
  
  // Check if request is for HTML content
  isHtmlRequest: (request) => {
    const url = new URL(request.url);
    return request.mode === 'navigate' || 
           url.pathname.endsWith('.html') || 
           url.pathname === '/' ||
           (request.headers.get('accept') && request.headers.get('accept').includes('text/html'));
  },
  
  // Add cache-busting parameter to a request
  addCacheBustToRequest: (request) => {
    const url = new URL(request.url);
    url.searchParams.set('cache-bust', Date.now().toString());
    return new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect
    });
  },
  
  // Check if we should handle this request
  shouldHandleRequest: (request) => {
    // Skip non-GET requests
    if (request.method !== 'GET') return false;
    
    // Skip API calls
    if (request.url.includes('/api/')) return false;
    
    // Skip third-party requests
    const url = new URL(request.url);
    if (url.origin !== location.origin) return false;
    
    return true;
  }
};

// Fetch strategies module
const FetchStrategies = {
  // Network-first with cache fallback strategy
  networkFirst: async (request) => {
    try {
      const response = await fetch(request);
      
      // Only cache successful responses
      if (response.ok) {
        const responseToCache = response.clone();
        const cache = await caches.open(CONFIG.CACHE_NAME);
        cache.put(request, responseToCache);
      }
      
      return response;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Fallback to index.html for SPA routing if it's an HTML request
      if (RequestUtils.isHtmlRequest(request)) {
        return caches.match('/index.html');
      }
      
      return new Response('Network error occurred', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
  
  // Cache-first with background refresh strategy (stale-while-revalidate)
  cacheFirst: async (request) => {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Return cached response immediately
      
      // Refresh cache in the background (stale-while-revalidate pattern)
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            caches.open(CONFIG.CACHE_NAME).then(cache => {
              cache.put(request, networkResponse);
            });
          }
        })
        .catch(() => {
          // Ignore network errors when refreshing cache
        });
        
      return cachedResponse;
    }
    
    // If not in cache, get from network and cache
    try {
      const response = await fetch(request);
      if (!response || !response.ok) {
        return response;
      }
      
      // Cache the new response
      const responseToCache = response.clone();
      const cache = await caches.open(CONFIG.CACHE_NAME);
      cache.put(request, responseToCache);
      
      return response;
    } catch (error) {
      return new Response('Network error occurred', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
  
  // Network-first with cache-busting for JS and CSS
  networkFirstWithCacheBusting: async (request) => {
    try {
      const bustRequest = RequestUtils.addCacheBustToRequest(request);
      const response = await fetch(bustRequest);
      
      // Only cache successful responses
      if (response.ok) {
        const responseToCache = response.clone();
        const cache = await caches.open(CONFIG.CACHE_NAME);
        // Store the original request URL in cache, not the cache-busted one
        cache.put(request, responseToCache);
      }
      
      return response;
    } catch (error) {
      return caches.match(request);
    }
  }
};

// Event handlers
const EventHandlers = {
  // Install event handler
  handleInstall: async (event) => {
    Logger.log(`Installing new version: ${CONFIG.BUILD_TIMESTAMP}`);
    try {
      await CacheUtils.cacheAssets(CONFIG.CACHE_NAME, ASSETS.STATIC);
      Logger.log('Installation complete, waiting to activate');
      return self.skipWaiting(); // Force the waiting service worker to become active
    } catch (error) {
      Logger.log(`Installation failed: ${error}`);
      // Still continue to activate, just with incomplete cache
      return self.skipWaiting();
    }
  },
  
  // Activate event handler
  handleActivate: async (event) => {
    Logger.log('Activating new service worker version');
    
    await CacheUtils.deleteOldCaches();
    CacheUtils.schedulePreviousCacheCleanup();
    
    Logger.log('Claiming clients');
    await self.clients.claim(); // Take control of all clients/pages
    
    // After activation, cache secondary assets in the background
    const clients = await self.clients.matchAll();
    if (clients.length > 0) {
      // Only cache secondary resources if there are active clients
      CacheUtils.cacheAssets(CONFIG.CACHE_NAME, ASSETS.SECONDARY)
        .then(() => Logger.log('Background caching of secondary assets complete'))
        .catch(error => Logger.log(`Background caching error: ${error}`));
    }
  },
  
  // Fetch event handler
  handleFetch: async (event) => {
    const request = event.request;
    
    // Skip if we shouldn't handle this request
    if (!RequestUtils.shouldHandleRequest(request)) return;
    
    // For HTML requests, use network-first with cache fallback
    if (RequestUtils.isHtmlRequest(request)) {
      event.respondWith(FetchStrategies.networkFirst(request));
      return;
    }
    
    // Handle JavaScript and CSS with network-first with cache-busting
    if (request.url.includes('.js') || request.url.includes('.css')) {
      event.respondWith(FetchStrategies.networkFirstWithCacheBusting(request));
      return;
    }
    
    // For static assets, use cache-first strategy
    if (RequestUtils.shouldUseCacheFirst(request)) {
      event.respondWith(FetchStrategies.cacheFirst(request));
      return;
    }
    
    // For other resources, use network-first with cache fallback
    event.respondWith(FetchStrategies.networkFirst(request));
  },
  
  // Message event handler
  handleMessage: async (event) => {
    if (!event.data) return;
    
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'VERSION':
        // Allow clients to request the current version
        event.ports[0].postMessage({
          version: CONFIG.VERSION,
          buildTimestamp: CONFIG.BUILD_TIMESTAMP
        });
        break;
      case 'CLEAR_CACHE':
        // Completely clear the cache when requested
        try {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
          Logger.log('Cache cleared successfully');
          // Notify the client that cache was cleared
          if (event.ports[0]) {
            event.ports[0].postMessage({ success: true });
          }
        } catch (error) {
          Logger.log(`Failed to clear cache: ${error}`);
        }
        break;
      case 'ROLLBACK':
        // Handle rollback request
        Logger.log('Rollback requested');
        // Swap cache names for rollback
        const tempCacheName = CONFIG.CACHE_NAME;
        CONFIG.CACHE_NAME = CONFIG.PREVIOUS_CACHE_NAME;
        CONFIG.PREVIOUS_CACHE_NAME = tempCacheName;
        self.skipWaiting();
        break;
      default:
        // Unknown message
        break;
    }
  }
};

// Register event listeners
self.addEventListener('install', event => {
  event.waitUntil(EventHandlers.handleInstall(event));
});

self.addEventListener('activate', event => {
  event.waitUntil(EventHandlers.handleActivate(event));
});

self.addEventListener('fetch', event => {
  EventHandlers.handleFetch(event);
});

self.addEventListener('message', event => {
  event.waitUntil(EventHandlers.handleMessage(event));
});
