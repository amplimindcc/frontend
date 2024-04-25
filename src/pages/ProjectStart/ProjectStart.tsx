import './ProjectStart.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from "../../components/Button/Button";
import AuthProps from '../../interfaces/AuthProps';
import serviceHelper from '../../services/serviceHelper';

const ProjectStart = ({ authenticated }: AuthProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(authenticated !== null) {
            if(!authenticated) {
                navigate('/login');
            }
            else {
                serviceHelper.routeAdmin(navigate, '/admin');
            }
        }
    }, []);

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
