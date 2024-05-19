import { createContext, Dispatch, SetStateAction } from 'react';

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

export default AuthenticatedContext;
