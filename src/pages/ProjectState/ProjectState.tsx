import './ProjectState.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceHelper from '../../services/serviceHelper';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import user from '../../services/user';
import Loader from '../../components/Loader/Loader';

export default function ProjectState() {
    const [authenticated, setAuthenticated] = useState<Boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();
                if(!res.ok) {
                    navigate('/login');
                }
                else {
                    serviceHelper.routeAdmin(navigate, '/admin');
                }
                setAuthenticated(res.ok);
            }
            catch(err) {
                toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
                setAuthenticated(false);
            }
        };
        checkLogin();
    }, []);

    const isProjectReviewed = () => {
        // TODO: get project state from backend
        return false;
    };

    return (
        <>
        {
            authenticated === null ? (
                <Loader height={32} width={32} borderWidth={5}/>
            ) : (
                <>
                    {!isProjectReviewed() && (
                        <>
                            <p>Deine Aufgabe wird aktuell geprüft.</p>
                            <img
                                className="state-image"
                                src="src/assets/hourglass-half-regular.svg"
                            />
                            <p>Wir melden uns bei Dir.</p>
                        </>
                    )}

                    {isProjectReviewed() && (
                        <>
                            <p>Dein Code wurde bewertet.</p>
                            <img
                                className="state-image"
                                src="src/assets/check-solid.svg"
                            />
                            <p>Wir melden uns bei Dir.</p>
                        </>
                    )}
                </>
            )
        }
    </>
    );
}
