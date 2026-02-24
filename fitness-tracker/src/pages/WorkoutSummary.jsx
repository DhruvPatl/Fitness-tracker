import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../hooks/useWorkout';
import { Trophy, Clock, Zap, Award, CheckCircle, ArrowRight } from 'lucide-react';
import '../styles/WorkoutSummary.css';

const WorkoutSummary = () => {
    const navigate = useNavigate();
    const { lastFinishedWorkout, setLastFinishedWorkout } = useWorkout();

    useEffect(() => {
        if (!lastFinishedWorkout) {
            navigate('/');
        }
    }, [lastFinishedWorkout, navigate]);

    if (!lastFinishedWorkout) return null;

    const totalVolume = lastFinishedWorkout.exercises.reduce((acc, ex) => {
        return acc + ex.sets.reduce((setAcc, set) => {
            if (set.completed) {
                return setAcc + (parseInt(set.weight || 0) * parseInt(set.reps || 0));
            }
            return setAcc;
        }, 0);
    }, 0);

    const totalSets = lastFinishedWorkout.exercises.reduce((acc, ex) => {
        return acc + ex.sets.filter(s => s.completed).length;
    }, 0);

    const handleClose = () => {
        setLastFinishedWorkout(null);
        navigate('/');
    };

    return (
        <div className="page summary-page">
            <div className="summary-header-glow"></div>

            <header className="summary-hero">
                <div className="trophy-container">
                    <Trophy size={64} className="trophy-icon" />
                    <div className="trophy-glow"></div>
                </div>
                <h1>Workout Complete!</h1>
                <p className="summary-subtitle">You're getting stronger every day.</p>
            </header>

            <div className="summary-stats-grid">
                <div className="summary-stat-card">
                    <Clock size={20} className="stat-icon duration" />
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">{lastFinishedWorkout.duration}m</span>
                </div>
                <div className="summary-stat-card">
                    <Zap size={20} className="stat-icon volume" />
                    <span className="stat-label">Volume</span>
                    <span className="stat-value">{totalVolume.toLocaleString()} {lastFinishedWorkout.weightUnit}</span>
                </div>
                <div className="summary-stat-card">
                    <Award size={20} className="stat-icon sets" />
                    <span className="stat-label">Sets</span>
                    <span className="stat-value">{totalSets}</span>
                </div>
                <div className="summary-stat-card">
                    <CheckCircle size={20} className="stat-icon perfection" />
                    <span className="stat-label">Accuracy</span>
                    <span className="stat-value">100%</span>
                </div>
            </div>

            <section className="summary-exercise-list">
                <h3>Session Recap</h3>
                {lastFinishedWorkout.exercises.map((ex, i) => (
                    <div key={i} className="summary-exercise-item">
                        <span className="ex-name">{ex.name}</span>
                        <div className="ex-details">
                            {ex.sets.filter(s => s.completed).length} sets • Max {Math.max(...ex.sets.map(s => parseInt(s.weight || 0)))} {lastFinishedWorkout.weightUnit}
                        </div>
                    </div>
                ))}
            </section>

            <button className="summary-done-btn" onClick={handleClose}>
                <span>GO TO DASHBOARD</span>
                <ArrowRight size={20} />
            </button>
        </div>
    );
};

export default WorkoutSummary;
