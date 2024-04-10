import './Register.css'
import { useState } from 'react';

interface RegisterProps {
    display: boolean;
}

const Register = ({ display }: RegisterProps) => {
    if(display === null) {
        return null;
    }

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const mapPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const mapPasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRepeat(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <div>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="password">password:</label>
                    <input type="password" name="password"></input>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password-repeat">password repeat:</label>
                    <input type="password" name="password-repeat"></input>
                </div>
                <button type="submit" className="register-button">set password</button>
            </form>
        </div>
    );
};

export default Register;