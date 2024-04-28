import './ProjectStart.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from "../../components/Button/Button";
import serviceHelper from '../../services/serviceHelper';
import user from '../../services/user';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Loader from '../../components/Loader/Loader';

const ProjectStart = () => {
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

    const handleClick = () => {
        navigate('/project/commit');
    };

    return (
        <>
            {
                authenticated === null ? (
                    <Loader height={32} width={32} borderWidth={5}/>
                ) : (
                    <div>
                        <h2>Willkommen zu deiner Coding Challenge</h2>
                        <div>
                            Wenn du auf den Startknopf drückst, startet die Challenge und du hast 3 Tage Zeit, um die Aufgabe zu lösen.
                        </div>
                        <div className="start-button">
                            <Button text={"Start"} handleClick={handleClick}/>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ProjectStart;
