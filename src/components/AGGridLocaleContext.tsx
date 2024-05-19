import { createContext, Dispatch, SetStateAction } from 'react';
import AG_GRID_LOCALE_EN from '../locales/en/AGGrid';
import AGGridLocale from '../interfaces/AGGridLocale';

interface AGGridLocaleContextType {
    gridLocale: AGGridLocale;
    setGridLocale: Dispatch<SetStateAction<AGGridLocale>>;
}

const defaultState: AGGridLocaleContextType = {
    gridLocale: AG_GRID_LOCALE_EN,
    setGridLocale: () => {},
};

const AGGridLocaleContext =
    createContext<AGGridLocaleContextType>(defaultState);

export default AGGridLocaleContext;
