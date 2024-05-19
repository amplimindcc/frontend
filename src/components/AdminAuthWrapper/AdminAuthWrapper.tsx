import { Outlet, Navigate } from 'react-router-dom';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../useAuthenticatedContext';
import { useAuthorizedContext } from '../useAuthorizedContext';

const AdminAuthWrapper = () => {
    const { authenticated } = useAuthenticatedContext();
    const { authorized } = useAuthorizedContext();

    if (authenticated === null) {
        return <LoaderPage />;
    }

    return authenticated && authorized ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminAuthWrapper;
