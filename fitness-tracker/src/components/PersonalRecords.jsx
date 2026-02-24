import { Trophy } from 'lucide-react';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import '../styles/PersonalRecords.css';

import { Dumbbell, Calendar } from 'lucide-react';

const PersonalRecords = () => {
    const { getPersonalRecords } = useWorkoutHistory();
    const records = getPersonalRecords();

    return (
        <div className="pr-grid">
            {records.length === 0 ? (
                <div className="pr-item empty">No records yet. Go lift!</div>
            ) : (
                records.map((record, index) => (
                    <div key={index} className="pr-card">
                        <div className="pr-icon-wrapper">
                            <Dumbbell size={20} className="pr-icon" />
                        </div>
                        <div className="pr-info">
                            <div className="pr-value-row">
                                <span className="pr-weight">{record.weight}</span>
                                <span className="pr-unit">lbs</span>
                            </div>
                            <span className="pr-exercise">{record.exercise}</span>
                            <div className="pr-date">
                                <Calendar size={12} />
                                <span>{record.date || '2 days ago'}</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PersonalRecords;
