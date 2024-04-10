import { useRef } from 'react';
import './Commit.css'

const Commit = () => {
    const introText = "Das ist ein Beispielintro-Text";
    const exerciseText = "";
    const optionalChat = "None";

    const filePath = useRef(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('filePath:', filePath); // remove later
    };

    return (
        <div>
            <h3>Intro:</h3>
            <p>{introText}</p>
            <br />
            <h3>Exercise:</h3>
            <p>{exerciseText}</p>
            <br />
            <h3>Optional Chat:</h3>
            <p>{optionalChat}</p>
            <br />
            <h4>Upload your exercise:</h4>
            <form onSubmit={handleSubmit}>
                <input type='file' ref={filePath} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Commit;