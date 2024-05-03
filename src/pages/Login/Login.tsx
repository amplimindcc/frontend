import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import user from '../../services/user';
import serviceHelper from '../../services/serviceHelper';
import './Login.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { useAuthenticatedContext } from '../../components/AuthenticatedContext';

const Login = () => {
    const { authenticated, setAuthenticated } = useAuthenticatedContext();
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();

                if(res.ok) {
                    await serviceHelper.routeBasedOnRole(navigate, '/admin', '/project/start');
                }
                setAuthenticated(res.ok);
            }
            catch(err) {
                toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
                setAuthenticated(false);
            }
        };
        if(authenticated === null) {
            checkLogin();
        }
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
            const res = await user.login(inputValues.email, inputValues.password);

            if(res.ok) {
                toast.showToast(ToastType.SUCCESS, 'login successful');
                setTimeout(() => {
                    setLoading(false);
                    serviceHelper.routeBasedOnRole(navigate, '/admin', '/project/start');
                }, 2000);
            }
            else {
                toast.showToast(ToastType.ERROR, toast.httpError(res.status, 'Invalid email or password'));
                setLoading(false);
            }
        }
        catch(err) {
            toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
            setLoading(false);
        }
    };

    return (
        <>
            {
                authenticated === null ? (
                    <Loader height={32} width={32} borderWidth={5}/>
                ) : (
                    <form className="login-form" onSubmit={handleSubmit} data-testid="login-form">
                        <div className="input-with-label">
                            <label htmlFor="email">email:</label>
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
                            <label htmlFor="password">password:</label>
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
                            <Button text={"login"} loading={loading} />
                        </div>
                        <Link id='resetPassword' to="/resetPasswordRequest">Forgot password?</Link>
                    </form>
                )
            }
        </>
    );
};

export default Login;
