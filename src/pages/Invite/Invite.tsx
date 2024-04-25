import './Invite.css';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import user from '../../services/user';
import Register from './components/Register';
import serviceHelper from '../../services/serviceHelper';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';

const Invite = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { token } = params;

    if(token === null) {
        navigate('/login');
    }

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();

                if(res.ok) {
                    await serviceHelper.routeBasedOnRole(navigate);
                }
            }
            catch(err) {
                toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
            }
        };
        checkLogin();
    }, []);

    return (
        <div className="center">
            <Register />
        </div>
    );
};

export default Invite;
