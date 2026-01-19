import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const payload = isLogin 
            ? { email: formData.email, password: formData.password }
            : { fullName: formData.fullName, email: formData.email, password: formData.password };

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                if (!isLogin) {
                    setTimeout(() => setIsLogin(true), 1500); 
                }
            } else {
                setStatus('error');
                const remaining = data.remaining !== undefined ? ` (${data.remaining} attempts left)` : "";
                setMessage(data.message + remaining);
            }
        } catch (err) {
            setStatus('error');
            setMessage("Server unreachable. Please check backend.");
        }
    };

    return (
        <div className="main-container">
            <div className="glass-card">
                <div className="toggle-wrapper">
                    <div className={`selection-glow ${isLogin ? 'left' : 'right'}`}></div>
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Signup</button>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit} className={`auth-form ${isLogin ? 'fade-in' : 'slide-up'}`}>
                        <h2>{isLogin ? "Welcome Back" : "Join Us"}</h2>
                        
                        {!isLogin && (
                            <div className="input-box">
                                <input type="text" name="fullName" placeholder="Full Name" required 
                                    value={formData.fullName} onChange={handleChange} />
                            </div>
                        )}

                        <div className="input-box">
                            <input type="email" name="email" placeholder="Email Address" required 
                                value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="input-box">
                            <input type="password" name="password" placeholder="Password" required minLength="6" 
                                value={formData.password} onChange={handleChange} />
                        </div>

                        <button type="submit" className="main-btn">
                            {isLogin ? "Secure Login" : "Create Account"}
                        </button>

                        {message && (
                            <div className={`alert-box ${status}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;