import { useRef, useState } from 'react';
import './Commit.css'

const Commit = () => {
    const introText = "Das ist ein Beispielintro-Text";
    const exerciseText = "";
    const [optionalChat, setOptionalChat] = useState<string>('');

    const filePath = useRef(null);

    const handleSubmitFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('filePath:', filePath); // remove later
    };

    const handleSubmitChat = (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       var message = e.target.chatMessage.value;
       console.log('Sent message: ', message); // remove later
       if (message != "")
        setOptionalChat(optionalChat + (optionalChat != "" ? "\r\n" : "") + message);
       e.target.chatMessage.value = "";
    }

    return (
        <div>
            <h3>Intro:</h3>
            <p>{introText}</p>
            <br />
            <h3>Exercise:</h3>
            <p>{exerciseText}</p>
            <br />
            <h3>Optional Chat:</h3>
            <textarea value={optionalChat} rows={4} cols={40} readOnly={true} />
            <form onSubmit={handleSubmitChat}>
                <input type='text' name='chatMessage' />
                <button type="submit">Send Message</button>
            </form>
            <br />
            <h4>Upload your exercise:</h4>
            <form onSubmit={handleSubmitFileUpload}>
                <input type='file' ref={filePath} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Commit;