
import React, { useEffect, useState } from 'react';

export const LocalStorageDebugger = () => {
  const [storageItems, setStorageItems] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const refreshValues = () => {
      const items: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          items[key] = localStorage.getItem(key) || '';
        }
      }
      setStorageItems(items);
    };
    
    refreshValues();
    const intervalId = setInterval(refreshValues, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999, background: '#f0f0f0', padding: '10px', border: '1px solid #ccc', fontSize: '12px', maxWidth: '300px', maxHeight: '200px', overflow: 'auto' }}>
      <h4>LocalStorage Contents:</h4>
      <pre>{JSON.stringify(storageItems, null, 2)}</pre>
    </div>
  );
};

export default LocalStorageDebugger;
