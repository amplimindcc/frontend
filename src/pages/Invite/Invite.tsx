import './Invite.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import * as jose from 'jose';

const Invite = () => {
    const [token, setToken] = useState('');
    const [date, setDate] = useState('');
    const [dateValid, setDateValid] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();
    //const params = useParams();
    //const { token } = params;

    // all token related functions will be redone later
    const generateFakeToken = async (date: string) => {
        const fakeToken = await new jose.UnsecuredJWT({ date }).encode();

        setToken(fakeToken);
        return fakeToken;
    };

    const generateAndDecryptFakeToken = async () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);

        const fakeToken = await generateFakeToken(date.toDateString());
        const { payload } = await jose.UnsecuredJWT.decode(fakeToken);
        const dateFromToken = payload.date as string;
        -setDate(dateFromToken);

        return dateFromToken;
    };

    const checkDate = async () => {
        const dateFromToken = new Date(await generateAndDecryptFakeToken());
        const currentDate = new Date();
        setDateValid(dateFromToken > currentDate);

        return dateFromToken > currentDate;
    };

    const checkRegistered = async () => {
        // check with call to backend if user password is already set
    };

    const init = async () => {
        const valid = await checkDate();

        if (valid) {
            // if date is valid, check if user is already registered
            // if user is not registered, display registration form
            // if user is registered, check if user is logged in
            // if user is not logged in, display login form
            if (registered && !loggedIn) {
                navigate('/login');
            }
        } else {
            // if date is not valid, display error message
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="center">
            Token: {token}
            <br />
            Date: {date}
            <br />
            Date validity: {dateValid ? 'Valid' : 'Invalid'}
            <br />
            <Register display={dateValid && !registered} />
        </div>
    );
};

export default Invite;
