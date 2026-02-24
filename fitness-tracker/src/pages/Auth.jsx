import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import '../styles/Auth.css';

const Auth = () => {
    const navigate = useNavigate();
    const { login, signup } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await signup(formData.name, formData.email, formData.password);
            }
            navigate('/');
        } catch (error) {
            alert('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page auth-page">
            <header className="auth-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
            </header>

            <div className="auth-container">
                <div className="auth-brand">
                    <div className="brand-logo">
                        <User size={32} />
                    </div>
                    <h1>{isLogin ? 'Welcome Back' : 'Join the Club'}</h1>
                    <p>{isLogin ? 'Secure your progress in the cloud' : 'Start your journey with cloud sync'}</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="auth-input-group">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    <div className="auth-input-group">
                        <Mail size={18} className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="auth-input-group">
                        <Lock size={18} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button className="auth-submit-btn" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'LOG IN' : 'SIGN UP')}
                    </button>
                </form>

                <div className="auth-toggle">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
