import { useState } from 'react';
import user from '../../services/user';
import './Login.css'

const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await user.login(inputValues.email, inputValues.password);
        console.log(res);
    };

    return (
        <div className="center">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="email">email:</label>
                    <input
                        type="text"
                        name="email"
                        value={inputValues.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">password:</label>
                    <input
                        type="password"
                        name="password"
                        value={inputValues.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-button">login</button>
            </form>
        </div>
    );
};

export default Login;