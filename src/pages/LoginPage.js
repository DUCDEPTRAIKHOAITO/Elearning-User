import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
            setError('Vui lòng nhập đầy đủ email và mật khẩu.');
            setSuccess('');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://your-backend-api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Đăng nhập thành công!');
                setError('');
                if (rememberMe) {
                    localStorage.setItem('token', data.token);
                } else {
                    sessionStorage.setItem('token', data.token);
                }
                navigate('/');
            } else {
                setError(data.message || 'Đăng nhập thất bại.');
                setSuccess('');
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            setError('Không thể kết nối đến máy chủ.');
            setSuccess('');
        }
    };

    return (
        <div className="login-page">
            <h1>Đăng nhập</h1>
            <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Ghi nhớ đăng nhập
                    </label>
                </div>
                <button type="submit" className="edu-btn">Đăng nhập</button>
            </form>

            <p>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </div>
    );
};

export default LoginPage;