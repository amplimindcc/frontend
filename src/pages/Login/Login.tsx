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
import { useAuthenticatedContext } from '../../components/Context/AuthenticatedContext/useAuthenticatedContext';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

/**
 * Description placeholder
 * @author Steven Burger
 *
 * @returns {React.ReactNode}
 */
const Login = () => {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['main']);
    /**
     * Authenticated Context
     * @author David Linhardt
     *
     * @type {boolean | null}
     */
    const { authenticated, setAuthenticated } = useAuthenticatedContext();

    // States
    /**
     * Input values for the login form
     * @author Steven Burger
     *
     * @typedef {Object} InputValues
     * @property {string} email
     * @property {string} password
     */
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });
    /**
     * Loading state for the login button
     * @author Steven Burger
     *
     * @type {boolean}
     */
    const [loading, setLoading] = useState(false);

    /**
     * useNavigate hook
     * @author Steven Burger
     *
     * @type {NavigateFunction}
     */
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Routes the user based on the authentication status and the role of the user.
         * @author Steven Burger
         *
         * @async
         * @returns {void}
         */
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

    /**
     * Handles the change event of the input fields and sets the input values accordingly.
     * @author Steven Burger
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     * @returns {void}
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Handles the submit event of the login form and sends the login request to the backend.
     * @author Steven Burger
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e
     * @returns {void}
     */
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
