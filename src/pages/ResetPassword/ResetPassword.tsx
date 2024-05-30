import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import user from '../../services/user';
import './ResetPassword.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Error from '../../components/Error/Error';
import Button from '../../components/Button/Button';
import PasswordStatus from '../../interfaces/PasswordStatus';
import passwordService from '../../services/passwordService';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter/PasswordStrengthMeter';
import { useTranslation } from 'react-i18next';

const Login = () => {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['resetPassword', 'main']);
    /**
     * token from URL
     * @author Matthias Roy
     *
     * @type {string | undefined}
     */
    const { token } = useParams();
    // Hooks
    /**
     * useNavigate Hook
     * @author Matthias Roy
     *
     * @type {NavigateFunction}
     */
    const navigate = useNavigate();

    // States
    /**
     * Submit Staus State
     * @author Matthias Roy
     *
     * @type {boolean}
     */
    const [submitStatus, setSubmitStatus] = useState<boolean>(false);

    /**
     * Form Input Values State
     * @author Matthias Roy
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
     * Error State
     * @author Matthias Roy
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
     * Valid State
     * @author Matthias Roy
     *
     * @type {boolean}
     */
    const [valid, setValid] = useState(false);

    /**
     * Handle form submit
     * @author Matthias Roy
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e
     * @returns {void}
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus(true);
        try {
            if (token !== undefined) {
                const res = await user.changePassword(
                    token!,
                    inputValues.passwordRepeat
                );

                if (!res.ok) {
                    toast.showToast(ToastType.ERROR, t('errorSetPassword'));
                    setSubmitStatus(false);
                } else {
                    toast.showToast(ToastType.SUCCESS, t('successSetPassword'));
                    setSubmitStatus(false);
                    navigate('/login');
                }
            } else {
                toast.showToast(ToastType.ERROR, t('errorSetPassword'));
                setSubmitStatus(false);
            }
        } catch (err) {
            toast.showToast(ToastType.ERROR, t('errorSetPasswordLater'));
            setSubmitStatus(false);
        }
    };

    /**
     * Validate input values
     * @author Matthias Roy
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
                newError.passwordRepeat.text = t('passwordNotMatch', {
                    ns: 'main',
                });
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
     * Handle input change
     * @author Matthias Roy
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

    return (
        <div className="center">
            <form
                className="reset-form"
                onSubmit={handleSubmit}
                data-testid="reset-password-form"
            >
                <div className="input-wrapper">
                    <div className="input-with-label">
                        <label htmlFor="password">
                            {t('password', { ns: 'main' })}:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={inputValues.password}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <Error text={errors.password.text} />
                </div>
                <div className="input-wrapper">
                    <div className="input-with-label">
                        <label htmlFor="password-repeat">
                            {t('passwordRepeat', { ns: 'main' })}:
                        </label>
                        <input
                            type="password"
                            name="passwordRepeat"
                            id="password-repeat"
                            value={inputValues.passwordRepeat}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <PasswordStrengthMeter password={inputValues.password} />
                    <Error text={errors.passwordRepeat.text} />
                </div>
                <div className="register-button">
                    <Button
                        text={t('buttonPasswordSet', { ns: 'main' })}
                        loading={submitStatus}
                        disabled={!valid && !submitStatus}
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;
