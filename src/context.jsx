import { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme');

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === 'true';
};

//hook for context
export const useGlobalContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchValue, setSearchValue] = useState('dog');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  //toggle dark theme when isDarkTheme changes
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, searchValue, setSearchValue, toggleDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};
