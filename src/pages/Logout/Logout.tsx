import './Logout.css';
import user from '../../services/user';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import serviceHelper from '../../services/serviceHelper';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res: Response = await user.logout();
            if (res.status === 403) {
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
            <button onClick={logout}>Logout</button>
        </div>
    );
}