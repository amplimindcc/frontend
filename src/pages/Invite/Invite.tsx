import './Invite.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import user from '../../services/user';
import Register from './components/Register';

const Invite = () => {
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
            <Register />
        </div>
    );
};

export default Invite;
