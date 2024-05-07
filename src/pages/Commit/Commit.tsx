import './Commit.css';
import { useEffect, useState } from 'react';
import Error from '../../components/Error/Error';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import Button from '../../components/Button/Button';
import serviceHelper from '../../services/serviceHelper';
import LoaderPage from '../../components/LoaderPage/LoaderPage';
import { useTranslation } from 'react-i18next';

const Commit = () => {
    const { t } = useTranslation('userProject');

    const introText = 'Das ist ein Beispiel-Text';
    const exerciseText = 'Ein Text';
    const [optionalChat, setOptionalChat] = useState<string>('');
    const [filePath, setFilePath] = useState<string>('');

    const [language, setLanguage] = useState<string>('');
    const [version, setVersion] = useState<string>('');

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

    const [valid, setValid] = useState(false);

    const [expired, setExpired] = useState<Boolean | null>(null);

    useEffect(() => {
        document.title = t('title');

        const getSubmissionStatus = async () => {
            const res = await serviceHelper.getSubmissionStatus();

            if(res !== null) {
                if(res.isExpired) {
                    setExpired(true);
                }
                else {
                    setExpired(false);
                }
            }
        }
        getSubmissionStatus();
    }, []);

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

    const mapOptionalChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOptionalChat(e.target.value);
    };

    const mapFilePath = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        if (e.target.value.endsWith('.zip')) setFilePath(e.target.value);
    };

    const mapLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        setLanguage(e.target.value);
    };

    const mapVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        setVersion(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (valid) {
            console.log('submit');
        } else {
            toast.showToast(
                ToastType.ERROR,
                createErrorMessageInvalidSubmit(),
                2500
            );
        }
    };

    const createErrorMessageInvalidSubmit = () => {
        return (
            <div>
                <p>{t('errorMessageHeader')}</p>
                <ul>
                    { errors.language.valid === false ? <li>{t('errorMessageLanguage')}</li> : null }
                    { errors.version.valid === false ? <li>{t('errorMessageVersion')}</li> : null }
                    { errors.filePath.valid === false ? <li>{t('errorMessageFilePath')}</li> : null }
                </ul>
            </div>
        )
    };

    return (
         <>
            {
                expired === null ? (
                    <LoaderPage />
                ) : expired ? (
                    <div>
                        <h1>{t('expiredTitle')}</h1>
                        <p>{t('expiredText')}</p>
                    </div>
                ) : (
                    <div>
                        <h3>{t('introHeader')}</h3>
                        <p>{introText}</p>
                        <br />
                        <h3>{t('exerciseHeader')}</h3>
                        <p>{exerciseText}</p>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="oneLine">
                                <label htmlFor="language">{t('languageLabel')}<span className='required'>*</span>: </label>
                                <input
                                    name="language"
                                    type="text"
                                    value={language}
                                    onChange={mapLanguage}
                                />
                            </div>
                            <Error text={errors.language.message} />
                            <br />
                            <div className="oneLine">
                                <label htmlFor="version">{t('versionLabel')}<span className='required'>*</span>: </label>
                                <input
                                    name="version"
                                    type="text"
                                    value={version}
                                    onChange={mapVersion}
                                />
                            </div>
                            <Error text={errors.version.message} />
                            <h3>{t('optionalChatLabel')}</h3>
                            <textarea
                                value={optionalChat}
                                rows={4}
                                cols={40}
                                onChange={mapOptionalChat}
                            />
                            <br />
                            <h4>{t('uploadExerciseLabel')}<span className='required'>*</span>:</h4>
                            <input
                                name="filePath"
                                type="file"
                                value={filePath}
                                onChange={mapFilePath}
                                accept=".zip"
                            />
                            <Error text={errors.filePath.message} />
                            <br />
                            <Button text={t('uploadButtonText')} />
                        </form>
                    </div>
                )
            }
     </>
    );
};

export default Commit;
