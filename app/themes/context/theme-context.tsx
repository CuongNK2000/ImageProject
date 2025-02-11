import React, {useState, useMemo, useEffect} from 'react';
import ThemeDefault from '../configs';
import ThemeDark from '../configs/dark';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_NAME_THEME: 'default' | 'dark' = 'default';
const KEY_STORAGE_APP_NAME_THEME = 'appNameTheme';

const ThemeContext = React.createContext({
  theme: ThemeDefault,
  nameTheme: DEFAULT_NAME_THEME,
  changeAppTheme: (nameTheme?: 'default' | 'dark') => {},
});

const mapTheme = nameTheme => {
  switch (nameTheme) {
    case 'dark':
      return ThemeDark;
    default:
      return ThemeDefault;
  }
};

export const ThemeProvider = ({theme = ThemeDefault, children}) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [currentNameTheme, setCurrentNameTheme] = useState(DEFAULT_NAME_THEME);

  const setTheme = nameTheme => {
    setCurrentTheme(mapTheme(nameTheme));
    setCurrentNameTheme(nameTheme);
    AsyncStorage.setItem(KEY_STORAGE_APP_NAME_THEME, nameTheme);
  };

  const initializeAppTheme = async () => {
    const currentNameThemeStorage = await AsyncStorage.getItem(
      KEY_STORAGE_APP_NAME_THEME,
    );
    setTheme(
      currentNameThemeStorage ? currentNameThemeStorage : DEFAULT_NAME_THEME,
    );
  };

  const contextValue = useMemo(
    () => ({
      nameTheme: currentNameTheme,
      theme: currentTheme,
      changeAppTheme: setTheme,
    }),
    [currentNameTheme],
  );

  useEffect(() => {
    initializeAppTheme();
  }, []);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
