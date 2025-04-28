
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

// Register service worker for asset caching if supported
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.error('Service worker registration failed:', error);
    });
  });
}
