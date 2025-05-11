import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn form reload
        onLogin(username, password); // Gọi callback từ Login.jsx
    };

    return (
        <div className="login-form-box">
            <h3 className="mb-30">Login</h3>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-box mb--30">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-box mb--30">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="comment-form-consent input-box mb--30">
                    <input id="checkbox-1" type="checkbox" />
                    <label htmlFor="checkbox-1">Remember Me</label>
                </div>
                <button className="rn-btn edu-btn w-100 mb--30" type="submit">
                    <span>Login</span>
                </button>
                <div className="input-box">
                    <a href="#" className="lost-password">Lost your password?</a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
