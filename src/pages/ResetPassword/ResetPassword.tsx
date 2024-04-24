import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import user from '../../services/user';
import './ResetPassword.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [submitStatus, setSubmitStatus] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await user.requestPasswordChange(email);

            if (!res.ok)
                toast.showToast(ToastType.ERROR, 'Invalid email address.');
            else {
                toast.showToast(ToastType.SUCCESS, 'Request successful. Redirection to login page...', 3000);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        }
        catch(err) {
            toast.showToast(ToastType.ERROR, 'Error while resetting password. Try again later.');
        }
    };

    return (
        <div className="center">
            <form className="reset-form" onSubmit={handleSubmit}>
                <div className="input-with-label">
                    <label htmlFor="email">email:</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className='oneLine'>
                    <button type="submit">
                        Request new password
                    </button>
                    <Link to={"/login"}>
                        <button type="button">
                            Cancel
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
