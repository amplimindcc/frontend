import { useState } from 'react';
import './Username.css';

const Username = () => {
    const [username, setUsername] = useState('');

    return (
        <div>
            <p>Your username is: {username}</p>
            <p>
                <span>You can get back to this site via: </span>
                <a rel="stylesheet" href="http://localhost:5173/username">
                    http://localhost:5173/username
                </a>
                <span> at any time.</span>
            </p>
            <button>Continue</button>
        </div>
    );
};

export default Username;
