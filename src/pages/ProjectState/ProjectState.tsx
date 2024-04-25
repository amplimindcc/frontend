import './ProjectState.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthProps from '../../interfaces/AuthProps';
import serviceHelper from '../../services/serviceHelper';

export default function ProjectState({ authenticated }: AuthProps) {
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

    const isProjectReviewed = () => {
        // TODO: get project state from backend
        return false;
    };

    return (
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
    );
}
