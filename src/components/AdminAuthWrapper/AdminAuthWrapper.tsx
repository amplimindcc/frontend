import { Outlet, Navigate } from 'react-router-dom';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../Context/AuthenticatedContext/useAuthenticatedContext';
import { useAuthorizedContext } from '../Context/AuthorizedContext/useAuthorizedContext';

/**
 * Auth Wrapper for the admin routes that reroutes the user based on the authentication and authorization status.
 * @author David Linhardt
 *
 * @returns {React.ReactNode}
 */
const AdminAuthWrapper = () => {
    // Context
    /**
     * Authenticated Context
     * @author David Linhardt
     *
     * @type {boolean | null}
     */
    const { authenticated } = useAuthenticatedContext();
    /**
     * Authorized Context
     * @author David Linhardt
     *
     * @type {boolean | null}
     */
    const { authorized } = useAuthorizedContext();

    if (authenticated === null) {
        return <LoaderPage />;
    }

    return authenticated && authorized ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminAuthWrapper;
