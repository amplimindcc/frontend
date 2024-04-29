import './Logout.css';
import user from '../../services/user';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import Button from '../../components/Button/Button';

export default function Logout() {

    const logout = async () => {
        try {
            const res: Response = await user.logout();
            if (res.status === 403) {
                toast.showToast(ToastType.SUCCESS, 'Logout successful');
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