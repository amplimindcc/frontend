import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import user from '../../services/user';
import './ResetPassword.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Error from '../../components/Error/Error';

const Login = () => {
    const [submitStatus, setSubmitStatus] = useState<boolean>(false);

    const navigate = useNavigate();
    const { token } = useParams();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus(true);
        try {
            if (token !== undefined) {
                const res = await user.changePassword(token!!, inputValues.passwordRepeat);
                setSubmitStatus(false);

                if (!res.ok) {
                    toast.showToast(ToastType.ERROR, 'Error while setting new password.');
                }
                else {
                    toast.showToast(ToastType.SUCCESS, 'Password change successful. Redirection to login page...');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            } else {
                toast.showToast(ToastType.ERROR, 'Error while setting new password.');
                setSubmitStatus(false);
            }
        }
        catch(err) {
            toast.showToast(ToastType.ERROR, 'Error while setting password. Try again later.');
            setSubmitStatus(false);
        }
    };

    const validateInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newError = { ...errors };

        if (e.target.name === 'password') {
            if (e.target.value.length < 8) {
                newError.password.text =
                    'Password must be at least 8 characters long';
                newError.password.valid = false;
            } else {
                newError.password.text = '';
                newError.password.valid = true;
            }
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

    return (
        <div className="center">
            <form className="reset-form" onSubmit={handleSubmit}>
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
                <button
                    type="submit"
                    className="register-button"
                    disabled={!valid && !submitStatus}
                >
                    {!submitStatus ? "set password" : 'loading...'}
                </button>
            </form>
        </div>
    );
};

export default Login;
