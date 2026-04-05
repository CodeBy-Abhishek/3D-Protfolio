'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      root.style.setProperty('--page-bg', '#050507');
      root.style.setProperty('--page-text', '#f4f4f5');
      root.style.setProperty('--card-bg', 'rgba(8,12,22,0.7)');
      root.style.setProperty('--card-border', 'rgba(255,255,255,0.055)');
      root.style.setProperty('--section-bg', 'transparent');
      root.style.setProperty('--muted', '#71717a');
      root.style.setProperty('--nav-bg', 'rgba(9,9,11,0.7)');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--page-bg', '#f8fafc');
      root.style.setProperty('--page-text', '#18181b');
      root.style.setProperty('--card-bg', 'rgba(255,255,255,0.8)');
      root.style.setProperty('--card-border', 'rgba(0,0,0,0.08)');
      root.style.setProperty('--section-bg', 'rgba(255,255,255,0.4)');
      root.style.setProperty('--muted', '#52525b');
      root.style.setProperty('--nav-bg', 'rgba(248,250,252,0.7)');
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDark(dark);
    applyTheme(dark);
  }, [applyTheme]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    applyTheme(newIsDark);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all border border-zinc-300 dark:border-white/10"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
