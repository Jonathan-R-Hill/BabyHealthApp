import React,  { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadThemePreference = async () => {
          try {
            const storedPreference = await SecureStore.getItemAsync('darkModeEnabled');
            if (storedPreference !== null) {
              setIsDarkMode(storedPreference === 'true');
            }
          } catch (error) {
            console.error('Error loading theme preference:', error);
          }
        };

        loadThemePreference();
    }, []);

    const toggleTheme = async() => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        try {
            await SecureStore.setItemAsync('darkModeEnabled', JSON.stringify(newTheme));
        } catch (error) {
            console.error('Error saving theme preference: ',error);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export  const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}