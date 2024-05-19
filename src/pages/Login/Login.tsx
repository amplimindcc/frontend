import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user from '../../services/user';
import serviceHelper from '../../services/serviceHelper';
import './Login.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import audiLogo from '../../assets/Audi_Rings_Medium_wh-RGB-1024x342.png';
import lufthansaLogo from '../../assets/logo_lufthansa_weiss.png';
import { useAuthenticatedContext } from '../../components/useAuthenticatedContext';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const Login = () => {
    const { t } = useTranslation(['main']);

    const { authenticated, setAuthenticated } = useAuthenticatedContext();
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function route() {
            await serviceHelper.routeBasedOnRole(
                navigate,
                '/admin',
                '/project/start'
            );
        }
        route();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await user.login(
                inputValues.email,
                inputValues.password
            );

            switch (res.status) {
                case StatusCodes.OK:
                    toast.showToast(ToastType.SUCCESS, t('loginOK'));
                    setAuthenticated?.(true);
                    setTimeout(() => {
                        setLoading(false);
                        serviceHelper.routeBasedOnRole(
                            navigate,
                            '/admin',
                            '/project/start'
                        );
                    }, 2000);
                    break;
                case StatusCodes.FORBIDDEN:
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, t('invalidEmailPassword'))
                    );
                    setLoading(false);
                    break;
                case StatusCodes.TOO_MANY_REQUESTS:
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(
                            res.status,
                            'Too many requests. Try again later.'
                        )
                    ); //TODO: Adding translation
                    setLoading(false);
                    break;
                default:
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, getReasonPhrase(res.status))
                    );
                    setLoading(false);
                    break;
            }
        } catch (err) {
            toast.showToast(ToastType.ERROR, t('connectionError'));
            setLoading(false);
        }
    };

    return (
        <>
            {authenticated === null ? (
                <Loader height={32} width={32} borderWidth={5} />
            ) : (
                <div className="login-container">
                    <img
                        src={audiLogo}
                        alt="Audi Logo"
                        className="logo-audi-lufthansa"
                    />
                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                        data-testid="login-form"
                    >
                        <div className="input-with-label">
                            <label htmlFor="email">{t('email')}:</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                value={inputValues.email}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div className="input-with-label">
                            <label htmlFor="password">{t('password')}:</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={inputValues.password}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div className="login-button">
                            <Button text={t('buttonLogin')} loading={loading} />
                        </div>
                        <Link id="resetPassword" to="/resetPasswordRequest">
                            {t('forgotPassword')}?
                        </Link>
                    </form>
                    <img
                        src={lufthansaLogo}
                        alt="Lufthansa Logo"
                        className="logo-audi-lufthansa"
                    />
                </div>
            )}
        </>
    );
};

export default Login;
