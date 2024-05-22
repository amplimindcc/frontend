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

const ProjectStart = () => {
    const { t } = useTranslation(['userProject', 'main']);

    const navigate = useNavigate();
    const [expired, setExpired] = useState<boolean | null>(null);

    useEffect(() => {
        document.title = t('title');

        const getSubmissionStatus = async () => {
            const res = await serviceHelper.getSubmissionStatus();

            if (res !== null) {
                console.log(res);
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
                <div data-testid="project-start">
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
