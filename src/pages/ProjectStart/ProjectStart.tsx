import './ProjectStart.css';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button/Button";
import Loader from '../../components/Loader/Loader';

const ProjectStart = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/project/commit');
    };

    return (
        <div>
            <h2>Willkommen zu deiner Coding Challenge</h2>
            <div>
                Wenn du auf den Startknopf drückst, startet die Challenge und du hast 3 Tage Zeit, um die Aufgabe zu lösen.
            </div>
            <div className="start-button">
                <Button text={"Start"} handleClick={handleClick}/>
            </div>
        </div>
    );
};

export default ProjectStart;
