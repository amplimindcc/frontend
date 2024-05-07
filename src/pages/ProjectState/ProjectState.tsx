import { useTranslation } from 'react-i18next';
import './ProjectState.css';

export default function ProjectState() {
    const { t } = useTranslation('userProject');

    const isProjectReviewed = () => {
        // TODO: get project state from backend
        return false;
    };

    return (
        <>
            {!isProjectReviewed() && (
                <>
                    <p>{t('projectInReview')}</p>
                    <img
                        className="state-image"
                        src="src/assets/hourglass-half-regular.svg"
                    />
                    <p>{t('projectContactYou')}</p>
                </>
            )}

            {isProjectReviewed() && (
                <>
                    <p>{t('projectReviewDone')}</p>
                    <img
                        className="state-image"
                        src="src/assets/check-solid.svg"
                    />
                    <p>{t('projectContactYou')}</p>
                </>
            )}
        </>
    );
}
