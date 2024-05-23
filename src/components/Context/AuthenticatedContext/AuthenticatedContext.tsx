import { createContext, Dispatch, SetStateAction } from 'react';

/**
 * Interface for the Authenticated Context.
 * @author David Linhardt
 *
 * @interface AuthenticatedContextType
 * @typedef {AuthenticatedContextType}
 */
interface AuthenticatedContextType {
    authenticated: boolean | null;
    setAuthenticated: Dispatch<SetStateAction<boolean | null>>;
}

/**
 * Default state for the Authenticated Context.
 * @author David Linhardt
 *
 * @type {AuthenticatedContextType}
 */
const defaultState: AuthenticatedContextType = {
    authenticated: null,
    setAuthenticated: () => {},
};

/**
 * Authenticated Context to provide the authentication state to the components.
 * @author David Linhardt
 *
 * @type {Context<AuthenticatedContextType>}
 */
const AuthenticatedContext =
    createContext<AuthenticatedContextType>(defaultState);

export default AuthenticatedContext;
