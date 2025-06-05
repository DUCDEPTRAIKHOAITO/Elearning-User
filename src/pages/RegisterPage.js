import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            setError('⚠️ Please enter your full name and email.');
            setSuccess('');
            return;
        }

        if (!agreeTerms) {
            setError('⚠️ You must agree to the terms of service.');
            setSuccess('');
            return;
        }

        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8080/api/user/create_id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            const text = await response.text();
            console.log('Server response:', text);

            if (response.ok) {
                setSuccess('🎉 Registration successful! Please check your email for the password.');
                setName('');
                setEmail('');
                setAgreeTerms(false);
            } else if (response.status === 500 && text.includes("Duplicate entry")) {
                setError('❌ Email is already in use. Please choose a different one.');
            } else {
                setError('❌ Registration failed: ' + text);
            }
        } catch (err) {
            console.error('Connection error:', err);
            setError('⚠️ Could not connect to the server.');
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
                maxWidth: '450px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)'
            }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Create Account</h2>
                    <p className="text-muted">Join the learning community today</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Full Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="agreeTerms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="agreeTerms">
                            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">terms of service</a>.
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold" style={{ borderRadius: '12px' }}>
                        {success ? '✅ Sent!' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-muted">
                    Already have an account? <Link to="/login" className="text-decoration-none text-primary">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
