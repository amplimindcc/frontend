import { createContext, useContext, Dispatch, SetStateAction } from 'react';

interface LocaleContextType {
    locale: string;
    setLocale: Dispatch<SetStateAction<string>>;
}

const defaultState: LocaleContextType = {
    locale: 'en',
    setLocale: () => {},
};

const LocaleContext = createContext<LocaleContextType>(defaultState);

export const useLocaleContext = () => useContext(LocaleContext);

export default LocaleContext;
