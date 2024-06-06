import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './ProjectState.css';
import serviceHelper from '../../services/serviceHelper';
import { useNavigate } from 'react-router-dom';

/**
 * Project State Page
 * @author Samuel Hertrich
 *
 * @export
 * @returns {React.ReactNode}
 */
export default function ProjectState() {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation('userProject');

    // Hooks
    /**
     * useNavigate hook
     * @author Samuel Hertrich
     *
     * @type {NavigateFunction}
     */
    const navigate = useNavigate();

    // States
    /**
     * Project reviewed state
     * @author Samuel Hertrich
     *
     * @type {boolean | null}
     */
    const [projectReviewed, setProjectReviewed] = useState<boolean | null>(
        null
    );

    useEffect(() => {
        /**
         * Get the submission state from the backend and navigate to the correct page based on the state.
         * @author Samuel Hertrich
         *
         * @async
         * @returns {void}
         */
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="project-state-container center">
            {!projectReviewed && (
                <>
                    <p>{t('projectInReview')}</p>
                    <img
                        className="state-image"
                        src="/src/assets/hourglass-half-regular.svg"
                    />
                    <p>{t('projectContactYou')}</p>
                </>
            )}

            {projectReviewed && (
                <>
                    <p>{t('projectReviewDone')}</p>
                    <img
                        className="state-image"
                        src="/src/assets/check-solid.svg"
                    />
                    <p>{t('projectContactYou')}</p>
                </>
            )}
        </div>
    );
}
