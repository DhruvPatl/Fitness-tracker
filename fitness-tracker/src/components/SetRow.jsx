import { Check, Trash2 } from 'lucide-react';
import '../styles/SetRow.css';

const SetRow = ({
    setIndex,
    set,
    onUpdate,
    onToggleComplete,
    onRemove
}) => {
    return (
        <div className={`set-row-container ${set.completed ? 'completed' : ''}`}>
            <div className="set-number">{setIndex + 1}</div>
            <div className="set-input-group">
                <input
                    type="number"
                    placeholder="kg"
                    value={set.weight}
                    onChange={(e) => onUpdate('weight', e.target.value)}
                    className="set-input"
                />
                <span className="unit-label">kg</span>
            </div>
            <div className="set-input-group">
                <input
                    type="tel"
                    placeholder="reps"
                    value={set.reps}
                    onChange={(e) => onUpdate('reps', e.target.value)}
                    className="set-input"
                />
                <span className="unit-label">reps</span>
            </div>
            <button
                className={`btn-check ${set.completed ? 'active' : ''}`}
                onClick={onToggleComplete}
            >
                <Check size={18} />
            </button>
        </div>
    );
};

export default SetRow;
