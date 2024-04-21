import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import user from '../../services/user';
import './Login.css';
import Notification from '../../components/Notification/Notification';

const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let message = '';

        try {
            const res = await user.login(inputValues.email, inputValues.password);

            if(!res.ok) {
                message = 'Invalid email or password';
            }
            else {
                message = 'Login successful. Redirecting...';
                setTimeout(() => {
                    navigate('/commit');
                }, 2000);
            }
        }
        catch(err) {
            message = 'Error while logging in. Try again later.';
        }

        setError(message);
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    return (
        <div className="center">
            <Notification text={error} timeout={3000}/>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-with-label">
                    <label htmlFor="email">email:</label>
                    <input
                        type="text"
                        name="email"
                        value={inputValues.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-with-label">
                    <label htmlFor="password">password:</label>
                    <input
                        type="password"
                        name="password"
                        value={inputValues.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-button">
                    login
                </button>
            </form>
        </div>
    );
};

export default Login;
