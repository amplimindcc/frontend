import './ProjectStart.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import serviceHelper from '../../services/serviceHelper';
import project from '../../services/project';
import LoaderPage from '../../components/LoaderPage/LoaderPage';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';

const ProjectStart = () => {
    const navigate = useNavigate();
    const [expired, setExpired] = useState<Boolean | null>(null);

    useEffect(() => {
        document.title = 'Coding - Start your Challenge';

        const getSubmissionStatus = async () => {
            const res = await serviceHelper.getSubmissionStatus();

            if(res !== null) {
                if(res.isExpired) {
                    setExpired(true);
                }
                else {
                    if(res.isStarted) {
                        navigate('/project/commit');
                    }

                    setExpired(false);
                }
            }
        }
        getSubmissionStatus();
    }, []);

    const handleClick = async () => {
        try {
            const res = await project.getSingleUserProject();

            if(res.ok) {
                navigate('/project/commit');
            }
            else {
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, 'Not authenticated.')
                );
            }
        }
        catch(err) {
            toast.showToast(
                ToastType.ERROR,
                'Connection error. Try again later.'
            );
        }
    };

    return (
        <>
            {
                expired === null ? (
                    <LoaderPage />
                ) : expired ? (
                    <div>
                        <h1>Challenge has expired</h1>
                        <p>Sorry, the challenge has expired. Contact an admin to start a new challenge.</p>
                    </div>
                ) : (
                    <div>
                        <h2>Willkommen zu deiner Coding Challenge</h2>
                        <div>
                            Wenn du auf den Startknopf drückst, startet die Challenge
                            und du hast 3 Tage Zeit, um die Aufgabe zu lösen.
                        </div>
                        <div className="start-button">
                            <Button text={'Start'} handleClick={handleClick} />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ProjectStart;
