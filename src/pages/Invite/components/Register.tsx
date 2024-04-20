import './Register.css';
import { useState } from 'react';
import Error from '../../../components/Error/Error';

interface RegisterProps {
    display: boolean;
}

const Register = ({ display }: RegisterProps) => {
    if (display === null) {
        return null;
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (valid) {
            console.log('submit');
        }
    };

    return (
        <div>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <div className="input-label">
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
                    <div className="input-label">
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
                    disabled={!valid}
                >
                    set password
                </button>
            </form>
        </div>
    );
};

export default Register;
