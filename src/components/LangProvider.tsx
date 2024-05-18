import React, { useEffect, useState, ReactNode, useTransition } from 'react';
import LocaleContext from './LocaleContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<string>(getLocale());

    function getLocale(): string {
        if (localStorage.getItem('locale') === null) {
            return navigator.language;
        } else {
            return localStorage.getItem('locale')!;
        }
    }

    useEffect(() => {
        i18n.changeLanguage(locale);
        localStorage.setItem('locale', locale);
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};

export default LangProvider;
