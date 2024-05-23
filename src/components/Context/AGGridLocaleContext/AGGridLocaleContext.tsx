import { createContext, Dispatch, SetStateAction } from 'react';
import AG_GRID_LOCALE_EN from '../../../locales/en/AGGrid';
import AGGridLocale from '../../../interfaces/AGGridLocale';

/**
 * Interface for the AG Grid Locale Context.
 * @author David Linhardt
 *
 * @interface AGGridLocaleContextType
 * @typedef {AGGridLocaleContextType}
 */
interface AGGridLocaleContextType {
    gridLocale: AGGridLocale;
    setGridLocale: Dispatch<SetStateAction<AGGridLocale>>;
}

/**
 * Default state for the AG Grid Locale Context.
 * @author David Linhardt
 *
 * @type {AGGridLocaleContextType}
 */
const defaultState: AGGridLocaleContextType = {
    gridLocale: AG_GRID_LOCALE_EN,
    setGridLocale: () => {},
};

/**
 * AG Grid Locale Context to provide the AG Grid locale to the components.
 * @author David Linhardt
 *
 * @type {Context<AGGridLocaleContextType>}
 */
const AGGridLocaleContext =
    createContext<AGGridLocaleContextType>(defaultState);

export default AGGridLocaleContext;
