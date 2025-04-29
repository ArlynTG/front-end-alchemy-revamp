
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Use createRoot for React 18's concurrent features
const container = document.getElementById("root");
const root = createRoot(container!);

// Wrap app in HelmetProvider for optimized metadata management
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Register service worker for asset caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
        
        // Check for updates every hour
        setInterval(() => {
          registration.update();
          console.log('Checking for service worker updates');
        }, 60 * 60 * 1000);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('New service worker installing');
          
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content available, refresh to update');
              if (confirm('New content is available. Reload to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  });
  
  // When the page is visible again, check for updates
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg) reg.update();
      });
    }
  });
}

// Add a timestamp to force cache-busting
console.log(`App initialized at: ${new Date().toISOString()}, Build: ${import.meta.env.VITE_BUILD_TIMESTAMP || 'development'}`);
