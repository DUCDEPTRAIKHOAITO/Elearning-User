import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                const username = data.username || data.name || '';

                if (rememberMe) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username);
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('userEmail', email);
                }

                setSuccess('Login successful!');
                setError('');
                navigate('/');
            } else {
                setError(data || 'Login failed.');
                setSuccess('');
            }
        } catch (err) {
            console.error('Connection error:', err);
            setError('Unable to connect to the server.');
            setSuccess('');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #84fab0, #8fd3f4)',
            backgroundSize: '400% 400%',
            animation: 'waves 15s ease infinite'
        }}>
            <style>
                {`
                @keyframes waves {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>

            <div className="card p-4 shadow-lg border-0" style={{
                width: '100%',
                maxWidth: '350px',
                borderRadius: '40px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(100px)'
            }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Login</h2>
                    <p className="text-muted">Explore high-quality courses!</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ borderRadius: '100px' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ borderRadius: '100px' }}
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold"
                        style={{ borderRadius: '100px' }}
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 mb-0 text-center text-muted">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none text-primary fw-semibold">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
