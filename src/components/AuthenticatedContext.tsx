import { createContext, useContext, Dispatch, SetStateAction } from 'react';

interface AuthenticatedContextType {
    authenticated: boolean | null;
    setAuthenticated: Dispatch<SetStateAction<boolean | null>>;
}

const defaultState: AuthenticatedContextType = {
    authenticated: null,
    setAuthenticated: () => {},
};

const AuthenticatedContext =
    createContext<AuthenticatedContextType>(defaultState);

export const useAuthenticatedContext = () => useContext(AuthenticatedContext);

export default AuthenticatedContext;
