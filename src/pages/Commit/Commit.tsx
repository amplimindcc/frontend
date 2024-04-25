import './Commit.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/Error/Error';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import AuthProps from '../../interfaces/AuthProps';
import serviceHelper from '../../services/serviceHelper';

const Commit = ({ authenticated }: AuthProps) => {
    const navigate = useNavigate();
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

    useEffect(() => {
        if(authenticated !== null) {
            if(!authenticated) {
                navigate('/login');
            }
            else {
                serviceHelper.routeAdmin(navigate, '/admin');
            }
        }
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
                }
                else if (!e.target.value.endsWith('.zip')) {
                    newError.filePath.message = 'No valid file selected.';
                    newError.filePath.valid = false;
                }
                else {
                    newError.filePath.message = '';
                    newError.filePath.valid = true;
                }
                break;
        }

        setErrors(newError);

        if (newError.language.valid && newError.version.valid && newError.filePath.valid)
            setValid(true);
        else
            setValid(false);
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
    }

    const mapVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateInputValues(e);
        setVersion(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (valid) {
            console.log('submit');
        }
        else {
            toast.showToast(ToastType.ERROR, createErrorMessageInvalidSubmit(), 2500)
        }
    };

    const createErrorMessageInvalidSubmit = () => {
        let errorMessage = 'Submition failed. Required fields are not filled:';

        if (!errors.language.valid)
            errorMessage += ' Language field is empty! ';
        if (!errors.version.valid)
            errorMessage += ' Version field is empty! ';
        if (!errors.filePath.valid)
            errorMessage += ' No file to upload selected!';

        return errorMessage;
    }

    return (
        <div>
            <h3>Intro:</h3>
            <p>{introText}</p>
            <br />
            <h3>Exercise:</h3>
            <p>{exerciseText}</p>
            <br />
            <form onSubmit={handleSubmit}>
                <div className='oneLine'>
                    <label htmlFor='language'>Programming language: </label>
                    <input name='language' type="text" value={language} onChange={mapLanguage} />
                </div>
                <Error text={errors.language.message} />
                <br />
                <div className='oneLine'>
                    <label htmlFor='version'>Version: </label>
                    <input name='version' type="text" value={version} onChange={mapVersion} />
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
                <h4>Upload your exercise:</h4>
                <input
                    name='filePath'
                    type="file"
                    value={filePath}
                    onChange={mapFilePath}
                    accept=".zip"
                />
                <Error text={errors.filePath.message} />
                <br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Commit;
