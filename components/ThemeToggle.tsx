'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true); // Default to dark mainly for this aesthetic
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
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
