import './ProjectState.css';

export default function ProjectState() {
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
