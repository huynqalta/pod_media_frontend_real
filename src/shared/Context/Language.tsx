import { CURRENT_LANGUAGE } from '@helper/variable';
import React, { createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext(null);

const LangProvider = (props) => {
  const [language, setLanguage] = useState('USA');

  useEffect(() => {
    const currentLang = localStorage.getItem(CURRENT_LANGUAGE);
    if (currentLang) {
      setLanguage(currentLang);
    }
    return () => {};
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
export default LangProvider;