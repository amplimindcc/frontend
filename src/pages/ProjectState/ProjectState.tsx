import { useEffect, useState } from 'react';
import './ProjectState.css';
import serviceHelper from '../../services/serviceHelper';
import { useNavigate } from 'react-router-dom';

export default function ProjectState() {
    const navigate = useNavigate();
    const [projectReviewed, setProjectReviewed] = useState<Boolean | null>(
        null
    );

    useEffect(() => {
        const getSubmissionState = async () => {
            const res = await serviceHelper.getSubmissionStatus();

            if (res !== null) {

                if (res.submissionStates === 'INIT') {
                    navigate('/project/start');
                }

                if (res.submissionStates === 'IN_IMPLEMENTATION') {
                    navigate('/project/commit');
                }

                if (res.submissionStates === 'SUBMITTED') {
                    setProjectReviewed(false);
                }

                if (res.submissionStates === 'REVIEWED') {
                    setProjectReviewed(true);
                }
            }
        };
        getSubmissionState();
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
