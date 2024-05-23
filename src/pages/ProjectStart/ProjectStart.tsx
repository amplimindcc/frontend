import './ProjectStart.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import serviceHelper from '../../services/serviceHelper';
import project from '../../services/project';
import LoaderPage from '../../components/LoaderPage/LoaderPage';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import { useTranslation } from 'react-i18next';

/**
 * Project Start Page
 * @author Steven Burger
 *
 * @returns {React.ReactNode}
 */
const ProjectStart = () => {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['userProject', 'main']);

    /**
     * useNavigate hook
     * @author Steven Burger
     *
     * @type {NavigateFunction}
     */
    const navigate = useNavigate();
    /**
     * Expired state for the project start page
     * @author Steven Burger
     *
     * @type {boolean | null}
     */
    const [expired, setExpired] = useState<boolean | null>(null);

    useEffect(() => {
        document.title = t('title');

        /**
         * Gets the submission status from the backend and sets the expired state accordingly.
         * @author Steven Burger
         *
         * @async
         * @returns {void}
         */
        const getSubmissionStatus = async () => {
            const res = await serviceHelper.getSubmissionStatus();

            if (res !== null) {
                if (res.isExpired) {
                    setExpired(true);
                } else {
                    if (res.isStarted) {
                        navigate('/project/commit');
                    }

                    setExpired(false);
                }
            }
        };
        getSubmissionStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Handles the click event on the start button and navigates to the commit page if the user is authenticated and the project is not expired, otherwise shows an error toast message.
     * @author Steven Burger
     *
     * @async
     * @returns {void}
     */
    const handleClick = async () => {
        if (!expired) {
            try {
                const res = await project.getSingleUserProject();

                if (res.ok) {
                    navigate('/project/commit');
                } else {
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(
                            res.status,
                            t('notAuthenticated', { ns: 'main' })
                        )
                    );
                }
            } catch (err) {
                toast.showToast(
                    ToastType.ERROR,
                    t('connectionError', { ns: 'main' })
                );
            }
        } else {
            toast.showToast(ToastType.ERROR, t('expiredTextShort'));
        }
    };

    return (
        <>
            {expired === null ? (
                <LoaderPage />
            ) : expired ? (
                <div>
                    <h1>{t('expiredTitle')}</h1>
                    <p>{t('expiredText')}</p>
                </div>
            ) : (
                <div>
                    <h2>{t('projectStartTitle')}</h2>
                    <div>{t('projectStartText')}</div>
                    <div className="start-button">
                        <Button
                            text={t('buttonStart', { ns: 'main' })}
                            handleClick={handleClick}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectStart;
