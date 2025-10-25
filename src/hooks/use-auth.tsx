import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('isAuthenticated') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Keep localStorage in sync and notify other windows/components
  useEffect(() => {
    try {
      localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
      // Notify same-window listeners
      window.dispatchEvent(new Event('auth-changed'));
    } catch (e) {
      // ignore
    }
  }, [isAuthenticated]);

  // Listen for storage changes (other tabs) and custom auth-changed events (same tab)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'isAuthenticated') {
        setIsAuthenticated(e.newValue === 'true');
      }
    };

    const onAuthChanged = () => {
      try {
        setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
      } catch (e) {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('auth-changed', onAuthChanged);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('auth-changed', onAuthChanged);
    };
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, login, logout, setIsAuthenticated } as const;
}

export default useAuth;
