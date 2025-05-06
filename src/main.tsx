
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

// Register service worker for asset caching with improved error handling and rollback capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/sw.js';
    
    // Track the current service worker for potential rollback
    let currentSW: ServiceWorker | null = null;
    
    // Function to check for service worker updates
    const checkForUpdates = (registration: ServiceWorkerRegistration) => {
      registration.update()
        .then(() => {
          console.log('Checked for service worker updates');
        })
        .catch(error => {
          console.warn('Service worker update check failed:', error);
        });
    };
    
    // Register the service worker
    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
        
        // Store reference to current service worker
        currentSW = registration.active;
        
        // Check for updates every hour
        setInterval(() => {
          checkForUpdates(registration);
        }, 60 * 60 * 1000);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('New service worker installing');
          
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content available, refresh to update');
              
              const updateNotification = document.createElement('div');
              updateNotification.style.position = 'fixed';
              updateNotification.style.bottom = '20px';
              updateNotification.style.right = '20px';
              updateNotification.style.backgroundColor = '#4CAF50';
              updateNotification.style.color = 'white';
              updateNotification.style.padding = '15px';
              updateNotification.style.borderRadius = '5px';
              updateNotification.style.zIndex = '9999';
              updateNotification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
              updateNotification.innerHTML = `
                New content is available! 
                <button id="update-btn" style="background: white; color: #4CAF50; border: none; margin-left: 10px; padding: 5px 10px; cursor: pointer; border-radius: 3px;">
                  Update Now
                </button>
              `;
              
              document.body.appendChild(updateNotification);
              
              document.getElementById('update-btn')?.addEventListener('click', () => {
                window.location.reload();
              });
            }
          });
        });
        
        // Add rollback capability
        window.rollbackServiceWorker = () => {
          if (registration.active) {
            // Send rollback message to SW
            navigator.serviceWorker.controller?.postMessage({
              type: 'ROLLBACK'
            });
            
            // Reload the page to apply rollback
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            
            return true;
          }
          return false;
        };
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
  
  // Add service worker status check to window object for debugging
  window.checkServiceWorkerStatus = () => {
    return navigator.serviceWorker.getRegistration()
      .then(registration => {
        if (!registration) {
          return { status: 'not-registered' };
        }
        
        return {
          status: 'registered',
          scope: registration.scope,
          active: !!registration.active,
          installing: !!registration.installing,
          waiting: !!registration.waiting
        };
      });
  };
}

// Add a timestamp to force cache-busting
console.log(`App initialized at: ${new Date().toISOString()}, Build: ${import.meta.env.VITE_BUILD_TIMESTAMP || 'development'}`);

// Add TypeScript interface for window object
declare global {
  interface Window {
    rollbackServiceWorker: () => boolean;
    checkServiceWorkerStatus: () => Promise<any>;
  }
}
