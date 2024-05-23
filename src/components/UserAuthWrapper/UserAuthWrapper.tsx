import { Outlet, Navigate } from 'react-router-dom';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../Context/AuthenticatedContext/useAuthenticatedContext';
import { useAuthorizedContext } from '../Context/AuthorizedContext/useAuthorizedContext';

/**
 * Routes the user based on the authentication and authorization status.
 * @author Steven Burger
 *
 * @returns {React.ReactNode}
 */
const UserAuthWrapper = () => {
    const { authenticated } = useAuthenticatedContext();
    const { authorized } = useAuthorizedContext();

    if (authenticated === null) {
        return <LoaderPage />;
    }

    return authenticated ? (
        authorized ? (
            <Navigate to="/admin" />
        ) : (
            <Outlet />
        )
    ) : (
        <Navigate to="/login" />
    );
};

export default UserAuthWrapper;
