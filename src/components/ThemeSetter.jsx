import React, { createContext, useContext, useState } from 'react';

const ThemeSetter = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ThemeSetter.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeSetter.Provider>
    );
}

export const useTheme = () => useContext(ThemeSetter);