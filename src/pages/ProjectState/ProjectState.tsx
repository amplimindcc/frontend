import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './ProjectState.css';
import serviceHelper from '../../services/serviceHelper';
import { useNavigate } from 'react-router-dom';
import submission from '../../services/submission';
import { StatusCodes } from 'http-status-codes';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import useInterval from '../../hooks/useInterval';

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
    /**
     * Paused state for useInterval hook
     * @author David Linhardt
     *
     * @type {boolean}
     */
    const [paused, setPaused] = useState<boolean>(false);
    /**
     * Linter result state
     * @author David Linhardt
     *
     * @type {string | null}
     */
    const [linterResult, setLinterResult] = useState<string | null>(null);

    // Functions
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
                setPaused(true);
            }
        }
    };
    /**
     * Get the linter result from the backend and set the linter result state accordingly.
     * @author David Linhardt
     *
     * @async
     * @returns {void}
     */
    const setLinterResultState = async () => {
        if( projectReviewed === null || !projectReviewed) return;
        try {
            const res = await submission.getLinterResult();

            switch (res.status) {
                case StatusCodes.OK:
                    setLinterResult((await res.json()).result);
                    break;
                default:
                    setLinterResult(null);
                    break;
            }
        } catch (err) {
            setLinterResult(null);
            toast.showToast(ToastType.ERROR, t('connectionError', { ns: 'main'}));
        }
    };

    useEffect(() => {
        getSubmissionState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(projectReviewed === null || !projectReviewed) {
            setLinterResult(null);
        }
        setLinterResultState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectReviewed, t]);

    // polling submission state every 30 seconds
    useInterval(() => {
        getSubmissionState();
    }, 30000, paused);

    return (
        <div className="project-state-container center" data-testid="project-state">
            {!projectReviewed && (
                <div data-testid="project-in-review">
                    <p>{t('projectInReview')}</p>
                    <img
                        className="state-image"
                        src="/src/assets/hourglass-half-regular.svg"
                    />
                    <p>{t('projectContactYou')}</p>
                </div>
            )}

            {projectReviewed && (
                <div data-testid="project-reviewed">
                    <p>{t('projectReviewDone')}</p>
                    <img
                        className="state-image"
                        src="/src/assets/check-solid.svg"
                    />
                    <p>{t('projectContactYou')}</p>
                </div>
            )}

            { (linterResult !== null) ? (
                <details data-testid="linter-result">
                    <summary>{t('linterResult')}</summary>
                    <code>
                        <pre className='pre'>
                            {linterResult}
                        </pre>
                    </code>
                </details>
            ) : null}
        </div>
    );
}
