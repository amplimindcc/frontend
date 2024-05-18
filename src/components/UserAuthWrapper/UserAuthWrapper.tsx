import { Outlet, Navigate } from 'react-router-dom';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../AuthenticatedContext';
import { useAuthorizedContext } from '../AuthorizedContext';

const UserAuthWrapper = () => {
    const { authenticated, setAuthenticated } = useAuthenticatedContext();
    const { authorized, setAuthorized } = useAuthorizedContext();

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
