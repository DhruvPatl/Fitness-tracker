import { ChevronRight } from 'lucide-react';
import '../styles/ExerciseHistory.css';

const ExerciseHistory = ({ history }) => {
    return (
        <div className="history-list">
            {history.map((session, index) => {
                const totalVolume = session.sets.reduce((acc, s) => acc + (parseInt(s.weight) * parseInt(s.reps)), 0);
                const isPR = session.sets.some(s => s.pr);

                return (
                    <div key={index} className="history-card">
                        <div className="history-date-box">
                            <span className="month">{session.month || 'OCT'}</span>
                            <span className="day">{session.day}</span>
                        </div>
                        <div className="history-info">
                            <div className="history-main">
                                <span className="history-weight">{session.sets[0].weight} kg x {session.sets[0].reps} reps</span>
                                {isPR && (
                                    <div className="pr-badge-small">
                                        <span>PR</span>
                                    </div>
                                )}
                            </div>
                            <span className="history-stats">
                                {session.sets.length} Sets • {totalVolume.toLocaleString()} kg volume
                            </span>
                        </div>
                        <div className="history-chevron">
                            <ChevronRight size={18} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExerciseHistory;
