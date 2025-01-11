import React from 'react';
import { useTheme } from './ThemeSetter.jsx';

function ThemeToggle() {
    const { darkMode, setDarkMode } = useTheme();

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
            {darkMode ? '🌞' : '🌙'}
        </button>
    );
}

export default ThemeToggle;