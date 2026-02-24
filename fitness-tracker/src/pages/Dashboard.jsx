import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WeeklyActivity from '../components/WeeklyActivity';
import PersonalRecords from '../components/PersonalRecords';
import QuickStart from '../components/QuickStart';

import '../styles/Dashboard.css';

import { Bell, LogOut, User } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <div className="page dashboard">
            <header className="dashboard-header">
                <div className="user-profile" onClick={() => !isLoggedIn && navigate('/auth')}>
                    <div className="avatar-wrapper">
                        {isLoggedIn ? (
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=22c55e&color=000`} alt="User Profile" className="avatar" />
                        ) : (
                            <div className="avatar-placeholder">
                                <User size={20} />
                            </div>
                        )}
                        {!isLoggedIn && <div className="login-badge">LOG IN</div>}
                    </div>
                    <div className="user-info">
                        <h2>Hi, {isLoggedIn ? user.name : 'Guest'}</h2>
                        <span className="user-rank">{isLoggedIn ? 'PREMIUM CLOUD' : 'LOCAL ONLY'}</span>
                    </div>
                </div>
                <div className="header-actions">
                    {isLoggedIn && (
                        <button className="logout-btn" onClick={logout}>
                            <LogOut size={18} />
                        </button>
                    )}
                    <button className="notification-btn">
                        <Bell size={20} />
                    </button>
                </div>
            </header>


            <section className="activity-summary">
                <div className="summary-main">
                    <span className="summary-label">Activity</span>
                    <div className="summary-value-wrapper">
                        <span className="summary-value">5.8 hrs</span>
                        <span className="summary-change">+14%</span>
                    </div>
                </div>
                <span className="summary-period">Last 7 days</span>
            </section>

            <WeeklyActivity />

            <div className="section-header">
                <h3>Personal Records</h3>
                <button className="view-all">VIEW ALL</button>
            </div>
            <PersonalRecords />

            <div className="section-header">
                <h3>Recent Sessions</h3>
            </div>
            <QuickStart />
        </div>
    );
};

export default Dashboard;
