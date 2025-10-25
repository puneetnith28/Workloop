import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      // Default to dark on first opening when no stored value
      return stored ?? 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    const apply = (t: Theme) => {
      const root = document.documentElement;
      if (t === 'dark') {
        root.classList.add('dark');
      } else if (t === 'light') {
        root.classList.remove('dark');
      } else {
        // system
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) root.classList.add('dark');
        else root.classList.remove('dark');
      }
    };

    apply(theme);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => apply('system');
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const setDark = () => setTheme('dark');
  const setLight = () => setTheme('light');
  const setSystem = () => setTheme('system');

  return { theme, setTheme, setDark, setLight, setSystem } as const;
}

export default useTheme;
