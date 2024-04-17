import { useState } from 'react';
import './Commit.css';

const Commit = () => {
    const introText = 'Das ist ein Beispiel-Text';
    const exerciseText = '';
    const [optionalChat, setOptionalChat] = useState<string>('');
    const [filePath, setFilePath] = useState<string>('');

    const mapOptionalChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOptionalChat(e.target.value);
    };

    const mapFilePath = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.endsWith(".zip"))
            setFilePath(e.target.value);
    };

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
                <h3>Optional Chat:</h3>
                <textarea
                    value={optionalChat}
                    rows={4}
                    cols={40}
                    onChange={mapOptionalChat}
                />
                <br />
                <h4>Upload your exercise:</h4>
                <input type="file" value={filePath} onChange={mapFilePath} accept='.zip' />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Commit;
