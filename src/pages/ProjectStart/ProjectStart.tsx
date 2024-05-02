import './ProjectStart.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import serviceHelper from '../../services/serviceHelper';

const ProjectStart = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Coding - Start your Challenge';

        const getSubmissionStatus = async () => {
            const res = await serviceHelper.getSubmissionStatus();
            
            if(res !== null) {
                if(res.isStarted) {
                    navigate('/project/commit');
                }
            }
        }
        getSubmissionStatus();
    }, []);

    const handleClick = () => {
        navigate('/project/commit');
    };

    return (
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
    );
};

export default ProjectStart;
