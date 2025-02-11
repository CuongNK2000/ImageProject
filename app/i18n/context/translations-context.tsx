import React, {useState, useMemo, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '..';

const DEFAULT_LANGUAGE = 'en';
const KEY_STORAGE_APP_LANGUAGE = 'appLanguage';

export const TranslationsContext = React.createContext({
  i18n: i18n,
  changeAppLanguage: (name: 'en' | 'vn') => {},
  appLanguage: i18n.getLanguage(),
  initializeAppLanguage: async () => {
    const currentLanguageStorage = await AsyncStorage.getItem(
      KEY_STORAGE_APP_LANGUAGE,
    );
    i18n.setLanguage(currentLanguageStorage);
  },
});

export const TranslationsProvider = ({children}) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = language => {
    i18n.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(KEY_STORAGE_APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    const currentLanguageStorage = await AsyncStorage.getItem(
      KEY_STORAGE_APP_LANGUAGE,
    );

    console.log(
      'initializeAppLanguage get :',
      currentLanguageStorage,
      i18n.getLanguage(),
    );
    if (i18n.getLanguage() !== currentLanguageStorage) {
      console.log('initializeAppLanguage:', currentLanguageStorage);
      setLanguage(currentLanguageStorage || DEFAULT_LANGUAGE);
    } else {
      setAppLanguage(currentLanguageStorage);
    }
  };

  const contextValue = useMemo(
    () => ({
      appLanguage,
      i18n,
      changeAppLanguage: setLanguage,
      initializeAppLanguage,
    }),
    [appLanguage],
  );

  useEffect(() => {
    initializeAppLanguage();
  }, []);

  return (
    <TranslationsContext.Provider value={contextValue}>
      {children}
    </TranslationsContext.Provider>
  );
};

export default TranslationsContext;
