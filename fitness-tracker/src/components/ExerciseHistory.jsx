import '../styles/ExerciseHistory.css';

const ExerciseHistory = ({ history }) => {
    return (
        <div className="history-section">
            <h3>History</h3>
            <div className="history-list">
                {history.map((session, index) => (
                    <div key={index} className="history-item">
                        <div className="history-date">
                            <span className="day">{session.day}</span>
                            <span className="date">{session.date}</span>
                        </div>
                        <div className="history-sets">
                            {session.sets.map((set, setIndex) => (
                                <div key={setIndex} className="set-row">
                                    <span className="set-reps">{set.reps} reps</span>
                                    <span className="set-weight">× {set.weight} kg</span>
                                    {set.pr && <span className="badge-pr">PR</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseHistory;
