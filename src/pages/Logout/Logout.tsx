import './Logout.css';
import user from '../../services/user';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import HttpStatusCode from '../../interfaces/HttpStatusCode';

export default function Logout() {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res: Response = await user.logout();
            if (res.status === HttpStatusCode.FORBIDDEN) {
                toast.showToast(ToastType.SUCCESS, 'Logout successful');
                navigate('/login');
            }
            else {
                toast.showToast(ToastType.ERROR, toast.httpError(res.status, 'Logout failed'));
            }
        }
        catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    };

    return (
        <div className="logout">
            <h1>Logout</h1>
            <Button text='Logout' handleClick={logout} />
        </div>
    );
}