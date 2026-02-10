import { Trophy } from 'lucide-react';
import '../styles/PersonalRecords.css';

const records = [
    { exercise: 'Bench Press', weight: '100 kg' },
    { exercise: 'Squat', weight: '140 kg' },
    { exercise: 'Deadlift', weight: '180 kg' },
];

const PersonalRecords = () => {
    return (
        <div className="pr-card">
            <div className="card-header">
                <h3>Personal Records</h3>
                <Trophy size={20} color="#fbbf24" />
            </div>
            <ul className="pr-list">
                {records.map((record, index) => (
                    <li key={index} className="pr-item">
                        <span className="exercise-name">{record.exercise}</span>
                        <span className="exercise-weight">{record.weight}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonalRecords;
