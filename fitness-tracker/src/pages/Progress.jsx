import { Link } from 'react-router-dom';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import WorkoutHistoryList from '../components/WorkoutHistoryList';
import { BarChart2, History } from 'lucide-react';
import '../styles/Progress.css';

const Progress = () => {
    const { history } = useWorkoutHistory();

    return (
        <div className="page progress-page">
            <header className="page-header">
                <h1>Progress</h1>
            </header>

            <section className="progress-section">
                <div className="section-header">
                    <h2>Lift Progress</h2>
                    <Link to="/exercises" className="link-action">View All Exercises</Link>
                </div>
                <p className="description-text">
                    Check the <Link to="/exercises" className="text-link">Exercises</Link> tab to see detailed charts for each lift.
                </p>
            </section>

            <section className="progress-section">
                <div className="section-header">
                    <h2>Workout History</h2>
                    <History size={20} className="icon-subtle" />
                </div>
                <WorkoutHistoryList history={history} />
            </section>
        </div>
    );
};

export default Progress;
