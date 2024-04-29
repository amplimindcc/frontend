import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import user from '../../services/user';
import './ResetPasswordRequest.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Button from '../../components/Button/Button';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [submitStatus, setSubmitStatus] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus(true);

        try {
            const res = await user.requestPasswordChange(email);


            if (!res.ok) {
                toast.showToast(ToastType.ERROR, 'Invalid email address.');
                setSubmitStatus(false);
            }
            else {
                toast.showToast(ToastType.SUCCESS, 'Request successful. Check for mail. Redirection to login page...');
                setTimeout(() => {
                    setSubmitStatus(false);
                    navigate('/login');
                }, 2000);
            }
        }
        catch(err) {
            toast.showToast(ToastType.ERROR, 'Error while resetting password. Try again later.');
            setSubmitStatus(false);
        }
    };

    return (
        <div className="center">
            <form className="reset-form" onSubmit={handleSubmit}>
                <div className="input-with-label">
                    <label
                        htmlFor="email"
                        className="label"
                    >
                        email:
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className='oneLine'>
                    <Button
                        text={"Request new password"}
                        loading={submitStatus}
                        disabled={submitStatus}
                    />
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
