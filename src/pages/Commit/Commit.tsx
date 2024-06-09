import './Commit.css';
import { useEffect, useState } from 'react';
import ErrorComponent from '../../components/Error/Error';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import Button from '../../components/Button/Button';
import serviceHelper from '../../services/serviceHelper';
import LoaderPage from '../../components/LoaderPage/LoaderPage';
import { useTranslation } from 'react-i18next';
import submission from '../../services/submission';
import { StatusCodes } from 'http-status-codes';
import project from '../../services/project';
import { useNavigate } from 'react-router-dom';

const Commit = () => {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['userProject', 'main']);

    // States
    /**
     * useNavigate hook
     * @author Steven Burger
     *
     * @type {NavigateFunction}
     */
        const navigate = useNavigate();
    /**
     * State for the intro text
     * @author Matthias Roy
     *
     * @type string
     */
    const [introText, setIntroText] = useState<string>('');
    /**
     * State for the exercise text
     * @author Matthias Roy
     *
     * @type string
     */
    const [exerciseText, setExerciseText] = useState<string>('');
    /**
     * State for the optional chat input field
     * @author Matthias Roy
     *
     * @type {string}
     */
    const [optionalChat, setOptionalChat] = useState<string>('');
    /**
     * State for the file input field
     * @author Matthias Roy
     *
     * @type {File | null}
     */
    const [file, setFile] = useState<File | null>(null);
    /**
     * State for the language input field
     * @author Matthias Roy
     *
     * @type {string}
     */
    const [language, setLanguage] = useState<string>('');
    /**
     * State for the version input field
     * @author Matthias Roy
     *
     * @type {string}
     */
    const [version, setVersion] = useState<string>('');
    /**
     * State for the error messages of the input fields
     * @author Matthias Roy
     *
     * @typedef {Object} Error
     * @property {string} message
     * @property {boolean} valid
     */
    const [errors, setErrors] = useState({
        language: {
            message: '',
            valid: false,
        },
        version: {
            message: '',
            valid: false,
        },
        filePath: {
            message: '',
            valid: false,
        },
    });
    /**
     * State for the loading spinner
     * @author Matthias Roy
     *
     * @type {boolean}
     */
    const [loading, setLoading] = useState(false);
    /**
     * State for the form validation
     * @author Matthias Roy
     *
     * @type {boolean}
     */
    const [valid, setValid] = useState(false);
    /**
     * State for the submission status
     * @author Matthias Roy
     *
     * @type {boolean | null}
     */
    const [expired, setExpired] = useState<boolean | null>(null);

    useEffect(() => {
        document.title = t('title');

        /**
         * Get the submission status from the backend and set the expired state accordingly.
         * @author Matthias Roy
         *
         * @async
         * @returns {void}
         */
        const getSubmissionStatus = async () => {
            try {
                const res = await serviceHelper.getSubmissionStatus();

                if (res !== null) {
                    if (res.isExpired) {
                        setExpired(true);
                    }
                    else {
                        if(res.submissionStates === 'SUBMITTED' || res.submissionStates === 'REVIEWED') {
                            navigate('/project/status');
                        }
                        setExpired(false);
                    }
                }
            } catch (e: unknown) {
                if (e instanceof Error)
                    toast.showToast(ToastType.ERROR, e.message);
            }
        };
        getSubmissionStatus();

        const getProjectInformation = async () => {
            try {
                const res = await project.getSingleUserProject();

                if (res !== null) {
                    if (res.ok) {
                        const data = await res.json();
                        setIntroText(data.title);
                        setExerciseText(data.description);
                    } else {
                        toast.showToast(
                            ToastType.ERROR,
                            t('errorMessageFetchProjectDetails')
                        );
                    }
                }
            } catch (e: unknown) {
                if (e instanceof Error)
                    toast.showToast(ToastType.ERROR, e.message);
            }
        };
        getProjectInformation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Validate the input values of the input fields and set the error messages and the valid state accordingly.
     * @author Matthias Roy
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const validateInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newError = { ...errors };

        switch (e.target.name) {
            case 'language':
                if (e.target.value.length == 0) {
                    newError.language.message = t('emptyInput');
                    newError.language.valid = false;
                } else {
                    newError.language.message = '';
                    newError.language.valid = true;
                }
                break;
            case 'version':
                if (e.target.value.length == 0) {
                    newError.version.message = t('emptyInput');
                    newError.version.valid = false;
                } else {
                    newError.version.message = '';
                    newError.version.valid = true;
                }
                break;
            case 'filePath':
                if (e.target.value.length == 0) {
                    newError.filePath.message = t('noFile');
                    newError.filePath.valid = false;
                } else if (!e.target.value.endsWith('.zip')) {
                    newError.filePath.message = t('noValidFile');
                    newError.filePath.valid = false;
                } else {
                    newError.filePath.message = '';
                    newError.filePath.valid = true;
                }
                break;
        }

        setErrors(newError);

        if (
            newError.language.valid &&
            newError.version.valid &&
            newError.filePath.valid
        )
            setValid(true);
        else setValid(false);
    };

    /**
     * Map the optional chat input field to the state variable optionalChat
     * @author Matthias Roy
     *
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e
     */
    const mapOptionalChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOptionalChat(e.target.value);
    };

    /**
     * Map the file input field to the state variable file and validate the input value
     * @author Matthias Roy
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const mapFilePath = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        if (e.target.value.endsWith('.zip'))
            if (e.target.files && e.target.files.length > 0)
                setFile(e.target.files[0]);
    };

    /**
     * Map the language input field to the state variable language and validate the input value
     * @author Matthias Roy
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const mapLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        setLanguage(e.target.value);
    };

    /**
     * Map the version input field to the state variable version and validate the input value
     * @author Matthias Roy
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const mapVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        setVersion(e.target.value);
    };

    /**
     * Handle form submission
     * @author Matthias Roy
     * @author David Linhardt
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e
     * @returns {void}
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (valid) {
            try {
                const res = await submission.sendSubmission(
                    language,
                    version,
                    file,
                    optionalChat
                );

                switch (res.status) {
                    case StatusCodes.OK:
                        toast.showToast(ToastType.SUCCESS, t('successSubmission'));
                        navigate('/project/status');
                        break;
                    case StatusCodes.FORBIDDEN:
                        toast.showToast(ToastType.ERROR, t('errorZIPBombDetected'));
                        break;
                    case StatusCodes.CONFLICT:
                        toast.showToast(ToastType.ERROR, t('errorAlreadySubmitted'));
                        break;
                    case StatusCodes.GONE:
                        toast.showToast(ToastType.ERROR, t('errorSubmissionExpired'));
                        break;
                    case StatusCodes.UNPROCESSABLE_ENTITY:
                        toast.showToast(ToastType.ERROR, t('errorNoREADME'));
                        break;
                    case StatusCodes.SERVICE_UNAVAILABLE:
                        toast.showToast(ToastType.ERROR, t('errorZIPFileTooLarge'));
                        break;
                    default:
                        toast.showToast(ToastType.ERROR, t('errorSubmissionFailed'));
                        break;
                }
                setLoading(false);
            }
            catch (error) {
                toast.showToast(
                    ToastType.ERROR,
                    t('connectionError', { ns: 'main' })
                );
                setLoading(false);
            }
        }
        else {
            toast.showToast(
                ToastType.ERROR,
                createErrorMessageInvalidSubmit(),
                2500
            );
            setLoading(false);
        }
    };

    /**
     * Create the error message for the invalid submit form and return it as JSX element
     * @author Matthias Roy
     *
     * @returns {JSX.Element}
     */
    const createErrorMessageInvalidSubmit = (): JSX.Element => {
        return (
            <div>
                <p>{t('errorMessageHeader')}</p>
                <ul>
                    {errors.language.valid === false ? (
                        <li>{t('errorMessageLanguage')}</li>
                    ) : null}
                    {errors.version.valid === false ? (
                        <li>{t('errorMessageVersion')}</li>
                    ) : null}
                    {errors.filePath.valid === false ? (
                        <li>{t('errorMessageFilePath')}</li>
                    ) : null}
                </ul>
            </div>
        );
    };

    return (
        <>
            {expired === null ? (
                <LoaderPage />
            ) : expired ? (
                <div className="center">
                    <h1>{t('expiredTitle')}</h1>
                    <p>{t('expiredText')}</p>
                </div>
            ) : (
                <div className="center">
                    <div className="card commit-card">
                        <h3>{t('introHeader')}</h3>
                        <p>{introText}</p>
                        <br />
                        <h3>{t('exerciseHeader')}</h3>
                        <p className='description'>{exerciseText}</p>
                        <br />
                        <form onSubmit={handleSubmit} data-testid="commit-form">
                            <div className="oneLine">
                                <label htmlFor="language">
                                    {t('languageLabel')}
                                    <span className="required">*</span>:{' '}
                                </label>
                                <input
                                    id="language"
                                    name="language"
                                    type="text"
                                    value={language}
                                    onChange={mapLanguage}
                                    className="input"
                                />
                            </div>
                            <ErrorComponent text={errors.language.message} />
                            <br />
                            <div className="oneLine">
                                <label htmlFor="version">
                                    {t('versionLabel')}
                                    <span className="required">*</span>:{' '}
                                </label>
                                <input
                                    id="version"
                                    name="version"
                                    type="text"
                                    value={version}
                                    onChange={mapVersion}
                                    className="input"
                                />
                            </div>
                            <ErrorComponent text={errors.version.message} />
                            <h3>{t('optionalChatLabel')}</h3>
                            <textarea
                                className="optionalMessage"
                                data-testid="optionalMessage"
                                value={optionalChat}
                                rows={4}
                                cols={40}
                                onChange={mapOptionalChat}
                            />
                            <br />
                            <h4>
                                {t('uploadExerciseLabel')}
                                <span className="required">*</span>:
                            </h4>
                            <input
                                data-testid="fileUpload"
                                name="filePath"
                                type="file"
                                onChange={mapFilePath}
                                accept=".zip"
                            />
                            <ErrorComponent text={errors.filePath.message} />
                            <br />
                            <div className="commit-button">
                                <Button
                                    text={t('uploadButtonText')}
                                    loading={loading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Commit;
