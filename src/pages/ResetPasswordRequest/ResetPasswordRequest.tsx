import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import user from '../../services/user';
import './ResetPasswordRequest.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation(['resetPassword', 'main']);

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
                toast.showToast(ToastType.ERROR, t('errorInvalidEmail'));
                setSubmitStatus(false);
            }
            else {
                toast.showToast(ToastType.SUCCESS, t('successRequest'));
                setTimeout(() => {
                    setSubmitStatus(false);
                    navigate('/login');
                }, 2000);
            }
        }
        catch(err) {
            toast.showToast(ToastType.ERROR, t('errorResetPassword'));
            setSubmitStatus(false);
        }
    };

    return (
            <form className="reset-form" onSubmit={handleSubmit}>
                <div className="input-with-label">
                    <label
                        htmlFor="email"
                        className="label"
                    >
                        {t('email', {ns: 'main'})}:
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
                        text={t('buttonRequestNewPassword')}
                        loading={submitStatus}
                        disabled={submitStatus}
                    />
                    <Link to={"/login"}>
                        <button type="button">
                            {t('buttonCancel', {ns: 'main'})}
                        </button>
                    </Link>
                </div>
            </form>
    );
};

export default Login;
