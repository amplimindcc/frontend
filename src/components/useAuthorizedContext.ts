import { useContext } from 'react';
import AuthorizedContext from './AuthorizedContext';

export const useAuthorizedContext = () => useContext(AuthorizedContext);
