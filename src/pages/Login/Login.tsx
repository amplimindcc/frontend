import { useState } from 'react';
import './Login.css'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <form className="login-form">
                <div className="input-wrapper">
                    <label htmlFor="username">username:</label>
                    <input name="username"></input>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="username">password:</label>
                    <input name="password"></input>
                </div>
            </form>
        </div>
    );
}