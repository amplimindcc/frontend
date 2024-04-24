import './Invite.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import user from '../../services/user';

const Invite = () => {
    const [token, setToken] = useState('');
    const [date, setDate] = useState('');
    const [dateValid, setDateValid] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();
    //const params = useParams();
    //const { token } = params;


    const checkDate = async () => {
    };

    const init = async () => {
    };

    useEffect(() => {
        init();

        const checkLogin = async () => {
            const res = await user.authenticated();

            if(res.ok) {
                navigate('/commit');
            }
        };
        checkLogin();
    }, []);

    return (
        <div className="center">
            Token: {token}
            <br />
            Date: {date}
            <br />
            Date validity: {dateValid ? 'Valid' : 'Invalid'}
            <br />
        </div>
    );
};

export default Invite;
