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
import { useAuthenticatedContext } from '../../components/AuthenticatedContext';
import { StatusCodes } from 'http-status-codes';

const Invite = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { token } = params;
    const [loading, setLoading] = useState(false);
    const [tokenLoader, setTokenLoader] = useState(true);
    const { authenticated, setAuthenticated } = useAuthenticatedContext();

    if (token === null) {
        navigate('/login');
    }

    const [inputValues, setInputValues] = useState({
        password: '',
        passwordRepeat: '',
    });

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
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const valid = await serviceHelper.checkTokenValid(token!);

            if (!valid) {
                navigate('/login');
            } else {
                setTokenLoader(false);
            }
        };
        checkToken();
    }, []);

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
                newError.passwordRepeat.text = 'Passwords do not match';
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);

        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

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
                        toast.showToast(ToastType.SUCCESS, 'password set');
                        setTimeout(async () => {
                            setLoading(false);
                            navigate('/project/start');
                        }, 2000);
                        break;
                    case StatusCodes.BAD_REQUEST:
                        setAuthenticated?.(false);
                        setLoading(false);
                        toast.showToast(ToastType.ERROR, 'Invalid token.');
                        break;
                    case StatusCodes.FORBIDDEN:
                        setAuthenticated?.(false);
                        setLoading(false);
                        toast.showToast(ToastType.ERROR, 'Token is expired.');
                        break;
                    case StatusCodes.NOT_FOUND:
                        setAuthenticated?.(false);
                        setLoading(false);
                        toast.showToast(ToastType.ERROR, 'User does not exist.');
                        break;
                    case StatusCodes.CONFLICT:
                        setLoading(false);
                        setAuthenticated?.(false);
                        toast.showToast(ToastType.ERROR, 'Token was already used.');
                    case StatusCodes.PRECONDITION_FAILED:
                        setLoading(false);
                        setAuthenticated?.(false);
                        toast.showToast(ToastType.ERROR, 'Password is too weak.');
                }
            } catch (err) {
                toast.showToast(
                    ToastType.ERROR,
                    'Connection error. Try again later.'
                );
                setLoading(false);
            }
        }
    };

    return (
        <div className="center">
            {tokenLoader ? (
                <Loader height={32} width={32} borderWidth={5} />
            ) : (
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <div className="input-with-label">
                            <label htmlFor="password">password:</label>
                            <input
                                type="password"
                                name="password"
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
                                password repeat:
                            </label>
                            <input
                                type="password"
                                name="passwordRepeat"
                                value={inputValues.passwordRepeat}
                                onChange={handleChange}
                            />
                        </div>
                        <Error text={errors.passwordRepeat.text} />
                    </div>
                    <div className="invite-button">
                        <Button
                            text={'set password'}
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
