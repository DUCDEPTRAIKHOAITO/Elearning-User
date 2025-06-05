import React, { useState } from 'react';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !agree) {
            alert("⚠️ Please complete all fields and agree to the terms.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/user/create_id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }) // matches backend DTO
            });

            const responseText = await response.text();

            if (response.ok) {
                alert("🎉 Registration successful! Please check your email for your password.");
                setName('');
                setEmail('');
                setAgree(false);
            } else if (response.status === 500 && responseText.includes("Duplicate entry")) {
                alert("❌ Email is already in use. Please choose a different one.");
            } else {
                alert("❌ Registration failed: " + responseText);
            }

        } catch (error) {
            console.error("Connection error:", error);
            alert("⚠️ Unable to connect to the server.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Create Account</h2>

            <label>Full Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', margin: '10px 0' }}>
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                />
                I agree to the <a href="#">terms of service</a>.
            </label>

            <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Register"}
            </button>
        </form>
    );
};

export default RegisterForm;
