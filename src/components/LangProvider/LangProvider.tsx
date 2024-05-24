import React, { useEffect, useState, ReactNode } from 'react';
import LocaleContext from '../Context/LocaleContext/LocaleContext';
import AGGridLocaleContext from '../Context/AGGridLocaleContext/AGGridLocaleContext';
import i18n from '../../i18n';
import AGGridLocale from '../../interfaces/AGGridLocale';
import AG_GRID_LOCALE_EN from '../../locales/en/AGGrid';
import AG_GRID_LOCALE_DE from '../../locales/de/AGGrid';

/**
 * Context provider for the language and AG Grid locale.
 * @author David Linhardt
 *
 * @param {{ children: React.ReactNode; }} param0
 * @param {React.ReactNode} param0.children
 * @returns {React.ReactNode}
 */
const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    /**
     * Locale Context
     * @author David Linhardt
     *
     * @type {string}
     */
    const [locale, setLocale] = useState<string>(getLocale());
    /**
     * gridLocale Context
     * @author David Linhardt
     *
     * @type {AGGridLocale}
     */
    const [gridLocale, setGridLocale] =
        useState<AGGridLocale>(AG_GRID_LOCALE_EN);

    /**
     * Get the locale from the local storage or the browser.
     * @author David Linhardt
     *
     * @returns {string}
     */
    function getLocale(): string {
        if (localStorage.getItem('locale') === null) {
            // browser might return 'en-US' or 'en_US' instead of 'en'
            if (navigator.language.indexOf('-') > -1) {
                return navigator.language.split('-')[0];
            } else if (navigator.language.indexOf('_') > -1) {
                return navigator.language.split('_')[0];
            } else {
                return navigator.language;
            }
        } else {
            return localStorage.getItem('locale')!;
        }
    }

    /**
     * Get the AG Grid locale based on the locale.
     * @author David Linhardt
     *
     * @param {string} locale
     * @returns {AGGridLocale}
     */
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
