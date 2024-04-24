import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import user from '../../services/user';
import './Login.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';

const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();

                if(res.ok) {
                    navigate('/commit');
                }
            }
            catch(err) {
                toast.showToast(ToastType.ERROR, 'Server authentication error. Try again later.');
            }
        };
        checkLogin();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await user.login(inputValues.email, inputValues.password);

            if(!res.ok) {
                toast.showToast(ToastType.ERROR, toast.httpError(res.status, 'Invalid email or password'));
            }
            else {
                toast.showToast(ToastType.SUCCESS, 'login successful');
                setTimeout(() => {
                    navigate('/commit');
                }, 2000);
            }
        }
        catch(err) {
            toast.showToast(ToastType.ERROR, 'Error while logging in. Try again later.');
        }
    };

    return (
        <div className="center">
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
                <Link id='resetPassword' to="/resetPassword">Forgot password? Create here a new one.</Link>
            </form>
        </div>
    );
};

export default Login;
