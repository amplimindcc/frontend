import React, { useEffect, useState, ReactNode } from 'react';
import LocaleContext from '../Context/LocaleContext/LocaleContext';
import AGGridLocaleContext from '../Context/AGGridLocaleContext/AGGridLocaleContext';
import i18n from '../../i18n';
import AGGridLocale from '../../interfaces/AGGridLocale';
import AG_GRID_LOCALE_EN from '../../locales/en/AGGrid';
import AG_GRID_LOCALE_DE from '../../locales/de/AGGrid';

const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<string>(getLocale());
    const [gridLocale, setGridLocale] =
        useState<AGGridLocale>(AG_GRID_LOCALE_EN);

    function getLocale(): string {
        if (localStorage.getItem('locale') === null) {
            return navigator.language;
        } else {
            return localStorage.getItem('locale')!;
        }
    }

    function getGridLocale(locale: string): AGGridLocale {
        switch (locale) {
            case 'en':
                return AG_GRID_LOCALE_EN;
            case 'de':
                return AG_GRID_LOCALE_DE;
            default:
                return AG_GRID_LOCALE_EN;
        }
    }

    useEffect(() => {
        i18n.changeLanguage(locale);
        localStorage.setItem('locale', locale);
        setGridLocale(getGridLocale(locale));
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <AGGridLocaleContext.Provider value={{ gridLocale, setGridLocale }}>
                {children}
            </AGGridLocaleContext.Provider>
        </LocaleContext.Provider>
    );
};

export default LangProvider;
