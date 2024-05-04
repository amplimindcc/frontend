import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import user from '../../services/user';
import serviceHelper from '../../services/serviceHelper';
import './Login.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import audiLogo from '../../assets/Audi_Rings_Medium_wh-RGB-1024x342.png';
import lufthansaLogo from '../../assets/logo_lufthansa_weiss.png';
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
        async function route() {
            await serviceHelper.routeBasedOnRole(navigate, '/admin', '/project/start');
        }
        route();
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
                setAuthenticated?.(true);
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
                    <div className="login-container">
                        <img src={audiLogo} alt="Audi Logo" className='logo-audi-lufthansa' />
                        <form className="login-form" onSubmit={handleSubmit}  data-testid="login-form">
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
                        <img src={lufthansaLogo} alt="Lufthansa Logo" className='logo-audi-lufthansa' />
                    </div>
                )
            }
        </>
    );
};

export default Login;
