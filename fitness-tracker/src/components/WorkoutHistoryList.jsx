import { Calendar, ChevronRight } from 'lucide-react';
import '../styles/WorkoutHistoryList.css';

const WorkoutHistoryList = ({ history }) => {
    if (history.length === 0) {
        return (
            <div className="empty-history">
                <p>No workouts completed yet.</p>
            </div>
        );
    }

    return (
        <div className="history-list-container">
            {history.map((workout) => {
                const date = new Date(workout.completedAt);
                const dateString = date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
                const timeString = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const exerciseCount = workout.exercises.length;
                const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);

                return (
                    <div key={workout.id} className="workout-history-card">
                        <div className="workout-card-header">
                            <div className="workout-date">
                                <Calendar size={16} className="icon-subtle" />
                                <span>{dateString}</span>
                                <span className="dot">•</span>
                                <span>{timeString}</span>
                            </div>
                            <ChevronRight size={16} className="icon-subtle" />
                        </div>
                        <div className="workout-summary">
                            <div className="summary-item">
                                <span className="value">{exerciseCount}</span>
                                <span className="label">Exercises</span>
                            </div>
                            <div className="summary-item">
                                <span className="value">{totalSets}</span>
                                <span className="label">Sets</span>
                            </div>
                            {/* Could add total volume or duration here if tracked */}
                        </div>
                        <div className="workout-exercises-preview">
                            {workout.exercises.slice(0, 3).map(ex => ex.name).join(', ')}
                            {workout.exercises.length > 3 && '...'}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WorkoutHistoryList;
