import './Logout.css';
import user from '../../services/user';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { useTranslation } from 'react-i18next';
import { useAuthenticatedContext } from '../../components/AuthenticatedContext';

export default function Logout() {
    const navigate = useNavigate();
    const { setAuthenticated } = useAuthenticatedContext();

    const { t } = useTranslation(['logout']);

    const logout = async () => {
        try {
            const res: Response = await user.logout();
            if (res.status === StatusCodes.FORBIDDEN) {
                setAuthenticated?.(false);
                toast.showToast(ToastType.SUCCESS, t('logoutSucessful'));
                navigate('/login');
            } else {
                toast.showToast(
                    ToastType.ERROR,
                    t('logoutError') +
                        toast.httpError(res.status, getReasonPhrase(res.status))
                );
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.showToast(ToastType.ERROR, err.message);
            }
        }
    };

    return (
        <div className="logout">
            <h1>Logout</h1>
            <Button text={t('logoutButton')} handleClick={logout} />
        </div>
    );
}
