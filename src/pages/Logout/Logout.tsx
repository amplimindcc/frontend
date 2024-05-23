import './Logout.css';
import user from '../../services/user';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { useTranslation } from 'react-i18next';
import { useAuthenticatedContext } from '../../components/Context/AuthenticatedContext/useAuthenticatedContext';

/**
 * Logout page
 * @author David Linhardt
 *
 * @export
 * @returns {React.ReactNode}
 */
export default function Logout() {
    /**
     * useNavigate hook
     * @author David Linhardt
     *
     * @type {*}
     */
    const navigate = useNavigate();
    // Context
    /**
     * Authenticated Context
     * @author David Linhardt
     *
     * @type {Dispatch<SetStateAction<boolean | null>>}
     */
    const { setAuthenticated } = useAuthenticatedContext();
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation('logout');

    /**
     * Logs the user out and redirects to the login page if successful, otherwise shows an error toast message.
     * @author David Linhardt
     *
     * @async
     * @returns {void}
     */
    const logout = async () => {
        try {
            const res: Response = await user.logout();
            if (res.status === StatusCodes.FORBIDDEN) {
                setAuthenticated?.(false);
                toast.showToast(ToastType.SUCCESS, t('logoutSuccessful'));
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
