import './Invite.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import user from '../../services/user';
import Error from '../../components/Error/Error';
import serviceHelper from '../../services/serviceHelper';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import passwordService from '../../services/passwordService';
import PasswordStatus from '../../interfaces/PasswordStatus';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter/PasswordStrengthMeter';
import { useTranslation } from 'react-i18next';
import { useAuthenticatedContext } from '../../components/Context/AuthenticatedContext/useAuthenticatedContext';
import { StatusCodes } from 'http-status-codes';

/**
 * Invite page to set the password for a new user. The user is redirected to this page after clicking on the invitation link in the email.
 * @author Steven Burger
 *
 * @returns {React.ReactNode}
 */
const Invite = () => {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['main', 'invite']);
    /**
     * Context for authenticated state of the user. Used to set the authenticated state after the password has been set.
     * @author David Linhardt
     *
     * @type {Dispatch<SetStateAction<boolean | null>>}
     */
    const { setAuthenticated } = useAuthenticatedContext();

    // Hooks
    /**
     * Navigation function to navigate to other pages in the application.
     * @author Steven Burger
     *
     * @type {NavigateFunction}
     */
    const navigate = useNavigate();
    /**
     * Description placeholder
     * @author Steven Burger
     *
     * @type {Readonly<Params<string>>}
     */
    const params = useParams();

    /**
     * Invite token from the URL parameters.
     * @author Steven Burger
     *
     * @type {string | undefined}
     */
    const { token } = params;

    // States
    /**
     * State to handle the loading spinner when the password is being set.
     * @author Steven Burger
     *
     * @type {boolean}
     */
    const [loading, setLoading] = useState(false);
    /**
     * State to handle the loading page when the token is being checked.
     * @author Steven Burger
     *
     * @type {boolean}
     */
    const [tokenLoader, setTokenLoader] = useState(true);
    /**
     * State to handle the input values of the password and the repeated password.
     * @author Steven Burger
     *
     * @typedef {Object} InputValues
     * @property {string} password
     * @property {string} passwordRepeat
     */
    const [inputValues, setInputValues] = useState({
        password: '',
        passwordRepeat: '',
    });
    /**
     * State to handle the error messages and validity of the password and the repeated password.
     * @author Steven Burger
     *
     * @typedef {Object} Errors
     * @property {string} text
     * @property {boolean} valid
     */
    const [errors, setErrors] = useState({
        password: {
            text: '',
            valid: false,
        },
        passwordRepeat: {
            text: '',
            valid: false,
        },
    });
    /**
     * Validation state to check if the password and the repeated password are valid. Used to enable the submit button.
     * @author Steven Burger
     *
     * @type {boolean}
     */
    const [valid, setValid] = useState(false);

    if (token === null) {
        navigate('/login');
    }

    useEffect(() => {
        /**
         * Checks the Backend if the token is valid. If not, the user is redirected to the login page.
         * @author Steven Burger
         *
         * @async
         * @returns {void}
         */
        const checkToken = async () => {
            const valid = await serviceHelper.checkTokenValid(token!);

            if (!valid) {
                navigate('/login');
            } else {
                setTokenLoader(false);
            }
        };
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Validates the input values of the password and the repeated password.
     * @author Steven Burger
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const validateInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newError = { ...errors };
        if (e.target.name === 'password') {
            const passwordStatus: PasswordStatus = passwordService.check(
                e.target.value
            );
            newError.password.text = passwordStatus.message;
            newError.password.valid = passwordStatus.isValid;
        }

        if (e.target.name === 'passwordRepeat') {
            if (e.target.value !== inputValues.password) {
                newError.passwordRepeat.text = t('passwordNotMatch');
                newError.passwordRepeat.valid = false;
            } else {
                newError.passwordRepeat.text = '';
                newError.passwordRepeat.valid = true;
            }
        }

        setErrors(newError);

        if (newError.password.valid && newError.passwordRepeat.valid) {
            setValid(true);
        } else {
            setValid(false);
        }
    };

    /**
     * Handles the change of the input values of the password and the repeated password.
     * @author Steven Burger
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);

        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Handler for form submit. Calls the register function from the user service to set the password of the user.
     * @author Steven Burger
     * @author David Linhardt
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e
     * @returns {void}
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (valid) {
            try {
                const res = await user.register(
                    token!,
                    inputValues.passwordRepeat
                );
                switch (res.status) {
                    case StatusCodes.OK:
                        setAuthenticated?.(true);
                        toast.showToast(ToastType.SUCCESS, t('passwordSetOK'));
                        setLoading(false);
                        navigate('/project/start');
                        break;
                    case StatusCodes.BAD_REQUEST:
                        setAuthenticated?.(false);
                        setLoading(false);
                        toast.showToast(
                            ToastType.ERROR,
                            t('tokenInvalid', { ns: 'invite' })
                        );
                        break;
                    case StatusCodes.FORBIDDEN:
                        setAuthenticated?.(false);
                        setLoading(false);
                        toast.showToast(
                            ToastType.ERROR,
                            t('tokenExpired', { ns: 'invite' })
                        );
                        break;
                    case StatusCodes.NOT_FOUND:
                        setAuthenticated?.(false);
                        setLoading(false);
                        toast.showToast(
                            ToastType.ERROR,
                            t('userNotExist', { ns: 'invite' })
                        );
                        break;
                    case StatusCodes.CONFLICT:
                        setLoading(false);
                        setAuthenticated?.(false);
                        toast.showToast(
                            ToastType.ERROR,
                            t('tokenAlreadyUsed', { ns: 'invite' })
                        );
                        break;
                    case StatusCodes.PRECONDITION_FAILED:
                        setLoading(false);
                        setAuthenticated?.(false);
                        toast.showToast(
                            ToastType.ERROR,
                            t('passwordWeak', { ns: 'invite' })
                        );
                        break;
                }
            } catch (err) {
                toast.showToast(ToastType.ERROR, t('connectionError'));
                setLoading(false);
            }
        }
    };

    return (
        <div className="center">
            {tokenLoader ? (
                <Loader height={32} width={32} borderWidth={5} />
            ) : (
                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                    data-testid="register-form"
                >
                    <div className="input-wrapper">
                        <div className="input-with-label">
                            <label htmlFor="password">{t('password')}:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input"
                                value={inputValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <PasswordStrengthMeter
                            password={inputValues.password}
                        />
                        <Error text={errors.password.text} />
                    </div>
                    <div className="input-wrapper">
                        <div className="input-with-label">
                            <label htmlFor="password-repeat">
                                {t('passwordRepeat')}:
                            </label>
                            <input
                                type="password"
                                name="passwordRepeat"
                                id="password-repeat"
                                className="input"
                                value={inputValues.passwordRepeat}
                                onChange={handleChange}
                            />
                        </div>
                        <Error text={errors.passwordRepeat.text} />
                    </div>
                    <div className="invite-button">
                        <Button
                            text={t('buttonPasswordSet')}
                            loading={loading}
                            disabled={!valid}
                        />
                    </div>
                </form>
            )}
        </div>
    );
};

export default Invite;
