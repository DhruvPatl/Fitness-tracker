import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuickStart.css';

const QuickStart = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/workout');
    };

    return (
        <div className="quick-start-container">
            <button className="quick-start-btn" onClick={handleStart}>
                <div className="icon-wrapper">
                    <Play size={24} fill="currentColor" />
                </div>
                <div className="text-wrapper">
                    <span className="btn-title">Start Workout</span>
                    <span className="btn-subtitle">Log a new session</span>
                </div>
            </button>
        </div>
    );
};

export default QuickStart;
