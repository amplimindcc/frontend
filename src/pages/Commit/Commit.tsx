import { useState } from 'react';
import './Commit.css';

const Commit = () => {
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
                } else {
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
        if (e.target.value.endsWith('.zip')) setFilePath(e.target.value);
    };

    const mapLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLanguage(e.target.value);
    }

    const mapVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVersion(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('filePath:', filePath); // remove later
        console.log('optional Message: ', optionalChat);
    };

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
                <br />
                <div className='oneLine'>
                    <label htmlFor='version'>Version: </label>
                    <input name='version' type="text" value={version} onChange={mapVersion} />
                </div>
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
                    type="file"
                    value={filePath}
                    onChange={mapFilePath}
                    accept=".zip"
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Commit;
