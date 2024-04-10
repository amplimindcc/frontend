import './Invite.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Register from './components/Register';
import * as jose from 'jose';

const Invite = () => {
    const [token, setToken] = useState('');

    //const params = useParams();
    //const { token } = params;

    const secretKey = new TextEncoder().encode(
        'secretKey',
    );

    const generateFakeToken = async (payload: Date) => {
        const fakeToken = await new jose.SignJWT({ payload })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secretKey);
        setToken(fakeToken);
    };

    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + 3);

        generateFakeToken(date);
    }, []);

    return (
        <div>
            Token: {token}
            <Register />
        </div>
    );
};

export default Invite;