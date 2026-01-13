'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full bg-surface-elevated border border-white/10 p-1 flex items-center transition-colors duration-300"
            aria-label="Toggle Theme"
        >
            <motion.div
                className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
                animate={{
                    x: theme === 'dark' ? 0 : 32,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {theme === 'dark' ? (
                    <Moon size={14} className="text-background" />
                ) : (
                    <Sun size={14} className="text-background" />
                )}
            </motion.div>
            <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                <Moon size={12} className={`transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-40 text-muted'}`} />
                <Sun size={12} className={`transition-opacity duration-300 ${theme === 'light' ? 'opacity-0' : 'opacity-40 text-muted'}`} />
            </div>
        </button>
    );
}
