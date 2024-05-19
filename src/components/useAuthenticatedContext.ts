import { useContext } from 'react';
import AuthenticatedContext from './AuthenticatedContext';

export const useAuthenticatedContext = () => useContext(AuthenticatedContext);
