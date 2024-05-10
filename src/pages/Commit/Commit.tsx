import './Commit.css';
import { useEffect, useState } from 'react';
import Error from '../../components/Error/Error';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import Button from '../../components/Button/Button';
import serviceHelper from '../../services/serviceHelper';
import LoaderPage from '../../components/LoaderPage/LoaderPage';
import submission from '../../services/submission';
import { StatusCodes } from 'http-status-codes';

const Commit = () => {
    const introText = 'Das ist ein Beispiel-Text';
    const exerciseText = 'Ein Text';
    const [optionalChat, setOptionalChat] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

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

    const [loading, setLoading] = useState(false);

    const [valid, setValid] = useState(false);

    const [expired, setExpired] = useState<Boolean | null>(null);

    useEffect(() => {
        document.title = 'Coding - Submit your Challenge';

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
                    newError.language.message = 'Input contains no value.';
                    newError.language.valid = false;
                } else {
                    newError.language.message = '';
                    newError.language.valid = true;
                }
                break;
            case 'version':
                if (e.target.value.length == 0) {
                    newError.version.message = 'Input contains no value.';
                    newError.version.valid = false;
                } else {
                    newError.version.message = '';
                    newError.version.valid = true;
                }
                break;
            case 'filePath':
                if (e.target.value.length == 0) {
                    newError.filePath.message = 'No file selected.';
                    newError.filePath.valid = false;
                } else if (!e.target.value.endsWith('.zip')) {
                    newError.filePath.message = 'No valid file selected.';
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
        if (e.target.value.endsWith('.zip'))
            if (e.target.files && e.target.files.length > 0)
                setFile(e.target.files[0]);
    };

    const mapLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        setLanguage(e.target.value);
    };

    const mapVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        setVersion(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (valid) {
            try {
                const res = await submission.sendSubmission(language, version, file, optionalChat);

                if (res.ok) {
                    toast.showToast(ToastType.SUCCESS, 'Submission successful');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }
                else if (res.status === StatusCodes.CONFLICT) {
                    toast.showToast(ToastType.ERROR, 'Submission expired.');
                    setLoading(false);
                }
                else {
                    toast.showToast(ToastType.ERROR, 'Submission failed. Try again.');
                    setLoading(false);
                }
            } catch (error) {
                toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
                setLoading(false);
            }
        } else {
            toast.showToast(
                ToastType.ERROR,
                createErrorMessageInvalidSubmit(),
                2500
            );
            setLoading(false);
        }
    };

    const createErrorMessageInvalidSubmit = () => {
        return (
            <div>
                <p>Submition failed. Required fields are not filled:</p>
                <ul>
                    { errors.language.valid === false ? <li>Language field is empty!</li> : null }
                    { errors.version.valid === false ? <li>Version field is empty!</li> : null }
                    { errors.filePath.valid === false ? <li>No file to upload selected!</li> : null }
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
                        <h1>Challenge has expired</h1>
                        <p>Sorry, the challenge has expired. Contact an admin to start a new challenge.</p>
                    </div>
                ) : (
                    <div>
                        <h3>Intro:</h3>
                        <p>{introText}</p>
                        <br />
                        <h3>Exercise:</h3>
                        <p>{exerciseText}</p>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="oneLine">
                                <label htmlFor="language">Programming language<span className='required'>*</span>: </label>
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
                                <label htmlFor="version">Version<span className='required'>*</span>: </label>
                                <input
                                    name="version"
                                    type="text"
                                    value={version}
                                    onChange={mapVersion}
                                />
                            </div>
                            <Error text={errors.version.message} />
                            <h3>Optional Chat:</h3>
                            <textarea
                                value={optionalChat}
                                rows={4}
                                cols={40}
                                onChange={mapOptionalChat}
                            />
                            <br />
                            <h4>Upload your exercise<span className='required'>*</span>:</h4>
                            <input
                                name="filePath"
                                type="file"
                                onChange={mapFilePath}
                                accept=".zip"
                            />
                            <Error text={errors.filePath.message} />
                            <br />
                            <Button text='Upload' loading={loading} />
                        </form>
                    </div>
                )
            }
        </>
    );
};

export default Commit;
