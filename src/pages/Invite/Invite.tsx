import './Invite.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Register from './components/Register';
import * as jose from 'jose';

const Invite = () => {
    const [token, setToken] = useState('');
    const [date, setDate] = useState('');

    //const params = useParams();
    //const { token } = params;

    const generateFakeToken = async (date: string) => {
        const fakeToken = await new jose.UnsecuredJWT({ date })
            .encode();
            
        setToken(fakeToken);
        return fakeToken;
    };

    const generateAndDecryptFakeToken = async () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);

        const fakeToken = await generateFakeToken(date.toDateString());
        const { payload } = await jose.UnsecuredJWT.decode(fakeToken);
        const dateFromToken = payload.date as string;
-
        setDate(dateFromToken);
    };

    useEffect(() => {
        generateAndDecryptFakeToken();
    }, []);

    return (
        <div className="center">
            Token: {token}
            <br/>
            Date: {date}
            <Register />
        </div>
    );
};

export default Invite;