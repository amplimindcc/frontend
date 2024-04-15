import { useState } from 'react';
import user from '../../services/user';
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const mapUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const mapPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await user.login(username, password);
        console.log(res);
    };

    return (
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">username:</label>
                    <input type="text" name="username" value={username} onChange={mapUsername}></input>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="username">password:</label>
                    <input type="password" name="password" value={password} onChange={mapPassword}></input>
                </div>
                <button type="submit" className="login-button">login</button>
            </form>
        </div>
    );
};

export default Login;