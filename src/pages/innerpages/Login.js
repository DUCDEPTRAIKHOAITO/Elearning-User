// src/pages/Login.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import LoginForm from '../../components/form/LoginForm';

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = async (username, password) => {
        if (!username || !password) {
            setError('Vui lòng nhập username và mật khẩu.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login success:', data);
                setUser(data); // lưu thông tin user vào context
                window.location.replace("http://localhost:3003/");
            } else {
                setError(data.message || 'Đăng nhập thất bại.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi kết nối đến máy chủ.');
            console.error('Login error:', err);
        }
    };

    return (
        <>
            <SEO title="Login" />
            <Layout>
                <BreadcrumbOne 
                    title="Login"
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl="Login"
                />

                <div className="login-register-page-wrapper edu-section-gap bg-color-white">
                    <div className="container checkout-page-style">
                        <div className="row g-5">
                            <div className="col-lg-6">
                                <LoginForm onLogin={handleLogin} />
                            </div>
                            <div className="col-lg-6">
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Login;
