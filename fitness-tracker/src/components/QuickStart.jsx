import { useNavigate } from 'react-router-dom';
import '../styles/QuickStart.css';

import { Timer, Zap, ChevronRight, Play } from 'lucide-react';

const QuickStart = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/workout');
    };

    const recentSessions = [
        { title: 'Push Workout (Chest/Tri)', time: '45 mins', volume: '12,400 lbs', icon: <Zap size={20} /> },
        { title: 'Morning Cardio', time: '32 mins', volume: '4.2 miles', icon: <Timer size={20} /> }
    ];

    return (
        <div className="quick-start-container">
            {recentSessions.map((session, index) => (
                <button key={index} className="session-card" onClick={handleStart}>
                    <div className="session-icon-wrapper">
                        {session.icon}
                    </div>
                    <div className="session-info">
                        <span className="session-title">{session.title}</span>
                        <div className="session-stats">
                            <span>{session.time}</span>
                            <span className="dot">•</span>
                            <span>{session.volume} total</span>
                        </div>
                    </div>
                    <ChevronRight size={20} className="chevron" />
                </button>
            ))}

            <button className="fab-start" onClick={handleStart}>
                <Play size={24} fill="currentColor" />
                <span>READY TO TRAIN?</span>
            </button>
        </div>
    );
};

export default QuickStart;
