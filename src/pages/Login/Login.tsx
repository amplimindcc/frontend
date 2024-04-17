import { useState } from 'react';
import user from '../../services/user';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mapEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const mapPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await user.login(email, password);
        console.log(res);
    };

    return (
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="email">email:</label>
                    <input type="text" name="email" value={email} onChange={mapEmail}></input>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">password:</label>
                    <input type="password" name="password" value={password} onChange={mapPassword}></input>
                </div>
                <button type="submit" className="login-button">login</button>
            </form>
        </div>
    );
};

export default Login;