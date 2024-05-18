import { Outlet, Navigate } from 'react-router-dom';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../AuthenticatedContext';
import { useAuthorizedContext } from '../AuthorizedContext';

const AdminAuthWrapper = () => {
    const { authenticated, setAuthenticated } = useAuthenticatedContext();
    const { authorized, setAuthorized } = useAuthorizedContext();

    if (authenticated === null) {
        return <LoaderPage />;
    }

    return authenticated && authorized ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminAuthWrapper;
