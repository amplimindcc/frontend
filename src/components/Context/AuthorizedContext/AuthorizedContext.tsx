import { createContext, Dispatch, SetStateAction } from 'react';

interface AuthorizedContextType {
    authorized: boolean | null;
    setAuthorized: Dispatch<SetStateAction<boolean | null>>;
}

const defaultState: AuthorizedContextType = {
    authorized: null,
    setAuthorized: () => {},
};

const AuthorizedContext = createContext<AuthorizedContextType>(defaultState);

export default AuthorizedContext;
