import { createContext, Dispatch, SetStateAction } from 'react';

/**
 * Interface for the Authorized Context.
 * @author David Linhardt
 *
 * @interface AuthorizedContextType
 * @typedef {AuthorizedContextType}
 */
interface AuthorizedContextType {
    authorized: boolean | null;
    setAuthorized: Dispatch<SetStateAction<boolean | null>>;
}

/**
 * Default state for the Authorized Context.
 * @author David Linhardt
 *
 * @type {AuthorizedContextType}
 */
const defaultState: AuthorizedContextType = {
    authorized: null,
    setAuthorized: () => {},
};

/**
 * Authorized Context to provide the authorization state to the components.
 * @author David Linhardt
 *
 * @type {Context<AuthorizedContextType>}
 */
const AuthorizedContext = createContext<AuthorizedContextType>(defaultState);

export default AuthorizedContext;
