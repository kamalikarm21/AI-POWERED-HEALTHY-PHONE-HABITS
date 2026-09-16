import { useState, useEffect } from 'react';

/**
 * useLocalStorage – synced localStorage state hook
 */
export function useLocalStorage(key, initialValue) {
  const prefixedKey = 'focusai_' + key;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(prefixedKey, JSON.stringify(storedValue));
    } catch {}
  }, [prefixedKey, storedValue]);

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}
