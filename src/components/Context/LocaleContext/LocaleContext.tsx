import { createContext, Dispatch, SetStateAction } from 'react';

/**
 * Interface for the Locale Context.
 * @author David Linhardt
 *
 * @interface LocaleContextType
 * @typedef {LocaleContextType}
 */
interface LocaleContextType {
    locale: string;
    setLocale: Dispatch<SetStateAction<string>>;
}

/**
 * Default state for the Locale Context.
 * @author David Linhardt
 *
 * @type {LocaleContextType}
 */
const defaultState: LocaleContextType = {
    locale: 'en',
    setLocale: () => {},
};

/**
 * Locale Context to provide the locale to the components.
 * @author David Linhardt
 *
 * @type {Context<LocaleContextType>}
 */
const LocaleContext = createContext<LocaleContextType>(defaultState);

export default LocaleContext;
