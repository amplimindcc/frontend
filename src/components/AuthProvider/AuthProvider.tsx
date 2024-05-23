import { useEffect, useState, ReactNode } from 'react';
import AuthenticatedContext from '../Context/AuthenticatedContext/AuthenticatedContext';
import user from '../../services/user';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import { getReasonPhrase } from 'http-status-codes';
import AuthorizedContext from '../Context/AuthorizedContext/AuthorizedContext';

/**
 * Interface for the AuthProvider component.
 * @author Steven Burger
 *
 * @interface AuthProvider
 * @typedef {AuthProvider}
 */
interface AuthProvider {
    children: ReactNode;
}

/**
 * Context provider for the authentication and authorization status.
 * @author David Linhardt
 *
 * @interface AuthProvider
 * @typedef {AuthProvider}
 */
const AuthProvider = ({ children }: AuthProvider) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        /**
         * Fetches the authentication status of the user.
         * @author David Linhardt
         *
         * @async
         * @returns {void}
         */
        const fetchAuthentication = async () => {
            try {
                const res = await user.authenticated();
                if (res.ok) {
                    setAuthenticated(res.ok);
                } else {
                    setAuthenticated(res.ok);
                }
            } catch (error: unknown) {
                toast.showToast(
                    ToastType.ERROR,
                    'Failed to fetch authentication status:'
                );
                setAuthenticated(false);
            }
        };
        fetchAuthentication();
    }, []);

    useEffect(() => {
        if (!authenticated) return; //  guard clause
        /**
         * Fetches the authorization status of the user.
         * @author David Linhardt
         *
         * @async
         * @returns {void}
         */
        const fetchAuthorization = async () => {
            try {
                const res = await user.checkAdmin();
                if (res.ok) {
                    const currentUser = await res.json();
                    setAuthorized(currentUser.isAdmin);
                } else {
                    setAuthorized(false);
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, getReasonPhrase(res.status))
                    );
                }
            } catch (error: unknown) {
                setAuthorized(false);
                toast.showToast(
                    ToastType.ERROR,
                    'Failed to fetch authorization status:'
                );
            }
        };
        fetchAuthorization();
    }, [authenticated]);

    return (
        <AuthenticatedContext.Provider
            value={{ authenticated, setAuthenticated }}
        >
            <AuthorizedContext.Provider value={{ authorized, setAuthorized }}>
                {children}
            </AuthorizedContext.Provider>
        </AuthenticatedContext.Provider>
    );
};

export default AuthProvider;
