import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate client-side
        if (!fullName || !email || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            setSuccess('');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp!');
            setSuccess('');
            return;
        }

        if (!agreeTerms) {
            setError('Bạn cần đồng ý với điều khoản và điều kiện.');
            setSuccess('');
            return;
        }

        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: fullName,
                    email,
                    password,
                    role: 'user',
                }),
            });

            const text = await response.text();
            console.log('Phản hồi từ back-end:', text);

            if (response.ok) {
                setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
                setError('');
            } else {
                setError(text || 'Đã xảy ra lỗi khi đăng ký.');
                setSuccess('');
            }
        } catch (err) {
            console.error('Lỗi kết nối:', err);
            setError('Không thể kết nối đến máy chủ.');
            setSuccess('');
        }
    };

    return (
        <div className="register-page" style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
            <h1>Đăng ký</h1>
            <form onSubmit={handleRegister}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <div className="form-group">
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Nhập lại mật khẩu:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            style={{ width: '18px', height: '18px', marginRight: '10px' }}
                        />
                        <label htmlFor="agreeTerms" style={{ marginBottom: 0 }}>
                            Tôi đồng ý với <a href="/terms" target="_blank" rel="noopener noreferrer">điều khoản và điều kiện</a>.
                        </label>
                    </div>
                </div>

                <button type="submit" className="edu-btn" style={{ marginTop: 10 }}>Đăng ký</button>
            </form>

            <p style={{ marginTop: 15 }}>
                Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
