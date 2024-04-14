import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Username.css';

const Username = () => {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    const continueHandler = () => {
        if (loggedIn)
            console.log("logged in") //TODO: navigate to exercise
        else
            navigate('/login');
    };

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
            <button onClick={continueHandler}>Continue</button>
        </div>
    );
};

export default Username;
