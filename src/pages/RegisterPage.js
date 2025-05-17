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

        // Kiểm tra nếu các trường bị bỏ trống
        if (!fullName || !email || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            setSuccess('');
            return;
        }

        // Kiểm tra nếu mật khẩu không khớp
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp!');
            setSuccess('');
            return;
        }

        // Kiểm tra nếu người dùng chưa đồng ý điều khoản
        if (!agreeTerms) {
            setError('Bạn cần đồng ý với điều khoản và điều kiện.');
            setSuccess('');
            return;
        }

        // Xóa thông báo lỗi nếu có
        setError('');

        try {
            // Gửi dữ liệu đến backend API
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    role: 'user', // Mặc định role là 'user'
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
                setError('');
                console.log('Đăng ký thành công:', data);
            } else {
                setError(data.message || 'Đã xảy ra lỗi khi đăng ký.');
                setSuccess('');
                console.error('Lỗi đăng ký:', data.message);
            }
        } catch (error) {
            setError('Không thể kết nối đến máy chủ.');
            setSuccess('');
            console.error('Lỗi kết nối:', error);
        }
    };

    return (
        <div className="register-page">
            <h1>Đăng ký</h1>
            <form onSubmit={handleRegister}>
                {/* Hiển thị thông báo lỗi */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <div className="form-group">
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên của bạn"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
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
                    <label>Nhập lại mật khẩu:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {/* <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                       
                    </label>
                </div> */}
                <button type="submit" className="edu-btn">Đăng ký</button>
            </form>

            {/* Điều hướng đến trang đăng nhập */}
            <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
        </div>
    );
};

export default RegisterPage;