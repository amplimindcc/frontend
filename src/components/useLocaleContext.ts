import { useContext } from 'react';
import LocaleContext from './LocaleContext';

export const useLocaleContext = () => useContext(LocaleContext);
